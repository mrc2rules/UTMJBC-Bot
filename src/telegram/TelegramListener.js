const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const cron = require('node-cron');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.json');

const db = require('../shared/db');
const state = require('../shared/state');
const { getChannels, getChannelDetails, clearSeenMessages } = require('./ChannelManager');

function logInfo(msg) {
    console.log(msg);
    appendToLog(`[INFO] ${msg}`);
}

function logError(msg) {
    console.error(msg);
    appendToLog(`[ERROR] ${msg}`);
}

function logWarn(msg) {
    console.warn(msg);
    appendToLog(`[WARN] ${msg}`);
}

let liveLogBuffer = '';
let liveLogTimeout = null;

function flushLiveLogs() {
    if (!liveLogBuffer || !state.discordClient) return;
    const msg = liveLogBuffer;
    liveLogBuffer = '';
    liveLogTimeout = null;
    
    const logChannel = state.discordClient.channels.cache.get('1519284305464004678');
    if (logChannel) {
        logChannel.send(`\`\`\`\n${msg.substring(0, 1990)}\n\`\`\``).catch(() => {});
    }
}

function appendToLog(msg) {
    const timestamp = new Date().toISOString();
    const logStr = `[${timestamp}] ${msg}\n`;
    const logDir = path.join(__dirname, '../../logs');
    const logPath = path.join(logDir, 'telegram.log');
    
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFile(logPath, logStr, () => {});
    
    liveLogBuffer += logStr;
    if (!liveLogTimeout) {
        liveLogTimeout = setTimeout(flushLiveLogs, 2000);
    }
    if (liveLogBuffer.length > 1800) {
        clearTimeout(liveLogTimeout);
        flushLiveLogs();
    }
}

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
            'SELECT 1 FROM seen_messages WHERE (message_id = ? OR message_id = ?) AND channel = ?',
            [`${channel}_${messageId}`, `${messageId}`, channel],
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
        [`${channel}_${messageId}`, channel, hash || null, Date.now()]
    );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── LLM Analysis ─────────────────────────────────────────────────────────────

