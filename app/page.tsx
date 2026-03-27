import { Suspense } from "react";
import Link from "next/link";
import { getPublishedPosts, getCategories } from "@/lib/data";
import { FilmStrip } from "@/components/film-strip";
import { CategoryFilter } from "@/components/category-filter";
import { BlogSidebar } from "@/components/blog-sidebar";
import { PostsSkeleton } from "@/components/posts-skeleton";
import { Settings } from "lucide-react";

export const dynamic = "force-dynamic";

async function PostsSection() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ]);
  return <CategoryFilter posts={posts} categories={categories} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Film strip nav */}
      <FilmStrip />

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* Hero Header */}
        <header className="text-center pt-16 pb-10">
          <div className="inline-block bg-film-yellow text-primary-foreground font-mono text-[10px] tracking-[4px] uppercase px-4 py-1 rounded-sm mb-5 shadow-[2px_2px_0_theme(colors.amber)]">
            ▣ Kodak Gold 200 · ISO 200
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-none tracking-tight text-foreground [text-shadow:3px_3px_0_theme(colors.maroon-deep),0_0_40px_rgba(200,137,58,0.3)] text-balance">
            Ruang <em className="italic text-amber-light">Cerita</em>
          </h1>
          <p className="font-sans italic text-base text-maroon-light mt-3 tracking-wide">
            catatan dari balik lensa — pribadi, jujur, apa adanya.
          </p>
        </header>

        {/* Polaroid row decoration - Functional Navbar */}
        <div
          className="flex justify-center gap-5 my-9 flex-wrap"
          aria-hidden="true"
        >
          {[
            {
              emoji: "☕",
              label: "Blog",
              href: "/",
              bg: "from-amber-700 to-amber-900",
            },
            {
              emoji: "🌿",
              label: "Profil",
              href: "/profil",
              bg: "from-maroon-mid to-maroon-deep",
            },
            { 
              emoji: "📖", 
              label: "Rekomendasi", 
              href: "/rekomendasi",
              bg: "from-amber to-maroon-mid" 
            },
            {
              emoji: "🎞️",
              label: "Kotak Surat",
              href: "/kotak-surat",
              bg: "from-maroon-deep to-maroon-warm",
            },

          ].map(({ emoji, label, href, bg }, i) => (
            <Link
              key={label}
              href={href}
              className={`group bg-white p-2.5 pb-7 shadow-[3px_6px_18px_rgba(0,0,0,0.5)] relative w-28 cursor-pointer hover:scale-110 hover:rotate-0 hover:-translate-y-3 transition-all duration-300 z-10 ${
                i === 0
                  ? "-rotate-[4deg]"
                  : i === 1
                    ? "rotate-[1.5deg] -translate-y-2"
                    : i === 2
                      ? "-rotate-[2deg]"
                      : "rotate-[3.5deg] -translate-y-1"
              }`}
            >
              {/* tape */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-film-yellow/40 border border-film-yellow/30 group-hover:bg-film-yellow/60 transition-colors" />
              <div
                className={`w-full h-[90px] flex items-center justify-center text-3xl bg-gradient-to-br ${bg}`}
              >
                {emoji}
              </div>
              <div className="font-mono text-[9px] text-gray-600 text-center mt-1.5 tracking-wide group-hover:text-amber transition-colors">
                {label}
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3.5 my-12" aria-hidden="true">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-maroon-warm to-transparent" />
          <span className="text-amber opacity-80 text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-maroon-warm to-transparent" />
        </div>

        {/* Main layout: posts + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-start">
          <main>
            <Suspense fallback={<PostsSkeleton />}>
              <PostsSection />
            </Suspense>

            {/* Quote block */}
            <blockquote className="border-l-4 border-amber px-6 py-5 my-10 bg-maroon-mid/35 rounded-r-sm">
              <p className="font-serif italic text-xl leading-[1.7] text-foreground text-balance">
                &ldquo;Fotografi mengajarkan saya satu hal yang berlaku di luar
                kamera — kita tidak bisa mengulang cahaya yang sama dua
                kali.&rdquo;
              </p>
              <div className="font-mono text-[10px] tracking-[2px] text-amber uppercase mt-2.5">
                — Catatan Pribadi, 2024
              </div>
            </blockquote>
          </main>

          <Suspense
            fallback={
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-card border border-border rounded-sm animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <SidebarSection />
          </Suspense>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 text-center">
          <div className="inline-block bg-film-strip font-mono text-[11px] tracking-[4px] text-film-yellow uppercase px-5 py-1.5 rounded-sm mb-4">
            Kodak · Ruang Cerita · 135mm
          </div>
          <p className="text-xs text-muted-foreground italic">
            Ditulis dengan hati, disimpan untuk kenangan. &copy; 2026 GhostGas
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-mono tracking-[2px] uppercase text-muted-foreground hover:text-amber transition-colors duration-200"
          >
            <Settings className="w-3 h-3" />
            Admin
          </Link>
        </footer>
      </div>
    </div>
  );
}

async function SidebarSection() {
  const posts = await getPublishedPosts();
  return <BlogSidebar postCount={posts.length} />;
}
