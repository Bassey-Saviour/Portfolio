"use client";

import React from "react";
import { IconDownload } from "./Icons";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

const principles = [
  "Clarity before complexity",
  "Systems before surfaces",
  "Execution with intent",
];

export default function About() {
  const { handleMouseMove } = useCardSpotlight();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 lg:py-32 border-t section-rule">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 items-start">
        <div className="reveal-on-scroll lg:sticky lg:top-28 lg:self-start flex flex-col gap-6">
          <div>
            <span className="section-kicker">About Me</span>
            <h2 className="mt-3 font-display text-3xl min-[360px]:text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
              Meet
              <br />
              <span className="text-[#E8963C]">Saviour.</span>
            </h2>
          </div>

          {/* Grounded Operating Principles on the Sticky Rail */}
          <div className="pt-6 border-t border-[#F2E9DC]/10">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E8963C]">
              Operating principles
            </p>
            <div className="mt-4 space-y-2.5">
              {principles.map((principle, index) => (
                <div
                  key={principle}
                  className="group/principle flex items-center gap-3 py-1 transition-colors duration-200"
                >
                  <span className="font-mono text-xs text-[#E8963C]/70">
                    0{index + 1}
                  </span>
                  <span className="font-display text-sm sm:text-base font-medium text-[#F2E9DC] transition-colors duration-200 group-hover/principle:text-[#E8963C]">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="reveal-on-scroll font-display text-[clamp(1.75rem,3.8vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.045em] text-[#F2E9DC]">
            Bassey Saviour is a First-Class CS graduate with real{" "}
            <span className="text-[#E8963C]">infrastructure experience</span> and a habit of
            turning technical work into something people can actually use.
          </p>
          <p className="reveal-on-scroll reveal-delay-100 mt-5 sm:mt-7 max-w-3xl text-sm leading-relaxed text-[#B8A996] sm:text-base">
            I work where infrastructure, product thinking, and visual clarity meet — from configuring enterprise networks at TotalEnergies, to shaping BayesVest&apos;s investment model, to leading design across GDG Babcock&apos;s flagship initiatives. The through-line is simple: make the complex legible and the important durable.
          </p>

          <div className="reveal-on-scroll reveal-delay-200 mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2">
            <article
              onMouseMove={handleMouseMove}
              className="glass-panel glass-panel-hover spotlight-card rounded-2xl p-4 min-[380px]:p-5 sm:p-6 cursor-default"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#F3B866]">
                  Academic record
                </span>
                <span className="rounded-full bg-[#E8963C]/12 px-2.5 py-1 text-[10px] font-mono text-[#F3B866] transition-all duration-300 hover:scale-105 hover:bg-[#E8963C]/25">
                  4.87 CGPA
                </span>
              </div>
              <h3 className="mt-7 font-display text-2xl font-semibold leading-tight tracking-tight text-[#F2E9DC]">
                Best Graduating Student
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#B8A996]">
                A strong grounding in computer science, systems thinking, and the discipline to carry work through.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Algorithms", "Systems", "Software Engineering"].map((item) => (
                  <span
                    key={item}
                    className="soft-chip px-2.5 py-1 text-[10px] font-mono text-[#B8A996]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article
              onMouseMove={handleMouseMove}
              className="glass-panel glass-panel-hover spotlight-card rounded-2xl p-4 min-[380px]:p-5 sm:p-6 cursor-default"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7fa9d7]">
                  Leadership
                </span>
                <span className="rounded-full bg-[#4F7CAC]/15 px-2.5 py-1 text-[10px] font-mono text-[#7fa9d7] transition-all duration-300 hover:scale-105 hover:bg-[#4F7CAC]/25">
                  Co-Founder & COO
                </span>
              </div>
              <h3 className="mt-7 font-display text-2xl font-semibold leading-tight tracking-tight text-[#F2E9DC]">
                EventNav
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#B8A996]">
                Owning product decisions, operations, and momentum when resources are limited and choices count.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Product", "Operations", "Design direction"].map((item) => (
                  <span
                    key={item}
                    className="soft-chip px-2.5 py-1 text-[10px] font-mono text-[#B8A996]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <div className="reveal-on-scroll reveal-delay-300 mt-7">
            <a
              href="#contact"
              className="btn-shimmer btn-tactile group inline-flex items-center gap-2 rounded-full bg-[#E8963C] px-5 py-3 text-xs font-display font-semibold text-[#1C1712] shadow-[0_2px_12px_rgba(232,150,60,0.25)] hover:shadow-[0_4px_24px_rgba(232,150,60,0.45)]"
            >
              <IconDownload className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              View CV / Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
