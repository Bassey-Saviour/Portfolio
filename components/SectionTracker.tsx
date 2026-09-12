"use client";

import React, { useEffect, useState } from "react";

interface SectionNode {
  id: string;
  label: string;
}

const SECTIONS: SectionNode[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Focus" },
  { id: "tools", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function SectionTracker() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollBottom = scrollY + windowHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If near page bottom, activate contact
      if (docHeight - scrollBottom < 100) {
        setActiveSection("contact");
        return;
      }

      // Check section offsets
      const scrollPosition = scrollY + windowHeight * 0.38;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className="tracker-enter hidden md:flex fixed bottom-8 right-2.5 md:right-3.5 lg:right-5 z-40 flex-col items-end pointer-events-auto select-none"
    >
      <div className="relative py-2 pr-2.5 flex flex-col items-end gap-4.5 opacity-75 hover:opacity-100 transition-opacity duration-300">
        {/* Delicate vertical spine line on the right */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-[#F2E9DC]/10 to-transparent"
        />

        {SECTIONS.map((section, idx) => {
          const isActive = section.id === activeSection;
          const isPassed = activeIndex > idx;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className="group flex items-center justify-end gap-3 cursor-pointer py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8963C]/40 rounded-full transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Section label to the left of the spine */}
              <div className="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {isActive ? (
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#1e1a24]/55 text-[#F2E9DC]/80 border border-[#F2E9DC]/10 backdrop-blur-xl font-display font-medium text-[11px] tracking-wide shadow-[0_2px_8px_rgba(232,150,60,0.08)]">
                    {section.label}
                  </span>
                ) : (
                  <span
                    className={`text-[11px] font-mono tracking-tight transition-all duration-200 ${
                      isPassed
                        ? "text-[#B8A996]/45 group-hover:text-[#F2E9DC]/80"
                        : "text-[#B8A996]/20 group-hover:text-[#B8A996]/60"
                    }`}
                  >
                    {section.label}
                  </span>
                )}
              </div>

              {/* Soft marker on the vertical track line */}
              <div className="relative z-10 -mr-[3.5px] flex items-center justify-center">
                <span
                  className={`transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] block ${
                    isActive
                      ? "w-2 h-2 rounded-full bg-[#E8963C]/85 shadow-[0_0_8px_rgba(232,150,60,0.35)] scale-105"
                      : isPassed
                      ? "w-1.5 h-1.5 rounded-full bg-[#B8A996]/30 group-hover:bg-[#E8963C]/60 group-hover:scale-125"
                      : "w-1.5 h-1.5 rounded-full bg-[#F2E9DC]/12 group-hover:bg-[#B8A996]/40 group-hover:scale-125"
                  }`}
                />
              </div>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
