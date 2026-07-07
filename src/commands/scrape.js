const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { runScrape, startScrapeCron, stopScrapeCron, isScrapeCronActive } = require('../telegram/TelegramListener');
const { getChannelDetails, clearSeenMessages } = require('../telegram/ChannelManager');
const state = require('../shared/state');

module.exports = {
    definition: {
        name: 'scrape',
        description: 'Manage Telegram scraping. (Admin only)',
        options: [
            {
                name: 'action',
                description: 'What to do: run a scrape now, start auto-scraping, or stop it.',
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: [
                    { name: 'Run Now (Scrape immediately)', value: 'run' },
                    { name: 'Start Auto (Enable scheduled scraping)', value: 'start' },
                    { name: 'Stop (Abort active scrape & stop auto)', value: 'stop' },
                ],
            },
            {
                name: 'channel',
                description: 'Optional. Scrape only a specific channel (used with "run").',
                type: ApplicationCommandOptionType.String,
                required: false,
                autocomplete: true,
            },
            {
                name: 'force',
                description: 'Optional. Bypass the seen-messages check (used with "run").',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
        ],
    },

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        try {
            const channels = await getChannelDetails();
            const choices = channels.map(ch => ({
                name: `${ch.channel_name || 'Unknown'} (${ch.channel_id})`,
                value: ch.channel_id,
            }));
            const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue));
            await interaction.respond(filtered.slice(0, 25));
        } catch {
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

        const action        = interaction.options.getString('action') || 'run';
        const targetChannelId = interaction.options.getString('channel');
        const force           = interaction.options.getBoolean('force')   || false;

        // ── stop ──────────────────────────────────────────────────────────────
        if (action === 'stop') {
            const stoppedCron = stopScrapeCron();
            let stoppedActive = false;

            if (state.isScraping) {
                state.cancelScrape = true;
                stoppedActive = true;
            }

            if (!stoppedActive && !stoppedCron) {
                return interaction.reply({
                    content: '⚠️ **No Action Taken**: No active scrape cycle or auto-scraping schedule is running.',
                    ephemeral: true,
                });
            }

            return interaction.reply({
                content: '⏹️ **Scraping Stopped**: Active cycle aborted and background schedule disabled.',
                ephemeral: true,
            });
        }

        // ── start (enable cron schedule) ──────────────────────────────────────
        if (action === 'start') {
            if (!state.telegramClient) {
                return interaction.reply({
                    content: '❌ **Not Connected**: Telegram client is offline. Please try again shortly.',
                    ephemeral: true,
                });
            }
            const started = startScrapeCron(interaction.client);
            return interaction.reply({
                content: started
                    ? '🔁 **Auto-Scraping Enabled**: Scheduled background scraping is active.'
                    : '⚠️ **Already Running**: Auto-scraping is already active.',
                ephemeral: true,
            });
        }

        // ── run (one-shot scrape) ─────────────────────────────────────────────
        if (!state.telegramClient) {
            return interaction.reply({
                content: '❌ **Not Connected**: Telegram client is offline. Please try again shortly.',
                ephemeral: true,
            });
        }

        if (state.isScraping) {
            return interaction.reply({
                content: '⚠️ **Already Running**: A scrape cycle is currently active in the background.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const result = await runScrape(interaction.client, { targetChannelId, force });

            if (result.skipped) {
                return interaction.editReply('⚠️ **Scrape Skipped**: A cycle is already running.');
            }
            if (result.cancelled) {
                return interaction.editReply('⏹️ **Scrape Aborted**: Cycle was stopped by user.');
            }
            if (result.error) {
                return interaction.editReply(`❌ **Scrape Failed**: ${result.error}`);
            }

            return interaction.editReply(
                `✅ **Scrape Complete** • ${result.channelsScraped} channels • ${result.totalGemini} analyzed • **${result.totalEvents} events posted**`
            );
        } catch (error) {
            console.error('[ScrapeCommand] Error:', error);
            return interaction.editReply('❌ **Error**: An unexpected error occurred during the scrape.');
        }
    },
};
