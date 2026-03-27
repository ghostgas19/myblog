"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createPostAction,
  updatePostAction,
  createCategoryAction,
  deleteCategoryAction,
} from "@/lib/actions";
import { slugify } from "@/lib/utils";
import type { Post } from "@/lib/types";
import { ImageUpload } from "./image-upload";
import { WYSIWYGEditor } from "./wysiwyg-editor";
import {
  Send,
  Save,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Bold,
  Type,
  Plus,
  X,
  Check,
  Loader2,
  Tag,
} from "lucide-react";

interface PostEditorProps {
  post?: Post;
  categories: string[];
}

export function PostEditor({
  post,
  categories: initialCategories,
}: PostEditorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [category, setCategory] = useState(
    post?.category ?? initialCategories[0] ?? "",
  );
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft",
  );
  const [wordCount, setWordCount] = useState(0);
  const [bannerUrl, setBannerUrl] = useState(post?.bannerUrl ?? "");

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [catPending, setCatPending] = useState(false);
  const [catError, setCatError] = useState<string | null>(null);
  const [deletingCat, setDeletingCat] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  // Word count
  useEffect(() => {
    setWordCount(content.trim() ? content.trim().split(/\s+/).length : 0);
  }, [content]);

  // Auto-generate slug
  useEffect(() => {
    if (!slugManual) setSlug(slugify(title));
  }, [title, slugManual]);

  // Focus add input when shown
  useEffect(() => {
    if (showAddInput) addInputRef.current?.focus();
  }, [showAddInput]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setShowAddInput(false);
        setNewCatName("");
        setCatError(null);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  function openDropdown() {
    setDropdownOpen(true);
    setShowAddInput(false);
    setNewCatName("");
    setCatError(null);
  }

  function closeDropdown() {
    setDropdownOpen(false);
    setShowAddInput(false);
    setNewCatName("");
    setCatError(null);
  }

  function handleSelectCategory(cat: string) {
    setCategory(cat);
    closeDropdown();
  }

  async function handleAddCategory() {
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    setCatError(null);
    setCatPending(true);
    const result = await createCategoryAction(trimmed);
    setCatPending(false);

    if (result.error) {
      setCatError(result.error);
      return;
    }

    const saved = result.category ?? trimmed;
    if (!categories.includes(saved)) {
      setCategories((prev) => [...prev, saved]);
    }
    setCategory(saved);
    setNewCatName("");
    setShowAddInput(false);
    closeDropdown();
  }

  async function handleDeleteCategory(cat: string, e: React.MouseEvent) {
    e.stopPropagation();
    setDeletingCat(cat);
    const result = await deleteCategoryAction(cat);
    setDeletingCat(null);

    if (result.error) return;

    const remaining = categories.filter((c) => c !== cat);
    setCategories(remaining);
    if (category === cat) setCategory(remaining[0] ?? "");
  }

  function handleSubmit(submitStatus: "draft" | "published") {
    setError(null);
    setSuccess(null);
    setStatus(submitStatus);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("category", category);
    formData.set("content", content);
    formData.set("status", submitStatus);
    if (bannerUrl) formData.set("bannerUrl", bannerUrl);

    startTransition(async () => {
      const result = post
        ? await updatePostAction(post.id, formData)
        : await createPostAction(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(
          submitStatus === "published"
            ? "Tulisan berhasil dipublikasikan!"
            : "Draft berhasil disimpan!",
        );
        if (!post) setTimeout(() => router.push("/admin"), 1200);
      }
    });
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            {post ? "Edit Tulisan" : "Tulisan Baru"}
          </h1>
          <p className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground mt-0.5">
            {post ? `Editing: ${post.slug}` : "Buat artikel baru"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Kembali
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-2.5 bg-destructive/15 border border-destructive/30 rounded-sm p-3 text-xs text-destructive-foreground mb-6">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-destructive" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2.5 bg-green-400/10 border border-green-400/25 rounded-sm p-3 text-xs text-green-400 mb-6">
          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        {/* Left: main editor */}
        <div className="space-y-5">
          {/* Banner Upload */}
          <div>
            <ImageUpload
              value={bannerUrl}
              onUpload={setBannerUrl}
              label="Banner Gambar"
            />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground flex items-center gap-1.5">
              <Type className="w-3 h-3" /> Judul
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul tulisan..."
              className="w-full bg-input border border-border rounded-sm px-3 py-2.5 text-base font-serif font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground">
              Slug
            </label>
            <div className="flex gap-2 items-center">
              <span className="font-mono text-xs text-muted-foreground shrink-0">
                /blog/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugManual(true);
                  setSlug(e.target.value);
                }}
                placeholder="judul-tulisan"
                className="flex-1 bg-input border border-border rounded-sm px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground flex items-center gap-1.5">
              <Bold className="w-3 h-3" /> Konten
              <span className="ml-auto text-muted-foreground/50">
                {wordCount} kata · ~{Math.ceil(wordCount / 200)} min baca
              </span>
            </label>

            <WYSIWYGEditor 
              content={content} 
              onChange={setContent} 
            />
          </div>
        </div>

        {/* Right: metadata sidebar */}
        <div className="space-y-5">
          {/* Publish panel */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div
              className="h-3 bg-film-strip"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 12px)",
              }}
            />
            <div className="px-4 py-3 border-b border-border font-mono text-[10px] tracking-[2px] uppercase text-amber">
              Publikasi
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono tracking-[1px] uppercase text-muted-foreground">
                  Status
                </span>
                <span
                  className={`font-mono text-[9px] tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm border ${
                    status === "published"
                      ? "bg-green-400/15 text-green-400 border-green-400/25"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {status === "published" ? "Published" : "Draft"}
                </span>
              </div>

              <button
                type="button"
                disabled={pending}
                onClick={() => handleSubmit("draft")}
                className="w-full flex items-center justify-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 font-mono text-[10px] tracking-[2px] uppercase px-3 py-2.5 rounded-sm transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {pending && status === "draft"
                  ? "Menyimpan..."
                  : "Simpan Draft"}
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={() => handleSubmit("published")}
                className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[10px] tracking-[2px] uppercase px-3 py-2.5 rounded-sm transition-colors duration-200 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {pending && status === "published"
                  ? "Mempublikasikan..."
                  : "Publikasikan"}
              </button>
            </div>
          </div>

          {/* ── Category panel with custom dropdown ── */}
          <div className="bg-card border border-border rounded-sm relative">
            <div
              className="h-3 bg-film-strip rounded-t-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 12px)",
              }}
            />
            <div className="px-4 py-3 border-b border-border font-mono text-[10px] tracking-[2px] uppercase text-amber flex items-center gap-1.5">
              <Tag className="w-3 h-3" /> Kategori
            </div>

            <div className="p-4">
              {/* Custom dropdown */}
              <div ref={dropdownRef} className="relative">
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() =>
                    dropdownOpen ? closeDropdown() : openDropdown()
                  }
                  className={`w-full flex items-center justify-between gap-2 bg-input border rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors ${
                    dropdownOpen
                      ? "border-ring ring-1 ring-ring"
                      : "border-border"
                  }`}
                >
                  <span className="truncate">
                    {category || (
                      <span className="text-muted-foreground italic">
                        Pilih kategori...
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <div className="absolute z-50 top-[calc(100%+4px)] left-0 right-0 bg-card border border-border rounded-sm shadow-lg shadow-black/40 overflow-hidden">
                    {/* Category list */}
                    <ul className="max-h-48 overflow-y-auto">
                      {categories.length === 0 && !showAddInput && (
                        <li className="px-3 py-3 text-center font-mono text-[10px] text-muted-foreground italic">
                          Belum ada kategori.
                        </li>
                      )}

                      {categories.map((cat) => (
                        <li key={cat}>
                          <div
                            className={`group flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors ${
                              category === cat
                                ? "bg-amber/10 text-amber"
                                : "text-foreground hover:bg-muted/50"
                            }`}
                            onClick={() => handleSelectCategory(cat)}
                          >
                            {/* Checkmark for selected */}
                            <span className="w-3.5 shrink-0">
                              {category === cat && (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </span>

                            {/* Category name */}
                            <span className="flex-1 text-sm truncate">
                              {cat}
                            </span>

                            {/* Delete button */}
                            <button
                              type="button"
                              onClick={(e) => handleDeleteCategory(cat, e)}
                              disabled={deletingCat === cat}
                              title={`Hapus "${cat}"`}
                              className={`shrink-0 p-0.5 rounded-sm transition-colors disabled:opacity-40 ${
                                category === cat
                                  ? "text-amber/50 hover:text-destructive opacity-100"
                                  : "text-transparent group-hover:text-muted-foreground hover:!text-destructive"
                              }`}
                            >
                              {deletingCat === cat ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="border-t border-border/70" />

                    {/* Add new category section */}
                    {showAddInput ? (
                      <div className="p-2.5 space-y-2">
                        <div className="flex gap-1.5">
                          <input
                            ref={addInputRef}
                            type="text"
                            value={newCatName}
                            onChange={(e) => {
                              setNewCatName(e.target.value);
                              setCatError(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddCategory();
                              }
                              if (e.key === "Escape") {
                                setShowAddInput(false);
                                setNewCatName("");
                                setCatError(null);
                              }
                            }}
                            placeholder="Nama kategori baru..."
                            maxLength={40}
                            className="flex-1 min-w-0 bg-input border border-border rounded-sm px-2.5 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
                          />
                          {/* Confirm */}
                          <button
                            type="button"
                            onClick={handleAddCategory}
                            disabled={catPending || !newCatName.trim()}
                            title="Simpan"
                            className="flex items-center justify-center w-7 h-7 bg-amber hover:bg-amber-light text-primary-foreground rounded-sm transition-colors disabled:opacity-50 shrink-0"
                          >
                            {catPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                          </button>
                          {/* Cancel */}
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddInput(false);
                              setNewCatName("");
                              setCatError(null);
                            }}
                            title="Batal"
                            className="flex items-center justify-center w-7 h-7 border border-border text-muted-foreground hover:text-foreground rounded-sm transition-colors shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {catError && (
                          <p className="font-mono text-[9px] text-destructive px-0.5">
                            {catError}
                          </p>
                        )}

                        <p className="font-mono text-[9px] text-muted-foreground/50 px-0.5">
                          Enter simpan · Esc batal
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAddInput(true);
                          setCatError(null);
                          setNewCatName("");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-muted-foreground hover:text-amber hover:bg-amber/5 transition-colors group"
                      >
                        <span className="w-3.5 shrink-0 flex items-center justify-center">
                          <Plus className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-mono text-[10px] tracking-[1.5px] uppercase">
                          Tambah kategori baru
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview card */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div
              className="h-3 bg-film-strip"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 12px)",
              }}
            />
            <div className="px-4 py-3 border-b border-border font-mono text-[10px] tracking-[2px] uppercase text-amber">
              Preview
            </div>
            <div className="p-4 space-y-2">
              {title ? (
                <>
                  <p className="font-serif text-sm font-bold text-foreground leading-tight line-clamp-2">
                    {title}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground tracking-[1px]">
                    /blog/{slug || "..."}
                  </p>
                  <p className="text-xs text-muted-foreground italic line-clamp-2 mt-1">
                    {content.replace(/<[^>]*>?/gm, '').slice(0, 100)}
                    {content.replace(/<[^>]*>?/gm, '').length > 100 ? "..." : ""}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  Mulai menulis untuk melihat pratinjau.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
