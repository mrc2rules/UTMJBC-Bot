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
const { getKeywordBlacklist } = require('./KeywordBlacklistManager');

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

// ─── Language Detection ───────────────────────────────────────────────────────

const MALAY_KEYWORDS = [
    'dan', 'yang', 'untuk', 'dengan', 'dalam', 'pada', 'kepada',
    'adalah', 'ini', 'itu', 'akan', 'telah', 'tidak', 'bagi', 'atau',
    'semua', 'program', 'tarikh', 'masa', 'lokasi', 'anjuran',
    'mahasiswa', 'sila', 'salam', 'disediakan', 'daftarkan', 'percuma',
    'kolej', 'pelajar', 'universiti', 'pendaftaran', 'dianjurkan',
    'kembali', 'bersama', 'komuniti', 'aktiviti', 'pertandingan'
];

function detectMalay(text) {
    const words = text.toLowerCase().split(/\s+/);
    const hits = words.filter(w => MALAY_KEYWORDS.includes(w)).length;
    return hits >= 4;
}

// ─── LLM Analysis ─────────────────────────────────────────────────────────────

async function analyseWithGemini(text) {
    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isMalay = detectMalay(text);

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

RULE 3: You MUST extract the exact, original message text into 'exactText'. DO NOT summarize or truncate it. If the original message is in Malay or another language, translate the ENTIRE message into English and put the full translation into 'exactText'. The 'title' field must ALWAYS be in English — never leave it empty or generic.

RULE 4: Classify as exactly one of: "Club Activity", "Club Recruitment", "Club Announcement", "Competition / Hackathon", "Talk / Seminar / Workshop", "Faculty / Department Event", "University-wide Event", "External / Collaboration Event".

RULE 5: Format date: "27 March 2026, 2:30 PM - 5:00 PM" or "27 March 2026". Resolve relative dates. If no year, assume current year. If no date, return null.

RULE 6: Cost: "Free", "Refundable Deposit - RM[X]", "Paid - RM[X]", "Paid", "Not specified".

RULE 7: Return true if UTM Merit points are mentioned anywhere, false otherwise.

RULE 8: Extract registration URL if any.

RULE 9: Topic Categorization. Choose ONE primary topic from:
- Tech/Coding
- Sports
- Arts/Culture
- Business/Career
- Self-Dev
- Community/Volunteer
- Academic/Science
- Other

RULE 10: Extract the event start date as "startDate" in ISO format (YYYY-MM-DD). If you can't determine it, return null.
RULE 11: Extract the event start time as "startTime" in 24-hour format (HH:MM). If not specified, return null.
RULE 12: Extract the event end time as "endTime" in 24-hour format (HH:MM). If not specified, return null.
RULE 13: Set "sourceLanguage" to the original language of the message (e.g. "English", "Malay", "Mixed").
</rules>

<critical>
The 'title' field is MANDATORY for events. You MUST always provide a clear, descriptive English event title. NEVER return an empty title or a generic title like "Event" or "Event Announcement".
The 'exactText' field is MANDATORY for events. You MUST always populate it.
</critical>

<task>
Analyse the message and extract the required fields as per the strict JSON schema.
</task>`;

    let promptText = `MESSAGE:\n"""\n${text}\n"""`;
    if (isMalay) {
        promptText = `[LANGUAGE HINT: This message is in Malay. You MUST translate the entire message content into English before extracting fields. The 'title' and 'exactText' MUST be in English.]\n\n${promptText}`;
    }

    const schema = {
        type: "object",
        properties: {
            isEvent: { type: "boolean" },
            type: { type: "string" },
            topic: { type: "string" },
            title: { type: "string" },
            date: { type: "string", nullable: true },
            startDate: { type: "string", nullable: true },
            eventEndDate: { type: "string", nullable: true },
            startTime: { type: "string", nullable: true },
            endTime: { type: "string", nullable: true },
            location: { type: "string", nullable: true },
            exactText: { type: "string" },
            merit: { type: "boolean" },
            cost: { type: "string" },
            registrationUrl: { type: "string", nullable: true },
            sourceLanguage: { type: "string" }
        },
        required: ["isEvent", "title", "exactText", "type", "topic", "merit", "cost", "sourceLanguage"]
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
                        { role: 'user', parts: [{ text: "Join our UTM web dev workshop! Tomorrow from 2:30 PM to 5:00 PM at N24. Free entry and merit given. Register at bit.ly/webdev." }] },
                        { role: 'model', parts: [{ text: JSON.stringify({
                            isEvent: true,
                            type: "Talk / Seminar / Workshop",
                            topic: "Tech/Coding",
                            title: "UTM Web Dev Workshop",
                            date: "Tomorrow, 2:30 PM - 5:00 PM",
                            startDate: "2026-06-25",
                            eventEndDate: "2026-06-25",
                            startTime: "14:30",
                            endTime: "17:00",
                            location: "N24",
                            exactText: "Join our UTM web dev workshop! Tomorrow from 2:30 PM to 5:00 PM at N24. Free entry and merit given. Register at bit.ly/webdev.",
                            merit: true,
                            cost: "Free",
                            registrationUrl: "bit.ly/webdev",
                            sourceLanguage: "English"
                        }) }] },
                        { role: 'user', parts: [{ text: "Just a reminder that our weekly meeting for EXCO members is tonight at 8pm." }] },
                        { role: 'model', parts: [{ text: JSON.stringify({ isEvent: false, title: "", exactText: "", type: "Club Announcement", topic: "Other", merit: false, cost: "Not specified", sourceLanguage: "English" }) }] },
                        { role: 'user', parts: [{ text: promptText }] }
                    ],
                    generationConfig: {
                        temperature: 0.5,
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

        const parsed = JSON.parse(raw);
        parsed._isMalay = isMalay;
        return parsed;
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

// Generates a Google Calendar render URL prefilled with event metadata
function generateGoogleCalendarUrl(eventData) {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    
    const start = eventData.startDate ? eventData.startDate.replace(/-/g, '') : '';
    let end = eventData.eventEndDate ? eventData.eventEndDate.replace(/-/g, '') : start;
    
    let datesParam = '';
    if (start) {
        if (eventData.startTime && typeof eventData.startTime === 'string') {
            const startTimeStr = eventData.startTime.replace(/:/g, '') + '00';
            
            let endTimeStr;
            if (eventData.endTime && typeof eventData.endTime === 'string') {
                endTimeStr = eventData.endTime.replace(/:/g, '') + '00';
            } else {
                const parts = eventData.startTime.split(':');
                const hour = Number(parts[0]);
                const nextHour = String((hour + 1) % 24).padStart(2, '0');
                const min = parts[1] || '00';
                endTimeStr = `${nextHour}${min}00`;
            }
            
            const startDateTime = `${start}T${startTimeStr}`;
            const endDateTime = `${end}T${endTimeStr}`;
            datesParam = `${startDateTime}/${endDateTime}`;
        } else {
            // All-day event (end date is exclusive for Google Calendar templates)
            let exclusiveEnd = start;
            const endDateSource = eventData.eventEndDate || eventData.startDate;
            if (endDateSource) {
                const endDateObj = new Date(endDateSource);
                endDateObj.setDate(endDateObj.getDate() + 1);
                if (!isNaN(endDateObj.getTime())) {
                    const ey = endDateObj.getFullYear();
                    const em = String(endDateObj.getMonth() + 1).padStart(2, '0');
                    const ed = String(endDateObj.getDate()).padStart(2, '0');
                    exclusiveEnd = `${ey}${em}${ed}`;
                }
            }
            datesParam = `${start}/${exclusiveEnd}`;
        }
    }

    let url = `${baseUrl}&text=${encodeURIComponent(eventData.title || 'UTM Event')}`;
    if (datesParam) url += `&dates=${datesParam}`;
    if (eventData.location) url += `&location=${encodeURIComponent(eventData.location)}`;
    
    // Short details description to prevent exceeding Discord's button URL length limit
    url += `&details=${encodeURIComponent('Sourced from Telegram UTM event scraper. View Discord thread for full details.')}`;
    
    // Safety check: Discord button URLs have a maximum length of 512 characters.
    if (url.length > 500) {
        url = `${baseUrl}&text=${encodeURIComponent((eventData.title || 'UTM Event').slice(0, 50))}`;
        if (datesParam) url += `&dates=${datesParam}`;
        if (eventData.location) url += `&location=${encodeURIComponent(eventData.location.slice(0, 50))}`;
        url += `&details=${encodeURIComponent('View Discord details.')}`;
    }
    
    return url;
}

async function postToDiscord(discordChannel, eventData, channelUsername, originalText) {
    const descriptionText = eventData.exactText || originalText || '';

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
    if (eventData.startDate) {
        const calUrl = generateGoogleCalendarUrl(eventData);
        row.addComponents(
            new ButtonBuilder()
                .setLabel('Add to Calendar')
                .setStyle(ButtonStyle.Link)
                .setURL(calUrl)
                .setEmoji('📅')
        );
    }


    if (row.components.length > 0) {
        components.push(row);
    }

    const payload = {
        name: safeTitle,
        message: { embeds: [embed] }
    };
    if (components.length > 0) payload.message.components = components;
    if (finalTags.length > 0) payload.appliedTags = finalTags;

    try {
        const thread = await discordChannel.threads.create(payload);

        db.run(
            'INSERT INTO telegram_events (thread_id, title, registration_url, event_end_date, closed) VALUES (?, ?, ?, ?, 0)',
            [thread.id, rawTitle, eventData.registrationUrl || null, eventData.eventEndDate || null]
        );
    } catch (err) {
        logError(`[TelegramListener] Discord API Error creating forum thread: ${err.message}`);
        if (err.rawError) logError(JSON.stringify(err.rawError));
        throw err; // rethrow to be caught by scrapeChannel
    }
}

// ─── Scraper ──────────────────────────────────────────────────────────────────

async function scrapeChannel(discordChannel, channelId, force = false, channelName = null, blacklist = []) {
    try {
        // Fix for old DB entries that stored positive IDs
        let parsedId = channelId;
        if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;
        
        const targetId = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
        const scrapeLimit = config.telegramScrapeLimit || 20;
        const messages = await state.telegramClient.getMessages(targetId, { limit: scrapeLimit });
        let total = 0, skippedShort = 0, skippedSeen = 0, skippedDupe = 0,
            skippedPast = 0, skippedBlacklisted = 0, sentToGemini = 0, eventsFound = 0;

        logInfo(`[DEBUG] Channel ${channelId}: ${messages.length} total messages`);

        for (const msg of messages) {
            total++;

            if (!msg.message || msg.message.trim().length < 30) {
                skippedShort++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (short/empty)`);
                continue;
            }

            // Case-insensitive blacklist keyword filtering before seen checks or Gemini calls
            if (blacklist.length > 0) {
                const lowerMsg = msg.message.toLowerCase();
                const matchedKeyword = blacklist.find(kw => lowerMsg.includes(kw));
                if (matchedKeyword) {
                    skippedBlacklisted++;
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (contains blacklisted keyword: "${matchedKeyword}")`);
                    continue;
                }
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
            const langTag = detectMalay(msg.message) ? '[lang=Malay]' : '[lang=EN]';
            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SENT TO GEMINI ${langTag}`);

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

            // Guard: skip events where Gemini failed to extract a real title
            if (!result.title || result.title.trim().length === 0 || result.title === 'Event Announcement') {
                logWarn(`[TelegramListener] ${channelId} msg ${msg.id}: SKIPPED (missing/generic title from Gemini)`);
                continue;
            }

            if (isEventPast(result)) {
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (isEventPast determined past event)`);
                skippedPast++;
                continue;
            }

            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says EVENT (${result.type}) ${langTag} title="${result.title}"`);
            eventsFound++;
            await postToDiscord(discordChannel, result, channelName || channelId, msg.message);
            logInfo(`[TelegramListener] Posted: ${result.title} [${result.type}]`);
        }

        logInfo(
            `[DEBUG] ${channelId} SUMMARY: total=${total} short=${skippedShort} ` +
            `seen=${skippedSeen} dupes=${skippedDupe} past=${skippedPast} blacklist=${skippedBlacklisted} ` +
            `gemini=${sentToGemini} events=${eventsFound}`
        );

        return { eventsFound, sentToGemini };
    } catch (err) {
        logError(`[TelegramListener] Error scraping ${channelId}: ${err.message}`);
        return { eventsFound: 0, sentToGemini: 0 };
    }
}

