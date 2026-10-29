"use client";

import { useState, useEffect, RefObject } from "react";

export type SafeSide = "left" | "right";
export type DodgePosition = "bottom-right" | "bottom-left" | "top-right" | "minimized";

/**
 * useScrollDodge hook.
 * Instantiates an IntersectionObserver watching all DOM elements with [data-player-side].
 * Detects whether the active visible section requests the player to dock 'left' or 'right'.
 */
export function useScrollDodge(_playerRef?: RefObject<HTMLElement | null>) {
  void _playerRef;
  const [safeSide, setSafeSide] = useState<SafeSide>("right");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-player-side]")
    );
    if (sections.length === 0) return;

    // Initial check on mount before any scroll event occurs
    const updateFromCurrentScroll = () => {
      const centerY = window.innerHeight * 0.5;
      let closestSection: HTMLElement | null = null;
      let closestDistance = Infinity;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom >= centerY) {
          closestSection = section;
          break;
        }
        const dist = Math.abs((rect.top + rect.bottom) / 2 - centerY);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestSection = section;
        }
      }

      if (closestSection) {
        const sideAttr = closestSection.getAttribute("data-player-side");
        if (sideAttr === "left" || sideAttr === "right") {
          setSafeSide(sideAttr);
        }
      }
    };

    updateFromCurrentScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const sideAttr = visible[0].target.getAttribute("data-player-side");
          if (sideAttr === "left" || sideAttr === "right") {
            setSafeSide(sideAttr);
          }
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, []);

  const position: DodgePosition = safeSide === "right" ? "bottom-right" : "bottom-left";

  return {
    safeSide,
    position,
    isDodging: safeSide === "left",
  };
}
