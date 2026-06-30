const cron   = require('node-cron');
const config = require('../../config/config.json');
const state  = require('../shared/state');
const db     = require('../shared/db');

const { logInfo, logError, logWarn } = require('./logger');
const { getChannels, getChannelDetails, clearSeenMessages } = require('./ChannelManager');
const { getKeywordBlacklist } = require('./KeywordBlacklistManager');
const {
    hashMessageText,
    simHashText,
    normaliseTitleHash,
    isEventPast,
    isAlreadySeen,
    isAlreadySeenByHash,
    isNearDuplicate,
    isTitleDuplicate,
    markAsSeen,
    detectMalay,
    SIMHASH_THRESHOLD
} = require('./MessageChecker');
const { analyseWithGemini } = require('./GeminiAnalyser');
const { postToDiscord }     = require('./DiscordPublisher');

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Channel Scraper ──────────────────────────────────────────────────────────

/**
 * Fetches the latest messages from a Telegram channel, runs them through the
 * four-layer dedup stack, calls Gemini for event classification, and posts
 * confirmed events to Discord.
 *
 * Dedup layers (in order):
 *   1. Message ID   — exact, per-channel
 *   2. Content hash — exact MD5, cross-channel
 *   3. SimHash      — near-duplicate fingerprint (Hamming distance ≤ threshold)
 *   4. Title hash   — post-Gemini cross-channel same-event guard
 */
async function scrapeChannel(discordChannel, channelId, force = false, channelName = null, blacklist = []) {
    try {
        // Normalise legacy positive IDs to -100-prefixed form
        let parsedId = channelId;
        if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;

        const targetId    = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
        const scrapeLimit = config.telegramScrapeLimit || 20;
        const messages    = await state.telegramClient.getMessages(targetId, { limit: scrapeLimit });

        let total = 0, skippedShort = 0, skippedSeen = 0, skippedDupe = 0,
            skippedNearDupe = 0, skippedPast = 0, skippedBlacklisted = 0,
            skippedTitleDupe = 0, sentToGemini = 0, eventsFound = 0;

        logInfo(`[DEBUG] Channel ${channelId}: ${messages.length} total messages`);

        for (const msg of messages) {
            if (state.cancelScrape) break;
            total++;

            // ── Gate 0: Skip short/empty messages ──────────────────────────
            if (!msg.message || msg.message.trim().length < 30) {
                skippedShort++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (short/empty)`);
                continue;
            }

            // ── Gate 1: Blacklist keyword filter ───────────────────────────
            if (blacklist.length > 0) {
                const matchedKeyword = blacklist.find(kw => {
                    const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
                    return regex.test(msg.message);
                });
                if (matchedKeyword) {
                    skippedBlacklisted++;
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (blacklisted: "${matchedKeyword}")`);
                    continue;
                }
            }

            // ── Compute hashes ONCE (fixes the const-shadowing bug) ────────
            const contentHash = hashMessageText(msg.message);
            const simhash     = simHashText(msg.message);

            if (!force) {
                // ── Gate 2: Exact message ID ────────────────────────────────
                if (await isAlreadySeen(msg.id, channelId)) {
                    skippedSeen++;
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (already seen by ID)`);
                    continue;
                }

                // ── Gate 3: Exact content hash ──────────────────────────────
                if (await isAlreadySeenByHash(contentHash)) {
                    skippedDupe++;
                    await markAsSeen(msg.id, channelId, contentHash, simhash);
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (exact duplicate content)`);
                    continue;
                }

                // ── Gate 4: Near-duplicate SimHash ──────────────────────────
                if (await isNearDuplicate(simhash)) {
                    skippedNearDupe++;
                    await markAsSeen(msg.id, channelId, contentHash, simhash);
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (near-duplicate, SimHash ≤ ${SIMHASH_THRESHOLD} bits)`);
                    continue;
                }
            }

            // ── Gemini analysis ─────────────────────────────────────────────
            if (sentToGemini > 0) await sleep(4200);
            sentToGemini++;
            const langTag = detectMalay(msg.message) ? '[lang=Malay]' : '[lang=EN]';
            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SENT TO GEMINI ${langTag}`);

            const result = await analyseWithGemini(msg.message);

            if (result._error) {
                logWarn(`[Scraper] Gemini failed for ${channelId} msg ${msg.id}, will retry next cycle`);
                // Do NOT mark as seen — allow a retry on next cycle
                continue;
            }

            // Mark as seen BEFORE posting (prevents retry on Discord failure)
            await markAsSeen(msg.id, channelId, contentHash, simhash);

            if (!result.isEvent) {
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says NOT_EVENT`);
                continue;
            }

            // Guard: skip if Gemini failed to extract a real title
            if (!result.title || result.title.trim().length === 0 || result.title === 'Event Announcement') {
                logWarn(`[Scraper] ${channelId} msg ${msg.id}: SKIPPED (missing/generic title)`);
                continue;
            }

            // ── Gate 5: Past event guard ────────────────────────────────────
            if (isEventPast(result)) {
                skippedPast++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (event is in the past)`);
                continue;
            }

            // ── Gate 6: Title-level dedup (cross-channel same event) ────────
            const titleHash = normaliseTitleHash(result.title);
            if (await isTitleDuplicate(titleHash)) {
                skippedTitleDupe++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (title duplicate — same event already posted)`);
                continue;
            }

            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says EVENT (${result.type}) ${langTag} title="${result.title}"`);
            eventsFound++;
            await postToDiscord(discordChannel, result, channelName || channelId, msg.message, titleHash);
            logInfo(`[Scraper] Posted: ${result.title} [${result.type}]`);
        }

        logInfo(
            `[DEBUG] ${channelId} SUMMARY: total=${total} short=${skippedShort} ` +
            `seen=${skippedSeen} exact_dupe=${skippedDupe} near_dupe=${skippedNearDupe} ` +
            `past=${skippedPast} blacklist=${skippedBlacklisted} title_dupe=${skippedTitleDupe} ` +
            `gemini=${sentToGemini} events=${eventsFound}`
        );

        return {
            total,
            skippedShort,
            skippedBlacklisted,
            skippedSeen,
            skippedDupe,
            skippedNearDupe,
            skippedPast,
            skippedTitleDupe,
            sentToGemini,
            eventsFound
        };
    } catch (err) {
        logError(`[Scraper] Error scraping ${channelId}: ${err.message}`);
        return {
            total: 0,
            skippedShort: 0,
            skippedBlacklisted: 0,
            skippedSeen: 0,
            skippedDupe: 0,
            skippedNearDupe: 0,
            skippedPast: 0,
            skippedTitleDupe: 0,
            sentToGemini: 0,
            eventsFound: 0
        };
    }
}

