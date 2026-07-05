const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { channelExists, addChannel, removeChannel, getChannelDetails, updateChannelName } = require('../telegram/ChannelManager');
const state = require('../shared/state');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Manage Telegram channels scraped by the bot (Admin only)')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Action to perform')
                .setRequired(true)
                .addChoices(
                    { name: 'Add Channel', value: 'add' },
                    { name: 'Remove Channel', value: 'remove' },
                    { name: 'List Channels', value: 'list' }
                )
        )
        .addStringOption(option =>
            option
                .setName('channel')
                .setDescription('Telegram channel username (e.g. @utmjbc) or numeric ID (required for add/remove)')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const action = interaction.options.getString('action');
        const channelInput = interaction.options.getString('channel')?.trim();

        if (action === 'list') {
            const channels = await getChannelDetails();

            if (channels.length === 0) {
                return interaction.editReply(
                    `📭 No Telegram channels are currently being scraped.\n` +
                    `Use **/channel action:Add Channel channel:@username** to add one.`
                );
            }

            const rows = await Promise.all(channels.map(async (ch, i) => {
                const addedAt = new Date(ch.added_at).toLocaleDateString('en-MY', {
                    day: 'numeric', month: 'short', year: 'numeric'
                });

                let title = ch.channel_name;
                if (!title && state.telegramClient) {
                    try {
                        let parsedId = ch.channel_id;
                        if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;

                        const targetId = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
                        const entity = await state.telegramClient.getEntity(targetId);
                        title = entity.title || entity.username;

                        if (title) {
                            await updateChannelName(ch.channel_id, title).catch(() => {});
                        }
                    } catch (err) {
                        // Ignore resolution errors
                    }
                }
                title = title || 'Unknown Channel';

                return `**${i + 1}.** ${title} (\`${ch.channel_id}\`)\n└ Added by ${ch.added_by} on ${addedAt}`;
            }));

            const embed = new EmbedBuilder()
                .setTitle(`📡 Tracked Telegram Channels (${channels.length})`)
                .setDescription(rows.join('\n\n'))
                .setColor('#0088cc')
                .setFooter({ text: 'UTMJBC-Bot • Telegram Scraper' })
                .setTimestamp();

            return interaction.editReply({ embeds: [embed] });
        }

        if (!channelInput) {
            return interaction.editReply(`❌ You must specify a \`channel\` (username or ID) when using the **${action}** action.`);
        }

        if (action === 'add') {
            if (!state.telegramClient) {
                return interaction.editReply('❌ Telegram client is not connected yet. Please try again in a moment.');
            }

            let entity;
            try {
                const targetInput = /^-?\d+$/.test(channelInput) ? BigInt(channelInput) : channelInput;
                entity = await state.telegramClient.getEntity(targetInput);
            } catch {
                return interaction.editReply(
                    `❌ Could not find a Telegram channel for \`${channelInput}\`.\n` +
                    `Make sure the username is correct and the bot account has access to it.`
                );
            }

            if (entity.className !== 'Channel' && entity.className !== 'Chat') {
                return interaction.editReply(
                    `❌ The entity \`${channelInput}\` is a **${entity.className}**, not a Channel or Group.\n` +
                    `Only Channels and Groups can be added to the scrape list.`
                );
            }

            let channelId = String(entity.id);
            if (entity.className === 'Channel' && !channelId.startsWith('-100')) {
                channelId = '-100' + channelId;
            }

            const exists = await channelExists(channelId);
            if (exists) {
                return interaction.editReply(`⚠️ **${entity.title || channelInput}** (\`${channelId}\`) is already in the scrape list.`);
            }

            const addedBy = `${interaction.user.username} (${interaction.user.id})`;
            const channelName = entity.title || entity.username || channelInput;
            const added = await addChannel(channelId, channelName, addedBy);

            if (!added) {
                return interaction.editReply(`⚠️ **${channelName}** (\`${channelId}\`) is already in the scrape list.`);
            }

            return interaction.editReply(
                `✅ **${channelName}** (\`${channelId}\`) has been added to the scrape list!\n` +
                `The bot will begin monitoring it on the next scrape cycle.`
            );
        }

        if (action === 'remove') {
            let inputId = channelInput;
            if (/^\d+$/.test(inputId)) {
                inputId = '-100' + inputId;
            }

            const exists = await channelExists(inputId);
            if (!exists) {
                return interaction.editReply(
                    `❌ No channel with ID or username \`${channelInput}\` found in the scrape list.\n` +
                    `Use **/channel action:List Channels** to see what's currently tracked.`
                );
            }

            await removeChannel(inputId);

            return interaction.editReply(
                `✅ Channel \`${channelInput}\` has been removed from the scrape list.\n` +
                `It will be excluded from future scrape cycles.`
            );
        }
    },
};
