"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { IconActivity, IconCheck, IconServer } from "./Icons";


export default function Projects() {
  return (
    <section id="projects" className="py-20 border-t border-[#F2E9DC]/10">
      <div className="max-w-4xl">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono text-[#E8963C] uppercase tracking-wider">02 // Proof: Systems & Code</span>
          <div className="h-[1px] w-12 bg-[#E8963C]/40" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F2E9DC] mb-4">
          Engineered Systems & Models
        </h2>
        <p className="text-[#B8A996] text-base leading-relaxed max-w-2xl mb-12">
          Coding-forward implementations proving architecture discipline, mathematical modeling, and full-stack execution.
        </p>

        {/* Project Cards */}
        <div className="space-y-16">
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="p-6 sm:p-8 rounded-xl bg-[#2A231C] border border-[#F2E9DC]/10 relative transition-all"
            >
              {/* Header: Title + Status */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F2E9DC] tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-[#E8963C] mt-0.5">
                    {project.subtitle}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium ${project.status.type === "active"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40"
                        : "bg-amber-950/80 text-amber-300 border border-amber-800/40"
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {project.status.label}
                  </span>
                </div>
              </div>

              {/* Thesis if present */}
              {project.thesis && (
                <div className="p-4 rounded-md bg-[#221C16] border-l-2 border-[#E8963C] text-xs sm:text-sm text-[#F2E9DC]/90 leading-relaxed mb-6">
                  <span className="font-mono text-[#E8963C] font-semibold block mb-1">
                    Core Thesis & Rationale:
                  </span>
                  {project.thesis}
                </div>
              )}

              {/* Overview */}
              <p className="text-sm sm:text-base text-[#B8A996] leading-relaxed mb-6">
                {project.overview}
              </p>

              {/* Role & Specific Contribution */}
              <div className="p-4 rounded-md bg-[#1C1712] border border-[#F2E9DC]/10 mb-6">
                <div className="text-xs font-mono text-[#4F7CAC] font-semibold mb-1">
                  Saviour’s Role: {project.roleDescription.title}
                </div>
                <p className="text-xs text-[#B8A996] leading-relaxed mb-3">
                  {project.roleDescription.details}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.roleDescription.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#F2E9DC]/90">
                      <span className="text-[#E8963C] font-mono mt-0.5">›</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-xs font-mono text-[#B8A996] mr-1">Stack:</span>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[#221C16] border border-[#F2E9DC]/10 text-[#F2E9DC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>


            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
