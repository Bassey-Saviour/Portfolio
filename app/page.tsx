import React from "react";
import Navbar from "@/components/Navbar";
import SectionTracker from "@/components/SectionTracker";
import ScrollReveal from "@/components/ScrollReveal";
import CommandPalette from "@/components/command/CommandPalette";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGrid from "@/components/CursorGrid";

export default function Home() {
  return (
    <div className="site-shell relative min-h-screen text-[#F2E9DC] selection:bg-[#E8963C]/20 selection:text-[#E8963C]">
      <div aria-hidden="true" className="ambient-orb fixed -left-44 top-[30rem] h-[32rem] w-[32rem] rounded-full bg-[#E8963C]/[0.07] blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="ambient-orb fixed -right-48 top-[70rem] h-[36rem] w-[36rem] rounded-full bg-[#4F7CAC]/[0.08] blur-3xl pointer-events-none" />
      {/* Full-page Interactive Background Cursor Grid */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <CursorGrid
          cellSize={35}
          color="#9E5D24"
          radius={110}
          falloff="smooth"
          holdTime={350}
          fadeDuration={700}
          lineWidth={0.5}
          maxOpacity={0.55}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={800}
        />
      </div>

      {/* Top Fixed Navigation */}
      <Navbar />

      {/* Global Interactive Command Palette (Cmd + K / Ctrl + K) */}
      <CommandPalette />

      {/* Global Scroll Reveal Observer */}
      <ScrollReveal />

      {/* Subtle Floating Section Tracker (Bottom Right) */}
      <SectionTracker />

      {/* Main Content Spine */}
      <main className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-4 min-[380px]:px-6 sm:px-8 lg:px-12">
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Work />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
