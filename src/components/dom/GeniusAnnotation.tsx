"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";
import { barVault } from "@/data/barVault";

export interface GeniusAnnotationProps {
  text: string;
  barId: string;
}

/**
 * GeniusAnnotation component (Phase 4).
 * Inline interactive phrase wrapper with a var(--accent) bottom border.
 * Reveals a frosted-glass "Verified Annotation" tooltip card on hover via GSAP,
 * displaying the matched Hip-Hop quote in Instrument Serif italics.
 */
export default function GeniusAnnotation({
  text,
  barId,
}: GeniusAnnotationProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const matchedBar =
    barVault.find((bar) => bar.id === barId) || barVault[0];

  const handleMouseEnter = () => {
    if (!tooltipRef.current) return;
    gsap.killTweensOf(tooltipRef.current);
    gsap.to(tooltipRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.32,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!tooltipRef.current) return;
    gsap.killTweensOf(tooltipRef.current);
    gsap.to(tooltipRef.current, {
      autoAlpha: 0,
      y: 8,
      scale: 0.96,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      className="relative inline-block group cursor-pointer focus:outline-none"
    >
      {/* Highlighted Bio Phrase */}
      <span
        className="border-b-2 px-1.5 py-0.5 rounded-t-sm text-zinc-100 font-medium transition-colors duration-200 bg-white/[0.04] group-hover:bg-white/[0.12]"
        style={{ borderBottomColor: "var(--accent)" }}
      >
        {text}
      </span>

      {/* Frosted-Glass GSAP Verified Annotation Tooltip Card */}
      <span
        ref={tooltipRef}
        role="tooltip"
        style={{
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(8px) scale(0.96)",
          borderColor: "var(--accent)",
        }}
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 sm:w-96 p-4 rounded-xl glass border z-50 text-left shadow-2xl block"
      >
        {/* Verified Header */}
        <span className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 font-mono text-[10px] uppercase tracking-widest">
          <span
            className="inline-flex items-center gap-1.5 font-semibold"
            style={{ color: "var(--accent)" }}
          >
            <Sparkles className="w-3 h-3" />
            <span>VERIFIED ANNOTATION</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 text-[9px]">
            {matchedBar.era}
          </span>
        </span>

        {/* Hip-Hop Quote in Instrument Serif Italics */}
        <span className="block font-serif italic text-lg sm:text-xl text-white leading-snug my-2">
          &ldquo;{matchedBar.quote}&rdquo;
        </span>

        {/* Artist & Track Attribution */}
        <span className="block font-mono text-[11px] text-zinc-400 mb-2.5">
          — {matchedBar.artist}, <span className="text-zinc-200">&ldquo;{matchedBar.track}&rdquo;</span>
        </span>

        {/* Engineering Ethos Parallel */}
        <span className="block pt-2 border-t border-white/10 font-mono text-xs text-zinc-300 leading-relaxed">
          {matchedBar.annotation}
        </span>
      </span>
    </span>
  );
}

