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

// Require logger lazily or directly
const { logInfo, logError } = require('./logger');

// Auto-copy existing legacy database to persistent path on first run
if (targetDbPath !== legacyDbPath && !fs.existsSync(targetDbPath) && fs.existsSync(legacyDbPath)) {
    logInfo(`[Database] Copying existing telegram_events.db from legacy path to persistent location...`);
    fs.copyFileSync(legacyDbPath, targetDbPath);
}

const db = new sqlite3.Database(targetDbPath);
logInfo(`[Database] Using database at: ${targetDbPath}`);

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
    db.run(`ALTER TABLE telegram_events ADD COLUMN embedding BLOB`,              () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN spam_report_msg_id TEXT DEFAULT NULL`, () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN spam_report_count INTEGER DEFAULT 0`, () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN spam_status TEXT DEFAULT 'none'`, () => {});
    db.run(`CREATE INDEX IF NOT EXISTS idx_title_hash ON telegram_events (title_hash)`);

    // ── Telegram blacklist ──────────────────────────────────────────────────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_blacklist (
        keyword TEXT PRIMARY KEY,
        added_by TEXT,
        added_at INTEGER
    )`);

    // ── Channel Cursors (for incremental scraping FLAW-7) ───────────────────
    db.run(`CREATE TABLE IF NOT EXISTS channel_cursors (
        channel_id      TEXT PRIMARY KEY,
        last_message_id INTEGER,
        updated_at      INTEGER
    )`);
    db.run(`ALTER TABLE channel_cursors ADD COLUMN last_message_id INTEGER`, () => {});

    // ── Scrape Runs (for scraping statistics FEAT-3) ────────────────────────
    db.run(`CREATE TABLE IF NOT EXISTS scrape_runs (
        run_id           INTEGER PRIMARY KEY AUTOINCREMENT,
        run_at           INTEGER,
        duration_sec     REAL,
        channels_scraped INTEGER,
        total_messages   INTEGER,
        events_found     INTEGER
    )`);

    // ── Schema Migrations (FLAW-6: prevent bounded table scan on every boot) ─
    db.run(`CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY)`);

    db.get(`SELECT version FROM schema_migrations WHERE version = 'normalize_channel_ids_v1'`, [], (err, row) => {
        if (!err && !row) {
            logInfo(`[Database] Running one-time channel ID normalization migration...`);
            db.run(`UPDATE telegram_channels SET channel_id = '-100' || channel_id WHERE channel_id NOT LIKE '-%' AND channel_id GLOB '[0-9]*'`);
            db.run(`UPDATE seen_messages SET message_id = '-100' || message_id, channel = '-100' || channel WHERE channel NOT LIKE '-%' AND channel GLOB '[0-9]*'`);
            db.run(`INSERT INTO schema_migrations (version) VALUES ('normalize_channel_ids_v1')`);
        }
    });
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────
// Closes the DB cleanly before exit so SQLite doesn't leave a corrupt/locked file
// on Ctrl+C, Docker restarts, or server reboots mid-write

function closeDb(signal) {
    logInfo(`\n[System] ${signal} received — closing database...`);
    db.close((err) => {
        if (err) logError(`[Database] Error closing DB: ${err.message}`);
        else logInfo('[Database] Closed successfully.');
        process.exit(0);
    });
}

process.on('SIGINT',  () => closeDb('SIGINT'));
process.on('SIGTERM', () => closeDb('SIGTERM'));

module.exports = db;
