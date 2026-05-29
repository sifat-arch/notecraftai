import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type IBody = {
  title?: string;
  content?: string;
};

// get single note
export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  try {
    const note = await db
      .select()
      .from(notes)
      .where(eq(notes.id, Number(params.id)));

    return NextResponse.json(note[0]);
  } catch (error) {
    console.error("GET_ALL /notes error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// patch notes

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  try {
    //take data from body
    const body: IBody = await req.json();

    const updated = await db
      .update(notes)
      .set({
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
        updatedAt: new Date(),
      })
      .where(eq(notes.id, Number(params.id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Patch /notes error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// delete note

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db.delete(notes).where(eq(notes.id, Number(params.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete /notes error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
