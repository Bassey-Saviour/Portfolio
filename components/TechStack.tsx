"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiMysql,
  SiFigma,
  SiCisco,
} from "react-icons/si";

// Authentic Canva vector icon (excluded from react-icons due to Canva trademark policy)
function CanvaIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.834 16.71c-1.42 1.34-3.414 1.76-5.26 1.11-2.48-.87-3.9-3.32-3.48-5.96.4-2.52 2.5-4.43 5.04-4.59 1.63-.1 3.2.49 4.31 1.64.44.46.39 1.2-.1 1.62-.48.4-1.2.35-1.63-.12-.76-.8-1.84-1.2-2.94-1.1-1.74.15-3.17 1.47-3.44 3.2-.34 2.1 1.1 3.96 3.1 4.26 1.42.21 2.85-.29 3.82-1.33.48-.51 1.29-.53 1.79-.05.51.48.53 1.28.05 1.79l-.26.23z" />
    </svg>
  );
}

export interface TechTool {
  name: string;
  category: string;
  color: string;
  bg: string;
  type: string;
  proficiency: number; // 0-100 percentage (editable)
  level: string; // e.g. "Advanced", "Expert", "Proficient", "Intermediate"
  pills: string[]; // Use case badges
  summary: string; // 1-sentence description of use
}

const tools: TechTool[] = [
  {
    name: "React",
    category: "Frontend Library",
    color: "#61DAFB",
    bg: "rgba(97,218,251,.12)",
    type: "react",
    proficiency: 90,
    level: "Advanced",
    pills: ["Interactive UI", "State Architecture", "Custom Hooks", "Component Systems"],
    summary: "Primary daily driver for building reactive, high-performance client web applications.",
  },
  {
    name: "Next.js",
    category: "Fullstack Framework",
    color: "#F2E9DC",
    bg: "rgba(242,233,220,.08)",
    type: "next",
    proficiency: 88,
    level: "Advanced",
    pills: ["App Router", "SSR & SSG", "API Routes", "SEO Architecture"],
    summary: "Production backbone for hybrid server/client rendering and scalable fullstack web apps.",
  },
  {
    name: "Tailwind",
    category: "Styling Engine",
    color: "#38BDF8",
    bg: "rgba(56,189,248,.12)",
    type: "tailwind",
    proficiency: 94,
    level: "Expert",
    pills: ["Design Tokens", "Responsive Layouts", "Micro-Interactions", "Glassmorphism"],
    summary: "Utility-first styling architecture for crafting cohesive, pixel-perfect interfaces rapidly.",
  },
  {
    name: "Python",
    category: "General Purpose",
    color: "#FFD43B",
    bg: "rgba(255,212,59,.12)",
    type: "python",
    proficiency: 78,
    level: "Proficient",
    pills: ["Data Automation", "Scripting", "CLI Utilities", "Backend Logic"],
    summary: "Tool of choice for task automation, data processing pipelines, and background logic.",
  },
  {
    name: "Git",
    category: "Version Control",
    color: "#F05032",
    bg: "rgba(240,80,50,.12)",
    type: "git",
    proficiency: 86,
    level: "Advanced",
    pills: ["Branch Strategies", "Merge & Rebase", "Release Tags", "Team Collab"],
    summary: "Essential source control discipline for clean history, code reviews, and continuous delivery.",
  },
  {
    name: "MySQL",
    category: "Relational Database",
    color: "#4D8DAC",
    bg: "rgba(77,141,172,.12)",
    type: "mysql",
    proficiency: 75,
    level: "Intermediate",
    pills: ["Schema Modeling", "Complex Queries", "Foreign Keys", "Data Integrity"],
    summary: "Structured relational database design, table relationships, and performant querying.",
  },
  {
    name: "Figma",
    category: "Product & UI/UX",
    color: "#F24E1E",
    bg: "rgba(242,78,30,.12)",
    type: "figma",
    proficiency: 95,
    level: "Expert",
    pills: ["Design Systems", "Interactive Prototypes", "Auto-Layout", "Dev Handoff"],
    summary: "Core workspace for product strategy, high-fidelity prototypes, and component libraries.",
  },
  {
    name: "Canva",
    category: "Visual Design",
    color: "#7D2AE8",
    bg: "rgba(125,42,232,.12)",
    type: "canva",
    proficiency: 92,
    level: "Advanced",
    pills: ["Event Branding", "Promotional Flyers", "Social Creatives", "Print Layouts"],
    summary: "High-speed graphic design for ministry events, marketing collateral, and creative media.",
  },
  {
    name: "Cisco",
    category: "Networking & Telecom",
    color: "#1BA0D7",
    bg: "rgba(27,160,215,.12)",
    type: "cisco",
    proficiency: 82,
    level: "Proficient",
    pills: ["Switch/Router CLI", "VLAN Segmentation", "Diagnostics", "Data Room Ops"],
    summary: "Enterprise network hardware configuration, routing diagnostics, and field operations.",
  },
];

