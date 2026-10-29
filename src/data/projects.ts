export interface ProjectMetadata {
  id: string;
  title: string;
  subtitle: string;
  trackNumber: string;
  role: string;
  releaseYear: number;
  year: string;
  bpm: number;
  genre: string;
  description: string;
  accent: string;
  accentColor: string;
  tags: string[];
  barQuote: string;
  barArtist: string;
  linerNotes: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: ProjectMetadata[] = [
  {
    id: "jarvis",
    title: "JARVIS",
    subtitle: "Voice-Controlled Local AI Assistant",
    trackNumber: "SIDE A — CUT 01",
    role: "Lead AI & Systems Architect",
    releaseYear: 2026,
    year: "2026",
    bpm: 138,
    genre: "Autonomous Local Voice & MCP Agent",
    description:
      "Voice-Controlled Local AI Assistant powered by faster-whisper for sub-second speech recognition, Kokoro TTS neural synthesis, and deep MCP Antigravity tool orchestration.",
    accent: "#F43F5E", // Rose
    accentColor: "#F43F5E",
    tags: ["faster-whisper", "Kokoro TTS", "MCP Antigravity", "Python", "Local LLM"],
    barQuote: "Bina mic ke bhi aawaz goonje — zero-latency voice telemetry.",
    barArtist: "Seedhe Maut // TBSM Cadence",
    linerNotes: [
      "Real-time local ASR via faster-whisper with zero cloud round-trip.",
      "Expressive low-latency neural speech synthesis using Kokoro TTS.",
      "Native Model Context Protocol (MCP Antigravity) autonomous system execution.",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
  },
  {
    id: "mochi",
    title: "MOCHI",
    subtitle: "Transparent macOS Desktop Companion",
    trackNumber: "SIDE A — CUT 02",
    role: "Systems & Native UI Engineer",
    releaseYear: 2026,
    year: "2026",
    bpm: 124,
    genre: "Native Rust & Tauri Desktop Engine",
    description:
      "Transparent macOS Desktop Companion engineered in Rust and Tauri with custom pixel physics, click-through window masking, and sub-1% idle CPU footprint.",
    accent: "#A855F7", // Purple
    accentColor: "#A855F7",
    tags: ["Rust", "Tauri", "Custom Pixel Physics", "macOS CoreGraphics", "TypeScript"],
    barQuote: "Floating weightless on the glass — every pixel obeys the physics.",
    barArtist: "Frank Ocean // Blonde State",
    linerNotes: [
      "Native transparent macOS overlay with dynamic cursor hit-testing.",
      "Custom deterministic 60FPS Verlets & pixel physics simulation in Rust.",
      "Memory-safe IPC bridge between Tauri core and reactive sprite canvas.",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
  },
  {
    id: "indiestream",
    title: "INDIESTREAM",
    subtitle: "Adaptive Glassmorphic Music Streaming",
    trackNumber: "SIDE B — CUT 01",
    role: "Creative Technologist & Audio Engineer",
    releaseYear: 2026,
    year: "2026",
    bpm: 112,
    genre: "Chromatic DSP & Audio Streaming Deck",
    description:
      "Adaptive Glassmorphic Music Streaming platform that extracts real-time color palettes from album art to dynamically drive ambient shaders and lossless audio queues.",
    accent: "#10B981", // Emerald
    accentColor: "#10B981",
    tags: ["Web Audio API", "Real-Time Palette Extraction", "Next.js", "GLSL", "Tailwind"],
    barQuote: "Every color bleeds into the rhythm when the needle hits the wax.",
    barArtist: "Don Toliver // Hardstone Fidelity",
    linerNotes: [
      "Quantized k-means color extraction from cover art in Web Workers.",
      "Seamless glassmorphic UI theme morphing tied to track transitions.",
      "Gapless Web Audio buffer scheduling with custom EQ spectrum visualizers.",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
  },
  {
    id: "boomerang",
    title: "BOOMERANG",
    subtitle: "AI Return Abuse & Fraud Ring Engine",
    trackNumber: "SIDE B — CUT 02",
    role: "Graph Intelligence & Full-Stack Architect",
    releaseYear: 2026,
    year: "2026",
    bpm: 144,
    genre: "Graph Fraud Intelligence & Risk Engine",
    description:
      "AI Return Abuse & Fraud Ring Engine combining React and Python with Graph Fraud Intelligence to expose coordinated syndicate networks and anomalous return loops in real time.",
    accent: "#F59E0B", // Amber
    accentColor: "#F59E0B",
    tags: ["React", "Python", "Graph Fraud Intelligence", "NetworkX", "FastAPI"],
    barQuote: "Numbers don't lie when the beat drops — every node in the ring exposed.",
    barArtist: "KR$NA // Dollar Sign Precision",
    linerNotes: [
      "Multi-hop entity resolution detecting collusive return fraud rings.",
      "Real-time anomaly scoring pipeline written in Python & FastAPI.",
      "Interactive force-directed graph investigation console in React.",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
  },
];

export const PROJECTS = projects;
