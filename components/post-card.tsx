import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  index: number;
  featured?: boolean;
}

export function PostCard({ post, index, featured = false }: PostCardProps) {
  return (
    <article
      className={`bg-card border border-border rounded-sm overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] relative flex flex-col ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Film frame top */}
      <div
        className="h-4 bg-film-strip shrink-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 12px)",
        }}
      />

      {/* Cover */}
      <div
        className={`w-full flex items-center justify-center text-5xl bg-gradient-to-br from-maroon-deep via-maroon-warm to-amber overflow-hidden relative ${featured ? "h-52" : "h-40"}`}
        aria-hidden="true"
      >
        {post.bannerUrl ? (
          <img
            src={post.bannerUrl}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        {post.bannerUrl && <div className="absolute inset-0 bg-black/20" />}
      </div>

      {/* Exposure number */}
      <span className="absolute top-6 right-2.5 font-mono text-[11px] text-film-yellow bg-black/60 px-1.5 py-0.5 rounded-sm tracking-wide">
        ■ {String(index + 1).padStart(2, "0")}
      </span>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="font-mono text-[9px] tracking-[2px] uppercase bg-amber text-primary-foreground px-2 py-0.5 rounded-sm">
            {post.category}
          </span>
          <span className="text-[11px] text-muted-foreground italic">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <h2
          className={`font-serif font-bold text-foreground leading-tight mb-2.5 ${featured ? "text-2xl" : "text-lg"}`}
        >
          {post.title}
        </h2>

        <p className="text-sm text-cream-dark leading-relaxed opacity-85 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border flex justify-between items-center">
        <Link
          href={`/blog/${post.slug}`}
          className="font-mono text-[10px] tracking-[2px] uppercase text-amber-light hover:tracking-[4px] transition-all duration-200"
        >
          Baca Selengkapnya →
        </Link>
        <span className="text-[11px] text-muted-foreground italic">
          {post.readingTime} menit baca
        </span>
      </div>
    </article>
  );
}
