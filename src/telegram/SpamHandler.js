const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../shared/db');
const { logInfo, logError } = require('../shared/logger');

// Helper to query event by thread ID
function getEventByThreadId(threadId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM telegram_events WHERE thread_id = ?', [threadId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

// Helper to update spam report tracking in DB
function updateSpamReport(threadId, status, count, msgId = null) {
    return new Promise((resolve, reject) => {
        if (msgId) {
            db.run(
                'UPDATE telegram_events SET spam_status = ?, spam_report_count = ?, spam_report_msg_id = ? WHERE thread_id = ?',
                [status, count, msgId, threadId],
                (err) => err ? reject(err) : resolve()
            );
        } else {
            db.run(
                'UPDATE telegram_events SET spam_status = ?, spam_report_count = ? WHERE thread_id = ?',
                [status, count, threadId],
                (err) => err ? reject(err) : resolve()
            );
        }
    });
}

// Helper to mark event as deleted in DB
function markEventDeleted(threadId) {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE telegram_events SET spam_status = ?, closed = 1 WHERE thread_id = ?',
            ['deleted', threadId],
            (err) => err ? reject(err) : resolve()
        );
    });
}

/**
 * Handles clicks on the "Report as Spam" button in event threads.
 *
 * @param {import('discord.js').ButtonInteraction} interaction
 * @param {object} database - Bot database instance
 * @param {import('discord.js').Client} discordClient
 */
async function handleSpamReport(interaction, database, discordClient) {
    const threadId = interaction.channelId;
    
    try {
        const event = await getEventByThreadId(threadId);
        if (!event) {
            return interaction.reply({
                content: '⚠️ Could not locate event record in database for this thread.',
                ephemeral: true
            });
        }

        if (event.spam_status === 'dismissed') {
            return interaction.reply({
                content: 'ℹ️ **Reviewed Safe**: This event has been reviewed by moderation and verified as safe.',
                ephemeral: true
            });
        }

        if (event.spam_status === 'deleted') {
            return interaction.reply({
                content: 'ℹ️ This event thread has already been marked as deleted.',
                ephemeral: true
            });
        }

        // Check report channel setting
        const settings = await new Promise(resolve => database.getServerSettings(interaction.guildId, resolve));
        const reportChannelId = settings.spamReportChannelId;

        if (!reportChannelId) {
            return interaction.reply({
                content: '⚠️ **Not Configured**: The server administrators have not set up a Spam Report Channel yet. Please notify them using `/config type:Events System`.',
                ephemeral: true
            });
        }

        const reportChannel = await discordClient.channels.fetch(reportChannelId).catch(() => null);
        if (!reportChannel) {
            return interaction.reply({
                content: '⚠️ **Channel Error**: Could not access the configured Spam Report Channel. Please alert an admin.',
                ephemeral: true
            });
        }

        // If already reported, increment count and update existing alert
        if (event.spam_status === 'reported' && event.spam_report_msg_id) {
            const newCount = (event.spam_report_count || 1) + 1;
            await updateSpamReport(threadId, 'reported', newCount);

            // Fetch and update existing alert message
            try {
                const alertMsg = await reportChannel.messages.fetch(event.spam_report_msg_id);
                if (alertMsg && alertMsg.embeds.length > 0) {
                    const oldEmbed = alertMsg.embeds[0];
                    const updatedEmbed = EmbedBuilder.from(oldEmbed)
                        .setDescription(`🚨 **Reports Count:** **${newCount}**\n\n**Event Title:** ${event.title || 'Unknown'}\n**Thread:** <#${threadId}>`);
                    
                    await alertMsg.edit({ embeds: [updatedEmbed] });
                }
            } catch (msgErr) {
                logError(`[SpamHandler] Failed to update existing alert message ${event.spam_report_msg_id}: ${msgErr.message}`);
            }

            return interaction.reply({
                content: `✅ **Report Submitted**: Thank you! You are report **#${newCount}** for this event. Moderation is tracking this.`,
                ephemeral: true
            });
        }

        // First report: create alert embed and buttons
        const alertEmbed = new EmbedBuilder()
            .setTitle('🚨 New Spam / Policy Report')
            .setDescription(`🚨 **Reports Count:** **1**\n\n**Event Title:** ${event.title || 'Unknown'}\n**Thread:** <#${threadId}>\n**Reported By:** <@${interaction.user.id}>`)
            .setColor(0xFF0000) // Red
            .setTimestamp();

        const buttonsRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`delete_event_${threadId}`)
                .setLabel('🗑️ Delete Event Thread')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId(`dismiss_report_${threadId}`)
                .setLabel('✅ Dismiss Report')
                .setStyle(ButtonStyle.Success)
        );

        const alertMsg = await reportChannel.send({
            embeds: [alertEmbed],
            components: [buttonsRow]
        });

        await updateSpamReport(threadId, 'reported', 1, alertMsg.id);

        logInfo(`[SpamHandler] New spam report created for thread ${threadId} (Alert Msg: ${alertMsg.id})`);
        return interaction.reply({
            content: '✅ **Report Submitted**: Thank you! Moderation has been alerted to review this event.',
            ephemeral: true
        });

    } catch (err) {
        logError(`[SpamHandler] Error handling spam report for thread ${threadId}: ${err.message}`);
        return interaction.reply({
            content: '❌ An error occurred while processing your report. Please try again later.',
            ephemeral: true
        });
    }
}

