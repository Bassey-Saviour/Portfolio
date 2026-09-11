"use client";

import React, { useState, useEffect } from "react";
import { personalData } from "@/data/personal";
import { IconDownload } from "./Icons";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isScrolled
          ? "bg-[#100f14]/80 backdrop-blur-xl border-b border-[#F2E9DC]/10 py-3.5 shadow-lg shadow-black/30"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-3 text-left focus:outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div>
            <div className="font-display font-bold text-xl text-[#F2E9DC] tracking-tight">
              <span className="text-[#E8963C] transition-colors group-hover:text-[#f3b866]">Saviour</span>{" "}
              <span className="transition-colors group-hover:text-white">Bassey</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-[#211d28]/60 border border-[#F2E9DC]/15 rounded-full px-3 py-1.5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "bg-[#E8963C] text-[#1C1712] font-semibold shadow-[0_2px_12px_rgba(232,150,60,0.3)] scale-[1.03]"
                    : "text-[#B8A996] hover:text-[#F2E9DC] hover:bg-[#F2E9DC]/[0.06] hover:scale-[1.02]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Quick CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="btn-shimmer btn-tactile group flex items-center gap-1.5 text-xs font-mono font-medium text-[#F2E9DC] bg-[#211d28]/75 hover:bg-[#352D24] hover:border-[#E8963C]/50 shadow-md hover:shadow-[0_4px_20px_rgba(232,150,60,0.15)] px-5 py-2 rounded-full transition-all duration-300 border border-[#F2E9DC]/15 backdrop-blur-xl"
          >
            <IconDownload className="w-3.5 h-3.5 text-[#E8963C] transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>CV / Contact</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md bg-[#2A231C] border border-[#F2E9DC]/10 text-[#F2E9DC] focus:outline-none transition-transform active:scale-95"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown with smooth slide & opacity transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#1C1712]/95 border-b border-[#F2E9DC]/10 px-6 py-4 backdrop-blur-xl mt-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-t border-[#F2E9DC]/5 text-sm font-medium transition-colors ${
                  activeSection === link.id ? "text-[#E8963C]" : "text-[#B8A996] hover:text-[#F2E9DC]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#F2E9DC]/10 flex items-center justify-between">
              <span className="text-xs text-[#B8A996] font-mono">Available in Lagos</span>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#E8963C] font-mono hover:underline"
              >
                Download CV →
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
