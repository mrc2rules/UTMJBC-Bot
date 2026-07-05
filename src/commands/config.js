const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags, EmbedBuilder, ChannelType } = require('discord.js');
const database = require("../database/Database.js");
const { logInfo, logError } = require("../shared/logger");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configure Event System channels and AI Models')
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Which system to configure')
                .setRequired(true)
                .addChoices(
                    { name: 'Events System', value: 'events' },
                    { name: 'AI Models', value: 'models' }
                )
        )
        .addChannelOption(option =>
            option
                .setName('forum_channel')
                .setDescription('Discord Forum Channel where event threads are posted (for Events System)')
                .addChannelTypes(ChannelType.GuildForum)
                .setRequired(false)
        )
        .addChannelOption(option =>
            option
                .setName('report_channel')
                .setDescription('Text Channel where spam/policy reports are alerted (for Events System)')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName('chatbot_model')
                .setDescription('Gemini model name for /askai chatbot (e.g. gemini-2.5-flash, gemini-2.5-pro)')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName('scraper_model')
                .setDescription('Gemini model name for Event Scraper (e.g. gemini-2.5-flash, gemini-2.5-pro)')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(0), // Admin only

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const forumChannel = interaction.options.getChannel('forum_channel');
        const reportChannel = interaction.options.getChannel('report_channel');
        const chatbotModel = interaction.options.getString('chatbot_model')?.trim();
        const scraperModel = interaction.options.getString('scraper_model')?.trim();

        await database.getServerSettings(interaction.guildId, async (serverSettings) => {
            if (type === 'events') {
                // If no parameters provided, display current Events System config
                if (!forumChannel && !reportChannel) {
                    const forumDisplay = serverSettings.eventForumId ? `<#${serverSettings.eventForumId}>` : '*Not Configured (Using default/config.json)*';
                    const reportDisplay = serverSettings.spamReportChannelId ? `<#${serverSettings.spamReportChannelId}>` : '*Not Configured*';

                    const embed = new EmbedBuilder()
                        .setTitle('⚙️ Events System Configuration')
                        .setColor(0x5D001A)
                        .addFields(
                            { name: '🏛️ Event Forum Channel', value: forumDisplay, inline: false },
                            { name: '🚨 Spam Report Channel', value: reportDisplay, inline: false }
                        )
                        .setDescription('To update these settings, run `/config type:Events System` with the optional `forum_channel` or `report_channel` arguments.')
                        .setTimestamp();

                    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
                }

                // Update provided fields
                let updatedFields = [];
                if (forumChannel) {
                    serverSettings.eventForumId = forumChannel.id;
                    updatedFields.push(`**Event Forum**: <#${forumChannel.id}>`);
                }
                if (reportChannel) {
                    serverSettings.spamReportChannelId = reportChannel.id;
                    updatedFields.push(`**Spam Report Channel**: <#${reportChannel.id}>`);
                }

                database.updateServerSettings(interaction.guildId, serverSettings);
                logInfo(`[Config] Updated Events System config in guild ${interaction.guildId}: ${updatedFields.join(', ')}`);

                return interaction.reply({
                    content: `✅ **Events System Configuration Updated**:\n• ${updatedFields.join('\n• ')}`,
                    flags: MessageFlags.Ephemeral
                });
            }

            if (type === 'models') {
                // If no parameters provided, display current AI Models config
                if (!chatbotModel && !scraperModel) {
                    const chatbotDisplay = `\`${serverSettings.chatbotModel || 'gemini-2.5-flash'}\``;
                    const scraperDisplay = `\`${serverSettings.scraperModel || 'gemini-2.5-flash'}\``;

                    const embed = new EmbedBuilder()
                        .setTitle('🤖 AI Models Configuration')
                        .setColor(0x5D001A)
                        .addFields(
                            { name: '💬 Chatbot Model (`/askai`)', value: chatbotDisplay, inline: true },
                            { name: '🕷️ Scraper Model (Events)', value: scraperDisplay, inline: true }
                        )
                        .setDescription('To update these models, run `/config type:AI Models` and type out the model name in `chatbot_model` or `scraper_model` (e.g., `gemini-2.5-pro`, `gemini-1.5-pro`).')
                        .setTimestamp();

                    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
                }

                // Update provided fields
                let updatedFields = [];
                if (chatbotModel) {
                    serverSettings.chatbotModel = chatbotModel;
                    updatedFields.push(`**Chatbot Model**: \`${chatbotModel}\``);
                }
                if (scraperModel) {
                    serverSettings.scraperModel = scraperModel;
                    updatedFields.push(`**Scraper Model**: \`${scraperModel}\``);
                }

                database.updateServerSettings(interaction.guildId, serverSettings);
                logInfo(`[Config] Updated AI Models config in guild ${interaction.guildId}: ${updatedFields.join(', ')}`);

                return interaction.reply({
                    content: `✅ **AI Models Configuration Updated**:\n• ${updatedFields.join('\n• ')}`,
                    flags: MessageFlags.Ephemeral
                });
            }
        });
    }
};
