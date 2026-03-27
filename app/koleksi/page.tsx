import { FilmStrip } from "@/components/film-strip";
import Link from "next/link";

export default function KoleksiPage() {
  const collections = [
    { title: "Kodak Portra 400", type: "Film Stocks", emoji: "🎞️" },
    { title: "Classic Fountain Pen", type: "Analog Tools", emoji: "✒️" },
    { title: "Scent of Rain", type: "Senses", emoji: "🌧️" },
    { title: "Old Cafés", type: "Places", emoji: "☕" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <FilmStrip label="Collection · Small Treasures" />
      
      <div className="max-w-5xl mx-auto px-6 py-20 relative">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber/10 blur-[100px] -z-10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-maroon-mid/20 blur-[100px] -z-10 rounded-full" />

        <header className="text-center mb-16 px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-amber mb-4">Collection</h1>
          <p className="font-mono text-sm tracking-[3px] text-maroon-light uppercase">Meaningful things in silence.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {collections.map((item, i) => (
            <div key={item.title} className={`group flex flex-col items-center flex-wrap ${i % 2 === 0 ? '-rotate-3 mt-4' : 'rotate-3'}`}>
              <div className="bg-white p-2 pb-8 shadow-[5px_10px_20px_rgba(0,0,0,0.4)] hover:rotate-0 hover:scale-105 transition-all duration-300">
                <div className="w-40 h-40 bg-maroon-mid overflow-hidden flex items-center justify-center text-5xl">
                   {item.emoji}
                </div>
              </div>
              <span className="font-mono text-[8px] tracking-[3px] text-maroon-mid uppercase mt-4 mb-1">{item.type}</span>
              <h2 className="font-serif text-lg font-bold group-hover:text-amber transition-colors text-center px-4 leading-none">{item.title}</h2>
            </div>
          ))}
        </div>

        {/* Closing Quote */}
        <div className="text-center space-y-4 max-w-2xl mx-auto border-y border-white/5 py-12 px-6">
          <p className="font-serif italic text-2xl text-foreground/80">"Collection is not about quantity, but about the story behind an object."</p>
          <p className="font-mono text-[10px] tracking-[4px] text-amber uppercase">— Manual Curation</p>
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/" className="font-mono text-xs tracking-[4px] text-amber hover:text-film-yellow transition-colors uppercase border border-amber/30 px-8 py-3 rounded-full hover:bg-amber/5">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
