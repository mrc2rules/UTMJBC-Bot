const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const cron = require('node-cron');
const { EmbedBuilder } = require('discord.js');
const crypto = require('crypto');
const config = require('../../config/config.json');

const db = require('../shared/db');
const state = require('../shared/state');
const { getChannels } = require('./ChannelManager');

// ─── Database Helpers ─────────────────────────────────────────────────────────

function hashMessageText(text) {
    const normalized = text
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .trim();
    return crypto.createHash('md5').update(normalized).digest('hex');
}

function isAlreadySeen(messageId, channel) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM seen_messages WHERE message_id = ? AND channel = ?',
            [`${messageId}`, channel],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

function isAlreadySeenByHash(hash) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM seen_messages WHERE content_hash = ?',
            [hash],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

function markAsSeen(messageId, channel, hash) {
    db.run(
        'INSERT OR IGNORE INTO seen_messages (message_id, channel, content_hash, posted_at) VALUES (?, ?, ?, ?)',
        [`${messageId}`, channel, hash || null, Date.now()]
    );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── LLM Analysis ─────────────────────────────────────────────────────────────

async function analyseWithGemma(text) {
    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const prompt = `You are an expert Event Data Extractor for Universiti Teknologi Malaysia (UTM).
Today's Date: ${today}.

Analyse the Telegram message below and return ONLY a raw JSON object — no markdown, no explanation, no text before or after the JSON.

MESSAGE:
"""
${text}
"""

━━━ RULE 1 — EVENT CHECK ━━━
A message IS an event if a student can Attend, Register, Apply, or Compete as a direct result of it.
Classify it as a Club Announcement if it is an internal update or reminder for existing members.
These are NOT events and must return { "isEvent": false }:
- Admin-only or EXCO-only internal meetings with no open participation
- General university news, academic policy notices, or timetable updates
- Job postings, scholarship listings, or external advertisements
- Awareness posts, tips, guides, or support service announcements

If unsure, return { "isEvent": false }.

━━━ RULE 2 — PAST EVENT FILTER ━━━
If the event date can be determined AND it has already passed relative to Today's Date above,
return { "isEvent": false }. Do not post stale events.

━━━ RULE 3 — LANGUAGE ━━━
The 'title' and 'description' fields must always be in English.
If the message is in Malay or mixed Malay/English, translate them.
Set 'originalLanguage' to "english", "malay", or "other".
Set 'translatedText' to a full English translation if the original is not English, otherwise null.

━━━ RULE 4 — EVENT TYPE ━━━
Classify as exactly one of:
- "Club Activity"                  -> club-run activity open for members or students to join/attend
- "Club Recruitment"               -> open recruitment, tryouts, or intake for joining a club or team
- "Club Announcement"              -> internal club update, meeting reminder, or notice for existing members
- "Competition / Hackathon"        -> competitive event students can enter or register for
- "Talk / Seminar / Workshop"      -> educational or informational session students can attend
- "Faculty / Department Event"     -> event at faculty or department level (bigger than one club, not university-wide)
- "University-wide Event"          -> official UTM event open broadly across multiple faculties
- "External / Collaboration Event" -> event run by or in partnership with an external organisation

━━━ RULE 5 — DATE FORMAT ━━━
- Format: "27 March 2026, 2:30 PM - 5:00 PM"
- Date only (no time): "27 March 2026"
- Multi-day range: "27 March 2026 - 29 March 2026"
- Resolve relative references ("this Friday", "tomorrow", "next week") using Today's Date above
- If the year is not mentioned in the message, assume the current year
- If no date can be determined at all, return null — do NOT guess

━━━ RULE 6 — COST ━━━
- Free or clearly no payment required                    -> "Free"
- Commitment fee or refundable deposit mentioned         -> "Refundable Deposit - RM[X]"
- Specific paid price mentioned                          -> "Paid - RM[X]"
- Payment required but no amount given                   -> "Paid"
- Not mentioned at all                                   -> "Not specified"

━━━ RULE 7 — MERIT ━━━
Return true if UTM Merit points are mentioned anywhere in the message, false otherwise.

━━━ OUTPUT ━━━
If it IS an event:
{
  "isEvent": true,
  "type": "one of the 8 types above",
  "title": "clear English title",
  "date": "formatted string or null",
  "location": "verbatim location, or 'Online' if clearly online, or null if unstated",
  "description": "1-2 sentence action-oriented English summary of what students can do",
  "originalLanguage": "english or malay or other",
  "translatedText": "full English translation if not originally English, otherwise null",
  "merit": true or false,
  "cost": "per Rule 6 above"
}

If it is NOT an event (including past events):
{ "isEvent": false }

Your entire response must start with { and end with }. No other text.`;

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: 'application/json'
                    }
                })
            }
        );

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API returned ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '{"isEvent":false}';

        try {
            return JSON.parse(raw);
        } catch {
            const jsonMatch = raw.match(/\{[\s\S]*\}/);
            return jsonMatch ? JSON.parse(jsonMatch[0]) : { isEvent: false };
        }
    } catch (e) {
        console.error('[TelegramListener] Gemma error:', e.message);
        return { isEvent: false, _error: true };
    }
}

