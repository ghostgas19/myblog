"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const INTRO_TEXTS = [
  "Do you ever hear me callin?",
  "So, find me on this phrases",
  "I let you in",
  "Ruang Cerita."
];

export function IntroScene({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (index < INTRO_TEXTS.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    if (index === INTRO_TEXTS.length) {
      // 1. Show Camera
      const cameraTimer = setTimeout(() => {
        setShowCamera(true);
      }, 500);

      // 2. Trigger Flash
      const flashTimer = setTimeout(() => {
        setIsFlashing(true);
      }, 2500);

      // 3. Complete (Wait for flash to settle slightly)
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2800);

      return () => {
        clearTimeout(cameraTimer);
        clearTimeout(flashTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }} // Slow fade out for the whole component
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8 overflow-hidden"
    >
      {/* Dynamic scanlines for film feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <AnimatePresence mode="wait">
        {index < INTRO_TEXTS.length && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <p className="font-serif italic text-xl md:text-2xl text-cream tracking-wide max-w-lg leading-relaxed">
              &ldquo;{INTRO_TEXTS[index]}&rdquo;
            </p>
            {index === INTRO_TEXTS.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-px bg-amber mt-6 mx-auto"
              />
            )}
          </motion.div>
        )}

        {showCamera && !isFlashing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-8"
          >
            <div id="camera-wrap" className="relative group">
              {/* Luxury Camera SVG - Leica Style */}
              <svg width="240" height="140" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <defs>
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#2A2A2A" />
                    <stop offset="1" stopColor="#121212" />
                  </linearGradient>
                  <linearGradient id="lensGrad" x1="80" y1="35" x2="160" y2="115" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#333" />
                    <stop offset="0.5" stopColor="#111" />
                    <stop offset="1" stopColor="#050505" />
                  </linearGradient>
                  <radialGradient id="glassGlow" cx="120" cy="75" r="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#4A4A4A" stopOpacity="0.3" />
                    <stop offset="1" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Main Body */}
                <rect x="10" y="30" width="220" height="100" rx="12" fill="url(#bodyGrad)" stroke="#CBA35C" strokeWidth="0.5" />
                
                {/* Top Plate Elements */}
                <rect x="160" y="15" width="45" height="15" rx="3" fill="#222" stroke="#CBA35C" strokeWidth="0.5" />
                <circle cx="182.5" cy="15" r="5" fill="#CBA35C" />
                <rect x="35" y="20" width="40" height="10" rx="2" fill="#222" />

                {/* Viewfinder Area */}
                <rect x="30" y="45" width="25" height="18" rx="2" fill="#111" stroke="#333" strokeWidth="1" />
                <rect x="32" y="47" width="21" height="14" rx="1" fill="#0A0A0A" />

                {/* Rangefinder Window */}
                <rect x="185" y="45" width="15" height="15" rx="1" fill="#111" stroke="#333" strokeWidth="1" />

                {/* Lens Barrel */}
                <circle cx="120" cy="80" r="42" fill="#1A1A1A" stroke="#CBA35C" strokeWidth="1" />
                <circle cx="120" cy="80" r="38" fill="url(#lensGrad)" />
                
                {/* Inner Lens Elements & Glass Glow */}
                <circle cx="120" cy="80" r="28" fill="#000" />
                <circle cx="120" cy="80" r="28" fill="url(#glassGlow)" />
                
                {/* Lens Highlights */}
                <path d="M105 60C100 65 98 75 102 85" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />
                <circle cx="135" cy="65" r="3" fill="white" fillOpacity="0.15" />

                {/* Luxury "Gold Dot" Logo Accent */}
                <circle cx="180" cy="75" r="5" fill="#CBA35C" className="animate-pulse" />
                <rect x="178" y="73" width="4" height="4" fill="#000" transform="rotate(45 180 75)" opacity="0.3" />
              </svg>
            </div>
            
            <div className="text-center space-y-2">
              <p className="font-serif italic text-2xl text-[#CBA35C] tracking-widest animate-pulse opacity-80 uppercase">
                Smile Please...
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#CBA35C]"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash Effect Overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] bg-white shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]"
          />
        )}
      </AnimatePresence>

      {/* Film grain / Dust particles effect */}
      <div className="fixed inset-0 pointer-events-none mix-blend-screen opacity-20">
        <div className="absolute inset-0 bg-transparent animate-pulse"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,100,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>
    </motion.div>
  );
}
