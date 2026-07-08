const { detectMalay }       = require('./MessageChecker');
const { logError, logWarn } = require('./logger');
const aiGateway             = require('../services/AIGateway');
const eventExtractorPrompt  = require('../prompts/eventExtractorPrompt');

// ─── Gemini Event Analyser ────────────────────────────────────────────────────
//
// Sends a Telegram message to Gemini via AIGateway and extracts structured event
// data from it. Returns { isEvent: false } for non-events and { _error: true }
// on API failure.

function sanitizeJsonString(raw) {
    if (!raw) return '{"isEvent":false}';
    let str = raw.trim();
    if (str.startsWith('```')) {
        str = str.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    }
    
    let result = '';
    let inString = false;
    let escapeNext = false;

    // Use spread to iterate by Unicode code point (handles emoji/surrogate pairs correctly)
    for (const char of str) {
        if (escapeNext) {
            result += char;
            escapeNext = false;
            continue;
        }
        if (char === '\\') {
            result += char;
            escapeNext = true;
            continue;
        }
        if (char === '"') {
            inString = !inString;
            result += char;
            continue;
        }
        if (inString) {
            if (char === '\n') {
                result += '\\n';
            } else if (char === '\r') {
                // ignore carriage return inside string
            } else if (char === '\t') {
                result += '\\t';
            } else if (char.codePointAt(0) < 32) {
                // ignore other control characters
            } else {
                result += char;
            }
        } else {
            result += char;
        }
    }
    return result;
}

