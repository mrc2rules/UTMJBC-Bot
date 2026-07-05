const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags, EmbedBuilder } = require('discord.js');
const database = require("../database/Database.js");
const { languages } = require("../Language");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure bot settings for your server')
        .addStringOption(option =>
            option
                .setName('language')
                .setDescription('Change the language for bot messages and verification prompts')
                .setRequired(false)
                .addChoices(...[...languages.keys()].map(value => ({
                    name: value.charAt(0).toUpperCase() + value.slice(1),
                    value: value
                })))
        )
        .addChannelOption(option =>
            option
                .setName('log_channel')
                .setDescription('Set a channel to log verification events')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName('verify_message')
                .setDescription('Custom message for verification emails (pass "clear" to reset to default)')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option
                .setName('promptnewtoverify')
                .setDescription('Automatically prompt new members to verify when they join')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option
                .setName('auto_unverified')
                .setDescription('Automatically assign the unverified role to new members')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const language = interaction.options.getString('language');
        const logChannel = interaction.options.getChannel('log_channel');
        const verifyMessage = interaction.options.getString('verify_message');
        const promptNewToVerify = interaction.options.getBoolean('promptnewtoverify');
        const autoUnverified = interaction.options.getBoolean('auto_unverified');

        await database.getServerSettings(interaction.guildId, async (serverSettings) => {
            // If no options provided, show current status
            if (language === null && !logChannel && verifyMessage === null && promptNewToVerify === null && autoUnverified === null) {
                const langDisplay = (serverSettings.language || 'english').charAt(0).toUpperCase() + (serverSettings.language || 'english').slice(1);
                const logDisplay = serverSettings.logChannel ? `<#${serverSettings.logChannel}>` : '*Disabled*';
                const msgDisplay = serverSettings.verifyMessage ? `"${serverSettings.verifyMessage}"` : '*Default*';
                const promptDisplay = serverSettings.autoVerify ? '✅ Enabled' : '❌ Disabled';
                const roleDisplay = serverSettings.autoAddUnverified ? '✅ Enabled' : '❌ Disabled';

                const embed = new EmbedBuilder()
                    .setTitle('⚙️ Server Settings Overview')
                    .setColor(0x5D001A)
                    .addFields(
                        { name: '🌐 Language', value: langDisplay, inline: true },
                        { name: '📝 Log Channel', value: logDisplay, inline: true },
                        { name: '🔔 Prompt New Members to Verify (`promptnewtoverify`)', value: promptDisplay, inline: false },
                        { name: '👤 Auto-assign Unverified Role (`auto_unverified`)', value: roleDisplay, inline: false },
                        { name: '✉️ Custom Verify Message', value: msgDisplay, inline: false }
                    )
                    .setDescription('To update any setting, run `/settings` with one or more optional parameters.')
                    .setTimestamp();

                return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
            }

            let updatedFields = [];

            if (language !== null) {
                serverSettings.language = language;
                updatedFields.push(`**Language**: ${language.charAt(0).toUpperCase() + language.slice(1)}`);
            }

            if (logChannel !== null) {
                serverSettings.logChannel = logChannel.id;
                updatedFields.push(`**Log Channel**: <#${logChannel.id}>`);
            }

            if (verifyMessage !== null) {
                if (verifyMessage.toLowerCase() === 'clear' || verifyMessage.trim() === '') {
                    serverSettings.verifyMessage = '';
                    updatedFields.push(`**Verify Message**: Reset to default`);
                } else {
                    serverSettings.verifyMessage = verifyMessage;
                    updatedFields.push(`**Verify Message**: "${verifyMessage}"`);
                }
            }

            if (promptNewToVerify !== null) {
                serverSettings.autoVerify = +promptNewToVerify;
                updatedFields.push(`**Prompt New to Verify**: ${promptNewToVerify ? 'Enabled ✅' : 'Disabled ❌'}`);
            }

            if (autoUnverified !== null) {
                serverSettings.autoAddUnverified = +autoUnverified;
                let extraWarning = '';
                if (autoUnverified) {
                    const roleUnverified = interaction.guild.roles.cache.find(r => r.id === serverSettings.unverifiedRoleName);
                    if (!roleUnverified) {
                        extraWarning = ' *(⚠️ Warning: No unverified role configured. Use `/role unverified` to set one)*';
                    }
                }
                updatedFields.push(`**Auto-assign Unverified Role**: ${autoUnverified ? 'Enabled ✅' : 'Disabled ❌'}${extraWarning}`);
            }

            database.updateServerSettings(interaction.guildId, serverSettings);

            return interaction.reply({
                content: `✅ **Server Settings Updated**:\n• ${updatedFields.join('\n• ')}`,
                flags: MessageFlags.Ephemeral
            });
        });
    }
};
