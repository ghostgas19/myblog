import { FilmStrip } from "@/components/film-strip";
import { getProfile } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const profile = await getProfile();
  const isImageAvatar = profile.avatar?.startsWith('http') || profile.avatar?.startsWith('/');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip label="Author Profile · Analog Archive" />
      
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <div className="inline-block bg-white p-3 pb-12 shadow-[5px_10px_25px_rgba(0,0,0,0.5)] -rotate-3 hover:rotate-0 transition-transform duration-500 mb-10">
            <div className="w-64 h-64 bg-maroon-mid overflow-hidden flex items-center justify-center border-4 border-white/10 relative">
              {isImageAvatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <span className="text-6xl">{profile.avatar || '👤'}</span>
              )}
            </div>
            <p className="font-mono text-xs text-gray-500 mt-4 tracking-widest text-center uppercase">ID Photo · {new Date().getFullYear()}</p>
          </div>
          
          <h1 className="font-serif text-5xl font-bold text-amber mb-4">{profile.name}</h1>
          <p className="font-mono text-sm tracking-[3px] text-maroon-light uppercase">{profile.role}</p>
        </header>

        <section className="prose prose-invert prose-amber max-w-none font-sans leading-relaxed text-lg opacity-90 whitespace-pre-wrap">
          <p>{profile.bio}</p>
        </section>

        <div className="mt-20 flex justify-center">
          <Link href="/" className="font-mono text-xs tracking-[4px] text-amber hover:text-film-yellow transition-colors uppercase border border-amber/30 px-8 py-3 rounded-full hover:bg-amber/5">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
