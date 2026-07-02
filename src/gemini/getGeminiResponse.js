const aiGateway = require("../services/AIGateway");
const utmAssistantPrompt = require("../prompts/utmAssistantPrompt");

function formatCitationsAndSources(response) {
    let text = response.text || "";
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
        const response = await aiGateway.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            systemInstruction: utmAssistantPrompt,
            temperature: 0.2,
            tools: [{ googleSearch: {} }],
            timeoutMs: 20000
        });

        return formatCitationsAndSources(response);
    } catch (err) {
        const message = err.message || "Unknown error";
        console.error("Gemini error:", message);
        return `⚠️ # Error\nAn error occurred while communicating with the AI service (${message}). Please try again later.`;
    }
}

module.exports = { getGeminiResponse };
