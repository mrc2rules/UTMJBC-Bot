require('dotenv').config();
const {REST} = require("@discordjs/rest");
let token;
try { token = require("../../config/config.json").token; } catch {}
if (!token) token = process.env.DISCORD_TOKEN || process.env.DISCORD_BOT_TOKEN;

module.exports = new REST({ version: '10' }).setToken(token);