import React from "react";

const tools = [
  { name: "React", color: "#61DAFB", bg: "rgba(97,218,251,.12)", type: "react" },
  { name: "Next.js", color: "#F2E9DC", bg: "rgba(242,233,220,.08)", type: "next" },
  { name: "Tailwind", color: "#38BDF8", bg: "rgba(56,189,248,.12)", type: "tailwind" },
  { name: "Python", color: "#FFD43B", bg: "rgba(255,212,59,.12)", type: "python" },
  { name: "Git", color: "#F05032", bg: "rgba(240,80,50,.12)", type: "git" },
  { name: "MySQL", color: "#4D8DAC", bg: "rgba(77,141,172,.12)", type: "mysql" },
  { name: "Figma", color: "#F24E1E", bg: "rgba(242,78,30,.12)", type: "figma" },
  { name: "Canva", color: "#7D2AE8", bg: "rgba(125,42,232,.12)", type: "canva" },
  { name: "Cisco", color: "#1BA0D7", bg: "rgba(27,160,215,.12)", type: "cisco" },
];

function BrandMark({ type, color }: { type: string; color: string }) {
  if (type === "react") return <svg viewBox="-11.5 -10.2 23 20.4" fill="none" className="h-7 w-7 transition-transform duration-300 group-hover:rotate-180" style={{ color }}><circle r="2.05" fill="currentColor" /><g stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>;
  if (type === "tailwind") return <svg viewBox="0 0 24 24" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="currentColor" style={{ color }}><path d="M12 5.2C8.8 5.2 6.8 6.8 6 10c1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.62C13.67 11.02 15.03 12.4 18 12.4c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.62C16.34 6.58 14.98 5.2 12 5.2ZM6 12.4c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.62C7.67 18.22 9.03 19.6 12 19.6c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.62C10.34 13.78 8.98 12.4 6 12.4Z" /></svg>;
  if (type === "git") return <svg viewBox="0 0 24 24" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="currentColor" style={{ color }}><path d="M23.55 10.93 13.07.45a1.5 1.5 0 0 0-2.13 0L8.81 2.59l3.25 3.25a2.21 2.21 0 0 1 2.8 2.8l3.14 3.14a2.21 2.21 0 1 1-1.07 1.07l-2.92-2.92a2.21 2.21 0 0 1-2.48-.5l-3.28 3.28a2.21 2.21 0 1 1-1.07-1.07l3.22-3.22a2.21 2.21 0 0 1 .5-2.48L7.63 2.76 1.45 8.94a1.5 1.5 0 0 0 0 2.13l10.48 10.48a1.5 1.5 0 0 0 2.13 0l9.49-9.49a1.5 1.5 0 0 0 0-2.13Z" /></svg>;
  if (type === "figma") return <svg viewBox="0 0 24 24" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" style={{ color }}><path fill="#F24E1E" d="M8 0h4v8H8a4 4 0 1 1 0-8Z" /><path fill="#FF7262" d="M12 0h4a4 4 0 1 1 0 8h-4Z" /><path fill="#A259FF" d="M8 8h4v8H8a4 4 0 1 1 0-8Z" /><path fill="#1ABCFE" d="M12 8h4a4 4 0 1 1 0 8h-4Z" /><path fill="#0ACF83" d="M8 16h4v4a4 4 0 1 1-4-4Z" /></svg>;
  if (type === "next") return <span className="font-display text-2xl font-bold tracking-tighter transition-transform duration-300 group-hover:scale-110" style={{ color }}>N</span>;
  if (type === "python") return <span className="font-display text-xl font-bold transition-transform duration-300 group-hover:scale-110" style={{ color }}>Py</span>;
  if (type === "mysql") return <span className="font-display text-xl font-bold italic transition-transform duration-300 group-hover:scale-110" style={{ color }}>My</span>;
  if (type === "canva") return <span className="font-display text-xl font-bold italic transition-transform duration-300 group-hover:scale-110" style={{ color }}>C</span>;
  return <span className="font-display text-xl font-bold transition-transform duration-300 group-hover:scale-110" style={{ color }}>⌁</span>;
}

export default function TechStack() {
  return (
    <section id="tools" className="reveal-section py-20 md:py-24 border-t section-rule">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-kicker">03 / Daily drivers</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F2E9DC] sm:text-5xl">
            Tools with <span className="text-[#E8963C]">taste.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#B8A996]">
          A compact stack for building, designing, and keeping the lights on.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group aspect-square rounded-2xl border border-[#F2E9DC]/[0.08] bg-[#17141d]/45 p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#F2E9DC]/30 hover:bg-[#211d28]/70 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
            style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,.04)` }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
              style={{ backgroundColor: tool.bg }}
            >
              <BrandMark type={tool.type} color={tool.color} />
            </div>
            <p className="mt-4 text-[11px] font-mono text-[#F2E9DC] transition-colors duration-200 group-hover:text-white font-medium">
              {tool.name}
            </p>
            <span
              className="mt-1 block h-px w-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-9"
              style={{ backgroundColor: tool.color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
