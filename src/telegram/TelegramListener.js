const { TelegramClient } = require('telegram');
const { StringSession }  = require('telegram/sessions');
const cron               = require('node-cron');
const config             = require('../../config/config.json');

const state              = require('../shared/state');
const { logInfo, logWarn, logError } = require('./logger');
const { runScrape, autoClosePastEvents } = require('./Scraper');

// Holds the cron task so /scrape stop can cancel it
let scrapeCronTask = null;

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function start(discordClient) {
    state.discordClient = discordClient; // Make the Discord client available to the live logger

    if (!config.telegramApiId || !config.telegramApiHash) {
        return logWarn('[TelegramListener] Telegram API credentials not set. Skipping.');
    }

    const session        = new StringSession(config.telegramSession || '');
    const telegramClient = new TelegramClient(session, config.telegramApiId, config.telegramApiHash, {
        connectionRetries: 5,
    });

    try {
        await telegramClient.start({
            phoneNumber: async () => config.telegramPhone,
            password:    async () => config.telegramPassword || '',
            phoneCode:   async () => {
                logInfo('[TelegramListener] Enter the Telegram login code:');
                return new Promise(resolve => process.stdin.once('data', d => resolve(d.toString().trim())));
            },
            onError: (err) => logError(`[TelegramListener] Auth error: ${err}`),
        });

        // Store the connected client in shared state so Scraper (and any command
        // handlers) can access it without circular imports.
        state.telegramClient = telegramClient;

        logInfo('[TelegramListener] Connected to Telegram!');
        logInfo('[TelegramListener] Save this session string to config.telegramSession:\n' + telegramClient.session.save());

        // ── Auto-close schedule (still runs automatically) ──────────────────────
        cron.schedule('0 0 * * *', () => autoClosePastEvents(discordClient));
        autoClosePastEvents(discordClient).catch(err =>
            logError(`[AutoClose] Error on startup: ${err.message}`)
        );

        logInfo('[TelegramListener] Ready. Use /scrape to start a scrape cycle.');
    } catch (err) {
        logError(`[TelegramListener] Failed to connect to Telegram: ${err.message || err}`);
    }
}

/**
 * Starts the periodic cron scrape schedule.
 * Called by /scrape start (or /scrape with no action).
 */
function startScrapeCron(discordClient) {
    if (scrapeCronTask) {
        logWarn('[TelegramListener] Scrape cron is already running.');
        return false;
    }
    const intervalHours = config.telegramScrapeIntervalHours || 6;
    const cronExpr      = `0 */${intervalHours} * * *`;
    scrapeCronTask = cron.schedule(cronExpr, () => runScrape(discordClient));
    logInfo(`[TelegramListener] Scrape cron started — running every ${intervalHours} hours.`);
    return true;
}

/**
 * Stops the periodic cron scrape schedule.
 * Called by /scrape stop.
 */
function stopScrapeCron() {
    if (!scrapeCronTask) {
        logWarn('[TelegramListener] No scrape cron is currently running.');
        return false;
    }
    scrapeCronTask.stop();
    scrapeCronTask = null;
    logInfo('[TelegramListener] Scrape cron stopped.');
    return true;
}

/** Returns true if the periodic cron is currently active. */
function isScrapeCronActive() {
    return scrapeCronTask !== null;
}

module.exports = { start, runScrape, startScrapeCron, stopScrapeCron, isScrapeCronActive };
