import React from "react";
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

const tools = [
  { name: "React", color: "#61DAFB", bg: "rgba(97,218,251,.12)", type: "react" },
  { name: "Next.js", color: "#F2E9DC", bg: "rgba(242,233,220,.08)", type: "next" },
  { name: "Tailwind", color: "#38BDF8", bg: "rgba(56,189,248,.12)", type: "tailwind" },
  { name: "Python", color: "#FFD43B", bg: "rgba(255,212,59,.12)", type: "python" },
  { name: "Git", color: "#F05032", bg: "rgba(240,80,50,.12)", type: "git" },
  { name: "MySQL", color: "#4D8DAC", bg: "rgba(77,141,172,.12)", type: "mysql" },
  { name: "Figma", color: "#F24E1E", bg: "rgba(242,78,30,.12)", type: "figma" },
  { name: "Canva", color: "#7D2AE8", bg: "rgba(125,42,232,.12)", type: "canva" },
  { name: "Cisco", color: "#1BA0D7", bg: "rgba(27,160,215,.12)", type: "cisco" },
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

export default function TechStack() {
  return (
    <section id="tools" className="reveal-section py-20 md:py-24 border-t section-rule">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-kicker">03 / Daily drivers</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            Tools with <span className="text-[#E8963C]">taste.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#B8A996]">
          A compact stack for building, designing, and keeping the lights on.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group aspect-square rounded-2xl border border-[#F2E9DC]/[0.08] bg-[#17141d]/45 p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#F2E9DC]/30 hover:bg-[#211d28]/70 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
            style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,.04)` }}
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
              className="mt-1 block h-px w-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-9"
              style={{ backgroundColor: tool.color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
