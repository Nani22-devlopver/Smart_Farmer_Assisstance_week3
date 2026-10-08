import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const GEMINI_API_KEY = "AQ.Ab8RN6K57OZflbY9S1NEncwnQ4ZJyTqIyPBtDUZM6HAf2PXXRg";
if (!GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY is not set. Add it to .env before using the AI.");
}

const ai = "AQ.Ab8RN6K57OZflbY9S1NEncwnQ4ZJyTqIyPBtDUZM6HAf2PXXRg"
    ? new GoogleGenAI({ apiKey:"AQ.Ab8RN6K57OZflbY9S1NEncwnQ4ZJyTqIyPBtDUZM6HAf2PXXRg" })
    : null;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

const SYSTEM_INSTRUCTION = `
You are SmartFarm AI Farmer Assistant.

Your ONLY purpose is to help with farming and agriculture:
- crops and crop planning
- irrigation and water management
- soil and nutrients
- fertilizers
- pests and crop diseases
- weather-related farming decisions
- livestock and farm management
- farm safety and general farmer well-being
- agricultural market questions when enough data is provided

DOMAIN RULE:
If the user's question is not directly or meaningfully related to farming/agriculture,
reply exactly:
Sorry, I can't help you with that.

LANGUAGE:
Answer only in the requested language.
If language is "te", use simple Telugu.
Otherwise use simple English.

STYLE:
- Keep answers practical and easy to understand.
- Maximum 3 short paragraphs/sentences unless a small bullet list is necessary.
- Do not invent live weather or market prices.
- For pesticide/chemical decisions, advise following the product label and local agricultural expert guidance.
`;

function cleanLanguage(language) {
    return language === "te" ? "te" : "en";
}

app.get("/api/health", (_req, res) => {
    res.json({
        ok: true,
        aiConfigured: Boolean(ai),
        model: MODEL
    });
});

app.post("/api/farmer-chat", async (req, res) => {
    try {
        if (!ai) {
            return res.status(500).json({
                success: false,
                error: "GEMINI_API_KEY is missing. Add your Gemini API key to the .env file and restart the server."
            });
        }

        const question = typeof req.body?.question === "string"
            ? req.body.question.trim()
            : "";

        if (!question) {
            return res.status(400).json({
                success: false,
                error: "Please enter a farming question."
            });
        }

        if (question.length > 4000) {
            return res.status(400).json({
                success: false,
                error: "Question is too long. Please keep it under 4000 characters."
            });
        }

        const language = cleanLanguage(req.body?.language);
        const crops = Array.isArray(req.body?.crops) ? req.body.crops.slice(0, 20) : [];

        const cropContext = crops.length
            ? `\nSaved crop information from the farmer's browser:\n${JSON.stringify(crops)}`
            : "";

        const prompt = `
${SYSTEM_INSTRUCTION}

Requested language: ${language}

Farmer's question:
${question}
${cropContext}
`;

        const response = await ai.models.generateContent({
            model: MODEL,
            contents: question,
            config: {
                systemInstruction: prompt,
                temperature: 0.4,
                maxOutputTokens: 300
            }
        });

        const answer = response?.text?.trim();

        if (!answer) {
            return res.status(502).json({
                success: false,
                error: "Gemini returned an empty response."
            });
        }

        return res.json({
            success: true,
            reply: answer
        });
    } catch (error) {
        console.error("Gemini Error:", error);

        const status = Number(error?.status) || 500;
        let message = "Gemini API request failed.";

        if (status === 401 || status === 403) {
            message = "Gemini API key is invalid or not authorized.";
        } else if (status === 429) {
            message = "Gemini API rate limit reached. Please try again shortly.";
        } else if (error?.message) {
            message = error.message;
        }

        return res.status(status >= 400 && status < 600 ? status : 500).json({
            success: false,
            error: message
        });
    }
});

app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "chatbot.html"));
});

app.listen(PORT, () => {
    console.log(`🌱 SmartFarm chatbot running at http://localhost:${PORT}`);
});
