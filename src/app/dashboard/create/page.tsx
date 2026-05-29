"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function CreateNotePage() {
  const { user, isLoaded } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return alert("User not found!");

    setIsSaving(true);
    try {
      const response = await fetch(`${window.location.origin}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // আপনার এপিআই রুট অনুযায়ী বডিতে title এবং userId পাঠানো হচ্ছে
        body: JSON.stringify({
          title: title.trim() || "Untitled",
          content: content.trim(),
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert("✅ নোট সফলভাবে ডাটাবেজে তৈরি হয়েছে!");
        setTitle(""); // ফর্ম রিসেট
        setContent("");
      } else {
        const errData = await response.json();
        alert(`❌ এরর: ${errData.error || "নোট সেভ হয়নি"}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ সার্ভার কানেকশন এরর!");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) return <div>Loading Editor...</div>;

  return (
    <div>
      <h2>Create a New Note</h2>

      <form
        onSubmit={handleSaveNote}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        {/* টাইটেল ইনপুট */}
        <label>
          <strong>Note Title:</strong>
          <input
            type="text"
            placeholder="নোটের নাম লিখুন..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              display: "block",
            }}
          />
        </label>

        {/* কনটেন্ট টেক্সট-এরিয়া (আপাতত ফাংশনাল করার জন্য রেখেছি, পরে কাজে লাগবে) */}
        <label>
          <strong>Content:</strong>
          <textarea
            placeholder="এখানে আপনার নোট লিখুন..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              display: "block",
            }}
          />
        </label>

        {/* সেভ বাটন */}
        <button
          type="submit"
          disabled={isSaving}
          style={{
            padding: "12px",
            background: "purple",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isSaving ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
}
