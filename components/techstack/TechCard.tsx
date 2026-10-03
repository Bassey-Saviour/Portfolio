import React from "react";
import { TechTool } from "@/data/techstack";
import BrandMark from "./BrandMark";
import TechPopover from "./TechPopover";

interface TechCardProps {
  tool: TechTool;
  index: number;
  totalInRow?: number;
  isActive: boolean;
  onSelect: (name: string | null) => void;
}

export default function TechCard({
  tool,
  index,
  totalInRow = 11,
  isActive,
  onSelect,
}: TechCardProps) {
  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      onSelect(tool.name);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      onSelect(null);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(isActive ? null : tool.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(isActive ? null : tool.name);
    } else if (e.key === "Escape" && isActive) {
      e.preventDefault();
      onSelect(null);
    }
  };

  return (
    <div
      className={`relative ${isActive ? "z-40" : "z-10"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sleek squircle tile matching Image 2 */}
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8963C] cursor-pointer ${
          isActive
            ? "bg-[#1c1826] border-white/[0.28] -translate-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
            : "bg-[#14121a]/80 border-[#F2E9DC]/[0.08] hover:bg-[#191624] hover:border-white/[0.20] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
        }`}
        aria-expanded={isActive}
        aria-label={`${tool.name} — ${tool.category}`}
        title={`${tool.name} (${tool.level})`}
      >
        <BrandMark
          type={tool.type}
          color={tool.color}
          className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* Floating minimal popover on desktop (>= lg) */}
      <div className="hidden lg:block">
        {isActive && (
          <TechPopover
            tool={tool}
            index={index}
            totalInRow={totalInRow}
            onClose={() => onSelect(null)}
          />
        )}
      </div>
    </div>
  );
}
