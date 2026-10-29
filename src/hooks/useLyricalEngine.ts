"use client";

import { useState, useEffect, useCallback } from "react";
import { barVault, type BarQuote } from "@/data/barVault";
import { playlist } from "@/data/playlist";
import { useAppStore } from "@/store/useAppStore";

function selectBarForEra(era?: string, excludeId?: string): BarQuote {
  const eraMatches = era
    ? barVault.filter(
        (b) => b.era.toLowerCase() === era.toLowerCase() && b.id !== excludeId
      )
    : [];

  if (eraMatches.length > 0) {
    const randomIndex = Math.floor(Math.random() * eraMatches.length);
    return eraMatches[randomIndex];
  }

  // Fallback to any matching era without exclusion, or entire vault excluding current
  const fallbackPool = barVault.filter((b) => b.id !== excludeId);
  const pool = fallbackPool.length > 0 ? fallbackPool : barVault;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * useLyricalEngine hook.
 * Connects to Zustand store's currentTrackIdx, maintains currentBar state,
 * and selects a bar matching the active track's era/vibe on track change or shuffle.
 */
export function useLyricalEngine() {
  const currentTrackIdx = useAppStore((state) => state.currentTrackIdx);
  const activeTrack = playlist[currentTrackIdx] || playlist[0];

  const [currentBar, setCurrentBar] = useState<BarQuote>(() => {
    const initialEra = playlist[0]?.era;
    const initialMatch = barVault.find((b) => b.era === initialEra);
    return initialMatch || barVault[0];
  });

  // Subscribe to store track changes to randomly select a bar matching the new track's era
  useEffect(() => {
    const unsubscribe = useAppStore.subscribe((state, prevState) => {
      if (state.currentTrackIdx !== prevState.currentTrackIdx) {
        const nextTrack = playlist[state.currentTrackIdx] || playlist[0];
        setCurrentBar((prev) => selectBarForEra(nextTrack?.era, prev.id));
      }
    });

    return () => unsubscribe();
  }, []);

  // Manual shuffle action: picks a fresh bar (prioritizing active era, or vault-wide if single era match)
  const shuffleBar = useCallback(() => {
    setCurrentBar((prev) => {
      const sameEraOther = barVault.filter(
        (b) =>
          b.era.toLowerCase() === activeTrack?.era?.toLowerCase() &&
          b.id !== prev.id
      );
      if (sameEraOther.length > 0) {
        return sameEraOther[Math.floor(Math.random() * sameEraOther.length)];
      }
      const otherBars = barVault.filter((b) => b.id !== prev.id);
      return otherBars[Math.floor(Math.random() * otherBars.length)] || barVault[0];
    });
  }, [activeTrack?.era]);

  return {
    currentBar,
    shuffleBar,
  };
}

