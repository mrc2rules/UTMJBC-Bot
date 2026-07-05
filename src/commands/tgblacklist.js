const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, MessageFlags, EmbedBuilder } = require('discord.js');
const { getKeywordBlacklist, addKeywordToBlacklist, removeKeywordFromBlacklist, clearKeywordBlacklist } = require('../telegram/KeywordBlacklistManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tgblacklist')
        .setDescription('Manage the Telegram event scraper keyword blacklist. (Admin only)')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Action to perform')
                .setRequired(true)
                .addChoices(
                    { name: 'Add Keyword', value: 'add' },
                    { name: 'Remove Keyword', value: 'remove' },
                    { name: 'List Keywords', value: 'list' },
                    { name: 'Clear All Keywords', value: 'clear' }
                )
        )
        .addStringOption(option =>
            option
                .setName('keyword')
                .setDescription('The keyword to block or remove')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                flags: MessageFlags.Ephemeral
            });
        }

        const action = interaction.options.getString('action');
        const keyword = interaction.options.getString('keyword')?.trim();

        if (action === 'list') {
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

        if (action === 'clear') {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const count = await clearKeywordBlacklist();
                return interaction.editReply(`🗑️ Wiped the blacklist. Removed ${count} keyword(s).`);
            } catch (err) {
                console.error('[tgblacklist] clear error:', err);
                return interaction.editReply('❌ Failed to clear the blacklist.');
            }
        }

        if (!keyword) {
            return interaction.reply({
                content: `❌ You must specify a \`keyword\` when using the **${action}** action. Example: \`/tgblacklist action:${action} keyword:crypto\``,
                flags: MessageFlags.Ephemeral
            });
        }

        if (action === 'add') {
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

        if (action === 'remove') {
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
    }
};
