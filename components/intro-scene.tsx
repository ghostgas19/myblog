"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const INTRO_TEXTS = [
  "Do you ever hear me callin?",
  "So, find me on this phrases",
  "I let you in",
  "Movies For Two.",
];

export function IntroScene({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < INTRO_TEXTS.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    if (index === INTRO_TEXTS.length) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(completeTimer);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8 overflow-hidden"
    >
      {/* Film grain overlay */}
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
    </motion.div>
  );
}
