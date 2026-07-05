const { SlashCommandBuilder } = require("@discordjs/builders");
const database = require("../database/Database");
const { MessageFlags, EmbedBuilder } = require('discord.js');
const { getLocale } = require('../Language');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultPermission(true)
        .setName('errornotify')
        .setDescription('Configure where bot error notifications are sent')
        .addStringOption(option =>
            option
                .setName('target_type')
                .setDescription('Who should receive error notifications')
                .setRequired(false)
                .addChoices(
                    { name: 'Server Owner (Default)', value: 'owner' },
                    { name: 'Specific Channel', value: 'channel' },
                    { name: 'Specific User (DM)', value: 'user' }
                )
        )
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel to send error notifications to (if target_type is Specific Channel)')
                .setRequired(false)
        )
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to send error notifications to via DM (if target_type is Specific User)')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const targetType = interaction.options.getString('target_type');
        const channel = interaction.options.getChannel('channel');
        const user = interaction.options.getUser('user');

        await database.getServerSettings(interaction.guildId, async (serverSettings) => {
            const language = serverSettings.language || 'english';

            // If no parameters provided, display current status
            if (!targetType && !channel && !user) {
                const embed = await this.createStatusEmbed(interaction, serverSettings, language);
                return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
            }

            // Infer targetType if user only provided channel or user parameter
            let effectiveType = targetType;
            if (!effectiveType && channel) effectiveType = 'channel';
            if (!effectiveType && user) effectiveType = 'user';

            if (effectiveType === 'owner') {
                serverSettings.errorNotifyType = 'owner';
                serverSettings.errorNotifyTarget = '';
                database.updateServerSettings(interaction.guildId, serverSettings);
                return interaction.reply({
                    content: getLocale(language, 'errorNotifySetOwner'),
                    flags: MessageFlags.Ephemeral
                });
            }

            if (effectiveType === 'channel') {
                if (!channel) {
                    return interaction.reply({
                        content: "⚠️ **Missing Channel**: Please specify a channel using the `channel` parameter when setting target type to Specific Channel.",
                        flags: MessageFlags.Ephemeral
                    });
                }

                if (!channel.isTextBased()) {
                    return interaction.reply({
                        content: getLocale(language, 'errorNotifyInvalidChannel'),
                        flags: MessageFlags.Ephemeral
                    });
                }

                serverSettings.errorNotifyType = 'channel';
                serverSettings.errorNotifyTarget = channel.id;
                database.updateServerSettings(interaction.guildId, serverSettings);
                return interaction.reply({
                    content: getLocale(language, 'errorNotifySetChannel', channel.name),
                    flags: MessageFlags.Ephemeral
                });
            }

            if (effectiveType === 'user') {
                if (!user) {
                    return interaction.reply({
                        content: "⚠️ **Missing User**: Please specify a user using the `user` parameter when setting target type to Specific User.",
                        flags: MessageFlags.Ephemeral
                    });
                }

                const member = await interaction.guild.members.fetch(user.id).catch(() => null);
                if (!member) {
                    return interaction.reply({
                        content: getLocale(language, 'errorNotifyUserNotInGuild'),
                        flags: MessageFlags.Ephemeral
                    });
                }

                serverSettings.errorNotifyType = 'user';
                serverSettings.errorNotifyTarget = user.id;
                database.updateServerSettings(interaction.guildId, serverSettings);
                return interaction.reply({
                    content: getLocale(language, 'errorNotifySetUser', user.tag || user.username),
                    flags: MessageFlags.Ephemeral
                });
            }
        });
    },

    async createStatusEmbed(interaction, serverSettings, language) {
        const embed = new EmbedBuilder()
            .setTitle(getLocale(language, 'errorNotifyStatusTitle'))
            .setColor(0x5865F2)
            .setTimestamp();

        const notifyType = serverSettings.errorNotifyType || 'owner';
        const notifyTarget = serverSettings.errorNotifyTarget || '';

        let statusText = '';
        if (notifyType === 'owner') {
            const owner = await interaction.guild.fetchOwner().catch(() => null);
            statusText = getLocale(language, 'errorNotifyStatusOwner', owner ? (owner.user.tag || owner.user.username) : 'Unknown');
        } else if (notifyType === 'channel') {
            const channel = interaction.guild.channels.cache.get(notifyTarget);
            if (channel) {
                statusText = getLocale(language, 'errorNotifyStatusChannel', channel.name);
            } else {
                statusText = getLocale(language, 'errorNotifyStatusChannelInvalid');
            }
        } else if (notifyType === 'user') {
            const member = await interaction.guild.members.fetch(notifyTarget).catch(() => null);
            if (member) {
                statusText = getLocale(language, 'errorNotifyStatusUser', member.user.tag || member.user.username);
            } else {
                statusText = getLocale(language, 'errorNotifyStatusUserInvalid');
            }
        }

        embed.setDescription(statusText);
        embed.addFields({
            name: getLocale(language, 'errorNotifyStatusNote'),
            value: getLocale(language, 'errorNotifyStatusNoteValue'),
            inline: false
        });

        return embed;
    }
};
