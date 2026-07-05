const cron   = require('node-cron');
const config = require('../../config/config.json');
const state  = require('../shared/state');
const db     = require('../shared/db');
const aiGateway = require('../services/AIGateway');

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

function cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function hasEventSignals(text) {
    const lower = text.toLowerCase();
    const hasUrl = /https?:\/\/[^\s]+/i.test(text) || /forms\.gle|bit\.ly|t\.me/i.test(text);
    const eventKeywords = [
        'tarikh', 'date', 'masa', 'time', 'tempat', 'location', 'venue',
        'daftar', 'register', 'pendaftaran', 'fee', 'yuran', 'program',
        'ceramah', 'webinar', 'workshop', 'bengkel', 'pertandingan',
        'competition', 'talk', 'seminar', 'symposium', 'bootcamp', 'hakim',
        'peserta', 'participant', 'anjuran', 'organized', 'hadiah', 'prize'
    ];
    return hasUrl || eventKeywords.some(kw => lower.includes(kw));
}

async function checkSemanticDuplicate(text) {
    const embedding = await aiGateway.embedContent({ contents: text });
    if (!embedding) return { isDupe: false, embedding: null };

    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return new Promise((resolve) => {
        db.all(
            'SELECT thread_id, title, embedding FROM telegram_events WHERE posted_at > ? AND embedding IS NOT NULL',
            [thirtyDaysAgo],
            (err, rows) => {
                if (err || !rows || rows.length === 0) return resolve({ isDupe: false, embedding });
                for (const row of rows) {
                    try {
                        const storedVec = JSON.parse(row.embedding);
                        const sim = cosineSimilarity(embedding, storedVec);
                        if (sim >= 0.90) {
                            return resolve({ isDupe: true, matchTitle: row.title, sim, embedding });
                        }
                    } catch (e) {}
                }
                resolve({ isDupe: false, embedding });
            }
        );
    });
}

function getChannelCursor(channelId) {
    return new Promise((resolve) => {
        db.get('SELECT last_message_id FROM channel_cursors WHERE channel_id = ?', [channelId], (err, row) => {
            resolve(row ? row.last_message_id : 0);
        });
    });
}

function setChannelCursor(channelId, maxMessageId) {
    return new Promise((resolve) => {
        db.run(
            `INSERT INTO channel_cursors (channel_id, last_message_id, updated_at)
             VALUES (?, ?, ?)
             ON CONFLICT(channel_id) DO UPDATE SET
                last_message_id = max(last_message_id, excluded.last_message_id),
                updated_at = excluded.updated_at`,
            [channelId, maxMessageId, Date.now()],
            () => resolve()
        );
    });
}

// ─── Channel Scraper ──────────────────────────────────────────────────────────

