import { FilmStrip } from "@/components/film-strip";
import { getRecommendations } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RekomendasiPage() {
  const recommendations = await getRecommendations();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip label="Recommendations · Curated Feelings" />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-amber mb-4">Recommendations</h1>
          <p className="font-mono text-sm tracking-[3px] text-maroon-light uppercase italic">Things that calm the soul.</p>
        </header>

        {recommendations.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-mono text-xs tracking-widest uppercase">
            No recommendations added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {recommendations.map((item, i) => {
              const isImage = item.emoji?.startsWith('http') || item.emoji?.startsWith('/');
              
              const typeMap: Record<string, string> = {
                'lagu': 'Song',
                'film': 'Movie',
                'buku': 'Book',
                'musik': 'Music',
                'song': 'Song',
                'movie': 'Movie',
                'book': 'Book'
              };
              const displayType = (item.type && typeMap[item.type.trim().toLowerCase()]) || item.type;
              
              return (
                <div key={`${item.title}-${i}`} className="group flex flex-col items-center">
                  <div className={`bg-white p-3 pb-12 shadow-[5px_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 mb-8 w-64 ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'} group-hover:rotate-0`}>
                    <div className="w-full h-56 bg-maroon-mid overflow-hidden flex items-center justify-center border border-black/5 relative">
                      {isImage ? (
                        <img 
                          src={item.emoji} 
                          alt={item.title} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      ) : (
                        <span className="text-5xl">{item.emoji || '✨'}</span>
                      )}
                    </div>
                    <div className="mt-4 border-t border-black/5 pt-3">
                       <p className="font-mono text-[8px] text-gray-400 text-center tracking-widest uppercase truncate">{item.title}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-[4px] text-maroon-light uppercase mb-2">{displayType}</span>
                  <h2 className="font-serif text-2xl font-bold group-hover:text-amber transition-colors text-center">{item.title}</h2>
                  <p className="font-sans italic text-muted-foreground opacity-80 text-center">{item.artist}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-20 flex justify-center">
          <Link href="/" className="font-mono text-xs tracking-[4px] text-amber hover:text-film-yellow transition-colors uppercase border border-amber/30 px-8 py-3 rounded-full hover:bg-amber/5">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