// ─── Auto-close Past Event Threads ───────────────────────────────────────────

/**
 * Locks and archives Discord forum threads for events whose end date has passed.
 * Also prunes seen_messages entries older than 30 days (DB size TTL).
 */
async function autoClosePastEvents(discordClient) {
    logInfo('[AutoClose] Running auto-close checks and seen messages cleanup...');

    // TTL cleanup — prune seen messages older than 30 days
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    db.run('DELETE FROM seen_messages WHERE posted_at < ?', [thirtyDaysAgo], (err) => {
        if (err) logError(`[AutoClose] Seen messages cleanup error: ${err.message}`);
        else     logInfo('[AutoClose] Successfully pruned old seen messages.');
    });

    return new Promise((resolve, reject) => {
        db.all(
            'SELECT thread_id, title, event_end_date FROM telegram_events WHERE (closed = 0 OR closed IS NULL) AND event_end_date IS NOT NULL',
            [],
            async (err, rows) => {
                if (err) {
                    logError(`[AutoClose] Database error: ${err.message}`);
                    return reject(err);
                }

                if (!rows || rows.length === 0) {
                    logInfo('[AutoClose] No open events to check.');
                    return resolve(0);
                }

                const now      = new Date();
                const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

                let closedCount = 0;
                for (const row of rows) {
                    if (row.event_end_date < todayISO) {
                        try {
                            let thread = await discordClient.channels.fetch(row.thread_id).catch(err => {
                                // 10003 = Unknown Channel (deleted) — safe to mark closed
                                if (err && err.code === 10003) return null;
                                throw err;
                            });

                            if (thread) {
                                await thread.send('🔒 **This event has ended.** The thread is now locked and archived.').catch(() => {});
                                await thread.edit({ locked: true, archived: true, reason: 'Event has ended' }).catch(() => {});
                                logInfo(`[AutoClose] Locked and archived thread ${row.thread_id} ("${row.title}")`);
                            } else {
                                logInfo(`[AutoClose] Thread ${row.thread_id} missing from Discord — marking closed in DB.`);
                            }

                            await new Promise((resDb, rejDb) => {
                                db.run('UPDATE telegram_events SET closed = 1 WHERE thread_id = ?', [row.thread_id], (errDb) => {
                                    if (errDb) rejDb(errDb);
                                    else       resDb();
                                });
                            });
                            closedCount++;
                        } catch (threadErr) {
                            logError(`[AutoClose] Failed to close thread ${row.thread_id}: ${threadErr.message}`);
                        }
                    }
                }

                logInfo(`[AutoClose] Closed ${closedCount} past event thread(s).`);
                resolve(closedCount);
            }
        );
    });
}

// ─── Top-level Scrape Cycle ───────────────────────────────────────────────────

