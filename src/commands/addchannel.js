const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { channelExists, addChannel } = require('../telegram/ChannelManager');
const state = require('../shared/state');

module.exports = {
    definition: {
        name: 'addchannel',
        description: 'Add a Telegram channel to the scrape list. (Admin only)',
        options: [
            {
                name: 'channel',
                description: 'Telegram channel username (e.g. @utmjbc) or numeric ID',
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

        if (!state.telegramClient) {
            return interaction.reply({
                content: '❌ Telegram client is not connected yet. Please try again in a moment.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const input = interaction.options.getString('channel').trim();

        // Resolve and validate the channel via Telegram — rejects bad usernames/IDs early
        let entity;
        try {
            // gramjs requires numeric IDs to be BigInt, otherwise string usernames
            const targetInput = /^-?\d+$/.test(input) ? BigInt(input) : input;
            entity = await state.telegramClient.getEntity(targetInput);
        } catch {
            return interaction.editReply(
                `❌ Could not find a Telegram channel for \`${input}\`.\n` +
                `Make sure the username is correct and the bot account has access to it.`
            );
        }

        if (entity.className !== 'Channel' && entity.className !== 'Chat') {
            return interaction.editReply(
                `❌ The entity \`${input}\` is a **${entity.className}**, not a Channel or Group.\n` +
                `Only Channels and Groups can be added to the scrape list.`
            );
        }

        // Format the ID correctly for gramjs future resolution
        let channelId = String(entity.id);
        if (entity.className === 'Channel' && !channelId.startsWith('-100')) {
            channelId = '-100' + channelId;
        } else if (entity.className === 'Chat' && !channelId.startsWith('-')) {
            channelId = '-' + channelId;
        }
        
        const channelTitle = entity.title || entity.username || channelId;

        const alreadyTracked = await channelExists(channelId);
        if (alreadyTracked) {
            return interaction.editReply(
                `ℹ️ **${channelTitle}** (\`${channelId}\`) is already in the scrape list.`
            );
        }

        await addChannel(channelId, interaction.user.tag);

        return interaction.editReply(
            `✅ Added **${channelTitle}** (\`${channelId}\`) to the scrape list.\n` +
            `It will be included in the next scrape cycle.`
        );
    },
};
