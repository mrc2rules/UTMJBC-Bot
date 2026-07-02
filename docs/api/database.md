---
title: Database & Telemetry API
description: API reference for Database and ServerStatsAPI.
---

# Database & Telemetry

User verification databases, configuration tables, and statistical Express metrics endpoints.

---

## `src/database/Database.js`

Singleton exported as `module.exports`. All callback-based methods pass the result as the sole argument.

| Method | Signature | Description |
|--------|-----------|-------------|
| `getServerSettings(guildId, callback)` | `(string, fn(ServerSettings))` | Load guild config. Returns default `ServerSettings` if no row exists. |
| `updateServerSettings(guildId, serverSettings)` | `(string, ServerSettings)` | Upsert guild config. |
| `getEmailUser(email, guildId, callback)` | `(string, string, fn(EmailUser))` | Look up a verified email (MD5 hash). |
| `updateEmailUser(emailUser)` | `(EmailUser)` | Upsert a verification record. |
| `deleteUserData(userId)` | `(string)` | Remove a user's verification records across all guilds. |
| `deleteServerData(guildId)` | `(string)` | Delete all guild settings and user records for a guild. |
| `getGuildStats(guildId, callback)` | `(string, fn(stats))` | Get email/verification counts. Resets monthly counters if the month has changed. |
| `incrementMailsSent(guildId)` | `(string)` | Increment the total and monthly mail-sent counters. |
| `incrementVerifications(guildId)` | `(string)` | Increment the total and monthly verification counters. |
| `getAllGuildStats()` | `→ Promise<object[]>` | Return all rows from `guild_stats`. |

### `ServerSettings` properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `domains` | `string[]` | `[]` | Allowed email domain patterns. |
| `blacklist` | `string[]` | `[]` | Blacklisted email patterns. |
| `defaultRoles` | `string[]` | `[]` | Role IDs always assigned on verify. |
| `domainRoles` | `object` | `{}` | Map of domain pattern → `string[]` of role IDs. |
| `verifiedRoleName` | `string` | `''` | Legacy single verified role ID. |
| `unverifiedRoleName` | `string` | `''` | Unverified role ID. |
| `language` | `string` | `'english'` | Bot locale. |
| `logChannel` | `string` | `''` | Channel ID for verification logs. |
| `autoVerify` | `boolean` | `false` | Auto-DM new members. |
| `autoAddUnverified` | `boolean` | `false` | Auto-assign unverified role on join. |
| `verifyMessage` | `string` | `''` | Custom text prepended to emails. |
| `errorNotifyType` | `string` | `'owner'` | `'owner'`, `'channel'`, or `'user'`. |
| `errorNotifyTarget` | `string` | `''` | Channel or user ID for error notifications. |
| `status` | `boolean` | computed | `true` if domains and defaultRoles are configured. |

---

## `src/api/ServerStatsAPI.js`

Embedded Express server binding to port `8181`. Exposes internal system and verification metrics for monitoring dashboards.

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------|
| `GET` | `/stats/current` | Returns real-time bot statistics (guild count, active verification sessions, uptime, memory usage). |
| `GET` | `/stats/history` | Returns historical daily/monthly verification and email dispatch metrics across all guilds. |
