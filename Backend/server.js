const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");   // ✅ IMPORTANT
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = `
You are a strict food nutrition expert.

Rules:
- Processed foods (pizza, pancakes, burgers, chips, soda) → Harmful
- High sugar foods → Moderate
- Natural whole foods → Safe

Respond ONLY with valid JSON:
{
  "intent": "",
  "findings": [
    { "name": "", "level": "Safe|Moderate|Harmful", "description": "" }
  ],
  "detailedAnalysis": "",
  "uncertainty": "",
  "recommendations": ""
}

Ingredients:
${text}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.2,
          messages: [
            { role: "system", content: "You analyze food health impact strictly." },
            { role: "user", content: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid response from Groq");
    }

    const clean = data.choices[0].message.content.trim();
    res.json(JSON.parse(clean));

  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
