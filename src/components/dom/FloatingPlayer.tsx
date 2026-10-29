"use client";

import { useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Disc } from "lucide-react";
import { type TrackTheme } from "@/data/playlist";
import { useScrollDodge } from "@/hooks/useScrollDodge";

interface FloatingPlayerProps {
  track: TrackTheme;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

/**
 * FloatingPlayer component.
 * Features Brutalist audio hardware aesthetics and dodges collisions
 * with heavy typography or interactive data zones via useScrollDodge.
 */
export default function FloatingPlayer({
  track,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  volume,
  onVolumeChange,
}: FloatingPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const { position, isDodging } = useScrollDodge(playerRef);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-24 right-6",
    minimized: "bottom-6 right-6 scale-90 opacity-60",
  }[position];

  return (
    <aside
      ref={playerRef}
      aria-label="Floating Audio Master Player"
      className={`fixed ${positionClasses} z-40 transition-all duration-500 ease-out`}
    >
      <div
        className={`bg-obsidian/95 border ${
          isDodging ? "border-[var(--accent)] shadow-[0_0_25px_rgba(255,70,45,0.3)]" : "border-zinc-800"
        } backdrop-blur-xl p-4 sm:p-5 w-80 sm:w-96 text-white shadow-2xl transition-colors duration-300`}
      >
        {/* Top Header & Dodge Alert */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-900 font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
          <div className="flex items-center gap-1.5">
            <Disc className={`w-3.5 h-3.5 text-[var(--accent)] ${isPlaying ? "animate-spin" : ""}`} />
            <span>STEREO MASTER DECK</span>
          </div>
          <div className="flex items-center gap-2">
            {isDodging && <span className="text-[var(--accent)] animate-pulse">DODGE ACTIVE</span>}
            <span className="px-1.5 py-0.5 border border-zinc-800 text-zinc-400">
              {track.bpm} BPM
            </span>
          </div>
        </div>

        {/* Track Title & Artist */}
        <div className="py-3 flex items-center justify-between gap-4">
          <div className="overflow-hidden">
            <h4 className="font-display font-extrabold text-sm sm:text-base tracking-tight truncate">
              {track.title}
            </h4>
            <p className="font-mono text-xs text-zinc-400 truncate">{track.artist}</p>
          </div>

          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: track.accent || track.accentColor }}
            title={`Artist Theme: ${track.accent || track.accentColor}`}
          />
        </div>

        {/* Progress Bar (Scaffold) */}
        <div className="w-full bg-zinc-900 h-1 relative overflow-hidden mb-4">
          <div
            className={`h-full bg-[var(--accent)] transition-all duration-300 ${
              isPlaying ? "w-2/3" : "w-1/4"
            }`}
          />
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous Track"
              className="p-2 border border-zinc-900 hover:border-zinc-700 hover:text-white text-zinc-400 transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? "Pause Track" : "Play Track"}
              className="p-2.5 bg-[var(--accent)] text-black hover:scale-105 active:scale-95 font-bold transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next Track"
              className="p-2 border border-zinc-900 hover:border-zinc-700 hover:text-white text-zinc-400 transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              aria-label="Master Volume"
              className="w-16 accent-[var(--accent)] h-1 bg-zinc-800 rounded-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
