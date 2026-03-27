export function FilmStrip({ label = 'Ruang Cerita · Est. 2025 · 135mm' }: { label?: string }) {
  return (
    <div className="w-full h-8 sm:h-10 bg-film-strip flex items-center sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Left sprocket holes - hidden on mobile, visible on sm and up */}
      <div className="hidden sm:flex gap-2.5 items-center px-6 sm:px-8 shrink-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-sm bg-maroon-mid opacity-60 shrink-0"
          />
        ))}
      </div>

      {/* Center label - responsive font size */}
      <span className="font-mono text-[7px] sm:text-[9px] tracking-[1.5px] sm:tracking-[3px] text-film-yellow opacity-80 uppercase whitespace-nowrap mx-auto px-2 sm:px-0">
        {label}
      </span>

      {/* Right sprocket holes - hidden on mobile, visible on sm and up */}
      <div className="hidden sm:flex gap-2.5 items-center px-6 sm:px-8 shrink-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-sm bg-maroon-mid opacity-60 shrink-0"
          />
        ))}
      </div>
    </div>
  )
}
