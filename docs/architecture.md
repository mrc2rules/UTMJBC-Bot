---
title: System Architecture
description: Deep-dive technical architecture and subsystem workflows of Octavia.
---

# System Architecture

Octavia is designed as a modular, sharded Discord application combining an identity verification pipeline, an AI-driven event scraper, and an Express telemetry server.

---

## :material-sitemap: High-Level Process Topology

```mermaid
graph TD
    classDef mainProcess fill:#3a001c,stroke:#fff,stroke-width:2px,color:#fff;
    classDef subsystem fill:#2b2b2b,stroke:#888,stroke-width:1px,color:#eee;

    A["sharder.js (Discord ShardingManager)"]:::mainProcess -->|spawns| B["EmailBot.js (Main Discord process)"]:::mainProcess
    B --> C["Email System (MailSender)"]:::subsystem
    B --> D["Gemini Query (/askai)"]:::subsystem
    B --> E["Telegram Pipe (TelegramListener)"]:::subsystem

    subgraph Telegram Pipeline
        E --> F["Scraper"]:::subsystem
        E --> G["GeminiAnalyser"]:::subsystem
        E --> H["DiscordPublisher"]:::subsystem
    end
```

---

## :material-folder-table: Module Directory

| Module Path | Core Responsibility |
|-------------|---------------------|
| `src/sharder.js` | Process entry point. Spawns `EmailBot.js` child shards via `ShardingManager`. Runs automated Top.gg stat posting when configured. |
| `src/EmailBot.js` | Primary Discord event lifecycle manager. Registers slash commands, processes modals/buttons, and delegates subsystem calls. |
| `src/commands/` | Individual command definitions. Each file exports `{ data, execute, autocomplete? }`. |
| `src/mail/MailSender.js` | SMTP email dispatch client using `nodemailer`. Supports custom templates and OAuth2/App passwords. |
| `src/telegram/TelegramListener.js` | MTProto Telegram client using GramJS. Orchestrates background cron schedules (`startScrapeCron`). |
| `src/telegram/Scraper.js` | Core scraping engine. Iterates messages through deduplication gates, calls Gemini AI, and dispatches forum threads. |
| `src/telegram/GeminiAnalyser.js` | Event classification logic delegating to `AIGateway` for Gemini structured JSON extraction. |
| `src/telegram/DiscordPublisher.js` | Formats embeds, attaches `🚨 Report as Spam` buttons, creates forum threads, generates Google Calendar links, and tracks thread IDs. |
| `src/telegram/SpamHandler.js` | Community spam reporting and interactive admin moderation workflow. Manages deduplicated alerts and thread deletion/dismissal buttons. |
| `src/telegram/MessageChecker.js` | Cryptographic fingerprinting tools: MD5 content hashing, 64-bit SimHash near-duplicate detection, title window lookups. |
| `src/services/AIGateway.js` | Centralized AI service wrapper around Google's `@google/genai` SDK with automatic timeouts and Circuit Breaker logic. |
| `src/prompts/` | Decoupled prompt template modules (`utmAssistantPrompt.js`, `eventExtractorPrompt.js`). |
| `src/shared/logger.js` | Centralized ANSI logging service with daily file rotation, colorized terminal output, and buffered Discord log channel broadcasting. |
| `src/database/Database.js` | SQLite singleton managing `bot.db` (guild settings, email user records, verification metrics). |
| `src/shared/db.js` | SQLite singleton managing `telegram_events.db` (processed message IDs, deduplication tables). |
| `src/gemini/getGeminiResponse.js` | Grounded search handler for `/askai`, delegating to `AIGateway` with strictly scoped domain search filters. |
| `src/api/ServerStatsAPI.js` | Embedded Express HTTP server on port `8181` exposing `/stats/current` and `/stats/history` endpoints. |

---

## :material-database: Dual SQLite Database Isolation

To prevent thread contention and isolate domain responsibilities, the bot maintains two dedicated SQLite database files.

=== ":material-account-lock: Email Verification Database (`bot.db`)"

    | Table Name | Description |
    |------------|-------------|
    | `guilds` | Per-guild configuration (allowlists, blocklists, language settings, channel mappings, AI models). |
    | `userEmails` | Verified identity records storing **MD5-hashed** email addresses. |
    | `guild_stats` | Historical verification counts and mail dispatch tallies per guild. |

=== ":material-telegram: Telegram Scraper Database (`telegram_events.db`)"

    | Table Name | Description |
    |------------|-------------|
    | `seen_messages` | Deduplication fingerprints (Message ID, MD5 hash, 64-bit SimHash integer). |
    | `telegram_channels` | Tracked Telegram channels (`-100...` numeric IDs and usernames). |
    | `telegram_events` | Map of published Discord forum thread IDs for lifecycle auto-locking. |
    | `telegram_blacklist` | Keyword filter list for broadcast suppression. |

---

