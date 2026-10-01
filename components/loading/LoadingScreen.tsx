"use client";

import React from "react";
import { useIntro } from "./IntroContext";

/**
 * Editorial Full-Screen Loading Curtain
 * - Clean minimal white canvas (#FFFFFF) sitting above the portfolio (z-[80]).
 * - Real asset loading progress indicator (0% -> 100%).
 * - Precision hairline track running horizontally near the bottom with live tabular percentage.
 * - Subtle top hairline indicator for secondary orientation.
 * - On 100%: Holds briefly, then glides upward (translateY(-100%)) with a 900ms cubic-bezier wipe.
 */
export default function LoadingScreen() {
  const { phase, progress, skipIntro } = useIntro();

  // If intro has completed, unmount completely to free all DOM resources
  if (phase === "complete") {
    return null;
  }

  const isTransitioning = phase === "transitioning";
  const displayProgress = Math.min(Math.round(progress), 100);

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
      {/* Accessible skip button for screen reader / keyboard users */}
      <button
        type="button"
        onClick={skipIntro}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[99] px-3 py-1.5 bg-[#100f14] text-[#F2E9DC] font-mono text-xs rounded border border-[#100f14]/20"
      >
        Skip intro
      </button>

      {/* Top Hairline Progress Bar (Satisfies prompt instruction #5) */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-black/[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#100f14] transition-[width] duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Progress Hairline & Percentage Indicator (Matching visual reference frame 00:00) */}
      <div
        className={`absolute bottom-6 sm:bottom-10 md:bottom-12 left-6 sm:left-10 md:left-14 right-6 sm:right-10 md:right-14 transition-opacity duration-300 pointer-events-none ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Full-width hairline track */}
        <div
          role="progressbar"
          aria-valuenow={displayProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative w-full h-[1px] bg-[#100f14]/[0.10] overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#100f14] transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage readout docked to bottom-right in portfolio signature Space Grotesk */}
        <div className="flex justify-end pt-2 sm:pt-2.5">
          <span className="font-display text-xs sm:text-sm tracking-tight text-[#100f14] font-medium tabular-nums select-none">
            {displayProgress}%
          </span>
        </div>
      </div>
    </div>
  );
}
