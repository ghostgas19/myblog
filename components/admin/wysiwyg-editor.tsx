"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Loader2
} from "lucide-react";

interface WYSIWYGEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Pilih file gambar yang valid");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file tidak boleh lebih dari 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload gagal");
      }

      const data = await response.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-muted border-b border-border rounded-t-sm items-center">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors ${
          editor.isActive("bold") ? "bg-card text-foreground" : ""
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors ${
          editor.isActive("italic") ? "bg-card text-foreground" : ""
        }`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors ${
          editor.isActive("strike") ? "bg-card text-foreground" : ""
        }`}
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors border border-transparent font-bold text-xs ${
          editor.isActive("heading", { level: 1 }) ? "bg-card text-foreground border-border" : ""
        }`}
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors border border-transparent font-bold text-xs ${
          editor.isActive("heading", { level: 2 }) ? "bg-card text-foreground border-border" : ""
        }`}
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors ${
          editor.isActive("bulletList") ? "bg-card text-foreground" : ""
        }`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors ${
          editor.isActive("orderedList") ? "bg-card text-foreground" : ""
        }`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors ${
          editor.isActive("blockquote") ? "bg-card text-foreground" : ""
        }`}
      >
        <Quote className="w-4 h-4" />
      </button>
      
      <div className="w-px h-5 bg-border mx-1" />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ImageIcon className="w-4 h-4" />
        )}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={addImage}
        accept="image/*"
        className="hidden"
      />
      
      <div className="w-px h-5 bg-border mx-1" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-1.5 rounded-sm hover:bg-card text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export function WYSIWYGEditor({ content, onChange }: WYSIWYGEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[400px] bg-input border border-border border-t-0 rounded-b-sm px-4 py-3 text-sm font-sans text-foreground leading-relaxed focus:outline-none focus:ring-1 focus:ring-ring resize-y transition-colors prose prose-sm dark:prose-invert max-w-none",
      },
    },
  });

  return (
    <div className="w-full relative">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}