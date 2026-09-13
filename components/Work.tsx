"use client";

import React, { useState, useEffect } from "react";
import { workData, WorkItem } from "@/data/work";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";
import ProjectCard from "./work/ProjectCard";
import DesignShowcaseModal from "./work/DesignShowcaseModal";

export default function Work() {
  const [toast, setToast] = useState<string | null>(null);
  const [showcaseItem, setShowcaseItem] = useState<WorkItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { handleMouseMove } = useCardSpotlight();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const openShowcase = (item: WorkItem, slideIdx: number = 0) => {
    setShowcaseItem(item);
    setActiveSlideIndex(slideIdx);
  };

  return (
    <section id="work" className="py-24 md:py-32 border-t section-rule">
      <div className="w-full">
        {/* Clean, quiet section header */}
        <div className="reveal-on-scroll mb-12 md:mb-14">
          <span className="section-kicker">Projects</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-[#F2E9DC] tracking-tight mt-3">
            Work worth<br /><span className="text-[#E8963C]">opening up.</span>
          </h2>
          <p className="text-[#B8A996] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Systems, computational modeling, and product interfaces designed for clarity and operational reliability.
          </p>
        </div>

        {/* Minimal Grid — Image paired with short, clean text block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {workData.map((item: WorkItem, index) => (
            <ProjectCard
              key={item.id}
              item={item}
              index={index}
              handleMouseMove={handleMouseMove}
              onOpenShowcase={(slideIdx) => openShowcase(item, slideIdx ?? 0)}
              onOpenToast={(msg) => setToast(msg)}
            />
          ))}
        </div>
      </div>

      {/* Floating Status / Archival Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#E8963C]/30 bg-[#17141d]/95 backdrop-blur-md px-4 py-3 text-xs font-mono text-[#F2E9DC] shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-fade-in"
        >
          <span className="h-2 w-2 rounded-full bg-[#E8963C] animate-pulse" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-[#B8A996] hover:text-[#F2E9DC] p-0.5 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Full-Feature Silky Design Showcase Modal */}
      {showcaseItem && (
        <DesignShowcaseModal
          item={showcaseItem}
          initialIndex={activeSlideIndex}
          onClose={() => setShowcaseItem(null)}
        />
      )}
    </section>
  );
}
