import { FilmStrip } from "@/components/film-strip";
import Link from "next/link";

export default function RekomendasiPage() {
  const recommendations = [
    { type: "Lagu", title: "Space Oddity", artist: "David Bowie", emoji: "🎵" },
    { type: "Film", title: "In the Mood for Love", artist: "Wong Kar-wai", emoji: "🎞️" },
    { type: "Buku", title: "Norwegian Wood", artist: "Haruki Murakami", emoji: "📖" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip label="Rekomendasi · Kurasi Perasaan" />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-amber mb-4">Rekomendasi</h1>
          <p className="font-mono text-sm tracking-[3px] text-maroon-light uppercase italic">Hal-hal yang membuat hati tenang.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {recommendations.map((item) => (
            <div key={item.title} className="group flex flex-col items-center">
              <div className="bg-white p-3 pb-12 shadow-[5px_10px_25px_rgba(0,0,0,0.5)] rotate-4 group-hover:rotate-0 transition-transform duration-500 mb-8">
                <div className="w-48 h-48 bg-maroon-mid overflow-hidden flex items-center justify-center text-5xl">
                  {item.emoji}
                </div>
              </div>
              <span className="font-mono text-[10px] tracking-[4px] text-maroon-light uppercase mb-2">{item.type}</span>
              <h2 className="font-serif text-2xl font-bold group-hover:text-amber transition-colors text-center">{item.title}</h2>
              <p className="font-sans italic text-muted-foreground opacity-80 text-center">{item.artist}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/" className="font-mono text-xs tracking-[4px] text-amber hover:text-film-yellow transition-colors uppercase border border-amber/30 px-8 py-3 rounded-full hover:bg-amber/5">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
