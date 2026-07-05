const database = require("../database/Database");
const rest = require("../api/DiscordRest");
const {Routes} = require("discord-api-types/v9");
const {clientId} = require("../../config/config.json");

function truncateString(str) {
    if (str.length > 100) {
        return str.substring(0, 96) + '...';
    }
    return str;
}

module.exports = async function registerRemoveDomain(guildId, domainCommand = require("../commands/domain")) {
    await database.getServerSettings(guildId, async serverSettings => {
        rest.get(Routes.applicationGuildCommands(clientId, guildId)).then(async commands => {
            const command = commands.find(cmd => cmd.name === "domain")
            const commandId = command?.id

            if (!commandId) return

            let domainCommandData = domainCommand.data.toJSON()

            // Find the 'domains' option (top-level in refactored command or in legacy 'remove' subcommand)
            const domainsOption = domainCommandData.options.find(opt => opt.name === "domains") ||
                                  domainCommandData.options.find(opt => opt.name === "remove")?.options?.find(opt => opt.name === "domains");
            if (domainsOption) {
                if (serverSettings.domains.length > 0 && serverSettings.domains.length <= 25) {
                    domainsOption.choices = serverSettings.domains.map(domain => {
                        return {"name": truncateString(domain), "value": truncateString(domain)}
                    })
                } else {
                    domainsOption.choices = undefined
                }
            }

            rest.patch(Routes.applicationGuildCommand(clientId, guildId, commandId), {body: domainCommandData}).catch()
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
}
