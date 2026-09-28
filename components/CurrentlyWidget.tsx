"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { personalData, CurrentlyItem } from "@/data/personal";

export default function CurrentlyWidget() {
  const items = personalData.currently?.items || [];
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "listening");
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const [hasMeasured, setHasMeasured] = useState(false);

  const updateIndicator = useCallback(() => {
    const el = tabRefs.current[activeId];
    if (el) {
      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
      setHasMeasured(true);
    }
  }, [activeId]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  if (items.length === 0) return null;

  const activeItem: CurrentlyItem =
    items.find((item) => item.id === activeId) || items[0];

  return (
    <section className="w-full my-12 sm:my-16">
      {/* Section Header with hairline rule */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8963C]">
            In rotation
          </p>
          
        </div>
        <hr className="border-t border-[#F2E9DC]/10" />
      </div>

      {/* Grounded Minimalist Tabs with seamless sliding underline */}
      <div className="relative pb-3 border-b border-[#F2E9DC]/10 mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`group py-1 text-xs sm:text-sm font-mono transition-colors duration-250 cursor-pointer ${
                  isActive
                    ? "text-[#F2E9DC] font-medium"
                    : "text-[#B8A996]/50 hover:text-[#B8A996]"
                }`}
              >
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Seamless sliding active indicator (no dot, soft rounded line) */}
        <span
          aria-hidden="true"
          className="absolute -bottom-px h-[2px] bg-[#E8963C] rounded-full pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
            opacity: hasMeasured ? 1 : 0,
          }}
        />
      </div>

      {/* Active Item Showcase with soft dissolution fade */}
      {activeItem && (
        <div
          key={activeItem.id}
          className="min-h-[120px] animate-[softFadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F2E9DC]">
                  {activeItem.title}
                </h3>

                {activeItem.id === "listening" && (
                  <div
                    aria-hidden="true"
                    className="inline-flex items-end gap-[2.5px] h-4 w-4 mb-1"
                    title="Now playing"
                  >
                    <span className="w-[2.5px] bg-[#E8963C] rounded-full animate-[musicBar_0.8s_ease-in-out_infinite_alternate]" />
                    <span className="w-[2.5px] bg-[#E8963C] rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_alternate_0.2s]" />
                    <span className="w-[2.5px] bg-[#E8963C] rounded-full animate-[musicBar_0.6s_ease-in-out_infinite_alternate_0.4s]" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {activeItem.badge && (
                  <span className="font-mono text-xs text-[#E8963C]/80">
                    {activeItem.badge}
                  </span>
                )}
                {activeItem.url && (
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8963C] hover:text-[#f3b866] transition-colors font-mono text-sm"
                    aria-label={`Open link for ${activeItem.title}`}
                  >
                    ↗
                  </a>
                )}
              </div>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#E8963C]">
              {activeItem.subtitle}
            </p>

            {activeItem.details && (
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#B8A996] max-w-2xl">
                {activeItem.details}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
