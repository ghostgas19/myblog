"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import { PostCard } from "./post-card";

interface CategoryFilterProps {
  posts: Post[];
  categories: string[];
}

export function CategoryFilter({ posts, categories }: CategoryFilterProps) {
  const [active, setActive] = useState("Semua");

  const allCategories = ["Semua", ...categories];

  const filtered =
    active === "Semua" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Nav Tabs */}
      <nav className="flex gap-2 flex-wrap mb-10" aria-label="Filter kategori">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
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
        {filtered.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            index={i}
            featured={i === 0 && active === "Semua"}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-muted-foreground font-mono text-sm py-12 tracking-widest uppercase">
            Tidak ada tulisan di kategori ini.
          </p>
        )}
      </div>
    </>
  );
}
