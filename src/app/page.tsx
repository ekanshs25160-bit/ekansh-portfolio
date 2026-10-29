"use client";

import { useEffect } from "react";
import {
  BookOpen,
  Cpu,
  Layers,
  Shuffle,
  Terminal,
} from "lucide-react";
import Scene from "@/components/canvas/Scene";
import Header from "@/components/dom/Header";
import DodgingPlayer from "@/components/dom/DodgingPlayer";
import AudioToggle from "@/components/dom/AudioToggle";
import GeniusAnnotation from "@/components/dom/GeniusAnnotation";
import Discography from "@/components/dom/Discography";
import { useAudioEngine, initAudio } from "@/hooks/useAudioEngine";
import { useLyricalEngine } from "@/hooks/useLyricalEngine";
import { useAppStore } from "@/store/useAppStore";
import { playlist } from "@/data/playlist";

export default function Home() {
  // Initialize Web Audio API 808 synthesizer hook
  useAudioEngine();

  const currentTrackIdx = useAppStore((state) => state.currentTrackIdx);
  const isPlaying = useAppStore((state) => state.isPlaying);
  const togglePlay = useAppStore((state) => state.togglePlay);
  const nextTrack = useAppStore((state) => state.nextTrack);

  const activeTrack = playlist[currentTrackIdx] || playlist[0];
  const { currentBar, shuffleBar } = useLyricalEngine();

  // Dynamically sync active artist theme --accent and --accent-glow to root CSS variables
  useEffect(() => {
    if (typeof document !== "undefined" && activeTrack) {
      document.documentElement.style.setProperty("--accent", activeTrack.accent);
      document.documentElement.style.setProperty(
        "--accent-glow",
        activeTrack.glow || "rgba(225, 29, 72, 0.45)"
      );
    }
  }, [activeTrack]);

  const handleToggleAudio = () => {
    initAudio();
    togglePlay();
  };

  const handleNextEra = () => {
    initAudio();
    nextTrack();
  };

  return (
    <>
      {/* 1. WebGL Liquid Background (z-0), Film Grain (z-[1]), and 3D Vinyl (z-[2]) */}
      <Scene colorA={activeTrack?.accent || "#E11D48"} colorB="#050507" />

      {/* 2. Floating Pill Header (z-50) */}
      <Header />

      {/* 3. Fixed Collision-Dodging Player (z-50) */}
      <DodgingPlayer />

      {/* 4. Fixed Bottom-Right Audio Synthesizer Toggle (z-50) */}
      <AudioToggle />

      {/* 5. Main Scrollable Flow (relative z-10 bg-transparent so WebGL liquid shines through) */}
      <main className="relative z-10 w-full bg-transparent text-[#F5F5F0] overflow-x-hidden">
        {/* SECTION 01: HERO (Text on Left, 3D Vinyl Framing on Right -> Player Dodges Right) */}
        <section
          data-player-side="right"
          className="relative min-h-screen bg-transparent flex items-center pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Kinetic Headline & Dynamic Bar Vault */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  SIDE A / CUT 0{currentTrackIdx + 1} — {activeTrack.bpm} BPM MASTER
                </div>

                <h1
                  id="hero-title"
                  className="thump-scale font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9] text-white origin-left"
                >
                  BUILT ON{" "}
                  <span
                    className="font-serif italic font-normal lowercase"
                    style={{ color: "var(--accent)" }}
                  >
                    808s
                  </span>
                  <br />
                  &amp; CLEAN CODE.
                </h1>
              </div>

              {/* Dynamic Bar Vault Card */}
              <div
                className="glass p-6 rounded-2xl max-w-xl border-l-4 space-y-3"
                style={{ borderLeftColor: "var(--accent)" }}
              >
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-400">
                  <span>DYNAMIC BAR VAULT // ACTIVE TRACK</span>
                  <button
                    type="button"
                    onClick={shuffleBar}
                    className="inline-flex items-center gap-1 underline hover:text-white transition-colors cursor-pointer"
                    style={{ color: "var(--accent)" }}
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>[SHUFFLE BAR ↻]</span>
                  </button>
                </div>

                <blockquote className="font-serif italic text-2xl sm:text-3xl text-white leading-snug">
                  &ldquo;{currentBar.quote}&rdquo;
                </blockquote>

                <p
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  — {currentBar.artist} {"//"} {currentBar.track} [{currentBar.era}]
                </p>
              </div>

              {/* Interactive Audio & Era Switch CTAs (from index.html demo) */}
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className="px-6 py-3.5 font-display font-bold uppercase tracking-wider bg-white text-black hover:opacity-90 transition shadow-xl cursor-pointer"
                >
                  {isPlaying
                    ? "⏸ Pause 808 Beat"
                    : "▶ Start 808 Beat & Liquid Reactive Mode"}
                </button>
                <button
                  type="button"
                  onClick={handleNextEra}
                  className="px-5 py-3.5 glass uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                >
                  Switch Artist Era ⏭
                </button>
              </div>

              {/* Technical Capability Pills */}
              <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
                <div className="flex items-center gap-2 px-3.5 py-2 glass rounded-lg text-zinc-200">
                  <Cpu className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span>Voice &amp; Local AI Agents</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 glass rounded-lg text-zinc-200">
                  <Layers className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span>Rust, Tauri &amp; Graph Intelligence</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 glass rounded-lg text-zinc-200">
                  <Terminal className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span>GLSL Shaders &amp; Web Audio 808s</span>
                </div>
              </div>
            </div>

            {/* Right Column: Framing Container for the R3F <Vinyl3D /> on the Canvas behind */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                id="vinyl-wrapper"
                onClick={handleNextEra}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleNextEra();
                }}
                aria-label="Switch Artist Era"
                className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center transition-transform duration-100 ease-out cursor-pointer"
              >
                {/* Reactive Outer Halo Behind the 3D R3F Vinyl */}
                <div
                  aria-hidden="true"
                  className="absolute inset-4 rounded-full blur-3xl opacity-35 transition-colors duration-500 pointer-events-none"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </div>
              <p className="text-[11px] font-mono text-zinc-400 mt-4 tracking-widest uppercase text-center">
                [MOVE MOUSE TO TILT 3D VINYL • CLICK DISC TO SWITCH ARTIST COLOR]
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 02: LINER NOTES (Text on Right -> Player Dodges Left) */}
        <section
          id="liner-notes"
          data-player-side="left"
          className="relative min-h-screen bg-transparent flex flex-col justify-center py-28 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <div id="contact" className="sr-only" />
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Dock Zone Indicator */}
            <div className="hidden lg:flex lg:col-span-4 flex-col justify-center text-xs font-mono text-zinc-400 border-l border-white/15 pl-6 space-y-2">
              <span
                className="uppercase tracking-widest font-bold"
                style={{ color: "var(--accent)" }}
              >
                ← PLAYER DOCK ZONE
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Notice how the collision-dodging player automatically glided to the left side
                because these liner notes live on the right.
              </p>
            </div>

            {/* Right-Aligned Liner Notes Card */}
            <div className="lg:col-span-8 glass rounded-3xl p-8 sm:p-12 space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-mono text-zinc-400 border-b border-white/10 pb-4">
                <span className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>02 // THE LINER NOTES (RIGHT-ALIGNED ROUTE)</span>
                </span>
                <span>RAJASTHAN ROOTS → SONIPAT STUDIO</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
                CRAFTING PRODUCTS LIKE{" "}
                <span
                  className="font-serif italic font-normal lowercase"
                  style={{ color: "var(--accent)" }}
                >
                  executive produced
                </span>{" "}
                ALBUMS.
              </h2>

              <div className="space-y-6 font-mono text-sm sm:text-base text-zinc-200 leading-relaxed">
                <p>
                  I engineer full-stack web applications, native desktop companions, and
                  autonomous AI agent architectures. Just like{" "}
                  <GeniusAnnotation
                    text="Seedhe Maut switching flows mid-verse"
                    barId="tbsm-2"
                  />
                  , I move between{" "}
                  <GeniusAnnotation
                    text="low-level Rust/Tauri bindings and glassmorphic Next.js interfaces"
                    barId="tbsm-1"
                  />{" "}
                  without dropping a frame.
                </p>

                <p>
                  Every system is built from first principles with{" "}
                  <GeniusAnnotation
                    text="relentless multi-syllable precision and zero boilerplate"
                    barId="krsna-1"
                  />{" "}
                  and{" "}
                  <GeniusAnnotation
                    text="late-night nocturnal obsession in the terminal"
                    barId="frank-1"
                  />
                  — turning raw ideas into{" "}
                  <GeniusAnnotation
                    text="high-octane shaders and graph intelligence engines"
                    barId="dontoliver-1"
                  />{" "}
                  that feel alive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: DISCOGRAPHY (Crate-Digging Vinyl Sleeves -> Player Dodges Right) */}
        <Discography />
      </main>
    </>
  );
}