async function analyseWithGemini(text) {
    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const systemInstruction = `You are an expert Event Data Extractor for Universiti Teknologi Malaysia (UTM).
Today's Date: ${today}.

<rules>
RULE 1: A message IS an event if a student can Attend, Register, Apply, or Compete as a direct result of it.
Classify it as a Club Announcement if it is an internal update or reminder for existing members.
These are NOT events and must return { "isEvent": false }:
- Admin-only or EXCO-only internal meetings with no open participation
- General university news, academic policy notices, or timetable updates
- Job postings, scholarship listings, or external advertisements
- Awareness posts, tips, guides, or support service announcements
- Announcements, reminders, and notices

RULE 2: Extract the event end date as "eventEndDate" in ISO format (YYYY-MM-DD). Do NOT evaluate whether the event is past — just extract the date accurately. If you can't determine the date, return null.

RULE 3: The 'title' field must always be in English. If the message is in Malay, translate it.
Set 'originalLanguage' to "english", "malay", or "other".
Set 'translatedText' to a full English translation of the ENTIRE message if not English, otherwise null.

RULE 4: Classify as exactly one of: "Club Activity", "Club Recruitment", "Club Announcement", "Competition / Hackathon", "Talk / Seminar / Workshop", "Faculty / Department Event", "University-wide Event", "External / Collaboration Event".

RULE 5: Format date: "27 March 2026, 2:30 PM - 5:00 PM" or "27 March 2026". Resolve relative dates. If no year, assume current year. If no date, return null.

RULE 6: Cost: "Free", "Refundable Deposit - RM[X]", "Paid - RM[X]", "Paid", "Not specified".

RULE 7: Return true if UTM Merit points are mentioned anywhere, false otherwise.

RULE 8: Extract registration URL if any. Extract benefits (e.g., certificate, food) as a string if mentioned.

RULE 9: Topic Categorization. Choose ONE primary topic from:
- Tech/Coding
- Sports
- Arts/Culture
- Business/Career
- Self-Dev
- Community/Volunteer
- Academic/Science
- Other
</rules>

<task>
Analyse the message and extract the required fields as per the strict JSON schema.
</task>`;

    const prompt = `MESSAGE:\n"""\n${text}\n"""`;

    const schema = {
        type: "object",
        properties: {
            isEvent: { type: "boolean" },
            type: { type: "string" },
            topic: { type: "string" },
            title: { type: "string" },
            date: { type: "string", nullable: true },
            eventEndDate: { type: "string", nullable: true },
            location: { type: "string", nullable: true },
            originalLanguage: { type: "string" },
            translatedText: { type: "string", nullable: true },
            merit: { type: "boolean" },
            cost: { type: "string" },
            registrationUrl: { type: "string", nullable: true },
            benefits: { type: "string", nullable: true }
        },
        required: ["isEvent"]
    };

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                    contents: [
                        { role: 'user', parts: [{ text: "Join our UTM web dev workshop! Tomorrow at N24. Free entry and merit given. Register at bit.ly/webdev. Food provided." }] },
                        { role: 'model', parts: [{ text: JSON.stringify({ isEvent: true, type: "Talk / Seminar / Workshop", topic: "Tech/Coding", title: "UTM Web Dev Workshop", date: "Tomorrow", eventEndDate: "2026-06-25", location: "N24", originalLanguage: "english", translatedText: null, merit: true, cost: "Free", registrationUrl: "bit.ly/webdev", benefits: "Food provided" }) }] },
                        { role: 'user', parts: [{ text: "Just a reminder that our weekly meeting for EXCO members is tonight at 8pm." }] },
                        { role: 'model', parts: [{ text: JSON.stringify({ isEvent: false }) }] },
                        { role: 'user', parts: [{ text: prompt }] }
                    ],
                    generationConfig: {
                        temperature: 1.0,
                        responseMimeType: 'application/json',
                        responseSchema: schema
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

        return JSON.parse(raw);
    } catch (e) {
        logError(`[TelegramListener] Gemini error: ${e.message}`);
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

const TOPIC_TAGS = {
    'Tech/Coding': '1519277264661909554',
    'Sports': '1519277357431525437',
    'Arts/Culture': '1519277384107429908',
    'Business/Career': '1519277415388549241',
    'Self-Dev': '1519277443771269131',
    'Community/Volunteer': '1519277473190383616',
    'Academic/Science': '1519277534045278248'
};

const META_TAGS = {
    'Merit': '1519276701262282792',
    'Paid': '1519276747961536632',
    'Free': '1519276780719050832',
    'External': '1519278024506216609'
};

function isEventPast(eventData) {
    const rawDate = eventData.eventEndDate || eventData.date;
    if (!rawDate) return false;

    // Try to isolate the end date if it's a range like "9 May 2026 - 10 May 2026"
    const dateStr = rawDate.includes(' - ') ? rawDate.split(' - ').pop().trim() : rawDate.trim();
    
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime())) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventDate < today;
}

