import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ========== CONFIG ==========
const API_KEY = "AIzaSyBkMKrDMQGaMrcLGCyMC0AAkSVgBBzAO8s"; // Replace with your actual key
const MODEL_NAME = "gemini-2.5-flash-preview-04-17";
const PORT = process.env.PORT || 3000;

// ========== INIT ==========
const app = express();
const genAI = new GoogleGenerativeAI(API_KEY);

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// ========== ENDPOINT ==========
app.post("/reply", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'message'" });
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent(message);
    const reply = result.response.text().trim();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Failed to generate reply" });
  }
});

// ========== START ==========
app.listen(PORT, () => {
  console.log(`🤖 Gemini AI server running on port ${PORT}`);
});