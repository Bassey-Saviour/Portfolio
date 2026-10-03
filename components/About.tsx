"use client";

import React, { useEffect, useRef } from "react";
import { IconDownload } from "./Icons";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

const principles = [
  "Abstractions into reality",
  "Collect skills relentlessly",
  "Particular about invisible details",
];

export default function About() {
  const { handleMouseMove } = useCardSpotlight();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll-driven entrance wipe & scale, plus exit scale-down:
  // 1. Entrance Zone: Triggers visibly when rect.top is between 72% and 12% of the viewport.
  //    Sweeps across with an angled (118deg) soft gradient feather mask while scaling up from 0.90 to 1.00.
  // 2. Reading Zone: Active zone where transform and mask are completely 'none' for native sticky scroll.
  // 3. Exit Zone: As rect.bottom scrolls past 80% towards 8% of the viewport, scales down from 1.00 to 0.86.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startEntryY = windowHeight * 0.72;
            const endEntryY = windowHeight * 0.12;
            const startExitY = windowHeight * 0.80;
            const endExitY = windowHeight * 0.08;

            if (rect.top >= startEntryY) {
              // Above entrance threshold (user is high up in Hero)
              sectionRef.current.style.transform = "scale(0.75) translate3d(0, 42px, 0)";
              sectionRef.current.style.opacity = "0";
              const maskValue = "linear-gradient(118deg, #000 -45%, transparent -10%)";
              sectionRef.current.style.maskImage = maskValue;
              (sectionRef.current.style as any).webkitMaskImage = maskValue;
              sectionRef.current.style.clipPath = "none";
            } else if (rect.top > endEntryY) {
              // Active Entrance Wipe & Scale-up
              const entryProgress = Math.min(
                Math.max((startEntryY - rect.top) / (startEntryY - endEntryY), 0),
                1
              );
              const eased = Math.pow(entryProgress, 1.2);
              const scale = 0.75 + eased * 0.25; // 0.75 -> 1.00
              const translateY = (1 - eased) * 42;

              // Angled 118deg luxury wipe with 35% feathered band
              const blackStop = -45 + eased * 155;
              const clearStop = blackStop + 35;
              const maskValue = `linear-gradient(118deg, #000 ${blackStop}%, transparent ${clearStop}%)`;
              const opacity = Math.min(0.15 + eased * 0.85, 1);

              sectionRef.current.style.transform = `scale(${scale.toFixed(4)}) translate3d(0, ${translateY.toFixed(1)}px, 0)`;
              sectionRef.current.style.opacity = `${opacity}`;
              sectionRef.current.style.maskImage = maskValue;
              (sectionRef.current.style as any).webkitMaskImage = maskValue;
              sectionRef.current.style.clipPath = "none";
            } else if (rect.top < 50 && rect.bottom < startExitY) {
              // Active Exit Scale-down & Drift towards next section
              const exitProgress = Math.min(
                Math.max((startExitY - rect.bottom) / (startExitY - endExitY), 0),
                1
              );
              // Smoothly scale down from 1.00 to 0.72 and drift upward
              const exitScale = 1.00 - exitProgress * 0.28;
              const exitTranslateY = -exitProgress * 44;
              const exitOpacity = Math.max(1.00 - exitProgress * 0.85, 0.15);

              sectionRef.current.style.transform = `scale(${exitScale.toFixed(4)}) translate3d(0, ${exitTranslateY.toFixed(1)}px, 0)`;
              sectionRef.current.style.opacity = `${exitOpacity.toFixed(3)}`;
              sectionRef.current.style.maskImage = "none";
              (sectionRef.current.style as any).webkitMaskImage = "none";
              sectionRef.current.style.clipPath = "none";
            } else {
              // Active Reading Zone: transform and mask are completely cleared for 100% native sticky scroll
              sectionRef.current.style.transform = "none";
              sectionRef.current.style.opacity = "1";
              sectionRef.current.style.maskImage = "none";
              (sectionRef.current.style as any).webkitMaskImage = "none";
              sectionRef.current.style.clipPath = "none";
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-14 sm:py-20 md:py-28 lg:py-32 will-change-transform origin-top transition-opacity"
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 items-start">
        {/* Sticky Operating Principles Rail */}
        <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-5 sm:gap-6">
          <div className="reveal-on-scroll">
            <span className="section-kicker">About Me</span>
            <h2 className="mt-2.5 sm:mt-3 font-display text-2xl min-[360px]:text-3xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
              Meet
              <br />
              <span className="text-[#E8963C]">Saviour.</span>
            </h2>
          </div>

          {/* Grounded Operating Principles on the Sticky Rail */}
          <div className="reveal-on-scroll pt-5 sm:pt-6 border-t border-[#F2E9DC]/10">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E8963C]">
              Operating principles
            </p>
            <div className="mt-3.5 sm:mt-4 space-y-2 sm:space-y-2.5">
              {principles.map((principle, index) => (
                <div
                  key={principle}
                  className="group/principle flex items-center gap-3 py-0.5 sm:py-1 transition-colors duration-200"
                >
                  <span className="font-mono text-xs text-[#E8963C]/70">
                    0{index + 1}
                  </span>
                  <span className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#F2E9DC] transition-colors duration-200 group-hover/principle:text-[#E8963C]">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Natural, grounded lead without designer title */}
          <p className="reveal-on-scroll font-display text-[clamp(1.25rem,2.4vw,2.15rem)] font-bold leading-[1.3] tracking-tight text-[#F2E9DC]">
            I build interfaces, manage{" "}
            <span className="text-[#E8963C]">network infrastructure</span>, and collect skills along the way. Most of all, I turn people&apos;s abstractions into things that work.
          </p>

          {/* Real, human narrative with zero AI buzzwords */}
          <div className="reveal-on-scroll reveal-delay-150 mt-3.5 sm:mt-5 max-w-xl text-xs sm:text-[13.5px] leading-relaxed text-[#B8A996]/90">
            <p>
              Computer Science graduate with a habit of picking up whatever skills a project demands. Whether that&apos;s configuring enterprise networks at TotalEnergies, building out web interfaces, or getting the visual details right, I care about things that feel solid and actually work.
            </p>
          </div>

          {/* Staggered Dual Compact Cards: Clean, pill-free metadata plates */}
          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-3.5 sm:grid-cols-2">
            {/* Card 1: Academic Record (enters at 350ms) */}
            <article
              onMouseMove={handleMouseMove}
              className="reveal-on-scroll reveal-delay-350 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 bg-[#14121a]/70 hover:bg-[#181522] border border-[#F2E9DC]/[0.08] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8963C]/90 font-medium">
                    Academic Record
                  </span>
                  <span className="text-[11px] font-mono text-[#F2E9DC]/80 font-semibold">
                    4.87 CGPA
                  </span>
                </div>
                <h3 className="mt-2 font-display text-base sm:text-lg font-semibold tracking-tight text-[#F2E9DC]">
                  First-Class Honours
                </h3>
                <p className="mt-1 text-xs text-[#B8A996] leading-relaxed">
                  Best Graduating Student in Computer Science. Strong foundation in networking, algorithms, and systems.
                </p>
              </div>
            </article>

            {/* Card 2: Approach / Skill Collector (enters at 500ms) */}
            <article
              onMouseMove={handleMouseMove}
              className="reveal-on-scroll reveal-delay-500 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 bg-[#14121a]/70 hover:bg-[#181522] border border-[#F2E9DC]/[0.08] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#4F7CAC] font-medium">
                    Approach
                  </span>
                  <span className="text-[11px] font-mono text-[#F2E9DC]/80 font-semibold">
                    Skill Collector
                  </span>
                </div>
                <h3 className="mt-2 font-display text-base sm:text-lg font-semibold tracking-tight text-[#F2E9DC]">
                  Abstractions → Reality
                </h3>
                <p className="mt-1 text-xs text-[#B8A996] leading-relaxed">
                  Taking rough ideas and building the whole thing out, from the frontend interface down to the network routing underneath.
                </p>
              </div>
            </article>
          </div>

          <div className="reveal-on-scroll reveal-delay-500 mt-6 sm:mt-8">
            <a
              href="#contact"
              className="btn-shimmer btn-tactile group inline-flex items-center gap-2 rounded-full bg-[#E8963C] px-5 py-2.5 text-xs font-display font-semibold text-[#1C1712] shadow-[0_2px_12px_rgba(232,150,60,0.25)] hover:shadow-[0_4px_24px_rgba(232,150,60,0.45)]"
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
