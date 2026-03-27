"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const INTRO_TEXTS = [
  "Mendengarkan apa yang tak terdengar.",
  "Melihat apa yang sering terlewat.",
  "Menyimpan apa yang pernah ada.",
  "Ruang Cerita."
];

export function IntroScene({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < INTRO_TEXTS.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2000); // 2 detik per teks
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8 overflow-hidden">
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
      </AnimatePresence>

      {/* Film grain / Dust particles effect */}
      <div className="fixed inset-0 pointer-events-none mix-blend-screen opacity-20">
        <div className="absolute inset-0 bg-transparent animate-pulse"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,100,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>
    </div>
  );
}
