export interface Track {
  id?: string;
  title: string;
  artist: string;
  era: string;
  bpm: number;
  rootFreq: number; // e.g. 55 for A1 sub bass
  accent: string;   // hex string e.g. "#E11D48"
  glow: string;     // rgba glow string for glass hover
  accentColor?: string; // backwards compatibility alias for accent
  colorA: [number, number, number]; // WebGL vec3 RGB 0-1
  colorB: [number, number, number]; // WebGL vec3 RGB 0-1
  duration?: string;
  linerNote?: string;
}

export type TrackTheme = Track;

export const playlist: Track[] = [
  {
    id: "era-01",
    title: "NAYAAB // KHATTA FLOW",
    artist: "SEEDHE MAUT FT. KR$NA",
    era: "TBSM",
    bpm: 144,
    rootFreq: 55, // A1 sub bass
    accent: "#E11D48",
    glow: "rgba(225, 29, 72, 0.45)",
    accentColor: "#E11D48",
    colorA: [0.88, 0.11, 0.28], // Crimson
    colorB: [0.06, 0.02, 0.05], // Obsidian Red
    duration: "02:54",
    linerNote: "Twin-engine multi-agent orchestration. Unrelenting cadence and razor-sharp execution.",
  },
  {
    id: "era-02",
    title: "HARDSTONE PSYCHO // TORE UP",
    artist: "DON TOLIVER",
    era: "PSYCHO",
    bpm: 132,
    rootFreq: 49, // G1 sub bass
    accent: "#A855F7",
    glow: "rgba(168, 85, 247, 0.45)",
    accentColor: "#A855F7",
    colorA: [0.66, 0.33, 0.97], // Ultraviolet
    colorB: [0.05, 0.02, 0.12], // Deep Indigo
    duration: "03:18",
    linerNote: "Psychedelic trap distortion and native Rust/Tauri overlays running at full throttle.",
  },
  {
    id: "era-03",
    title: "BLONDE // NIGHTS (BEAT SWITCH)",
    artist: "FRANK OCEAN",
    era: "BLONDE",
    bpm: 118,
    rootFreq: 65.4, // C2 warm bass
    accent: "#22C55E",
    glow: "rgba(34, 197, 94, 0.42)",
    accentColor: "#22C55E",
    colorA: [0.13, 0.77, 0.37], // Acid Green
    colorB: [0.12, 0.06, 0.02], // Warm Sunset
    duration: "05:07",
    linerNote: "Late-night shader synthesis and state transitions shifting seamlessly on the beat switch.",
  },
  {
    id: "era-04",
    title: "STILL HERE // FALL OFF",
    artist: "KR$NA",
    era: "DOLLAR SIGN",
    bpm: 150,
    rootFreq: 58.2, // A#1 sub bass
    accent: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.42)",
    accentColor: "#38BDF8",
    colorA: [0.22, 0.74, 0.97], // Ice Cyan
    colorB: [0.02, 0.05, 0.10], // Midnight
    duration: "03:12",
    linerNote: "Cold, calculated algorithmic complexity. Multi-syllabic architecture with zero latency.",
  },
  {
    id: "era-05",
    title: "GNX // 5 AM IN TORONTO",
    artist: "KENDRICK LAMAR & DRAKE",
    era: "CROWN / 6",
    bpm: 138,
    rootFreq: 51.9, // G#1 sub bass
    accent: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.42)",
    accentColor: "#F59E0B",
    colorA: [0.96, 0.62, 0.04], // Champagne Gold
    colorB: [0.10, 0.03, 0.02], // Blood Red
    duration: "04:10",
    linerNote: "High-cadence 138 BPM telemetry. Raw subterranean sub drops rattling the viewport.",
  },
];

export const PLAYLIST = playlist;
