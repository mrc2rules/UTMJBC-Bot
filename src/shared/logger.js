const fs   = require('fs');
const path = require('path');
let config = {};
try { config = require('../../config/config.json'); } catch {}
const state  = require('./state');

// ─── Live Log Buffer ──────────────────────────────────────────────────────────
// Batches log lines and flushes them to the Discord live-log channel every
// 2 seconds (or immediately when the buffer exceeds 1800 characters).

let liveLogBuffer  = '';
let liveLogTimeout = null;

async function flushLiveLogs() {
    if (!liveLogBuffer || !state.discordClient) return;
    const msg      = liveLogBuffer;
    liveLogBuffer  = '';
    liveLogTimeout = null;

    const targetLogChannelId = config.discordLiveLogId || '1519284305464004678';
    let logChannel = state.discordClient.channels.cache.get(targetLogChannelId);
    if (!logChannel) {
        logChannel = await state.discordClient.channels.fetch(targetLogChannelId).catch(() => null);
    }
    if (logChannel) {
        const chunks = [];
        for (let i = 0; i < msg.length; i += 1980) {
            chunks.push(msg.substring(i, i + 1980));
        }
        for (const chunk of chunks) {
            await logChannel.send(`\`\`\`ansi\n${chunk}\n\`\`\``).catch(err => {
                console.error('[logger] Failed to send live log to Discord:', err.message);
            });
        }
    }
}

// ─── File Writer & Daily Rotation ─────────────────────────────────────────────

function appendToLog(ansiLevel, rawLevel, msg) {
    const now = new Date();
    const timestamp = now.toISOString();
    const dateStr = timestamp.slice(0, 10); // YYYY-MM-DD

    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    // Daily log file
    const logPath = path.join(logDir, `bot-${dateStr}.log`);
    const plainLogStr = `[${timestamp}] [${rawLevel.padEnd(5)}] ${msg}\n`;
    fs.appendFile(logPath, plainLogStr, () => {});

    // Also maintain latest telegram.log for backward compatibility
    const compatPath = path.join(logDir, 'telegram.log');
    fs.appendFile(compatPath, plainLogStr, () => {});

    // Format for Discord with ANSI code
    const discordLogStr = `[${timestamp.slice(11, 19)}] ${ansiLevel} ${msg}\n`;
    liveLogBuffer += discordLogStr;

    if (!liveLogTimeout) {
        liveLogTimeout = setTimeout(flushLiveLogs, 2000);
    }
    if (liveLogBuffer.length > 1800) {
        clearTimeout(liveLogTimeout);
        flushLiveLogs();
    }
}

// ─── Public Log Helpers ───────────────────────────────────────────────────────

function logDebug(msg) {
    if (config.verbose === false) return;
    console.debug(`[DEBUG] ${msg}`);
    appendToLog('\u001b[90m[DEBUG]\u001b[0m', 'DEBUG', msg);
}

function logInfo(msg) {
    console.log(`[INFO] ${msg}`);
    appendToLog('\u001b[32m[INFO ]\u001b[0m', 'INFO', msg);
}

function logWarn(msg) {
    console.warn(`[WARN] ${msg}`);
    appendToLog('\u001b[33m[WARN ]\u001b[0m', 'WARN', msg);
}

function logError(msg) {
    console.error(`[ERROR] ${msg}`);
    appendToLog('\u001b[31m[ERROR]\u001b[0m', 'ERROR', msg);
}

module.exports = { logDebug, logInfo, logWarn, logError };
