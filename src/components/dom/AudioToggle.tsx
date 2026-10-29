"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { playlist } from "@/data/playlist";
import { initAudio } from "@/hooks/useAudioEngine";

/**
 * Minimalist circular bottom-right Audio Toggle button.
 * Unlocks Web Audio API playback on user click, toggles global audio state,
 * and displays purely a crisp icon with dynamic theme accent glow on hover.
 */
export default function AudioToggle() {
  const isPlaying = useAppStore((state) => state.isPlaying);
  const togglePlay = useAppStore((state) => state.togglePlay);
  const currentTrackIdx = useAppStore((state) => state.currentTrackIdx);
  const currentTrack = playlist[currentTrackIdx] || playlist[0];

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    initAudio();
    togglePlay();
  };

  const accentColor = currentTrack.accent || "#E11D48";

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isPlaying ? "Mute audio" : "Enable audio"}
      className="fixed bottom-6 right-6 z-50 group w-12 h-12 rounded-full glass flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
      style={{
        border: `1px solid ${isHovered ? accentColor : "rgba(255, 255, 255, 0.12)"}`,
        boxShadow: isHovered
          ? `0 0 25px ${accentColor}40, 0 10px 30px rgba(0, 0, 0, 0.7)`
          : "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 transition-colors" style={{ color: accentColor }} />
      ) : (
        <VolumeX className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
      )}
    </button>
  );
}
