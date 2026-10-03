"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { WorkItem, WorkLink } from "@/data/work";
import { IconArrowUpRight, IconGithub } from "../Icons";
import { SiFigma, SiInstagram } from "react-icons/si";



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
  onOpenShowcase: (item: WorkItem, slideIndex?: number) => void;
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
        onClick={() => onOpenShowcase(item, 0)}
        className={`group/link inline-flex items-center gap-1.5 py-1 min-h-[36px] text-xs font-mono transition-colors duration-200 cursor-pointer ${
          isPrimary
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
        className={`group/link inline-flex items-center gap-1.5 py-1 min-h-[36px] text-xs font-mono transition-colors duration-200 cursor-pointer ${
          isPrimary
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
      className={`group/link inline-flex items-center gap-1.5 py-1 min-h-[36px] text-xs font-mono transition-colors duration-200 ${
        isPrimary
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

interface ProjectCardProps {
  item: WorkItem;
  index: number;
  totalItems?: number;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onOpenShowcase: (slideIndex?: number) => void;
  onOpenToast: (msg: string) => void;
}

export default function ProjectCard({
  item,
  index,
  totalItems,
  handleMouseMove,
  onOpenShowcase,
  onOpenToast,
}: ProjectCardProps) {
  const isPending = Boolean(item.isPending || item.links?.primary?.status === "pending");
  const hasShowcase = Boolean(item.showcaseItems && item.showcaseItems.length > 0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLElement | null>(null);

  // Silky scroll-driven scale entrance and deck-stacking exit animation per project card
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (cardRef.current && innerRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth < 640;
            const baseTop = isMobile ? 56 : 72;
            const step = isMobile ? 12 : 20;
            const stickyTop = baseTop + index * step;

            if (rect.top >= windowHeight) {
              // Below viewport: waiting to enter
              innerRef.current.style.transform = "scale(0.92)";
              innerRef.current.style.opacity = "0.20";
            } else if (rect.top > stickyTop) {
              // Rising up into viewport: pure smooth scale entrance from 0.92 to 1.00
              const startEntry = windowHeight * 0.96;
              const endEntry = stickyTop + 24;
              const entryProgress = Math.min(
                Math.max((startEntry - rect.top) / (startEntry - endEntry), 0),
                1
              );
              const eased = Math.pow(entryProgress, 1.25);
              const scale = 0.92 + eased * 0.08;
              const opacity = 0.20 + eased * 0.80;

              innerRef.current.style.transform = `scale(${scale.toFixed(4)})`;
              innerRef.current.style.opacity = `${opacity.toFixed(3)}`;
            } else {
              // Locked in sticky position: check if the next card is arriving to cover it
              const nextCard = cardRef.current.nextElementSibling as HTMLElement | null;
              if (nextCard) {
                const nextRect = nextCard.getBoundingClientRect();
                const nextStickyTop = baseTop + (index + 1) * step;
                const startCover = windowHeight * (isMobile ? 0.75 : 0.70);
                const endCover = nextStickyTop + (isMobile ? 12 : 20);

                if (nextRect.top < startCover && nextRect.top > endCover) {
                  const coverProgress = Math.min(
                    Math.max((startCover - nextRect.top) / (startCover - endCover), 0),
                    1
                  );
                  const coverEased = Math.pow(coverProgress, 1.2);
                  const exitScale = 1.00 - coverEased * 0.05;
                  const exitOpacity = 1.00 - coverEased * 0.25;

                  innerRef.current.style.transform = `scale(${exitScale.toFixed(4)})`;
                  innerRef.current.style.opacity = `${exitOpacity.toFixed(3)}`;
                } else if (nextRect.top <= endCover) {
                  // Fully covered by next card: resting deck layer
                  innerRef.current.style.transform = "scale(0.95)";
                  innerRef.current.style.opacity = "0.75";
                } else {
                  // Next card hasn't reached cover zone yet
                  innerRef.current.style.transform = "scale(1.00)";
                  innerRef.current.style.opacity = "1";
                }
              } else {
                // Final project card in the stack
                innerRef.current.style.transform = "scale(1.00)";
                innerRef.current.style.opacity = "1";
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-10 sm:mb-18 md:mb-28 last:mb-0 [--card-top:3.5rem] sm:[--card-top:4.5rem] [--card-step:0.75rem] sm:[--card-step:1.25rem]"
      style={{
        top: `calc(var(--card-top) + ${index} * var(--card-step))`,
        zIndex: index + 1,
      }}
    >
      <article
        ref={innerRef}
        onMouseMove={handleMouseMove}
        style={{
          transformOrigin: "top center",
          willChange: "transform, opacity",
        }}
        className="spotlight-card group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#F2E9DC]/[0.07] bg-[#13111a] hover:bg-[#15131e] backdrop-blur-md p-4 min-[380px]:p-5 sm:p-7 lg:p-8 shadow-[0_-12px_44px_rgba(0,0,0,0.55)] hover:shadow-[0_-16px_52px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] lg:grid-cols-[0.9fr_1.1fr] gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Left Column: Text & Meta */}
          <div className="order-2 md:order-1 flex flex-col justify-between h-full min-h-[140px] sm:min-h-[200px]">
            <div>
              {/* Project Index & Role */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="font-mono text-xs sm:text-sm text-[#E8963C]/90 font-medium">
                  0{index + 1}
                </span>
                {/* <span className="w-1 h-1 rounded-full bg-[#B8A996]/30" /> */}
                <span className="text-[10px] min-[360px]:text-[11px] font-mono uppercase tracking-widest text-[#B8A996]/75">
                  {item.roleTag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl min-[380px]:text-2xl sm:text-3xl text-[#F2E9DC] group-hover:text-white transition-colors duration-300 tracking-tight mt-2 sm:mt-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#B8A996] leading-relaxed mt-2 sm:mt-2.5 max-w-md transition-colors duration-300 group-hover:text-[#C5B7A6]">
                {item.description}
              </p>
            </div>

            {/* Bottom Meta & Links */}
            <div className="pt-4 sm:pt-6 flex flex-col gap-3 sm:gap-4">
              {/* Minimal Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="soft-chip px-2 sm:px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-mono text-[#B8A996]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              {item.links && (
                <div className="flex items-center gap-3.5 sm:gap-4 pt-2.5 sm:pt-3 border-t border-[#F2E9DC]/[0.06]">
                  <ActionLink
                    link={item.links.primary}
                    item={item}
                    isPrimary={true}
                    onOpenToast={onOpenToast}
                    onOpenShowcase={() => onOpenShowcase(0)}
                  />
                  <ActionLink
                    link={item.links.secondary}
                    item={item}
                    isPrimary={false}
                    onOpenToast={onOpenToast}
                    onOpenShowcase={() => onOpenShowcase(0)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Media Frame */}
          <div
            onClick={() => {
              if (hasShowcase) onOpenShowcase(0);
            }}
            className={`order-1 md:order-2 relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#181520] border border-white/[0.05] ${
              hasShowcase ? "cursor-pointer" : ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 650px"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

            {/* Gallery Stack SVG Indicator (clean floating icon directly on media) */}
            {hasShowcase && !isPending && (
              <div
                className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-10 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#F2E9DC]/80 group-hover:text-[#F2E9DC] group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                title={`Open gallery (${item.showcaseItems?.length} items)`}
                aria-label={`Open gallery with ${item.showcaseItems?.length} items`}
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Back card (fans slightly on hover) */}
                  <rect
                    x="6"
                    y="2.5"
                    width="15"
                    height="15"
                    rx="3"
                    strokeWidth="1.8"
                    className="fill-black/40 stroke-current opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  {/* Front card */}
                  <rect
                    x="2.5"
                    y="6"
                    width="15"
                    height="15"
                    rx="3"
                    strokeWidth="1.8"
                    className="fill-black/35 stroke-current transition-colors duration-300"
                  />
                  {/* Minimalist mountain & sun artwork cue */}
                  <circle cx="7" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
                  <path
                    d="M3.5 17.5l4-4 3 3 2.5-2.5 3.5 3.5"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
