"use client";

import { useSyncExternalStore, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import LiquidBackground from "./LiquidBackground";
import Vinyl3D from "./Vinyl3D";
import * as THREE from "three";

interface SceneProps {
  children?: ReactNode;
  thump?: number;
  colorA?: string | THREE.Color;
  colorB?: string | THREE.Color;
  className?: string;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Scene component wrapper.
 * - Renders <LiquidBackground /> at fixed inset-0 z-0 (plus <NoiseOverlay /> at z-[1])
 * - Renders transparent R3F <Canvas> at z-[2] for interactive 3D elements (<Vinyl3D />)
 * - Never uses negative z-index or opaque background classes that would hide the shader
 */
export default function Scene({
  children,
  className = "",
}: SceneProps) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <>
      {/* 1. Bulletproof Full-Screen Clip-Space WebGL Liquid Shader (z-0) + Film Grain (z-[1]) */}
      <LiquidBackground />

      {/* 2. Transparent R3F 3D Layer (z-[2]) for the interactive 3D Vinyl */}
      {!prefersReducedMotion && isMounted && (
        <div
          className={`fixed inset-0 z-[2] w-screen h-screen pointer-events-none overflow-hidden bg-transparent ${className}`}
          aria-hidden="true"
        >
          <Canvas
            dpr={[1, 2]}
            gl={{
              powerPreference: "high-performance",
              alpha: true,
              premultipliedAlpha: false,
            }}
            style={{ background: "transparent" }}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <Vinyl3D />
            {children}
          </Canvas>
        </div>
      )}
    </>
  );
}