async function scrapeChannel(discordChannel, channelId, force = false, channelName = null, blacklist = [], context = { lastGeminiCall: 0 }) {
    try {
        let parsedId = channelId;
        if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;

        const targetId    = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
        const scrapeLimit = config.telegramScrapeLimit || 20;

        const minId = force ? 0 : await getChannelCursor(channelId);
        const fetchOpts = minId > 0 ? { limit: 50, minId } : { limit: scrapeLimit };
        const messages    = await state.telegramClient.getMessages(targetId, fetchOpts);

        if (messages.length > 0) {
            const maxId = Math.max(...messages.map(m => m.id));
            await setChannelCursor(channelId, maxId);
        }

        let total = 0, skippedShort = 0, skippedSeen = 0, skippedDupe = 0,
            skippedNearDupe = 0, skippedHeuristic = 0, skippedPast = 0, skippedBlacklisted = 0,
            skippedTitleDupe = 0, skippedSemanticDupe = 0, sentToGemini = 0, eventsFound = 0;

        logInfo(`[DEBUG] Channel ${channelId}: fetched ${messages.length} messages (minId=${minId})`);

        for (const msg of messages) {
            if (state.cancelScrape) break;
            total++;

            // Gate 0: Skip short/empty messages
            if (!msg.message || msg.message.trim().length < 30) {
                skippedShort++;
                logInfo(`[Scraper] Skipped msg ${msg.id} (short/empty)`);
                await markAsSeen(msg.id, channelId, null, null);
                continue;
            }

            // Gate 1: Blacklist keyword filter
            if (blacklist.length > 0) {
                const matchedKeyword = blacklist.find(kw => {
                    const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
                    return regex.test(msg.message);
                });
                if (matchedKeyword) {
                    skippedBlacklisted++;
                    logInfo(`[Scraper] Skipped msg ${msg.id} (blacklist: "${matchedKeyword}")`);
                    await markAsSeen(msg.id, channelId, null, null);
                    continue;
                }
            }

            const contentHash = hashMessageText(msg.message);
            const simhash     = simHashText(msg.message);

            if (!force) {
                // Gate 2: Exact message ID
                if (await isAlreadySeen(msg.id, channelId)) {
                    skippedSeen++;
                    logInfo(`[Scraper] Skipped msg ${msg.id} (seen by ID)`);
                    continue;
                }

                // Gate 3: Exact content hash
                if (await isAlreadySeenByHash(contentHash)) {
                    skippedDupe++;
                    // BUG-3 fix: pass null for simhash on non-event / duplicate skips
                    await markAsSeen(msg.id, channelId, contentHash, null);
                    logInfo(`[Scraper] Skipped msg ${msg.id} (exact duplicate)`);
                    continue;
                }

                // Gate 4: Near-duplicate SimHash
                if (await isNearDuplicate(simhash)) {
                    skippedNearDupe++;
                    // BUG-3 fix: pass null for simhash so near-dupes don't pollute SimHash slots
                    await markAsSeen(msg.id, channelId, contentHash, null);
                    logInfo(`[Scraper] Skipped msg ${msg.id} (near duplicate)`);
                    continue;
                }

                // Gate 4.5: Pre-Gemini Heuristic Fast-Skip (FEAT-7a)
                if (!hasEventSignals(msg.message)) {
                    skippedHeuristic++;
                    await markAsSeen(msg.id, channelId, contentHash, null);
                    logInfo(`[Scraper] Skipped msg ${msg.id} (fails heuristic pre-filter)`);
                    continue;
                }
            }

            // Global Gemini rate limit check across channels (FLAW-2 fix)
            const now = Date.now();
            if (context.lastGeminiCall > 0 && (now - context.lastGeminiCall) < 4200) {
                await sleep(4200 - (now - context.lastGeminiCall));
            }
            context.lastGeminiCall = Date.now();
            sentToGemini++;

            const langTag = detectMalay(msg.message) ? '[lang=Malay]' : '[lang=EN]';
            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SENT TO GEMINI ${langTag}`);

            const result = await analyseWithGemini(msg.message);

            if (result._error) {
                logWarn(`[Scraper] Gemini failed for ${channelId} msg ${msg.id}, will retry next cycle`);
                continue;
            }

            if (!result.isEvent) {
                await markAsSeen(msg.id, channelId, contentHash, null);
                logInfo(`[Scraper] Skipped msg ${msg.id} (Gemini: not an event)`);
                continue;
            }

            if (!result.title || result.title.trim().length === 0 || result.title === 'Event Announcement') {
                await markAsSeen(msg.id, channelId, contentHash, null);
                logWarn(`[Scraper] Skipped msg ${msg.id} (missing/generic title)`);
                continue;
            }

            // Gate 5: Past event guard
            if (isEventPast(result)) {
                skippedPast++;
                await markAsSeen(msg.id, channelId, contentHash, null);
                logInfo(`[Scraper] Skipped msg ${msg.id} (event passed)`);
                continue;
            }

            // Gate 6: Title-level dedup
            const titleHash = normaliseTitleHash(result.title);
            if (await isTitleDuplicate(titleHash)) {
                skippedTitleDupe++;
                await markAsSeen(msg.id, channelId, contentHash, null);
                logInfo(`[Scraper] Skipped msg ${msg.id} (title duplicate)`);
                continue;
            }

            // Gate 7: Post-Gemini Semantic Event Dedup (FEAT-7c)
            const semCheck = await checkSemanticDuplicate(result.exactText || msg.message);
            if (semCheck.isDupe) {
                skippedSemanticDupe++;
                await markAsSeen(msg.id, channelId, contentHash, null);
                logInfo(`[Scraper] Skipped msg ${msg.id} (semantic match: "${semCheck.matchTitle}")`);
                continue;
            }

            // Confirmed event! Mark seen with full simhash and post to Discord
            await markAsSeen(msg.id, channelId, contentHash, simhash);
            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says EVENT (${result.type}) ${langTag} title="${result.title}"`);
            eventsFound++;
            await postToDiscord(discordChannel, result, channelName || channelId, msg.message, titleHash, semCheck.embedding);
            logInfo(`[Scraper] Posted: ${result.title} [${result.type}]`);
        }

        logInfo(
            `[DEBUG] ${channelId} SUMMARY: total=${total} short=${skippedShort} blacklist=${skippedBlacklisted} ` +
            `seen=${skippedSeen} exact_dupe=${skippedDupe} near_dupe=${skippedNearDupe} heuristic=${skippedHeuristic} ` +
            `past=${skippedPast} title_dupe=${skippedTitleDupe} semantic_dupe=${skippedSemanticDupe} ` +
            `gemini=${sentToGemini} events=${eventsFound}`
        );

        return { eventsFound, sentToGemini, totalMessages: total };
    } catch (err) {
        logError(`[Scraper] Error scraping ${channelId}: ${err.message}`);
        return { eventsFound: 0, sentToGemini: 0, totalMessages: 0 };
    }
}

