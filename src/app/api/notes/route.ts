import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// create notes
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, userId, content } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    const newNote = await db
      .insert(notes)
      .values({
        title: title || "Untitled",
        content: content || "",
        userId,
      })
      .returning();

    console.log("Created note:", newNote);

    return NextResponse.json(newNote[0], { status: 201 });
  } catch (error) {
    console.error("POST /notes error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// get all note

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    const allNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId!));

    return NextResponse.json(allNotes);
  } catch (error) {
    console.error("GET_ALL /notes error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// update notes
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Note ID is requered" },
        { status: 400 },
      );
    }
    //metching id and update title and content
    const updatedNotes = await db
      .update(notes)
      .set({
        title: title || "Untilted",
        content: content || "",
        updatedAt: new Date(),
      })
      .where(eq(notes.id, Number(id)))
      .returning();

    return NextResponse.json(updatedNotes[0], { status: 200 });
  } catch (error) {
    console.error("PUT /notes error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
