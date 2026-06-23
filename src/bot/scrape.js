const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.json');

// Dynamically load every command file from src/commands/
// Adding a new command = drop a file in that folder, nothing else needed here
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

const commands = commandFiles.map(file => require(path.join(commandsPath, file)));

// Build a lookup map for fast routing in the interaction handler
const commandMap = new Map(commands.map(cmd => [cmd.definition.name, cmd]));

console.log(`[CommandHandler] Loaded ${commands.length} commands: ${[...commandMap.keys()].join(', ')}`);

// Registers all slash commands with Discord as guild commands.
// Guild commands update instantly (vs global commands which take up to 1 hour).
async function registerCommands() {
    if (!config.clientId || !config.guildId) {
        return console.warn('[CommandHandler] clientId or guildId missing from config — skipping slash command registration.');
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        console.log('[CommandHandler] Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands.map(cmd => cmd.definition) }
        );

        console.log(`[CommandHandler] Successfully registered ${commands.length} slash commands.`);
    } catch (err) {
        console.error('[CommandHandler] Failed to register slash commands:', err.message);
    }
}

// Attaches the interactionCreate listener to the Discord client.
// Call this once during bot startup, before the client logs in.
function attachInteractionHandler(discordClient) {
    discordClient.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = commandMap.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(`[CommandHandler] Error executing /${interaction.commandName}:`, err.message);

            const errorMsg = '❌ An unexpected error occurred while running this command.';
            if (interaction.deferred || interaction.replied) {
                interaction.editReply(errorMsg).catch(() => {});
            } else {
                interaction.reply({ content: errorMsg, ephemeral: true }).catch(() => {});
            }
        }
    });

    console.log('[CommandHandler] Interaction handler attached.');
}

module.exports = { registerCommands, attachInteractionHandler };
