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
        channel_name TEXT,
        added_by   TEXT,
        added_at   INTEGER
    )`);
    db.run(`ALTER TABLE telegram_channels ADD COLUMN channel_name TEXT`, () => {});

    // ── Telegram events (stores event info for discord buttons) ─────────────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_events (
        thread_id        TEXT PRIMARY KEY,
        title            TEXT,
        benefits         TEXT,
        registration_url TEXT
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
