"use client";

import React, { useEffect, useState } from "react";
import { personalData } from "@/data/personal";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Top", href: "#hero" },
];

export default function Footer() {
  const [lagosTime, setLagosTime] = useState("");

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

  return (
    <footer className="reveal-section relative overflow-hidden pb-8 pt-4">
      {/* Subtle giant watermark typography with ambient depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex justify-center select-none whitespace-nowrap text-center font-display text-[20vw] font-bold leading-[0.78] tracking-[-0.055em] text-[#F2E9DC]/[0.035] sm:text-[16vw] transition-opacity duration-1000"
      >
        SAVIOUR
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-8 border-t border-[#F2E9DC]/10 pt-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
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
