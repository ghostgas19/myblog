export function FilmStrip({ label = 'Ruang Cerita · Est. 2025 · 135mm' }: { label?: string }) {
  return (
    <div className="w-full h-10 bg-film-strip flex items-center justify-center sm:justify-between sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Left sprocket holes (hidden on small screens to avoid overflow) */}
      <div className="hidden sm:flex gap-2.5 items-center px-4 sm:px-8 shrink-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-sm bg-maroon-mid opacity-60 shrink-0"
          />
        ))}
      </div>

      {/* Center label */}
      <span className="font-mono text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] text-film-yellow opacity-80 uppercase whitespace-nowrap px-4">
        {label}
      </span>

      {/* Right sprocket holes */}
      <div className="hidden sm:flex gap-2.5 items-center px-4 sm:px-8 shrink-0">
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
