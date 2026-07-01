require('dotenv').config();
const {REST} = require("@discordjs/rest");
let token = process.env.DISCORD_TOKEN || process.env.TOKEN;
if (!token) {
    try { token = require("../../config/config.json").token; } catch {}
}

module.exports = new REST({ version: '10' }).setToken(token);