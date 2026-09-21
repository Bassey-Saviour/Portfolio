"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconDownload } from "./Icons";
import { openCommandPalette } from "./command/CommandPalette";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const checkModal = () => {
      setIsModalOpen(document.body.classList.contains("modal-open"));
    };

    // Check initially
    checkModal();

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "work", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted && !isModalOpen
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0 pointer-events-none"
        } ${isScrolled
          ? "bg-[#100f14]/85 backdrop-blur-xl border-b border-[#F2E9DC]/10 py-3 sm:py-2.5 shadow-sm shadow-black/30"
          : "bg-transparent py-4 sm:py-5 border-b border-transparent"
        }`}
    >
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-4 min-[380px]:px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-3 text-left focus:outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div>
            <div className="font-display font-bold text-xl sm:text-2xl text-[#F2E9DC] tracking-tight">
              <span className="text-[#E8963C] transition-colors group-hover:text-[#f3b866]">Saviour</span>{" "}
              <span className="transition-colors group-hover:text-white">Bassey</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 px-3 py-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 text-xs font-medium rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                  ? "bg-[#E8963C] text-[#1C1712] font-semibold shadow-[0_2px_12px_rgba(232,150,60,0.3)] scale-[1.03] px-3.5"
                  : "text-[#B8A996] hover:text-[#F2E9DC] hover:scale-[1.02] animated-underline"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions: Command Palette Trigger & Desktop CV / Contact */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={openCommandPalette}
            className="flex items-center justify-center px-3 py-1.5 rounded-full bg-[#211d28]/70 btn-tactile btn-shimmer hover:bg-[#2a2434] border border-[#F2E9DC]/12 hover:border-[#E8963C]/40 text-[#B8A996] hover:text-[#F2E9DC] lg:text-[11px] sm:text-[13px] font-mono transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
            aria-label="Open command palette (Cmd+K)"
            title="Command Palette (Cmd+K)"
          >
            <span>⌘K</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:flex btn-shimmer btn-tactile group items-center gap-1.5 text-xs font-mono font-medium text-[#F2E9DC] bg-[#211d28]/75 hover:bg-[#352D24] hover:border-[#E8963C]/50 hover:shadow-[0_4px_20px_rgba(232,150,60,0.15)] px-4 py-2 sm:px-5 rounded-full transition-all duration-300 border border-[#F2E9DC]/15 backdrop-blur-xl"
          >
            <IconDownload className="w-3.5 h-3.5 text-[#E8963C] transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>CV / Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}
