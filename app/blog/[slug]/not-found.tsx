import Link from 'next/link'
import { FilmStrip } from '@/components/film-strip'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip />
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <div className="font-mono text-6xl text-film-yellow tracking-[8px] mb-4">404</div>
        <h1 className="font-serif text-2xl font-bold text-foreground mb-3">
          Tulisan Tidak Ditemukan
        </h1>
        <p className="text-muted-foreground italic mb-8">
          Sepertinya roll film ini sudah kedaluwarsa.
        </p>
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[3px] uppercase text-amber-light hover:tracking-[5px] transition-all duration-200"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
