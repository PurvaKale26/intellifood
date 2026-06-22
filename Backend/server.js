import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔧 __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/************************************
 * MIDDLEWARE
 ************************************/
app.use(cors());
app.use(express.json());

/************************************
 * SERVE FRONTEND (docs folder)
 ************************************/
const frontendPath = path.join(__dirname, "../docs");
console.log("📁 Serving frontend from:", frontendPath);

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/************************************
 * ANALYZE API (AI + RISK LEVEL)
 ************************************/
app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "No ingredient text provided",
      });
    }

    const prompt = `
You are an AI-native consumer health co-pilot.

Your role:
- Explain ingredient health impact clearly
- Avoid medical advice or numeric limits
- Use human-friendly guidance

For EACH ingredient:
1. Explain why it matters
2. Assign a risk level:
   - Safe (generally fine for regular intake)
   - Moderate (okay occasionally)
   - Harmful (best kept infrequent)
3. Explain how much or how often is okay (relative terms)
4. Explain tradeoffs honestly
5. Communicate uncertainty

Respond ONLY with valid JSON:

{
  "inferredIntent": "",
  "keyInsights": [
    {
      "ingredient": "",
      "whyItMatters": "",
      "riskLevel": "Safe | Moderate | Harmful",
      "howMuchIsOkay": "",
      "tradeoff": ""
    }
  ],
  "overallReasoning": "",
  "uncertainty": "",
  "practicalGuidance": ""
}

Ingredients: ${text}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(prompt);

    const content = result.response.text();

    console.log("🧠 RAW AI RESPONSE:\n", content);

    if (!content) {
      return res.status(500).json({
        error: "Empty AI response",
      });
    }

    const match = content.match(/\{[\s\S]*\}/);

    if (!match) {
      return res.status(500).json({
        error: "AI response not valid JSON",
        raw: content,
      });
    }

    const parsed = JSON.parse(match[0]);

    res.json(parsed);
  } catch (error) {
    console.error("❌ Backend crash:", error);
    res.status(500).json({
      error: "AI analysis failed",
    });
  }
});

/************************************
 * START SERVER
 ************************************/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});