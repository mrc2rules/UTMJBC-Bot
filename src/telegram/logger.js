const fs   = require('fs');
const path = require('path');
const config = require('../../config/config.json');
const state  = require('../shared/state');

// ─── Live Log Buffer ──────────────────────────────────────────────────────────
// Batches log lines and flushes them to the Discord live-log channel every
// 2 seconds (or immediately when the buffer exceeds 1 800 characters).

let liveLogBuffer  = '';
let liveLogTimeout = null;

function flushLiveLogs() {
    if (!liveLogBuffer || !state.discordClient) return;
    const msg      = liveLogBuffer;
    liveLogBuffer  = '';
    liveLogTimeout = null;

    const targetLogChannelId = config.discordLiveLogId || '1519284305464004678';
    const logChannel = state.discordClient.channels.cache.get(targetLogChannelId);
    if (logChannel) {
        logChannel.send(`\`\`\`\n${msg.substring(0, 1990)}\n\`\`\``).catch(() => {});
    }
}

// ─── File Writer ──────────────────────────────────────────────────────────────

function appendToLog(msg) {
    const timestamp = new Date().toISOString();
    const logStr    = `[${timestamp}] ${msg}\n`;
    const logDir    = path.join(__dirname, '../../logs');
    const logPath   = path.join(logDir, 'telegram.log');

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

// ─── Public Log Helpers ───────────────────────────────────────────────────────

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

module.exports = { logInfo, logError, logWarn };
