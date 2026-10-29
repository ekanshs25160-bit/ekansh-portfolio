"use client";

import { useEffect, useRef } from "react";
import { getBassData } from "@/hooks/useAudioEngine";
import { useAppStore } from "@/store/useAppStore";
import { playlist } from "@/data/playlist";

const VS_SOURCE = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_thump;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    // Distance from center for bass shockwave
    float dist = length(p);
    float bassWave = sin(dist * 10.0 - u_time * 4.0) * u_thump * 0.35;

    // Domain warping liquid distortion
    for(float i = 1.0; i < 4.0; i++) {
      p.x += (0.35 + u_thump * 0.25) / i * sin(i * 2.8 * p.y + u_time * 0.9 + bassWave);
      p.y += (0.35 + u_thump * 0.25) / i * cos(i * 2.8 * p.x + u_time * 0.9 - bassWave);
    }

    float liquid = 0.5 + 0.5 * sin(p.x * 2.2 + p.y * 2.2 + u_time);
    vec3 col = mix(u_colorB, u_colorA, pow(liquid, 1.6));

    // Add subtle radial specular flash on 808 kick
    col += u_colorA * (u_thump * 0.45) * exp(-dist * 1.8);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * SVG Film Grain Overlay (z-[1], opacity-5, pointer-events-none)
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none opacity-5"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/**
 * Bulletproof raw WebGL Full-Screen Clip-Space Liquid Shader Background.
 * Ported directly from the reference HTML demo for 100% visibility,
 * zero camera/frustum clipping, and 60FPS audio-reactive domain warping.
 */
export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, depth: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    const prog = gl.createProgram();

    if (!prog || !vs || !fs) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uThump = gl.getUniformLocation(prog, "u_thump");
    const uColA = gl.getUniformLocation(prog, "u_colorA");
    const uColB = gl.getUniformLocation(prog, "u_colorB");

    const initialIdx = useAppStore.getState().currentTrackIdx;
    const initialTrack = playlist[initialIdx] || playlist[0];

    const currentColA: [number, number, number] = [...initialTrack.colorA];
    const currentColB: [number, number, number] = [...initialTrack.colorB];
    let smoothThump = 0;
    let rafId = 0;

    const renderLoop = (now: number) => {
      const rawBass = getBassData();
      smoothThump += (rawBass - smoothThump) * 0.25;

      // Active artist era colors from Zustand store
      const activeIdx = useAppStore.getState().currentTrackIdx;
      const targetTrack = playlist[activeIdx] || playlist[0];
      const targetColA = targetTrack.colorA;
      const targetColB = targetTrack.colorB;

      // Smoothly interpolate artist colors (0.05 lerp factor per frame)
      for (let i = 0; i < 3; i++) {
        currentColA[i] += (targetColA[i] - currentColA[i]) * 0.05;
        currentColB[i] += (targetColB[i] - currentColB[i]) * 0.05;
      }

      // Pulse Hero Typography & Vinyl wrapper on 808 Kick (matching index.html demo)
      const heroTitle = document.getElementById("hero-title");
      if (heroTitle) {
        heroTitle.style.transform = `scale(${1 + smoothThump * 0.03})`;
      }
      const vinylWrapper = document.getElementById("vinyl-wrapper");
      if (vinylWrapper) {
        const scale = 1 + smoothThump * 0.14;
        vinylWrapper.style.transform = `scale(${scale})`;
      }

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 0.001);
      gl.uniform1f(uThump, smoothThump);
      gl.uniform3fv(uColA, currentColA);
      gl.uniform3fv(uColB, currentColB);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteBuffer(buf);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      />
      <NoiseOverlay />
    </>
  );
}

