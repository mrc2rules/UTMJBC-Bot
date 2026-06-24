const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { channelExists, removeChannel } = require('../telegram/ChannelManager');

module.exports = {
    definition: {
        name: 'removechannel',
        description: 'Remove a Telegram channel from the scrape list. (Admin only)',
        options: [
            {
                name: 'channel_id',
                description: 'The numeric Telegram channel ID to remove (use /listchannels to find it)',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        let inputId = interaction.options.getString('channel_id').trim();

        // Sanitize legacy positive IDs
        if (/^\d+$/.test(inputId)) {
            inputId = '-100' + inputId;
        }

        const exists = await channelExists(inputId);
        if (!exists) {
            return interaction.editReply(
                `❌ No channel with ID \`${inputId}\` found in the scrape list.\n` +
                `Use **/listchannels** to see what's currently tracked.`
            );
        }

        await removeChannel(inputId);

        return interaction.editReply(
            `✅ Channel \`${inputId}\` has been removed from the scrape list.\n` +
            `It will be excluded from future scrape cycles.`
        );
    },
};