async function postToDiscord(discordChannel, eventData, channelUsername, originalText) {
    const descriptionText = eventData.translatedText || originalText || '';

    const truncatedDescription = descriptionText.length > 4096
        ? descriptionText.slice(0, 4090) + '…'
        : descriptionText;

    const rawTitle = eventData.title || 'Event Announcement';
    const safeTitle = rawTitle.length > 95 ? rawTitle.slice(0, 95) + '...' : rawTitle;

    const emoji = EVENT_TYPE_EMOJI[eventData.type] || '📅';

    const embed = new EmbedBuilder()
        .setTitle(safeTitle)
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

    const appliedTags = [];
    if (eventData.topic && TOPIC_TAGS[eventData.topic]) appliedTags.push(TOPIC_TAGS[eventData.topic]);
    if (eventData.merit) appliedTags.push(META_TAGS['Merit']);
    if (eventData.cost && eventData.cost.toLowerCase() === 'free') appliedTags.push(META_TAGS['Free']);
    if (eventData.cost && eventData.cost.toLowerCase().includes('paid')) appliedTags.push(META_TAGS['Paid']);
    if (eventData.type === 'External / Collaboration Event') appliedTags.push(META_TAGS['External']);

    const finalTags = appliedTags.slice(0, 5);

    const components = [];
    if (eventData.registrationUrl || eventData.benefits) {
        const row = new ActionRowBuilder();
        if (eventData.registrationUrl) {
            let url = eventData.registrationUrl;
            if (!url.startsWith('http')) url = 'https://' + url;
            row.addComponents(
                new ButtonBuilder()
                    .setLabel('Register Now')
                    .setStyle(ButtonStyle.Link)
                    .setURL(url)
            );
        }
        if (eventData.benefits) {
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId('view_benefits')
                    .setLabel('View Benefits')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎁')
            );
        }
        components.push(row);
    }

    const payload = {
        name: `${emoji} ${safeTitle}`,
        message: { embeds: [embed] }
    };
    if (components.length > 0) payload.message.components = components;
    if (finalTags.length > 0) payload.appliedTags = finalTags;

    try {
        const thread = await discordChannel.threads.create(payload);

        db.run(
            'INSERT INTO telegram_events (thread_id, title, benefits, registration_url) VALUES (?, ?, ?, ?)',
            [thread.id, rawTitle, eventData.benefits || null, eventData.registrationUrl || null]
        );
    } catch (err) {
        logError(`[TelegramListener] Discord API Error creating forum thread: ${err.message}`);
        if (err.rawError) logError(JSON.stringify(err.rawError));
        throw err; // rethrow to be caught by scrapeChannel
    }
}

// ─── Scraper ──────────────────────────────────────────────────────────────────

