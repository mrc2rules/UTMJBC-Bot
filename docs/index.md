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

UTMJBC Bot is a resilient architecture designed specifically for university Discord communities. It combines three robust subsystems under a single sharded process protected by a centralized **AIGateway Circuit Breaker**:

=== ":material-email-check: Email Verification"

    Secures server access by confirming student and faculty institutional domain ownership (`@graduate.utm.my`, `@utm.my`).

    - **One-Time Password (OTP):** Generates a secure 6-digit verification code delivered via high-priority HTML email.
    - **Domain-Specific Roles:** Maps different email suffixes to distinct Discord roles (e.g., undergraduates vs. postgraduates).
    - **Zero Plaintext Storage:** Protects student privacy by storing cryptographic MD5 hashes rather than raw email addresses.
    - **Granular Security:** Features custom wildcard allowlists (`/domain add`) and instant blacklist filtering (`/blacklist add`).

=== ":material-rss: AI Event Scraper"

    Monitors public campus Telegram broadcasts and syndicates rich, structured event cards directly into Discord forum threads.

    - **Multi-Layer Deduplication:** Filters broadcast noise using a 4-tier pipeline (Message ID → MD5 Content Hash → 64-bit SimHash near-duplicate detection → Title Hash).
    - **Gemini AI via `@google/genai`:** Automatically classifies posts, extracts key metadata (date, location, cost, merit points, registration links), and translates Malay announcements into English.
    - **Interactive Spam Moderation:** Community members can click "🚨 Report as Spam" on event cards to send interactive moderation alerts (with thread deletion and dismissal buttons) directly to admin report channels.
    - **Dynamic Model Routing:** Admins can customize the underlying Gemini AI model per-server (e.g., switching between Flash and Pro tiers) using the `/config type:models` command.
    - **Circuit Breaker Resilience:** Automated timeout recovery and rate-limit circuit breaking via `AIGateway`.
    - **Automated Lifecycle:** Automatically locks and archives forum threads once event end-dates have passed.

=== ":material-robot: Grounded AI Assistant"

    Provides instant, verified answers to campus questions right inside Discord.

    - **Command:** `/askai <question>`
    - **Authoritative Grounding:** Restricts search strictly to official sources (`utm.my` and `utm.gitbook.io`).
    - **Dynamic Model Configuration:** Admins can tailor the AI chatbot's model per-server via `/config type:models`.
    - **Public Access:** Available to any server member without administrative privileges.

---

## Quick Navigation

<div class="grid cards" markdown>

-   :material-github:{ .lg .middle } **Source Repository**

    ---

    Explore the open-source codebase, report issues, or contribute new features to the bot.

    [:octicons-arrow-right-24: View GitHub Repository](https://github.com/mrc2rules/UTMJBC-Bot)

-   :material-chat:{ .lg .middle } **Community Discord**

    ---

    Join the Universiti Teknologi Malaysia (UTM) Johor Bahru Community Discord server.

    [:octicons-arrow-right-24: Join Discord Server](https://discord.gg/vuGTVyFgck)

-   :material-book-open-page-variant:{ .lg .middle } **Student Guidebook**

    ---

    Access comprehensive student guides, academic notes, and campus resources.

    [:octicons-arrow-right-24: Read utm.gitbook.io](https://utm.gitbook.io/)

</div>

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
