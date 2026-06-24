const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, MessageFlags, EmbedBuilder } = require('discord.js');
const { getKeywordBlacklist, addKeywordToBlacklist, removeKeywordFromBlacklist, clearKeywordBlacklist } = require('../telegram/KeywordBlacklistManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tgblacklist')
        .setDescription('Manage the Telegram event scraper keyword blacklist. (Admin only)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a keyword to the blacklist (case-insensitive)')
                .addStringOption(option =>
                    option
                        .setName('keyword')
                        .setDescription('The keyword to block')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a keyword from the blacklist')
                .addStringOption(option =>
                    option
                        .setName('keyword')
                        .setDescription('The keyword to remove')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all blacklisted keywords')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clear all blacklisted keywords')
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                flags: MessageFlags.Ephemeral
            });
        }

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'list') {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const list = await getKeywordBlacklist();
                if (list.length === 0) {
                    return interaction.editReply('🚫 **No keywords are currently blacklisted for the Telegram scraper.**');
                }
                const embed = new EmbedBuilder()
                    .setTitle(`🚫 Telegram Scraper Keyword Blacklist (${list.length})`)
                    .setDescription(list.map((kw, i) => `**${i + 1}.** \`${kw}\``).join('\n'))
                    .setColor(0xe74c3c)
                    .setTimestamp();
                return interaction.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('[tgblacklist] list error:', err);
                return interaction.editReply('❌ Failed to retrieve the blacklist.');
            }
        }

        if (subcommand === 'add') {
            const keyword = interaction.options.getString('keyword').trim();
            if (!keyword) {
                return interaction.reply({ content: '❌ Keyword cannot be empty.', flags: MessageFlags.Ephemeral });
            }
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const added = await addKeywordToBlacklist(keyword, interaction.user.tag);
                if (added) {
                    return interaction.editReply(`✅ Added \`${keyword.toLowerCase()}\` to the scraper blacklist.`);
                } else {
                    return interaction.editReply(`⚠️ \`${keyword.toLowerCase()}\` is already blacklisted.`);
                }
            } catch (err) {
                console.error('[tgblacklist] add error:', err);
                return interaction.editReply('❌ Failed to add keyword to the blacklist.');
            }
        }

        if (subcommand === 'remove') {
            const keyword = interaction.options.getString('keyword').trim();
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const removed = await removeKeywordFromBlacklist(keyword);
                if (removed) {
                    return interaction.editReply(`🗑️ Removed \`${keyword.toLowerCase()}\` from the scraper blacklist.`);
                } else {
                    return interaction.editReply(`⚠️ \`${keyword.toLowerCase()}\` is not in the blacklist.`);
                }
            } catch (err) {
                console.error('[tgblacklist] remove error:', err);
                return interaction.editReply('❌ Failed to remove keyword.');
            }
        }

        if (subcommand === 'clear') {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const count = await clearKeywordBlacklist();
                return interaction.editReply(`🗑️ Wiped the blacklist. Removed ${count} keyword(s).`);
            } catch (err) {
                console.error('[tgblacklist] clear error:', err);
                return interaction.editReply('❌ Failed to clear the blacklist.');
            }
        }
    }
};
