---
title: Telegram Pipeline API
description: API reference for TelegramListener, Scraper, DiscordPublisher, MessageChecker, ChannelManager, and KeywordBlacklistManager.
---

# Telegram Event Pipeline

Subsystems handling Telegram scraping, message validation, fingerprint deduplication, and Discord forum publishing.

---

## `src/telegram/TelegramListener.js`

### `start(discordClient)`

Connects to the Telegram MTProto API. Prompts for a login code on first run if `telegramSession` is empty. Stores the authenticated client in `state.telegramClient`. Schedules the nightly auto-close cron. Returns `Promise<void>`.

### `startScrapeCron(discordClient)`

Starts the periodic scrape cron at the configured interval. Returns `boolean` (`false` if the cron is already running).

### `stopScrapeCron()`

Stops the periodic cron. Returns `boolean` (`false` if no cron is active).

### `isScrapeCronActive()`

Returns `boolean` (`true` if the periodic cron is currently scheduled).

---

## `src/telegram/Scraper.js`

### `runScrape(discordClient, options?)`

Runs a full scrape cycle across all (or a specific) tracked Telegram channel(s).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `discordClient` | `Discord.Client` | — | The connected Discord.js client. |
| `options.force` | `boolean` | `false` | Skip dedup checks — re-processes all messages. Useful for debugging. |
| `options.targetChannelId` | `string` | `undefined` | Restrict the cycle to a single channel. |

**Returns:** `Promise<object>` — `{ channelsScraped, totalEvents, totalGemini }` or `{ skipped: true }` if a scrape is already in progress.

```js title="Scrape Invocation Example"
const { runScrape } = require('./Scraper');
const result = await runScrape(discordClient, { force: true, targetChannelId: '-100123456789' });
// → { channelsScraped: 1, totalEvents: 3, totalGemini: 7 }
```

### `autoClosePastEvents(discordClient)`

Locks and archives Discord forum threads for events whose `event_end_date` has passed. Also prunes `seen_messages` rows older than 30 days.

**Returns:** `Promise<number>` — Count of threads closed.

---

## `src/telegram/DiscordPublisher.js`

### `postToDiscord(discordChannel, eventData, channelUsername, originalText, titleHash)`

Builds a Discord embed from Gemini event data and creates a forum thread. Persists the thread to the `telegram_events` table. Returns `Promise<void>`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `discordChannel` | `Discord.ForumChannel` | Target Discord forum channel. |
| `eventData` | `object` | Structured output from `analyseWithGemini()`. |
| `channelUsername` | `string` | Human-readable Telegram source channel name. |
| `originalText` | `string` | Raw message text (used as fallback if `exactText` is empty). |
| `titleHash` | `string` | Normalised title hash for cross-channel dedup storage. |

!!! tip "Automated Discord Formatting"
    When publishing to forum threads, `postToDiscord` automatically:
    - Picks a vibrant accent colour from a curated palette.
    - Applies Discord forum tags based on `topic`, `merit`, `cost`, and event type.
    - Generates a Google Calendar deep-link button if the event has a valid start date.
    - Adds an interactive "Register Now" button if `registrationUrl` is present.
    - Attaches an interactive "🚨 Report as Spam" button that triggers community moderation alerts via `SpamHandler`.
    - Truncates descriptions gracefully when exceeding Discord's 4,096-character embed limit.

---

## `src/telegram/SpamHandler.js`

Handles interactive community spam reporting and moderator review workflows for published Discord forum threads.

### `handleSpamButton(interaction)`

Triggered when a community member clicks `🚨 Report as Spam` on a published event embed.
1. Checks if a spam report has already been posted for this thread or if it was previously dismissed by an admin.
2. If new, builds a high-visibility alert embed with thread details, message snippet, and quick-action buttons (`🗑️ Delete Thread` and `🔕 Dismiss Report`).
3. Posts the alert to the server's configured `reportChannelID` (set via `/config type:events`).

| Parameter | Type | Description |
|-----------|------|-------------|
| `interaction` | `Discord.ButtonInteraction` | The button interaction object containing customId `report_spam_<threadId>`. |

**Returns:** `Promise<void>`

### `handleDeleteEvent(interaction)`

Triggered when an admin clicks `🗑️ Delete Thread` on a spam alert in the moderation channel.
1. Verifies the moderator has `Manage Messages` or `Manage Channels` permission.
2. Deletes the target Discord forum thread from the server.
3. Removes the event entry from the SQLite `telegram_events` table so it is no longer tracked.
4. Updates the alert embed to show a greyed-out `🗑️ Thread Deleted` confirmation state.

| Parameter | Type | Description |
|-----------|------|-------------|
| `interaction` | `Discord.ButtonInteraction` | The button interaction object containing customId `delete_event_<threadId>`. |

**Returns:** `Promise<void>`

### `handleDismissReport(interaction)`

