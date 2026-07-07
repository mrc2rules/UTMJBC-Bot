---
title: Self Hosting Guide
description: Complete instructions for hosting, configuring, and deploying your own instance of UTMJBC Bot.
---

# Self Hosting Guide

This guide covers everything required to deploy your own instance of UTMJBC Bot, including Docker deployment, manual setup, and configuring the live analytics dashboard.

---

## :material-clipboard-check: Prerequisites

Before starting, ensure you have the following credentials and environments prepared:

-   **Node.js** v18 or higher (if running manually without Docker).
-   **Discord Application & Bot Token** from the [Discord Developer Portal](https://discord.com/developers/applications).
-   **SMTP Server Credentials** (or a Gmail App Password) for sending OTP emails.
-   *(Optional)* **Telegram Account & API Credentials** (`api_id` and `api_hash` from [my.telegram.org](https://my.telegram.org)) for the event scraper.
-   *(Optional)* **Google Gemini API Key** from Google AI Studio for AI query and event classification features.

---

## :material-cog-box: Configuration File (`config.json`)

Create a `config/config.json` file in the project root directory.

```json title="config/config.json"
{
  "token":     "<Discord bot token>",
  "clientId":  "<Discord application client ID>",

  "email":     "<sender email address>",
  "username":  "<SMTP username — usually same as email>",
  "password":  "<SMTP password or App Password>",
  "smtpHost":  "<SMTP hostname, e.g. smtp.gmail.com>",
  "smtpPort":  587,
  "isSecure":  false,
  "isGoogle":  false,

  "botDbPath": "/persistent/path/to/bot-db-dir",

  "telegramApiId":              12345678,
  "telegramApiHash":            "your_api_hash",
  "telegramPhone":              "+601xxxxxxxx",
  "telegramPassword":           "",
  "telegramSession":            "",
  "telegramScrapeIntervalHours": 6,
  "telegramSimHashThreshold":   5,
  "discordEventForumId":        "1519270170873565405",
  "discordLiveLogId":           "1519284305464004678",
  "dbPath":                     "/persistent/path/to/telegram-db-dir"
}
```

!!! tip "Gmail SMTP Setup"
    If using Gmail, enable 2-Step Verification on your Google account and generate an **[App Password](https://support.google.com/accounts/answer/185833)**. Set `"password"` to this 16-character string and set `"isGoogle": true`.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Generative AI API key. Used by `/askai` and the Telegram event classifier. | Yes (if using AI/Scraper) |
| `PORT` | HTTP port for the live statistics Express server (defaults to `8181`). | Optional |

---

## :material-rocket-launch: Deployment Options

Choose between our recommended isolated Docker container or manual Node.js installation:

=== ":material-docker: Docker Deployment (Recommended)"

    Using Docker ensures all system dependencies and SQLite persistence layers are isolated and reliable.

    ### 1. Initialize Directory & Volumes

    ```bash title="Terminal"
    mkdir utmjbc-bot && cd utmjbc-bot
    mkdir config data
    ```

    ### 2. Create `docker-compose.yml`

    ```yaml title="docker-compose.yml"
    version: '3.8'
    services:
      utmjbc-bot:
        image: ghcr.io/mrc2rules/utmjbc-bot:latest
        environment:
          - GEMINI_API_KEY=your_gemini_key_here
          - PORT=8181
        volumes:
          - ./config:/usr/app/config
          - ./data:/usr/app/data
        ports:
          - "8181:8181"
        restart: unless-stopped
    ```

    ### 3. Launch Container

    ```bash title="Terminal"
    docker compose up -d
    docker compose logs -f
    ```

    #### Bootstrapping Telegram Authentication

    When starting for the first time with an empty `"telegramSession"`, the bot will prompt for login in the container logs:

    ```text title="Docker Logs output"
    [TelegramListener] Save this session string to config.telegramSession:
    1BVtsOKABu...
    ```

    Copy the printed session string, paste it into `config/config.json` under `"telegramSession"`, and run `docker compose restart`. Future starts will skip interactive authentication.

=== ":material-console: Manual Installation"

    **Requirements:** Node.js v18+ (Linux, Windows, or macOS).

    ```bash title="Terminal"
    git clone https://github.com/mrc2rules/UTMJBC-Bot.git
    cd UTMJBC-Bot

    # Install Node dependencies (uses precompiled GLIBC sqlite3 binaries)
    npm install

    # Prepare config
    cp config/config.json.example config/config.json
    nano config/config.json

    # Export API key and run
    export GEMINI_API_KEY="your_api_key_here"
    npm start
    ```

    !!! tip "Zero-Build SQLite Persistence"
        Our `package.json` specifies `sqlite3@^5.1.7` which downloads pre-compiled native GLIBC binaries during `npm install`. You do not need `build-essential` or Python compilation build chains when deploying to standard Linux shared hosts (e.g., Alwaysdata, Ubuntu LTS, Debian).

---

## :material-chart-line: How Statistics Work & Setup

The bot tracks real-time verifications, email dispatches, and guild counts across all shards.

### Architecture

1.  **Storage:** Live metrics are persisted locally in `config/ServerStats.json` and daily historical snapshots are appended to `config/ServerStatsHistory.log`.
2.  **HTTP API:** The primary shard (`id: 0`) runs an embedded Express HTTP server listening on port `8181` (or `process.env.PORT`).
3.  **Endpoints:**
    *   `GET /stats/current` — Returns real-time JSON metrics (`serverCount`, `usersVerifiedToday`, `mailsSendToday`, etc.).
    *   `GET /stats/history?days=30` — Returns daily historical CSV entries formatted as JSON array for chart rendering.

### Enabling Live Dashboard on Self-Hosted Instances

If you host your own MkDocs documentation site and want the live graphs on `index.md` and `statistics.md` to display your self-hosted bot's statistics:

1.  **Expose Port 8181:** Ensure your hosting provider or firewall opens port `8181` to public traffic, or set up a reverse proxy (Nginx/Cloudflare) mapping an SSL domain (e.g., `https://api.yourdomain.com`) to port `8181`.
2.  **Configure CORS:** `src/api/ServerStatsAPI.js` uses `origin: "*"` by default to allow cross-origin analytics requests from any frontend documentation site.
3.  **Update Frontend Script:** In `docs/index.md` and `docs/statistics.md`, change the JavaScript fetch constant `API_BASE` (or endpoint URL) from `https://jbcemail.alwaysdata.net` to your server's API URL:
    ```js title="docs/statistics.md"
    const API_BASE = 'https://api.yourdomain.com'; // or http://localhost:8181
    ```

---

## :material-key: Required Discord Permissions

Ensure your bot OAuth2 invite link includes the following permissions:

-   :material-check: **View Channels** & **Read Message History**
-   :material-check: **Send Messages** & **Embed Links**
-   :material-check: **Manage Roles** *(Critical: Required to assign domain roles)*
-   :material-check: **Use Application Commands**

!!! warning "Outbound Network Access"
    The server hosting the bot must allow outbound TCP traffic on your SMTP port (`587` or `465`) to dispatch OTP emails.
