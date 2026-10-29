"use client";

import { useState } from "react";
import { BAR_VAULT, type BarQuote } from "@/data/barVault";
import { BookOpen, Sparkles } from "lucide-react";

/**
 * LinerNotes component.
 * Bio, technical philosophy, and Genius-style lyric annotations.
 */
export default function LinerNotes() {
  const [selectedBar, setSelectedBar] = useState<BarQuote>(BAR_VAULT[0]);

  return (
    <section id="liner-notes" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="pb-12 border-b border-zinc-900">
        <div className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PRODUCTION CREDITS & LYRIC SHEET</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
          LINER NOTES <br />
          <span className="text-zinc-600">& GENIUS ANNOTATIONS</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
        {/* Left: Bio & Executive Producer Credo */}
        <div className="lg:col-span-7 space-y-8 font-mono text-sm text-zinc-400 leading-relaxed">
          <div className="p-8 border border-zinc-900 bg-zinc-950/60 space-y-4">
            <h3 className="font-display font-black text-xl uppercase tracking-wide text-white">
              EXECUTIVE PRODUCER&apos;S STATEMENT
            </h3>
            <p>
              Ekansh Shrotriya is a Full-Stack Engineer and Autonomous AI Agent Architect
              treating software engineering like multi-platinum record production. Every line of code
              is recorded with dynamic headroom, low noise floors, and high harmonic resonance.
            </p>
            <p>
              Specializing in multi-agent orchestration, WebGL rendering pipelines, and real-time distributed
              backends, Ekansh bridges cutting-edge creative computing with rigorous production infrastructure.
            </p>
          </div>

          {/* Interactive Genius Bars */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-300">
              SELECT A BAR TO REVEAL ANNOTATION:
            </h4>
            <div className="space-y-3">
              {BAR_VAULT.map((bar) => {
                const isActive = selectedBar.id === bar.id;
                return (
                  <button
                    key={bar.id}
                    type="button"
                    onClick={() => setSelectedBar(bar)}
                    className={`w-full text-left p-4 border transition-all duration-300 block ${
                      isActive
                        ? "border-[var(--accent)] bg-zinc-900/80 text-white"
                        : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    <p className="font-quote italic text-lg sm:text-xl">
                      &ldquo;{bar.quote}&rdquo;
                    </p>
                    <div className="font-mono text-[11px] text-zinc-500 mt-2 flex items-center justify-between">
                      <span>{bar.artist} — {bar.track}</span>
                      <span className="text-[var(--accent)] font-semibold">{bar.bpm} BPM</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Genius-style Annotation Box */}
        <div className="lg:col-span-5">
          <div
            data-dodge-zone="true"
            className="sticky top-28 p-8 border border-[var(--accent)] bg-zinc-950/90 backdrop-blur-md space-y-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GENIUS VERIFIED ANNOTATION</span>
            </div>

            <div className="border-b border-zinc-900 pb-4">
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                REFERENCED LYRIC:
              </div>
              <p className="font-quote italic text-xl text-zinc-200 pt-1">
                &ldquo;{selectedBar.quote}&rdquo;
              </p>
              <div className="font-mono text-xs text-zinc-400 pt-1">
                {selectedBar.artist} • {selectedBar.track} ({selectedBar.album}, {selectedBar.year})
              </div>
            </div>

            <div className="font-mono text-xs text-zinc-300 leading-relaxed space-y-3">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                SYSTEM INTERPRETATION & TECH STACK PARALLEL:
              </div>
              <p>{selectedBar.annotation}</p>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-between items-center font-mono text-[11px] text-zinc-500">
              <span>ANNOTATED BY: EKANSH SHROTRIYA</span>
              <span className="px-2 py-0.5 border border-zinc-800 text-zinc-400">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
