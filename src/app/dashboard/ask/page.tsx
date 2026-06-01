"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Bot, Send, User } from "lucide-react";
import React, { useState } from "react";
interface Message {
  sender: "user" | "ai";
  text: string;
}
const AskNotesPage = () => {
  const { user } = useUser();
  const [message, setMessage] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! Ask me any question about the information in your saved notes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user?.id || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessage((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsloading(true);

    try {
      const response = await fetch(`${window.location.origin}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, userId: user?.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage((prev) => [...prev, { sender: "ai", text: data.answer }]);
      } else {
        setMessage((prev) => [
          ...prev,
          { sender: "ai", text: "Sorry,Answer not precess yet" },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessage((prev) => [
        ...prev,
        { sender: "ai", text: "Server connection error" },
      ]);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col h-[clac(100vh-120px)] max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* chat header */}
      <div className="p-4 border-b border-slate-100 bg-purple-50/50 flex items-center gap-2">
        <div className="p-2 bg-purple-600 rounded-lg text-white">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Ask My Notes</h3>
          <p className="text-xs text-purple-700 font-medium">
            Powered by NoteCraftAI
          </p>
        </div>
      </div>
      {/* message seen */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {message.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            <div
              className={`p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-white border text-slate-600"}`}
            >
              {msg.sender === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            <div
              className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-purple-700 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"}`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="p-2 bg-white border text-slate-600 rounded-full animate-spin">
              ⏳
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl text-xs text-slate-500 italic">
              AI Searching your notes...
            </div>
          </div>
        )}
      </div>
      {/* input box */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-slate-100 bg-white flex gap-2"
      >
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Feel free to ask any questions about your notes"
          className="flex-1 focus-visible:ring-purple-600 font-medium"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default AskNotesPage;
