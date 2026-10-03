import React from "react";
import { TechTool } from "@/data/techstack";
import BrandMark from "./BrandMark";

interface TechPopoverProps {
  tool: TechTool;
  index: number;
  totalInRow?: number;
  onClose?: () => void;
}

export default function TechPopover({ tool, index, totalInRow = 11, onClose }: TechPopoverProps) {
  // Safe desktop horizontal alignment so popovers near edges don't overflow viewport
  let alignClass = "left-1/2 -translate-x-1/2";
  if (index <= 1) {
    alignClass = "left-0 translate-x-0";
  } else if (index >= totalInRow - 2) {
    alignClass = "right-0 left-auto translate-x-0";
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`popover-enter absolute bottom-[calc(100%+10px)] ${alignClass} pointer-events-auto z-50 select-none`}
      role="tooltip"
    >
      <div className="relative w-60 sm:w-64 rounded-xl border border-white/[0.10] bg-[#121018]/98 p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300">
        {/* Row 1: Brand Icon + Tool Name (prominent, full space) and Percentage */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.06]">
              <BrandMark type={tool.type} color={tool.color} className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-display text-[13px] font-bold tracking-tight text-[#F2E9DC] truncate">
              {tool.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-[11px] font-semibold text-[#F2E9DC]">
              {tool.proficiency}%
            </span>
            {onClose && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Dismiss inspector"
                className="h-4 w-4 rounded-full flex items-center justify-center text-[#B8A996] hover:text-[#F2E9DC] hover:bg-white/10 transition-colors text-[10px] cursor-pointer active:scale-95"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category / Role description (full width, zero cut off or truncation) */}
        <p className="mt-1 text-[10px] font-mono text-[#B8A996]/75 leading-tight">
          {tool.category}
        </p>

        {/* Row 3: Hairline Progress Bar */}
        <div className="mt-2.5 relative h-1 w-full rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${tool.proficiency}%`,
              backgroundColor: tool.color,
            }}
          />
        </div>

        {/* Row 4: Clean Typographic Level (NO PILL) */}
        <div className="mt-1.5 flex items-center justify-between font-mono text-[9px] text-[#B8A996]/60">
          <span className="uppercase tracking-wider">Proficiency</span>
          <span className="text-[#F2E9DC]/80 font-medium">{tool.level}</span>
        </div>
      </div>
    </div>
  );
}
