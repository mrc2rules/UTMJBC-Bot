const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db         = require('../shared/db');
const { logError } = require('./logger');

// ─── Constants ────────────────────────────────────────────────────────────────

const EVENT_TYPE_EMOJI = {
    'Club Activity':                  '🎯',
    'Club Recruitment':               '📣',
    'Club Announcement':              '📋',
    'Competition / Hackathon':        '🏆',
    'Talk / Seminar / Workshop':      '🎤',
    'Faculty / Department Event':     '🏫',
    'University-wide Event':          '🎓',
    'External / Collaboration Event': '🤝',
};

const EMBED_COLORS = [
    0x3498db, 0x2ecc71, 0x9b59b6, 0xe67e22,
    0x1abc9c, 0xe91e63, 0xf1c40f, 0x00bcd4,
    0xff5722, 0x8bc34a,
];

const TOPIC_TAGS = {
    'Tech/Coding':          '1519277264661909554',
    'Sports':               '1519277357431525437',
    'Arts/Culture':         '1519277384107429908',
    'Business/Career':      '1519277415388549241',
    'Self-Dev':             '1519277443771269131',
    'Community/Volunteer':  '1519277473190383616',
    'Academic/Science':     '1519277534045278248'
};

const META_TAGS = {
    'Merit':    '1519276701262282792',
    'Paid':     '1519276747961536632',
    'Free':     '1519276780719050832',
    'External': '1519278024506216609'
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomEmbedColor() {
    return EMBED_COLORS[Math.floor(Math.random() * EMBED_COLORS.length)];
}

/**
 * Generates a Google Calendar deep-link prefilled with event metadata.
 * Returns an empty string if the event has no start date.
 */
function generateGoogleCalendarUrl(eventData) {
    if (!eventData.startDate || !eventData.startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return '';
    }

    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const start   = eventData.startDate.replace(/-/g, '');
    let   end     = eventData.eventEndDate && eventData.eventEndDate.match(/^\d{4}-\d{2}-\d{2}$/)
        ? eventData.eventEndDate.replace(/-/g, '')
        : start;

    let datesParam = '';

    if (eventData.startTime && typeof eventData.startTime === 'string') {
        const startTimeStr = eventData.startTime.replace(/:/g, '') + '00';

        let endTimeStr;
        if (eventData.endTime && typeof eventData.endTime === 'string') {
            endTimeStr = eventData.endTime.replace(/:/g, '') + '00';
        } else {
            const parts   = eventData.startTime.split(':');
            const hour    = Number(parts[0]);
            const nextHour = String((hour + 1) % 24).padStart(2, '0');
            const min     = parts[1] || '00';
            endTimeStr    = `${nextHour}${min}00`;
        }

        datesParam = `${start}T${startTimeStr}/${end}T${endTimeStr}`;
    } else {
        // All-day event — end date is exclusive in Google Calendar templates
        let exclusiveEnd = start;
        const endDateSource = eventData.eventEndDate || eventData.startDate;
        if (endDateSource && endDateSource.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [y, m, d] = endDateSource.split('-').map(Number);
            const endDateObj = new Date(Date.UTC(y, m - 1, d + 1));
            exclusiveEnd = `${endDateObj.getUTCFullYear()}${String(endDateObj.getUTCMonth() + 1).padStart(2, '0')}${String(endDateObj.getUTCDate()).padStart(2, '0')}`;
        }
        datesParam = `${start}/${exclusiveEnd}`;
    }

    let url = `${baseUrl}&text=${encodeURIComponent(eventData.title || 'UTM Event')}`;
    if (datesParam)         url += `&dates=${datesParam}`;
    if (eventData.location) url += `&location=${encodeURIComponent(eventData.location)}`;
    url += `&details=${encodeURIComponent('Sourced from Telegram UTM event scraper. View Discord thread for full details.')}`;

    // Discord button URLs max 512 characters — truncate gracefully
    if (url.length > 500) {
        url = `${baseUrl}&text=${encodeURIComponent((eventData.title || 'UTM Event').slice(0, 50))}`;
        if (datesParam)         url += `&dates=${datesParam}`;
        if (eventData.location) url += `&location=${encodeURIComponent(eventData.location.slice(0, 50))}`;
        url += `&details=${encodeURIComponent('View Discord details.')}`;
    }

    return url;
}

// ─── Main Post Function ───────────────────────────────────────────────────────

/**
 * Builds a Discord embed from Gemini event data and creates a forum thread.
 * Also persists the thread to the `telegram_events` table.
 *
 * @param {import('discord.js').ForumChannel} discordChannel
 * @param {object}  eventData       - Structured data returned by analyseWithGemini
 * @param {string}  channelUsername - Human-readable source channel name
 * @param {string}  originalText    - Raw Telegram message text (fallback for description)
 * @param {string}  titleHash       - Normalised title hash (stored for cross-channel dedup)
 */
async function postToDiscord(discordChannel, eventData, channelUsername, originalText, titleHash) {
    // ── Description ────────────────────────────────────────────────────────────
    let descriptionText = eventData.exactText || originalText || '';

    // Unescape any literal \n sequences that survived JSON round-tripping
    descriptionText = descriptionText
        .replace(/\\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n');

    const truncatedDescription = descriptionText.length > 4096
        ? descriptionText.slice(0, 4090) + '…'
        : descriptionText;

    // ── Title ──────────────────────────────────────────────────────────────────
    const rawTitle  = eventData.title || 'Event Announcement';
    const safeTitle = rawTitle.length > 95 ? rawTitle.slice(0, 95) + '...' : rawTitle;

    // ── Embed ──────────────────────────────────────────────────────────────────
    const embed = new EmbedBuilder()
        .setTitle(safeTitle)
        .setDescription(truncatedDescription)
        .setColor(randomEmbedColor())
        .addFields(
            { name: '🗂️ Type',      value: eventData.type     || 'Not specified', inline: true },
            { name: '📆 Date/Time', value: eventData.date     || 'Not specified', inline: true },
            { name: '📍 Location',  value: eventData.location || 'Not specified', inline: true },
            { name: '📢 Source',    value: `${channelUsername}`,                  inline: true },
            { name: '🏅 UTM Merit', value: eventData.merit ? 'Yes' : 'No',       inline: true },
            { name: '💰 Cost',      value: eventData.cost     || 'Not specified', inline: true }
        )
        .setFooter({ text: 'UTMJBC Event Feed • Sourced from Telegram' })
        .setTimestamp();

    // ── Tags ───────────────────────────────────────────────────────────────────
    const appliedTags = [];
    if (eventData.topic && TOPIC_TAGS[eventData.topic]) appliedTags.push(TOPIC_TAGS[eventData.topic]);
    if (eventData.merit)                                 appliedTags.push(META_TAGS['Merit']);
    if (eventData.cost?.toLowerCase() === 'free')        appliedTags.push(META_TAGS['Free']);
    if (eventData.cost?.toLowerCase().includes('paid'))  appliedTags.push(META_TAGS['Paid']);
    if (eventData.type === 'External / Collaboration Event') appliedTags.push(META_TAGS['External']);
    const finalTags = appliedTags.slice(0, 5);

    // ── Buttons ────────────────────────────────────────────────────────────────
    const components = [];
    const row        = new ActionRowBuilder();

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
        if (calUrl) {
            row.addComponents(
                new ButtonBuilder()
                    .setLabel('Add to Calendar')
                    .setStyle(ButtonStyle.Link)
                    .setURL(calUrl)
                    .setEmoji('📅')
            );
        }
    }
    if (row.components.length > 0) components.push(row);

    // ── Create Thread ──────────────────────────────────────────────────────────
    const payload = { name: safeTitle, message: { embeds: [embed] } };
    if (components.length > 0) payload.message.components = components;
    if (finalTags.length > 0)  payload.appliedTags = finalTags;

    try {
        const thread = await discordChannel.threads.create(payload);

        db.run(
            `INSERT INTO telegram_events
                 (thread_id, title, registration_url, event_end_date, title_hash, posted_at, closed)
             VALUES (?, ?, ?, ?, ?, ?, 0)`,
            [
                thread.id,
                rawTitle,
                eventData.registrationUrl || null,
                eventData.eventEndDate    || null,
                titleHash                 || null,
                Date.now()
            ]
        );
    } catch (err) {
        logError(`[DiscordPublisher] Discord API Error creating forum thread: ${err.message}`);
        if (err.rawError) logError(JSON.stringify(err.rawError));
        throw err; // rethrow so scrapeChannel can handle it
    }
}

module.exports = { postToDiscord };