// Automatically locks and archives Discord forum threads for events that have ended
async function autoClosePastEvents(discordClient) {
    logInfo('[AutoClose] Running auto-close checks for past events...');
    
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
                
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const todayISO = `${year}-${month}-${day}`;
                
                let closedCount = 0;
                for (const row of rows) {
                    if (row.event_end_date < todayISO) {
                        try {
                            const thread = await discordClient.channels.fetch(row.thread_id).catch(() => null);
                            if (thread) {
                                await thread.send('🔒 **This event has ended.** The thread is now locked and archived.').catch(() => {});
                                await thread.setLocked(true, 'Event has ended');
                                await thread.setArchived(true, 'Event has ended');
                                logInfo(`[AutoClose] Locked and archived thread ${row.thread_id} ("${row.title}")`);
                            } else {
                                logInfo(`[AutoClose] Thread ${row.thread_id} not found in Discord, marking as closed in DB.`);
                            }
                            
                            await new Promise((resDb, rejDb) => {
                                db.run('UPDATE telegram_events SET closed = 1 WHERE thread_id = ?', [row.thread_id], (errDb) => {
                                    if (errDb) rejDb(errDb);
                                    else resDb();
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

// Exported so Discord /scrape command can invoke it manually
async function runScrape(discordClient, options = {}) {
    if (state.isScraping) {
        logWarn('[TelegramListener] Scrape already in progress, skipping.');
        return { skipped: true };
    }

    state.isScraping = true;
    logInfo('[TelegramListener] Starting scrape cycle...');



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

    let blacklist = [];
    try {
        blacklist = await getKeywordBlacklist();
    } catch (err) {
        logError(`[TelegramListener] Error fetching blacklist: ${err.message}`);
    }

    let channelsToScrape = await getChannelDetails();
    if (options.targetChannelId) {
        channelsToScrape = channelsToScrape.filter(ch => ch.channel_id === options.targetChannelId);
    }

    let totalEvents = 0, totalGemini = 0;

    for (const ch of channelsToScrape) {
        const { eventsFound, sentToGemini } = await scrapeChannel(discordChannel, ch.channel_id, options.force, ch.channel_name, blacklist);
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

    // Run past event auto-closing daily, and once on boot
    cron.schedule('0 0 * * *', () => autoClosePastEvents(discordClient));
    autoClosePastEvents(discordClient).catch(err => logError(`[AutoClose] Error on startup: ${err.message}`));
}

module.exports = { start, runScrape };
