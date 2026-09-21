"use client";

import React, { useState } from "react";
import { personalData } from "@/data/personal";
import { IconArrowUpRight, IconCheck, IconCopy, IconDownload, IconGithub, IconLinkedin, IconMail } from "./Icons";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copiedDraft, setCopiedDraft] = useState(false);
  const { handleMouseMove } = useCardSpotlight();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personalData.contact.email);
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSendEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const subject = `Opportunity / Inquiry from ${name.trim() || "Portfolio Visitor"}`;
    const bodyContent = `${message.trim() || "Hi Saviour, I'd like to connect regarding an opportunity."}\n\n—\nFrom: ${name.trim() || "Visitor"}${email.trim() ? ` (${email.trim()})` : ""}`;

    const mailtoUrl = `mailto:${personalData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;
  };

  const copyDraft = async () => {
    const textToCopy = `${message.trim() || "Hi Saviour, I'd like to connect."}\n\n—\n${name.trim() || "Visitor"}${email.trim() ? ` (${email.trim()})` : ""}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopiedDraft(true);
    window.setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 lg:py-32 border-t section-rule">
      <div
        onMouseMove={handleMouseMove}
        className="reveal-on-scroll spotlight-card relative overflow-hidden rounded-[2rem] border border-[#F2E9DC]/10 bg-[#17141d]/65 px-4 py-6 min-[380px]:px-6 min-[380px]:py-8 shadow-[0_30px_100px_rgba(0,0,0,.24)] backdrop-blur-2xl sm:px-10 sm:py-12 lg:px-14 lg:py-16"
      >
        <div aria-hidden="true" className="aura-pulse absolute -left-32 top-8 h-72 w-72 rounded-full bg-[#4F7CAC]/15 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="aura-pulse absolute -right-24 -bottom-28 h-80 w-80 rounded-full bg-[#E8963C]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="flex flex-col justify-between gap-8 sm:gap-10">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#F3B866]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,.7)] aura-pulse" />
                Open to conversations
              </div>
              <h2 className="mt-4 sm:mt-5 max-w-md font-display text-3xl min-[360px]:text-4xl font-bold leading-[1] tracking-[-0.045em] text-[#F2E9DC] sm:text-5xl">
                Have a good problem?
                <span className="block text-[#E8963C]">Let&apos;s make it clear.</span>
              </h2>
              <p className="mt-4 sm:mt-6 max-w-sm text-xs min-[380px]:text-sm leading-relaxed text-[#B8A996] sm:text-base">
                I&apos;m looking for the kind of work where thoughtful systems and careful execution genuinely matter.
              </p>
            </div>

            {/* <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2E9DC]/10 bg-[#F2E9DC]/[0.045] px-3 py-2 text-[11px] font-mono text-[#B8A996] transition-all duration-300 hover:border-[#F2E9DC]/25 hover:scale-[1.02]">
              <span className="rounded-full bg-[#E8963C]/15 px-2 py-0.5 text-[#F3B866]">Based</span>
              {personalData.contact.location}
            </div> */}
          </div>

          <div className="flex flex-col justify-end">
            <p className="section-kicker">The direct line</p>
            <a
              href={`mailto:${personalData.contact.email}?subject=Opportunity%20Inquiry%20%E2%80%94%20Saviour%20Bassey`}
              className="group mt-3 sm:mt-4 inline-flex w-fit max-w-full items-center gap-2 font-display text-base min-[360px]:text-lg min-[420px]:text-xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#F2E9DC] transition-colors duration-300 hover:text-[#F3B866]"
            >
              <span className="break-all sm:break-normal">{personalData.contact.email}</span>
              <IconArrowUpRight className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 shrink-0 self-center sm:self-start text-[#E8963C] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Minimal Underlined Contact Form */}
            <form onSubmit={handleSendEmail} className="mt-8 space-y-6 sm:space-y-7">
              <div>
                <label htmlFor="inquiry-name" className="block text-[10.5px] font-mono uppercase tracking-widest text-[#B8A996]/60">
                  NAME
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-transparent border-b border-[#F2E9DC]/15 focus:border-[#F2E9DC]/60 py-2.5 text-sm text-[#F2E9DC] placeholder-[#B8A996]/30 transition-colors focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="inquiry-email" className="block text-[10.5px] font-mono uppercase tracking-widest text-[#B8A996]/60">
                  EMAIL
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-transparent border-b border-[#F2E9DC]/15 focus:border-[#F2E9DC]/60 py-2.5 text-sm text-[#F2E9DC] placeholder-[#B8A996]/30 transition-colors focus:outline-none"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="inquiry-message" className="block text-[10.5px] font-mono uppercase tracking-widest text-[#B8A996]/60">
                  WHAT ARE YOU BUILDING?
                </label>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A short note about the project, timeline, and budget."
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-transparent border-b border-[#F2E9DC]/15 focus:border-[#F2E9DC]/60 py-2.5 text-sm text-[#F2E9DC] placeholder-[#B8A996]/30 transition-colors focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="btn-tactile inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F2E9DC] text-[#121017] font-medium text-xs sm:text-sm hover:bg-white transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
                >
                  <span>Send message</span>
                  <IconArrowUpRight className="w-3.5 h-3.5 text-[#121017]" />
                </button>

                {message.trim() && (
                  <button
                    type="button"
                    onClick={copyDraft}
                    className="text-[11px] font-mono text-[#B8A996]/70 hover:text-[#F2E9DC] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedDraft ? (
                      <>
                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <span>Copy note</span>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Quick Actions (Copy, View CV, Elsewhere) */}
            <div className="mt-5 grid gap-3 border-t border-[#F2E9DC]/10 pt-5 sm:grid-cols-3">
              {/* Copy Email Button */}
              <button
                type="button"
                onClick={copyEmail}
                className="btn-tactile group flex items-center justify-between rounded-2xl bg-[#F2E9DC]/[0.055] px-4 py-3.5 text-left border border-transparent transition-all duration-300 hover:border-[#E8963C]/30 hover:bg-[#F2E9DC]/[0.09]"
              >
                <span>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#B8A996]">Email</span>
                  <span className="mt-1 block text-sm font-medium text-[#F2E9DC] transition-colors group-hover:text-white">
                    {copiedEmail ? "Copied to clipboard!" : "Copy address"}
                  </span>
                </span>
                {copiedEmail ? (
                  <IconCheck className="h-4 w-4 text-emerald-400 animate-check-pop" />
                ) : (
                  <IconCopy className="h-4 w-4 text-[#F3B866] transition-transform duration-300 group-hover:scale-110" />
                )}
              </button>

              {/* View CV Button */}
              <a
                href={personalData.cv.downloadUrl}
                onClick={(event) => {
                  if (personalData.cv.downloadUrl.startsWith("#")) {
                    event.preventDefault();
                    alert("CV document will open or download once the final PDF is placed in public/cv.pdf.");
                  }
                }}
                className="btn-tactile group flex items-center justify-between rounded-2xl bg-[#F2E9DC]/[0.055] px-4 py-3.5 border border-transparent transition-all duration-300 hover:border-[#E8963C]/30 hover:bg-[#F2E9DC]/[0.09]"
              >
                <span>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#B8A996]">Profile</span>
                  <span className="mt-1 block text-sm font-medium text-[#F2E9DC] transition-colors group-hover:text-white">View CV</span>
                </span>
                <IconDownload className="h-4 w-4 text-[#F3B866] transition-transform duration-300 group-hover:translate-y-1" />
              </a>

              {/* Social Links */}
              <div className="flex items-center justify-between rounded-2xl bg-[#F2E9DC]/[0.055] px-4 py-3.5">
                <span>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#B8A996]">Elsewhere</span>
                  <span className="mt-1 block text-sm font-medium text-[#F2E9DC]">Find my work</span>
                </span>
                <span className="flex gap-2">
                  <a
                    className="btn-tactile rounded-full p-1.5 text-[#B8A996] transition-all duration-300 hover:bg-[#F2E9DC]/10 hover:text-[#F2E9DC] hover:scale-115 hover:rotate-6"
                    href="https://github.com/Bassey-Saviour"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <IconGithub className="h-4 w-4" />
                  </a>
                  <a
                    className="btn-tactile rounded-full p-1.5 text-[#B8A996] transition-all duration-300 hover:bg-[#F2E9DC]/10 hover:text-[#F2E9DC] hover:scale-115 hover:-rotate-6"
                    href="https://www.linkedin.com/in/saviour-bassey1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <IconLinkedin className="h-4 w-4" />
                  </a>
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-[#B8A996]/75">
              <IconMail className="h-3.5 w-3.5 text-[#E8963C]" />
              Replies usually land within a day.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
