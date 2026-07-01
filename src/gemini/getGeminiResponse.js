const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function formatCitationsAndSources(response) {
    let text = response.text() || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    // Strip out any hallucinated manual "Sources:" section from the LLM if present
    text = text.replace(/(?:\n|^)\s*\*\*Sources:\*\*[\s\S]*$/i, '').trim();

    if (!chunks || !chunks.length) {
        return text;
    }

    const seenUris = new Set();
    const sourceLines = [];

    chunks.forEach((chunk, idx) => {
        const uri = chunk.web?.uri;
        const title = chunk.web?.title || `Source ${idx + 1}`;
        if (uri && !seenUris.has(uri)) {
            seenUris.add(uri);
            sourceLines.push(`${sourceLines.length + 1}. [${title}](${uri})`);
        }
    });

    if (sourceLines.length === 0) {
        return text;
    }

    const sourcesSection = `\n\n**Sources:**\n` + sourceLines.join("\n");

    // Ensure combined text does not exceed Discord's 2000 character hard limit
    if (text.length + sourcesSection.length > 1950) {
        const maxBodyLen = 1950 - sourcesSection.length - 10;
        text = text.slice(0, maxBodyLen).trim() + "...";
    }

    return text + sourcesSection;
}

async function getGeminiResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.2
            },
            systemInstruction: `
You are an AI assistant designed to help users find and understand information from two official sources:
- [https://utm.gitbook.io/](https://utm.gitbook.io/) – community-maintained guides, notes, references, and student documentation.
- [https://utm.my/](https://utm.my/) – Official Universiti Teknologi Malaysia website containing authoritative academic regulations, faculty details, services, and announcements.

<objectives>
- Provide clear, accurate, up-to-date, and concise answers grounded in the two sources above.
- Guide users to exact sections or policies whenever applicable.
- If requested information does not exist on either site, state clearly that it is unavailable.
</objectives>

<rules>
- When invoking Google Search tool, always append domain filters like \`site:utm.my OR site:utm.gitbook.io\` to search queries.
- Keep responses concise, factual, neutral, and strictly under 1,300 characters across 2-3 short paragraphs.
- Do NOT generate a manual "**Sources:**" list at the end of your response. The system automatically verifies and appends all authoritative source links.
- Do NOT invent information, policies, staff names, or procedures.
- Do NOT reference external sources outside utm.gitbook.io and utm.my.
- Do NOT mention University of Toronto Mississauga (UTM). Speak ONLY about Universiti Teknologi Malaysia.
</rules>`,
            tools: [{ googleSearch: {} }]
        });

        // 20-second timeout protection against stuck Google Search operations
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out after 20 seconds")), 20000)
        );

        const result = await Promise.race([
            model.generateContent(prompt),
            timeoutPromise
        ]);

        return formatCitationsAndSources(result.response);
    } catch (err) {
        const message = err.message || "Unknown error";
        console.error("Gemini error:", message);
        return `⚠️ # Error\nAn error occurred while communicating with the AI service (${message}). Please try again later.`;
    }
}

module.exports = { getGeminiResponse };
