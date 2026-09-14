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
  return (
    <div
      className={`relative ${isActive ? "z-40" : "z-10"}`}
      onMouseEnter={() => onSelect(tool.name)}
      onMouseLeave={() => onSelect(null)}
    >
      {/* Base tool tile */}
      <button
        type="button"
        onClick={() => onSelect(isActive ? null : tool.name)}
        onFocus={() => onSelect(tool.name)}
        onBlur={() => onSelect(null)}
        className={`group w-full aspect-square rounded-2xl border p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8963C] text-left cursor-pointer ${
          isActive
            ? "bg-[#211d28]/90 -translate-y-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
            : "bg-[#17141d]/45 hover:-translate-y-1.5 hover:border-[#F2E9DC]/30 hover:bg-[#211d28]/70 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
        }`}
        style={{
          borderColor: isActive ? `${tool.color}77` : "rgba(242,233,220,0.08)",
          boxShadow: isActive
            ? `0 16px 36px rgba(0,0,0,0.4), 0 0 20px ${tool.color}25, inset 0 1px 0 rgba(255,255,255,.06)`
            : `inset 0 1px 0 rgba(255,255,255,.04)`,
        }}
        aria-expanded={isActive}
        aria-label={`Inspect ${tool.name}`}
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
          className={`mt-1 block h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isActive ? "w-9" : "w-4 group-hover:w-9"
          }`}
          style={{ backgroundColor: tool.color }}
        />
      </button>

      {/* The "Cool Square Thingy" Inspector Popover */}
      {isActive && <TechPopover tool={tool} index={index} />}
    </div>
  );
}
