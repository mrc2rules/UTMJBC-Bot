const { GoogleGenAI } = require('@google/genai');
const { logError, logWarn } = require('../shared/logger');

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
        } else if (this.circuitOpenUntil !== 0) {
            // Circuit cooldown expired, reset circuit state
            this.circuitOpenUntil = 0;
            this.failureCount = 0;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort(new Error(`[AIGateway] Request timed out after ${timeoutMs}ms`));
        }, timeoutMs);

        try {
            const ai = this.getClient();

            const config = {
                signal: controller.signal
            };
            if (systemInstruction) config.systemInstruction = systemInstruction;
            if (temperature !== undefined) config.temperature = temperature;
            if (maxOutputTokens !== undefined) config.maxOutputTokens = maxOutputTokens;
            if (responseMimeType) config.responseMimeType = responseMimeType;
            if (responseSchema) config.responseSchema = responseSchema;
            if (tools) config.tools = tools;
            if (safetySettings) config.safetySettings = safetySettings;

            const timeoutPromise = new Promise((_, reject) => {
                controller.signal.addEventListener('abort', () => {
                    reject(controller.signal.reason || new Error(`[AIGateway] Request aborted`));
                });
            });

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
            // Extract HTTP status/code if available (e.g. 429, 400 from @google/genai)
            const status = err.status || err.statusCode || err.httpStatus || (err.response && err.response.status) || '';
            const code   = err.code || err.errorDetails?.[0]?.reason || '';
            const detail = [status, code].filter(Boolean).join(' | ');
            logError(`[AIGateway] Error during generateContent (${this.failureCount}/${this.CIRCUIT_THRESHOLD}): ${err.message}${detail ? ` [${detail}]` : ''}`);

            if (this.failureCount >= this.CIRCUIT_THRESHOLD) {
                this.circuitOpenUntil = Date.now() + this.CIRCUIT_COOLDOWN_MS;
                logError(`[AIGateway] Circuit breaker TRIPPED! Pausing API calls for 5 minutes.`);
            }
            throw err;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async embedContent({ model = 'gemini-embedding-001', contents }) {
        try {
            const ai = this.getClient();
            const response = await ai.models.embedContent({
                model,
                contents,
                config: {
                    outputDimensionality: 768
                }
            });
            return response.embedding ? response.embedding.values : null;
        } catch (err) {
            logError(`[AIGateway] embedContent error: ${err.message}`);
            return null;
        }
    }
}

module.exports = new AIGateway();
