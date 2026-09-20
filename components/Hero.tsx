"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { IconDownload, IconMail, IconGithub, IconLinkedin } from "./Icons";

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[95vh] flex items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24 overflow-visible"
    >
      {/* Background Radial Glow with subtle breathing aura */}
      <div
        aria-hidden="true"
        className="aura-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] rounded-full pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(232, 150, 60, 0.16) 0%, rgba(232, 150, 60, 0.04) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Hero Canvas Container */}
      <div className="relative z-10 w-full">
        {/* =========================================
            DESKTOP VIEW (>= lg)
           ========================================= */}
        <div className="hidden lg:block relative w-full select-none">
          <div className="relative h-[620px] w-full">
            {/* Top-Right Micro-Copy */}
            <div
              className={`absolute right-0 top-6 text-right z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              }`}
            >
              <p className="text-xs font-mono text-[#F2E9DC] leading-snug">
                Based in Nigeria
                <br />
                <span className="text-[#B8A996]">Creative technology consultant</span>
              </p>
            </div>

            {/* Centered Cutout Portrait */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-2 w-[440px] h-[550px] z-10 pointer-events-none transition-opacity duration-1000 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="float-slow relative w-full h-full"
                style={{
                  maskImage: "linear-gradient(to bottom, black 12%, transparent 98%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 90%)",
                }}
              >
                {!imgError ? (
                  <Image
                    src="/saviour-portrait.png"
                    alt="Saviour Bassey"
                    fill
                    priority
                    sizes="(max-width: 1280px) 440px, 480px"
                    className="object-cover object-top filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 hover:scale-[1.02]"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback preview if saviour-portrait.png is pending upload */
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#2A231C]/30 border border-[#E8963C]/20 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
                    <div className="w-16 h-16 rounded-full bg-[#E8963C]/10 border border-[#E8963C]/30 flex items-center justify-center text-[#E8963C] text-xl font-display font-bold mb-3 shadow-[0_0_20px_rgba(232,150,60,0.2)]">
                      SB
                    </div>
                    <p className="text-xs font-mono text-[#E8963C] mb-1">Portrait Asset</p>
                    <p className="text-[11px] font-mono text-[#B8A996]">
                      Place your cutout in:
                      <br />
                      <code className="text-[#F2E9DC] bg-[#1C1712] px-1.5 py-0.5 rounded mt-1 inline-block">
                        public/saviour-portrait.png
                      </code>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Left Primary Headline: "I build systems" */}
            <div
              className={`absolute left-0 top-24 z-20 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="font-display font-bold text-6xl xl:text-[5.25rem] tracking-tight text-[#F2E9DC] leading-[0.96]">
                I build
                <br />
                systems
              </h1>
            </div>

            {/* Right Secondary Headline: "then make them make sense" */}
            <div
              className={`absolute right-0 top-60 xl:top-68 z-20 text-right transition-all duration-800 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="font-display font-bold text-6xl xl:text-[5.25rem] tracking-tight text-[#E8963C] text-shadow-lg leading-[0.96]">
                then make them
                <br />
                make sense
              </p>
            </div>

            {/* Bottom-Left Micro-Copy */}
            <div
              className={`absolute left-0 bottom-30 z-20 text-left transition-all duration-800 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="text-xs font-mono text-[#F2E9DC] leading-relaxed">
                <span className="text-[#F2E9DC]">Saviour Bassey</span>
                <br />
                <span className="text-[#B8A996]">Creative Engineer</span>
                <br />
                <span className="text-[#B8A996]">Direction - Systems Thinking</span>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col justify-center items-center mx-auto gap-6 pt-6 pb-4 transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-base sm:text-lg font-display text-[#F2E9DC]/90 text-center max-w-xl leading-relaxed">
              First-Class CS graduate. I build systems and make them make sense.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="btn-shimmer btn-tactile group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8963C] hover:bg-[#d5842d] text-[#1C1712] font-display font-semibold text-sm shadow-[0_2px_12px_rgba(232,150,60,0.25)] hover:shadow-[0_4px_24px_rgba(232,150,60,0.45)]"
              >
                <IconDownload className="w-4 h-4 text-[#1C1712] transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>View Resume</span>
              </a>
              <a
                href="#contact"
                className="btn-tactile group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2A231C] hover:bg-[#352D24] border border-[#F2E9DC]/15 hover:border-[#E8963C]/60 text-[#F2E9DC] font-display font-medium text-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <IconMail className="w-4 h-4 text-[#E8963C] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span>Contact Me</span>
              </a>
              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a
                  href={personalData.contact.socials.find((s) => s.icon === "github")?.url || "https://github.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile p-2.5 rounded-full bg-[#2A231C]/60 hover:bg-[#2A231C] border border-[#F2E9DC]/10 hover:border-[#4F7CAC]/60 text-[#B8A996] hover:text-[#F2E9DC] hover:scale-110 hover:rotate-6 hover:shadow-[0_0_16px_rgba(79,124,172,0.3)]"
                  aria-label="GitHub Profile"
                >
                  <IconGithub className="w-4 h-4" />
                </a>
                <a
                  href={personalData.contact.socials.find((s) => s.icon === "linkedin")?.url || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile p-2.5 rounded-full bg-[#2A231C]/60 hover:bg-[#2A231C] border border-[#F2E9DC]/10 hover:border-[#4F7CAC]/60 text-[#B8A996] hover:text-[#F2E9DC] hover:scale-110 hover:-rotate-6 hover:shadow-[0_0_16px_rgba(79,124,172,0.3)]"
                  aria-label="LinkedIn Profile"
                >
                  <IconLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Stat Badges */}
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-2 pt-2">
              <div className="group/stat cursor-default px-3 sm:px-4 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-display font-bold text-2xl sm:text-2xl text-[#E8963C] leading-[0.2] mb-1 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_14px_rgba(232,150,60,0.6)]">4.87</p>
                <span className="text-[#B8A996] font-display text-xs group-hover/stat:text-[#F2E9DC] transition-colors">CGPA</span>
              </div>
              <div className="group/stat cursor-default px-3 sm:px-4 border-l border-[#F2E9DC]/10 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-display font-bold text-2xl sm:text-2xl text-[#E8963C] leading-[0.2] mb-1 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_14px_rgba(232,150,60,0.6)]">2+</p>
                <span className="text-[#B8A996] font-display text-xs group-hover/stat:text-[#F2E9DC] transition-colors">Years Exp.</span>
              </div>
              <div className="group/stat cursor-default px-3 sm:px-4 border-l border-[#F2E9DC]/10 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-display font-bold text-2xl sm:text-2xl text-[#E8963C] leading-[0.2] mb-1 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_14px_rgba(232,150,60,0.6)]">1st</p>
                <span className="text-[#B8A996] font-display text-xs group-hover/stat:text-[#F2E9DC] transition-colors">Class Honors</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            TABLET & MOBILE VIEW (< lg)
           ========================================= */}
        <div
          className={`lg:hidden flex flex-col items-center text-center pt-2 pb-6 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Top Micro-Copy */}
          <div className="mb-5 inline-flex flex-col items-center text-xs font-mono text-[#B8A996]">
            <span className="text-[#F2E9DC] font-medium">Based in Nigeria</span>
            <span>Creative technology consultant</span>
          </div>

          {/* Portrait Container */}
          <div className="relative w-48 h-60 min-[380px]:w-56 min-[380px]:h-72 sm:w-68 sm:h-84 mb-5">
            <div
              className="relative w-full h-full float-slow"
              style={{
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            >
              {!imgError ? (
                <Image
                  src="/saviour-portrait.png"
                  alt="Saviour Bassey"
                  fill
                  priority
                  sizes="(max-width: 380px) 220px, (max-width: 640px) 260px, 320px"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 rounded-xl bg-[#2A231C]/40 border border-[#E8963C]/20">
                  <div className="w-12 h-12 rounded-full bg-[#E8963C]/10 border border-[#E8963C]/30 flex items-center justify-center text-[#E8963C] font-display font-bold mb-2 shadow-[0_0_15px_rgba(232,150,60,0.2)]">
                    SB
                  </div>
                  <p className="text-[11px] font-mono text-[#B8A996]">
                    public/saviour-portrait.png
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Headlines */}
          <div className="space-y-1.5 mb-4">
            <h1 className="font-display font-bold text-3xl min-[360px]:text-4xl sm:text-5xl text-[#F2E9DC] tracking-tight leading-[1.08]">
              I build systems
            </h1>
            <p className="font-display font-bold text-3xl min-[360px]:text-4xl sm:text-5xl text-[#E8963C] tracking-tight leading-[1.08]">
              then make them make sense
            </p>
          </div>

          {/* Lead Bio Description */}
          <p className="text-sm min-[380px]:text-base sm:text-lg font-display text-[#F2E9DC]/90 text-center max-w-md leading-relaxed mb-6 px-2">
            First-Class CS graduate. I build systems and make them make sense.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-sm">
            <a
              href="#contact"
              className="btn-shimmer btn-tactile group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#E8963C] hover:bg-[#d5842d] text-[#1C1712] font-display font-semibold text-xs sm:text-sm shadow-[0_2px_12px_rgba(232,150,60,0.25)] hover:shadow-[0_4px_24px_rgba(232,150,60,0.45)]"
            >
              <IconDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1712] transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>View Resume</span>
            </a>
            <a
              href="#contact"
              className="btn-tactile group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#2A231C] hover:bg-[#352D24] border border-[#F2E9DC]/15 hover:border-[#E8963C]/60 text-[#F2E9DC] font-display font-medium text-xs sm:text-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <IconMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8963C] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>Contact Me</span>
            </a>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href={personalData.contact.socials.find((s) => s.icon === "github")?.url || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile p-2.5 rounded-full bg-[#2A231C]/60 hover:bg-[#2A231C] border border-[#F2E9DC]/10 hover:border-[#4F7CAC]/60 text-[#B8A996] hover:text-[#F2E9DC] hover:scale-110 hover:rotate-6 hover:shadow-[0_0_16px_rgba(79,124,172,0.3)]"
                aria-label="GitHub Profile"
              >
                <IconGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={personalData.contact.socials.find((s) => s.icon === "linkedin")?.url || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile p-2.5 rounded-full bg-[#2A231C]/60 hover:bg-[#2A231C] border border-[#F2E9DC]/10 hover:border-[#4F7CAC]/60 text-[#B8A996] hover:text-[#F2E9DC] hover:scale-110 hover:-rotate-6 hover:shadow-[0_0_16px_rgba(79,124,172,0.3)]"
                aria-label="LinkedIn Profile"
              >
                <IconLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Stat Badges */}
          <div className="flex flex-row justify-center items-center gap-2 min-[380px]:gap-3 sm:gap-4 pt-5">
            <div className="group/stat cursor-default px-2.5 sm:px-4 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-display font-bold text-xl min-[380px]:text-2xl text-[#E8963C] leading-none mb-1 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_14px_rgba(232,150,60,0.6)]">4.87</p>
              <span className="text-[#B8A996] font-display text-[11px] sm:text-xs group-hover/stat:text-[#F2E9DC] transition-colors">CGPA</span>
            </div>
            <div className="group/stat cursor-default px-2.5 sm:px-4 border-l border-[#F2E9DC]/10 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-display font-bold text-xl min-[380px]:text-2xl text-[#E8963C] leading-none mb-1 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_14px_rgba(232,150,60,0.6)]">2+</p>
              <span className="text-[#B8A996] font-display text-[11px] sm:text-xs group-hover/stat:text-[#F2E9DC] transition-colors">Years Exp.</span>
            </div>
            <div className="group/stat cursor-default px-2.5 sm:px-4 border-l border-[#F2E9DC]/10 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-display font-bold text-xl min-[380px]:text-2xl text-[#E8963C] leading-none mb-1 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_14px_rgba(232,150,60,0.6)]">1st</p>
              <span className="text-[#B8A996] font-display text-[11px] sm:text-xs group-hover/stat:text-[#F2E9DC] transition-colors">Class Honors</span>
            </div>
          </div>

          {/* Bottom Micro-Copy */}
          <div className="inline-block text-xs font-mono text-[#B8A996] leading-relaxed border-t border-[#F2E9DC]/10 pt-4 mt-6 px-4">
            <span className="text-[#F2E9DC] font-medium">Bassey Saviour</span> · Creative Engineer
            <br />
            <span>Direction - Systems Thinking</span>
          </div>
        </div>
      </div>
    </section>
  );
}
