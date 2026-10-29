import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#050507",
          900: "#050507",
          800: "#0b0b0f",
          700: "#121218",
          600: "#1a1a24",
        },
        accent: "var(--accent, #FF462D)",
      },
      fontFamily: {
        // Brutalist structural face
        syne: ["var(--font-syne)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],

        // Strictly for lyrical hip-hop quotes
        serif: ["var(--font-instrument-serif)", "serif"],
        quote: ["var(--font-instrument-serif)", "serif"],

        // Body, metadata, and liner notes
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
