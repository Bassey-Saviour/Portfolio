"use client";

import React, { useState } from "react";
import { designData, DesignItem } from "@/data/design";

export default function DesignShowcase() {
  const [selectedItem, setSelectedItem] = useState<DesignItem | null>(null);

  return (
    <section id="design" className="py-20 border-t border-[#F2E9DC]/10">
      <div className="max-w-4xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono text-[#E8963C] uppercase tracking-wider">
            03 // Proof: Interface & Visual Design
          </span>
          <div className="h-[1px] w-12 bg-[#E8963C]/40" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F2E9DC] mb-4">
          UI/UX & Design Production
        </h2>
        <p className="text-[#B8A996] text-base leading-relaxed max-w-2xl mb-12">
          Demonstrating user-centered design discipline, high-density dashboard layouts, and automated Python graphics generation.
        </p>

        {/* Grid of Design Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designData.map((item) => (
            <div
              key={item.id}
              className="group p-6 rounded-xl bg-[#2A231C] border border-[#F2E9DC]/10 hover:border-[#E8963C]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Representation */}
                <div className="w-full h-44 rounded-lg bg-[#1C1712] border border-[#F2E9DC]/10 p-4 mb-5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E8963C]/30 transition-colors">
                  {/* Subtle background grid pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#4F7CAC_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

                  {/* UI Wireframe Graphic Mockup */}
                  {item.previewType === "fintech-ui" && (
                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#B8A996] border-b border-[#F2E9DC]/10 pb-1.5">
                        <span className="text-[#E8963C] font-semibold">BayesVest Mobile App</span>
                        <span>Confidence: 94.2%</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="h-10 w-1/3 rounded bg-[#2A231C] border border-[#E8963C]/40 p-1.5 flex flex-col justify-between">
                          <span className="text-[9px] text-[#B8A996]">Equities</span>
                          <span className="text-[11px] font-mono font-bold text-[#E8963C]">65%</span>
                        </div>
                        <div className="h-10 w-1/3 rounded bg-[#2A231C] border border-[#4F7CAC]/40 p-1.5 flex flex-col justify-between">
                          <span className="text-[9px] text-[#B8A996]">Fixed</span>
                          <span className="text-[11px] font-mono font-bold text-[#4F7CAC]">25%</span>
                        </div>
                        <div className="h-10 w-1/3 rounded bg-[#2A231C] border border-[#9B5DE5]/40 p-1.5 flex flex-col justify-between">
                          <span className="text-[9px] text-[#B8A996]">ETFs</span>
                          <span className="text-[11px] font-mono font-bold text-[#9B5DE5]">10%</span>
                        </div>
                      </div>
                      <div className="h-8 rounded bg-[#2A231C] border border-[#F2E9DC]/10 p-2 flex items-center justify-between text-[10px] font-mono text-[#B8A996]">
                        <span>Posterior Shift Indicator</span>
                        <span className="text-emerald-400">● Live Updating</span>
                      </div>
                    </div>
                  )}

                  {item.previewType === "event-ui" && (
                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#B8A996] border-b border-[#F2E9DC]/10 pb-1.5">
                        <span className="text-[#4F7CAC] font-semibold">EventNav Venue Matrix</span>
                        <span>Hall B · Stage 2</span>
                      </div>
                      <div className="p-2 rounded bg-[#2A231C] border border-[#4F7CAC]/30 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-[#F2E9DC]">Keynote: AI in Infrastructure</span>
                          <span className="text-[#E8963C]">14:00</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#1C1712] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F7CAC] w-3/4" />
                        </div>
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-[#B8A996]">
                        <span>Waypoint 04 → 120m</span>
                        <span className="text-[#E8963C]">Scan Pass QR</span>
                      </div>
                    </div>
                  )}

                  {item.previewType === "academic-portal" && (
                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#B8A996] border-b border-[#F2E9DC]/10 pb-1">
                        <span className="text-[#E8963C] font-semibold">Faculty Grading Ledger</span>
                        <span>Semester 1</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center">
                        <div className="p-1 rounded bg-[#2A231C] text-[#B8A996]">Matric #</div>
                        <div className="p-1 rounded bg-[#2A231C] text-[#B8A996]">Test (30)</div>
                        <div className="p-1 rounded bg-[#2A231C] text-[#B8A996]">Exam (70)</div>
                        <div className="p-1 rounded bg-[#2A231C] text-[#E8963C] font-bold">Grade</div>
                        <div className="p-1 rounded bg-[#1C1712] text-[#F2E9DC]">CSC/01</div>
                        <div className="p-1 rounded bg-[#1C1712] text-[#F2E9DC]">28</div>
                        <div className="p-1 rounded bg-[#1C1712] text-[#F2E9DC]">64</div>
                        <div className="p-1 rounded bg-[#2A231C] text-emerald-400 font-bold">A (92)</div>
                      </div>
                    </div>
                  )}

                  {item.previewType === "code-generated-print" && (
                    <div className="relative z-10 space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between items-center text-[#B8A996] border-b border-[#F2E9DC]/10 pb-1">
                        <span className="text-[#4F7CAC] font-semibold">Python / PIL Pipeline</span>
                        <span>300 DPI Export</span>
                      </div>
                      <div className="p-2 rounded bg-[#2A231C] border border-[#F2E9DC]/10 text-center space-y-0.5">
                        <div className="text-[11px] font-display font-bold text-[#F2E9DC] tracking-wider">
                          IMPRINT GLOBAL
                        </div>
                        <div className="text-[8px] text-[#B8A996]">
                          Custom Jotter & "Hello July" Campaign
                        </div>
                      </div>
                      <div className="text-[9px] text-[#4F7CAC] flex justify-between">
                        <span>Dynamic Font Rendering</span>
                        <span>CMYK Vector Safe</span>
                      </div>
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#B8A996]">
                    <span className="text-[#4F7CAC]">{item.clientOrProject}</span>
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-[#F2E9DC] mb-2 group-hover:text-[#E8963C] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#B8A996] leading-relaxed mb-4">
                  {item.problem}
                </p>

                <div className="space-y-2 text-xs text-[#F2E9DC]/90 mb-6">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#E8963C] font-mono mt-0.5">›</span>
                    <span>
                      <strong className="text-[#F2E9DC]">Solution:</strong> {item.solution}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#4F7CAC] font-mono mt-0.5">›</span>
                    <span>
                      <strong className="text-[#F2E9DC]">Saviour's Contribution:</strong> {item.contribution}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tool Chips */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F2E9DC]/10">
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1C1712] border border-[#F2E9DC]/08 text-[#B8A996]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
