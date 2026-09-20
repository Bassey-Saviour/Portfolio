import React from "react";
import { TechTool } from "@/data/techstack";
import BrandMark from "./BrandMark";
import TechPopover from "./TechPopover";

interface TechCardProps {
  tool: TechTool;
  index: number;
  isActive: boolean;
  onSelect: (name: string | null) => void;
}

export default function TechCard({ tool, index, isActive, onSelect }: TechCardProps) {
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
      {/* Base tool tile */}
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`group w-full aspect-square rounded-2xl border p-2.5 sm:p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8963C] text-left cursor-pointer ${
          isActive
            ? "bg-[#211d28]/95 -translate-y-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
            : "bg-[#17141d]/45 hover:-translate-y-1.5 hover:border-[#F2E9DC]/30 hover:bg-[#211d28]/70 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
        }`}
        style={{
          borderColor: isActive ? tool.color : "rgba(242,233,220,0.08)",
          boxShadow: isActive
            ? `0 16px 36px rgba(0,0,0,0.4), 0 0 20px ${tool.color}35, inset 0 1px 0 rgba(255,255,255,.08)`
            : `inset 0 1px 0 rgba(255,255,255,.04)`,
        }}
        aria-expanded={isActive}
        aria-label={`Inspect ${tool.name}`}
      >
        <div
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
          style={{ backgroundColor: tool.bg }}
        >
          <BrandMark type={tool.type} color={tool.color} />
        </div>
        <p className="mt-3 sm:mt-4 text-[10.5px] sm:text-[11px] font-mono text-[#F2E9DC] transition-colors duration-200 group-hover:text-white font-medium truncate">
          {tool.name}
        </p>
        <span
          className={`mt-1 block h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isActive ? "w-9" : "w-4 group-hover:w-9"
          }`}
          style={{ backgroundColor: tool.color }}
        />
      </button>

      {/* On desktop (>= lg), floating popover anchored above the card */}
      <div className="hidden lg:block">
        {isActive && (
          <TechPopover
            tool={tool}
            index={index}
            onClose={() => onSelect(null)}
          />
        )}
      </div>
    </div>
  );
}
