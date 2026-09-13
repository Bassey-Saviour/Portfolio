"use client";

import React from "react";
import Image from "next/image";
import { WorkItem, WorkLink } from "@/data/work";
import { IconArrowUpRight, IconGithub } from "../Icons";
import { SiFigma, SiInstagram } from "react-icons/si";

function ProjectCardMedia({
  item,
  index,
  isPending,
  onOpenShowcase,
}: {
  item: WorkItem;
  index: number;
  isPending: boolean;
  onOpenShowcase?: (slideIndex?: number) => void;
}) {
  const hasShowcase = Boolean(item.showcaseItems && item.showcaseItems.length > 0);

  return (
    <div
      onClick={() => {
        if (hasShowcase && onOpenShowcase) {
          onOpenShowcase(0);
        }
      }}
      className={`relative aspect-[16/10] w-full overflow-hidden bg-[#16131b] group/media select-none ${
        hasShowcase ? "cursor-pointer" : ""
      }`}
    >
      {/* Single Clean Hero Image with Silky Zoom on Hover */}
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {/* Subtle hover wash */}
      <div className="absolute inset-0 bg-[#1C1712]/0 group-hover:bg-[#1C1712]/15 transition-colors duration-300 pointer-events-none z-[1]" />

      {/* Project Index: subtle, refined architectural numbering */}
      <div className="absolute left-3.5 top-3.5 z-10 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#100f14]/70 backdrop-blur-md border border-white/[0.08] transition-colors duration-300 group-hover:border-[#E8963C]/35">
        <span className="w-1 h-1 rounded-full bg-[#E8963C]" />
        <span className="text-[10.5px] font-mono tracking-widest text-[#F2E9DC]/75 group-hover:text-[#F2E9DC]">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      {/* Gallery Stack Indicator directly on image */}
      {hasShowcase && !isPending && (
        <div
          className="absolute right-4 top-4 z-10 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#F2E9DC]/85 group-hover:text-[#F2E9DC] group-hover:scale-110 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_0_10px_rgba(232,150,60,0.55)]"
          aria-hidden="true"
        >
          <svg
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] transition-transform duration-300"
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
              className="fill-black/35 stroke-current opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

      {/* Pending status pill if applicable */}
      {isPending && (
        <span className="soft-chip absolute top-3.5 right-3.5 text-[10.5px] font-mono text-[#B8A996] backdrop-blur-sm px-2.5 py-0.5 z-10 pointer-events-none">
          Pending
        </span>
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
        className={`group/link inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 cursor-pointer ${
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
        className={`group/link inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 cursor-pointer ${
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
      className={`group/link inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 ${
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
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onOpenShowcase: (slideIndex?: number) => void;
  onOpenToast: (msg: string) => void;
}

export default function ProjectCard({
  item,
  index,
  handleMouseMove,
  onOpenShowcase,
  onOpenToast,
}: ProjectCardProps) {
  const isPending = item.linkStatus === "pending";

  return (
    <article
      onMouseMove={handleMouseMove}
      style={{ transitionDelay: `${(index % 2) * 180}ms` }}
      className="reveal-on-scroll spotlight-card group flex flex-col overflow-hidden rounded-[1.4rem] border border-[#F2E9DC]/[0.09] bg-[#17141d]/55 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-[#E8963C]/40 hover:shadow-[0_28px_70px_rgba(0,0,0,0.3)]"
    >
      {/* Project Screenshot Container */}
      <ProjectCardMedia
        item={item}
        index={index}
        isPending={isPending}
        onOpenShowcase={onOpenShowcase}
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
    </article>
  );
}
