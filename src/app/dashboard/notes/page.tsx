"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// নোটের টাইপ ডিফাইন করা (TypeScript-এর জন্য)
interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function AllNotesPage() {
  const { user, isLoaded } = useUser();
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ইউজার আইডি পুরোপুরি লোড হওয়ার পরই কেবল এপিআই কল হবে
    if (isLoaded && user?.id) {
      const fetchNotes = async () => {
        try {
          const response = await fetch(
            `${window.location.origin}/api/notes?userId=${user.id}`,
          );
          if (response.ok) {
            const data = await response.json();
            setNotesList(data);
          } else {
            console.error("Failed to fetch notes");
          }
        } catch (error) {
          console.error("Error fetching notes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotes();
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) return <div>Loading your notes...</div>;

  return (
    <div>
      <h2>Your Saved Notes (All Notes)</h2>
      <p style={{ color: "gray", marginBottom: "20px" }}>
        মোট নোট সংখ্যা: {notesList.length} টি
      </p>

      {notesList.length === 0 ? (
        <p>আপনার কোনো নোট তৈরি করা নেই। সাইডবার থেকে নতুন নোট তৈরি করুন।</p>
      ) : (
        // নোটগুলো লিস্ট আকারে দেখানোর জন্য সাধারণ গ্রিড/লিস্ট UI
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {notesList.map((note) => (
            <div
              key={note.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "#fafafa",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0", color: "purple" }}>
                {note.title}
              </h3>
              <p style={{ margin: "0 0 10px 0", whiteSpace: "pre-wrap" }}>
                {note.content || "কোনো কন্টেন্ট নেই..."}
              </p>
              <small style={{ color: "#888" }}>
                তৈরি হয়েছে:{" "}
                {new Date(note.createdAt).toLocaleDateString("bn-BD")}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
