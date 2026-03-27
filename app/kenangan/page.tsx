import { Suspense } from "react";
import { FilmStrip } from "@/components/film-strip";
import { getMemories } from "@/lib/data";
import { MapPin, Calendar, Camera } from "lucide-react";

export const dynamic = "force-dynamic";

async function MemoriesGrid() {
  const memories = await getMemories();

  if (memories.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block bg-muted/30 border border-border rounded-sm px-8 py-10">
          <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-[3px]">
            No memories shared yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {memories.map((memory, i) => (
        <div
          key={memory.id}
          className={`group bg-white p-3 pb-12 shadow-[5px_10px_25px_rgba(0,0,0,0.3)] relative transition-all duration-500 hover:scale-[1.03] hover:z-20 ${
            i % 3 === 0 ? "-rotate-2" : i % 3 === 1 ? "rotate-1" : "rotate-2"
          }`}
        >
          {/* Tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-film-yellow/30 border border-film-yellow/20 z-10" />

          <div className="aspect-square overflow-hidden bg-muted relative">
            <img
              src={memory.image}
              alt={memory.location}
              className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="mt-4 px-1">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-amber-900/60 font-mono text-[10px] uppercase tracking-wider">
                <MapPin className="w-3 h-3" />
                {memory.location}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[9px] uppercase tracking-tighter">
                <Calendar className="w-3 h-3" />
                {new Date(memory.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </div>
            </div>
            <p className="font-serif italic text-base text-gray-800 leading-relaxed text-balance">
              &ldquo;{memory.caption}&rdquo;
            </p>
          </div>

          {/* Film grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      ))}
    </div>
  );
}

export default function KenanganPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <FilmStrip label="Movies for Two · Memory Archive · 135mm" />

      <main className="max-w-6xl mx-auto px-6">
        <header className="text-center pt-20 pb-16">
          <div className="inline-block bg-film-yellow text-primary-foreground font-mono text-[10px] tracking-[4px] uppercase px-4 py-1 rounded-sm mb-5 shadow-[2px_2px_0_theme(colors.amber)]">
            ▣ Photo Clip Collection · Memory Archive
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-none tracking-tight text-foreground [text-shadow:3px_3px_0_theme(colors.maroon-deep)]">
            Memories{" "}
            <em className="italic text-amber-light text-4xl md:text-6xl">
              Eternal
            </em>
          </h1>
          <p className="font-sans italic text-base text-maroon-light mt-4 max-w-xl mx-auto tracking-wide">
            Fragments of moments captured on camera, places once visited, and
            small stories left behind.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-3 pb-12 shadow-md aspect-[4/5] opacity-50"
                />
              ))}
            </div>
          }
        >
          <MemoriesGrid />
        </Suspense>

        {/* Home Link */}
        <div className="mt-24 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] uppercase text-muted-foreground hover:text-amber transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
