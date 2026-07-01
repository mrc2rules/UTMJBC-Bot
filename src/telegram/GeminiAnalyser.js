const { detectMalay } = require('./MessageChecker');
const { logError }    = require('./logger');

// ─── Gemini Event Analyser ────────────────────────────────────────────────────
//
// Sends a Telegram message to Gemini 2.5 Flash and extracts structured event
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

    const systemInstruction = `You are an expert Event Data Extractor for Universiti Teknologi Malaysia (UTM).
Today's Date: ${today}.

<rules>
RULE 1: A message IS an event if a student can Attend, Register, Apply, or Compete as a direct result of it.
Classify it as a Club Announcement if it is an internal update or reminder for existing members.
These are NOT events and must return { "isEvent": false }:
- Admin-only or EXCO-only internal meetings with no open participation
- General university news, academic policy notices, or timetable updates
- Job postings, scholarship listings, or external advertisements
- Awareness posts, tips, guides, or support service announcements
- Announcements, reminders, and notices

RULE 2: Extract the event end date as "eventEndDate" in ISO format (YYYY-MM-DD). Do NOT evaluate whether the event is past — just extract the date accurately. If you can't determine the date, return null.

RULE 3: You MUST extract the exact, original message text into 'exactText'. DO NOT summarize or truncate it. If the original message is in Malay or another language, translate the ENTIRE message into English and put the full translation into 'exactText'. CRITICAL: You MUST preserve every paragraph break and line break from the original message. Each new paragraph in the original must appear as a separate paragraph (blank line between them) in your translation. Do NOT collapse the message into a single wall of text. The 'title' field must ALWAYS be in English — never leave it empty or generic.

RULE 4: Classify as exactly one of: "Club Activity", "Club Recruitment", "Club Announcement", "Competition / Hackathon", "Talk / Seminar / Workshop", "Faculty / Department Event", "University-wide Event", "External / Collaboration Event".

RULE 5: Format date: "27 March 2026, 2:30 PM - 5:00 PM" or "27 March 2026". Resolve relative dates. If no year, assume current year. If no date, return null.

RULE 6: Cost: "Free", "Refundable Deposit - RM[X]", "Paid - RM[X]", "Paid", "Not specified".

RULE 7: Return true if UTM Merit points are mentioned anywhere, false otherwise.

RULE 8: Extract registration URL if any.

RULE 9: Topic Categorization. Choose ONE primary topic from:
- Tech/Coding
- Sports
- Arts/Culture
- Business/Career
- Self-Dev
- Community/Volunteer
- Academic/Science
- Other

RULE 10: Extract the event start date as "startDate" in ISO format (YYYY-MM-DD). If you can't determine it, return null.
RULE 11: Extract the event start time as "startTime" in 24-hour format (HH:MM). If not specified, return null.
RULE 12: Extract the event end time as "endTime" in 24-hour format (HH:MM). If not specified, return null.
RULE 13: Set "sourceLanguage" to the original language of the message (e.g. "English", "Malay", "Mixed").
</rules>

<critical>
The 'title' field is MANDATORY for events. You MUST always provide a clear, descriptive English event title. NEVER return an empty title or a generic title like "Event" or "Event Announcement".
The 'exactText' field is MANDATORY for events. You MUST always populate it. NEVER collapse multi-paragraph messages into a single paragraph.
</critical>

<task>
Analyse the message and extract the required fields as per the strict JSON schema.
</task>`;

    let promptText = `MESSAGE:\n"""\n${text}\n"""`;
    if (isMalay) {
        promptText =
            `[LANGUAGE HINT: This message is in Malay. You MUST:\n` +
            `1. Translate the ENTIRE message content into English.\n` +
            `2. Preserve every paragraph break and line break from the original. ` +
            `Each paragraph must be separated by a blank line in the translation.\n` +
            `3. The 'title' and 'exactText' MUST be in English.]\n\n` +
            promptText;
    }

    const schema = {
        type: 'object',
        properties: {
            isEvent:         { type: 'boolean' },
            type:            { type: 'string' },
            topic:           { type: 'string' },
            title:           { type: 'string' },
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
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                signal:  AbortSignal.timeout(30000),
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemInstruction }] },
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
                    ],
                    generationConfig: {
                        temperature:      0.5,
                        responseMimeType: 'application/json',
                        responseSchema:   schema
                    }
                })
            }
        );

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API returned ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text || '{"isEvent":false}';

        const parsed    = JSON.parse(raw);
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
