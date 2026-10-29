"use client";

import { Radio, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectSleeve from "@/components/dom/ProjectSleeve";

/**
 * Discography component (Phase 5).
 * Crate-digging vinyl catalog mapping through `projects.ts` in a `grid-cols-1 md:grid-cols-2` layout.
 * Pairs each physical `<ProjectSleeve />` with its engineering liner notes and dynamic hip-hop quote.
 */
export default function Discography() {
  return (
    <section
      id="discography"
      data-player-side="right"
      className="relative min-h-screen py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 bg-transparent"
    >
      <div className="w-full md:max-w-[68%] mr-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div
              className="font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2"
              style={{ color: "var(--accent)" }}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>EXECUTIVE DISCOGRAPHY // CRATE DIGGING</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
              PRESSED ON <br />
              <span className="text-zinc-500">180G VINYL SLEEVES</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-zinc-400 max-w-sm leading-relaxed">
            Hover over each record sleeve to pull the vinyl from its jacket.
            Engineered for low latency, native performance, and zero-drift execution.
          </p>
        </div>

        {/* Responsive 2-Column Crate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-14">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between space-y-6"
            >
              {/* Physical LP Sleeve + Sliding Vinyl Disc */}
              <div className="pr-12 sm:pr-16">
                <ProjectSleeve project={project} />
              </div>

              {/* Contextual Description & Dynamic Hip-Hop Quote */}
              <div className="glass rounded-xl p-6 space-y-4 border border-white/10">
                <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                  <span>
                    {project.role} • {project.releaseYear}
                  </span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white hover:text-[var(--accent)] transition-colors"
                    >
                      <span>SOURCE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Dynamic Hip-Hop Quote Callout */}
                <div
                  className="border-l-2 pl-4 py-1.5 space-y-1 bg-white/[0.02] rounded-r-lg"
                  style={{ borderLeftColor: project.accent }}
                >
                  <p className="font-serif italic text-base sm:text-lg text-white leading-snug">
                    &ldquo;{project.barQuote}&rdquo;
                  </p>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    — {project.barArtist}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