Triggered when an admin clicks `🔕 Dismiss Report` on a spam alert.
1. Verifies moderator permissions.
2. Updates the alert embed to show a greyed-out `🔕 Report Dismissed` state.
3. Subsequent clicks on `🚨 Report as Spam` for that thread will be silently ignored by checking the dismissed state.

| Parameter | Type | Description |
|-----------|------|-------------|
| `interaction` | `Discord.ButtonInteraction` | The button interaction object containing customId `dismiss_report_<threadId>`. |

**Returns:** `Promise<void>`

---

## `src/telegram/MessageChecker.js`

Stateless utilities for message deduplication and language detection. All database functions return Promises.

### `detectMalay(text)`

Returns `true` if `text` contains ≥ 4 unique Malay vocabulary keywords.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Raw message text. |

**Returns:** `boolean`

```js title="Language Detection Example"
const { detectMalay } = require('./MessageChecker');
detectMalay('Salam! Program ini adalah percuma untuk semua pelajar universiti kolej'); // → true
detectMalay('Join us for a hackathon!'); // → false
```

### `hashMessageText(text)`

Normalises text (lowercase, collapse whitespace, strip punctuation) and returns its MD5 hex digest.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Raw message text. |

**Returns:** `string` — 32-character hex string.

### `simHashText(text)`

Computes a 64-bit SimHash fingerprint using FNV-1a token hashing.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Raw message text. |

**Returns:** `string` — 16-character hex string (64-bit fingerprint).

### `normaliseTitleHash(title)`

Normalises a Gemini-extracted event title and returns its MD5 hex digest.

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `string` | Event title from Gemini output. |

**Returns:** `string` — 32-character hex string.

### `isEventPast(eventData)`

Returns `true` if the event's end (or start) date is strictly before today's local date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventData` | `object` | Gemini event object. Must have `eventEndDate` or `startDate` in `YYYY-MM-DD` format. |

**Returns:** `boolean`

### `isAlreadySeen(messageId, channelId)`

Checks whether this message ID (from `channelId`) is already in the `seen_messages` table. Returns `Promise<boolean>`.

### `isAlreadySeenByHash(hash)`

Checks whether a message with this content MD5 has already been processed. Returns `Promise<boolean>`.

### `isNearDuplicate(simhash, threshold?)`

Loads the last 500 SimHash fingerprints from the DB and returns `true` if any has a Hamming distance ≤ `threshold` (default: `SIMHASH_THRESHOLD = 5`). Returns `Promise<boolean>`.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `simhash` | `string` | — | 16-char hex fingerprint from `simHashText()`. |
| `threshold` | `number` | `SIMHASH_THRESHOLD` | Override the bit-distance threshold. |

### `isTitleDuplicate(titleHash)`

Returns `true` if an event with this normalised title hash was posted in the last 14 days. Returns `Promise<boolean>`.

### `markAsSeen(messageId, channelId, hash, simhash)`

Inserts a row into `seen_messages`. Uses `INSERT OR IGNORE` so duplicate calls are safe. Returns `Promise<void>`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `messageId` | `string\|number` | Telegram message ID. |
| `channelId` | `string` | Telegram channel ID. |
| `hash` | `string\|null` | Content MD5 hash (may be `null`). |
| `simhash` | `string\|null` | SimHash fingerprint (may be `null`). |

---

## `src/telegram/ChannelManager.js`

All database operations return Promises.

| Function | Signature | Description |
|----------|-----------|-------------|
| `getChannels()` | `→ Promise<string[]>` | Returns all tracked channel IDs. |
| `getChannelDetails()` | `→ Promise<object[]>` | Returns full rows (`channel_id`, `channel_name`, `added_by`, `added_at`). |
| `channelExists(channelId)` | `→ Promise<boolean>` | True if the channel is tracked. |
| `addChannel(channelId, channelName, addedBy)` | `→ Promise<boolean>` | Insert channel. Returns `false` if already exists. |
| `updateChannelName(channelId, channelName)` | `→ Promise<boolean>` | Update display name. |
| `removeChannel(channelId)` | `→ Promise<boolean>` | Delete channel. Returns `false` if not found. |
| `clearSeenMessages()` | `→ Promise<number>` | Delete all rows from `seen_messages`. Returns rows deleted. |

---

## `src/telegram/KeywordBlacklistManager.js`

All database operations return Promises.

| Function | Signature | Description |
|----------|-----------|-------------|
| `getKeywordBlacklist()` | `→ Promise<string[]>` | Returns all keywords in lowercase. |
| `addKeywordToBlacklist(keyword, addedBy)` | `→ Promise<boolean>` | Add keyword. Returns `false` if already exists. |
| `removeKeywordFromBlacklist(keyword)` | `→ Promise<boolean>` | Remove keyword. Returns `false` if not found. |
| `clearKeywordBlacklist()` | `→ Promise<number>` | Clear all keywords. Returns rows deleted. |
