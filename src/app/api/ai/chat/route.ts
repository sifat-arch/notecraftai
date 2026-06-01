import { db } from "@/db";
import { notes } from "@/db/schema";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
    console.log(message, userId);
    if (!message || !userId) {
      return NextResponse.json(
        { error: "Message and UserId are required" },
        { status: 400 },
      );
    }

    // pullup all the notes from database
    const userNotes = await db
      .select({ title: notes.title, content: notes.content })
      .from(notes)
      .where(eq(notes.userId, userId));

    if (userNotes.length === 0) {
      return NextResponse.json({
        answer:
          "Your dashboard has no saved notes. Please create some notes first!",
      });
    }

    //Structring all the notes into structor notes(context buliding)
    const context = userNotes
      .map(
        (note, index) =>
          `Note ${index + 1}:\nTitle:${note.title}\nContent:${note.content}\n---`,
      )
      .join("\n");

    // sytem prompt form gemini(system prompt Engineering)
    const systemPrompt = `
You are an intelligent note assistant. Below is a "Context" containing all the notes created by the user.

Your main task is to answer the user's questions ONLY based on the information available inside this Context.

Rules:
1. If the answer is not found within the provided notes, do not make up any information. Instead, respond directly with: "No information about this topic was found in your notes."
2. Do not use any external general knowledge.
3. Respond clearly in Bangla or in the same language the user used to ask the question.

User's Notes (Context):
${context}
`;

    // gemini model run
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUserquestion: ${message}` }],
        },
      ],
    });
    return NextResponse.json({ answer: response.text });
  } catch (error) {
    console.error("Chat AI Error:", error);
    return NextResponse.json({ error: "AI Chat Failed" }, { status: 500 });
  }
}