async function analyseWithGemini(text, modelName = 'gemini-2.5-flash') {
    const now = new Date();
    const today = now.toLocaleDateString('en-MY', {
        weekday: 'long',
        year:    'numeric',
        month:   'long',
        day:     'numeric'
    });

    // Compute dynamic future dates for few-shot examples (FLAW-4 fix)
    const exDate1 = new Date(now.getTime() + 86400000).toISOString().slice(0, 10);      // Tomorrow
    const exDate2 = new Date(now.getTime() + 7 * 86400000).toISOString().slice(0, 10);  // 7 days from now

    const isMalay = detectMalay(text);
    const systemInstruction = eventExtractorPrompt(today);

    let promptText = text;
    if (isMalay) {
        promptText =
            `[LANGUAGE HINT: This message is in Malay. You MUST:\n` +
            `1. Translate the ENTIRE message content into English.\n` +
            `2. Preserve every paragraph break from the original using escaped newlines (\\n\\n) in the JSON string. NEVER output literal unescaped line breaks inside JSON strings.\n` +
            `3. The 'title' and 'exactText' MUST be in English.]\n\n` +
            `MESSAGE:\n"""\n` +
            text +
            `\n"""`;
    }

    const schema = {
        type: 'object',
        properties: {
            reasoning:       { type: 'string',  description: 'Brief explanation of why this message is or is not an event.' },
            isEvent:         { type: 'boolean', description: 'Whether the message announces an actionable event.' },
            type:            { 
                type: 'string', 
                enum: [
                    "Club Activity", "Club Recruitment", "Club Announcement", 
                    "Competition / Hackathon", "Talk / Seminar / Workshop", 
                    "Faculty / Department Event", "University-wide Event", 
                    "External / Collaboration Event"
                ],
                description: 'The exact category of the event or announcement.'
            },
            topic:           { 
                type: 'string',
                enum: ["Tech/Coding", "Sports", "Arts/Culture", "Business/Career", "Self-Dev", "Community/Volunteer", "Academic/Science", "Other"],
                description: 'The primary topic category.'
            },
            title:           { type: 'string',  description: 'Descriptive English title of the event.' },
            date:            { type: 'string',  nullable: true },
            startDate:       { type: 'string',  nullable: true },
            eventEndDate:    { type: 'string',  nullable: true },
            startTime:       { type: 'string',  nullable: true },
            endTime:         { type: 'string',  nullable: true },
            location:        { type: 'string',  nullable: true },
            exactText:       { type: 'string' },
            merit:           { type: 'boolean' },
            cost:            { type: 'string' },
            registrationUrl: { type: 'string',  nullable: true },
            sourceLanguage:  { type: 'string' }
        },
        required: ['reasoning', 'isEvent', 'title', 'exactText', 'type', 'topic', 'merit', 'cost', 'sourceLanguage']
    };

    try {
        const response = await aiGateway.generateContent({
            model: modelName || 'gemini-2.5-flash',
            systemInstruction,
            temperature: 0.1,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
            responseSchema: schema,
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
            ],
            timeoutMs: 30000,
            contents: [
                // Few-shot example 1: English event
                {
                    role: 'user',
                    parts: [{ text: 'Join our UTM web dev workshop! Tomorrow from 2:30 PM to 5:00 PM at N24. Free entry and merit given. Register at bit.ly/webdev.' }]
                },
                {
                    role: 'model',
                    parts: [{ text: JSON.stringify({
                        reasoning:       'Announces a concrete workshop with date, time, location, and registration link.',
                        isEvent:         true,
                        type:            'Talk / Seminar / Workshop',
                        topic:           'Tech/Coding',
                        title:           'UTM Web Dev Workshop',
                        date:            'Tomorrow, 2:30 PM - 5:00 PM',
                        startDate:       exDate1,
                        eventEndDate:    exDate1,
                        startTime:       '14:30',
                        endTime:         '17:00',
                        location:        'N24',
                        exactText:       'Join our UTM web dev workshop! Tomorrow from 2:30 PM to 5:00 PM at N24. Free entry and merit given. Register at bit.ly/webdev.',
                        merit:           true,
                        cost:            'Free',
                        registrationUrl: 'bit.ly/webdev',
                        sourceLanguage:  'English'
                    }) }]
                },
                // Few-shot example 2: Non-event
                {
                    role: 'user',
                    parts: [{ text: 'Just a reminder that our weekly meeting for EXCO members is tonight at 8pm.' }]
                },
                {
                    role: 'model',
                    parts: [{ text: JSON.stringify({
                        reasoning:      'Internal reminder for club EXCO members only, not a public event or announcement for university students.',
                        isEvent:        false,
                        title:          '',
                        exactText:      '',
                        type:           'Club Announcement',
                        topic:          'Other',
                        merit:          false,
                        cost:           'Not specified',
                        sourceLanguage: 'English'
                    }) }]
                },
                // Few-shot example 3: Malay event with preserved paragraphs
                {
                    role: 'user',
                    parts: [{ text: '[LANGUAGE HINT: This message is in Malay. You MUST:\n1. Translate the ENTIRE message content into English.\n2. Preserve every paragraph break and line break from the original. Each paragraph must be separated by a blank line in the translation.\n3. The \'title\' and \'exactText\' MUST be in English.]\n\nMESSAGE:\n"""\n🎓 BENGKEL PEMBANGUNAN WEB UTM\n\nTarikh: Sabtu depan\nMasa: 9:00 pagi - 1:00 tengahari\nLokasi: Makmal Komputer N28\n\nPercuma untuk semua pelajar UTM!\nMerit diberikan kepada semua peserta.\n\nDaftar sekarang: bit.ly/webdev2026\n"""' }]
                },
                {
                    role: 'model',
                    parts: [{ text: JSON.stringify({
                        reasoning:       'Announces a web development workshop translated from Malay with clear registration details and merit.',
                        isEvent:         true,
                        type:            'Talk / Seminar / Workshop',
                        topic:           'Tech/Coding',
                        title:           'UTM Web Development Workshop',
                        date:            'Next Saturday, 9:00 AM - 1:00 PM',
                        startDate:       exDate2,
                        eventEndDate:    exDate2,
                        startTime:       '09:00',
                        endTime:         '13:00',
                        location:        'Computer Lab N28',
                        exactText:       '🎓 UTM WEB DEVELOPMENT WORKSHOP\n\nDate: Next Saturday\nTime: 9:00 AM - 1:00 PM\nLocation: Computer Lab N28\n\nFree for all UTM students!\nMerit points awarded to all participants.\n\nRegister now: bit.ly/webdev2026',
                        merit:           true,
                        cost:            'Free',
                        registrationUrl: 'bit.ly/webdev2026',
                        sourceLanguage:  'Malay'
                    }) }]
                },
                // Actual message
                { role: 'user', parts: [{ text: promptText }] }
            ]
        });

        const raw = response.text || '{"isEvent":false}';
        const finishReason = response?.candidates?.[0]?.finishReason;
        const isBlocked = finishReason && ['SAFETY', 'RECITATION', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'SPII', 'LANGUAGE'].includes(finishReason);

        if (isBlocked) {
            logWarn(`[GeminiAnalyser] Generation blocked/stopped by Gemini filter | finishReason: ${finishReason}`);
            return { isEvent: false, _blocked: true, finishReason };
        }

        let parsed;
        try {
            const cleaned = sanitizeJsonString(raw);
            parsed = JSON.parse(cleaned);
        } catch (parseErr) {
            const finishInfo = finishReason ? ` | finishReason: ${finishReason}` : '';
            logError(`[GeminiAnalyser] JSON parse error: ${parseErr.message}${finishInfo} | Raw text: ${raw}`);
            return { isEvent: false, _error: true, errorReason: `JSON parse error: ${parseErr.message}${finishInfo}` };
        }
        parsed._isMalay = isMalay;

        // Note: We only collapse 3+ consecutive newlines to 2.
        // We do NOT do replace(/\\n/g, '\n') here (BUG-2 fix), keeping single canonical unescape in DiscordPublisher.js.
        if (parsed.exactText) {
            parsed.exactText = parsed.exactText.replace(/\n{3,}/g, '\n\n');
        }

        return parsed;
    } catch (e) {
        const isCircuitOpen = e.message && e.message.includes('Circuit breaker is OPEN');
        if (!isCircuitOpen) {
            logError(`[GeminiAnalyser] Gemini API error: ${e.message}`);
        }
        return { isEvent: false, _error: true, _circuitOpen: isCircuitOpen, errorReason: e.message };
    }
}

module.exports = { analyseWithGemini };
