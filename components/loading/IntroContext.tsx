"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

export type IntroPhase = "loading" | "transitioning" | "complete";

export interface IntroContextValue {
  phase: IntroPhase;
  progress: number;
  isIntroActive: boolean;
  skipIntro: () => void;
  replayIntro: () => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

const STORAGE_KEY = "portfolio_intro_seen";

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const [progress, setProgress] = useState(0);

  const phaseRef = useRef<IntroPhase>("loading");
  phaseRef.current = phase;

  const skipIntro = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setPhase("complete");
    setProgress(100);
    document.body.style.overflow = "";
  }, []);

  const replayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    } catch {
      // ignore
    }
  }, []);

  // Expose replay function on window for interactive testing and debugging
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).replayIntro = replayIntro;
    }
  }, [replayIntro]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Session check: if already seen this session, skip immediately
    try {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      if (alreadySeen) {
        setPhase("complete");
        setProgress(100);
        return;
      }
    } catch {
      // If sessionStorage is restricted, proceed with intro
    }

    // Lock page scrolling while intro is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Real asset loading signals
    let domReady =
      document.readyState === "complete" || document.readyState === "interactive";
    let fontsReady = false;
    let windowLoaded = document.readyState === "complete";

    const onDomReady = () => {
      domReady = true;
    };
    const onLoad = () => {
      windowLoaded = true;
      domReady = true;
    };

    if (!domReady) {
      document.addEventListener("DOMContentLoaded", onDomReady, { once: true });
    }
    if (!windowLoaded) {
      window.addEventListener("load", onLoad, { once: true });
    }

    if (typeof document.fonts !== "undefined" && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          fontsReady = true;
        })
        .catch(() => {
          fontsReady = true;
        });
    } else {
      fontsReady = true;
    }

    // 3. Smooth 60fps interpolation ticker
    let animId: number;
    let currentProgress = 0;
    const startTime = performance.now();
    let lastTime = startTime;
    let transitionTriggered = false;

    // Check user preference for reduced motion
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Fast track for reduced motion
      setProgress(100);
      setPhase("complete");
      document.body.style.overflow = originalOverflow;
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {}
      return;
    }

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      // Real asset weight aggregation
      let target = 22; // Initial immediate visual anchor
      if (domReady) target = Math.max(target, 55);
      if (fontsReady) target = Math.max(target, 80);
      if (windowLoaded) target = Math.max(target, 96);

      // Time-based safety ramp tuned for ~2.0s deliberate, polished intro duration
      const INTRO_DURATION = 2000;
      const timeRamp = Math.min(elapsed / INTRO_DURATION, 1) * 100;
      target = Math.max(target, timeRamp);

      // Smooth lerp with calculated forward velocity for ~2s progression
      const diff = target - currentProgress;
      const step = Math.min(Math.max(diff * 0.065, 0.32), 1.6) * dt;
      currentProgress = Math.min(currentProgress + step, 100);

      setProgress(currentProgress);

      if (currentProgress < 99.8) {
        animId = requestAnimationFrame(tick);
      } else {
        // Reached 100%
        setProgress(100);

        if (!transitionTriggered) {
          transitionTriggered = true;

          // 200ms hold at 100% for visual clarity
          setTimeout(() => {
            setPhase("transitioning");

            // 1050ms transition matching curtain lift and asterisk swing arc
            setTimeout(() => {
              setPhase("complete");
              document.body.style.overflow = originalOverflow;
              try {
                sessionStorage.setItem(STORAGE_KEY, "true");
              } catch {
                // ignore
              }
            }, 1050);
          }, 200);
        }
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("DOMContentLoaded", onDomReady);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const value: IntroContextValue = {
    phase,
    progress,
    isIntroActive: phase !== "complete",
    skipIntro,
    replayIntro,
  };

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    // Graceful fallback if component is rendered outside IntroProvider
    return {
      phase: "complete" as IntroPhase,
      progress: 100,
      isIntroActive: false,
      skipIntro: () => {},
      replayIntro: () => {},
    };
  }
  return context;
}