// ─── Discord ──────────────────────────────────────────────────────────────────

const EVENT_TYPE_EMOJI = {
    'Club Activity':                   '🎯',
    'Club Recruitment':                '📣',
    'Club Announcement':               '📋',
    'Competition / Hackathon':         '🏆',
    'Talk / Seminar / Workshop':       '🎤',
    'Faculty / Department Event':      '🏫',
    'University-wide Event':           '🎓',
    'External / Collaboration Event':  '🤝',
};

const EMBED_COLORS = [
    0x3498db, 0x2ecc71, 0x9b59b6, 0xe67e22,
    0x1abc9c, 0xe91e63, 0xf1c40f, 0x00bcd4,
    0xff5722, 0x8bc34a,
];

function randomEmbedColor() {
    return EMBED_COLORS[Math.floor(Math.random() * EMBED_COLORS.length)];
}

async function postToDiscord(discordChannel, eventData, channelUsername) {
    const descriptionText = eventData.translatedText || eventData.description || eventData.originalText || '';

    const truncatedDescription = descriptionText.length > 4096
        ? descriptionText.slice(0, 4090) + '…'
        : descriptionText;

    const rawTitle = eventData.title || 'Event Announcement';
    const safeTitle = rawTitle.length > 250 ? rawTitle.slice(0, 247) + '...' : rawTitle;

    const emoji = EVENT_TYPE_EMOJI[eventData.type] || '📅';

    const embed = new EmbedBuilder()
        .setTitle(`${emoji} ${safeTitle}`)
        .setDescription(truncatedDescription)
        .setColor(randomEmbedColor())
        .addFields(
            { name: '🗂️ Type',      value: eventData.type || 'Not specified',     inline: true },
            { name: '📆 Date/Time', value: eventData.date || 'Not specified',     inline: true },
            { name: '📍 Location',  value: eventData.location || 'Not specified', inline: true },
            { name: '📢 Source',    value: `${channelUsername}`,                  inline: true },
            { name: '🏅 UTM Merit', value: eventData.merit ? 'Yes' : 'No',       inline: true },
            { name: '💰 Cost',      value: eventData.cost || 'Not specified',     inline: true }
        )
        .setFooter({ text: 'UTMJBC Event Feed • Sourced from Telegram' })
        .setTimestamp();

    await discordChannel.send({ embeds: [embed] });
}

// ─── Scraper ──────────────────────────────────────────────────────────────────

