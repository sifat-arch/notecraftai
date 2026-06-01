import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the Google Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    // Validate that content is provided in the request body
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    // Generate quiz questions using the Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert quiz maker AI. Generate exactly 4 high-quality multiple-choice questions (MCQ Quiz) based on the following note content. 
      Each question must have exactly 4 options and exactly 1 correct answer. 
      The language of the questions and options should match the language of the source note (either Bengali or English).

      Note Content: ${content}`,
      config: {
        // Enforce the model to strictly return a valid JSON structure matching the schema
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "List of quiz questions",
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.INTEGER,
                description: "Unique ID for the question, starting from 1",
              },
              question: {
                type: Type.STRING,
                description: "The quiz question string",
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of exactly 4 possible options",
              },
              correctAnswer: {
                type: Type.STRING,
                description:
                  "The exact matching correct answer from the options array",
              },
            },
            required: ["id", "question", "options", "correctAnswer"],
          },
        },
      },
    });

    // Parse the safe, structured JSON output from the model
    const cleanedText = response.text?.trim() || "[]";
    const quizData = JSON.parse(cleanedText);

    // Return the quiz data successfully
    return NextResponse.json({ quiz: quizData });
  } catch (error) {
    // Log server-side errors for debugging
    console.error("Quiz AI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 },
    );
  }
}