/**
 * Handles admin clicks on moderation buttons (Delete Event / Dismiss Report) in report channel.
 *
 * @param {import('discord.js').ButtonInteraction} interaction
 * @param {object} database - Bot database instance
 * @param {import('discord.js').Client} discordClient
 */
async function handleSpamModeration(interaction, database, discordClient) {
    const customId = interaction.customId;
    
    // Check permission (must be admin/mod or server owner)
    if (!interaction.member.permissions.has('ManageThreads') && !interaction.member.permissions.has('Administrator')) {
        return interaction.reply({
            content: '❌ You need `Manage Threads` or `Administrator` permission to moderate event reports.',
            ephemeral: true
        });
    }

    try {
        if (customId.startsWith('delete_event_')) {
            const threadId = customId.replace('delete_event_', '');
            
            // Delete forum thread
            try {
                const thread = await discordClient.channels.fetch(threadId).catch(() => null);
                if (thread) {
                    await thread.delete('Deleted via Spam Moderation');
                }
            } catch (delErr) {
                logError(`[SpamHandler] Could not delete thread ${threadId}: ${delErr.message}`);
            }

            await markEventDeleted(threadId);

            // Update alert message to show deleted status and remove buttons
            if (interaction.message && interaction.message.embeds.length > 0) {
                const oldEmbed = interaction.message.embeds[0];
                const updatedEmbed = EmbedBuilder.from(oldEmbed)
                    .setTitle('🗑️ Event Thread Deleted')
                    .setDescription(`${oldEmbed.description}\n\n**Status:** 🗑️ Deleted by <@${interaction.user.id}>`)
                    .setColor(0x808080); // Grey

                await interaction.message.edit({ embeds: [updatedEmbed], components: [] });
            }

            return interaction.reply({
                content: '🗑️ **Event Deleted**: The thread has been removed and marked closed.',
                ephemeral: true
            });
        }

        if (customId.startsWith('dismiss_report_')) {
            const threadId = customId.replace('dismiss_report_', '');
            const event = await getEventByThreadId(threadId);
            const count = event ? event.spam_report_count : 1;

            await updateSpamReport(threadId, 'dismissed', count);

            // Update alert message to show dismissed status and remove buttons
            if (interaction.message && interaction.message.embeds.length > 0) {
                const oldEmbed = interaction.message.embeds[0];
                const updatedEmbed = EmbedBuilder.from(oldEmbed)
                    .setTitle('✅ Report Dismissed')
                    .setDescription(`${oldEmbed.description}\n\n**Status:** ✅ Dismissed by <@${interaction.user.id}> — *Further reports will be ignored.*`)
                    .setColor(0x00FF00); // Green

                await interaction.message.edit({ embeds: [updatedEmbed], components: [] });
            }

            return interaction.reply({
                content: '✅ **Report Dismissed**: Event marked safe. Any future spam reports on this thread will be ignored.',
                ephemeral: true
            });
        }
    } catch (err) {
        logError(`[SpamHandler] Error handling moderation action ${customId}: ${err.message}`);
        return interaction.reply({
            content: '❌ An error occurred during moderation action.',
            ephemeral: true
        });
    }
}

module.exports = {
    handleSpamReport,
    handleSpamModeration
};
