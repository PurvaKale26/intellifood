🥗 IntelliFood – AI Ingredient Analyzer

IntelliFood is an AI-powered ingredient analysis web application designed to help users understand food ingredients clearly and responsibly.
It simplifies complex food labels using OCR + AI and provides transparent health insights instead of confusing technical jargon.


🌐 Live Demo

👉 Website:
https://purvakale26.github.io/intellifood/


🎯 Problem Statement

Most consumers struggle to understand packaged food ingredient labels due to:
Complex chemical names
Lack of clear health explanations
No context on how often something is safe to consume
This leads to uninformed food choices.


💡 Solution
IntelliFood solves this by:
Extracting ingredient text from images using OCR
Analyzing ingredients using AI (Groq AI)
Classifying ingredients as Safe / Moderate / Harmful
Explaining why ingredients matter in human-friendly language
Clearly stating uncertainty instead of overclaiming


✨ Key Features

1) AI-powered ingredient analysis
2) Image upload & OCR (Tesseract.js)
3) Text-based ingredient input
4) Risk classification (Safe / Moderate / Harmful)
5) Detailed analysis & reasoning
6) Honest uncertainty disclosure
7) Frontend hosted online (GitHub Pages)

🛠️ Tech Stack
Frontend
HTML
CSS
JavaScript
GitHub Pages (hosting)

Backend
Node.js
Express.js

Groq AI API
Environment Variables for API security

OCR
Tesseract.js


🗂️ Project Structure

Intellifood/
│
├── docs/                 # Frontend (GitHub Pages)
│   ├── index.html
│   ├── script.js
│   └── style1.css
│
├── Backend/              # Backend (AI + API)
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md



🔁 How It Works

1. User uploads an ingredient label image or pastes ingredient text
2. OCR extracts text (for image input)
3. Text is sent to the backend API
4. Backend calls Groq AI for analysis
5. AI returns structured JSON insights
6. Frontend displays results in a clear, user-friendly format


⚠️ AI Disclaimer
This project does not provide medical advice
The AI focuses on general health awareness
Ingredient quantities and processing details may be unknown
Uncertainty is clearly communicated to users

Backend Usage (For Local Testing)

cd Backend
npm install
node server.js

The backend runs on:

http://localhost:3000

API Endpoint:

POST /analyze


🧪 Example Input
Pancakes, Sugar, Palm Oil, Refined Wheat Flour


👩‍💻 Team Contribution

Frontend UI & UX
OCR integration
AI prompt engineering
Backend API development
Deployment & documentation

📜 License
This project is created for educational and hackathon purposes.
