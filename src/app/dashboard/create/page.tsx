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
        body: JSON.stringify({
          title: title.trim() || "Untitled",
          content: content.trim(),
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert("✅ Note successfully created in the database!");
        setTitle(""); // Reset form
        setContent("");
      } else {
        const errData = await response.json();
        alert(`❌ Error: ${errData.error || "Failed to save the note"}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server connection error!");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 font-medium">
        Loading Editor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between min-h-[600px] relative">
        <form onSubmit={handleSaveNote} className="flex flex-col flex-grow">
          {/* Header Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0B1A30]">
              Create a New Note
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Capture your thoughts instantly.
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-5 flex-grow">
            {/* Title Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0B1A30]">
                Note Title:
              </label>
              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl placeholder-gray-400 text-gray-700 outline-none focus:border-purple-500 transition-all text-[15px]"
              />
            </div>

            {/* Content Field */}
            <div className="flex flex-col gap-2 flex-grow">
              <label className="text-sm font-semibold text-[#0B1A30]">
                Content:
              </label>
              <textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl placeholder-gray-400 text-gray-700 outline-none focus:border-purple-500 transition-all text-[15px] resize-none flex-grow"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#7C007C] hover:bg-[#600060] text-white font-semibold py-4 rounded-2xl shadow-[0_4px_20px_rgba(124,0,124,0.25)] transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-[16px]"
            >
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>

        {/* Optional Mobile Indicator Bar */}
        <div className="w-20 h-1 bg-gray-200 rounded-full mx-auto mt-6 block md:hidden" />
      </div>
    </div>
  );
}
