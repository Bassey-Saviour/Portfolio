"use client";

import React from "react";
import { useIntro } from "./IntroContext";

/**
 * Editorial Swiss White Loading Curtain
 * - Crisp, tactile archival white canvas (#FFFFFF) with microscopic print grain.
 * - Black-ink architectural typography & framing:
 *     - Header: SAVIOUR BASSEY / SYSTEMS ENGINEER · EDITION // 2026
 *     - Corner registration crosshairs (+)
 *     - Monumental ghosted watermark: "SYSTEMS" (matches site watermark motif)
 *     - Bottom Telemetry: Live phase readout ("INITIALIZING CORE SYSTEM...") + [ % ] counter + hairline progress track
 * - Strict constraints: Stays 100% true to white & black ink. Zero gradient blobs or slop.
 * - On 100%: Wipes cleanly upward (-translate-y-full) revealing the dark luxury portfolio.
 */
export default function LoadingScreen() {
  const { phase, progress, skipIntro } = useIntro();

  // If intro has completed, unmount completely to free all DOM resources
  if (phase === "complete") {
    return null;
  }

  const isTransitioning = phase === "transitioning";
  const displayProgress = Math.min(Math.round(progress), 100);

  // Dynamic telemetry status readout based on loading progress
  const getStatusText = (val: number) => {
    if (val < 35) return "INITIALIZING CORE SYSTEM";
    if (val < 70) return "CALIBRATING TYPOGRAPHY & ASSETS";
    if (val < 98) return "STRUCTURING INTERFACE NODES";
    return "SYSTEM READY // MOUNTING";
  };

  return (
    <div
      id="intro-curtain"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[80] bg-[#FFFFFF] pointer-events-auto select-none overflow-hidden transition-transform duration-[1050ms] will-change-transform ${
        isTransitioning ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      {/* 1. Microscopic tactile paper grain overlay (feels like 300gsm archival cotton cardstock) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #100f14 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* 2. Accessible skip button for screen reader / keyboard users */}
      <button
        type="button"
        onClick={skipIntro}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[99] px-3 py-1.5 bg-[#100f14] text-[#FFFFFF] font-mono text-xs rounded border border-[#100f14]/20"
      >
        Skip intro
      </button>

      {/* 3. Top Hairline Progress Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-black/[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#100f14] transition-[width] duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 4. Architectural Corner Crosshairs (+) for precision Swiss print framing */}
      <div
        className={`pointer-events-none transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <span className="absolute top-5 sm:top-8 left-5 sm:left-8 font-mono text-[11px] text-[#100f14]/30 leading-none select-none">
          +
        </span>
        <span className="absolute top-5 sm:top-8 right-5 sm:right-8 font-mono text-[11px] text-[#100f14]/30 leading-none select-none">
          +
        </span>
        <span className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 font-mono text-[11px] text-[#100f14]/30 leading-none select-none">
          +
        </span>
        <span className="absolute bottom-5 sm:bottom-8 right-5 sm:right-8 font-mono text-[11px] text-[#100f14]/30 leading-none select-none">
          +
        </span>
      </div>

      {/* 5. Editorial Header Bar */}
      <div
        className={`absolute top-6 sm:top-9 md:top-11 left-6 sm:left-10 md:left-14 right-6 sm:right-10 md:right-14 flex items-center justify-end pointer-events-none transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="font-display font-bold tracking-tight text-[#100f14] text-xs sm:text-sm uppercase">
            SAVIOUR BASSEY
          </span>
          <span className="hidden min-[420px]:inline font-mono text-[9px] sm:text-[10px] tracking-[0.20em] uppercase text-[#100f14]/50">
            / SYSTEMS ENGINEER
          </span>
        </div>
        {/* <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-[#100f14]/60">
            EDITION // 2026
          </span>
        </div> */}
      </div>

      {/* 6. Monumental Background Watermark: "SYSTEMS" (matches site watermark motif) */}
      {/* <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[clamp(4.5rem,21vw,16rem)] leading-none tracking-tight text-[#100f14] uppercase select-none whitespace-nowrap opacity-[0.035]">
          SYSTEMS
        </span>
      </div> */}

      {/* 7. Bottom Telemetry & Progress Readout */}
      <div
        className={`absolute bottom-6 sm:bottom-10 md:bottom-12 left-6 sm:left-10 md:left-14 right-6 sm:right-10 md:right-14 transition-opacity duration-300 pointer-events-none ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Status Line & Tabular Percentage */}
        <div className="flex items-center justify-between pb-2 sm:pb-2.5">
          {/* Live pulsing status readout */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#100f14] animate-pulse" />
            <span className="font-mono text-[9px] min-[360px]:text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#100f14]/75">
              {getStatusText(displayProgress)}
            </span>
          </div>

          {/* Formatted bracketed percentage */}
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#100f14] tabular-nums select-none">
            [{displayProgress.toString().padStart(3, " ")}%]
          </span>
        </div>

        {/* Full-width hairline track */}
        <div
          role="progressbar"
          aria-valuenow={displayProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative w-full h-[1px] bg-[#100f14]/[0.12] overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#100f14] transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
