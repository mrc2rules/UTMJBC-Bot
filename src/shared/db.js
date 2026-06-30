const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let config = {};
try { config = require('../../config/config.json'); } catch {}

const legacyDbPath = path.join(__dirname, '../../data/telegram_events.db');

// Use an explicit persistent path from config if set (recommended for hosted environments
// where the app directory may be recreated on deploy). Falls back to the local data/ folder.
const dbDir = config.dbPath
    ? path.resolve(config.dbPath)
    : path.join(__dirname, '../../data');

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const targetDbPath = path.join(dbDir, 'telegram_events.db');

// Auto-copy existing legacy database to persistent path on first run
if (targetDbPath !== legacyDbPath && !fs.existsSync(targetDbPath) && fs.existsSync(legacyDbPath)) {
    console.log(`[Database] Copying existing telegram_events.db from legacy path to persistent location...`);
    fs.copyFileSync(legacyDbPath, targetDbPath);
}

const db = new sqlite3.Database(targetDbPath);
console.log(`[Database] Using database at: ${targetDbPath}`);

db.serialize(() => {
    // ── Seen messages (dedup by ID + content hash + SimHash fingerprint) ──────
    db.run(`CREATE TABLE IF NOT EXISTS seen_messages (
        message_id   TEXT PRIMARY KEY,
        channel      TEXT,
        content_hash TEXT,
        simhash      TEXT,
        posted_at    INTEGER
    )`);
    // Upgrade paths for old DBs — silently ignored if columns already exist
    db.run(`ALTER TABLE seen_messages ADD COLUMN content_hash TEXT`, () => {});
    db.run(`ALTER TABLE seen_messages ADD COLUMN simhash TEXT`,      () => {});
    db.run(`CREATE INDEX IF NOT EXISTS idx_content_hash ON seen_messages (content_hash)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_simhash      ON seen_messages (simhash)`);

    // ── Telegram channel list (replaces config.telegramChannels array) ───────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_channels (
        channel_id TEXT PRIMARY KEY,
        channel_name TEXT,
        added_by   TEXT,
        added_at   INTEGER
    )`);
    db.run(`ALTER TABLE telegram_channels ADD COLUMN channel_name TEXT`, () => {});

    // ── Telegram events (stores event info for discord buttons + title dedup) ─
    db.run(`CREATE TABLE IF NOT EXISTS telegram_events (
        thread_id        TEXT PRIMARY KEY,
        title            TEXT,
        benefits         TEXT,
        registration_url TEXT,
        event_end_date   TEXT,
        title_hash       TEXT,
        posted_at        INTEGER,
        closed           INTEGER DEFAULT 0
    )`);
    db.run(`ALTER TABLE telegram_events ADD COLUMN event_end_date TEXT`,        () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN closed INTEGER DEFAULT 0`,    () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN title_hash TEXT`,             () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN posted_at INTEGER`,           () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN event_type TEXT`,             () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN topic TEXT`,                  () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN cost TEXT`,                   () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN merit INTEGER DEFAULT 0`,     () => {});
    db.run(`CREATE INDEX IF NOT EXISTS idx_title_hash ON telegram_events (title_hash)`);

    // ── Scraper daily stats (for deduplication and throughput metrics) ───────
    db.run(`CREATE TABLE IF NOT EXISTS scraper_daily_stats (
        date TEXT PRIMARY KEY,
        messages_scraped INTEGER DEFAULT 0,
        skipped_short INTEGER DEFAULT 0,
        skipped_blacklist INTEGER DEFAULT 0,
        skipped_seen INTEGER DEFAULT 0,
        skipped_exact_duplicate INTEGER DEFAULT 0,
        skipped_near_duplicate INTEGER DEFAULT 0,
        skipped_past INTEGER DEFAULT 0,
        skipped_title_duplicate INTEGER DEFAULT 0,
        sent_to_gemini INTEGER DEFAULT 0,
        events_found INTEGER DEFAULT 0
    )`);

    // ── Telegram blacklist ──────────────────────────────────────────────────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_blacklist (
        keyword TEXT PRIMARY KEY,
        added_by TEXT,
        added_at INTEGER
    )`);

    // ── Migration: Normalize legacy positive numeric IDs to -100 prefixed ───
    db.all(`SELECT channel_id FROM telegram_channels`, [], (err, rows) => {
        if (!err && rows) {
            rows.forEach(row => {
                if (/^\d+$/.test(row.channel_id)) {
                    const newId = '-100' + row.channel_id;
                    db.run(`UPDATE telegram_channels SET channel_id = ? WHERE channel_id = ?`, [newId, row.channel_id]);
                }
            });
        }
    });
    db.all(`SELECT message_id, channel FROM seen_messages`, [], (err, rows) => {
        if (!err && rows) {
            rows.forEach(row => {
                if (/^\d+$/.test(row.channel)) {
                    const newChannel = '-100' + row.channel;
                    // Fix composite message_id that contains the old channel ID
                    const newMessageId = row.message_id.startsWith(row.channel + '_') 
                        ? row.message_id.replace(row.channel + '_', newChannel + '_')
                        : row.message_id;
                    db.run(`UPDATE seen_messages SET channel = ?, message_id = ? WHERE channel = ? AND message_id = ?`, 
                        [newChannel, newMessageId, row.channel, row.message_id]);
                }
            });
        }
    });
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────
// Closes the DB cleanly before exit so SQLite doesn't leave a corrupt/locked file
// on Ctrl+C, Docker restarts, or server reboots mid-write

function closeDb(signal) {
    console.log(`\n[System] ${signal} received — closing database...`);
    db.close((err) => {
        if (err) console.error('[Database] Error closing DB:', err.message);
        else console.log('[Database] Closed successfully.');
        process.exit(0);
    });
}

process.on('SIGINT',  () => closeDb('SIGINT'));
process.on('SIGTERM', () => closeDb('SIGTERM'));

module.exports = db;
