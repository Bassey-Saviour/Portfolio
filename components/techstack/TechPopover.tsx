import React from "react";
import { TechTool, getPopoverPosition } from "@/data/techstack";
import BrandMark from "./BrandMark";

interface TechPopoverProps {
  tool: TechTool;
  index: number;
  onClose?: () => void;
}

export default function TechPopover({ tool, index, onClose }: TechPopoverProps) {
  const pos = getPopoverPosition(index);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`popover-enter absolute bottom-[calc(100%+14px)] ${pos.popover} pointer-events-auto z-50`}
      role="tooltip"
    >
      <div
        className="relative w-[calc(100vw-2.5rem)] max-w-[285px] rounded-2xl border bg-[#15121b]/96 p-3.5 sm:p-4.5 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300"
        style={{
          borderColor: `${tool.color}44`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.65), 0 0 32px ${tool.color}20, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        {/* Ambient corner aura tinted in brand color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-60"
          style={{ backgroundColor: tool.color }}
        />

        {/* Top Row: Brand Icon, Name & Category */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: tool.bg }}
            >
              <BrandMark type={tool.type} color={tool.color} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-sm font-bold tracking-tight text-[#F2E9DC] truncate">
                {tool.name}
              </h3>
              <p className="text-[10px] font-mono text-[#B8A996] truncate">
                {tool.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="rounded-full border px-2 py-0.5 font-mono text-[9.5px] font-medium"
              style={{
                borderColor: `${tool.color}35`,
                backgroundColor: `${tool.color}12`,
                color: tool.color,
              }}
            >
              {tool.level}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Dismiss inspector"
                className="h-5 w-5 rounded-full flex items-center justify-center text-[#B8A996] hover:text-[#F2E9DC] hover:bg-white/10 transition-colors text-xs cursor-pointer active:scale-95"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Proficiency Slider Bar */}
        <div className="mt-3.5 pt-3 border-t border-[#F2E9DC]/[0.08]">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="font-semibold tracking-wider text-[#B8A996] uppercase text-[9.5px]">
              Proficiency
            </span>
            <span className="font-bold" style={{ color: tool.color }}>
              {tool.proficiency}%
            </span>
          </div>

          {/* Custom Slider Track with Tick Marks */}
          <div className="relative mt-2 h-2.5 w-full rounded-full bg-[#0c0a10] border border-[#F2E9DC]/12 overflow-visible">
            {/* Internal graduation tick marks (25%, 50%, 75%) */}
            <div className="absolute inset-0 flex justify-between px-1.5 items-center pointer-events-none z-0">
              <span className="h-1 w-px bg-[#F2E9DC]/20" />
              <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
              <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
              <span className="h-1.5 w-px bg-[#F2E9DC]/30" />
              <span className="h-1 w-px bg-[#F2E9DC]/20" />
            </div>

            {/* Filled glowing progress bar */}
            <div
              className="h-full rounded-full transition-all duration-500 ease-out relative z-10"
              style={{
                width: `${tool.proficiency}%`,
                background: `linear-gradient(90deg, ${tool.color}77, ${tool.color})`,
                boxShadow: `0 0 10px ${tool.color}55`,
              }}
            />

            {/* Tactile slider thumb indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#18141f] border-2 shadow-md z-20 flex items-center justify-center transition-all duration-500"
              style={{
                left: `${tool.proficiency}%`,
                borderColor: tool.color,
                boxShadow: `0 0 10px ${tool.color}`,
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: tool.color }}
              />
            </div>
          </div>

          {/* Tick labels */}
          <div className="mt-1 flex justify-between font-mono text-[8.5px] text-[#B8A996]/50 px-0.5">
            <span>Beginner</span>
            <span>Working</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Use Case Pills */}
        <div className="mt-3">
          <p className="font-mono text-[9.5px] font-semibold tracking-wider text-[#B8A996] uppercase">
            Primary Uses
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tool.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium leading-tight"
                style={{
                  backgroundColor: `${tool.color}10`,
                  borderColor: `${tool.color}30`,
                  color: "#F2E9DC",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Summary Note */}
        <p className="mt-3 border-t border-[#F2E9DC]/[0.08] pt-2 text-[11px] leading-relaxed text-[#B8A996]/90">
          {tool.summary}
        </p>

        {/* Bottom arrow notch pointing down at the tool */}
        <div
          className={`pointer-events-none absolute -bottom-1.5 h-3 w-3 rotate-45 border-b border-r bg-[#15121b] ${pos.arrow}`}
          style={{
            borderColor: `${tool.color}44`,
          }}
        />
      </div>
    </div>
  );
}
