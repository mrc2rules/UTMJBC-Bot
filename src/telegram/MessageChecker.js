const crypto = require('crypto');
const db     = require('../shared/db');
const { logInfo } = require('./logger');

// ─── Language Detection ───────────────────────────────────────────────────────

const MALAY_KEYWORDS = [
    'dan', 'yang', 'untuk', 'dengan', 'dalam', 'pada', 'kepada',
    'adalah', 'ini', 'itu', 'akan', 'telah', 'tidak', 'bagi', 'atau',
    'semua', 'program', 'tarikh', 'masa', 'lokasi', 'anjuran',
    'mahasiswa', 'sila', 'salam', 'disediakan', 'daftarkan', 'percuma',
    'kolej', 'pelajar', 'universiti', 'pendaftaran', 'dianjurkan',
    'kembali', 'bersama', 'komuniti', 'aktiviti', 'pertandingan'
];

/**
 * Returns true if the text contains enough Malay vocabulary to be considered
 * a Malay-language message (threshold: 4 unique Malay keyword hits).
 */
function detectMalay(text) {
    const words     = text.toLowerCase().split(/\s+/);
    const uniqueHits = new Set(words.filter(w => MALAY_KEYWORDS.includes(w))).size;
    return uniqueHits >= 4;
}

// ─── Exact Content Hash ───────────────────────────────────────────────────────

/**
 * Normalises text and returns its MD5 hex digest.
 * Used as a cheap first-pass exact-duplicate check.
 */
function hashMessageText(text) {
    const normalized = text
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .trim();
    return crypto.createHash('md5').update(normalized).digest('hex');
}

// ─── SimHash (near-duplicate detection) ──────────────────────────────────────
//
// Produces a 64-bit locality-sensitive fingerprint for a piece of text.
// Two messages with a Hamming distance ≤ SIMHASH_THRESHOLD bits are treated
// as near-duplicates (same announcement with minor edits, emoji added, etc.).
//
// Implementation uses pure BigInt — zero npm dependencies required.

const SIMHASH_THRESHOLD = 5; // bits; configurable via config.telegramSimHashThreshold

/**
 * A simple 64-bit FNV-1a-inspired hash for a single token string.
 * Produces a stable BigInt for any given input.
 */
function _hashToken(str) {
    let h = 0xcbf29ce484222325n; // FNV offset basis (64-bit)
    for (let i = 0; i < str.length; i++) {
        h ^= BigInt(str.charCodeAt(i));
        h  = BigInt.asUintN(64, h * 0x100000001b3n); // FNV prime (64-bit)
    }
    return h;
}

/**
 * Computes the SimHash fingerprint of `text`.
 * Returns a 16-character hex string (64-bit fingerprint).
 */
function simHashText(text) {
    const tokens = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 1);

    const v = new Array(64).fill(0);

    for (const token of tokens) {
        const h = _hashToken(token);
        for (let i = 0; i < 64; i++) {
            if ((h >> BigInt(i)) & 1n) {
                v[i] += 1;
            } else {
                v[i] -= 1;
            }
        }
    }

    let fingerprint = 0n;
    for (let i = 0; i < 64; i++) {
        if (v[i] > 0) fingerprint |= (1n << BigInt(i));
    }

    return fingerprint.toString(16).padStart(16, '0');
}

/**
 * Counts the number of differing bits between two 64-bit hex fingerprints.
 */
function _hammingDistance(hexA, hexB) {
    let x    = BigInt('0x' + hexA) ^ BigInt('0x' + hexB);
    let dist = 0;
    while (x > 0n) {
        dist++;
        x &= x - 1n; // clear lowest set bit
    }
    return dist;
}

// ─── Normalised Title Hash ────────────────────────────────────────────────────

/**
 * Normalises an event title and returns its MD5 hex digest.
 * Used to detect when two different message texts describe the same event
 * (matched after Gemini extracts a title from each).
 */
function normaliseTitleHash(title) {
    const normalised = title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return crypto.createHash('md5').update(normalised).digest('hex');
}

// ─── Past-event Guard ─────────────────────────────────────────────────────────

/**
 * Returns true if the event's end/start date is strictly before today.
 * Accepts ISO date strings (YYYY-MM-DD) only.
 */
function isEventPast(eventData) {
    const dateStr = eventData.eventEndDate || eventData.startDate;
    if (!dateStr || !dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

    const now     = new Date();
    const year    = now.getFullYear();
    const month   = String(now.getMonth() + 1).padStart(2, '0');
    const day     = String(now.getDate()).padStart(2, '0');
    const todayISO = `${year}-${month}-${day}`;

    return dateStr < todayISO;
}

// ─── DB Checks ────────────────────────────────────────────────────────────────

/**
 * Returns true if this message ID (from `channelId`) has already been processed.
 */
function isAlreadySeen(messageId, channelId) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM seen_messages WHERE (message_id = ? OR message_id = ?) AND channel = ?',
            [`${channelId}_${messageId}`, `${messageId}`, channelId],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

/**
 * Returns true if a message with this exact content hash has already been processed.
 */
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

/**
 * Returns true if a recently-processed message has a SimHash fingerprint within
 * SIMHASH_THRESHOLD Hamming distance of `simhash`.
 *
 * Loads the last 500 fingerprints from the DB and compares in-memory.
 * At the bot's scale this is negligible overhead.
 */
function isNearDuplicate(simhash, threshold) {
    const effectiveThreshold = threshold ?? SIMHASH_THRESHOLD;
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT simhash FROM seen_messages WHERE simhash IS NOT NULL ORDER BY rowid DESC LIMIT 500',
            [],
            (err, rows) => {
                if (err) return reject(err);
                for (const row of rows) {
                    if (_hammingDistance(simhash, row.simhash) <= effectiveThreshold) {
                        return resolve(true);
                    }
                }
                resolve(false);
            }
        );
    });
}

/**
 * Returns true if an event with a matching (normalised) title has been posted
 * in the last 14 days, preventing cross-channel duplicates of the same event.
 */
function isTitleDuplicate(titleHash) {
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM telegram_events WHERE title_hash = ? AND posted_at > ?',
            [titleHash, fourteenDaysAgo],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

/**
 * Records a message as seen.
 * Returns a Promise so callers can await the DB write before proceeding.
 */
function markAsSeen(messageId, channelId, hash, simhash) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT OR IGNORE INTO seen_messages
                (message_id, channel, content_hash, simhash, posted_at)
             VALUES (?, ?, ?, ?, ?)`,
            [`${channelId}_${messageId}`, channelId, hash || null, simhash || null, Date.now()],
            (err) => {
                if (err) return reject(err);
                resolve();
            }
        );
    });
}

module.exports = {
    detectMalay,
    hashMessageText,
    simHashText,
    normaliseTitleHash,
    isEventPast,
    isAlreadySeen,
    isAlreadySeenByHash,
    isNearDuplicate,
    isTitleDuplicate,
    markAsSeen,
    SIMHASH_THRESHOLD,
};
