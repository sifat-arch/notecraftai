"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Search, Trash2 } from "lucide-react"; // 🚀 ডিলিট আইকনের জন্য এটি ইম্পোর্ট করা হয়েছে
import NoteEditor from "@/components/ui/NoteEditor";
import FlashcardComponent from "@/components/FlashCardComponent";

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

  // মোডাল এবং এডিট স্টেটস
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // 🚀 ডিলিটিং স্টেট

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<{ q: string; a: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // searching
  const [searchTerm, setSearchTerm] = useState("");

  // ডাটাবেজ থেকে সব নোট আনা
  const fetchAllNotes = async (search = "") => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        `${window.location.origin}/api/notes?userId=${user.id}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
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
    if (isLoaded && user?.id) {
      fetchAllNotes();
    }
  }, [isLoaded, user]);

  useEffect(() => {
    fetchAllNotes(searchTerm);
  }, [searchTerm]);

  // কার্ডে ক্লিক করলে মোডাল ওপেন হবে
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content || "");
    setIsOpen(true);
  };

  // আপডেট লজিক (PUT)
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
        setIsOpen(false);
        setSelectedNote(null);
        fetchAllNotes(); // ডাটা রিফ্রেশ
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server Error!");
    } finally {
      setIsUpdating(false);
    }
  };

  // 🚀 ডিলিট লজিক (DELETE)
  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    // ডিলিট করার আগে কনফার্মেশন নেওয়া ভালো
    const confirmDelete = confirm(
      "আপনি কি নিশ্চিতভাবে এই নোটটি ডিলিট করতে চান?",
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${window.location.origin}/api/notes?id=${selectedNote.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setIsOpen(false);
        setSelectedNote(null);
        fetchAllNotes(); // লিস্ট রিফ্রেশ করা
      } else {
        alert("❌ ডিলিট করা সম্ভব হয়নি।");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("❌ সার্ভার এরর!");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="p-6 text-muted-foreground animate-pulse text-center">
        Loading your notes...
      </div>
    );
  }

  // gemini ai hanlder function
  const handleAiFeature = async (type: "summary" | "flashcards") => {
    if (!editContent) return alert("Write Something!");

    setIsAiLoading(true);
    try {
      const res = await fetch(`${window.location.origin}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent, type }),
      });

      const data = await res.json();
      if (res.ok) {
        if (type === "summary") setAiSummary(data.summary);
        if (type === "flashcards") setFlashcards(data.flashcards);
      } else {
        alert(data.error || "AI request has been failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection error!");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedNote(null);
    setEditTitle("");
    setEditContent("");
    setAiSummary(null);
    setFlashcards([]);
  };

  return (
    <div className="w-full space-y-6 p-4">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Your Saved Notes
        </h2>
        <p className="text-sm text-muted-foreground">
          Notes: {notesList.length}
        </p>
        <div className="flex justify-center w-full">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-2 flex items-center">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-slate-200 w-md py-2 pl-10 rounded-md  text-slate-400"
            />
          </div>
        </div>
      </div>

      {notesList.length === 0 ? (
        <p className="text-slate-500 bg-slate-50 p-6 rounded-lg border border-dashed text-center">
          You have no notes. Create notes from the sidebar.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {notesList.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-purple-400 transition-all cursor-pointer flex flex-col justify-between h-44 overflow-hidden"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-purple-700 truncate">
                  {note.title}
                </h3>
                <div className="text-sm text-slate-600 line-clamp-3 overflow-hidden w-full min-h-[60px]">
                  <div
                    className="prose prose-sm max-w-none text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: note.content || "There is no content..",
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-slate-400 block pt-2 border-t border-slate-50">
                {new Date(note.createdAt).toLocaleDateString("bn-BD")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 🚀 Shadcn UI Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-xl p-6 bg-white shadow-2xl border border-slate-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] max-h[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Edit Note
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Change your note title and content
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleUpdateNote}
            className="flex-1 overflow-y-auto pr-2 space-y-4 mt-2 scrollbar-thin"
          >
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Title
              </label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Note title..."
                className="focus-visible:ring-purple-500 font-medium text-base w-full"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Content
              </label>
              <NoteEditor
                content={editContent}
                onChange={(html) => setEditContent(html)}
              />

              {/* 🚀 AI অ্যাকশন প্যানেল */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isAiLoading}
                  onClick={() => handleAiFeature("summary")}
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium text-xs h-9 flex-1"
                >
                  ✨ Summarize Note
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isAiLoading}
                  onClick={() => handleAiFeature("flashcards")}
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-xs h-9 flex-1"
                >
                  🧠 Generate Flashcards
                </Button>
              </div>

              {/* 🚀 ১. AI Summary এর আউটপুট শো করা */}
              {aiSummary && (
                <div className="mt-4 p-4 bg-purple-50/50 border border-purple-100 rounded-xl">
                  <h4 className="text-sm font-bold text-purple-900 mb-1">
                    🤖 AI Summary:
                  </h4>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {aiSummary}
                  </p>
                </div>
              )}

              {/* 🚀 ২. AI Flashcards (Tailwind Flip Card Style) */}
              {flashcards.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-bold text-indigo-900">
                    📇 AI Flashcards ({flashcards.length}):
                  </h4>
                  <div className="grid grid-cols-1 gap-3 max-h-[250px] overflow-y-auto p-1">
                    {flashcards.map((card, idx) => (
                      <FlashcardComponent key={idx} card={card} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ফুটার লেআউট পরিবর্তন করে ডিলিট বাটন যুক্ত করা হয়েছে */}
            <DialogFooter className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 mt-4">
              {/* 🚀 বাম পাশে লাল রঙের কাস্টম ডিলিট বাটন */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleDeleteNote}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2"
                title="Delete Note"
              >
                <Trash2 className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  Delete
                </span>
              </Button>

              {/* ডান পাশে Cancel এবং Save Changes বাটন */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCloseDialog()}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white font-medium"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllNotesPage;
