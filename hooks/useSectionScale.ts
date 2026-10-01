"use client";

import { useEffect, useRef } from "react";

export interface SectionScaleOptions {
  minScale?: number; // Minimum entrance scale (default: 0.85)
  exitScale?: number; // Minimum exit scale (default: 0.82)
  translateY?: number; // Entrance vertical translation distance in px (default: 36)
  exitTranslateY?: number; // Exit vertical translation distance in px (default: -40)
  entryStart?: number; // Viewport factor where entrance animation begins (default: 0.92)
  entryEnd?: number; // Viewport factor where entrance completes to full 1.00 (default: 0.40)
  exitStart?: number; // Viewport factor where exit starts (default: 0.85)
  exitEnd?: number; // Viewport factor where exit completes (default: 0.08)
  isTerminal?: boolean; // If true, skips exit scaling (for last section / footer)
}

/**
 * Silky scroll-driven scale entrance & exit animation for portfolio sections.
 * - Entrance: Scales smoothly up from minScale (e.g. 0.85) to 1.00 with gentle vertical glide.
 * - Active Zone: Resets style.transform to "none" so native CSS position: sticky & rendering remain 100% intact.
 * - Exit Zone: As the section leaves out the top of the viewport, scales smoothly down to exitScale (e.g. 0.82).
 */
export function useSectionScale(options: SectionScaleOptions = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const {
    minScale = 0.75,
    exitScale = 0.72,
    translateY = 36,
    exitTranslateY = -40,
    entryStart = 0.92,
    entryEnd = 0.4,
    exitStart = 0.85,
    exitEnd = 0.08,
    isTerminal = false,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      if (sectionRef.current) {
        sectionRef.current.style.transform = "none";
        sectionRef.current.style.opacity = "1";
      }
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startEntryY = windowHeight * entryStart;
            const endEntryY = windowHeight * entryEnd;
            const startExitY = windowHeight * exitStart;
            const endExitY = windowHeight * exitEnd;

            // 1. Entrance Zone: Section is entering the bottom of the viewport
            if (rect.top >= startEntryY) {
              sectionRef.current.style.transform = `scale(${minScale}) translate3d(0, ${translateY}px, 0)`;
              sectionRef.current.style.opacity = "0.15";
            } else if (rect.top > endEntryY) {
              const entryProgress = Math.min(
                Math.max(
                  (startEntryY - rect.top) / (startEntryY - endEntryY),
                  0,
                ),
                1,
              );
              const eased = Math.pow(entryProgress, 1.2);
              const currentScale = minScale + eased * (1.0 - minScale);
              const currentY = (1 - eased) * translateY;
              const opacity = 0.15 + eased * 0.85;

              sectionRef.current.style.transform = `scale(${currentScale.toFixed(4)}) translate3d(0, ${currentY.toFixed(1)}px, 0)`;
              sectionRef.current.style.opacity = `${opacity.toFixed(3)}`;
            }
            // 2. Exit Zone: Section top has scrolled past viewport top and bottom is moving away
            else if (!isTerminal && rect.top < 50 && rect.bottom < startExitY) {
              const exitProgress = Math.min(
                Math.max(
                  (startExitY - rect.bottom) / (startExitY - endExitY),
                  0,
                ),
                1,
              );
              const exitEased = Math.pow(exitProgress, 1.1);
              const currentExitScale = 1.0 - exitEased * (1.0 - exitScale);
              const currentExitY = exitTranslateY * exitEased;
              const exitOpacity = Math.max(1.0 - exitEased * 0.85, 0.15);

              sectionRef.current.style.transform = `scale(${currentExitScale.toFixed(4)}) translate3d(0, ${currentExitY.toFixed(1)}px, 0)`;
              sectionRef.current.style.opacity = `${exitOpacity.toFixed(3)}`;
            }
            // 3. Active Zone: transform cleared to 'none' for native sticky positioning & crystal rendering
            else {
              sectionRef.current.style.transform = "none";
              sectionRef.current.style.opacity = "1";
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [
    minScale,
    exitScale,
    translateY,
    exitTranslateY,
    entryStart,
    entryEnd,
    exitStart,
    exitEnd,
    isTerminal,
  ]);

  return sectionRef;
}
