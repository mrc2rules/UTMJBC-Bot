const { TelegramClient } = require('telegram');
const { StringSession }  = require('telegram/sessions');
const cron               = require('node-cron');
const config             = require('../../config/config.json');

const state              = require('../shared/state');
const { logInfo, logWarn, logError } = require('./logger');
const { runScrape, autoClosePastEvents } = require('./Scraper');

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

    // ── Scrape schedule ──────────────────────────────────────────────────────
    const intervalHours = config.telegramScrapeIntervalHours || 6;
    const cronExpr      = `0 */${intervalHours} * * *`;

    await runScrape(discordClient);
    cron.schedule(cronExpr, () => runScrape(discordClient));
    logInfo(`[TelegramListener] Scrape scheduled every ${intervalHours} hours.`);

    // ── Auto-close schedule ──────────────────────────────────────────────────
    cron.schedule('0 0 * * *', () => autoClosePastEvents(discordClient));
    autoClosePastEvents(discordClient).catch(err =>
        logError(`[AutoClose] Error on startup: ${err.message}`)
    );
}

module.exports = { start, runScrape };
