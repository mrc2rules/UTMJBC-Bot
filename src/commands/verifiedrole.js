const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifiedrole')
        .setDescription('Configure verification roles for your server')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Action to perform')
                .setRequired(true)
                .addChoices(
                    { name: 'Add Verified Role', value: 'add' },
                    { name: 'Remove Verified Role', value: 'remove' },
                    { name: 'List Roles', value: 'list' },
                    { name: 'Set/Toggle Unverified Role', value: 'unverified' }
                )
        )
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The Discord role to add, remove, or set as unverified')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const role = interaction.options.getRole('role');

        if (action === 'list') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (serverSettings.defaultRoles.length === 0) {
                    await interaction.reply({
                        content: "**No default roles configured!**\n\nUse `/verifiedrole action:Add Verified Role` to add roles that all verified users will receive.\n\n*Tip: You can also use `/domainrole` to assign different roles based on email domain.*",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                const roleNames = serverSettings.defaultRoles
                    .map(id => {
                        const r = interaction.guild.roles.cache.get(id);
                        return r ? `<@&${id}>` : `Unknown (${id})`;
                    })
                    .join('\n');
                
                await interaction.reply({
                    content: `**Default Roles** (assigned to all verified users):\n${roleNames}\n\n*Use \`/verifiedrole action:Add Verified Role\` or \`/verifiedrole action:Remove Verified Role\` to modify.\nUse \`/domainrole\` to assign additional roles based on email domain.*`,
                    flags: MessageFlags.Ephemeral
                });
            });
            return;
        }

        if (action === 'unverified') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (!role) {
                    const existingRole = interaction.guild.roles.cache.find(r => r.id === serverSettings.unverifiedRoleName);
                    if (!existingRole) {
                        await interaction.reply({
                            content: "**Unverified role is disabled.**\n\nYou can set one with `/verifiedrole action:Set/Toggle Unverified Role role:@Role` to restrict access for new members until they verify.",
                            flags: MessageFlags.Ephemeral
                        });
                        return;
                    }
                    await interaction.reply({
                        content: `**Unverified role:** ${existingRole.name}\n\nThis role is removed when users complete verification.\n*Tip: Select this same role again to disable the unverified role feature.*`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                if (role.name === "@everyone") {
                    await interaction.reply({
                        content: "**Error:** @everyone cannot be used as the unverified role!",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                // Toggle off if selecting the current role
                if (role.id === serverSettings.unverifiedRoleName) {
                    serverSettings.unverifiedRoleName = "";
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await interaction.reply({
                        content: "**Unverified role disabled.**\n\nNew members will no longer receive a special role before verification.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    serverSettings.unverifiedRoleName = role.id;
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await interaction.reply({
                        content: `**Unverified role set to:** ${role.name}\n\nThis role will be removed when users complete email verification.\n*Tip: Use \`/settings auto-unverified\` to auto-assign this role to new members.*`,
                        flags: MessageFlags.Ephemeral
                    });
                }
            });
            return;
        }

        if (!role) {
            return interaction.reply({
                content: `❌ You must specify a \`role\` when using the **${action}** action. Example: \`/verifiedrole action:${action} role:@Student\``,
                flags: MessageFlags.Ephemeral
            });
        }

        if (action === 'add') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (role.name === "@everyone") {
                    await interaction.reply({
                        content: "**Error:** @everyone cannot be used as a verified role!",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                if (serverSettings.defaultRoles.includes(role.id)) {
                    await interaction.reply({
                        content: `**${role.name}** is already a default role.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.defaultRoles.push(role.id);
                if (serverSettings.defaultRoles.length === 1) {
                    serverSettings.verifiedRoleName = role.id;
                }
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Default role added:** ${role.name}\n\nAll verified users will now receive this role.\n*Use \`/verifiedrole action:List Roles\` to see all default roles.*`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (action === 'remove') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                const index = serverSettings.defaultRoles.indexOf(role.id);
                if (index === -1) {
                    await interaction.reply({
                        content: `**${role.name}** is not in the default roles list.\n\nUse \`/verifiedrole action:List Roles\` to see current default roles.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.defaultRoles.splice(index, 1);
                if (serverSettings.defaultRoles.length > 0) {
                    serverSettings.verifiedRoleName = serverSettings.defaultRoles[0];
                } else {
                    serverSettings.verifiedRoleName = "";
                }
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Default role removed:** ${role.name}\n\nVerified users will no longer receive this role automatically.`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }
    }
};