## :material-shield-check: Email Verification Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Bot as EmailBot.js
    participant Mail as MailSender.js
    participant DB as SQLite (bot.db)

    User->>Bot: Initiates /verify or clicks Button
    Bot->>User: Renders Email Input Modal
    User->>Bot: Submits email address
    Note over Bot: Verify guild configuration
    Note over Bot: emailIsBlacklisted() check
    Note over Bot: emailMatchesDomains() check
    Note over Bot: Enforce anti-spam timeout
    Bot->>Mail: sendEmail()
    Mail-->>User: Dispatches 6-digit OTP
    Bot->>Bot: Cache OTP & emailHash in memory
    User->>Bot: Clicks 'Enter Code' & submits OTP
    Note over Bot: Validate entered OTP code
    alt On Success
        Bot->>DB: Persist user MD5 hash
        Bot->>Bot: Resolve roles
        Bot-->>User: Assign roles via Discord API
        Bot-->>Bot: Dispatch audit log
    else On Failure
        Bot-->>User: Render error state
    end
```

---

## :material-filter: Telegram Scraper Deduplication Stack

The Telegram pipeline applies a strict 4-stage filter before invoking AI processing to conserve API tokens and prevent duplicate threads.

| Layer | Method | Window / Threshold |
|-------|--------|--------------------|
| **1. Exact Message ID** | String match on `channelId_messageId` | Per-channel lifetime |
| **2. MD5 Content Hash** | Hex digest of normalized text content | Cross-channel lifetime |
| **3. SimHash Distance** | 64-bit locality-sensitive FNV-1a fingerprint | Cross-channel (Hamming distance $\le 5$ bits) |
| **4. Title Window** | Normalized Gemini title comparison | Cross-channel within 14-day window |

---

## :material-brain: AI Gateway Subsystem & Resilience Layer

All interactions with Google's generative AI infrastructure pass through the centralized `AIGateway` adapter layer (`src/services/AIGateway.js`), utilizing the modern `@google/genai` SDK.

```mermaid
graph LR
    subgraph Feature Handlers
        A["getGeminiResponse (/askai)"]
        B["GeminiAnalyser (Scraper)"]
    end

    subgraph Gateway Adapter
        C["AIGateway.js"]
    end

    subgraph External AI
        D["Google Gemini API (configured model)"]
    end

    A -->|Calls| C
    B -->|Calls| C
    C -->|1. SDK Init| D
    C -->|2. Promise.race Timeout| D
    C -->|3. Circuit Breaker Guard| D
```

### Key Architectural Safeguards
1. **Circuit Breaker Pattern**: To protect the bot from rate-limit loops during upstream Google outages (`429 Too Many Requests` or `503 Service Unavailable`), `AIGateway` maintains an internal error tracker. If 5 consecutive requests fail, the circuit trips open for **5 minutes**, immediately rejecting outbound calls without consuming CPU cycles or flooding log files.
2. **Decoupled Prompt Management**: System instructions and multi-line few-shot extraction rules are decoupled from execution logic into dedicated template modules inside `src/prompts/` (`utmAssistantPrompt.js` and `eventExtractorPrompt.js`).
3. **Pre-Parse Code Fence Sanitization**: LLMs occasionally wrap structured JSON outputs inside markdown code blocks (e.g., ` ```json ... ``` `). The pipeline runs pre-parse regex stripping before passing payload strings to `JSON.parse()`, preventing runtime parsing crashes.
4. **Dynamic Model Routing**: Admin-configured Gemini model names (`chatbotModel` and `scraperModel` in SQLite `guilds` table) dynamically route API generation calls per server. This allows admins to upgrade or test specific models (e.g. `gemini-2.5-pro` vs `gemini-1.5-pro`) via `/config type:models` without touching code.

---

## :material-shield-alert: Interactive Spam Moderation & Audit Logging

To protect community forums from broadcast noise or misclassified events, the Telegram pipeline incorporates an interactive community moderation loop and centralized audit logging.

```mermaid
sequenceDiagram
    autonumber
    actor User as Community Member
    participant Pub as DiscordPublisher
    participant Spam as SpamHandler.js
    participant Mod as Admin Report Channel
    actor Admin as Server Moderator

    Pub->>User: Publishes Event Embed with "🚨 Report as Spam" button
    User->>Spam: Clicks "🚨 Report as Spam"
    Note over Spam: Check deduplication cache<br/>(1 alert per event thread)
    Spam->>Mod: Posts interactive Alert Embed<br/>(with Delete Thread & Dismiss buttons)
    alt Admin Clicks Delete Thread
        Admin->>Spam: Clicks "🗑️ Delete Thread"
        Spam->>Pub: Deletes Discord Forum Thread & SQLite record
        Spam-->>Mod: Updates Alert Embed: "🗑️ Thread Deleted"
    else Admin Clicks Dismiss Report
        Admin->>Spam: Clicks "🔕 Dismiss Report"
        Spam-->>Mod: Updates Alert Embed: "🔕 Report Dismissed"
        Note over Spam: Ignore future spam clicks<br/>for this thread
    end
```

### Centralized ANSI Logging System (`src/shared/logger.js`)
All subsystems route diagnostic output through a centralized logging service that replaces standard console calls:
- **Daily Log Rotation**: Writes timestamped logs to local filesystem archives (`logs/YYYY-MM-DD.log`).
- **Buffered Discord Broadcasts**: Buffers system errors and critical warnings, transmitting them in batched, syntax-highlighted ANSI code blocks (`` ```ansi ``) to configured Discord admin log channels.