async function scrapeChannel(discordChannel, channelId) {
    try {
        const messages = await state.telegramClient.getMessages(channelId, { limit: 20 });
        let total = 0, skippedShort = 0, skippedSeen = 0, skippedDupe = 0,
            skippedPast = 0, sentToGemma = 0, eventsFound = 0;

        console.log(`[DEBUG] Channel ${channelId}: ${messages.length} total messages`);

        for (const msg of messages) {
            total++;

            if (!msg.message || msg.message.trim().length < 30) {
                skippedShort++;
                console.log(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (short/empty)`);
                continue;
            }

            const seen = await isAlreadySeen(msg.id, channelId);
            if (seen) {
                skippedSeen++;
                console.log(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (already seen)`);
                continue;
            }

            const hash = hashMessageText(msg.message);
            const hashSeen = await isAlreadySeenByHash(hash);
            if (hashSeen) {
                skippedDupe++;
                markAsSeen(msg.id, channelId, hash);
                console.log(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (duplicate content)`);
                continue;
            }

            if (sentToGemma > 0) await sleep(1500);
            sentToGemma++;
            console.log(`[DEBUG] ${channelId} msg ${msg.id}: SENT TO GEMMA`);

            const result = await analyseWithGemma(msg.message);

            if (result._error) {
                console.warn(`[TelegramListener] Gemma failed for ${channelId} msg ${msg.id}, will retry next cycle`);
                continue;
            }

            markAsSeen(msg.id, channelId, hash);

            if (!result.isEvent) {
                const reason = result._pastEvent ? 'PAST_EVENT' : 'NOT_EVENT';
                console.log(`[DEBUG] ${channelId} msg ${msg.id}: GEMMA says ${reason}`);
                if (result._pastEvent) skippedPast++;
                continue;
            }

            console.log(`[DEBUG] ${channelId} msg ${msg.id}: GEMMA says EVENT (${result.type})`);
            eventsFound++;
            await postToDiscord(discordChannel, result, channelId);
            console.log(`[TelegramListener] Posted: ${result.title} [${result.type}]`);
        }

        console.log(
            `[DEBUG] ${channelId} SUMMARY: total=${total} short=${skippedShort} ` +
            `seen=${skippedSeen} dupes=${skippedDupe} past=${skippedPast} ` +
            `gemma=${sentToGemma} events=${eventsFound}`
        );

        return { eventsFound, sentToGemma };
    } catch (err) {
        console.error(`[TelegramListener] Error scraping ${channelId}:`, err.message);
        return { eventsFound: 0, sentToGemma: 0 };
    }
}

// Exported so Discord /scrape command can invoke it manually
async function runScrape(discordClient) {
    if (state.isScraping) {
        console.warn('[TelegramListener] Scrape already in progress, skipping.');
        return { skipped: true };
    }

    state.isScraping = true;
    console.log('[TelegramListener] Starting scrape cycle...');

    // Resolve Discord event channel once per cycle — cache-first to avoid redundant API calls
    let discordChannel = discordClient.channels.cache.get(config.eventPostChannelId);
    if (!discordChannel) {
        discordChannel = await discordClient.channels.fetch(config.eventPostChannelId).catch(() => null);
    }
    if (!discordChannel) {
        state.isScraping = false;
        console.error('[TelegramListener] Discord event channel not found. Aborting scrape cycle.');
        return { error: 'Discord event channel not found.' };
    }

    const channels = await getChannels();
    let totalEvents = 0, totalGemma = 0;

    for (const ch of channels) {
        const { eventsFound, sentToGemma } = await scrapeChannel(discordChannel, ch);
        totalEvents += eventsFound;
        totalGemma += sentToGemma;
    }

    state.isScraping = false;
    console.log('[TelegramListener] Scrape cycle complete.');
    return { channelsScraped: channels.length, totalEvents, totalGemma };
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function start(discordClient) {
    if (!config.telegramApiId || !config.telegramApiHash) {
        return console.warn('[TelegramListener] Telegram API credentials not set. Skipping.');
    }

    const session = new StringSession(config.telegramSession || '');
    const telegramClient = new TelegramClient(session, config.telegramApiId, config.telegramApiHash, {
        connectionRetries: 5,
    });

    await telegramClient.start({
        phoneNumber: async () => config.telegramPhone,
        password:    async () => config.telegramPassword || '',
        phoneCode:   async () => {
            console.log('[TelegramListener] Enter the Telegram login code:');
            return new Promise(resolve => process.stdin.once('data', d => resolve(d.toString().trim())));
        },
        onError: (err) => console.error('[TelegramListener] Auth error:', err),
    });

    // Store connected client in shared state so command handlers can access it
    state.telegramClient = telegramClient;

    console.log('[TelegramListener] Connected to Telegram!');
    console.log('[TelegramListener] Save this session string to config.telegramSession:\n', telegramClient.session.save());

    const intervalHours = config.telegramScrapeIntervalHours || 6;
    const cronExpr = `0 */${intervalHours} * * *`;

    await runScrape(discordClient);
    cron.schedule(cronExpr, () => runScrape(discordClient));
    console.log(`[TelegramListener] Scheduled every ${intervalHours} hours.`);
}

module.exports = { start, runScrape };
