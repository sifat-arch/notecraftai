import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    // 1. AI Summary Logic
    if (type === "summary") {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Read the following note content and create a short and informative summary. Provide the response directly in bullet points or within 3-4 lines without any extra introductory or concluding text. Note Content: ${content}`,
      });

      return NextResponse.json({ summary: response.text });
    }

    // 2. AI Flashcards Logic
    if (type === "flashcards") {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json", // Forces Gemini to return pure JSON
        },
        contents: `Generate 3 to 5 important question-answer pairs from the note content. The response must be a valid JSON array only. Do not include markdown code fences (such as \`\`\`json), explanations, or any extra text. Use exactly this format:
        [
          { "q": "Question 1?", "a": "Answer 1..." },
          { "q": "Question 2?", "a": "Answer 2..." }
        ]
        Note Content: ${content}`,
      });

      // Parse JSON safely
      const cleanedText = response.text?.trim() || "[]";
      const flashcards = JSON.parse(cleanedText);

      return NextResponse.json({ flashcards });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "AI Processing Failed" },
      { status: 500 },
    );
  }
}