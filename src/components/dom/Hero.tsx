"use client";

import { ArrowUpRight, Cpu, Layers, Terminal } from "lucide-react";
import { BAR_VAULT } from "@/data/barVault";

/**
 * Hero section.
 * Brutalist LP typography, lyrical quote from the Bar Vault, and technical credentials.
 */
export default function Hero() {
  const primaryBar = BAR_VAULT[0];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Top Banner Tag */}
      <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
        <span className="px-2 py-0.5 border border-zinc-800 text-[var(--accent)] font-semibold">
          LP RECORDING
        </span>
        <span>AI AGENTS • SYSTEM ARCHITECTURE • WEBGL</span>
      </div>

      {/* Main Massive Brutalist Headline */}
      <div className="my-auto py-12 space-y-6">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          SIDE A / TRACK 01 — FULL-STACK MASTER
        </div>

        <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tighter uppercase leading-[0.85] text-white">
          EKANSH <br />
          <span className="text-zinc-600 hover:text-white transition-colors duration-500">
            SHROTRIYA
          </span>
        </h1>

        {/* Lyrical Quote Callout (Instrument Serif Italic) */}
        <div className="max-w-2xl border-l-2 border-[var(--accent)] pl-6 py-2 my-8 space-y-2">
          <blockquote className="font-quote italic text-2xl sm:text-3xl lg:text-4xl text-zinc-200 leading-snug">
            &ldquo;{primaryBar.quote}&rdquo;
          </blockquote>
          <div className="font-mono text-xs text-zinc-500 tracking-wider">
            — {primaryBar.artist}, <span className="text-zinc-400">&ldquo;{primaryBar.track}&rdquo;</span> ({primaryBar.year})
          </div>
        </div>

        {/* Quick Capabilities Pills */}
        <div className="flex flex-wrap gap-3 pt-4 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-zinc-950/40 text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Autonomous AI Agent Swarms</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-zinc-950/40 text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Distributed Real-Time Systems</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-zinc-950/40 text-zinc-300">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Creative Tech & WebGL Shaders</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-zinc-900 pt-8 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-6">
          <span>SCROLL DOWN TO FLIP THE VINYL</span>
          <span className="text-zinc-700">↓</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#discography"
            className="flex items-center gap-1.5 text-white hover:text-[var(--accent)] transition-colors"
          >
            CRATE-DIG DISCOGRAPHY <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
