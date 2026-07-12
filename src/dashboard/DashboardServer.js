const express = require('express');
const path = require('path');
const crypto = require('crypto');
const database = require('../database/Database.js');
const { logInfo, logWarn, logError } = require('../shared/logger');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { getLocale } = require('../Language');
const md5hash = require('../crypto/Crypto');
const EmailUser = require('../database/EmailUser');
const { getKeywordBlacklist, addKeywordToBlacklist, removeKeywordFromBlacklist } = require('../telegram/KeywordBlacklistManager');
const { runScrape } = require('../telegram/TelegramListener');
const state = require('../shared/state');

class DashboardServer {
    constructor() {
        this.app = express();
        // AlwaysData (when running as Node.js or User program site) injects PORT and ALWAYSDATA_HTTPD_PORT.
        // We prioritize ALWAYSDATA_HTTPD_PORT or PORT so the web proxy routes directly to our dashboard.
        this.envPort = process.env.ALWAYSDATA_HTTPD_PORT || process.env.PORT;
        this.port = this.envPort ? parseInt(this.envPort, 10) : (process.env.DASHBOARD_PORT || 8182);
        this.bot = null;
        this.started = false;
        this.sessions = new Map(); // sessionId -> { user, guilds, expiresAt }

        // Clean up expired sessions every hour
        setInterval(() => {
            const now = Date.now();
            for (const [id, session] of this.sessions.entries()) {
                if (session.expiresAt < now) {
                    this.sessions.delete(id);
                }
            }
        }, 3600000);
    }

    getConfig() {
        let clientId = process.env.DISCORD_CLIENT_ID || process.env.CLIENT_ID || process.env.clientId;
        let clientSecret = process.env.DISCORD_CLIENT_SECRET || process.env.CLIENT_SECRET || process.env.clientSecret;
        let redirectUri = process.env.DASHBOARD_REDIRECT_URI || process.env.REDIRECT_URI;
        let baseUrl = process.env.DASHBOARD_URL || process.env.BASE_URL || `http://localhost:${this.port}`;

        try {
            const fs = require('fs');
            const configPath = path.join(__dirname, '../../config/config.json');
            if (fs.existsSync(configPath)) {
                const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                if (!clientId) clientId = cfg.clientId || cfg.CLIENT_ID || cfg.DISCORD_CLIENT_ID || cfg.discordClientId;
                if (!clientSecret) clientSecret = cfg.clientSecret || cfg.CLIENT_SECRET || cfg.DISCORD_CLIENT_SECRET || cfg.discordClientSecret;
                if (!redirectUri) redirectUri = cfg.dashboardRedirectUri || cfg.DASHBOARD_REDIRECT_URI || cfg.redirectUri;
                if (!baseUrl && cfg.dashboardUrl) baseUrl = cfg.dashboardUrl;
                if (cfg.dashboardPort && !this.envPort) this.port = cfg.dashboardPort;
            }
        } catch (err) {
            logWarn(`[DashboardServer] Error reading config.json: ${err.message}`);
        }

        if (!redirectUri) {
            redirectUri = `${baseUrl.replace(/\/$/, '')}/auth/callback`;
        }

        return { clientId, clientSecret, redirectUri, baseUrl };
    }

    getSession(req) {
        let sessionId = null;
        // Check Cookie header
        const cookieHeader = req.headers.cookie;
        if (cookieHeader) {
            const cookies = cookieHeader.split(';').reduce((acc, c) => {
                const [key, val] = c.trim().split('=');
                if (key && val) acc[key] = decodeURIComponent(val);
                return acc;
            }, {});
            sessionId = cookies['octavia_session'];
        }
        // Check Authorization header
        if (!sessionId && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
                sessionId = parts[1];
            }
        }

