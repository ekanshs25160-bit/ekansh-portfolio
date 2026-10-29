export interface BarQuote {
  id: string;
  quote: string;
  artist: string;
  track: string;
  era: string;
  album?: string;
  year?: number;
  bpm?: number;
  annotation: string;
}

export const barVault: BarQuote[] = [
  {
    id: "tbsm-1",
    quote: "Kalam jale, dard dukhe, marham bane, aise hi nahi bante hum Nayaab.",
    artist: "Seedhe Maut",
    track: "Nayaab",
    era: "TBSM",
    album: "Nayaab",
    year: 2022,
    bpm: 144,
    annotation:
      "Code isn't just syntax — it's craft. Blending low-level Rust performance (Mochi) with high-art glassmorphic UI.",
  },
  {
    id: "tbsm-2",
    quote: "101 pe gaadi, bina brake ke chalein hum — khel khatam, beta ab Seedhe Maut.",
    artist: "Seedhe Maut",
    track: "101 // Namastute",
    era: "TBSM",
    album: "Single",
    year: 2021,
    bpm: 144,
    annotation:
      "High-velocity shipping: moving between low-level Rust/Tauri bindings and glassmorphic Next.js interfaces without dropping a frame.",
  },
  {
    id: "panther-1",
    quote: "Jahaan se hum aate, humne kismat likhi khud ke haath se — bina sifarish ke khada kiya samrajya.",
    artist: "Panther",
    track: "Galat Karam // UP Se",
    era: "TBSM",
    album: "Flying Towards The City",
    year: 2023,
    bpm: 136,
    annotation:
      "Grounded in Rajasthan roots & Sonipat studio builds — shipping open-source code and mastering systems from first principles.",
  },
  {
    id: "krsna-1",
    quote: "Likha maine khoon se, tu bole mera luck hai — shuru se hi alag, main bheed ka hissa nahi.",
    artist: "KR$NA",
    track: "Fall Off // Still Here",
    era: "DOLLAR SIGN",
    album: "Still Here",
    year: 2022,
    bpm: 150,
    annotation:
      "Zero boilerplate engineering: instead of generic CRUD clones, architecting custom MCP gateways, local voice AI agents (Jarvis), and graph fraud engines.",
  },
  {
    id: "krsna-2",
    quote: "Fourteen years in the game, still untouched with the pen — no cap in the code.",
    artist: "KR$NA",
    track: "No Cap",
    era: "DOLLAR SIGN",
    album: "Time Will Tell",
    year: 2023,
    bpm: 150,
    annotation:
      "Deterministic execution and type-safe rigor across the stack — zero hallucinations, verified tool-calling pipelines.",
  },
  {
    id: "dontoliver-1",
    quote: "I'm in the coupe with the stars in the roof, tearing it up on overdrive.",
    artist: "Don Toliver",
    track: "Tore Up",
    era: "PSYCHO",
    album: "Hardstone Psycho",
    year: 2024,
    bpm: 132,
    annotation:
      "High-octane synthesis: GPU-accelerated GLSL fragment shaders and Web Audio DSP pushing the browser rendering pipeline to full throttle.",
  },
  {
    id: "frank-1",
    quote: "Every night fucks every day up... Every day patches the night up.",
    artist: "Frank Ocean",
    track: "Nights",
    era: "BLONDE",
    album: "Blonde",
    year: 2016,
    bpm: 118,
    annotation:
      "Late-night commits in Sonipat: nocturnal deep-work sprints shipping patches that keep daytime production traffic effortless.",
  },
  {
    id: "kendrick-1",
    quote: "Reincarnated, I was stargazing — sit down, be humble, let the architecture speak.",
    artist: "Kendrick Lamar",
    track: "GNX // HUMBLE.",
    era: "CROWN / 6",
    album: "GNX",
    year: 2024,
    bpm: 138,
    annotation:
      "Systems thinking wired at the kernel level: balancing fault-tolerant chaos engineering with rock-solid uptime.",
  },
  {
    id: "drake-1",
    quote: "5 AM in the studio, telemetry numbers look like phone numbers.",
    artist: "Drake",
    track: "5 AM in Toronto",
    era: "CROWN / 6",
    album: "Timestamp Series",
    year: 2023,
    bpm: 138,
    annotation:
      "Iterative architecture refinement — observability, real-time fraud graph intelligence, and long-horizon agent planning.",
  },
];

export const BAR_VAULT = barVault;
