"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { workData, WorkItem, WorkLink } from "@/data/work";
import { IconArrowUpRight, IconGithub } from "./Icons";
import { SiFigma, SiInstagram } from "react-icons/si";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

function ProjectCardMedia({
  item,
  index,
  isPending,
  onOpenShowcase,
}: {
  item: WorkItem;
  index: number;
  isPending: boolean;
  onOpenShowcase?: () => void;
}) {
  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const hasMultipleImages = images.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIdx = Math.round(scrollLeft / clientWidth);
      if (newIdx !== currentIndex && newIdx >= 0 && newIdx < images.length) {
        setCurrentIndex(newIdx);
      }
    }
  };

  const scrollToSlide = (idx: number) => {
    if (!scrollRef.current) return;
    const target = Math.max(0, Math.min(idx, images.length - 1));
    scrollRef.current.scrollTo({
      left: target * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
    setCurrentIndex(target);
  };

  return (
    <div
      onClick={() => {
        if (item.showcaseItems && onOpenShowcase) {
          onOpenShowcase();
        }
      }}
      className={`relative aspect-[16/10] w-full overflow-hidden bg-[#2A231C] group/media select-none ${item.showcaseItems ? "cursor-pointer" : ""
        }`}
    >
      {/* Media: Single Image vs Scrollable Multi-Image */}
      {!hasMultipleImages ? (
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {images.map((imgSrc, i) => (
            <div
              key={imgSrc + i}
              className="relative h-full w-full min-w-full flex-shrink-0 snap-center snap-always flex items-center justify-center overflow-hidden bg-[#15121a]"
            >
              {/* Soft ambient blur backdrop for portrait & non-16:10 photos */}
              <Image
                src={imgSrc}
                alt=""
                fill
                aria-hidden="true"
                sizes="80px"
                className="object-cover blur-2xl opacity-20 scale-125 pointer-events-none select-none"
              />
              <Image
                src={imgSrc}
                alt={`${item.imageAlt} - image ${i + 1} of ${images.length}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain relative z-[1] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      )}

      {/* Subtle hover wash */}
      <div className="absolute inset-0 bg-[#1C1712]/0 group-hover:bg-[#1C1712]/15 transition-colors duration-300 pointer-events-none z-[1]" />

      {/* File badge */}
      <span className="absolute left-4 top-4 rounded-full bg-[#100f14]/75 px-2.5 py-1 text-[10px] font-mono text-[#F2E9DC]/80 backdrop-blur-xl border border-white/[0.06] transition-all duration-300 group-hover:border-[#E8963C]/30 z-10 pointer-events-none">
        0{index + 1}
      </span>

      {/* Pending pill OR Image count indicator */}
      {isPending ? (
        <span className="soft-chip absolute top-3 right-3 text-[11px] font-mono text-[#B8A996] backdrop-blur-sm px-2.5 py-1 z-10 pointer-events-none">
          Pending
        </span>
      ) : hasMultipleImages ? (
        <span className="absolute top-3 right-3 rounded-full bg-black/35 backdrop-blur-xl px-2.5 py-1 text-[10.5px] font-mono tracking-wider text-[#F2E9DC]/75 border border-white/[0.07] shadow-[0_2px_10px_rgba(0,0,0,0.25)] z-10 pointer-events-none transition-opacity duration-300">
          <span className="text-[#F2E9DC]/90 font-semibold">{currentIndex + 1}</span>
          <span className="text-[#F2E9DC]/40 mx-1">/</span>
          <span className="text-[#F2E9DC]/60">{images.length}</span>
        </span>
      ) : item.showcaseItems ? (
        <span className="absolute top-3 right-3 rounded-full bg-[#E8963C]/20 border border-[#E8963C]/40 backdrop-blur-xl px-2.5 py-1 text-[10.5px] font-mono text-[#F3B866] shadow-[0_2px_10px_rgba(0,0,0,0.25)] z-10 pointer-events-none transition-opacity duration-300">
          Flyer Gallery ↗
        </span>
      ) : null}

      {/* Carousel navigation controls (only when multiple images) */}
      {hasMultipleImages && (
        <>
          {/* Previous image button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (canGoPrev) {
                scrollToSlide(currentIndex - 1);
              }
            }}
            aria-label="Previous image"
            className={`absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${canGoPrev
              ? "bg-[#100f14]/85 text-[#F2E9DC] hover:text-[#E8963C] border border-white/10 hover:border-[#E8963C]/40 opacity-0 group-hover/media:opacity-100 focus:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-[#100f14]/50 text-[#F2E9DC]/25 border border-white/5 opacity-0 group-hover/media:opacity-40 cursor-default"
              }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next image button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (canGoNext) {
                scrollToSlide(currentIndex + 1);
              }
            }}
            aria-label="Next image"
            className={`absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${canGoNext
              ? "bg-[#100f14]/85 text-[#F2E9DC] hover:text-[#E8963C] border border-white/10 hover:border-[#E8963C]/40 opacity-0 group-hover/media:opacity-100 focus:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-[#100f14]/50 text-[#F2E9DC]/25 border border-white/5 opacity-0 group-hover/media:opacity-40 cursor-default"
              }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Subtle glassy pagination indicator */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-black/35 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3)] opacity-70 group-hover/media:opacity-100 transition-opacity duration-300"
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSlide(i);
                }}
                className={`transition-all duration-300 rounded-full ${i === currentIndex
                  ? "w-3.5 h-1 bg-[#E8963C]/90 shadow-[0_0_8px_rgba(232,150,60,0.4)]"
                  : "w-1 h-1 bg-white/30 hover:bg-white/60"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ActionLink({
  link,
  item,
  isPrimary,
  onOpenToast,
  onOpenShowcase,
}: {
  link: WorkLink;
  item: WorkItem;
  isPrimary: boolean;
  onOpenToast: (msg: string) => void;
  onOpenShowcase: (item: WorkItem) => void;
}) {
  const isPending = link.status === "pending";
  const hasNoUrl = !link.url || link.url === "#";
  const isGallery = link.type === "gallery";

  // Icon selector based on link type
  const renderIcon = () => {
    switch (link.type) {
      case "github":
        return (
          <IconGithub className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:scale-110" />
        );
      case "figma":
        return (
          <SiFigma className="w-3 h-3 text-[#F24E1E] transition-transform duration-200 group-hover/link:scale-110" />
        );
      case "instagram":
        return (
          <SiInstagram className="w-3.5 h-3.5 text-[#E1306C] transition-transform duration-200 group-hover/link:scale-110" />
        );
      case "download":
        return (
          <svg
            className="w-3.5 h-3.5 text-[#E8963C] transition-transform duration-200 group-hover/link:translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case "gallery":
        return (
          <svg
            className="w-3.5 h-3.5 text-[#E8963C] transition-transform duration-200 group-hover/link:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        );
      case "live":
      default:
        return (
          <IconArrowUpRight className="h-3.5 w-3.5 text-[#E8963C] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        );
    }
  };

  // Gallery button handler
  if (isGallery) {
    return (
      <button
        type="button"
        onClick={() => onOpenShowcase(item)}
        className={`group/link inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 cursor-pointer ${isPrimary
          ? "text-[#B8A996] hover:text-[#E8963C]"
          : "text-[#F2E9DC] hover:text-[#E8963C]"
          }`}
      >
        {renderIcon()}
        <span>{link.label}</span>
      </button>
    );
  }

  // Placeholder / Pending link handler
  if (hasNoUrl || isPending) {
    return (
      <button
        type="button"
        onClick={() =>
          onOpenToast(
            link.pendingToast ||
            `${item.title} — ${link.label}: Available on request / archiving`
          )
        }
        className={`group/link inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 cursor-pointer ${isPrimary
          ? "text-[#B8A996] hover:text-[#E8963C]"
          : "text-[#F2E9DC] hover:text-[#E8963C]"
          }`}
      >
        {isPrimary && renderIcon()}
        <span>{link.label}</span>
        {!isPrimary && renderIcon()}
        {isPending && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-[#B8A996]/60">
            Soon
          </span>
        )}
      </button>
    );
  }

  // Active external link
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 ${isPrimary
        ? "text-[#B8A996] hover:text-[#E8963C]"
        : "text-[#F2E9DC] hover:text-[#E8963C]"
        }`}
    >
      {isPrimary && renderIcon()}
      <span>{link.label}</span>
      {!isPrimary && renderIcon()}
    </a>
  );
}

export default function Work() {
  const [toast, setToast] = useState<string | null>(null);
  const [showcaseItem, setShowcaseItem] = useState<WorkItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { handleMouseMove } = useCardSpotlight();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Handle ESC key to close showcase modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowcaseItem(null);
      }
    };
    if (showcaseItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showcaseItem]);

  const openShowcase = (item: WorkItem) => {
    setShowcaseItem(item);
    setActiveSlideIndex(0);
  };

  return (
    <section id="work" className="reveal-section py-24 md:py-32 border-t section-rule">
      <div className="w-full">
        {/* Clean, quiet section header */}
        <div className="mb-12 md:mb-14">
          <span className="section-kicker">Projects</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-[#F2E9DC] tracking-tight mt-3">
            Work worth<br /><span className="text-[#E8963C]">opening up.</span>
          </h2>
          <p className="text-[#B8A996] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Systems, computational modeling, and product interfaces designed for clarity and operational reliability.
          </p>
        </div>

        {/* Minimal Grid — Image paired with short, clean text block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {workData.map((item: WorkItem, index) => {
            const isPending = item.linkStatus === "pending";

            return (
              <article
                key={item.id}
                onMouseMove={handleMouseMove}
                className="spotlight-card group flex flex-col overflow-hidden rounded-[1.4rem] border border-[#F2E9DC]/[0.09] bg-[#17141d]/55 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-[#E8963C]/40 hover:shadow-[0_28px_70px_rgba(0,0,0,0.3)]"
              >
                {/* Project Screenshot Container */}
                <ProjectCardMedia
                  item={item}
                  index={index}
                  isPending={isPending}
                  onOpenShowcase={() => openShowcase(item)}
                />

                {/* Minimal Text Block: Title, Role, One-sentence description, 2-3 tags */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F2E9DC] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Role Tag */}
                  {item.roleTag && (
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[#7fa9d7] mt-2">
                      {item.roleTag}
                    </p>
                  )}

                  {/* One-Sentence Description */}
                  <p className="text-xs sm:text-sm text-[#B8A996] leading-relaxed mt-3 transition-colors duration-300 group-hover:text-[#F2E9DC]/90">
                    {item.description}
                  </p>

                  {/* 2-3 Tags Max */}
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="soft-chip text-[11px] font-mono text-[#B8A996]/75 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Flexible Action Links: Custom Primary & Secondary links */}
                  {item.links && (
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#F2E9DC]/[0.08] pt-4">
                      <ActionLink
                        link={item.links.primary}
                        item={item}
                        isPrimary={true}
                        onOpenToast={(msg) => setToast(msg)}
                        onOpenShowcase={(it) => openShowcase(it)}
                      />
                      <ActionLink
                        link={item.links.secondary}
                        item={item}
                        isPrimary={false}
                        onOpenToast={(msg) => setToast(msg)}
                        onOpenShowcase={(it) => openShowcase(it)}
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightweight Animated Toast for Pending Links */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2A231C] border border-[#E8963C]/50 text-[#F2E9DC] shadow-2xl shadow-black/80 text-xs sm:text-sm font-mono backdrop-blur-md animate-check-pop"
        >
          <span className="w-2 h-2 rounded-full bg-[#E8963C] aura-pulse" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-[#B8A996] hover:text-[#F2E9DC] p-0.5 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Full-Feature Design Showcase Modal (For Imprint Global flyers & design deliverables) */}
      {showcaseItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowcaseItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl border border-[#F2E9DC]/15 bg-[#17141d] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#F2E9DC]/[0.08] px-5 py-4 sm:px-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8963C]">
                  Design Showcase // {showcaseItem.title}
                </span>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F2E9DC] mt-0.5">
                  {showcaseItem.showcaseItems
                    ? showcaseItem.showcaseItems[activeSlideIndex]?.title
                    : showcaseItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowcaseItem(null)}
                aria-label="Close design showcase"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.05] text-[#B8A996] hover:text-white hover:bg-white/10 flex items-center justify-center text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body with Image Display */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* Media viewer container */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#100f14] border border-white/[0.08] flex items-center justify-center">
                {showcaseItem.showcaseItems ? (
                  <>
                    <Image
                      src={showcaseItem.showcaseItems[activeSlideIndex]?.image || showcaseItem.image}
                      alt={showcaseItem.showcaseItems[activeSlideIndex]?.title || showcaseItem.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-contain"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-[#F2E9DC]/80 border border-white/10">
                      {activeSlideIndex + 1} / {showcaseItem.showcaseItems.length}
                    </span>
                  </>
                ) : (
                  <Image
                    src={showcaseItem.image}
                    alt={showcaseItem.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Deliverables switcher tabs */}
              {showcaseItem.showcaseItems && showcaseItem.showcaseItems.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {showcaseItem.showcaseItems.map((slide, idx) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${idx === activeSlideIndex
                        ? "bg-[#E8963C] text-black font-semibold shadow-[0_0_12px_rgba(232,150,60,0.3)]"
                        : "bg-white/[0.05] text-[#B8A996] hover:bg-white/[0.09] hover:text-[#F2E9DC] border border-white/[0.05]"
                        }`}
                    >
                      {slide.category}
                    </button>
                  ))}
                </div>
              )}

              {/* Narrative & Contribution Breakdown */}
              <div className="rounded-xl border border-[#F2E9DC]/[0.08] bg-white/[0.02] p-4 sm:p-5 space-y-3">
                <p className="text-xs sm:text-sm text-[#F2E9DC]/90 leading-relaxed">
                  {showcaseItem.showcaseItems
                    ? showcaseItem.showcaseItems[activeSlideIndex]?.description
                    : showcaseItem.description}
                </p>

                {/* Deliverable Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(showcaseItem.showcaseItems
                    ? showcaseItem.showcaseItems[activeSlideIndex]?.tags || showcaseItem.tags
                    : showcaseItem.tags
                  ).map((tag) => (
                    <span
                      key={tag}
                      className="soft-chip text-[10.5px] font-mono text-[#B8A996] px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-[#F2E9DC]/[0.08] px-5 py-3.5 sm:px-6 bg-[#121017]">
              {showcaseItem.links?.secondary ? (
                <a
                  href={showcaseItem.links.secondary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/ext inline-flex items-center gap-2 text-xs font-mono text-[#F2E9DC] hover:text-[#E8963C] transition-colors"
                >
                  <SiInstagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>Visit {showcaseItem.title} on Instagram</span>
                  <IconArrowUpRight className="h-3.5 w-3.5 text-[#E8963C] transition-transform duration-200 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5" />
                </a>
              ) : (
                <span className="text-xs font-mono text-[#B8A996]">
                  Production Design Archive
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowcaseItem(null)}
                className="text-xs font-mono text-[#B8A996] hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