        if (!sessionId || !this.sessions.has(sessionId)) return null;
        const session = this.sessions.get(sessionId);
        if (session.expiresAt < Date.now()) {
            this.sessions.delete(sessionId);
            return null;
        }
        return { sessionId, ...session };
    }

    async getBotGuildIds() {
        if (!this.bot) return new Set();
        try {
            if (this.bot.shard && typeof this.bot.shard.count === 'number' && this.bot.shard.count > 1) {
                const results = await this.bot.shard.broadcastEval(async c => {
                    try { await c.guilds.fetch(); } catch {}
                    return Array.from(c.guilds.cache.keys());
                });
                const allIds = new Set();
                for (const arr of results) {
                    if (Array.isArray(arr)) arr.forEach(id => allIds.add(id));
                }
                return allIds;
            }
            try { await this.bot.guilds.fetch(); } catch {}
        } catch (err) {
            logWarn(`[DashboardServer] broadcastEval error fetching guild IDs: ${err.message}`);
        }
        return new Set(this.bot.guilds.cache.keys());
    }

    async getGuildMetadata(guildId) {
        if (!this.bot) return null;

        // Try local cache first
        const localGuild = this.bot.guilds.cache.get(guildId);
        if (localGuild) {
            try {
                await localGuild.roles.fetch();
                await localGuild.channels.fetch();
            } catch (err) {
                logWarn(`[DashboardServer] Failed to fetch live roles/channels for guild ${guildId}: ${err.message}`);
            }
            return this.formatGuildMetadata(localGuild);
        }

        // Try sharded broadcastEval
        if (this.bot.shard && typeof this.bot.shard.count === 'number' && this.bot.shard.count > 1) {
            try {
                const results = await this.bot.shard.broadcastEval(async (client, id) => {
                    const g = client.guilds.cache.get(id);
                    if (!g) return null;
                    try {
                        await g.roles.fetch();
                        await g.channels.fetch();
                    } catch {}
                    return {
                        id: g.id,
                        name: g.name,
                        icon: g.iconURL({ dynamic: true, size: 128 }),
                        roles: g.roles.cache.map(r => ({
                            id: r.id,
                            name: r.name,
                            color: r.hexColor,
                            position: r.rawPosition,
                            managed: r.managed,
                            nameEqualsEveryone: r.name === '@everyone'
                        })).sort((a, b) => b.position - a.position),
                        channels: g.channels.cache
                            .filter(c => c.type === 0 || c.type === 15 || c.type === 5) // Text, Forum, Announcement
                            .map(c => ({
                                id: c.id,
                                name: c.name,
                                type: c.type
                            })).sort((a, b) => a.name.localeCompare(b.name))
                    };
                }, { context: guildId });

                for (const res of results) {
                    if (res) return res;
                }
            } catch (err) {
                logError(`[DashboardServer] Error fetching metadata for guild ${guildId}: ${err.message}`);
            }
        }

        return null;
    }

    formatGuildMetadata(g) {
        return {
            id: g.id,
            name: g.name,
            icon: g.iconURL({ dynamic: true, size: 128 }),
            roles: g.roles.cache.map(r => ({
                id: r.id,
                name: r.name,
                color: r.hexColor,
                position: r.rawPosition,
                managed: r.managed,
                nameEqualsEveryone: r.name === '@everyone'
            })).sort((a, b) => b.position - a.position),
            channels: g.channels.cache
                .filter(c => c.type === 0 || c.type === 15 || c.type === 5)
                .map(c => ({
                    id: c.id,
                    name: c.name,
                    type: c.type
                })).sort((a, b) => a.name.localeCompare(b.name))
        };
    }

    registerRoutes() {
        this.app.use(express.json());

        // Security headers
        this.app.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            next();
        });

        // Serve static dashboard UI
        this.app.use(express.static(path.join(__dirname, 'public')));

        // Status / Config Check Endpoint
        this.app.get('/api/status', async (req, res) => {
            const cfg = this.getConfig();
            const botGuilds = await this.getBotGuildIds();
            res.json({
                ready: true,
                oauthConfigured: Boolean(cfg.clientId && cfg.clientSecret),
                clientId: cfg.clientId || null,
                redirectUri: cfg.redirectUri,
                totalBotServers: botGuilds.size
            });
        });

        // OAuth2 Authorization Redirect
        this.app.get('/auth/discord', (req, res) => {
            const cfg = this.getConfig();
            if (!cfg.clientId || !cfg.clientSecret) {
                return res.status(500).send(`
                    <div style="font-family: sans-serif; background: #0f1117; color: #fff; padding: 40px; max-width: 600px; margin: 40px auto; border-radius: 12px; border: 1px solid #ff4d6d;">
                        <h2 style="color: #ff4d6d; margin-top: 0;">OAuth2 Not Configured</h2>
                        <p>To enable "Log in with Discord" on Octavia's Web Dashboard, you must configure your Discord Client ID and Client Secret.</p>
                        <p>Add them to your <code>.env</code> or <code>config/config.json</code>:</p>
                        <pre style="background: #1a1e29; padding: 16px; border-radius: 8px; font-family: monospace; line-height: 1.5;">CLIENT_ID=your_client_id_here (or DISCORD_CLIENT_ID)
CLIENT_SECRET=your_client_secret_here (or DISCORD_CLIENT_SECRET)</pre>
                        <p>And make sure your OAuth2 Redirect URI in the Discord Developer Portal is set to:<br><b>${cfg.redirectUri}</b></p>
                    </div>
                `);
            }

            const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&response_type=code&scope=identify%20guilds`;
            res.redirect(authUrl);
        });

        // OAuth2 Callback
        this.app.get('/auth/callback', async (req, res) => {
            const code = req.query.code;
            if (!code) {
                return res.redirect('/?error=no_code');
            }

            const cfg = this.getConfig();
            try {
                // Exchange code for token
                const params = new URLSearchParams({
                    client_id: cfg.clientId,
                    client_secret: cfg.clientSecret,
                    grant_type: 'authorization_code',
                    code: code.toString(),
                    redirect_uri: cfg.redirectUri
                });

                const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: params
                });

                if (!tokenRes.ok) {
                    const errBody = await tokenRes.text();
                    logError(`[DashboardServer] OAuth2 token exchange failed: ${errBody}`);
                    return res.redirect('/?error=token_failed');
                }

                const tokenData = await tokenRes.json();
                const accessToken = tokenData.access_token;

                // Fetch User @me
                const userRes = await fetch('https://discord.com/api/v10/users/@me', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                const userData = await userRes.json();

                // Fetch User @me/guilds
                const guildsRes = await fetch('https://discord.com/api/v10/users/@me/guilds', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                const userGuilds = await guildsRes.json();

                // Filter for admin/manage guilds
                const adminGuilds = Array.isArray(userGuilds) ? userGuilds.filter(g => {
                    if (g.owner) return true;
                    try {
                        const perms = BigInt(g.permissions || 0);
                        const ADMIN = BigInt(0x8);
                        const MANAGE_GUILD = BigInt(0x20);
                        return (perms & ADMIN) === ADMIN || (perms & MANAGE_GUILD) === MANAGE_GUILD;
                    } catch {
                        return false;
                    }
                }) : [];

                const sessionId = crypto.randomBytes(32).toString('hex');
                this.sessions.set(sessionId, {
                    user: {
                        id: userData.id,
                        username: userData.username,
                        globalName: userData.global_name || userData.username,
                        avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : 'https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/octavia.png'
                    },
                    guilds: adminGuilds.map(g => ({
                        id: g.id,
                        name: g.name,
                        icon: g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png` : null,
                        owner: g.owner,
                        permissions: g.permissions
                    })),
                    expiresAt: Date.now() + 86400000 // 24 hours
                });

                res.setHeader('Set-Cookie', `octavia_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
                res.redirect('/');
            } catch (err) {
                logError(`[DashboardServer] OAuth2 callback exception: ${err.message}`);
                res.redirect('/?error=auth_exception');
            }
        });

        // Logout
        this.app.get('/auth/logout', (req, res) => {
            const session = this.getSession(req);
            if (session) {
                this.sessions.delete(session.sessionId);
            }
            res.setHeader('Set-Cookie', 'octavia_session=; Path=/; HttpOnly; Max-Age=0');
            res.redirect('/');
        });

        // Get Logged-In User Profile and Managed Guilds
        this.app.get('/api/user', async (req, res) => {
            const session = this.getSession(req);
            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const botGuildIds = await this.getBotGuildIds();
            const enrichedGuilds = session.guilds.map(g => ({
                ...g,
                botPresent: botGuildIds.has(g.id)
            })).sort((a, b) => {
                if (a.botPresent !== b.botPresent) return b.botPresent ? 1 : -1;
                return a.name.localeCompare(b.name);
            });

            res.json({
                user: session.user,
                guilds: enrichedGuilds
            });
        });

        // Middleware for checking logged-in session on endpoints without guild context
        const requireAuth = (req, res, next) => {
            const session = this.getSession(req);
            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            req.session = session;
            next();
        };

        // Middleware for checking guild admin rights on protected endpoints
        const requireGuildAdmin = async (req, res, next) => {
            const session = this.getSession(req);
            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const guildId = req.params.id;
            const hasAccess = session.guilds.some(g => g.id === guildId);
            if (!hasAccess) {
                return res.status(403).json({ error: 'Forbidden — You must be an Administrator or Manager on this server.' });
            }
            req.session = session;
            next();
        };

        // Get Guild Metadata (channels, roles, details)
        this.app.get('/api/guilds/:id/metadata', requireGuildAdmin, async (req, res) => {
            const meta = await this.getGuildMetadata(req.params.id);
            if (!meta) {
                return res.status(404).json({ error: 'Octavia is not inside this server, or the server could not be reached across shards.' });
            }
            res.json(meta);
        });

        // Get Current Server Settings from Database.js
        this.app.get('/api/guilds/:id/settings', requireGuildAdmin, (req, res) => {
            database.getServerSettings(req.params.id, (settings) => {
                res.json(settings);
            });
        });

        // Update Server Settings in Database.js
        this.app.post('/api/guilds/:id/settings', requireGuildAdmin, (req, res) => {
            const guildId = req.params.id;
            const body = req.body || {};

            database.getServerSettings(guildId, (existingSettings) => {
                // Merge/validate settings
                existingSettings.language = body.language ?? existingSettings.language ?? 'english';
                existingSettings.verifyMessage = body.verifyMessage ?? existingSettings.verifyMessage ?? '';
                existingSettings.autoVerify = Number(body.autoVerify ? 1 : 0);
                existingSettings.autoAddUnverified = Number(body.autoAddUnverified ? 1 : 0);
                
                existingSettings.verifiedRoleName = body.verifiedRoleName ?? existingSettings.verifiedRoleName ?? '';
                existingSettings.unverifiedRoleName = body.unverifiedRoleName ?? existingSettings.unverifiedRoleName ?? '';
                existingSettings.channelID = body.channelID ?? existingSettings.channelID ?? '';
                existingSettings.messageID = body.messageID ?? existingSettings.messageID ?? '';
                existingSettings.logChannel = body.logChannel ?? existingSettings.logChannel ?? '';
                existingSettings.errorNotifyType = body.errorNotifyType ?? existingSettings.errorNotifyType ?? 'owner';
                existingSettings.errorNotifyTarget = body.errorNotifyTarget ?? existingSettings.errorNotifyTarget ?? '';

                existingSettings.eventForumId = body.eventForumId ?? existingSettings.eventForumId ?? '';
                existingSettings.spamReportChannelId = body.spamReportChannelId ?? existingSettings.spamReportChannelId ?? '';
                existingSettings.chatbotModel = body.chatbotModel ?? existingSettings.chatbotModel ?? 'gemini-2.5-flash';
                existingSettings.scraperModel = body.scraperModel ?? existingSettings.scraperModel ?? 'gemini-2.5-flash';

                // Arrays & Objects
                if (Array.isArray(body.domains)) existingSettings.domains = body.domains;
                if (Array.isArray(body.blacklist)) existingSettings.blacklist = body.blacklist;
                if (Array.isArray(body.defaultRoles)) existingSettings.defaultRoles = body.defaultRoles;
                if (body.domainRoles && typeof body.domainRoles === 'object') existingSettings.domainRoles = body.domainRoles;

                // Persist
                try {
                    database.updateServerSettings(guildId, existingSettings);
                    logInfo(`[DashboardServer] User ${req.session.user.username} (${req.session.user.id}) updated settings for guild ${guildId}`);
                    res.json({ success: true, message: 'Settings saved successfully', settings: existingSettings });
                } catch (err) {
                    logError(`[DashboardServer] Error saving settings for guild ${guildId}: ${err.message}`);
                    res.status(500).json({ error: 'Failed to write settings to database' });
                }
            });
        });

        // /button parity: Send interactive verification button to channel
        this.app.post('/api/guilds/:id/button', requireGuildAdmin, async (req, res) => {
            const guildId = req.params.id;
            const { channelId, buttonText = "Verify", title, message, color } = req.body || {};
            if (!channelId) return res.status(400).json({ error: 'Channel ID is required' });

            database.getServerSettings(guildId, async (serverSettings) => {
                const language = serverSettings.language || 'english';
                const embedTitle = title || getLocale(language, "verifyEmbedTitle");
                const embedDesc = message || getLocale(language, "verifyEmbedInstructions");
                const footerText = getLocale(language, "verifyEmbedFooter");

                let embedColor = 0x5865F2;
                if (color) {
                    const parsed = color.replace('#', '');
                    if (/^[0-9A-Fa-f]{6}$/.test(parsed)) embedColor = parseInt(parsed, 16);
                }

                try {
                    let sentMessageId = null;
                    const localGuild = this.bot.guilds.cache.get(guildId);
                    if (localGuild) {
                        const channel = await localGuild.channels.fetch(channelId).catch(() => null);
                        if (channel) {
                            const embed = new EmbedBuilder()
                                .setTitle(embedTitle)
                                .setDescription(embedDesc)
                                .setColor(embedColor)
                                .setFooter({
                                    text: `${localGuild.name} • ${footerText}`,
                                    iconURL: localGuild.iconURL({ dynamic: true })
                                });

                            const buttons = new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId("verifyButton").setLabel(buttonText.substring(0, 80)).setEmoji("📧").setStyle(ButtonStyle.Success),
                                new ButtonBuilder().setCustomId("openCodeModal").setLabel(getLocale(language, "enterCodeButton")).setEmoji("🔑").setStyle(ButtonStyle.Secondary)
                            );

                            const msg = await channel.send({ embeds: [embed], components: [buttons] });
                            if (msg) sentMessageId = msg.id;
                        }
                    } else if (this.bot.shard && typeof this.bot.shard.count === 'number' && this.bot.shard.count > 1) {
                        const results = await this.bot.shard.broadcastEval(async (client, { gId, cId, embedData, btnData }) => {
                            const g = client.guilds.cache.get(gId);
                            if (!g) return null;
                            const channel = await g.channels.fetch(cId).catch(() => null);
                            if (!channel) return null;
                            const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
                            const embed = new EmbedBuilder().setTitle(embedData.title).setDescription(embedData.desc).setColor(embedData.color).setFooter({ text: `${g.name} • ${embedData.footer}`, iconURL: g.iconURL({ dynamic: true }) });
                            const buttons = new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId("verifyButton").setLabel(btnData.label).setEmoji("📧").setStyle(ButtonStyle.Success),
                                new ButtonBuilder().setCustomId("openCodeModal").setLabel(btnData.codeLabel).setEmoji("🔑").setStyle(ButtonStyle.Secondary)
                            );
                            const msg = await channel.send({ embeds: [embed], components: [buttons] }).catch(() => null);
                            return msg ? msg.id : null;
                        }, { context: { gId: guildId, cId: channelId, embedData: { title: embedTitle, desc: embedDesc, color: embedColor, footer: footerText }, btnData: { label: buttonText.substring(0, 80), codeLabel: getLocale(language, "enterCodeButton") } } });
                        for (const r of results) { if (r) sentMessageId = r; }
                    }

                    if (!sentMessageId) return res.status(404).json({ error: 'Could not post embed to channel. Check bot channel permissions.' });

                    serverSettings.channelID = channelId;
                    serverSettings.messageID = sentMessageId;
                    database.updateServerSettings(guildId, serverSettings);

                    res.json({ success: true, messageId: sentMessageId, channelId });
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            });
        });

        // /manualverify parity: Bypass email check & verify user manually
        this.app.post('/api/guilds/:id/manualverify', requireGuildAdmin, async (req, res) => {
            const guildId = req.params.id;
            const { userId, email } = req.body || {};
            if (!userId || !email) return res.status(400).json({ error: 'User ID and Email are required' });

            database.getServerSettings(guildId, async (serverSettings) => {
                if (!serverSettings.verifiedRoleName) {
                    return res.status(400).json({ error: 'No verified role (`verifiedRoleName`) configured for this server.' });
                }

                const cleanUserId = userId.trim();
                const cleanEmail = email.trim().toLowerCase();
                const emailHash = md5hash(cleanEmail);

                database.updateEmailUser(new EmailUser(emailHash, cleanUserId, guildId, serverSettings.verifiedRoleName, 0));

                try {
                    const localGuild = this.bot.guilds.cache.get(guildId);
                    if (localGuild) {
                        const member = await localGuild.members.fetch(cleanUserId).catch(() => null);
                        if (member) {
                            const roleVerified = localGuild.roles.cache.get(serverSettings.verifiedRoleName);
                            if (roleVerified) await member.roles.add(roleVerified).catch(() => {});
                            if (serverSettings.unverifiedRoleName) {
                                const roleUnverified = localGuild.roles.cache.get(serverSettings.unverifiedRoleName);
                                if (roleUnverified) await member.roles.remove(roleUnverified).catch(() => {});
                            }
                            if (Array.isArray(serverSettings.defaultRoles)) {
                                for (const rId of serverSettings.defaultRoles) {
                                    const r = localGuild.roles.cache.get(rId);
                                    if (r) await member.roles.add(r).catch(() => {});
                                }
                            }
                        }
                    }
                    res.json({ success: true, message: `Successfully verified user ${cleanUserId} with email ${cleanEmail}` });
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            });
        });

        // /data parity: Lookup user verification status
        this.app.get('/api/guilds/:id/users/:userId', requireGuildAdmin, (req, res) => {
            const guildId = req.params.id;
            const userId = req.params.userId.trim();
            database.getUserByDiscordId(userId, guildId, (userEmail) => {
                if (!userEmail) return res.status(404).json({ error: 'User is not verified on this server' });
                res.json(userEmail);
            });
        });

        // /data parity: Delete user verification data
        this.app.delete('/api/guilds/:id/users/:userId', requireGuildAdmin, async (req, res) => {
            const guildId = req.params.id;
            const userId = req.params.userId.trim();
            database.deleteUserData(userId);
            try {
                database.getServerSettings(guildId, async (serverSettings) => {
                    const localGuild = this.bot.guilds.cache.get(guildId);
                    if (localGuild) {
                        const member = await localGuild.members.fetch(userId).catch(() => null);
                        if (member) {
                            if (serverSettings.verifiedRoleName) {
                                const r = localGuild.roles.cache.get(serverSettings.verifiedRoleName);
                                if (r) await member.roles.remove(r).catch(() => {});
                            }
                            if (serverSettings.unverifiedRoleName) {
                                const ur = localGuild.roles.cache.get(serverSettings.unverifiedRoleName);
                                if (ur) await member.roles.add(ur).catch(() => {});
                            }
                        }
                    }
                });
            } catch {}
            res.json({ success: true, message: `Deleted verification data for user ${userId}` });
        });

        // Export verified members as CSV download
        this.app.get('/api/guilds/:id/export', requireGuildAdmin, (req, res) => {
            const guildId = req.params.id;
            database.db.all(
                'SELECT userID, email, groupID, isPublic FROM userEmails WHERE guildID = ?',
                [guildId],
                (err, rows) => {
                    if (err) return res.status(500).json({ error: 'Database error during export' });
                    const lines = [
                        'discordUserId,emailHash,groupID,isPublic',
                        ...(rows || []).map(r =>
                            `${r.userID},${r.email},${r.groupID || ''},${r.isPublic || 0}`
                        )
                    ];
                    res.setHeader('Content-Type', 'text/csv');
                    res.setHeader('Content-Disposition', `attachment; filename="verified-members-${guildId}.csv"`);
                    res.send(lines.join('\n'));
                }
            );
        });

        // /tgblacklist parity: Get Telegram keyword blacklist
        this.app.get('/api/telegram/blacklist', requireAuth, async (req, res) => {
            try {
                const list = await getKeywordBlacklist();
                res.json({ success: true, blacklist: list });
            } catch (err) {
                res.status(500).json({ error: 'Failed to retrieve telegram blacklist' });
            }
        });

        // /tgblacklist parity: Add keyword to Telegram blacklist
        this.app.post('/api/telegram/blacklist', requireAuth, async (req, res) => {
            const { keyword } = req.body || {};
            if (!keyword || !keyword.trim()) return res.status(400).json({ error: 'Keyword is required' });
            try {
                await addKeywordToBlacklist(keyword.trim());
                const list = await getKeywordBlacklist();
                res.json({ success: true, blacklist: list });
            } catch (err) {
                res.status(500).json({ error: 'Failed to add keyword' });
            }
        });

        // /tgblacklist parity: Remove keyword from Telegram blacklist
        this.app.delete('/api/telegram/blacklist', requireAuth, async (req, res) => {
            const { keyword } = req.body || {};
            if (!keyword || !keyword.trim()) return res.status(400).json({ error: 'Keyword is required' });
            try {
                await removeKeywordFromBlacklist(keyword.trim());
                const list = await getKeywordBlacklist();
                res.json({ success: true, blacklist: list });
            } catch (err) {
                res.status(500).json({ error: 'Failed to remove keyword' });
            }
        });

        // /scrape parity: Trigger manual Telegram scrape
        this.app.post('/api/telegram/scrape', requireAuth, async (req, res) => {
            try {
                if (this.bot) {
                    runScrape(this.bot, null, false);
                    res.json({ success: true, message: 'Telegram event scrape triggered asynchronously in the background.' });
                } else {
                    res.status(503).json({ error: 'Bot instance not ready for scraping' });
                }
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // /status & /globalstats parity: Get bot runtime and verification stats
        this.app.get('/api/bot/status', requireAuth, async (req, res) => {
            try {
                const uptimeMs = this.bot ? this.bot.uptime : process.uptime() * 1000;
                const memoryMB = Math.round(process.memoryUsage().rss / 1024 / 1024);
                const shards = (this.bot && this.bot.shard && typeof this.bot.shard.count === 'number') ? this.bot.shard.count : 1;
                const guildsCount = (this.bot && this.bot.guilds) ? this.bot.guilds.cache.size : 0;
                res.json({
                    success: true,
                    status: {
                        uptimeMs,
                        memoryMB,
                        shards,
                        guildsCount,
                        cronActive: state.isCronActive ? true : false
                    }
                });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }

    start(bot) {
        if (this.started) return;
        this.bot = bot;
        this.started = true;
        this.registerRoutes();

        const bindIp = process.env.ALWAYSDATA_HTTPD_IP;
        const listenArgs = bindIp ? [this.port, bindIp] : [this.port];
        this.app.listen(...listenArgs, () => {
            logInfo(`[DashboardServer] Octavia Web Dashboard listening on ${bindIp || 'all interfaces (:: / 0.0.0.0)'}:${this.port}!`);
        });
    }
}

module.exports = new DashboardServer();