async function scrapeChannel(discordChannel, channelId, force = false, channelName = null) {
    try {
        // Fix for old DB entries that stored positive IDs
        let parsedId = channelId;
        if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;
        
        const targetId = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
        const messages = await state.telegramClient.getMessages(targetId, { limit: 50 });
        let total = 0, skippedShort = 0, skippedSeen = 0, skippedDupe = 0,
            skippedPast = 0, sentToGemini = 0, eventsFound = 0;

        logInfo(`[DEBUG] Channel ${channelId}: ${messages.length} total messages`);

        for (const msg of messages) {
            total++;

            if (!msg.message || msg.message.trim().length < 30) {
                skippedShort++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (short/empty)`);
                continue;
            }

            if (!force) {
                const seen = await isAlreadySeen(msg.id, channelId);
                if (seen) {
                    skippedSeen++;
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (already seen)`);
                    continue;
                }

                const hash = hashMessageText(msg.message);
                const hashSeen = await isAlreadySeenByHash(hash);
                if (hashSeen) {
                    skippedDupe++;
                    markAsSeen(msg.id, channelId, hash);
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (duplicate content)`);
                    continue;
                }
            }

            if (sentToGemini > 0) await sleep(4200);
            sentToGemini++;
            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SENT TO GEMINI`);

            const result = await analyseWithGemini(msg.message);

            if (result._error) {
                logWarn(`[TelegramListener] Gemini failed for ${channelId} msg ${msg.id}, will retry next cycle`);
                continue;
            }

            const hash = hashMessageText(msg.message);
            markAsSeen(msg.id, channelId, hash);

            if (!result.isEvent) {
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says NOT_EVENT`);
                continue;
            }

            if (isEventPast(result)) {
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (isEventPast determined past event)`);
                skippedPast++;
                continue;
            }

            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says EVENT (${result.type})`);
            eventsFound++;
            await postToDiscord(discordChannel, result, channelName || channelId, msg.message);
            logInfo(`[TelegramListener] Posted: ${result.title} [${result.type}]`);
        }

        logInfo(
            `[DEBUG] ${channelId} SUMMARY: total=${total} short=${skippedShort} ` +
            `seen=${skippedSeen} dupes=${skippedDupe} past=${skippedPast} ` +
            `gemini=${sentToGemini} events=${eventsFound}`
        );

        return { eventsFound, sentToGemini };
    } catch (err) {
        logError(`[TelegramListener] Error scraping ${channelId}: ${err.message}`);
        return { eventsFound: 0, sentToGemini: 0 };
    }
}

// Exported so Discord /scrape command can invoke it manually
async function runScrape(discordClient, options = {}) {
    if (state.isScraping) {
        logWarn('[TelegramListener] Scrape already in progress, skipping.');
        return { skipped: true };
    }

    state.isScraping = true;
    logInfo('[TelegramListener] Starting scrape cycle...');

    if (options.cleardb) {
        logInfo('[TelegramListener] Clearing seen_messages database...');
        await clearSeenMessages();
    }

    // Resolve Discord event channel once per cycle — cache-first to avoid redundant API calls
    const targetDiscordChannelId = '1519270170873565405';
    let discordChannel = discordClient.channels.cache.get(targetDiscordChannelId);
    if (!discordChannel) {
        discordChannel = await discordClient.channels.fetch(targetDiscordChannelId).catch(() => null);
    }
    if (!discordChannel) {
        state.isScraping = false;
        logError('[TelegramListener] Discord event channel not found. Aborting scrape cycle.');
        return { error: 'Discord event channel not found.' };
    }

    let channelsToScrape = await getChannelDetails();
    if (options.targetChannelId) {
        channelsToScrape = channelsToScrape.filter(ch => ch.channel_id === options.targetChannelId);
    }

    let totalEvents = 0, totalGemini = 0;

    for (const ch of channelsToScrape) {
        const { eventsFound, sentToGemini } = await scrapeChannel(discordChannel, ch.channel_id, options.force, ch.channel_name);
        totalEvents += eventsFound;
        totalGemini += sentToGemini;
    }

    state.isScraping = false;
    logInfo('[TelegramListener] Scrape cycle complete.');

    return { channelsScraped: channelsToScrape.length, totalEvents, totalGemini };
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function start(discordClient) {
    state.discordClient = discordClient; // Store for live logging
    
    if (!config.telegramApiId || !config.telegramApiHash) {
        return logWarn('[TelegramListener] Telegram API credentials not set. Skipping.');
    }

    const session = new StringSession(config.telegramSession || '');
    const telegramClient = new TelegramClient(session, config.telegramApiId, config.telegramApiHash, {
        connectionRetries: 5,
    });

    await telegramClient.start({
        phoneNumber: async () => config.telegramPhone,
        password:    async () => config.telegramPassword || '',
        phoneCode:   async () => {
            logInfo('[TelegramListener] Enter the Telegram login code:');
            return new Promise(resolve => process.stdin.once('data', d => resolve(d.toString().trim())));
        },
        onError: (err) => logError(`[TelegramListener] Auth error: ${err}`),
    });

    // Store connected client in shared state so command handlers can access it
    state.telegramClient = telegramClient;

    logInfo('[TelegramListener] Connected to Telegram!');
    logInfo('[TelegramListener] Save this session string to config.telegramSession:\n' + telegramClient.session.save());

    const intervalHours = config.telegramScrapeIntervalHours || 6;
    const cronExpr = `0 */${intervalHours} * * *`;

    await runScrape(discordClient);
    cron.schedule(cronExpr, () => runScrape(discordClient));
    logInfo(`[TelegramListener] Scheduled every ${intervalHours} hours.`);
}

module.exports = { start, runScrape };
