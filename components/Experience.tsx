"use client";

import React, { useState } from "react";
import { experienceData } from "@/data/experience";
import { IconArrowUpRight } from "./Icons";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(experienceData[0]?.id ?? null);

  return (
    <section id="experience" className="reveal-section py-24 md:py-32 border-t section-rule">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <span className="section-kicker">04 / Work Experience</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            Experience,<br /><span className="text-[#4F7CAC]">distilled.</span>
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#B8A996]">
            My professional journey working in teams and institiutions, coupled with my imapact.
          </p>
        </div>

        <div className="space-y-3">
          {experienceData.map((item, index) => {
            const isOpen = openId === item.id;
            const shortSummary = item.summary.split(". ")[0] + ".";
            return (
              <article
                key={item.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                  ? "border-[#F2E9DC]/18 bg-[#211d28]/75 shadow-[0_20px_50px_rgba(0,0,0,.22)]"
                  : "border-[#F2E9DC]/[0.07] bg-[#17141d]/35 hover:border-[#F2E9DC]/16 hover:bg-[#211d28]/45"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start gap-4 p-5 text-left sm:p-6 cursor-pointer focus:outline-none"
                >
                  <span className="mt-0.5 font-mono text-[11px] text-[#E8963C] transition-transform duration-300 group-hover:scale-110">
                    0{index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <span className="font-display text-xl font-semibold tracking-tight text-[#F2E9DC] sm:text-2xl transition-colors duration-300 group-hover:text-[#F2E9DC]">
                        {item.company}
                      </span>
                      <span className="font-mono text-[11px] text-[#B8A996]">
                        {item.dateRange}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-[#F3B866]">
                      {item.title}
                    </span>
                    {!isOpen && (
                      <span className="mt-3 block max-w-xl text-xs leading-relaxed text-[#B8A996] transition-opacity duration-300">
                        {shortSummary}
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F2E9DC]/10 text-lg text-[#B8A996] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen
                      ? "rotate-45 bg-[#E8963C] text-[#f8f9fa] border-transparent scale-105 shadow-[0_0_12px_rgba(232,150,60,0.2)]"
                      : "group-hover:border-[#E8963C]/50 group-hover:text-[#F2E9DC]"
                      }`}
                  >
                    +
                  </span>
                </button>

                {/* 60fps Zero-Jump Animated Accordion */}
                <div
                  className="accordion-grid"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div className="accordion-inner">
                    <div className="border-t border-[#F2E9DC]/[0.08] px-5 pb-6 pt-5 sm:px-6">
                      <p className="max-w-2xl text-sm leading-relaxed text-[#B8A996]">
                        {item.summary}
                      </p>
                      <div className="mt-5 grid gap-2 sm:grid-cols-3">
                        {item.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="group/item rounded-xl bg-[#F2E9DC]/[0.045] p-3 text-xs leading-relaxed text-[#F2E9DC]/85 transition-all duration-300 hover:bg-[#F2E9DC]/[0.08] hover:-translate-y-0.5"
                          >
                            <span className="mr-1 text-[#E8963C] inline-block transition-transform duration-300 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5">
                              ↗
                            </span>
                            {highlight}
                          </div>
                        ))}
                      </div>
                      {item.subItems && (
                        <div className="mt-5 space-y-2">
                          {item.subItems.map((sub) => (
                            <a
                              key={sub.title}
                              href={sub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-4 rounded-xl border border-[#F2E9DC]/[0.07] bg-[#100f14]/35 px-4 py-3 transition-all duration-300 hover:border-[#4F7CAC]/45 hover:bg-[#100f14]/60 hover:-translate-y-0.5"
                            >
                              <span>
                                <span className="block text-sm font-medium text-[#F2E9DC] transition-colors group-hover:text-[#7fa9d7]">
                                  {sub.title}
                                </span>
                                <span className="mt-0.5 block text-xs text-[#B8A996]">
                                  {sub.description}
                                </span>
                              </span>
                              <IconArrowUpRight className="h-4 w-4 shrink-0 text-[#4F7CAC] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          ))}
                        </div>
                      )}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="soft-chip px-2.5 py-1 text-[10px] font-mono text-[#B8A996]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
