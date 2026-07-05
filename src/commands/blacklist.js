const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");
const registerBlacklistChoices = require("../bot/registerBlacklistChoices");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Block specific email addresses or patterns from verifying')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Action to perform')
                .setRequired(true)
                .addChoices(
                    { name: 'Add Email/Pattern(s)', value: 'add' },
                    { name: 'Remove Email/Pattern(s)', value: 'remove' },
                    { name: 'List Blacklisted', value: 'list' },
                    { name: 'Clear All Blacklisted', value: 'clear' }
                )
        )
        .addStringOption(option =>
            option
                .setName('emails')
                .setDescription('Pattern(s) to block/unblock, e.g. *@tempmail.*, spam* (comma-separated)')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const emailsInput = interaction.options.getString('emails')?.trim();

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            if (action === 'list') {
                if (serverSettings.blacklist.length === 0) {
                    await interaction.reply({
                        content: "🚫 **No blacklisted emails.**\n\nAdd entries with `/blacklist action:Add Email/Pattern(s)` to block email addresses or patterns.\n\n**Examples (supports `*` wildcard):**\n• `spam@example.com` — Block specific email\n• `*@tempmail.*` — Block all tempmail domains\n• `*spam*` — Block any email containing 'spam'\n• `test*@*` — Block emails starting with 'test'",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    const blacklistDisplay = serverSettings.blacklist
                        .map(b => `\`${b.replaceAll("*", "✱")}\``)
                        .join('\n• ');
                    await interaction.reply({
                        content: `🚫 **Blacklisted patterns:**\n• ${blacklistDisplay}\n\n💡 **Tip:** Use \`*\` as wildcard (e.g. \`*@tempmail.*\` blocks all tempmail domains)\n\n*Use \`/blacklist action:Add Email/Pattern(s)\`, \`/blacklist action:Remove Email/Pattern(s)\`, or \`/blacklist action:Clear All Blacklisted\` to modify.*`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (action === 'clear') {
                if (serverSettings.blacklist.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **Blacklist is already empty.**",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                const count = serverSettings.blacklist.length;
                serverSettings.blacklist = [];
                database.updateServerSettings(interaction.guildId, serverSettings);
                await registerBlacklistChoices(interaction.guildId, { data: this.data });

                await interaction.reply({
                    content: `🗑️ **Blacklist cleared!**\n\nRemoved ${count} ${count === 1 ? 'entry' : 'entries'} from the blacklist.`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (!emailsInput) {
                return interaction.reply({
                    content: `❌ You must specify one or more \`emails\` when using the **${action}** action. Example: \`/blacklist action:${action} emails:*@tempmail.*\``,
                    flags: MessageFlags.Ephemeral
                });
            }

            if (action === 'add') {
                const newEntries = emailsInput.split(",").map(name => name.trim()).filter(name => name.length > 0);
                
                if (newEntries.length === 0) {
                    await interaction.reply({
                        content: "❌ **No valid entries provided.**\n\nPlease provide email addresses or patterns to blacklist.",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                const addedEntries = newEntries.filter(entry => !serverSettings.blacklist.includes(entry));
                
                if (addedEntries.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **All provided entries are already blacklisted.**",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                serverSettings.blacklist = serverSettings.blacklist.concat(addedEntries);
                database.updateServerSettings(interaction.guildId, serverSettings);
                await registerBlacklistChoices(interaction.guildId, { data: this.data });

                const addedDisplay = addedEntries.map(e => `\`${e.replaceAll("*", "✱")}\``).join(', ');
                await interaction.reply({
                    content: `✅ **Added to blacklist:** ${addedDisplay}\n\nEmails matching these patterns will be blocked from verifying.\n\n💡 **Tip:** \`*\` matches any characters (e.g. \`*@tempmail.*\` blocks all tempmail domains)`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (action === 'remove') {
                const removeEntries = emailsInput.split(",").map(name => name.trim()).filter(name => name.length > 0);
                
                const removedEntries = serverSettings.blacklist.filter(entry => removeEntries.includes(entry));
                serverSettings.blacklist = serverSettings.blacklist.filter(entry => !removeEntries.includes(entry));

                if (removedEntries.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **No matching entries found in blacklist.**\n\nUse `/blacklist action:List Blacklisted` to see current entries.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await registerBlacklistChoices(interaction.guildId, { data: this.data });
                    
                    const removedDisplay = removedEntries.map(e => `\`${e.replaceAll("*", "✱")}\``).join(', ');
                    await interaction.reply({
                        content: `🗑️ **Removed from blacklist:** ${removedDisplay}\n\nThese patterns are no longer blocked.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }
        });
    }
};
