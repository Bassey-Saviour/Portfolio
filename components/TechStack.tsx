"use client";

import React, { useState, useEffect, useRef } from "react";
import { techStackData, type TechTool } from "@/data/techstack";
import TechCard from "./techstack/TechCard";
import BrandMark from "./techstack/BrandMark";

export type { TechTool };

export default function TechStack() {
  const [activeToolName, setActiveToolName] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="tools" className="py-16 sm:py-20 md:py-24 lg:py-28 border-t section-rule relative">
      <div className="reveal-on-scroll flex flex-col justify-between gap-4 sm:gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-kicker">Daily drivers</span>
          <h2 className="mt-3 font-display text-3xl min-[360px]:text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            Tools with <span className="text-[#E8963C]">taste.</span>
          </h2>
        </div>
        <p className="max-w-xs text-xs min-[380px]:text-sm leading-relaxed text-[#B8A996]">
          Hover on desktop or tap any tool to inspect proficiency, use cases, and daily application.
        </p>
      </div>

      {/* Interactive Tool Grid & Mobile Inspector Container */}
      <div ref={containerRef} className="relative">
        <div className="reveal-on-scroll reveal-delay-200 mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
          {techStackData.map((tool, index) => (
            <TechCard
              key={tool.name}
              tool={tool}
              index={index}
              isActive={activeToolName === tool.name}
              onSelect={setActiveToolName}
            />
          ))}
        </div>

        {/* Dedicated Mobile & Tablet Inspector Card (< lg) */}
        {activeTool && (
          <div
            className="lg:hidden mt-4 popover-enter w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full rounded-2xl border bg-[#15121b]/98 p-4 sm:p-5 shadow-[0_24px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300"
              style={{
                borderColor: `${activeTool.color}55`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.65), 0 0 30px ${activeTool.color}20, inset 0 1px 0 rgba(255,255,255,0.08)`,
              }}
            >
              {/* Ambient corner glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl opacity-60"
                style={{ backgroundColor: activeTool.color }}
              />

              {/* Top Row: Icon, Name & Category, Level & Close Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: activeTool.bg }}
                  >
                    <BrandMark type={activeTool.type} color={activeTool.color} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold tracking-tight text-[#F2E9DC] truncate">
                      {activeTool.name}
                    </h3>
                    <p className="text-[11px] font-mono text-[#B8A996] truncate">
                      {activeTool.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium"
                    style={{
                      borderColor: `${activeTool.color}35`,
                      backgroundColor: `${activeTool.color}12`,
                      color: activeTool.color,
                    }}
                  >
                    {activeTool.level}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveToolName(null)}
                    aria-label="Close inspector"
                    className="h-7 w-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[#B8A996] hover:text-[#F2E9DC] flex items-center justify-center text-xs transition-colors cursor-pointer active:scale-95"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Proficiency Slider Bar */}
              <div className="mt-4 pt-3.5 border-t border-[#F2E9DC]/[0.08]">
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="font-semibold tracking-wider text-[#B8A996] uppercase text-[9.5px]">
                    Proficiency
                  </span>
                  <span className="font-bold" style={{ color: activeTool.color }}>
                    {activeTool.proficiency}%
                  </span>
                </div>

                <div className="relative mt-2 h-2.5 w-full rounded-full bg-[#0c0a10] border border-[#F2E9DC]/12 overflow-visible">
                  <div className="absolute inset-0 flex justify-between px-1.5 items-center pointer-events-none z-0">
                    <span className="h-1 w-px bg-[#F2E9DC]/20" />
                    <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
                    <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
                    <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
                    <span className="h-1 w-px bg-[#F2E9DC]/20" />
                  </div>

                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out relative z-10"
                    style={{
                      width: `${activeTool.proficiency}%`,
                      background: `linear-gradient(90deg, ${activeTool.color}77, ${activeTool.color})`,
                      boxShadow: `0 0 10px ${activeTool.color}55`,
                    }}
                  />

                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#18141f] border-2 shadow-md z-20 flex items-center justify-center transition-all duration-500"
                    style={{
                      left: `${activeTool.proficiency}%`,
                      borderColor: activeTool.color,
                      boxShadow: `0 0 10px ${activeTool.color}`,
                    }}
                  >
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: activeTool.color }}
                    />
                  </div>
                </div>

                <div className="mt-1 flex justify-between font-mono text-[8.5px] text-[#B8A996]/50 px-0.5">
                  <span>Beginner</span>
                  <span>Working</span>
                  <span>Expert</span>
                </div>
              </div>

              {/* Use Case Pills */}
              <div className="mt-3.5">
                <p className="font-mono text-[9.5px] font-semibold tracking-wider text-[#B8A996] uppercase">
                  Primary Uses
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activeTool.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-medium leading-tight"
                      style={{
                        backgroundColor: `${activeTool.color}10`,
                        borderColor: `${activeTool.color}30`,
                        color: "#F2E9DC",
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <p className="mt-3.5 border-t border-[#F2E9DC]/[0.08] pt-2.5 text-xs leading-relaxed text-[#B8A996]/95">
                {activeTool.summary}
              </p>

              {/* Bottom Quick Controls */}
              <div className="mt-3 flex items-center justify-between text-[10.5px] font-mono text-[#B8A996]/60 border-t border-[#F2E9DC]/[0.06] pt-2">
                <span>Tap any tool to inspect</span>
                <button
                  type="button"
                  onClick={() => setActiveToolName(null)}
                  className="text-[#E8963C] hover:underline cursor-pointer font-medium"
                >
                  Dismiss ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
