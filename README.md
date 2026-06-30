<!--
  UTM Johor Bahru Community — UTMJBC Bot
-->

<br>
<p align="center">
  <a><img src="https://i.imgur.com/GmnbsON.png" alt="UTM JBC" width="300" title="UTM JBC"></a>
  <h3 align="center">UTMJBC Bot</h3>
  <p align="center">
    Email verification and AI-powered event feed for the UTM Johor Bahru Community Discord.
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/actions/workflow/status/mrc2rules/UTMJBC-Bot/ci.yml?style=for-the-badge" alt="Build Status">
    <img src="https://img.shields.io/github/license/mrc2rules/UTMJBC-Bot?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/github/forks/mrc2rules/UTMJBC-Bot?style=for-the-badge&logo=github&logoColor=white" alt="Forks">
    <img src="https://img.shields.io/github/stars/mrc2rules/UTMJBC-Bot?style=for-the-badge&logo=github&logoColor=white" alt="Stars">
  </p>

  <p align="center">
    <a href="https://discord.gg/vuGTVyFgck">
      <img src="https://img.shields.io/discord/1407328981929431071?style=for-the-badge&logo=discord&logoColor=7289da&label=Join%20Discord&color=7289da" alt="Join Discord">
    </a>
  </p>
</p>

---

## 📖 About

The official bot for the **UTMJBC** Discord server. It has two independent features:

1. **Email Verification** — students enter their institutional email, receive a 6-digit OTP, and are automatically assigned Discord roles based on their domain.
2. **Telegram Event Scraper** — monitors public UTM Telegram channels, classifies messages with Gemini AI, deduplicates them, and publishes structured event threads to a Discord forum channel.

> ⚠️ **Disclaimer:** UTMJBC is an independent student-run community and is **not affiliated with or endorsed by Universiti Teknologi Malaysia (UTM)**.

---

## 📝 Commands

### 👤 User Commands

| Command | Description |
|---------|-------------|
| `/verify` | Start the email verification process |
| `/data delete-user` | Delete your verification data and remove your verified status |
| `/askai <question>` | Ask an AI question about UTM (grounded in utm.my + utm.gitbook.io) |

### 👥 Role Configuration

| Command | Description |
|---------|-------------|
| `/role add <role>` | Add a default role given to all verified users |
| `/role remove <role>` | Remove a role from the default roles list |
| `/role list` | View all default roles |
| `/role unverified [role]` | Set or view the optional role for unverified members |

### 🎭 Domain-Specific Roles

| Command | Description |
|---------|-------------|
| `/domainrole add <domain> <role>` | Add a role for a specific email domain |
| `/domainrole remove <domain> <role>` | Remove a role from a domain |
| `/domainrole list` | View all domain-role mappings |
| `/domainrole clear <domain>` | Remove all roles for a domain |

### 📧 Domain Management

| Command | Description |
|---------|-------------|
| `/domain add <domains>` | Add allowed email domains (supports `*` wildcard) |
| `/domain remove <domains>` | Remove allowed domains |
| `/domain list` | View all allowed domains |
| `/domain clear` | Remove all allowed domains |

### 🚫 Blacklist Management

| Command | Description |
|---------|-------------|
| `/blacklist add <patterns>` | Block email patterns (supports `*` wildcard) |
| `/blacklist remove <patterns>` | Unblock patterns |
| `/blacklist list` | View all blacklisted entries |
| `/blacklist clear` | Remove all blacklist entries |

### ⚙️ Settings

| Command | Description |
|---------|-------------|
| `/settings language <lang>` | Change the bot's language |
| `/settings log-channel [channel]` | Set or disable the verification log channel |
| `/settings verify-message [message]` | Set or reset a custom message in verification emails |
| `/settings auto-verify <enable>` | Auto-prompt new members to verify on join |
| `/settings auto-unverified <enable>` | Auto-assign unverified role to new members |

### 🛡️ Moderation & Setup

| Command | Description |
|---------|-------------|
| `/button <channel> <buttontext>` | Create a verification button embed in a channel |
| `/manualverify <user> <email>` | Manually verify a user without email confirmation |
| `/set_error_notify` | Configure where error notifications are sent |

### 📡 Telegram Scraper

