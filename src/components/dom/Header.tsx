"use client";

import Link from "next/link";

interface HeaderProps {
  currentTrackTitle?: string;
  bpm?: number;
}

/**
 * Floating glassmorphic pill header.
 * Centered top-6 pill containing Ekansh's core identity and role.
 */
export default function Header({}: HeaderProps = {}) {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl rounded-full bg-[#050507]/40 backdrop-blur-xl border border-white/10 shadow-2xl px-6 py-3 flex justify-between items-center transition-all duration-300">
      {/* LEFT: Identity */}
      <Link href="/" className="flex items-center group">
        <span className="font-display font-extrabold text-lg sm:text-xl tracking-tighter text-white group-hover:text-zinc-200 transition-colors">
          EKAN<span style={{ color: "var(--accent)" }}>$</span>H
        </span>
      </Link>

      {/* RIGHT: Core Info */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase hidden sm:block">
          AI &amp; Full-Stack Architect
        </span>
        <span className="hidden sm:block text-zinc-600">|</span>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase hidden md:block">
          SONIPAT, IN
        </span>
        <span className="hidden md:block text-zinc-600">|</span>
        <a
          href="#contact"
          className="text-[10px] font-mono tracking-widest uppercase text-white hover:text-[var(--accent)] transition-colors"
        >
          [ Contact ]
        </a>
      </div>
    </header>
  );
}
