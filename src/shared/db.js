const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../../data/telegram_events.db'));

db.serialize(() => {
    // ── Seen messages (dedup by ID + content hash) ──────────────────────────
    db.run(`CREATE TABLE IF NOT EXISTS seen_messages (
        message_id   TEXT PRIMARY KEY,
        channel      TEXT,
        content_hash TEXT,
        posted_at    INTEGER
    )`);
    // Upgrade path for old DBs — silently ignored if column already exists
    db.run(`ALTER TABLE seen_messages ADD COLUMN content_hash TEXT`, () => {});
    db.run(`CREATE INDEX IF NOT EXISTS idx_content_hash ON seen_messages (content_hash)`);

    // ── Telegram channel list (replaces config.telegramChannels array) ───────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_channels (
        channel_id TEXT PRIMARY KEY,
        added_by   TEXT,
        added_at   INTEGER
    )`);
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
