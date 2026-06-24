const { PermissionsBitField } = require('discord.js');
const { runScrape } = require('../telegram/TelegramListener');
const state = require('../shared/state');

module.exports = {
    definition: {
        name: 'scrape',
        description: 'Manually trigger a Telegram scrape cycle. (Admin only)'
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        if (state.isScraping) {
            return interaction.reply({
                content: '⚠️ A scrape cycle is already running in the background.',
                ephemeral: true,
            });
        }

        if (!state.telegramClient) {
            return interaction.reply({
                content: '❌ Telegram client is not connected yet. Please try again in a moment.',
                ephemeral: true,
            });
        }

        // We defer since scraping might take some time and we don't want the interaction to time out.
        await interaction.deferReply({ ephemeral: true });

        try {
            const result = await runScrape(interaction.client);
            
            if (result.skipped) {
                return interaction.editReply('⚠️ Scrape skipped (already running).');
            }
            if (result.error) {
                return interaction.editReply(`❌ Scrape failed: ${result.error}`);
            }

            return interaction.editReply(
                `✅ **Scrape complete!**\n` +
                `- Channels Scraped: ${result.channelsScraped}\n` +
                `- Messages Processed by Gemini: ${result.totalGemini}\n` +
                `- Events Found & Posted: ${result.totalEvents}`
            );
        } catch (error) {
            console.error('[ScrapeCommand] Error:', error);
            return interaction.editReply('❌ An unexpected error occurred during the scrape.');
        }
    },
};
