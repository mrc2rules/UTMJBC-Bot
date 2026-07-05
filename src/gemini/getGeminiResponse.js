const aiGateway = require("../services/AIGateway");
const utmAssistantPrompt = require("../prompts/utmAssistantPrompt");
const { logError } = require("../shared/logger");

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

        let text = response.text || "";
        // Strip out any hallucinated manual "Sources:" section from the LLM if present
        text = text.replace(/(?:\n|^)\s*\*\*Sources:\*\*[\s\S]*$/i, '').trim();
        return text;
    } catch (err) {
        logError(`[getGeminiResponse] Gemini error: ${err.message}`);
        return `⚠️ **AI Service Unavailable**\nI encountered a temporary issue while processing your request. Please try again in a few moments.`;
    }
}

module.exports = { getGeminiResponse };
