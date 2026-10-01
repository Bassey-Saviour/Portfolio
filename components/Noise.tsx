"use client";

import React, { useRef, useEffect } from "react";

export interface NoiseProps {
  /**
   * The width/height of the offscreen noise pattern tile in pixels.
   * Default: 250 (React Bits default)
   */
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  /**
   * Number of frames between grain refreshes (e.g. 3 = ~20fps vintage shutter speed).
   * Default: 3
   */
  patternRefreshInterval?: number;
  /**
   * Opacity of the noise particles (0 to 255).
   * Default: 18 (subtle, film-grade tactile grain)
   */
  patternAlpha?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Noise Component - React Bits implementation with zero-overhead canvas tiling.
 * @see https://reactbits.dev/animations/noise
 */
const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 3,
  patternAlpha = 18,
  className = "",
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let frame = 0;
    let isVisible = !document.hidden;

    // Offscreen canvas for the repeating noise tile (tiled via GPU hardware acceleration)
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d", { alpha: true });
    if (!patternCtx) return;

    // Single pre-allocated ImageData buffer - zero garbage collection churn
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const data = patternData.data;
    const len = data.length;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrain = () => {
      for (let i = 0; i < len; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    // Honor accessibility settings for users who prefer reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const loop = () => {
      if (isVisible) {
        if (frame % patternRefreshInterval === 0) {
          drawGrain();
        }
        frame++;
      }
      animationId = window.requestAnimationFrame(loop);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();
    drawGrain();

    if (!prefersReducedMotion) {
      loop();
    }

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationId) window.cancelAnimationFrame(animationId);
    };
  }, [
    patternSize,
    patternScaleX,
    patternScaleY,
    patternRefreshInterval,
    patternAlpha,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-40 h-full w-full select-none ${className}`}
      style={{
        imageRendering: "pixelated",
        mixBlendMode: "overlay",
        opacity: 0.9,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default Noise;