| Command | Description |
|---------|-------------|
| `/scrape [run/start/stop]` | Control the event scraper |
| `/addchannel <channel_id>` | Add a Telegram channel to monitor |
| `/removechannel <channel_id>` | Stop monitoring a channel |
| `/listchannels` | View all monitored channels |
| `/tgblacklist <action> [keyword]` | Manage the scraper keyword blacklist |

### 📊 Information

| Command | Description |
|---------|-------------|
| `/status` | View bot configuration, statistics, and setup issues |
| `/help` | Show setup instructions and command overview |

> ⚠️ Most commands require Administrator permissions.

**Important:** The bot role must be **higher** in the Discord role hierarchy than the verified and unverified roles, otherwise role assignment will fail.

---

## 🐳 Self Hosting

### Docker (Recommended)

```bash
mkdir utmjbc-bot && cd utmjbc-bot
mkdir config data
```

Create `config/config.json`:

```json
{
  "token":    "<Discord Bot Token>",
  "clientId": "<Discord Bot Client ID>",
  "email":    "<Sender Email Address>",
  "username": "<SMTP Username>",
  "password": "<SMTP Password or App Password>",
  "smtpHost": "<SMTP Server, e.g. smtp.gmail.com>",
  "isGoogle": false
}
```

Create `docker-compose.yml`:

```yaml
version: '3'
services:
  utmjbc-bot:
    image: ghcr.io/mrc2rules/utmjbc-bot:latest
    environment:
      - GEMINI_API_KEY=your_gemini_key
    volumes:
      - ./config:/usr/app/config
      - ./data:/usr/app/data
    ports:
      - "8181:8181"
    restart: unless-stopped
```

```bash
docker compose up -d
```

### Manual Installation

**Requirements:** Node.js v18+

```bash
git clone https://github.com/mrc2rules/UTMJBC-Bot.git
cd UTMJBC-Bot
npm install
# fill in config/config.json (see above)
export GEMINI_API_KEY=your_key_here
npm start
```

### Configuration Reference

| Field | Description |
|-------|-------------|
| `token` | Discord Bot Token from the [Developer Portal](https://discord.com/developers/applications) |
| `clientId` | Discord Bot Client ID |
| `email` | Email address that sends verification codes |
| `username` | SMTP username (usually the same as `email`) |
| `password` | SMTP password or Gmail App Password |
| `smtpHost` | SMTP server (e.g. `smtp.gmail.com`) |
| `isGoogle` | `true` if using Gmail |
| `botDbPath` | Directory for persistent `bot.db` (recommended for hosted environments) |
| `telegramApiId` | From [my.telegram.org](https://my.telegram.org) — required for the event scraper |
| `telegramApiHash` | From [my.telegram.org](https://my.telegram.org) |
| `telegramPhone` | Phone number associated with the Telegram account |
| `telegramSession` | Save the session string here after first login (printed in logs) |
| `discordEventForumId` | Discord forum channel ID where events are posted |
| `GEMINI_API_KEY` | *(env var)* Google AI API key for Gemini features |

> 💡 **Gmail:** Create an [App Password](https://support.google.com/accounts/answer/185833) and set `isGoogle: true`.

### Debugging

Type `email` in the console to toggle verbose SMTP error logging.

---

## 📚 Documentation

Full documentation is available at the project docs site:

- [Commands Reference](docs/commands.md)
- [Self Hosting Guide](docs/self-hosting.md)
- [Architecture Overview](docs/architecture.md)
- [Developer API Reference](docs/api-reference.md)

---

## 👥 Contributors

### UTMJBC Development
- **mrc2rules** — [GitHub](https://github.com/mrc2rules)

### Original Project
Based on [EmailVerify](https://github.com/lkaesberg/EmailVerify) by [Lars Kaesberg](https://github.com/lkaesberg).

---

<p align="center">
  Made with ❤️ for the UTM Johor Bahru Community<br/><br/>
  <a href="https://discord.gg/vuGTVyFgck">
    <img src="https://img.shields.io/discord/1407328981929431071?style=for-the-badge&logo=discord&logoColor=7289da&label=Join%20Discord&color=7289da" alt="Join Discord">
  </a>
  &nbsp;
  <a href="https://utm.gitbook.io/">
    <img src="https://img.shields.io/badge/Community%20Guide-5A001C?style=for-the-badge&logoColor=white" alt="Community Guide">
  </a>
  &nbsp;
  <a href="mailto:utmjbc@gmail.com">
    <img src="https://img.shields.io/badge/utmjbc@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>
