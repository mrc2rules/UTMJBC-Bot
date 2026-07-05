const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('domainrole')
        .setDescription('Configure domain-specific roles for verification')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Action to perform')
                .setRequired(true)
                .addChoices(
                    { name: 'Add Domain Role', value: 'add' },
                    { name: 'Remove Domain Role', value: 'remove' },
                    { name: 'List Mappings', value: 'list' },
                    { name: 'Clear Domain Roles', value: 'clear' }
                )
        )
        .addStringOption(option =>
            option
                .setName('domain')
                .setDescription('Email domain (e.g., @company.com, @*.edu)')
                .setRequired(false)
                .setAutocomplete(true)
        )
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The Discord role to assign or remove')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        
        await database.getServerSettings(interaction.guildId, async serverSettings => {
            const domains = serverSettings.domains || [];
            
            const filtered = domains
                .filter(domain => domain.toLowerCase().includes(focusedValue))
                .slice(0, 25);
            
            await interaction.respond(
                filtered.map(domain => ({
                    name: domain.replaceAll('*', '✱'),
                    value: domain
                }))
            ).catch(() => {});
        });
    },

    async execute(interaction) {
        const action = interaction.options.getString('action');
        let domainInput = interaction.options.getString('domain');
        const role = interaction.options.getRole('role');

        const normalizeDomain = (d) => {
            d = d.trim().toLowerCase();
            if (!d.startsWith('@')) {
                d = '@' + d;
            }
            return d;
        };

        if (action === 'list') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                const domainRoles = serverSettings.domainRoles || {};
                const domains = Object.keys(domainRoles);
                
                if (domains.length === 0) {
                    let message = "**No domain-specific roles configured.**\n\n";
                    if (serverSettings.defaultRoles.length > 0) {
                        const defaultRoleNames = serverSettings.defaultRoles
                            .map(id => {
                                const r = interaction.guild.roles.cache.get(id);
                                return r ? `<@&${id}>` : `Unknown (${id})`;
                            })
                            .join(', ');
                        message += `**Default roles** (all verified users): ${defaultRoleNames}\n\n`;
                    }
                    message += "Use `/domainrole action:Add Domain Role` to assign specific roles based on email domain.\n\n";
                    message += "**Example:**\n`/domainrole action:Add Domain Role domain:@company.com role:@Employee`\n`/domainrole action:Add Domain Role domain:@*.edu role:@Student`";
                    
                    await interaction.reply({
                        content: message,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                let message = "**Domain-Specific Roles:**\n\n";
                
                for (const d of domains) {
                    const roleIds = domainRoles[d];
                    const roleNames = roleIds
                        .map(id => {
                            const r = interaction.guild.roles.cache.get(id);
                            return r ? `<@&${id}>` : `Unknown (${id})`;
                        })
                        .join(', ');
                    
                    message += `\`${d}\` → ${roleNames}\n`;
                }
                
                if (serverSettings.defaultRoles.length > 0) {
                    const defaultRoleNames = serverSettings.defaultRoles
                        .map(id => {
                            const r = interaction.guild.roles.cache.get(id);
                            return r ? `<@&${id}>` : `Unknown (${id})`;
                        })
                        .join(', ');
                    message += `\n**Default roles** (all domains): ${defaultRoleNames}`;
                }
                
                message += "\n\n*Users receive domain-specific roles + default roles upon verification.*";
                
                await interaction.reply({
                    content: message,
                    flags: MessageFlags.Ephemeral
                });
            });
            return;
        }

        if (action === 'clear') {
            if (!domainInput) {
                return interaction.reply({
                    content: "❌ You must specify a `domain` when using the **Clear Domain Roles** action. Example: `/domainrole action:Clear Domain Roles domain:@company.com`",
                    flags: MessageFlags.Ephemeral
                });
            }

            const domain = normalizeDomain(domainInput);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (!serverSettings.domainRoles || !serverSettings.domainRoles[domain]) {
                    await interaction.reply({
                        content: `**No roles configured for \`${domain}\`.**`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                const count = serverSettings.domainRoles[domain].length;
                delete serverSettings.domainRoles[domain];
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Cleared all roles for \`${domain}\`!**\n\nRemoved ${count} role${count > 1 ? 's' : ''}.\n\nUsers verifying with this domain will now only receive default roles.`,
                    flags: MessageFlags.Ephemeral
                });
            });
            return;
        }

        if (!domainInput || !role) {
            return interaction.reply({
                content: `❌ You must specify both \`domain\` and \`role\` when using the **${action}** action. Example: \`/domainrole action:${action} domain:@company.com role:@Employee\``,
                flags: MessageFlags.Ephemeral
            });
        }

        const domain = normalizeDomain(domainInput);

        if (action === 'add') {
            if (!domain.includes('.')) {
                await interaction.reply({
                    content: "**Invalid domain format!**\n\nDomain must include a dot (e.g., `@company.com`, `@*.edu`).",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            
            if (role.name === "@everyone") {
                await interaction.reply({
                    content: "**Error:** @everyone cannot be used as a domain role!",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (!serverSettings.domainRoles) {
                    serverSettings.domainRoles = {};
                }
                
                if (!serverSettings.domainRoles[domain]) {
                    serverSettings.domainRoles[domain] = [];
                }
                
                if (serverSettings.domainRoles[domain].includes(role.id)) {
                    await interaction.reply({
                        content: `**${role.name}** is already assigned to \`${domain}\`.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.domainRoles[domain].push(role.id);
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                const totalRoles = serverSettings.domainRoles[domain].length;
                await interaction.reply({
                    content: `**Domain role added!**\n\nDomain: \`${domain}\`\nRole: ${role.name}\n\nUsers verifying with this domain will receive ${totalRoles} role${totalRoles > 1 ? 's' : ''} (plus any default roles).`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (action === 'remove') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (!serverSettings.domainRoles || !serverSettings.domainRoles[domain]) {
                    await interaction.reply({
                        content: `**No roles configured for \`${domain}\`.**\n\nUse \`/domainrole action:List Mappings\` to see all domain-role mappings.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                const index = serverSettings.domainRoles[domain].indexOf(role.id);
                if (index === -1) {
                    await interaction.reply({
                        content: `**${role.name}** is not assigned to \`${domain}\`.\n\nUse \`/domainrole action:List Mappings\` to see all domain-role mappings.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.domainRoles[domain].splice(index, 1);
                
                if (serverSettings.domainRoles[domain].length === 0) {
                    delete serverSettings.domainRoles[domain];
                }
                
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Domain role removed!**\n\nDomain: \`${domain}\`\nRole: ${role.name}\n\nUsers verifying with this domain will no longer receive this role.`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }
    }
};
