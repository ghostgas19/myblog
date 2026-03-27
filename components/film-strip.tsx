import Link from "next/link";

export function FilmStrip({ label = 'Ruang Cerita · Est. 2025 · 135mm' }: { label?: string }) {
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

      <div className="flex-1 flex justify-center px-4 overflow-hidden">
        <span className="font-mono text-[9px] sm:text-[11px] tracking-[4px] text-film-yellow/60 uppercase whitespace-nowrap px-4 py-1 border-x border-film-yellow/10">
          {label}
        </span>
      </div>

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
  );
}
