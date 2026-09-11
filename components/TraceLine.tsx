"use client";

import React, { useEffect, useState } from "react";

interface NodeItem {
  id: string;
  label: string;
  topPct: number;
}

const SECTION_NODES: NodeItem[] = [
  { id: "hero", label: "Signal Origin", topPct: 5 },
  { id: "about", label: "Core Profile", topPct: 24 },
  { id: "work", label: "Work & Systems", topPct: 52 },
  { id: "experience", label: "Track Record", topPct: 76 },
  { id: "contact", label: "Terminal / Connect", topPct: 96 },
];

export default function TraceLine() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      const sections = ["hero", "about", "work", "experience", "contact"];
      const scrollPosition = scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="hidden xl:block fixed left-6 top-24 bottom-12 w-12 z-30 pointer-events-none select-none"
    >
      <div className="relative h-full w-full flex justify-center">
        {/* Background trace track */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-[#3D332A]" />

        {/* Animated active trace line filled based on scroll */}
        <div
          className="absolute top-0 w-[1.5px] bg-[#E8963C] rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(232,150,60,0.5)]"
          style={{ height: `${Math.max(6, scrollProgress)}%` }}
        />

        {/* Moving signal pulse packet */}
        <div
          className="absolute w-2 h-2 -ml-[3.25px] rounded-full bg-[#E8963C] shadow-[0_0_10px_#E8963C] transition-all duration-150"
          style={{ top: `${Math.max(1, Math.min(99, scrollProgress))}%` }}
        />

        {/* Section nodes */}
        {SECTION_NODES.map((node) => {
          const isActive = activeSection === node.id;
          const isPassed =
            SECTION_NODES.findIndex((n) => n.id === activeSection) >=
            SECTION_NODES.findIndex((n) => n.id === node.id);

          return (
            <div
              key={node.id}
              className="absolute left-1/2 -translate-x-1/2 flex items-center group pointer-events-auto"
              style={{ top: `${node.topPct}%` }}
            >
              {/* Node indicator */}
              <a
                href={`#${node.id}`}
                className={`w-5 h-5 rounded-full border-[1.5px] transition-all duration-300 flex items-center justify-center bg-[#1C1712] ${
                  isActive
                    ? "border-[#E8963C] shadow-[0_0_12px_rgba(232,150,60,0.5)] scale-110"
                    : isPassed
                    ? "border-[#5A4D3F] hover:border-[#E8963C]"
                    : "border-[#3D332A] hover:border-[#5A4D3F]"
                }`}
                title={node.label}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8963C]" />
                )}
              </a>

              {/* Hover node label badge */}
              <div
                className={`absolute left-6 pl-2 whitespace-nowrap text-[10px] font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "opacity-100 translate-x-0 text-[#E8963C] font-semibold"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#B8A996]"
                }`}
              >
                {node.label}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
