const db = require('../shared/db');

// Returns all tracked channel IDs as a plain string array
function getChannels() {
    return new Promise((resolve, reject) => {
        db.all('SELECT channel_id FROM telegram_channels ORDER BY added_at ASC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows.map(r => r.channel_id));
        });
    });
}

// Returns full rows (channel_id, added_by, added_at) for display purposes
function getChannelDetails() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM telegram_channels ORDER BY added_at ASC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function channelExists(channelId) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM telegram_channels WHERE channel_id = ?',
            [String(channelId)],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

// Returns true if the row was inserted (false if it already existed)
function addChannel(channelId, addedBy) {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT OR IGNORE INTO telegram_channels (channel_id, added_by, added_at) VALUES (?, ?, ?)',
            [String(channelId), addedBy, Date.now()],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

// Returns true if the row was deleted (false if it didn't exist)
function removeChannel(channelId) {
    return new Promise((resolve, reject) => {
        db.run(
            'DELETE FROM telegram_channels WHERE channel_id = ?',
            [String(channelId)],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

module.exports = { getChannels, getChannelDetails, channelExists, addChannel, removeChannel };
