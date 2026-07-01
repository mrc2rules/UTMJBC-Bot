require('dotenv').config();
const { ShardingManager } = require('discord.js');
const path = require('path');
let token = process.env.DISCORD_TOKEN || process.env.TOKEN;
if (!token) {
    try { token = require('../config/config.json').token; } catch {}
}

const manager = new ShardingManager(path.join(__dirname, 'EmailBot.js'), {
  token,
  totalShards: 'auto',
  respawn: true,
});

manager.on('shardCreate', (shard) => {
  console.log(`Launched shard ${shard.id}`);
});

(async () => {
  try {
    await manager.spawn();
  } catch (error) {
    console.error('Failed to spawn shards:', error);
    process.exit(1);
  }
})();


