const ServerStats = require("../ServerStats");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fsPromises = require("fs").promises;

class ServerStatsAPI {
    constructor(bot, startServer = true) {
        this.app = express();
        this.port = process.env.PORT || 8181;
        this.bot = bot;
        this.started = false;
        this.historyFileName = "config/ServerStatsHistory.log";

        // 60-second in-memory cache to prevent IPC flood across Discord bot shards & disk I/O DoS
        this.cache = {
            serverCount: { value: null, lastUpdated: 0 },
            history: { data: null, daysParam: null, lastUpdated: 0 }
        };

        this.serverStats = new ServerStats(() => this.getServerCount());

        this.registerEndpoints();
        if (startServer) this.start();
    }

    async getServerCount() {
        const now = Date.now();
        if (this.cache.serverCount.value !== null && (now - this.cache.serverCount.lastUpdated < 60000)) {
            return this.cache.serverCount.value;
        }

        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                const counts = await shardUtil.fetchClientValues('guilds.cache.size');
                const total = counts.reduce((sum, count) => sum + Number(count || 0), 0);
                this.cache.serverCount = { value: total, lastUpdated: now };
                return total;
            }
        } catch {}
        
        const count = this.bot?.guilds?.cache?.size || 0;
        this.cache.serverCount = { value: count, lastUpdated: now };
        return count;
    }

    registerEndpoints() {
        // HTTP Security Headers
        this.app.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
            next();
        });

        // Sliding-window IP Rate Limiter (Max 60 req / min per IP)
        const rateLimitMap = new Map();
        const RATE_LIMIT_WINDOW_MS = 60 * 1000;
        const MAX_REQUESTS = 60;

        this.app.use((req, res, next) => {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
            const now = Date.now();
            let record = rateLimitMap.get(ip);

            if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
                record = { startTime: now, count: 1 };
                rateLimitMap.set(ip, record);
            } else {
                record.count++;
            }

            if (rateLimitMap.size > 1000) {
                for (const [key, val] of rateLimitMap.entries()) {
                    if (now - val.startTime > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
                }
            }

            if (record.count > MAX_REQUESTS) {
                return res.status(429).json({ error: 'Too many requests, please try again later.' });
            }
            next();
        });

        this.app.use(cors({
            origin: "*"
        }));

        this.app.get('/mailsSendAll', (req, res) => {
            res.send(this.serverStats.mailsSendAll.toString());
        });

        this.app.get('/mailsSendToday', async (req, res) => {
            await this.serverStats.testDate();
            res.send(this.serverStats.mailsSendToday.toString());
        });

        this.app.get('/usersVerifiedAll', (req, res) => {
            res.send(this.serverStats.usersVerifiedAll.toString());
        });

        this.app.get('/usersVerifiedToday', async (req, res) => {
            await this.serverStats.testDate();
            res.send(this.serverStats.usersVerifiedToday.toString());
        });

        this.app.get('/serverCount', async (req, res) => {
            const count = await this.getServerCount();
            res.send(count.toString());
        });

        // Get current stats as JSON (for the stats page)
        this.app.get('/stats/current', async (req, res) => {
            await this.serverStats.testDate();
            const serverCount = await this.getServerCount();
            res.json({
                date: new Date().toISOString().split('T')[0],
                mailsSendToday: this.serverStats.mailsSendToday,
                mailsSendAll: this.serverStats.mailsSendAll,
                usersVerifiedToday: this.serverStats.usersVerifiedToday,
                usersVerifiedAll: this.serverStats.usersVerifiedAll,
                serverCount: serverCount
            });
        });

        // Get historical stats from log file (Non-blocking async I/O with caching)
        this.app.get('/stats/history', async (req, res) => {
            const rawDays = parseInt(req.query.days) || 30;
            const days = Math.min(Math.max(rawDays, 1), 365);
            const now = Date.now();

            if (this.cache.history.data && this.cache.history.daysParam === days && (now - this.cache.history.lastUpdated < 60000)) {
                return res.json(this.cache.history.data);
            }

            try {
                const history = await this.parseHistoryFile(days);
                this.cache.history = { data: history, daysParam: days, lastUpdated: now };
                res.json(history);
            } catch (err) {
                res.status(500).json({ error: 'Failed to read history' });
            }
        });
    }

    async parseHistoryFile(days) {
        if (!fs.existsSync(this.historyFileName)) {
            return [];
        }
        
        const lines = await this.readLastLines(days);
        const results = [];
        for (const line of lines) {
            const parts = line.split(',');
            if (parts.length >= 4) {
                const entry = {
                    date: parts[0],
                    mailsSendToday: parseInt(parts[1]) || 0,
                    mailsSendAll: parseInt(parts[2]) || 0,
                    usersVerifiedToday: parts.length >= 5 ? parseInt(parts[3]) || 0 : 0,
                    usersVerifiedAll: parts.length >= 5 ? parseInt(parts[4]) || 0 : 0,
                    serverCount: parseInt(parts[parts.length - 1]) || 0
                };
                results.push(entry);
            }
        }
        return results;
    }

    async readLastLines(numLines) {
        try {
            const stat = await fsPromises.stat(this.historyFileName);
            const fileSize = stat.size;
            if (fileSize === 0) return [];
            
            const chunkSize = Math.min(fileSize, numLines * 150);
            const buffer = Buffer.alloc(chunkSize);
            
            const fileHandle = await fsPromises.open(this.historyFileName, 'r');
            try {
                const startPos = Math.max(0, fileSize - chunkSize);
                await fileHandle.read(buffer, 0, chunkSize, startPos);
                
                let data = buffer.toString('utf8');
                if (startPos > 0) {
                    const firstNewline = data.indexOf('\n');
                    if (firstNewline !== -1) {
                        data = data.substring(firstNewline + 1);
                    }
                }
                
                const lines = data.trim().split('\n').filter(line => line.length > 0);
                return lines.slice(-numLines);
            } finally {
                await fileHandle.close();
            }
        } catch {
            return [];
        }
    }

    start() {
        if (this.started) return;
        this.started = true;
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`App listening on port ${this.port}!`);
        });
    }

    async increaseMailSend() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                if (!shardUtil.ids.includes(0)) {
                    console.log(`[Shard ${shardUtil.ids}] Forwarding mail count to shard 0`);
                    shardUtil.broadcastEval(async (client) => {
                        if (client.shard && client.shard.ids.includes(0) && client.serverStatsAPI) {
                            console.log(`[Shard ${client.shard.ids}] Received mail count from another shard`);
                            await client.serverStatsAPI.serverStats.increaseMailSend();
                        }
                    }).catch(() => {});
                    return;
                }
            }
        } catch {}
        console.log(`[Shard ${this.bot.shard?.ids ?? 'N/A'}] Increasing mail send locally`);
        await this.serverStats.increaseMailSend();
    }

    async increaseVerifiedUsers() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                if (!shardUtil.ids.includes(0)) {
                    console.log(`[Shard ${shardUtil.ids}] Forwarding verified user count to shard 0`);
                    shardUtil.broadcastEval(async (client) => {
                        if (client.shard && client.shard.ids.includes(0) && client.serverStatsAPI) {
                            console.log(`[Shard ${client.shard.ids}] Received verified user count from another shard`);
                            await client.serverStatsAPI.serverStats.increaseVerifiedUsers();
                        }
                    }).catch(() => {});
                    return;
                }
            }
        } catch {}
        console.log(`[Shard ${this.bot.shard?.ids ?? 'N/A'}] Increasing verified users locally`);
        await this.serverStats.increaseVerifiedUsers();
    }
}

module.exports = ServerStatsAPI;


