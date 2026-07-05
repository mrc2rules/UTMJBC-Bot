const aiGateway = require("../services/AIGateway");
const utmAssistantPrompt = require("../prompts/utmAssistantPrompt");
const { logError } = require("../shared/logger");
const database = require("../database/Database");

async function getGeminiResponse(prompt, guildId = null) {
    try {
        let model = "gemini-2.5-flash";
        if (guildId) {
            const settings = await new Promise(resolve => database.getServerSettings(guildId, resolve));
            if (settings && settings.chatbotModel) {
                model = settings.chatbotModel;
            }
        }

        const response = await aiGateway.generateContent({
            model: model,
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
