"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { WorkItem, ShowcaseSlide } from "@/data/work";
import { IconArrowUpRight } from "../Icons";
import { SiInstagram } from "react-icons/si";

interface DesignShowcaseModalProps {
  item: WorkItem;
  initialIndex?: number;
  onClose: () => void;
}

const formatIdx = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function DesignShowcaseModal({
  item,
  initialIndex = 0,
  onClose,
}: DesignShowcaseModalProps) {
  const slides: ShowcaseSlide[] =
    item.showcaseItems && item.showcaseItems.length > 0
      ? item.showcaseItems
      : [
        {
          title: item.title,
          category: "Design Deliverable",
          description: item.description,
          image: item.image,
          tags: item.tags,
        },
      ];

  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, initialIndex), slides.length - 1)
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeIndex] || slides[0];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < slides.length - 1;

  // Mount & modal-open lifecycle for body & navbar coordination
  useEffect(() => {
    setMounted(true);
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    };
  }, []);

  // Horizontal mouse-wheel scrolling for the filmstrip
  useEffect(() => {
    const el = thumbnailsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [slides.length]);

  const scrollThumbnailIntoView = (idx: number) => {
    if (!thumbnailsRef.current) return;
    const thumbButtons = thumbnailsRef.current.querySelectorAll("button");
    if (thumbButtons[idx]) {
      thumbButtons[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      const nextIdx = activeIndex - 1;
      setActiveIndex(nextIdx);
      scrollThumbnailIntoView(nextIdx);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const nextIdx = activeIndex + 1;
      setActiveIndex(nextIdx);
      scrollThumbnailIntoView(nextIdx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed, activeIndex, slides.length, canGoPrev, canGoNext, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        role="dialog"
        aria-modal="true"
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fade-in"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] my-auto flex flex-col rounded-2xl sm:rounded-3xl border border-[#F2E9DC]/15 bg-[#14121a]/95 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-[#F2E9DC]/[0.08] px-5 py-4 sm:px-6">
            <div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F2E9DC]">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#F2E9DC]/80">
                {formatIdx(activeIndex + 1)} / {formatIdx(slides.length)}
              </span>

              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                title="Expand Artwork"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.05] text-[#B8A996] hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Enlarge artwork view"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close design showcase"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.05] text-[#B8A996] hover:text-white hover:bg-white/10 flex items-center justify-center text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 no-scrollbar">
            {/* Artwork Stage with Ambient Glow & Floating Navigation */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:h-[46vh] max-h-[500px] w-full rounded-2xl overflow-hidden bg-[#0d0b12] border border-white/[0.08] flex items-center justify-center group/viewer select-none shadow-[inset_0_2px_24px_rgba(0,0,0,0.7)]">
              {/* Dynamic ambient color glow from flyer itself */}
              <Image
                src={activeSlide.image}
                alt=""
                fill
                aria-hidden="true"
                sizes="80px"
                className="object-cover blur-3xl opacity-35 scale-125 pointer-events-none select-none transition-all duration-700 ease-out"
              />

              {/* Crisp Artwork with Zoom Click */}
              <div
                onClick={() => setIsZoomed(true)}
                className="relative h-full w-full flex items-center justify-center cursor-zoom-in z-[2] p-2.5 sm:p-3.5"
              >
                <Image
                  key={activeSlide.image}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.01]"
                  priority
                />
              </div>

              {/* Slide Counter on stage for mobile */}
              <span className="sm:hidden absolute bottom-3 right-3 z-10 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-[#F2E9DC]/80 border border-white/10">
                {formatIdx(activeIndex + 1)} / {formatIdx(slides.length)}
              </span>

              {/* Floating Previous Arrow */}
              {slides.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  disabled={!canGoPrev}
                  aria-label="Previous artwork"
                  className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full backdrop-blur-xl border transition-all duration-200 shadow-xl ${canGoPrev
                    ? "bg-[#100f14]/85 text-[#F2E9DC] hover:text-[#E8963C] border-white/15 hover:border-[#E8963C]/50 hover:scale-105 active:scale-95 cursor-pointer"
                    : "bg-[#100f14]/30 text-[#F2E9DC]/20 border-white/5 cursor-not-allowed opacity-30"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Floating Next Arrow */}
              {slides.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  disabled={!canGoNext}
                  aria-label="Next artwork"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full backdrop-blur-xl border transition-all duration-200 shadow-xl ${canGoNext
                    ? "bg-[#100f14]/85 text-[#F2E9DC] hover:text-[#E8963C] border-white/15 hover:border-[#E8963C]/50 hover:scale-105 active:scale-95 cursor-pointer"
                    : "bg-[#100f14]/30 text-[#F2E9DC]/20 border-white/5 cursor-not-allowed opacity-30"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Silky Filmstrip Thumbnail Catalog */}
            {slides.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#B8A996]/60 px-1">
                  <div className="flex items-center gap-2">
                    <span>Deliverables</span>
                    <span className="text-[#F2E9DC]/50 font-mono">
                      {formatIdx(activeIndex + 1)} / {formatIdx(slides.length)}
                    </span>
                  </div>

                  {/* Quick scroll arrows for easy end-to-end navigation */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (thumbnailsRef.current) {
                          thumbnailsRef.current.scrollBy({ left: -260, behavior: "smooth" });
                        }
                      }}
                      aria-label="Scroll thumbnails left"
                      title="Previous thumbnails"
                      className="h-6 w-6 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#E8963C]/40 text-[#B8A996] hover:text-[#F2E9DC] flex items-center justify-center text-xs transition-colors cursor-pointer text-lg"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (thumbnailsRef.current) {
                          thumbnailsRef.current.scrollBy({ left: 260, behavior: "smooth" });
                        }
                      }}
                      aria-label="Scroll thumbnails right"
                      title="Next thumbnails"
                      className="h-6 w-6 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#E8963C]/40 text-[#B8A996] hover:text-[#F2E9DC] flex items-center justify-center text-xs transition-colors cursor-pointer text-lg"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  ref={thumbnailsRef}
                  className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto px-2 py-2.5 scroll-px-2 no-scrollbar scroll-smooth"
                >
                  {slides.map((slide, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={slide.title + idx}
                        type="button"
                        onClick={() => {
                          setActiveIndex(idx);
                          scrollThumbnailIntoView(idx);
                        }}
                        className={`group/thumb relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${isActive
                          ? "border-[#E8963C] ring-2 ring-[#E8963C]/40 scale-[1.03] shadow-[0_4px_16px_rgba(232,150,60,0.25)]"
                          : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                          }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 transition-opacity ${isActive
                            ? "bg-transparent"
                            : "bg-black/40 group-hover/thumb:bg-transparent"
                            }`}
                        />
                        <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1 py-0.2 text-[9px] font-mono text-[#F2E9DC]/90 border border-white/10">
                          {formatIdx(idx + 1)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Narrative & Contribution Breakdown */}
            <div className="rounded-2xl border border-[#F2E9DC]/[0.08] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <div>
                <h4 className="font-display font-semibold text-base sm:text-lg text-[#F2E9DC]">
                  {activeSlide.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B8A996] leading-relaxed">
                {activeSlide.description}
              </p>
              {activeSlide.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeSlide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-md bg-white/[0.04] border border-white/[0.06] text-[10.5px] font-mono text-[#B8A996]/75 px-2.5 py-0.5 pointer-events-none select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#F2E9DC]/[0.08] px-5 py-3.5 sm:px-6 bg-[#121017]">
            {item.links?.secondary ? (
              <a
                href={item.links.secondary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/ext inline-flex items-center gap-2 text-xs font-mono text-[#F2E9DC] hover:text-[#E8963C] transition-colors"
              >
                {item.links.secondary.type === "instagram" ? (
                  <>
                    <SiInstagram className="w-3.5 h-3.5 text-[#E1306C]" />
                    <span className="hidden sm:inline">Visit {item.title} on Instagram</span>
                    <span className="sm:hidden">Instagram</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Visit {item.links.secondary.label}</span>
                    <span className="sm:hidden">{item.links.secondary.label}</span>
                  </>
                )}
                <IconArrowUpRight className="h-3.5 w-3.5 text-[#E8963C] transition-transform duration-200 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5" />
              </a>
            ) : (
              <span className="text-xs font-mono text-[#B8A996]/60">
                Production Design Archive
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Zoomed Lightbox Overlay */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full max-w-6xl flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Floating Top Controls */}
            <div className="absolute top-5 sm:top-7 left-5 sm:left-7 right-5 sm:right-7 flex items-center justify-between z-30 pointer-events-none">
              <div className="rounded-full bg-black/80 backdrop-blur-md border border-white/15 px-4 py-1.5 text-xs font-mono text-[#F2E9DC] pointer-events-auto shadow-xl">
                {activeSlide.title}{" "}
                <span className="text-[#E8963C]">
                  ({formatIdx(activeIndex + 1)}/{formatIdx(slides.length)})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-black/80 hover:bg-black border border-white/25 hover:border-[#E8963C] text-white flex items-center justify-center text-base transition-all cursor-pointer shadow-2xl pointer-events-auto hover:scale-105 active:scale-95"
                aria-label="Close zoomed view"
              >
                ✕
              </button>
            </div>

            {/* Floating Arrows in Zoomed View */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  disabled={!canGoPrev}
                  className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/70 border border-white/15 text-white flex items-center justify-center transition-all ${canGoPrev
                    ? "hover:border-[#E8963C] hover:text-[#E8963C] cursor-pointer hover:scale-105"
                    : "opacity-25 cursor-not-allowed"
                    }`}
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  disabled={!canGoNext}
                  className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/70 border border-white/15 text-white flex items-center justify-center transition-all ${canGoNext
                    ? "hover:border-[#E8963C] hover:text-[#E8963C] cursor-pointer hover:scale-105"
                    : "opacity-25 cursor-not-allowed"
                    }`}
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
