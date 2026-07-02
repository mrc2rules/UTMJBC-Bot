const { GoogleGenAI } = require('@google/genai');

class AIGateway {
    constructor() {
        this.client = null;
        this.failureCount = 0;
        this.circuitOpenUntil = 0;
        this.CIRCUIT_THRESHOLD = 5;
        this.CIRCUIT_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
    }

    getClient() {
        if (!this.client) {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("[AIGateway] GEMINI_API_KEY environment variable is missing.");
            }
            this.client = new GoogleGenAI({ apiKey });
        }
        return this.client;
    }

    async generateContent({
        model = 'gemini-2.5-flash',
        contents,
        systemInstruction,
        temperature = 0.2,
        maxOutputTokens,
        responseMimeType,
        responseSchema,
        tools,
        safetySettings,
        timeoutMs = 25000
    }) {
        const now = Date.now();
        if (now < this.circuitOpenUntil) {
            const remainingSecs = Math.ceil((this.circuitOpenUntil - now) / 1000);
            throw new Error(`[AIGateway] Circuit breaker is OPEN due to repeated API failures. Retrying in ${remainingSecs}s.`);
        }

        try {
            const ai = this.getClient();

            const config = {};
            if (systemInstruction) config.systemInstruction = systemInstruction;
            if (temperature !== undefined) config.temperature = temperature;
            if (maxOutputTokens !== undefined) config.maxOutputTokens = maxOutputTokens;
            if (responseMimeType) config.responseMimeType = responseMimeType;
            if (responseSchema) config.responseSchema = responseSchema;
            if (tools) config.tools = tools;
            if (safetySettings) config.safetySettings = safetySettings;

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error(`[AIGateway] Request timed out after ${timeoutMs}ms`)), timeoutMs)
            );

            const requestPromise = ai.models.generateContent({
                model,
                contents,
                config
            });

            const response = await Promise.race([requestPromise, timeoutPromise]);

            // Reset failure count on success
            this.failureCount = 0;
            return response;
        } catch (err) {
            this.failureCount++;
            console.error(`[AIGateway] Error during generateContent (${this.failureCount}/${this.CIRCUIT_THRESHOLD}):`, err.message);

            if (this.failureCount >= this.CIRCUIT_THRESHOLD) {
                this.circuitOpenUntil = Date.now() + this.CIRCUIT_COOLDOWN_MS;
                console.error(`[AIGateway] Circuit breaker TRIPPED! Pausing API calls for 5 minutes.`);
            }
            throw err;
        }
    }
}

// Export singleton instance
module.exports = new AIGateway();