// ─── Auto-close Past Event Threads ───────────────────────────────────────────

async function autoClosePastEvents(discordClient) {
    logInfo('[AutoClose] Running auto-close checks and seen messages cleanup...');

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

async function runScrape(discordClient, options = {}) {
    if (state.isScraping) {
        logWarn('[Scraper] Scrape already in progress, skipping.');
        return { skipped: true };
    }

    const startTs = Date.now();
    state.isScraping = true;
    logInfo('[Scraper] Starting scrape cycle...');

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

    let blacklist = [];
    try {
        blacklist = await getKeywordBlacklist();
    } catch (err) {
        logError(`[Scraper] Error fetching blacklist: ${err.message}`);
    }

    let channelsToScrape = await getChannelDetails();
    if (options.targetChannelId) {
        channelsToScrape = channelsToScrape.filter(ch => ch.channel_id === options.targetChannelId);
    }

    let totalEvents = 0, totalGemini = 0, totalMessages = 0;
    const globalContext = { lastGeminiCall: 0 };

    for (const ch of channelsToScrape) {
        if (state.cancelScrape) break;
        const { eventsFound, sentToGemini, totalMessages: chMsgs } = await scrapeChannel(
            discordChannel,
            ch.channel_id,
            options.force,
            ch.channel_name,
            blacklist,
            globalContext
        );
        totalEvents += eventsFound;
        totalGemini += sentToGemini;
        totalMessages += (chMsgs || 0);
    }

    const durationSec = parseFloat(((Date.now() - startTs) / 1000).toFixed(2));
    db.run(
        'INSERT INTO scrape_runs (run_at, duration_sec, channels_scraped, total_messages, events_found) VALUES (?, ?, ?, ?, ?)',
        [Date.now(), durationSec, channelsToScrape.length, totalMessages, totalEvents]
    );

    const wasCancelled = state.cancelScrape;
    state.isScraping = false;
    state.cancelScrape = false;

    if (wasCancelled) {
        logWarn('[Scraper] Scrape cycle aborted by user.');
        return { cancelled: true };
    }

    logInfo(`[Scraper] Scrape cycle complete in ${durationSec}s. Found ${totalEvents} event(s).`);

    return { channelsScraped: channelsToScrape.length, totalEvents, totalGemini, durationSec };
}

module.exports = { runScrape, autoClosePastEvents };
