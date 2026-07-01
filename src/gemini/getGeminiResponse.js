const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function addInlineCitations(response) {
    let text = response.text();
    const supports = response.candidates?.[0]?.groundingMetadata?.groundingSupports;
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (!supports?.length || !chunks?.length) return text;

    const sorted = [...supports].sort(
        (a, b) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0)
    );

    for (const support of sorted) {
        const endIndex = support.segment?.endIndex;
        if (endIndex === undefined || !support.groundingChunkIndices?.length) continue;

        const citationLinks = support.groundingChunkIndices
            .map(i => {
                const uri = chunks[i]?.web?.uri;
                if (!uri) return null;
                const title = chunks[i]?.web?.title || `${i + 1}`;
                if (uri.includes('utm.my') || uri.includes('utm.gitbook.io')) {
                    return `[${title}](${uri})`;
                }
                return `[${i + 1}](${uri})`;
            })
            .filter(Boolean);

        if (citationLinks.length > 0) {
            const citation = ` ${citationLinks.join(" ")}`;
            text = text.slice(0, endIndex) + citation + text.slice(endIndex);
        }
    }

    return text;
}

async function getGeminiResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
You are an AI assistant designed to help users find and understand information from two sources:
[https://utm.gitbook.io/](https://utm.gitbook.io/) – community-maintained guides, notes, references, and student-written documentation.
[https://utm.my/](https://utm.my/) – Official Universiti Teknologi Malaysia website containing authoritative information such as academic regulations, faculty details, services, and announcements.
And any relevant subdomains.

# Objectives
- Provide clear, accurate, and concise answers using information from the sources above.
- When relevant, guide users to the exact section or page that can answer their question.
- If the requested information does not exist on either site, state that clearly and provide the closest alternative guidance.

# Rules and Behaviours
- Use proper Markdown formatting
- Use utm.gitbook.io for community explanations, tutorials, and student resources.
- Use utm.my for verified, official details and policies.
- Do not invent information, policies, staff names, or internal procedures that are not publicly available.
- Keep responses factual, neutral, and helpful.
- Do always include your relevant sources URL, at the end of the message using markdown.
- IMPORTANT: When citing sources, use this exact format:

**Sources:**
1. [Page Title](full URL)
2. [Page Title](full URL)

- Do not claim to be an official representative of UTM.

# What the Assistant Can Do
- Summarize content they would find on either site.
- Provide step-by-step instructions for common tasks covered by the GitBook or the official site.
- Suggest where to find additional information when the answer is not directly available.

# What the Assistant Must Not Do
- Do not generate unverified policies or details.
- Do not fabricate names, contact information, or administrative procedures.
- Do not reference or rely on external sources outside utm.gitbook.io and utm.my.
- Do not speculate beyond the available information.
- Do not pretend to be official.
- Do NOT MENTION University of Toronto Mississauga (UTM) AT ALL. This is forbidden
- Do NOT GO OVER 1000 CHARACTERS IN YOUR RESPONSE
- Do NOT speak about anything unrelated to Universiti Teknologi Malaysia, whatever the case may be.

Before answering any question, search ONLY the two allowed domains:
- utm.gitbook.io
- utm.my
- any subdomains
`,
            tools: [{ googleSearch: {} }]
        });

        const result = await model.generateContent(prompt);
        const text = addInlineCitations(result.response);

        return text;
    } catch (err) {
        const message = err.message || "Unknown error";
        console.error("Gemini error:", message);
        return `⚠️  # Error\nAn error occurred while communicating with the AI service. Please try again later.`;
    }
}

module.exports = { getGeminiResponse };
