"use client";

import React from "react";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

const proficiencies = [
  {
    title: "Frontend & web",
    copy: "Responsive interfaces with structure, motion, and a point of view.",
    accent: "#61DAFB",
    tools: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "UI/UX & product",
    copy: "From fuzzy requirements to flows that feel obvious in the hand.",
    accent: "#A259FF",
    tools: ["Figma", "User flows", "Design systems", "Prototyping"],
  },
  {
    title: "Design & graphics",
    copy: "Visual systems that carry an idea from a screen to a room.",
    accent: "#7D2AE8",
    tools: ["Canva", "Brand direction", "Event design", "Presentations"],
  },
  {
    title: "Networking & infra",
    copy: "Calm, methodical problem-solving from the cable to the console.",
    accent: "#4F7CAC",
    tools: ["Cisco CLI", "LAN / WAN", "SSH", "Diagnostics"],
  },
  {
    title: "Leadership",
    copy: "Turning ambiguity into a plan a team can move with.",
    accent: "#E8963C",
    tools: ["Roadmaps", "Prioritisation", "Documentation", "Coordination"],
  },
];

export default function Skills() {
  const { handleMouseMove } = useCardSpotlight();

  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="reveal-on-scroll flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-kicker">02 / What I bring</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            A versatile <span className="text-[#E8963C]">build kit.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#B8A996]">
          Enough range to see the whole system. Enough depth to make the important parts real.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {proficiencies.map((item, index) => (
          <article
            key={item.title}
            onMouseMove={handleMouseMove}
            style={{ transitionDelay: `${index * 130}ms` }}
            className="reveal-on-scroll group relative min-h-64 overflow-hidden rounded-2xl border border-[#F2E9DC]/[0.08] bg-[#17141d]/45 p-5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#F2E9DC]/25 hover:bg-[#211d28]/70 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
          >
            {/* Watermark Number with 3D Depth Shift */}
            <span
              className="absolute -right-4 -top-9 font-display text-8xl font-bold tracking-tighter opacity-[0.07] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.16] group-hover:scale-110 pointer-events-none select-none"
              style={{ color: item.accent }}
            >
              0{index + 1}
            </span>

            {/* Glowing Accent Dot with gentle pulse */}
            <span
              className="relative flex h-2.5 w-2.5 rounded-full shadow-[0_0_16px_currentColor] transition-transform duration-300 group-hover:scale-125"
              style={{ color: item.accent, backgroundColor: item.accent }}
            />

            <h3 className="relative mt-10 font-display text-2xl font-semibold leading-none tracking-tight text-[#F2E9DC] transition-colors duration-300 group-hover:text-white">
              {item.title}
            </h3>
            <p className="relative mt-3 text-xs leading-relaxed text-[#B8A996] transition-colors duration-300 group-hover:text-[#F2E9DC]/90">
              {item.copy}
            </p>

            <div className="relative mt-6 flex flex-wrap gap-1.5">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.045] px-2 py-1 text-[10px] font-mono text-[#F2E9DC]/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:bg-white/[0.09]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
