const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { runScrape } = require('../telegram/TelegramListener');
const { getChannelDetails, clearSeenMessages } = require('../telegram/ChannelManager');
const state = require('../shared/state');

module.exports = {
    definition: {
        name: 'scrape',
        description: 'Manually trigger a Telegram scrape cycle. (Admin only)',
        options: [
            {
                name: 'channel',
                description: 'Optional. Scrape only a specific channel.',
                type: ApplicationCommandOptionType.String,
                required: false,
                autocomplete: true,
            },
            {
                name: 'force',
                description: 'Optional. Force scrape (bypass seen messages check).',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: 'cleardb',
                description: 'Optional. Clear the seen_messages database only (no scrape is run).',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            }
        ]
    },

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        try {
            const channels = await getChannelDetails();
            const choices = channels.map(ch => ({
                name: `${ch.channel_name || 'Unknown'} (${ch.channel_id})`,
                value: ch.channel_id
            }));
            const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue));
            await interaction.respond(filtered.slice(0, 25));
        } catch (e) {
            await interaction.respond([]);
        }
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

        const targetChannelId = interaction.options.getString('channel');
        const force = interaction.options.getBoolean('force') || false;
        const cleardb = interaction.options.getBoolean('cleardb') || false;

        // cleardb-only mode: wipe the seen_messages table and return immediately
        if (cleardb) {
            try {
                const deleted = await clearSeenMessages();
                return interaction.editReply(`🗑️ **Seen messages database cleared!** Removed ${deleted} entr${deleted === 1 ? 'y' : 'ies'}.\nRun \`/scrape\` without \`cleardb\` to start a fresh scrape cycle.`);
            } catch (err) {
                console.error('[ScrapeCommand] cleardb error:', err);
                return interaction.editReply('❌ Failed to clear the seen messages database.');
            }
        }

        try {
            const result = await runScrape(interaction.client, { targetChannelId, force });
            
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
