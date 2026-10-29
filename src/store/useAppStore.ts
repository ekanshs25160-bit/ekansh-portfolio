import { create } from "zustand";
import { playlist } from "@/data/playlist";

export interface AppState {
  isPlaying: boolean;
  currentTrackIdx: number;
  togglePlay: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setCurrentTrackIdx: (idx: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isPlaying: false,
  currentTrackIdx: 0,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  nextTrack: () =>
    set((state) => ({
      currentTrackIdx: (state.currentTrackIdx + 1) % playlist.length,
    })),
  prevTrack: () =>
    set((state) => ({
      currentTrackIdx: (state.currentTrackIdx - 1 + playlist.length) % playlist.length,
    })),
  setCurrentTrackIdx: (idx: number) =>
    set({
      currentTrackIdx: Math.max(0, Math.min(playlist.length - 1, idx)),
    }),
}));

