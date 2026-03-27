import Link from "next/link";

export function FilmStrip({ label = 'Ruang Cerita · Est. 2025 · 135mm' }: { label?: string }) {
  const navItems = [
    { label: "Blog", href: "/" },
    { label: "Profil", href: "/profil" },
    { label: "Rekomendasi", href: "/rekomendasi" },
    { label: "Kotak Surat", href: "/kotak-surat" },
  ];

  return (
    <div className="w-full h-10 bg-film-strip flex items-center justify-between sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Left sprocket holes */}
      <div className="hidden md:flex gap-2.5 items-center px-4 shrink-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-sm bg-maroon-mid opacity-60 shrink-0"
          />
        ))}
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-mono text-[9px] sm:text-[10px] tracking-[2px] text-film-yellow/80 hover:text-film-yellow hover:scale-105 transition-all uppercase whitespace-nowrap"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Center label (visible on larger screens) */}
      <span className="hidden lg:block font-mono text-[9px] tracking-[3px] text-film-yellow opacity-40 uppercase whitespace-nowrap px-4">
        {label}
      </span>

      {/* Right sprocket holes */}
      <div className="hidden md:flex gap-2.5 items-center px-4 shrink-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-sm bg-maroon-mid opacity-60 shrink-0"
          />
        ))}
      </div>
    </div>
  )
}
