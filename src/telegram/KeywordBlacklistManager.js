const db = require('../shared/db');

// Returns all blacklisted keywords in lowercase
function getKeywordBlacklist() {
    return new Promise((resolve, reject) => {
        db.all('SELECT keyword FROM telegram_blacklist ORDER BY keyword ASC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows.map(r => r.keyword.toLowerCase()));
        });
    });
}

// Returns true if the keyword was added (false if already exists)
function addKeywordToBlacklist(keyword, addedBy) {
    return new Promise((resolve, reject) => {
        const cleanKeyword = keyword.trim().toLowerCase().replace(/\s+/g, ' ');
        if (!cleanKeyword) return resolve(false);
        db.run(
            'INSERT OR IGNORE INTO telegram_blacklist (keyword, added_by, added_at) VALUES (?, ?, ?)',
            [cleanKeyword, addedBy, Date.now()],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

// Returns true if the keyword was removed (false if it didn't exist)
function removeKeywordFromBlacklist(keyword) {
    return new Promise((resolve, reject) => {
        const cleanKeyword = keyword.trim().toLowerCase().replace(/\s+/g, ' ');
        db.run(
            'DELETE FROM telegram_blacklist WHERE keyword = ?',
            [cleanKeyword],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

// Clears all blacklisted keywords
function clearKeywordBlacklist() {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM telegram_blacklist', function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
}

module.exports = {
    getKeywordBlacklist,
    addKeywordToBlacklist,
    removeKeywordFromBlacklist,
    clearKeywordBlacklist
};
