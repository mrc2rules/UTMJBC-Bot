const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags, PermissionsBitField } = require('discord.js');
const database = require("../database/Database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('data')
        .setDescription('Manage stored data for privacy and compliance')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Action to perform')
                .setRequired(true)
                .addChoices(
                    { name: 'Delete User Data (My Data)', value: 'delete-user' },
                    { name: 'Delete Server Data (Admin Only)', value: 'delete-server' }
                )
        )
        .addStringOption(option =>
            option
                .setName('confirm')
                .setDescription('Type "delete" to confirm deletion of data')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(null),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const confirm = interaction.options.getString('confirm', true);

        if (action === 'delete-user') {
            if (confirm !== 'delete') {
                await interaction.reply({
                    content: "❌ **Confirmation failed.**\n\nTo delete your data, type `delete` in the confirm field.\n\n⚠️ This will:\n• Remove your verified status on this server\n• Delete your stored email hash\n• Require you to verify again",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            database.deleteUserData(interaction.user.id);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                const roleUnverified = interaction.guild.roles.cache.find(role => role.id === serverSettings.unverifiedRoleName);
                const member = interaction.guild.members.cache.get(interaction.user.id);
                
                if (member !== undefined) {
                    const defaultRoles = serverSettings.defaultRoles || [];
                    for (const roleId of defaultRoles) {
                        const r = interaction.guild.roles.cache.get(roleId);
                        if (r) {
                            await member.roles.remove(r).catch(() => {});
                        }
                    }
                    
                    const domainRoles = serverSettings.domainRoles || {};
                    for (const pattern of Object.keys(domainRoles)) {
                        for (const roleId of domainRoles[pattern]) {
                            const r = interaction.guild.roles.cache.get(roleId);
                            if (r) {
                                await member.roles.remove(r).catch(() => {});
                            }
                        }
                    }
                    
                    if (roleUnverified !== undefined) {
                        await member.roles.add(roleUnverified).catch(() => {});
                    }
                }
                
                await interaction.reply({
                    content: "✅ **Your data has been deleted.**\n\n• Your verified status has been removed\n• Your stored email hash has been deleted\n• You can verify again at any time with `/verify`",
                    flags: MessageFlags.Ephemeral
                });
            });
            return;
        }

        if (action === 'delete-server') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                await interaction.reply({
                    content: "❌ **Permission denied.**\n\nOnly server administrators can delete server data.",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (confirm !== 'delete') {
                await interaction.reply({
                    content: "❌ **Confirmation failed.**\n\nTo delete server data, type `delete` in the confirm field.\n\n⚠️ **Warning:** This will:\n• Delete all server configuration\n• Delete all verification records\n• Remove the bot from this server",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            database.deleteServerData(interaction.guildId);
            await interaction.reply({
                content: "✅ **Server data deleted.**\n\nThe bot will now leave this server. Thank you for using Email Verify Bot!",
                flags: MessageFlags.Ephemeral
            });
            await interaction.guild.leave();
        }
    }
};
