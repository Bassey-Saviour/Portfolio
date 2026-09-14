"use client";

import React, { useState, useEffect, useRef } from "react";
import { techStackData, type TechTool } from "@/data/techstack";
import TechCard from "./techstack/TechCard";

export type { TechTool };

export default function TechStack() {
  const [activeToolName, setActiveToolName] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Close popover when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveToolName(null);
    };

    const handleDocClick = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActiveToolName(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleDocClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleDocClick);
    };
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="py-20 md:py-24 border-t section-rule relative">
      <div className="reveal-on-scroll flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-kicker">Daily drivers</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            Tools with <span className="text-[#E8963C]">taste.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#B8A996]">
          Hover or tap any tool to inspect proficiency, core use cases, and daily application.
        </p>
      </div>

      <div className="reveal-on-scroll reveal-delay-200 mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
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
    </section>
  );
}
