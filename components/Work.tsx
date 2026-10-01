"use client";

import React, { useState, useEffect, useRef } from "react";
import { workData, WorkItem } from "@/data/work";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";
import ProjectCard from "./work/ProjectCard";
import DesignShowcaseModal from "./work/DesignShowcaseModal";

export default function Work() {
  const [toast, setToast] = useState<string | null>(null);
  const [showcaseItem, setShowcaseItem] = useState<WorkItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { handleMouseMove } = useCardSpotlight();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Silky scroll-driven scale entrance for the header unit
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Dynamic scale entrance for the section header unit
          if (headerRef.current && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startEntryY = windowHeight * 0.92;
            const endEntryY = windowHeight * 0.40;

            if (rect.top >= startEntryY) {
              headerRef.current.style.transform = "scale(0.75)";
              headerRef.current.style.opacity = "0.15";
            } else if (rect.top > endEntryY) {
              const entryProgress = Math.min(
                Math.max((startEntryY - rect.top) / (startEntryY - endEntryY), 0),
                1
              );
              const eased = Math.pow(entryProgress, 1.2);
              const scale = 0.75 + eased * 0.25;
              const opacity = 0.15 + eased * 0.85;

              headerRef.current.style.transform = `scale(${scale.toFixed(4)})`;
              headerRef.current.style.opacity = `${opacity.toFixed(3)}`;
            } else {
              headerRef.current.style.transform = "none";
              headerRef.current.style.opacity = "1";
            }
          }

          // Grounded "PROJECTS" Watermark Scroll Animation:
          // Centered with inset-x-0 text-center (strictly X = 0, zero left shift), scales smoothly in place
          if (watermarkRef.current && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startEntry = windowHeight * 0.95;
            const endEntry = windowHeight * 0.35;

            if (rect.top >= startEntry) {
              watermarkRef.current.style.opacity = "0.005";
              watermarkRef.current.style.transform = "translate3d(0, 16px, 0) scale(0.94)";
            } else if (rect.top > endEntry) {
              const progress = Math.min(
                Math.max((startEntry - rect.top) / (startEntry - endEntry), 0),
                1
              );
              const eased = Math.pow(progress, 1.25);
              const scale = 0.94 + eased * 0.06; // 0.94 -> 1.00
              const translateY = (1 - eased) * 16;
              const opacity = 0.005 + eased * 0.033; // 0.005 -> 0.038

              watermarkRef.current.style.opacity = `${opacity.toFixed(4)}`;
              watermarkRef.current.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
            } else {
              // Settled in center with gentle subtle vertical parallax (ONLY Y-axis, zero horizontal shift)
              const parallaxY = Math.max((rect.top - endEntry) * 0.04, -16);
              watermarkRef.current.style.opacity = "0.038";
              watermarkRef.current.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0) scale(1.00)`;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openShowcase = (item: WorkItem, slideIdx: number = 0) => {
    setShowcaseItem(item);
    setActiveSlideIndex(slideIdx);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-14 sm:pb-20 md:pb-28 lg:pb-32"
    >
      {/* 1. Hairline Horizon Seam: Delicate, clean gradient rule */}
      <div
        className="absolute top-0 left-0 right-0 w-full h-[1px] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232, 150, 60, 0.08) 20%, rgba(242, 233, 220, 0.18) 50%, rgba(232, 150, 60, 0.08) 80%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Very subtle ambient dawn: strictly below the seam (above stays sharp dark), feathers naturally to 0% with no cut */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(232, 150, 60, 0.07) 0%, rgba(232, 150, 60, 0.018) 45%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        {/* Grounded section header with anchored architectural watermark */}
        <div
          ref={headerRef}
          className="relative mb-10 sm:mb-16 md:mb-20 will-change-transform"
          style={{ transformOrigin: "left center" }}
        >
          {/* Monumental Watermark: "PROJECTS" — Left-aligned flush with header text */}
          <div
            ref={watermarkRef}
            className="absolute left-0 -top-4 sm:-top-8 md:-top-14 pointer-events-none select-none -z-10 text-left will-change-transform overflow-visible"
            style={{
              opacity: 0.058,
              transform: "translate3d(0, 0, 0) scale(1)",
              transformOrigin: "left center",
              maskImage: "linear-gradient(to bottom, black 35%, transparent 92%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 92%)",
            }}
            aria-hidden="true"
          >
            <span className="font-display font-black uppercase text-[clamp(2.5rem,13.5vw,9.5rem)] leading-none tracking-[-0.03em] inline-block text-[#F2E9DC] select-none whitespace-nowrap">
              PROJECTS
            </span>
          </div>

          {/* Reframed header text: sits with crystal clarity in front */}
          <div className="reveal-on-scroll relative z-10 pt-1.5 sm:pt-4">
            <h2 className="text-2xl min-[360px]:text-3xl sm:text-5xl font-display font-bold text-[#F2E9DC] tracking-tight">
              Work worth<br /><span className="text-[#E8963C]">opening up.</span>
            </h2>
            <p className="text-[#B8A996] text-xs min-[380px]:text-sm sm:text-base mt-2.5 sm:mt-3 max-w-lg leading-relaxed">
              Systems, web interfaces, and network infrastructure.
            </p>
          </div>
        </div>

        {/* Full-width sticky stacked card list */}
        <div className="flex flex-col relative w-full pt-2">
          {workData.map((item: WorkItem, index) => (
            <ProjectCard
              key={item.id}
              item={item}
              index={index}
              totalItems={workData.length}
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
