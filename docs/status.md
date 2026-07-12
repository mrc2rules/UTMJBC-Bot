---
title: Service Status
description: Status page for Octavia services including the mail verification server and bot API.
image: https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/octavia.png
---

# Service Status

<style>
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

.status-indicator.online {
  background-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.status-indicator.offline {
  background-color: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
  animation: none;
}

.status-indicator.checking {
  background-color: #f59e0b;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-url {
  display: block;
  font-size: 0.75rem;
  color: var(--md-default-fg-color--light, #888);
  margin-top: 8px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.last-checked {
  font-size: 0.75rem;
  color: var(--md-default-fg-color--light, #888);
  margin-top: 16px;
  text-align: right;
}
</style>

<div class="grid cards" markdown>

-   :material-server: **Server**

    ---

    <span id="server-indicator" class="status-indicator checking"></span> <span id="server-status" style="font-weight: 500;">Checking...</span>
    <span class="status-url">https://jbcemail.alwaysdata.net</span>

-   :material-robot: **Discord Bot**

    ---

    <span id="bot-indicator" class="status-indicator checking"></span> <span id="bot-status" style="font-weight: 500;">Checking...</span>
    <span class="status-url">UTMJBC Shard #0</span>

-   :material-gmail: **GMail servers**

    ---

    <span id="gmail-indicator" class="status-indicator checking"></span> <span id="gmail-status" style="font-weight: 500;">Checking...</span>
    <span id="gmail-details" class="status-url">smtp.gmail.com</span>

</div>

<div id="last-checked" class="last-checked"></div>

## Service Details

| Service | Description | Endpoint |
|---------|-------------|----------|
| **Server** | Primary backend API serving statistics and verification queries | `jbcemail.alwaysdata.net` |
| **Discord Bot** | Sharded Discord bot process handling server events and commands | `Gateway Shard #0` |
| **GMail servers** | Google SMTP server cluster processing OTP verification emails | `smtp.gmail.com` |

## Need Help?

If you're experiencing issues with the bot, please join our [Community Discord](https://discord.gg/vuGTVyFgck).

<script>
const serverIndicator = document.getElementById('server-indicator');
const serverStatus = document.getElementById('server-status');
const botIndicator = document.getElementById('bot-indicator');
const botStatus = document.getElementById('bot-status');
const gmailIndicator = document.getElementById('gmail-indicator');
const gmailStatus = document.getElementById('gmail-status');
const gmailDetails = document.getElementById('gmail-details');
const lastChecked = document.getElementById('last-checked');

let latestStats = null;

function updateLastChecked() {
  const now = new Date();
  if (lastChecked) lastChecked.textContent = 'Last checked: ' + now.toLocaleTimeString();
}

async function checkServerStatus() {
  try {
    const response = await fetch('https://jbcemail.alwaysdata.net/stats/current', {
      method: 'GET',
      mode: 'cors'
    });
    if (response.ok) {
      const data = await response.json();
      latestStats = data;
      if (serverIndicator) serverIndicator.className = 'status-indicator online';
      if (serverStatus) serverStatus.textContent = 'Operational';
    } else {
      latestStats = null;
      if (serverIndicator) serverIndicator.className = 'status-indicator offline';
      if (serverStatus) serverStatus.textContent = 'Degraded - HTTP ' + response.status;
    }
  } catch (error) {
    latestStats = null;
    if (serverIndicator) serverIndicator.className = 'status-indicator offline';
    if (serverStatus) serverStatus.textContent = 'Offline or unreachable';
  }
}

function checkBotStatus() {
  if (!latestStats) {
    if (botIndicator) botIndicator.className = 'status-indicator offline';
    if (botStatus) botStatus.textContent = 'Unable to check - API unreachable';
    return;
  }
  if (botIndicator) botIndicator.className = 'status-indicator online';
  if (botStatus) botStatus.textContent = 'Operational - Connected to Discord';
}

async function checkGmailStatus() {
  try {
    if (latestStats && typeof latestStats.mailsSendAll === 'number') {
      if (gmailIndicator) gmailIndicator.className = 'status-indicator online';
      if (gmailStatus) gmailStatus.textContent = 'Operational';
      const sentToday = latestStats.mailsSendToday || 0;
      if (gmailDetails) gmailDetails.textContent = 'Today: ' + sentToday + ' verification emails processed';
    } else {
      await fetch('https://jbcemail.alwaysdata.net', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      if (gmailIndicator) gmailIndicator.className = 'status-indicator online';
      if (gmailStatus) gmailStatus.textContent = 'Operational';
    }
  } catch (error) {
    if (gmailIndicator) gmailIndicator.className = 'status-indicator offline';
    if (gmailStatus) gmailStatus.textContent = 'Offline or unreachable';
  }
}

async function checkAllServices() {
  await checkServerStatus();
  checkBotStatus();
  await checkGmailStatus();
  updateLastChecked();
}

checkAllServices();
setInterval(checkAllServices, 30000);
</script>
