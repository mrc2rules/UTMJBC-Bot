const ServerStats = require("../ServerStats");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db = require("../shared/db");

class ServerStatsAPI {
    constructor(bot, startServer = true) {
        this.app = express();
        this.port = process.env.PORT || 8181;
        this.bot = bot
        this.started = false;
        this.historyFileName = "config/ServerStatsHistory.log"

        this.serverStats = new ServerStats(() => this.getServerCount())

        this.registerEndpoints()
        if (startServer) this.start()

    }

    async getServerCount() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                const counts = await shardUtil.fetchClientValues('guilds.cache.size');
                return counts.reduce((sum, count) => sum + Number(count || 0), 0);
            }
        } catch {}
        return this.bot.guilds.cache.size;
    }

    registerEndpoints() {
        this.app.use(cors({
            origin: "*"
        }));

        this.app.get('/mailsSendAll', (req, res) => {
            res.send(this.serverStats.mailsSendAll.toString())
        });

        this.app.get('/mailsSendToday', async (req, res) => {
            await this.serverStats.testDate()
            res.send(this.serverStats.mailsSendToday.toString())
        });

        this.app.get('/usersVerifiedAll', (req, res) => {
            res.send(this.serverStats.usersVerifiedAll.toString())
        });

        this.app.get('/usersVerifiedToday', async (req, res) => {
            await this.serverStats.testDate()
            res.send(this.serverStats.usersVerifiedToday.toString())
        });

        this.app.get('/serverCount', async (req, res) => {
            const count = await this.getServerCount();
            res.send(count.toString());
        });

        // Get current stats as JSON (for the stats page)
        this.app.get('/stats/current', async (req, res) => {
            await this.serverStats.testDate()
            const serverCount = await this.getServerCount()
            res.json({
                date: new Date().toISOString().split('T')[0],
                mailsSendToday: this.serverStats.mailsSendToday,
                mailsSendAll: this.serverStats.mailsSendAll,
                usersVerifiedToday: this.serverStats.usersVerifiedToday,
                usersVerifiedAll: this.serverStats.usersVerifiedAll,
                serverCount: serverCount,
                botStatus: this.bot && this.bot.ws && this.bot.ws.status === 0 ? 'online' : 'offline',
                botUptime: this.bot ? this.bot.uptime : null
            })
        });

        // Get historical stats from log file
        this.app.get('/stats/history', async (req, res) => {
            const days = parseInt(req.query.days) || 30
            try {
                const history = this.parseHistoryFile(days)
                res.json(history)
            } catch (err) {
                res.status(500).json({ error: 'Failed to read history' })
            }
        });

        // Get Telegram Scraper aggregate stats
        this.app.get('/stats/telegram', async (req, res) => {
            try {
                // Get all-time events count
                const totalEventsAllTime = await new Promise((resolve, reject) => {
                    db.get('SELECT COUNT(*) as count FROM telegram_events', [], (err, row) => {
                        if (err) reject(err);
                        else resolve(row ? row.count : 0);
                    });
                });

                // Get events published today
                const startOfToday = new Date();
                startOfToday.setHours(0, 0, 0, 0);
                const totalEventsToday = await new Promise((resolve, reject) => {
                    db.get('SELECT COUNT(*) as count FROM telegram_events WHERE posted_at >= ?', [startOfToday.getTime()], (err, row) => {
                        if (err) reject(err);
                        else resolve(row ? row.count : 0);
                    });
                });

                // Group by category (event_type)
                const categoryBreakdown = await new Promise((resolve, reject) => {
                    db.all('SELECT event_type, COUNT(*) as count FROM telegram_events WHERE event_type IS NOT NULL GROUP BY event_type', [], (err, rows) => {
                        if (err) reject(err);
                        else {
                            const map = {};
                            rows.forEach(r => { map[r.event_type] = r.count; });
                            resolve(map);
                        }
                    });
                });

                // Group by topic
                const topicBreakdown = await new Promise((resolve, reject) => {
                    db.all('SELECT topic, COUNT(*) as count FROM telegram_events WHERE topic IS NOT NULL GROUP BY topic', [], (err, rows) => {
                        if (err) reject(err);
                        else {
                            const map = {};
                            rows.forEach(r => { map[r.topic] = r.count; });
                            resolve(map);
                        }
                    });
                });

                // Group by cost type
                const costBreakdown = await new Promise((resolve, reject) => {
                    db.all('SELECT cost, COUNT(*) as count FROM telegram_events WHERE cost IS NOT NULL GROUP BY cost', [], (err, rows) => {
                        if (err) reject(err);
                        else {
                            const map = {};
                            rows.forEach(r => { map[r.cost] = r.count; });
                            resolve(map);
                        }
                    });
                });

                // Group by merit
                const meritCount = await new Promise((resolve, reject) => {
                    db.get('SELECT COUNT(*) as count FROM telegram_events WHERE merit = 1', [], (err, row) => {
                        if (err) reject(err);
                        else resolve(row ? row.count : 0);
                    });
                });

                // Aggregated deduplication gates from daily stats
                const dedupSummary = await new Promise((resolve, reject) => {
                    db.get(`
                        SELECT 
                            SUM(messages_scraped) as scraped,
                            SUM(skipped_short) as short,
                            SUM(skipped_blacklist) as blacklist,
                            SUM(skipped_seen) as seen,
                            SUM(skipped_exact_duplicate) as exact_dupe,
                            SUM(skipped_near_duplicate) as near_dupe,
                            SUM(skipped_past) as past,
                            SUM(skipped_title_duplicate) as title_dupe,
                            SUM(sent_to_gemini) as gemini,
                            SUM(events_found) as events
                        FROM scraper_daily_stats
                    `, [], (err, row) => {
                        if (err) reject(err);
                        else resolve(row || {});
                    });
                });

                res.json({
                    totalEventsAllTime,
                    totalEventsToday,
                    categoryBreakdown,
                    topicBreakdown,
                    costBreakdown,
                    meritCount,
                    dedupSummary
                });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // Get daily scraper history
        this.app.get('/stats/telegram/history', async (req, res) => {
            const days = parseInt(req.query.days) || 30;
            try {
                const history = await new Promise((resolve, reject) => {
                    db.all(
                        'SELECT * FROM scraper_daily_stats ORDER BY date DESC LIMIT ?',
                        [days],
                        (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows ? rows.reverse() : []); // Reverse to return chronological order
                        }
                    );
                });
                res.json(history);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }

    parseHistoryFile(days) {
        if (!fs.existsSync(this.historyFileName)) {
            return []
        }
        
        // Read only the last N lines efficiently from the end of file
        const lines = this.readLastLines(days)
        
        const results = []
        for (const line of lines) {
            const parts = line.split(',')
            if (parts.length >= 4) {
                // Handle both old format (4 cols) and new format (6 cols)
                const entry = {
                    date: parts[0],
                    mailsSendToday: parseInt(parts[1]) || 0,
                    mailsSendAll: parseInt(parts[2]) || 0,
                    usersVerifiedToday: parts.length >= 5 ? parseInt(parts[3]) || 0 : 0,
                    usersVerifiedAll: parts.length >= 5 ? parseInt(parts[4]) || 0 : 0,
                    serverCount: parseInt(parts[parts.length - 1]) || 0
                }
                results.push(entry)
            }
        }
        
        return results
    }

    readLastLines(numLines) {
        const stat = fs.statSync(this.historyFileName)
        const fileSize = stat.size
        
        if (fileSize === 0) return []
        
        // Estimate ~100 bytes per line, read a bit more to be safe
        const chunkSize = Math.min(fileSize, numLines * 150)
        const buffer = Buffer.alloc(chunkSize)
        
        const fd = fs.openSync(this.historyFileName, 'r')
        try {
            // Read from end of file
            const startPos = Math.max(0, fileSize - chunkSize)
            fs.readSync(fd, buffer, 0, chunkSize, startPos)
            
            let data = buffer.toString('utf8')
            
            // If we didn't read from start, we might have a partial first line - remove it
            if (startPos > 0) {
                const firstNewline = data.indexOf('\n')
                if (firstNewline !== -1) {
                    data = data.substring(firstNewline + 1)
                }
            }
            
            const lines = data.trim().split('\n').filter(line => line.length > 0)
            
            // Return only the last N lines
            return lines.slice(-numLines)
        } finally {
            fs.closeSync(fd)
        }
    }

    start() {
        if (this.started) return;
        this.started = true;
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}!`)
        });
    }

    async increaseMailSend() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                // If this is NOT the primary shard (id 0), forward the increment to shard 0
                if (!shardUtil.ids.includes(0)) {
                    console.log(`[Shard ${shardUtil.ids}] Forwarding mail count to shard 0`)
                    shardUtil.broadcastEval(async (client) => {
                        if (client.shard && client.shard.ids.includes(0) && client.serverStatsAPI) {
                            console.log(`[Shard ${client.shard.ids}] Received mail count from another shard`)
                            await client.serverStatsAPI.serverStats.increaseMailSend();
                        }
                    }).catch(() => {});
                    return;
                }
            }
        } catch {}
        // Unsharded or primary shard: update locally
        console.log(`[Shard ${this.bot.shard?.ids ?? 'N/A'}] Increasing mail send locally`)
        await this.serverStats.increaseMailSend()
    }

    async increaseVerifiedUsers() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                // If this is NOT the primary shard (id 0), forward the increment to shard 0
                if (!shardUtil.ids.includes(0)) {
                    console.log(`[Shard ${shardUtil.ids}] Forwarding verified user count to shard 0`)
                    shardUtil.broadcastEval(async (client) => {
                        if (client.shard && client.shard.ids.includes(0) && client.serverStatsAPI) {
                            console.log(`[Shard ${client.shard.ids}] Received verified user count from another shard`)
                            await client.serverStatsAPI.serverStats.increaseVerifiedUsers();
                        }
                    }).catch(() => {});
                    return;
                }
            }
        } catch {}
        // Unsharded or primary shard: update locally
        console.log(`[Shard ${this.bot.shard?.ids ?? 'N/A'}] Increasing verified users locally`)
        await this.serverStats.increaseVerifiedUsers()
    }

}

module.exports = ServerStatsAPI


