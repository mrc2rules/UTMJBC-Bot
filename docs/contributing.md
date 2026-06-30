---
title: Contributing Guide
description: Guidelines and instructions for contributing code, bug reports, and documentation to UTMJBC Bot.
---

# Contributing Guide

## :material-rocket-launch: Getting Started

1. **Fork** the repository on GitHub.
2. Clone your fork and install dependencies:

   ```bash
   git clone https://github.com/<your-username>/UTMJBC-Bot.git
   cd UTMJBC-Bot
   npm install
   ```

3. Copy `config/config.json.example` (if available) or create `config/config.json` manually — see the [Self Hosting guide](https://github.com/mrc2rules/UTMJBC-Bot#-self-hosting) in the README for all required fields.

4. Open a branch for your change:

   ```bash
   git checkout -b feature/my-change
   ```

5. Make your changes, test locally with `npm start`, then open a pull request against `main`.

---

## Adding a language

The bot ships with localised strings for every user-facing message.  
All locale files live in `language/`. Each file is a JSON object with string keys and translatable string values.

To add a new language:

1. Copy `language/english.json` to `language/<langname>.json`.
2. Translate every **value** (not the keys).
3. Keep `%VAR%` placeholders exactly as-is — they are replaced at runtime with dynamic values.
4. Open a GitHub issue or pull request with the `[LANGUAGE]` title format, or use the [New Language Template](https://github.com/mrc2rules/UTMJBC-Bot/blob/main/.github/ISSUE_TEMPLATE/new-language-template.md).

---

## Contributors

### UTMJBC Development

- **mrc2rules** — [GitHub](https://github.com/mrc2rules)

### Original upstream project

This bot is a fork of [EmailVerify](https://github.com/lkaesberg/EmailVerify) by [Lars Kaesberg](https://github.com/lkaesberg).

### Translations

| Contributor | Languages |
|-------------|-----------|
| Lars Kaesberg | English, German |
| gus2131 | Spanish |
| kploskonka | Polish |
| Norma1Name | Hebrew |
| iplayagain | Korean |
