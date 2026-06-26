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
                    { name: '▶️  Run now — scrape once immediately',        value: 'run'   },
                    { name: '🔁  Start auto — enable scheduled scraping',   value: 'start' },
                    { name: '⏹️  Stop auto — disable scheduled scraping',   value: 'stop'  },
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
            {
                name: 'cleardb',
                description: 'Optional. Clear the seen_messages database only (no scrape is run).',
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
        const cleardb         = interaction.options.getBoolean('cleardb') || false;

        // ── cleardb mode (independent of action) ─────────────────────────────
        if (cleardb) {
            await interaction.deferReply({ ephemeral: true });
            try {
                const deleted = await clearSeenMessages();
                return interaction.editReply(
                    `🗑️ **Seen messages database cleared!** Removed ${deleted} entr${deleted === 1 ? 'y' : 'ies'}.\n` +
                    `Run \`/scrape\` to start a fresh scrape cycle.`
                );
            } catch (err) {
                console.error('[ScrapeCommand] cleardb error:', err);
                return interaction.editReply('❌ Failed to clear the seen messages database.');
            }
        }

        // ── stop ──────────────────────────────────────────────────────────────
        if (action === 'stop') {
            const stopped = stopScrapeCron();
            return interaction.reply({
                content: stopped
                    ? '⏹️ **Auto-scraping stopped.** The scheduled cron has been cancelled.\nYou can still run `/scrape` manually at any time.'
                    : '⚠️ Auto-scraping is not currently running — nothing to stop.',
                ephemeral: true,
            });
        }

        // ── start (enable cron schedule) ──────────────────────────────────────
        if (action === 'start') {
            if (!state.telegramClient) {
                return interaction.reply({
                    content: '❌ Telegram client is not connected yet. Please wait a moment and try again.',
                    ephemeral: true,
                });
            }
            const started = startScrapeCron(interaction.client);
            return interaction.reply({
                content: started
                    ? `🔁 **Auto-scraping enabled!** The bot will now scrape on the configured interval.\nUse \`/scrape action:Stop auto\` to cancel.`
                    : '⚠️ Auto-scraping is already running.',
                ephemeral: true,
            });
        }

        // ── run (one-shot scrape) ─────────────────────────────────────────────
        if (!state.telegramClient) {
            return interaction.reply({
                content: '❌ Telegram client is not connected yet. Please wait a moment and try again.',
                ephemeral: true,
            });
        }

        if (state.isScraping) {
            return interaction.reply({
                content: '⚠️ A scrape cycle is already running in the background.',
                ephemeral: true,
            });
        }

        // Defer since scraping can take a while
        await interaction.deferReply({ ephemeral: true });

        try {
            const result = await runScrape(interaction.client, { targetChannelId, force });

            if (result.skipped) {
                return interaction.editReply('⚠️ Scrape skipped — already running.');
            }
            if (result.error) {
                return interaction.editReply(`❌ Scrape failed: ${result.error}`);
            }

            const cronStatus = isScrapeCronActive()
                ? `\n_Auto-scraping is **enabled** — the bot will continue scraping on its schedule._`
                : `\n_Auto-scraping is **disabled**. Use \`/scrape action:Start auto\` to enable it._`;

            return interaction.editReply(
                `✅ **Scrape complete!**\n` +
                `- Channels Scraped: ${result.channelsScraped}\n` +
                `- Messages Sent to Gemini: ${result.totalGemini}\n` +
                `- Events Found & Posted: ${result.totalEvents}` +
                cronStatus
            );
        } catch (error) {
            console.error('[ScrapeCommand] Error:', error);
            return interaction.editReply('❌ An unexpected error occurred during the scrape.');
        }
    },
};
