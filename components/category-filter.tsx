"use client";

import { useState, useRef } from "react";
import type { Post } from "@/lib/types";
import { PostCard } from "./post-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryFilterProps {
  posts: Post[];
  categories: string[];
}

const POSTS_PER_PAGE = 6;
const FIRST_PAGE_LIMIT = 5;

export function CategoryFilter({ posts, categories }: CategoryFilterProps) {
  const [active, setActive] = useState("Semua");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const allCategories = ["Semua", ...categories];

  const filtered =
    active === "Semua" ? posts : posts.filter((p) => p.category === active);

  // Page 1 shows 5 posts (1 featured + 4 regular), rest show 6
  const isFeaturedPage = page === 1 && active === "Semua";
  const pageLimit = isFeaturedPage ? FIRST_PAGE_LIMIT : POSTS_PER_PAGE;

  // Calculate total pages accounting for the first-page difference
  const totalPages = filtered.length <= FIRST_PAGE_LIMIT
    ? 1
    : 1 + Math.ceil((filtered.length - FIRST_PAGE_LIMIT) / POSTS_PER_PAGE);

  // Slice the right posts for current page
  const paginated = page === 1
    ? filtered.slice(0, pageLimit)
    : filtered.slice(FIRST_PAGE_LIMIT + (page - 2) * POSTS_PER_PAGE, FIRST_PAGE_LIMIT + (page - 1) * POSTS_PER_PAGE);

  function handleCategoryChange(cat: string) {
    setActive(cat);
    setPage(1);
  }

  function handlePageChange(next: number) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div ref={topRef} />

      {/* Nav Tabs */}
      <nav className="flex gap-2 flex-wrap mb-10" aria-label="Filter kategori">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`font-mono text-[11px] tracking-[2px] uppercase px-4 py-2 border rounded-sm transition-all duration-200 cursor-pointer ${
              active === cat
                ? "bg-maroon-warm border-maroon-warm text-cream"
                : "border-maroon-warm text-maroon-light hover:bg-maroon-warm hover:text-cream"
            }`}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {paginated.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            index={i}
            featured={i === 0 && active === "Semua" && page === 1}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-muted-foreground font-mono text-sm py-12 tracking-widest uppercase">
            Tidak ada tulisan di kategori ini.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          {/* Film counter label */}
          <div className="font-mono text-[9px] tracking-[3px] uppercase text-muted-foreground">
            Frame {paginated.length > 0 ? (page === 1 ? 1 : FIRST_PAGE_LIMIT + (page - 2) * POSTS_PER_PAGE + 1) : 0}–{page === 1 ? Math.min(FIRST_PAGE_LIMIT, filtered.length) : Math.min(FIRST_PAGE_LIMIT + (page - 1) * POSTS_PER_PAGE, filtered.length)} dari {filtered.length} tulisan
          </div>

          {/* Pagination strip */}
          <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden shadow-[3px_3px_0_theme(colors.maroon-deep)]">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2.5 bg-film-strip text-film-yellow font-mono text-[10px] tracking-[2px] uppercase hover:bg-maroon-mid transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-r border-border"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === page;
              const showDot =
                totalPages > 5 &&
                p !== 1 &&
                p !== totalPages &&
                Math.abs(p - page) > 1;

              if (showDot && (p === page - 2 || p === page + 2)) {
                return (
                  <span
                    key={p}
                    className="w-9 flex items-center justify-center py-2.5 font-mono text-[10px] text-muted-foreground bg-card border-r border-border"
                  >
                    ···
                  </span>
                );
              }
              if (showDot) return null;

              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-9 flex items-center justify-center py-2.5 font-mono text-[11px] tracking-wider border-r border-border transition-colors ${
                    isActive
                      ? "bg-maroon-warm text-cream font-bold"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {p}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2.5 bg-film-strip text-film-yellow font-mono text-[10px] tracking-[2px] uppercase hover:bg-maroon-mid transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Halaman berikutnya"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Kodak film perforations decoration */}
          <div
            className="w-48 h-2 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, transparent 0px, transparent 6px, theme(colors.amber) 6px, theme(colors.amber) 10px)",
            }}
          />
        </div>
      )}
    </>
  );
}
