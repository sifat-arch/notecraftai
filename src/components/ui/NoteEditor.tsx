"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Button } from "./button";

interface NoteEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const NoteEditor = ({ content, onChange }: NoteEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] max-h-[300px] w-full overflow-y-auto rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus:outline-none " +
          // H2, H3 এবং List এর স্টাইল এখানে সরাসরি সেট করা হলো
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:block " +
          "[&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1 [&_h3]:block " +
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ul]:block " +
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_ol]:block " +
          "[&_li]:list-item " +
          "break-words whitespace-pre-wrap", // আগের ওভারফ্লো সমস্যার সমাধান
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-1 border border-slate-200 bg-slate-50 rounded-md">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>

        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 px-2 text-xs italic"
        >
          I
        </Button>

        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="h-8 px-2 text-xs"
        >
          H2
        </Button>

        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="h-8 px-2 text-xs"
        >
          H3
        </Button>

        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 px-2 text-xs"
        >
          • List
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
