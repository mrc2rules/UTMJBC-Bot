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

        const channelId = interaction.options.getString('channel_id').trim();

        const exists = await channelExists(channelId);
        if (!exists) {
            return interaction.editReply(
                `❌ No channel with ID \`${channelId}\` found in the scrape list.\n` +
                `Use **/listchannels** to see what's currently tracked.`
            );
        }

        await removeChannel(channelId);

        return interaction.editReply(
            `✅ Channel \`${channelId}\` has been removed from the scrape list.\n` +
            `It will be excluded from future scrape cycles.`
        );
    },
};
