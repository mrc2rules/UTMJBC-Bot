const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { getChannelDetails } = require('../telegram/ChannelManager');

module.exports = {
    definition: {
        name: 'listchannels',
        description: 'List all Telegram channels currently being scraped. (Admin only)',
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const channels = await getChannelDetails();

        if (channels.length === 0) {
            return interaction.editReply(
                `📭 No Telegram channels are currently being scraped.\n` +
                `Use **/addchannel** to add one.`
            );
        }

        const rows = channels.map((ch, i) => {
            const addedAt = new Date(ch.added_at).toLocaleDateString('en-MY', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
            return `**${i + 1}.** \`${ch.channel_id}\`\n└ Added by ${ch.added_by} on ${addedAt}`;
        });

        const embed = new EmbedBuilder()
            .setTitle(`📡 Tracked Telegram Channels (${channels.length})`)
            .setDescription(rows.join('\n\n'))
            .setColor(0x3498db)
            .setFooter({ text: 'Use /addchannel or /removechannel to manage this list.' })
            .setTimestamp();

        return interaction.editReply({ embeds: [embed] });
    },
};

