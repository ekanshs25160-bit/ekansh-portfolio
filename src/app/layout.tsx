import type { Metadata } from "next";
import { Syne, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EKAN$H // AUDIO-REACTIVE LIQUID VINYL LP",
  description:
    "Executive-produced interactive portfolio for Ekansh Shrotriya (Full-Stack & AI Agent Architect). Built on 808s, GLSL domain-warping liquid shaders, and clean code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#050507] text-[#F5F5F0] antialiased selection:bg-[var(--accent)] selection:text-black min-h-screen overflow-x-hidden">
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
