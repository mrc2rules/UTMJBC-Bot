---
title: Home
description: UTMJBC Bot — Email verification and AI-powered Telegram event scraper for the UTM Johor Bahru Community Discord server.
image: https://media.discordapp.net/attachments/1423008246691659898/1521352248779866193/image.png?ex=6a448531&is=6a4333b1&hm=75b044f51e709f66df528d721c97b6b507a935dec42681d7edbc42e34a96ed07&=&format=webp&quality=lossless&width=771&height=770
---

# UTMJBC Bot

**Automated identity verification and AI-powered campus event syndication for the Universiti Teknologi Malaysia (UTM) Johor Bahru Community.**

---

## Live System Overview

<div class="grid cards" markdown>

-   :material-check-decagram: **Verified Users**

    ---

    <h2 style="margin: 0; font-family: monospace;"><span id="verifiedToday">—</span> / <span id="verifiedAll">—</span></h2>
    Today / All Time

-   :material-email-fast: **Emails Processed**

    ---

    <h2 style="margin: 0; font-family: monospace;"><span id="emailsToday">—</span> / <span id="emailsAll">—</span></h2>
    Today / All Time

</div>

[Explore Detailed Analytics →](statistics.md){ .md-button .md-button--primary }
[View Commands](commands.md){ .md-button }

---

## Core Capabilities

UTMJBC Bot is a multi-purpose architecture designed specifically for university Discord communities. It combines two robust subsystems under a single sharded process:

=== ":material-email-check: Email Verification"

    Secures server access by confirming student and faculty institutional domain ownership (`@graduate.utm.my`, `@utm.my`).

    - **One-Time Password (OTP):** Generates a secure 6-digit verification code delivered via high-priority HTML email.
    - **Domain-Specific Roles:** Maps different email suffixes to distinct Discord roles (e.g., undergraduates vs. postgraduates).
    - **Zero Plaintext Storage:** Protects student privacy by storing cryptographic MD5 hashes rather than raw email addresses.
    - **Granular Security:** Features custom wildcard allowlists (`/domain add`) and instant blacklist filtering (`/blacklist add`).

=== ":material-rss: AI Event Scraper"

    Monitors public campus Telegram broadcasts and syndicates rich, structured event cards directly into Discord forum threads.

    - **Multi-Layer Deduplication:** Filters broadcast noise using a 4-tier pipeline (Message ID → MD5 Content Hash → 64-bit SimHash near-duplicate detection → Title Hash).
    - **Gemini 2.5 Flash AI:** Automatically classifies posts, extracts key metadata (date, location, cost, merit points, registration links), and translates Malay announcements into English.
    - **Automated Lifecycle:** Automatically locks and archives forum threads once event end-dates have passed.

=== ":material-robot: Grounded AI Assistant"

    Provides instant, verified answers to campus questions right inside Discord.

    - **Command:** `/askai <question>`
    - **Authoritative Grounding:** Restricts search and citations strictly to official sources (`utm.my` and `utm.gitbook.io`).
    - **Public Access:** Available to any server member without administrative privileges.

---

## Quick Navigation

| Resource | Purpose | Link |
|----------|---------|------|
| :material-github: **Source Code** | View repository, report bugs, contribute | [mrc2rules/UTMJBC-Bot](https://github.com/mrc2rules/UTMJBC-Bot) |
| :material-chat: **Discord Server** | Join the official UTM Johor Bahru Community | [discord.gg/vuGTVyFgck](https://discord.gg/vuGTVyFgck) |
| :material-book-open-page-variant: **Community Guide** | Student guides, notes, and academic references | [utm.gitbook.io](https://utm.gitbook.io/) |

---

!!! warning "Legal Disclaimer"
    **UTM Johor Bahru Community (UTMJBC)** and the **UTMJBC Bot** are independent student-led initiatives. They are **not affiliated with, sponsored by, or officially endorsed by Universiti Teknologi Malaysia (UTM)**.

<script>
const ids = ['serverCount','verifiedToday','verifiedAll','emailsToday','emailsAll'];
const keys = ['serverCount','usersVerifiedToday','usersVerifiedAll','mailsSendToday','mailsSendAll'];

function refreshData() {
  fetch('https://jbcemail.alwaysdata.net/stats/current')
    .then(r => r.json())
    .then(data => {
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.textContent = data[keys[i]] ?? '—';
      });
    })
    .catch(() => {});
}
refreshData();
setInterval(refreshData, 10000);
</script>
