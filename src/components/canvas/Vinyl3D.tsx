"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";
import { playlist } from "@/data/playlist";

/**
 * Generates a procedural radial groove bump/roughness texture on an HTML5 canvas
 * to give the 3D vinyl cylinder realistic concentric micro-grooves.
 */
function createVinylGrooveTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const center = size / 2;
  ctx.fillStyle = "#08080c";
  ctx.fillRect(0, 0, size, size);

  // Draw concentric micro-grooves from label edge to outer rim
  for (let r = 175; r < 495; r += 2) {
    const shade = r % 6 === 0 ? 42 : r % 4 === 0 ? 28 : 16;
    ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade + 4})`;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Vinyl3D component (Phase 5).
 * Interactive 3D Vinyl Record in React Three Fiber:
 * - <cylinderGeometry args={[2, 2, 0.05, 64]} /> with dark specular material & radial grooves
 * - Raised center label bound to playlist[currentTrackIdx].accent
 * - Continuous Y-axis spin when isPlaying is true
 * - Smoothed X and Z parallax cursor tilt via THREE.MathUtils.damp()
 */
export default function Vinyl3D() {
  const tiltGroupRef = useRef<THREE.Group>(null);
  const spinGroupRef = useRef<THREE.Group>(null);

  const isPlaying = useAppStore((state) => state.isPlaying);
  const currentTrackIdx = useAppStore((state) => state.currentTrackIdx);
  const activeTrack = playlist[currentTrackIdx] || playlist[0];

  // Fallback global pointer tracker in case canvas container is pointer-events-none
  const windowPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      windowPointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      windowPointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const grooveTexture = useMemo(() => createVinylGrooveTexture(), []);

  useFrame((state, delta) => {
    // 1. Spin: continuously rotate vinyl on its Y-axis when playing
    if (spinGroupRef.current && isPlaying) {
      spinGroupRef.current.rotation.y += delta * 1.6;
    }

    // 2. Parallax Tilt: smooth damp X and Z axes based on normalized pointer coordinates
    if (tiltGroupRef.current) {
      const pointerX =
        state.pointer.x !== 0 || state.pointer.y !== 0
          ? state.pointer.x
          : windowPointerRef.current.x;
      const pointerY =
        state.pointer.x !== 0 || state.pointer.y !== 0
          ? state.pointer.y
          : windowPointerRef.current.y;

      // Base tilt so the record faces the camera at a dramatic 3/4 studio angle
      const baseRotX = 1.05;
      const baseRotZ = -0.22;

      const targetX = baseRotX - pointerY * 0.28;
      const targetZ = baseRotZ - pointerX * 0.28;

      tiltGroupRef.current.rotation.x = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.x,
        targetX,
        4,
        delta
      );
      tiltGroupRef.current.rotation.z = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.z,
        targetZ,
        4,
        delta
      );
    }
  });

  return (
    <group position={[1.15, 0.1, 0]}>
      {/* Studio Specular Lighting for the Vinyl Grooves */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#ffffff" />
      <pointLight
        position={[-3, 2, 4]}
        intensity={2.0}
        color={activeTrack.accent}
      />
      <pointLight position={[2, -3, 3]} intensity={0.9} color="#ffffff" />

      {/* Parallax Tilt Group */}
      <group ref={tiltGroupRef} rotation={[1.05, 0, -0.22]} scale={0.78}>
        {/* Y-Axis Spin Group */}
        <group ref={spinGroupRef}>
          {/* 1. Main 3D Vinyl Record Disc */}
          <mesh>
            <cylinderGeometry args={[2, 2, 0.05, 64]} />
            <meshStandardMaterial
              color="#08080c"
              roughness={0.22}
              metalness={0.88}
              bumpMap={grooveTexture ?? undefined}
              bumpScale={0.018}
            />
          </mesh>

          {/* Subtle Outer Bevel / Lead-in Rim */}
          <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.92, 1.99, 64]} />
            <meshStandardMaterial
              color="#1c1c26"
              roughness={0.15}
              metalness={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* 3. Slightly Raised Center Label bound to playlist[currentTrackIdx].accent */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.68, 0.68, 0.062, 64]} />
            <meshStandardMaterial
              color={activeTrack.accent}
              roughness={0.42}
              metalness={0.18}
              emissive={activeTrack.accent}
              emissiveIntensity={0.12}
            />
          </mesh>

          {/* Inner Label Ring Detail */}
          <mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.42, 0.45, 64]} />
            <meshBasicMaterial color="#050507" side={THREE.DoubleSide} />
          </mesh>

          {/* Center Spindle Hole */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.07, 32]} />
            <meshBasicMaterial color="#050507" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