function BrandMark({ type, color }: { type: string; color: string }) {
  if (type === "react") {
    return (
      <SiReact
        className="h-6 w-6 transition-transform duration-500 group-hover:rotate-180"
        style={{ color }}
      />
    );
  }
  if (type === "next") {
    return (
      <SiNextdotjs
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "tailwind") {
    return (
      <SiTailwindcss
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "python") {
    return (
      <SiPython
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ color }}
      />
    );
  }
  if (type === "git") {
    return (
      <SiGit
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
        style={{ color }}
      />
    );
  }
  if (type === "mysql") {
    return (
      <SiMysql
        className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "figma") {
    return (
      <SiFigma
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "canva") {
    return (
      <CanvaIcon
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "cisco") {
    return (
      <SiCisco
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  return null;
}

// Compute responsive popover alignment so it never bleeds off viewport edges on mobile/tablet/desktop
function getPopoverPosition(index: number) {
  // Mobile (3 cols: index % 3)
  const mobileCol = index % 3;
  let mobileClass = "left-1/2 -translate-x-1/2 right-auto";
  let mobileArrow = "left-1/2 -translate-x-1/2";
  if (mobileCol === 0) {
    mobileClass = "left-0 translate-x-0 right-auto";
    mobileArrow = "left-8";
  } else if (mobileCol === 2) {
    mobileClass = "right-0 left-auto translate-x-0";
    mobileArrow = "right-8";
  }

  // Tablet (5 cols: index % 5)
  const smCol = index % 5;
  let smClass = "sm:left-1/2 sm:-translate-x-1/2 sm:right-auto";
  let smArrow = "sm:left-1/2 sm:-translate-x-1/2";
  if (smCol === 0) {
    smClass = "sm:left-0 sm:translate-x-0 sm:right-auto";
    smArrow = "sm:left-8";
  } else if (smCol === 4) {
    smClass = "sm:right-0 sm:left-auto sm:translate-x-0";
    smArrow = "sm:right-8";
  }

  // Desktop (9 cols in single row)
  let lgClass = "lg:left-1/2 lg:-translate-x-1/2 lg:right-auto";
  let lgArrow = "lg:left-1/2 lg:-translate-x-1/2";
  if (index <= 1) {
    lgClass = "lg:left-0 lg:translate-x-0 lg:right-auto";
    lgArrow = "lg:left-8";
  } else if (index >= 7) {
    lgClass = "lg:right-0 lg:left-auto lg:translate-x-0";
    lgArrow = "lg:right-8";
  }

  return {
    popover: `${mobileClass} ${smClass} ${lgClass}`,
    arrow: `${mobileArrow} ${smArrow} ${lgArrow}`,
  };
}

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
          <span className="section-kicker">03 / Daily drivers</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            Tools with <span className="text-[#E8963C]">taste.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#B8A996]">
          Hover or tap any tool to inspect proficiency, core use cases, and daily application.
        </p>
      </div>

      <div className="reveal-on-scroll reveal-delay-200 mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {tools.map((tool, index) => {
          const isActive = activeToolName === tool.name;
          const pos = getPopoverPosition(index);

          return (
            <div
              key={tool.name}
              className={`relative ${isActive ? "z-40" : "z-10"}`}
              onMouseEnter={() => setActiveToolName(tool.name)}
              onMouseLeave={() => setActiveToolName(null)}
            >
              {/* Base tool tile */}
              <button
                type="button"
                onClick={() => setActiveToolName(isActive ? null : tool.name)}
                onFocus={() => setActiveToolName(tool.name)}
                onBlur={() => setActiveToolName(null)}
                className={`group w-full aspect-square rounded-2xl border p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8963C] text-left cursor-pointer ${
                  isActive
                    ? "bg-[#211d28]/90 -translate-y-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
                    : "bg-[#17141d]/45 hover:-translate-y-1.5 hover:border-[#F2E9DC]/30 hover:bg-[#211d28]/70 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
                }`}
                style={{
                  borderColor: isActive ? `${tool.color}77` : "rgba(242,233,220,0.08)",
                  boxShadow: isActive
                    ? `0 16px 36px rgba(0,0,0,0.4), 0 0 20px ${tool.color}25, inset 0 1px 0 rgba(255,255,255,.06)`
                    : `inset 0 1px 0 rgba(255,255,255,.04)`,
                }}
                aria-expanded={isActive}
                aria-label={`Inspect ${tool.name}`}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
                  style={{ backgroundColor: tool.bg }}
                >
                  <BrandMark type={tool.type} color={tool.color} />
                </div>
                <p className="mt-4 text-[11px] font-mono text-[#F2E9DC] transition-colors duration-200 group-hover:text-white font-medium">
                  {tool.name}
                </p>
                <span
                  className={`mt-1 block h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "w-9" : "w-4 group-hover:w-9"
                  }`}
                  style={{ backgroundColor: tool.color }}
                />
              </button>

              {/* The "Cool Square Thingy" Inspector Popover */}
              {isActive && (
                <div
                  className={`popover-enter absolute bottom-[calc(100%+14px)] ${pos.popover} pointer-events-auto z-50`}
                  role="tooltip"
                >
                  <div
                    className="relative w-[275px] sm:w-[295px] rounded-2xl border bg-[#15121b]/96 p-4.5 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300"
                    style={{
                      borderColor: `${tool.color}44`,
                      boxShadow: `0 24px 60px rgba(0,0,0,0.65), 0 0 32px ${tool.color}20, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    }}
                  >
                    {/* Ambient corner aura tinted in brand color */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-60"
                      style={{ backgroundColor: tool.color }}
                    />

                    {/* Top Row: Brand Icon, Name & Category */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: tool.bg }}
                        >
                          <BrandMark type={tool.type} color={tool.color} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display text-sm font-bold tracking-tight text-[#F2E9DC] truncate">
                            {tool.name}
                          </h3>
                          <p className="text-[10px] font-mono text-[#B8A996] truncate">
                            {tool.category}
                          </p>
                        </div>
                      </div>

                      <span
                        className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9.5px] font-medium"
                        style={{
                          borderColor: `${tool.color}35`,
                          backgroundColor: `${tool.color}12`,
                          color: tool.color,
                        }}
                      >
                        {tool.level}
                      </span>
                    </div>

                    {/* Proficiency Slider Bar ("like a fixed slider bar thingy") */}
                    <div className="mt-3.5 pt-3 border-t border-[#F2E9DC]/[0.08]">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="font-semibold tracking-wider text-[#B8A996] uppercase text-[9.5px]">
                          Proficiency
                        </span>
                        <span className="font-bold" style={{ color: tool.color }}>
                          {tool.proficiency}%
                        </span>
                      </div>

                      {/* Custom Slider Track with Tick Marks */}
                      <div className="relative mt-2 h-2.5 w-full rounded-full bg-[#0c0a10] border border-[#F2E9DC]/12 overflow-visible">
                        {/* Internal graduation tick marks (25%, 50%, 75%) */}
                        <div className="absolute inset-0 flex justify-between px-1.5 items-center pointer-events-none z-0">
                          <span className="h-1 w-px bg-[#F2E9DC]/20" />
                          <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
                          <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
                          <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
                          <span className="h-1 w-px bg-[#F2E9DC]/20" />
                        </div>

                        {/* Filled glowing progress bar */}
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-out relative z-10"
                          style={{
                            width: `${tool.proficiency}%`,
                            background: `linear-gradient(90deg, ${tool.color}77, ${tool.color})`,
                            boxShadow: `0 0 10px ${tool.color}55`,
                          }}
                        />

                        {/* Tactile slider thumb indicator */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#18141f] border-2 shadow-md z-20 flex items-center justify-center transition-all duration-500"
                          style={{
                            left: `${tool.proficiency}%`,
                            borderColor: tool.color,
                            boxShadow: `0 0 10px ${tool.color}`,
                          }}
                        >
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: tool.color }}
                          />
                        </div>
                      </div>

                      {/* Tick labels */}
                      <div className="mt-1 flex justify-between font-mono text-[8.5px] text-[#B8A996]/50 px-0.5">
                        <span>Beginner</span>
                        <span>Working</span>
                        <span>Expert</span>
                      </div>
                    </div>

                    {/* Use Case Pills ("pills showing what i'll use that stack for") */}
                    <div className="mt-3">
                      <p className="font-mono text-[9.5px] font-semibold tracking-wider text-[#B8A996] uppercase">
                        Primary Uses
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {tool.pills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium leading-tight"
                            style={{
                              backgroundColor: `${tool.color}10`,
                              borderColor: `${tool.color}30`,
                              color: "#F2E9DC",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Summary Note */}
                    <p className="mt-3 border-t border-[#F2E9DC]/[0.08] pt-2 text-[11px] leading-relaxed text-[#B8A996]/90">
                      {tool.summary}
                    </p>

                    {/* Bottom arrow notch pointing down at the tool */}
                    <div
                      className={`pointer-events-none absolute -bottom-1.5 h-3 w-3 rotate-45 border-b border-r bg-[#15121b] ${pos.arrow}`}
                      style={{
                        borderColor: `${tool.color}44`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
