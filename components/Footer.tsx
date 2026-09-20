"use client";

import React, { useEffect, useState, useRef } from "react";
import { personalData } from "@/data/personal";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Top", href: "#hero" },
];

const WATERMARK_LETTERS = ["S", "A", "V", "I", "O", "U", "R"];

export default function Footer() {
  const [lagosTime, setLagosTime] = useState("");
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () =>
      setLagosTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!watermarkRef.current) return;
    const rect = watermarkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    watermarkRef.current.style.setProperty("--wm-x", `${x}px`);
    watermarkRef.current.style.setProperty("--wm-y", `${y}px`);
    watermarkRef.current.style.setProperty("--wm-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!watermarkRef.current) return;
    watermarkRef.current.style.setProperty("--wm-opacity", "0");
  };

  return (
    <footer className="relative overflow-hidden pb-8 pt-8 md:pt-12">
      {/* Interactive Cinematic Watermark Stage */}
      <div
        ref={watermarkRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group/wm relative flex flex-col items-center justify-center select-none py-3 sm:py-4 overflow-hidden w-full max-w-full"
        style={
          {
            "--wm-x": "50%",
            "--wm-y": "50%",
            "--wm-opacity": "0",
          } as React.CSSProperties
        }
      >
        {/* The Giant Watermark Typography Layers */}
        <div className="relative font-display text-[clamp(2.3rem,11.8vw,12rem)] font-black leading-[0.78] tracking-[-0.055em] text-center whitespace-nowrap max-w-full">
          {/* Layer 1: Hollow architectural base stroke with tactile letter-by-letter spring physics */}
          <div className="watermark-text-base relative z-10 flex justify-center">
            {WATERMARK_LETTERS.map((letter, i) => (
              <span key={i} className="watermark-letter">
                {letter}
              </span>
            ))}
          </div>

          {/* Layer 2: Continuous slow cinematic glint sheen traveling across letters */}
          <div
            aria-hidden="true"
            className="watermark-glint pointer-events-none absolute inset-0 z-20 flex justify-center select-none"
          >
            {WATERMARK_LETTERS.join("")}
          </div>

          {/* Layer 3: Interactive cursor torch (molten amber glow following mouse inside the typography) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 flex justify-center select-none transition-opacity duration-300 ease-out"
            style={{
              opacity: "var(--wm-opacity, 0)",
              background:
                "radial-gradient(420px circle at var(--wm-x, 50%) var(--wm-y, 50%), rgba(232, 150, 60, 0.42) 0%, rgba(242, 233, 220, 0.16) 35%, transparent 70%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(232, 150, 60, 0.55)",
            }}
          >
            {WATERMARK_LETTERS.join("")}
          </div>
        </div>
      </div>

      <div className="reveal-on-scroll relative z-10 mt-6 flex flex-col gap-8 border-t border-[#F2E9DC]/10 pt-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a
            href="#hero"
            className="group font-display text-xl font-bold tracking-tight text-[#F2E9DC] transition-colors duration-300 hover:text-[#E8963C] inline-block"
          >
            Saviour
            <span className="text-[#E8963C] inline-block transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </a>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#B8A996]">
            Systems, product, and the space where they become useful.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-[#B8A996]"
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="animated-underline transition-colors duration-200 hover:text-[#F2E9DC]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 text-xs font-mono text-[#B8A996] sm:text-right">
          <span className="flex items-center gap-2 sm:justify-end">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 aura-pulse" />{" "}
            Lagos, NG · {lagosTime || "WAT"}
          </span>
          <span>
            © {new Date().getFullYear()} {personalData.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
