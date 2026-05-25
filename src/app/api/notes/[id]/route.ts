import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// get single note
export async function GET(
  _: Request,
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