/**
 * Runs a full scrape cycle across all configured Telegram channels.
 * Exported so the Discord /scrape command can invoke it manually.
 *
 * @param {import('discord.js').Client} discordClient
 * @param {object}  [options]
 * @param {boolean} [options.force]           - Skip dedup checks (re-processes all messages)
 * @param {string}  [options.targetChannelId] - Scrape only this channel
 */
async function runScrape(discordClient, options = {}) {
    if (state.isScraping) {
        logWarn('[Scraper] Scrape already in progress, skipping.');
        return { skipped: true };
    }

    state.isScraping = true;
    logInfo('[Scraper] Starting scrape cycle...');

    // Resolve Discord event channel (cache-first)
    const targetDiscordChannelId = config.discordEventForumId || '1519270170873565405';
    let discordChannel = discordClient.channels.cache.get(targetDiscordChannelId);
    if (!discordChannel) {
        discordChannel = await discordClient.channels.fetch(targetDiscordChannelId).catch(() => null);
    }
    if (!discordChannel) {
        state.isScraping = false;
        logError('[Scraper] Discord event channel not found. Aborting scrape cycle.');
        return { error: 'Discord event channel not found.' };
    }

    // Fetch keyword blacklist
    let blacklist = [];
    try {
        blacklist = await getKeywordBlacklist();
    } catch (err) {
        logError(`[Scraper] Error fetching blacklist: ${err.message}`);
    }

    // Resolve channels to scrape
    let channelsToScrape = await getChannelDetails();
    if (options.targetChannelId) {
        channelsToScrape = channelsToScrape.filter(ch => ch.channel_id === options.targetChannelId);
    }

    let totalStats = {
        total: 0,
        skippedShort: 0,
        skippedBlacklisted: 0,
        skippedSeen: 0,
        skippedDupe: 0,
        skippedNearDupe: 0,
        skippedPast: 0,
        skippedTitleDupe: 0,
        sentToGemini: 0,
        eventsFound: 0
    };

    for (const ch of channelsToScrape) {
        if (state.cancelScrape) break;
        const stats = await scrapeChannel(
            discordChannel,
            ch.channel_id,
            options.force,
            ch.channel_name,
            blacklist
        );
        totalStats.total += stats.total || 0;
        totalStats.skippedShort += stats.skippedShort || 0;
        totalStats.skippedBlacklisted += stats.skippedBlacklisted || 0;
        totalStats.skippedSeen += stats.skippedSeen || 0;
        totalStats.skippedDupe += stats.skippedDupe || 0;
        totalStats.skippedNearDupe += stats.skippedNearDupe || 0;
        totalStats.skippedPast += stats.skippedPast || 0;
        totalStats.skippedTitleDupe += stats.skippedTitleDupe || 0;
        totalStats.sentToGemini += stats.sentToGemini || 0;
        totalStats.eventsFound += stats.eventsFound || 0;
    }

    const wasCancelled = state.cancelScrape;
    state.isScraping = false;
    state.cancelScrape = false;

    if (wasCancelled) {
        logWarn('[Scraper] Scrape cycle aborted by user.');
        return { cancelled: true };
    }

    // Save aggregated daily stats to database
    const today = new Date().toISOString().split('T')[0];
    db.run(`
        INSERT INTO scraper_daily_stats (
            date, messages_scraped, skipped_short, skipped_blacklist,
            skipped_seen, skipped_exact_duplicate, skipped_near_duplicate,
            skipped_past, skipped_title_duplicate, sent_to_gemini, events_found
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET
            messages_scraped = messages_scraped + excluded.messages_scraped,
            skipped_short = skipped_short + excluded.skipped_short,
            skipped_blacklist = skipped_blacklist + excluded.skipped_blacklist,
            skipped_seen = skipped_seen + excluded.skipped_seen,
            skipped_exact_duplicate = skipped_exact_duplicate + excluded.skipped_exact_duplicate,
            skipped_near_duplicate = skipped_near_duplicate + excluded.skipped_near_duplicate,
            skipped_past = skipped_past + excluded.skipped_past,
            skipped_title_duplicate = skipped_title_duplicate + excluded.skipped_title_duplicate,
            sent_to_gemini = sent_to_gemini + excluded.sent_to_gemini,
            events_found = events_found + excluded.events_found
    `, [
        today, totalStats.total, totalStats.skippedShort, totalStats.skippedBlacklisted,
        totalStats.skippedSeen, totalStats.skippedDupe, totalStats.skippedNearDupe,
        totalStats.skippedPast, totalStats.skippedTitleDupe, totalStats.sentToGemini,
        totalStats.eventsFound
    ], (err) => {
        if (err) logError(`[Scraper] Failed to save daily stats to DB: ${err.message}`);
    });

    logInfo('[Scraper] Scrape cycle complete.');

    return { channelsScraped: channelsToScrape.length, totalEvents: totalStats.eventsFound, totalGemini: totalStats.sentToGemini };
}

module.exports = { runScrape, autoClosePastEvents };
