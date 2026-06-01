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

export async function DELETE(req: Request) {
  try {
    // ইউআরএল থেকে আইডি (id) প্যারামিটারটি নেওয়া
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // আইডি না থাকলে ব্যাড রিকোয়েস্ট রিটার্ন করা
    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required for deletion" },
        { status: 400 },
      );
    }

    // Drizzle ORM দিয়ে ডাটাবেজ থেকে নির্দিষ্ট আইডির নোটটি মুছে ফেলা
    const deletedNote = await db
      .delete(notes)
      .where(eq(notes.id, Number(id)))
      .returning(); // returning() দিলে নিশ্চিত হওয়া যায় কোন ডাটাটি ডিলিট হলো

    // যদি ডাটাবেজে ওই আইডির কোনো নোট না পাওয়া যায়
    if (deletedNote.length === 0) {
      return NextResponse.json(
        { error: "Note not found or already deleted" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Note deleted successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /notes error:", error);
    return NextResponse.json(
      { error: "Something went wrong during deletion" },
      { status: 500 },
    );
  }
}
