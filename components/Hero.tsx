"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { personalData } from "@/data/personal";
import { IconDownload, IconMail, IconGithub, IconLinkedin } from "./Icons";
import InteractiveAsterisk from "./hero/InteractiveAsterisk";

// =============================================================================
// BACKGROUND: Seamless Site Atmosphere & Fluted Glass Columns
// Harmonized with site-shell: #100f14 base, #E8963C amber & #4F7CAC cobalt blooms
// =============================================================================
function HeroAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 98%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 98%)",
      }}
    >
      {/* 1. Base gradient that melts seamlessly into the site-shell #100f14 canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#100f14]/35 via-[#100f14]/10 to-transparent" />

      {/* 2. Top-left warm amber flare (subtly toned down for clean editorial background) */}
      <div
        className="absolute -top-32 -left-28 w-[52rem] h-[52rem] rounded-full opacity-20 blur-[160px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 150, 60, 0.08) 0%, rgba(200, 110, 30, 0.03) 40%, transparent 70%)",
        }}
      />

      {/* 3. Center-right complementary cobalt bloom (subtly softened) */}
      <div
        className="absolute top-1/4 right-[5%] w-[42rem] h-[46rem] rounded-full opacity-15 blur-[160px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79, 124, 172, 0.06) 0%, rgba(50, 80, 120, 0.02) 45%, transparent 70%)",
        }}
      />

      {/* 4. Right side vertical fluted columns — subtle, architectural, melting away before the bottom */}
      <div
        className="absolute top-0 right-0 w-full md:w-[54%] lg:w-[45%] h-full flex justify-end opacity-35"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 95%)",
        }}
      >
        {[
          { glow: "from-[#E8963C]/[0.015] to-transparent", border: "border-[#E8963C]/[0.04]" },
          { glow: "from-[#E8963C]/[0.025] to-transparent", border: "border-[#E8963C]/[0.05]" },
          { glow: "from-[#E8963C]/[0.04] via-[#E8963C]/[0.015] to-transparent", border: "border-[#E8963C]/[0.06]" },
          { glow: "from-[#E8963C]/[0.06] via-[#E8963C]/[0.02] to-transparent", border: "border-[#E8963C]/[0.08]" },
          { glow: "from-[#E8963C]/[0.09] via-[#E8963C]/[0.03] to-transparent", border: "border-[#E8963C]/[0.10]" },
          { glow: "from-[#E8963C]/[0.12] via-[#E8963C]/[0.04] to-transparent", border: "border-[#E8963C]/[0.12]" },
        ].map((col, idx) => (
          <div
            key={`pillar-${idx}`}
            className={`relative h-full flex-1 border-l ${col.border} bg-gradient-to-b ${col.glow}`}
          >
            {/* Subtle luminous vertical highlight streak */}
            <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-gradient-to-b from-[#ff9a3d]/15 via-[#E8963C]/05 to-transparent" />
          </div>
        ))}
      </div>

      {/* 5. Delicate noise texture overlay for high-end editorial grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

// =============================================================================
// SCRAMBLE LETTER:
// - On hover: cycles through random alphanumeric characters
// - Slower pace (85ms per tick) & longer duration (~1.2s total)
// =============================================================================
// SCRAMBLE LETTER:
// - Speed: 58ms per tick, ~10 iterations (~600ms total) - snappy & energetic
// - Width-Locking: Uses a hidden ghost character of the true letter so the
//   container width NEVER fluctuates during scramble, preventing horizontal jitter
// - Cosmos-style entrance: masked slide-up using CSS transform & staggered delay
// =============================================================================
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleLetter({
  char,
  delay,
  hasEntered,
}: {
  char: string;
  delay: number;
  hasEntered: boolean;
}) {
  const [display, setDisplay] = useState(char);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleEnter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iterations = 0;
    const maxIterations = 10; // ~580ms snappy scramble

    intervalRef.current = setInterval(() => {
      iterations++;
      if (iterations >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(char);
        return;
      }
      setDisplay(
        SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      );
    }, 58); // 58ms per tick: crisp, responsive, and readable
  }, [char]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    // Outer slot: overflow-visible so diagonal overhangs of A, Y, V, etc. are 100% unclipped
    <span
      className="relative inline-block overflow-visible align-baseline select-none cursor-default text-center"
      onMouseEnter={handleEnter}
    >
      {/* 1. Ghost of the real character: locks the exact width and line height permanently */}
      <span
        className="invisible opacity-0 select-none pointer-events-none font-black tracking-tight"
        aria-hidden="true"
      >
        {char}
      </span>

      {/* 2. Visible animated & scrambling character centered over the locked slot */}
      <span
        className="absolute inset-0 flex items-center justify-center transform-gpu text-[#F5EFE6] will-change-transform font-black tracking-tight"
        style={{
          transform: hasEntered ? "translateY(0%)" : "translateY(18px)",
          opacity: hasEntered ? 1 : 0,
          filter: hasEntered ? "blur(0px)" : "blur(3px)",
          transitionProperty: "transform, opacity, filter",
          transitionDuration: "750ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {display}
      </span>
    </span>
  );
}

// =============================================================================
// MAIN HERO COMPONENT
// =============================================================================
export default function Hero() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Trigger entrance transition reliably on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 80);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const heroHeight = window.innerHeight;
          const progress = Math.min(Math.max(y / heroHeight, 0), 1);

          // 1. Hero Content Scale:
          // Scales down from 1.0 to ~0.52 as you scroll down.
          // Scales back up to 1.0 as you scroll back up to the top.
          if (scrollContainerRef.current) {
            const scale = Math.max(1 - progress * 0.45, 0.52);
            const translateY = y * 0.44;
            const opacity = Math.max(1 - progress * 0.88, 0);

            scrollContainerRef.current.style.transform = `translate3d(0, -${translateY}px, 0) scale(${scale})`;
            scrollContainerRef.current.style.opacity = `${opacity}`;
          }

          // 2. WELCOME Watermark:
          // On mobile: sits boldly at the base of the screen, expanding slightly on scroll
          // On desktop: starts on the right (at progress = 0) and centers as you scroll down
          if (watermarkRef.current) {
            const isMob = window.innerWidth < 768;
            const startOffsetVw = isMob ? 0 : 24;

            // Centers progressively within the first 75% of hero scroll
            const centerProgress = Math.min(progress / 0.75, 1);
            // Smooth ease-out cubic curve for natural physical momentum
            const eased = 1 - Math.pow(1 - centerProgress, 3);

            const currentOffset = (1 - eased) * startOffsetVw;
            const currentScale = isMob ? (1.00 + eased * 0.12) : (0.85 + eased * 0.43);
            const currentOpacity = isMob
              ? Math.max(0.10 + progress * 0.05, 0)
              : Math.max((1 + progress * 1.18) * 0.026, 0);
            const currentY = isMob ? (5 - eased * 5) : 36;

            watermarkRef.current.style.transform = `translate3d(calc(-50% + ${currentOffset}vw), ${currentY}%, 0) scale(${currentScale})`;
            watermarkRef.current.style.opacity = `${currentOpacity}`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const firstName = "SAVIOUR";
  const lastName = "BASSEY";
  const allLetters = [...firstName.split(""), " ", ...lastName.split("")];

  // Stagger parameters for Cosmos-style entrance
  const LETTER_STAGGER = 55;
  const NAME_BASE_DELAY = 350;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between items-center pt-20 sm:pt-24 pb-8 sm:pb-12 select-none overflow-hidden"
    >
      {/* 1. Toned-Down Background Atmosphere */}
      <HeroAtmosphere />

      {/* 2. Main Center Content Container with Scroll Drag */}
      <div
        ref={scrollContainerRef}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-4 min-[380px]:px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center md:justify-between items-center will-change-transform origin-center transition-opacity py-2 min-[380px]:py-3 sm:py-5 pointer-events-none"
      >
        {/* Desktop-only top spacer to balance bottom-docked row */}
        <div className="hidden md:block w-full h-16 lg:h-20 pointer-events-none shrink-0" aria-hidden="true" />

        {/* =========================================================================
            CENTERED HERO CLUSTER:
            - On Mobile: Single unified flexbox column vertically DEAD CENTER (my-auto):
                1. Asterisk (in-flow, solid white, chunky brutalist 64px bars)
                2. Name Block ("I AM" + "SAVIOUR BASSEY" + "SYSTEMS ENGINEER...")
                3. Action Buttons & Tagline (balanced directly below the name)
            - On Desktop:
                - Name block sits at center of the 3-row layout
                - Asterisk is absolutely positioned on the right
                - Action buttons are rendered in the desktop bottom row
           ========================================================================= */}
        <div className="flex flex-col items-center justify-center my-auto w-full md:my-0">
          {/* 1. Asterisk (In-flow on mobile, absolute docked right on desktop) */}
          <InteractiveAsterisk />

          {/* 2. Center Typographic Unit: "I AM" + Name + Subtitle */}
          <div className="relative inline-flex flex-col items-center max-w-full pointer-events-auto mt-1 sm:mt-0">
            {/* Top-Left Offset: "I AM" */}
            <div
              className="self-start pl-1 sm:pl-1.5 mb-1 sm:mb-1.5 transition-all duration-700"
              style={{
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? "translateY(0)" : "translateY(-8px)",
                transitionDelay: "180ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="font-mono text-[10.5px] sm:text-xs tracking-[0.20em] uppercase text-[#B8A996]/85 font-medium block select-none">
                I AM
              </span>
            </div>

            {/* Center: Massive Name in Heavy Block Letters */}
            <h1 className="font-display uppercase whitespace-nowrap leading-[0.92] select-none text-[clamp(1.65rem,7.2vw,8rem)] tracking-tight hero-name-stroke">
              {allLetters.map((char, index) => {
                if (char === " ") {
                  return (
                    <span key={`sp-${index}`} className="inline-block w-[0.28em]">
                      &nbsp;
                    </span>
                  );
                }
                return (
                  <ScrambleLetter
                    key={`letter-${index}`}
                    char={char}
                    delay={NAME_BASE_DELAY + index * LETTER_STAGGER}
                    hasEntered={hasEntered}
                  />
                );
              })}
            </h1>

            {/* Bottom-Right Offset: "SYSTEMS ENGINEER, SKILLS COLLECTOR" */}
            <div
              className="self-end pr-1 sm:pr-1.5 mt-1 sm:mt-1.5 transition-all duration-700"
              style={{
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? "translateY(0)" : "translateY(8px)",
                transitionDelay: "1150ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.16em] uppercase text-[#B8A996]/85 font-medium block select-none">
                SYSTEMS ENGINEER, SKILLS COLLECTOR
              </span>
            </div>
          </div>

          {/* 3. Mobile Action Buttons & Tagline (Rendered directly under the Name Block in the centered cluster) */}
          <div
            className="md:hidden flex flex-col items-center text-center z-20 max-w-md mx-auto mt-4 min-[380px]:mt-5 transition-all duration-700 pointer-events-auto"
            style={{
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? "translateY(0)" : "translateY(14px)",
              transitionDelay: "1350ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Tagline */}
            <p className="font-body text-xs min-[360px]:text-sm text-[#B8A996] tracking-normal leading-relaxed mb-2.5 min-[380px]:mb-3 font-normal">
              I build systems, then make them make sense.
            </p>

            {/* Action Buttons: Centered on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-2 min-[380px]:gap-2.5 mt-0.5">
              {/* Primary View Resume Pill */}
              <a
                href={personalData.cv?.downloadUrl || "#contact"}
                target={personalData.cv?.downloadUrl ? "_blank" : undefined}
                rel={personalData.cv?.downloadUrl ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 px-4 min-[380px]:px-5 py-2 min-[380px]:py-2.5 rounded-full bg-[#E8963C] hover:bg-[#d5842d] text-[#1C1712] font-display font-semibold text-xs transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-98 shadow-[0_3px_12px_rgba(232,150,60,0.3)]"
              >
                <IconDownload className="w-3.5 h-3.5 text-[#1C1712] transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>View Resume</span>
              </a>

              {/* Secondary Contact Me Pill */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-4 min-[380px]:px-5 py-2 min-[380px]:py-2.5 rounded-full bg-[#2A231C]/70 hover:bg-[#2A231C] border border-[#F2E9DC]/20 hover:border-[#E8963C]/70 text-[#F2E9DC] font-display font-medium text-xs transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-98 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.3)]"
              >
                <IconMail className="w-3.5 h-3.5 text-[#E8963C] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span>Contact Me</span>
              </a>

              {/* Tactile Social Buttons */}
              <div className="flex items-center gap-1.5 ml-0.5 min-[380px]:ml-1">
                <a
                  href={
                    personalData.contact.socials.find((s) => s.icon === "github")
                      ?.url || "https://github.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#2A231C]/70 hover:bg-[#2A231C] border border-[#F2E9DC]/15 hover:border-[#E8963C]/60 text-[#B8A996] hover:text-[#F2E9DC] transition-all duration-300 hover:scale-110 hover:rotate-6 backdrop-blur-md"
                  aria-label="GitHub Profile"
                >
                  <IconGithub className="w-3.5 h-3.5" />
                </a>
                <a
                  href={
                    personalData.contact.socials.find((s) => s.icon === "linkedin")
                      ?.url || "https://linkedin.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#2A231C]/70 hover:bg-[#2A231C] border border-[#F2E9DC]/15 hover:border-[#E8963C]/60 text-[#B8A996] hover:text-[#F2E9DC] transition-all duration-300 hover:scale-110 hover:-rotate-6 backdrop-blur-md"
                  aria-label="LinkedIn Profile"
                >
                  <IconLinkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop-only bottom-docked row: Tagline + Action buttons */}
        <div className="hidden md:flex w-full items-end justify-between gap-6 pb-4 relative overflow-visible pointer-events-auto">
          {/* Subtext & Action Buttons: Docked left on desktop */}
          <div
            className="flex flex-col items-start text-left z-20 max-w-md transition-all duration-700"
            style={{
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? "translateY(0)" : "translateY(14px)",
              transitionDelay: "1350ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Tagline */}
            <p className="font-body text-[0.95rem] text-[#B8A996] tracking-normal leading-relaxed mb-4 font-normal">
              I build systems, then make them make sense.
            </p>

            {/* Action Buttons: Docked left */}
            <div className="flex items-center gap-3 mt-0.5">
              {/* Primary View Resume Pill */}
              <a
                href={personalData.cv?.downloadUrl || "#contact"}
                target={personalData.cv?.downloadUrl ? "_blank" : undefined}
                rel={personalData.cv?.downloadUrl ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8963C] hover:bg-[#d5842d] text-[#1C1712] font-display font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-98 shadow-[0_3px_12px_rgba(232,150,60,0.3)]"
              >
                <IconDownload className="w-3.5 h-3.5 text-[#1C1712] transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>View Resume</span>
              </a>

              {/* Secondary Contact Me Pill */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2A231C]/70 hover:bg-[#2A231C] border border-[#F2E9DC]/20 hover:border-[#E8963C]/70 text-[#F2E9DC] font-display font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-98 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.3)]"
              >
                <IconMail className="w-3.5 h-3.5 text-[#E8963C] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span>Contact Me</span>
              </a>

              {/* Tactile Social Buttons */}
              <div className="flex items-center gap-1.5 ml-1">
                <a
                  href={
                    personalData.contact.socials.find((s) => s.icon === "github")
                      ?.url || "https://github.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#2A231C]/70 hover:bg-[#2A231C] border border-[#F2E9DC]/15 hover:border-[#E8963C]/60 text-[#B8A996] hover:text-[#F2E9DC] transition-all duration-300 hover:scale-110 hover:rotate-6 backdrop-blur-md"
                  aria-label="GitHub Profile"
                >
                  <IconGithub className="w-3.5 h-3.5" />
                </a>
                <a
                  href={
                    personalData.contact.socials.find((s) => s.icon === "linkedin")
                      ?.url || "https://linkedin.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#2A231C]/70 hover:bg-[#2A231C] border border-[#F2E9DC]/15 hover:border-[#E8963C]/60 text-[#B8A996] hover:text-[#F2E9DC] transition-all duration-300 hover:scale-110 hover:-rotate-6 backdrop-blur-md"
                  aria-label="LinkedIn Profile"
                >
                  <IconLinkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Watermark: "WELCOME"
          - On mobile: anchored prominently at the base of the view screen (22vw clamp)
          - On desktop: starts positioned on the right and centers as you scroll down
      */}
      <div
        ref={watermarkRef}
        className="absolute left-1/2 bottom-0 pointer-events-none select-none z-10 overflow-hidden leading-none w-full text-center will-change-transform"
        style={{
          opacity: hasEntered ? (isMobile ? 0.11 : 0.038) : 0,
          transform: isMobile
            ? "translate3d(-50%, 5%, 0) scale(1.0)"
            : "translate3d(-50%, 38%, 0) scale(0.95)",
          transition: "opacity 900ms ease",
          maskImage: isMobile
            ? "linear-gradient(to bottom, black 55%, transparent 96%)"
            : "linear-gradient(to bottom, black 25%, transparent 92%)",
          WebkitMaskImage: isMobile
            ? "linear-gradient(to bottom, black 55%, transparent 96%)"
            : "linear-gradient(to bottom, black 25%, transparent 92%)",
        }}
        aria-hidden="true"
      >
        <span className="font-display font-black uppercase text-[clamp(4.8rem,22vw,14rem)] leading-[0.74] tracking-tight inline-block text-[#F5EFE6] select-none whitespace-nowrap">
          WELCOME
        </span>
      </div>

      {/* 4. Thematic Horizon Seam: Soft, blended division rule harmonized with site amber and cream tones */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full h-[1px] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232, 150, 60, 0.12) 12%, rgba(242, 233, 220, 0.20) 42%, rgba(232, 150, 60, 0.34) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Pronounced luminous amber ribbon hugging the seam */}
      <div
        className="absolute -bottom-[1px] left-0 right-0 w-full h-[2px] pointer-events-none z-10 blur-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(232, 150, 60, 0.15) 20%, rgba(232, 150, 60, 0.42) 65%, rgba(232, 150, 60, 0.25) 85%, transparent 98%)",
        }}
        aria-hidden="true"
      />

      {/* Atmospheric diffused amber bloom radiating softly below the line */}
      <div
        className="absolute -bottom-3 right-0 w-4/5 md:w-3/5 h-8 pointer-events-none z-0 blur-lg opacity-85"
        style={{
          background:
            "radial-gradient(ellipse at 65% 50%, rgba(232, 150, 60, 0.30) 0%, rgba(232, 150, 60, 0.12) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <style jsx>{`
        .hero-name-stroke {
          -webkit-text-stroke: 0.6px currentColor;
        }
      `}</style>
    </section>
  );
}


