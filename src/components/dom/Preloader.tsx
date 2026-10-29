"use client";

import { useState } from "react";
import { Disc3, Volume2 } from "lucide-react";

interface PreloaderProps {
  onDropNeedle: () => void;
}

/**
 * Preloader gate component.
 * Acts as an absolute overlay with a mandatory "Enter / Drop Needle" button
 * to satisfy browser audio autoplay policies and initialize the Web Audio API.
 */
export default function Preloader({ onDropNeedle }: PreloaderProps) {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    onDropNeedle();
  };

  if (hasStarted) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-obsidian text-white p-8 md:p-16 select-none">
      {/* Top Header metadata */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest uppercase font-mono text-zinc-500 border-b border-zinc-800 pb-4">
        <span>SIDE A / STEREO 33⅓ RPM</span>
        <span>CAT. NO. ES-2026-LP</span>
        <span>EXECUTIVE PRODUCED</span>
      </div>

      {/* Center Gate Interaction */}
      <div className="max-w-3xl text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/60 text-xs font-mono text-zinc-400">
          <Volume2 className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>AUDIO ENGINE INTERACTION REQUIRED</span>
        </div>

        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.9]">
          EKANSH <span className="text-zinc-600">SHROTRIYA</span>
        </h1>

        <p className="font-quote italic text-2xl sm:text-3xl text-zinc-300 max-w-xl mx-auto">
          &ldquo;Architecting agents, compiling the cadence, dropping systems on the 1.&rdquo;
        </p>

        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          FULL-STACK & AI AGENT ARCHITECT • LP EDITION
        </p>

        {/* Needle Drop Trigger */}
        <div className="pt-6">
          <button
            onClick={handleStart}
            type="button"
            className="group relative inline-flex items-center gap-3 px-8 py-5 bg-[var(--accent)] text-black font-display font-extrabold text-sm md:text-base tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[0_0_30px_rgba(255,70,45,0.4)]"
          >
            <Disc3 className="w-5 h-5 animate-spin group-hover:rotate-180 transition-transform duration-700" />
            <span>DROP NEEDLE / ENTER LP</span>
          </button>
        </div>
      </div>

      {/* Bottom Technical Liner Notes */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-600 gap-2 border-t border-zinc-900 pt-4">
        <span>WEBGL 3D • REACT THREE FIBER • LENIS SMOOTH SCROLL</span>
        <span>BRUTALIST ARCHITECTURE • ALL RIGHTS RESERVED © 2026</span>
      </div>
    </div>
  );
}
