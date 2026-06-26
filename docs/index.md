<meta name="description" content="UTMJBC Bot - Email verification and AI event scraper for UTM Johor Bahru Community Discord server.">
<meta name="keywords" content="UTMJBC Bot Email Verify UTM Discord Event Scraper">
<meta name="author" content="UTM JBC">

# UTMJBC Bot

## Built With

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 24px; margin: 20px 0;">
<a href="https://discord.com/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/discord.png" alt="Discord" style="height: 56px; width: auto;" title="Discord"></a>
<a href="https://nodejs.org/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/node.png" alt="Node.js" style="height: 56px; width: auto;" title="Node.js"></a>
<a href="https://www.npmjs.com/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/npm.png" alt="npm" style="height: 40px; width: auto;" title="npm"></a>
<a href="https://discord.js.org/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/djs.png" alt="Discord.js" style="height: 56px; width: auto;" title="Discord.js"></a>
<a href="https://nodemailer.com/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/nodemailer.webp" alt="Nodemailer" style="height: 48px; width: auto;" title="Nodemailer"></a>
</div>

## Statistics

Server count: <strong id="serverCount">0</strong><br>
Users verified: <strong id="verifiedToday">0</strong> today / <strong id="verifiedAll">0</strong> all time<br>
Emails sent: <strong id="emailsToday">0</strong> today / <strong id="emailsAll">0</strong> all time

[View detailed statistics →](statistics.md)

## Description

UTMJBC Bot is a multi-purpose Discord bot tailored for the Universiti Teknologi Malaysia (UTM) community. It provides:
1. **Email Verification**: Verifies student and staff domain ownership (`@graduate.utm.my`, `@utm.my`) with automatic domain-specific role assignments.
2. **AI Event Scraper**: Automatically monitors campus Telegram channels, extracts structured event details using Gemini AI, normalises titles, filters out duplicates, and publishes rich event cards directly to Discord forum threads.

## Usage

### Join Discord

[Click here](https://discord.gg/vuGTVyFgck) to join the official UTM Johor Bahru Community Discord server.

### Need Help?

For bug reports or feature requests, visit our [GitHub Repository](https://github.com/mrc2rules/UTMJBC-Bot).

<script>
const serverCount = document.getElementById("serverCount");
const verifiedToday = document.getElementById("verifiedToday");
const verifiedAll = document.getElementById("verifiedAll");
const emailsToday = document.getElementById("emailsToday");
const emailsAll = document.getElementById("emailsAll");

function refreshData(){
  fetch('https://services-jbcemail.alwaysdata.net/stats/current')
    .then(response => response.json())
    .then(data => {
      serverCount.textContent = data.serverCount;
      verifiedToday.textContent = data.usersVerifiedToday;
      verifiedAll.textContent = data.usersVerifiedAll;
      emailsToday.textContent = data.mailsSendToday;
      emailsAll.textContent = data.mailsSendAll;
    })
    .catch(() => {});
}
refreshData();
setInterval(refreshData, 10000);
</script>
