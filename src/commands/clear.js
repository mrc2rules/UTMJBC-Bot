const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require('discord.js');
const db = require('../shared/db');
const { getChannelDetails } = require('../telegram/ChannelManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear scraping logs and history databases (Admin only)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('seendb')
                .setDescription('Clear seen messages database')
                .addStringOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Optional. Clear seen messages only for this specific channel.')
                        .setRequired(false)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lastmsgdb')
                .setDescription('Clear the last message ID (cursor) database')
                .addStringOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Optional. Clear cursor only for this specific channel.')
                        .setRequired(false)
                        .setAutocomplete(true)
                )
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        try {
            const channels = await getChannelDetails();
            const choices = channels.map(ch => ({
                name: `${ch.channel_name || 'Unknown'} (${ch.channel_id})`,
                value: ch.channel_id,
            }));
            const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue));
            await interaction.respond(filtered.slice(0, 25));
        } catch {
            await interaction.respond([]);
        }
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        const subcommand = interaction.options.getSubcommand();
        const targetChannel = interaction.options.getString('channel');

        await interaction.deferReply({ ephemeral: true });

        if (subcommand === 'seendb') {
            try {
                let query = 'DELETE FROM seen_messages';
                let params = [];
                if (targetChannel) {
                    query += ' WHERE channel = ?';
                    params.push(targetChannel);
                }

                db.run(query, params, function (err) {
                    if (err) {
                        console.error('[ClearCommand] Error clearing seen_messages:', err);
                        return interaction.editReply('❌ Failed to clear seen messages database.');
                    }
                    const count = this.changes;
                    if (targetChannel) {
                        return interaction.editReply(`🗑️ **Seen DB Cleared**: Removed ${count} records for channel \`${targetChannel}\`.`);
                    } else {
                        return interaction.editReply(`🗑️ **Seen DB Cleared**: Removed all ${count} records.`);
                    }
                });
            } catch (err) {
                console.error('[ClearCommand] error:', err);
                return interaction.editReply('❌ An unexpected error occurred while clearing seen messages.');
            }
        } else if (subcommand === 'lastmsgdb') {
            try {
                let query = 'DELETE FROM channel_cursors';
                let params = [];
                if (targetChannel) {
                    query += ' WHERE channel_id = ?';
                    params.push(targetChannel);
                }

                db.run(query, params, function (err) {
                    if (err) {
                        console.error('[ClearCommand] Error clearing channel_cursors:', err);
                        return interaction.editReply('❌ Failed to clear channel cursors database.');
                    }
                    const count = this.changes;
                    if (targetChannel) {
                        return interaction.editReply(`🗑️ **Cursors DB Cleared**: Removed cursor for channel \`${targetChannel}\`.`);
                    } else {
                        return interaction.editReply(`🗑️ **Cursors DB Cleared**: Removed all ${count} cursor records.`);
                    }
                });
            } catch (err) {
                console.error('[ClearCommand] error:', err);
                return interaction.editReply('❌ An unexpected error occurred while clearing channel cursors.');
            }
        }
    }
};
