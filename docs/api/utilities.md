---
title: Utilities & Localization API
description: API reference for Language, wildcardMatch, embeds, and ErrorNotifier.
---

# Utilities & Localization

Shared core utility scripts, localization managers, wildcard match validators, and visual embed builders.

---

## `src/Language.js`

### `getLocale(language, key, ...vars)`

Retrieves a localised string, substituting each `%VAR%` placeholder with the corresponding argument in `vars`. Falls back to `'english'` if the key is missing in the requested language. Returns `string`.

```js title="Localization Usage Example"
const { getLocale } = require('./Language');
getLocale('english', 'mailTimeoutDescription', '30');
// → "You're sending emails too quickly.\n\nPlease wait **30 seconds** before..."
```

---

## `src/utils/wildcardMatch.js`

### `emailMatchesDomains(email, domainPatterns)`

Returns `true` if `email` matches **any** pattern in `domainPatterns`. Matching is anchored to the end of the address (domain part). Returns `boolean`.

```js title="Domain Pattern Matching Example"
emailMatchesDomains('user@graduate.utm.my', ['@*.utm.my']); // → true
emailMatchesDomains('user@gmail.com',        ['@*.utm.my']); // → false
```

### `emailIsBlacklisted(email, blacklistPatterns)`

Returns `true` if `email` matches any blacklist pattern. Patterns match anywhere in the address. Returns `boolean`.

### `getMatchingDomainPatterns(email, domainPatterns)`

Returns **all** patterns from `domainPatterns` that match `email`. Returns `string[]`.

### `wildcardToRegex(pattern, options?)`

Converts a wildcard string (using `*`) to a compiled `RegExp`. Returns `RegExp`.

---

## `src/utils/embeds.js`

Factory functions that return `Discord.EmbedBuilder` instances.

| Function | Parameters | Description |
|----------|-----------|-------------|
| `createSessionExpiredEmbed(includeEmailStep?)` | `boolean` | Shown when the user's verification session has expired. |
| `createInvalidCodeEmbed(language)` | `string` | Shown when the entered OTP is wrong. |
| `createInvalidEmailEmbed(language)` | `string` | Shown when the email format or domain is invalid. |
| `createVerificationSuccessEmbed(language, roleNames, serverName, serverIconURL)` | `string, string[], string, string` | Shown on successful verification. |
| `createCodeSentEmbed(language, email)` | `string, string` | Shown after the OTP email is sent. |
| `createVerificationLogEmbed(options)` | `{ user, email, type, admin?, role? }` | Rich log embed sent to the log channel. |
| `createVerificationFailedLogEmbed(options)` | `{ user, email, reason }` | Failure embed for the log channel. |

---

## `src/utils/ErrorNotifier.js`

### `ErrorNotifier.notify(options)`

Sends an admin error notification to the guild's configured destination. Returns `Promise<boolean>`.

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `guild` | `Discord.Guild` | ✅ | Guild where the error occurred. |
| `errorTitle` | `string` | ✅ | Short title shown in the embed. |
| `errorMessage` | `string` | ✅ | Detailed description for admins. |
| `user` | `Discord.User` | — | User who triggered the error. |
| `interaction` | `Discord.Interaction` | — | Interaction to reply to. |
| `language` | `string` | — | Locale code for embedded strings (default `'english'`). |
