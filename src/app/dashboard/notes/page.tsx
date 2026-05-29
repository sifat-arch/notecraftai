"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const AllNotesPage = () => {
  const { user, isLoaded } = useUser();
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAllNotes = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(
        `${window.location.origin}/api/notes?userId=${user.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setNotesList(data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) fetchAllNotes();
  }, [isLoaded, user]);

  // body scroll বন্ধ করা যখন modal খোলা থাকে
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content || "");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNote(null);
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) return;
    setIsUpdating(true);

    try {
      const response = await fetch(`${window.location.origin}/api/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedNote.id,
          title: editTitle.trim() || "Untitled",
          content: editContent.trim(),
        }),
      });

      if (response.ok) {
        handleClose();
        fetchAllNotes();
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="p-6 text-slate-400 animate-pulse">
        Loading your notes...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* হেডার */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Your Saved Notes
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Notes: {notesList.length}
        </p>
      </div>

      {/* নোট নেই */}
      {notesList.length === 0 ? (
        <p className="text-slate-500 bg-slate-50 p-6 rounded-lg border border-dashed text-center">
          You have no notes. Create notes from the sidebar.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notesList.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className="p-5 border border-slate-200 rounded-xl bg-white hover:shadow-md hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between h-48 overflow-hidden group"
            >
              <div>
                <h3 className="font-semibold text-lg text-purple-700 truncate group-hover:text-purple-900">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-4 whitespace-pre-wrap">
                  {note.content || "কোনো কন্টেন্ট নেই..."}
                </p>
              </div>
              <span className="text-xs text-slate-400 mt-4 block">
                {new Date(note.createdAt).toLocaleDateString("bn-BD")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Custom Dialog — shadcn ছাড়াই */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-[998]"
          />

          {/* Modal Box */}
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-slate-900">Edit Note</h3>
                <button
                  onClick={handleClose}
                  className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                টাইটেল এবং কন্টেন্ট পরিবর্তন করে আপডেট করুন।
              </p>

              {/* Form */}
              <form onSubmit={handleUpdateNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Note title..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-base text-slate-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Content
                  </label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Write your note here..."
                    rows={8}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2 text-sm rounded-lg bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-60"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllNotesPage;