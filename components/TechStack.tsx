"use client";

import React, { useState, useEffect, useRef } from "react";
import { techStackData, type TechTool } from "@/data/techstack";
import TechCard from "./techstack/TechCard";
import BrandMark from "./techstack/BrandMark";
import { useSectionScale } from "@/hooks/useSectionScale";

export type { TechTool };

const toolRows = [
  {
    id: "frontend",
    label: "Frontend & Core Languages",
    tools: techStackData.filter((t) => t.row === 1),
  },
  {
    id: "backend",
    label: "Backend, Database & Cloud",
    tools: techStackData.filter((t) => t.row === 2),
  },
  {
    id: "design-infra",
    label: "Design, Workflow & Networking",
    tools: techStackData.filter((t) => t.row === 3),
  },
];

export default function TechStack() {
  const [activeToolName, setActiveToolName] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useSectionScale({ watermarkRef });

  // Close popover when pressing Escape or tapping anywhere outside the grid and inspector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveToolName(null);
    };

    const handleDocPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!activeToolName) return;
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setActiveToolName(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleDocPointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleDocPointerDown);
    };
  }, [activeToolName]);

  const activeTool = techStackData.find((t) => t.name === activeToolName);

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="py-16 sm:py-20 md:py-24 lg:py-28 section-rule relative will-change-transform"
    >
      {/* Grounded section header with anchored architectural watermark */}
      <div className="relative mb-8 sm:mb-12 z-10">
        {/* Monumental Watermark: "TOOLS" — Left-aligned flush with header text */}
        <div
          ref={watermarkRef}
          className="absolute left-0 -top-4 sm:-top-8 md:-top-14 pointer-events-none select-none -z-10 text-left will-change-transform overflow-visible"
          style={{
            opacity: 0.095,
            transform: "translate3d(0, 0, 0) scale(1)",
            transformOrigin: "left center",
            maskImage: "linear-gradient(to bottom, black 45%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 95%)",
          }}
          aria-hidden="true"
        >
          <span className="font-display font-black uppercase text-[clamp(4.0rem,19vw,9.5rem)] leading-none tracking-[-0.03em] inline-block text-[#F2E9DC] select-none whitespace-nowrap">
            TOOLS
          </span>
        </div>

        {/* Reframed header text: sits with crystal clarity in front */}
        <div className="reveal-on-scroll relative z-10 pt-1.5 sm:pt-4 flex flex-col justify-between gap-4 sm:gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">Daily drivers</span>
            <h2 className="mt-3 font-display text-3xl min-[360px]:text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
              Tools with <span className="text-[#E8963C]">taste.</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs min-[380px]:text-sm leading-relaxed text-[#B8A996]">
            Hover on desktop or tap any tool to inspect proficiency and capability.
          </p>
        </div>
      </div>

      {/* Interactive Tool Grid & Mobile Inspector Container */}
      <div ref={containerRef} className={`relative ${activeToolName ? "z-30" : "z-20"}`}>
        {/* 3 Organized Rows Matching Reference Design */}
        <div className="reveal-on-scroll reveal-delay-200 flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto">
          {toolRows.map((row) => (
            <div key={row.id} className="flex flex-col items-center">
              <span className="text-[10px] sm:text-[10.5px] font-mono tracking-widest uppercase text-[#B8A996]/60 mb-2.5 sm:mb-3">
                {row.label}
              </span>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {row.tools.map((tool, index) => (
                  <TechCard
                    key={tool.name}
                    tool={tool}
                    index={index}
                    totalInRow={row.tools.length}
                    isActive={activeToolName === tool.name}
                    onSelect={setActiveToolName}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Mobile & Tablet Inspector Card (< lg) — Restyled clean & minimal, no glow */}
        {activeTool && (
          <div
            className="lg:hidden mt-6 popover-enter w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-2xl border border-white/[0.10] bg-[#121018]/98 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300">
              {/* Row 1: Icon, Name & Percentage + Close Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <BrandMark type={activeTool.type} color={activeTool.color} className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-tight text-[#F2E9DC] truncate">
                    {activeTool.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-mono text-xs font-semibold text-[#F2E9DC]">
                    {activeTool.proficiency}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveToolName(null)}
                    aria-label="Close inspector"
                    className="h-6 w-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[#B8A996] hover:text-[#F2E9DC] flex items-center justify-center text-xs transition-colors cursor-pointer active:scale-95"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Row 2: Full width Category / Subtitle */}
              <p className="mt-1.5 text-xs font-mono text-[#B8A996]/75">
                {activeTool.category}
              </p>

              {/* Row 3: Minimal Restyled Hairline Proficiency Bar */}
              <div className="mt-3 relative h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${activeTool.proficiency}%`,
                    backgroundColor: activeTool.color,
                  }}
                />
              </div>

              {/* Row 4: Clean Typographic Level (NO PILL) */}
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#B8A996]/60">
                <span className="uppercase tracking-wider text-[9px]">Proficiency</span>
                <span className="text-[#F2E9DC]/85 font-medium">{activeTool.level}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
