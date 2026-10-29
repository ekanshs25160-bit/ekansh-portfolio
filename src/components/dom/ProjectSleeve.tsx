"use client";

import { Disc3 } from "lucide-react";
import { type ProjectMetadata } from "@/data/projects";

export interface ProjectSleeveProps {
  project: ProjectMetadata;
}

/**
 * ProjectSleeve component (Phase 5).
 * Physical LP record sleeve in a `group relative` container:
 * - Stacked CSS Vinyl Disc behind the sleeve with repeating radial grooves and matching center label
 * - Square `.glass` LP Sleeve with Syne display typography & JetBrains Mono metadata
 * - Smooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) hover transition sliding the vinyl out (translate-x-1/2 & rotate-180)
 */
export default function ProjectSleeve({ project }: ProjectSleeveProps) {
  return (
    <div className="group relative w-full max-w-[320px] sm:max-w-[340px] aspect-square select-none cursor-pointer">
      {/* 1. THE VINYL DISC (Positioned absolutely behind the LP sleeve) */}
      <div
        aria-hidden="true"
        className="
          absolute inset-3 z-0 rounded-full
          flex items-center justify-center
          shadow-[0_20px_50px_rgba(0,0,0,0.85)]
           border border-white/10
          transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:translate-x-1/2 group-hover:rotate-180
        "
        style={{
          backgroundImage: `
            conic-gradient(from 40deg, transparent 0deg, rgba(255,255,255,0.08) 25deg, transparent 55deg, transparent 180deg, rgba(255,255,255,0.08) 205deg, transparent 235deg),
            repeating-radial-gradient(circle at center, #07070b 0px, #07070b 2px, #161621 3px, #08080c 4px)
          `,
        }}
      >
        {/* Outer Groove Ring Highlight */}
        <div className="w-[86%] h-[86%] rounded-full border border-white/5 flex items-center justify-center">
          {/* Center Vinyl Label bound to project.accent */}
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center relative shadow-inner border-2 border-black/40"
            style={{
              backgroundColor: project.accent,
              boxShadow: `0 0 24px ${project.accent}55`,
            }}
          >
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-black/80 mb-3">
              {project.releaseYear} LP
            </span>

            {/* Center Spindle Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#050507] border border-black/60 shadow-inner" />

            <span className="font-mono text-[7px] font-bold uppercase tracking-tighter text-black/80 mt-3">
              33⅓ RPM
            </span>
          </div>
        </div>
      </div>

      {/* 2. THE LP SLEEVE (Square .glass container in front) */}
      <div
        className="
          relative z-10 w-full h-full aspect-square
          glass rounded-xl p-6
          flex flex-col justify-between
          border border-white/15 group-hover:border-white/35
          transition-all duration-500 overflow-hidden
        "
        style={{
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75)",
        }}
      >
        {/* Subtle Corner Accent Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
          style={{ backgroundColor: project.accent }}
        />

        {/* Top Sleeve Liner Header (JetBrains Mono) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          <span>{project.trackNumber}</span>
          <span
            className="px-2 py-0.5 rounded border font-semibold"
            style={{
              borderColor: `${project.accent}66`,
              color: project.accent,
            }}
          >
            {project.releaseYear} • {project.bpm} BPM
          </span>
        </div>

        {/* Center Brutalist Album Typography (Syne) */}
        <div className="my-auto py-3 space-y-2">
          <div
            className="font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5"
            style={{ color: project.accent }}
          >
            <Disc3 className="w-3.5 h-3.5 group-hover:animate-spin" />
            <span>{project.genre}</span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white leading-none">
            {project.title}
          </h3>

          <p className="font-mono text-xs text-zinc-300 leading-snug pt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Tech-Stack Metadata (JetBrains Mono) */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-zinc-500">
            <span>STEREO MASTER // 180G</span>
            <span
              className="group-hover:translate-x-1 transition-transform font-semibold"
              style={{ color: project.accent }}
            >
              PULL WAX →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

