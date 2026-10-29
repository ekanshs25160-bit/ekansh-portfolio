"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { playlist } from "@/data/playlist";
import { useScrollDodge } from "@/hooks/useScrollDodge";
import { initAudio } from "@/hooks/useAudioEngine";

/**
 * Minimalist Spotify-style Collision-Dodging Player.
 * - Hardware-accelerated GSAP x transform with `force3D: true` and `expo.out` easing.
 * - Left-0 CSS anchor with smooth 60fps translation dodging content.
 * - Compact horizontal glass pill with mini-vinyl art, track info, and SVG controls.
 */
export default function DodgingPlayer() {
  const playerRef = useRef<HTMLElement>(null);

  const currentTrackIdx = useAppStore((state) => state.currentTrackIdx);
  const isPlaying = useAppStore((state) => state.isPlaying);
  const togglePlay = useAppStore((state) => state.togglePlay);
  const nextTrack = useAppStore((state) => state.nextTrack);
  const prevTrack = useAppStore((state) => state.prevTrack);

  const { safeSide } = useScrollDodge(playerRef);
  const activeTrack = playlist[currentTrackIdx] || playlist[0];

  // Hardware-accelerated GSAP translation along x-axis
  useEffect(() => {
    if (!playerRef.current || typeof window === "undefined") return;

    const calculateX = (side: "left" | "right") => {
      const playerWidth = playerRef.current?.offsetWidth || 340;
      return side === "right" ? window.innerWidth - playerWidth - 24 : 24;
    };

    gsap.to(playerRef.current, {
      x: calculateX(safeSide),
      yPercent: -50,
      duration: 0.8,
      ease: "expo.out",
      force3D: true,
      overwrite: "auto",
    });

    const handleResize = () => {
      if (!playerRef.current) return;
      gsap.to(playerRef.current, {
        x: calculateX(safeSide),
        yPercent: -50,
        duration: 0.3,
        ease: "expo.out",
        force3D: true,
        overwrite: "auto",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [safeSide]);

  const handleTogglePlay = () => {
    initAudio();
    togglePlay();
  };

  const handleNextTrack = () => {
    initAudio();
    nextTrack();
  };

  const handlePrevTrack = () => {
    initAudio();
    prevTrack();
  };

  return (
    <aside
      ref={playerRef}
      id="dodge-player"
      aria-label="Floating Audio Player"
      style={{ transform: "translate3d(calc(100vw - 364px), -50%, 0)" }}
      className="fixed top-1/2 left-0 z-50 hidden md:flex items-center p-2 pr-6 rounded-full bg-[#050507]/60 backdrop-blur-xl border border-white/10 shadow-2xl glass max-w-sm select-none"
    >
      {/* Left: Album Art / Mini Vinyl */}
      <div
        className={`w-12 h-12 flex-shrink-0 rounded-full vinyl-grooves border border-white/15 flex items-center justify-center shadow-md ${
          isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
        }`}
      >
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500 shadow-inner"
          style={{ backgroundColor: activeTrack.accent }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#050507]" />
        </div>
      </div>

      {/* Center: Track Info */}
      <div className="flex flex-col ml-3 mr-8 min-w-[120px] max-w-[150px]">
        <span
          className="text-sm font-bold text-white truncate max-w-[140px]"
          title={activeTrack.title}
        >
          {activeTrack.title}
        </span>
        <span
          className="text-xs text-zinc-400 truncate max-w-[140px]"
          title={activeTrack.artist}
        >
          {activeTrack.artist}
        </span>
      </div>

      {/* Right: Playback Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handlePrevTrack}
          aria-label="Previous Track"
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="text-white hover:scale-105 transition-transform cursor-pointer"
        >
          {isPlaying ? (
            <Pause fill="currentColor" size={20} />
          ) : (
            <Play fill="currentColor" size={20} />
          )}
        </button>
        <button
          type="button"
          onClick={handleNextTrack}
          aria-label="Next Track"
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </aside>
  );
}
