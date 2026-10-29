"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { getBassData } from "@/hooks/useAudioEngine";
import { useAppStore } from "@/store/useAppStore";
import { playlist } from "@/data/playlist";

const initialTrack = playlist[0];

/**
 * Custom Shader Material with uniforms:
 * - u_time: elapsed time for animation
 * - u_thump: 808 bass distortion factor (reacts to Web Audio API analyser)
 * - u_resolution: viewport pixel dimensions (THREE.Vector2)
 * - u_colorA: primary accent (active artist era color)
 * - u_colorB: deep background (active artist era color)
 */
export const LiquidMaterial = shaderMaterial(
  {
    u_time: 0.0,
    u_thump: 0.0,
    u_resolution: new THREE.Vector2(1, 1),
    u_colorA: new THREE.Color(
      initialTrack.colorA[0],
      initialTrack.colorA[1],
      initialTrack.colorA[2]
    ),
    u_colorB: new THREE.Color(
      initialTrack.colorB[0],
      initialTrack.colorB[1],
      initialTrack.colorB[2]
    ),
  },
  // Vertex Shader: Standard pass-through passing uv to vUv
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader Math (Domain Warping + Bass Shockwave + Specular Flash)
  /* glsl */ `
    uniform float u_time;
    uniform float u_thump;
    uniform vec2 u_resolution;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    varying vec2 vUv;

    void main() {
      vec2 p = -1.0 + 2.0 * vUv;
      p.x *= u_resolution.x / u_resolution.y;

      // Bass shockwave
      float dist = length(p);
      float bassWave = sin(dist * 10.0 - u_time * 4.0) * u_thump * 0.35;

      // Domain warping
      for(float i = 1.0; i < 4.0; i++) {
        p.x += (0.35 + u_thump * 0.25) / i * sin(i * 2.8 * p.y + u_time * 0.9 + bassWave);
        p.y += (0.35 + u_thump * 0.25) / i * cos(i * 2.8 * p.x + u_time * 0.9 - bassWave);
      }

      float liquid = 0.5 + 0.5 * sin(p.x * 2.2 + p.y * 2.2 + u_time);
      vec3 col = mix(u_colorB, u_colorA, pow(liquid, 1.6));
      
      // Kick drum specular flash
      col += u_colorA * (u_thump * 0.45) * exp(-dist * 1.8);
      
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

// Register custom shader material as declarative R3F element
extend({ LiquidMaterial });

export type LiquidMaterialElement = THREE.ShaderMaterial & {
  u_time: number;
  u_thump: number;
  u_resolution: THREE.Vector2;
  u_colorA: THREE.Color;
  u_colorB: THREE.Color;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
declare module "@react-three/fiber" {
  interface ThreeElements {
    liquidMaterial: any;
  }
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        liquidMaterial: any;
      }
    }
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-namespace */

export interface LiquidShaderProps {
  thump?: number;
  colorA?: string | THREE.Color;
  colorB?: string | THREE.Color;
}

export default function LiquidShader(props: LiquidShaderProps = {}) {
  void props;
  const materialRef = useRef<LiquidMaterialElement>(null);
  const { viewport, size } = useThree();
  const currentTrackIdx = useAppStore((state) => state.currentTrackIdx);
  const smoothedThump = useRef(0.0);

  // 1. Bridge Web Audio analyser bass amplitude to shader in useFrame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.getElapsedTime();
      materialRef.current.u_resolution.set(size.width, size.height);

      // Fetch bass amplitude from audio hook
      const rawThump = getBassData();

      // Smooth amplitude transition (damping return to 0 when paused)
      smoothedThump.current += (rawThump - smoothedThump.current) * 0.15;

      // Pass smoothed thump to uniform
      if (materialRef.current.uniforms?.u_thump) {
        materialRef.current.uniforms.u_thump.value = smoothedThump.current;
      }
      materialRef.current.u_thump = smoothedThump.current;
    }
  });

  // 2. Smoothly interpolate u_colorA and u_colorB using GSAP when currentTrackIdx changes
  useEffect(() => {
    const track = playlist[currentTrackIdx] || playlist[0];
    if (!track || !materialRef.current) return;

    const [rA, gA, bA] = track.colorA;
    const [rB, gB, bB] = track.colorB;

    if (materialRef.current.uniforms?.u_colorA?.value) {
      gsap.to(materialRef.current.uniforms.u_colorA.value, {
        r: rA,
        g: gA,
        b: bA,
        duration: 1.2,
        ease: "power2.out",
      });
    }

    if (materialRef.current.uniforms?.u_colorB?.value) {
      gsap.to(materialRef.current.uniforms.u_colorB.value, {
        r: rB,
        g: gB,
        b: bB,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  }, [currentTrackIdx]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <liquidMaterial
        ref={materialRef}
        depthWrite={false}
      />
    </mesh>
  );
}
