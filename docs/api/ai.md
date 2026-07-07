---
title: AI Subsystem API
description: API reference for AIGateway, getGeminiResponse, and GeminiAnalyser.
---

# AI Subsystem

All generative AI interfaces and schema definitions.

---

## `src/services/AIGateway.js`

Centralized service adapter wrapping Google's modern `@google/genai` SDK. Implements request timeouts and circuit breaking across all AI calls. Exported as a singleton instance.

### `generateContent(options)`

Invokes `ai.models.generateContent()` with built-in timeout wrapping (`Promise.race`) and Circuit Breaker monitoring. Returns a `Promise<GenerateContentResponse>`.

| Option Property | Type | Default | Description |
|-----------------|------|---------|-------------|
| `model` | `string` | `'gemini-2.5-flash'` | Target Gemini model identifier. |
| `contents` | `any` | required | Prompt payload or multi-turn conversation array. |
| `systemInstruction` | `string` | `undefined` | Decoupled system prompt string. |
| `temperature` | `number` | `0.2` | Sampling randomness (`0.1` for scraper, `0.2` for QA). |
| `maxOutputTokens` | `number` | `undefined` | Token limit ceiling. |
| `responseMimeType` | `string` | `undefined` | Set to `'application/json'` for structured extraction. |
| `responseSchema` | `object` | `undefined` | Strict JSON schema definition. |
| `tools` | `array` | `undefined` | Tool configurations (e.g., `[{ googleSearch: {} }]`). |
| `timeoutMs` | `number` | `25000` | Abort timeout duration in milliseconds. |

---

## `src/gemini/getGeminiResponse.js`

### `getGeminiResponse(prompt, modelName?)`

Calls `AIGateway.generateContent()` using the dynamically configured Gemini model (defaulting to `'gemini-2.5-flash'`, customized per-server via `/config type:models`) with Google Search grounding restricted strictly to `utm.my` and `utm.gitbook.io`. Used by the `/askai` command.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `string` | required | The user's question. |
| `modelName` | `string` | `'gemini-2.5-flash'` | Optional override for the target Gemini model name. |

**Returns:** `Promise<string>` — Markdown-formatted response string. Returns an error message string on failure (does not throw).

!!! warning "Environment Requirement"
    Requires the `GEMINI_API_KEY` environment variable to be exported prior to starting the bot process.

---

## `src/telegram/GeminiAnalyser.js`

### `analyseWithGemini(text, modelName?)`

Sends `text` to the Gemini API via AIGateway using the configured scraper model (defaulting to `'gemini-2.5-flash'`, customized per-server via `/config type:models`) and returns structured event data.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | `string` | required | Raw Telegram message text. |
| `modelName` | `string` | `'gemini-2.5-flash'` | Optional override for the target Gemini model name. |

**Returns:** `Promise<object>` — Resolving to one of:

```js title="Event Response Schemas"
// Event detected:
{
  isEvent: true,
  type: 'Talk / Seminar / Workshop',   // (1)!
  topic: 'Tech/Coding',                // (2)!
  title: 'UTM Web Dev Workshop',
  date: '28 June 2026, 9:00 AM - 1:00 PM',
  startDate: '2026-06-28',             // ISO YYYY-MM-DD
  eventEndDate: '2026-06-28',
  startTime: '09:00',                  // 24-hour HH:MM
  endTime: '13:00',
  location: 'Computer Lab N28',
  exactText: '...',                    // full text (English-translated if Malay)
  merit: true,                         // UTM merit points mentioned
  cost: 'Free',                        // 'Free' | 'Paid - RM[X]' | 'Refundable Deposit - RM[X]' | 'Not specified'
  registrationUrl: 'bit.ly/example',
  sourceLanguage: 'English',
  _isMalay: false
}

// Not an event:
{ isEvent: false }

// API failure:
{ isEvent: false, _error: true }
```

1. **Event type values:** `'Club Activity'`, `'Club Recruitment'`, `'Club Announcement'`, `'Competition / Hackathon'`, `'Talk / Seminar / Workshop'`, `'Faculty / Department Event'`, `'University-wide Event'`, `'External / Collaboration Event'`
2. **Topic values:** `'Tech/Coding'`, `'Sports'`, `'Arts/Culture'`, `'Business/Career'`, `'Self-Dev'`, `'Community/Volunteer'`, `'Academic/Science'`, `'Other'`

!!! warning "Environment Requirement"
    Requires the `GEMINI_API_KEY` environment variable to be exported prior to starting the bot process.
