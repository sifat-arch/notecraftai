import { db } from "@/db"; // আপনার প্রজেক্টের Drizzle DB ইন্সট্যান্স
import { users } from "@/db/schema"; // আপনার তৈরি করা users টেবিল
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, name, imageUrl } = body;

    if (!id || !email) {
      return new Response("Missing id or email", { status: 400 });
    }

    // ১. চেক করা—ইউজার ডাটাবেজে অলরেডি আছে কিনা (ডুপ্লিকেট আটকানোর জন্য)
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (existingUser.length > 0) {
      return new Response("User already exists", { status: 200 });
    }

    // ২. ডাটাবেজে না থাকলে নতুন ইউজার ইনসার্ট করা
    await db.insert(users).values({
      id: id, // Clerk ID সরাসরি মেইন ID হিসেবে বসবে
      email: email,
      name: name,
      imageUrl: imageUrl,
    });

    return new Response("User saved to PostgreSQL successfully!", {
      status: 201,
    });
  } catch (error) {
    console.error("Drizzle DB Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
