export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes camera-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .ring-spin {
          transform-origin: 100px 112px;
          animation: spin-slow 6s linear infinite;
        }
        .camera-pulse {
          animation: camera-pulse 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col items-center gap-6">
        <svg
          width="160"
          height="160"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="camera-pulse drop-shadow-[0_8px_32px_rgba(230,193,90,0.15)]"
        >
          {/* Badan Kamera Utama */}
          <rect
            x="30"
            y="70"
            width="140"
            height="85"
            rx="2"
            fill="#1A1A1A"
            stroke="#E6C15A"
            strokeWidth="2.5"
          />
          {/* Bagian Atas / Viewfinder */}
          <rect
            x="45"
            y="55"
            width="50"
            height="15"
            rx="1"
            fill="#1A1A1A"
            stroke="#E6C15A"
            strokeWidth="2"
          />
          {/* Tombol Shutter */}
          <rect x="135" y="60" width="20" height="10" rx="1" fill="#E6C15A" />
          {/* Lensa Utama */}
          <circle
            cx="100"
            cy="112"
            r="38"
            fill="#1A1A1A"
            stroke="#E6C15A"
            strokeWidth="3"
          />
          {/* Dashed Ring — berputar */}
          <circle
            cx="100"
            cy="112"
            r="30"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="ring-spin"
          />
          {/* Aksen Cahaya Lensa */}
          <path
            d="M85 97C90 92 100 92 110 97"
            stroke="#E6C15A"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="square"
          />
          {/* Detail Aksen Garis */}
          <line
            x1="160"
            y1="80"
            x2="160"
            y2="145"
            stroke="#E6C15A"
            strokeWidth="1.5"
          />
        </svg>

        <p className="font-mono text-[10px] tracking-[4px] uppercase text-[#E6C15A] opacity-60">
          Loading...
        </p>
      </div>
    </div>
  );
}
