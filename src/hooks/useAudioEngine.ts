"use client";

import { useEffect, useCallback } from "react";
import { playlist } from "@/data/playlist";
import { useAppStore } from "@/store/useAppStore";

// Audio singleton module-level variables
let audioCtx: AudioContext | null = null;
let analyserNode: AnalyserNode | null = null;
let masterGain: GainNode | null = null;
let sequencerInterval: ReturnType<typeof setInterval> | null = null;

// Pre-allocated buffer for fftSize 64 (32 frequency bins)
const frequencyDataBuffer = new Uint8Array(32);

/**
 * 1. Lazily initializes the AudioContext and AnalyserNode (fftSize: 64)
 * only when the user first interacts with audio playback.
 */
export function initAudio(): { ctx: AudioContext; analyser: AnalyserNode } | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;

    audioCtx = new AudioContextClass();
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 64;
    analyserNode.smoothingTimeConstant = 0.8;

    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.85;

    analyserNode.connect(masterGain);
    masterGain.connect(audioCtx.destination);
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return { ctx: audioCtx, analyser: analyserNode! };
}

/**
 * 2. Synthesizes an 808 sub-bass kick:
 * - Sine wave OscillatorNode
 * - Rapid exponential pitch drop to simulate an 808 sub-bass
 * - Gain envelope with quick attack and 0.5s decay
 */
export function trigger808Kick(
  freq: number,
  ctx: AudioContext,
  analyser: AnalyserNode
): void {
  if (!ctx || ctx.state === "closed") return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";

  const root = freq > 0 ? freq : 55;

  // 808 pitch envelope drop (matching prototype demo)
  osc.frequency.setValueAtTime(root * 2.8, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, root), now + 0.09);
  osc.frequency.exponentialRampToValueAtTime(28, now + 0.45);

  // Gain envelope: quick attack, 0.5s decay
  gain.gain.setValueAtTime(0.95, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

  osc.connect(gain);
  gain.connect(analyser);

  osc.start(now);
  osc.stop(now + 0.5);

  osc.onended = () => {
    try {
      osc.disconnect();
      gain.disconnect();
    } catch {
      // ignore
    }
  };
}

/**
 * Synthesizes a crisp high-passed trap hi-hat on 8th-note steps.
 */
export function triggerHiHat(ctx: AudioContext, analyser: AnalyserNode): void {
  if (!ctx || ctx.state === "closed") return;

  const now = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 0.04);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 7000;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(analyser);

  noise.start(now);
}

/**
 * Stop any active 16-step grid interval sequencer.
 */
export function stopSequencer(): void {
  if (sequencerInterval !== null) {
    clearInterval(sequencerInterval);
    sequencerInterval = null;
  }
}

/**
 * 3. Starts 16-step grid sequencer firing 808 kicks on steps 1, 4, and 7 (and 9, 12, 15).
 */
export function startSequencer(bpm: number, rootFreq: number): void {
  stopSequencer();

  const audio = initAudio();
  if (!audio) return;

  const { ctx, analyser } = audio;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const intervalMs = (60 / Math.max(40, bpm) / 4) * 1000;
  let currentStep = 1;

  // Immediate downbeat attack for zero perceptible latency on play
  trigger808Kick(rootFreq, ctx, analyser);
  triggerHiHat(ctx, analyser);
  currentStep = 2;

  sequencerInterval = setInterval(() => {
    if (audioCtx && audioCtx.state === "running") {
      // Fire 808 kick on steps 1, 4, and 7 of the grid (plus second half-bar 9, 12, 15)
      if (
        currentStep === 1 ||
        currentStep === 4 ||
        currentStep === 7 ||
        currentStep === 9 ||
        currentStep === 12 ||
        currentStep === 15
      ) {
        trigger808Kick(rootFreq, ctx, analyser);
      }
      // Crisp hi-hat on odd 16th steps (8th notes)
      if (currentStep % 2 === 1) {
        triggerHiHat(ctx, analyser);
      }
    }
    currentStep = (currentStep % 16) + 1;
  }, intervalMs);
}

/**
 * 4. Extracts bass amplitude for WebGL shader uniforms.
 * Averages the lowest 3 frequency bins and normalizes to 0.0 - 1.0.
 * Returns 0 if audio is suspended or paused.
 */
export function getBassData(): number {
  if (
    !analyserNode ||
    !audioCtx ||
    audioCtx.state !== "running" ||
    !useAppStore.getState().isPlaying
  ) {
    return 0;
  }

  analyserNode.getByteFrequencyData(frequencyDataBuffer);

  // Average the lowest 3 bins
  const b0 = frequencyDataBuffer[0] || 0;
  const b1 = frequencyDataBuffer[1] || 0;
  const b2 = frequencyDataBuffer[2] || 0;
  const avg = (b0 + b1 + b2) / 3;

  return Math.min(1.0, Math.max(0.0, avg / 255));
}

/**
 * Returns 12 normalized frequency values (0.0 - 1.0) for the live EQ visualizer bars.
 */
export function getEqBarLevels(): number[] {
  if (
    !analyserNode ||
    !audioCtx ||
    audioCtx.state !== "running" ||
    !useAppStore.getState().isPlaying
  ) {
    return [0.15, 0.22, 0.15, 0.3, 0.15, 0.22, 0.15, 0.35, 0.15, 0.22, 0.15, 0.28];
  }

  analyserNode.getByteFrequencyData(frequencyDataBuffer);
  const bars: number[] = [];
  for (let i = 0; i < 12; i++) {
    bars.push((frequencyDataBuffer[i] || 0) / 255);
  }
  return bars;
}

/**
 * Web Audio Synthesizer Hook
 * Binds global Zustand audio state to Web Audio lifecycle and playback.
 */
export function useAudioEngine() {
  const isPlaying = useAppStore((s) => s.isPlaying);
  const currentTrackIdx = useAppStore((s) => s.currentTrackIdx);
  const togglePlay = useAppStore((s) => s.togglePlay);
  const nextTrack = useAppStore((s) => s.nextTrack);
  const prevTrack = useAppStore((s) => s.prevTrack);

  const currentTrack = playlist[currentTrackIdx] || playlist[0];

  // Master volume control helper
  const setVolume = useCallback((level: number) => {
    if (masterGain) {
      masterGain.gain.value = Math.max(0, Math.min(1, level));
    }
  }, []);

  // Sync playback state with the Web Audio sequencer
  useEffect(() => {
    if (isPlaying) {
      startSequencer(currentTrack.bpm, currentTrack.rootFreq);
    } else {
      stopSequencer();
    }
  }, [isPlaying, currentTrackIdx, currentTrack.bpm, currentTrack.rootFreq]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      stopSequencer();
    };
  }, []);

  return {
    isPlaying,
    currentTrackIdx,
    currentTrack,
    volume: masterGain ? masterGain.gain.value : 0.85,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    initAudio,
    getBassData,
    getEqBarLevels,
    startSequencer,
    stopSequencer,
  };
}
