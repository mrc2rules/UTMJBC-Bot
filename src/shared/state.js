// Shared mutable state imported by both TelegramListener and Discord command handlers.
// Using a single object reference means mutations are visible across all importers.

const state = {
    // Set to the connected TelegramClient instance once TelegramListener.start() completes.
    // Command handlers check for null before attempting to use it.
    telegramClient: null,

    // Scraping lock — prevents concurrent scrape cycles if /scrape is spammed
    // or if a cron tick fires while a manual scrape is still running.
    isScraping: false,
};

module.exports = state;
