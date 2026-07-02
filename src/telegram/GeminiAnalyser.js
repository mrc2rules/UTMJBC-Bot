const { detectMalay } = require('./MessageChecker');
const { logError }    = require('./logger');
const aiGateway       = require('../services/AIGateway');
const eventExtractorPrompt = require('../prompts/eventExtractorPrompt');

// ─── Gemini Event Analyser ────────────────────────────────────────────────────
//
// Sends a Telegram message to Gemini 2.5 Flash via AIGateway and extracts structured event
// data from it. Returns { isEvent: false } for non-events and { _error: true }
// on API failure.

async function analyseWithGemini(text) {
    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year:    'numeric',
        month:   'long',
        day:     'numeric'
    });

    const isMalay = detectMalay(text);
    const systemInstruction = eventExtractorPrompt(today);

    let promptText = text;
    if (isMalay) {
        promptText =
            `[LANGUAGE HINT: This message is in Malay. You MUST:\n` +
            `1. Translate the ENTIRE message content into English.\n` +
            `2. Preserve every paragraph break and line break from the original. Each paragraph must be separated by a blank line in the translation.\n` +
            `3. The 'title' and 'exactText' MUST be in English.]\n\n` +
            `MESSAGE:\n"""\n` +
            text +
            `\n"""`;
    }

    const schema = {
        type: 'object',
        properties: {
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
        required: ['isEvent', 'title', 'exactText', 'type', 'topic', 'merit', 'cost', 'sourceLanguage']
    };

    try {
        const response = await aiGateway.generateContent({
            model: 'gemini-2.5-flash',
            systemInstruction,
            temperature: 0.1,
            maxOutputTokens: 1024,
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
                        isEvent:         true,
                        type:            'Talk / Seminar / Workshop',
                        topic:           'Tech/Coding',
                        title:           'UTM Web Dev Workshop',
                        date:            'Tomorrow, 2:30 PM - 5:00 PM',
                        startDate:       '2026-06-25',
                        eventEndDate:    '2026-06-25',
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
                    parts: [{ text: '[LANGUAGE HINT: This message is in Malay. You MUST:\n1. Translate the ENTIRE message content into English.\n2. Preserve every paragraph break and line break from the original. Each paragraph must be separated by a blank line in the translation.\n3. The \'title\' and \'exactText\' MUST be in English.]\n\nMESSAGE:\n"""\n🎓 BENGKEL PEMBANGUNAN WEB UTM 2026\n\nTarikh: 28 Jun 2026 (Sabtu)\nMasa: 9:00 pagi - 1:00 tengahari\nLokasi: Makmal Komputer N28\n\nPercuma untuk semua pelajar UTM!\nMerit diberikan kepada semua peserta.\n\nDaftar sekarang: bit.ly/webdev2026\n"""' }]
                },
                {
                    role: 'model',
                    parts: [{ text: JSON.stringify({
                        isEvent:         true,
                        type:            'Talk / Seminar / Workshop',
                        topic:           'Tech/Coding',
                        title:           'UTM Web Development Workshop 2026',
                        date:            '28 June 2026, 9:00 AM - 1:00 PM',
                        startDate:       '2026-06-28',
                        eventEndDate:    '2026-06-28',
                        startTime:       '09:00',
                        endTime:         '13:00',
                        location:        'Computer Lab N28',
                        exactText:       '🎓 UTM WEB DEVELOPMENT WORKSHOP 2026\n\nDate: 28 June 2026 (Saturday)\nTime: 9:00 AM - 1:00 PM\nLocation: Computer Lab N28\n\nFree for all UTM students!\nMerit points awarded to all participants.\n\nRegister now: bit.ly/webdev2026',
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
        const cleanRaw = raw.replace(/```(?:json)?|```/g, '').trim();

        const parsed    = JSON.parse(cleanRaw);
        parsed._isMalay = isMalay;

        // Post-processing: unescape any literal \n sequences that survived JSON
        // serialisation, so Discord renders proper paragraph breaks.
        if (parsed.exactText) {
            parsed.exactText = parsed.exactText
                .replace(/\\n/g, '\n')
                .replace(/\n{3,}/g, '\n\n'); // collapse 3+ consecutive newlines to 2
        }

        return parsed;
    } catch (e) {
        logError(`[GeminiAnalyser] Gemini error: ${e.message}`);
        return { isEvent: false, _error: true };
    }
}

module.exports = { analyseWithGemini };
