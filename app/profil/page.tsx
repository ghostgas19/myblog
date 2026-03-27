import { FilmStrip } from "@/components/film-strip";
import Link from "next/link";

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip label="Profil Penulis · Analog Archive" />
      
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <div className="inline-block bg-white p-3 pb-12 shadow-[5px_10px_25px_rgba(0,0,0,0.5)] -rotate-3 hover:rotate-0 transition-transform duration-500 mb-10">
            <div className="w-64 h-64 bg-maroon-mid overflow-hidden flex items-center justify-center text-6xl border-4 border-white/10">
              👤
            </div>
            <p className="font-mono text-xs text-gray-500 mt-4 tracking-widest text-center">PAS FOTO · 2026</p>
          </div>
          
          <h1 className="font-serif text-5xl font-bold text-amber mb-4">Tentang Penulis</h1>
          <p className="font-mono text-sm tracking-[3px] text-maroon-light uppercase">Penyimpan Momenta & Cahaya</p>
        </header>

        <section className="prose prose-invert prose-amber max-w-none font-sans leading-relaxed text-lg opacity-90">
          <p>
            Halo, saya adalah seorang pengamat yang lebih suka berada di balik lensa daripada di depannya. 
            Melalui blog ini, saya mencoba mengabadikan potongan-potongan pikiran yang seringkali lewat begitu saja seperti roll film yang habis.
          </p>
          <p>
            Bagi saya, hidup adalah tentang menangkap "cahaya" — entah itu dalam bentuk percakapan kopi di pagi hari, 
            aroma hujan di sore hari, atau sekadar ketenangan saat membaca buku lama.
          </p>
        </section>

        <div className="mt-20 flex justify-center">
          <Link href="/" className="font-mono text-xs tracking-[4px] text-amber hover:text-film-yellow transition-colors uppercase border border-amber/30 px-8 py-3 rounded-full hover:bg-amber/5">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
