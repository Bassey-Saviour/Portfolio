"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useIntro } from "@/components/loading/IntroContext";

/**
 * Minimal Precision 6-Point Asterisk with Dynamic Kinetic Swing Arc
 * - Slender, flat silhouette matching reference image (3 intersecting thin bars with square ends).
 * - "Much thinner" (36px thickness) & "a bit smaller" geometric proportions.
 * - Loading Phase: Spins actively with organic floating hover on the white loading screen.
 * - Transition Phase: Performs a dynamic gravitational swing arc: swoops from top-left,
 *   plunges down near the bottom of the viewport with a rotational speed burst,
 *   then curves gracefully upward and settles into the hero position while shifting to cream (#F2E9DC).
 * - Hero Phase: Fully interactive with drag, fling physics, click bob-away recoil, and hover.
 */
export default function InteractiveAsterisk() {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const asteriskRef = useRef<SVGSVGElement | null>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  const { phase } = useIntro();
  const [mounted, setMounted] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobileScreen(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Transition trajectory tracking
  const transitionStartTimeRef = useRef<number | null>(null);
  const startSwoopPosRef = useRef<{ x: number; y: number } | null>(null);

  // Physics state references for silky 60/120fps physics loop
  const physicsRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    angularVelocity: 0.35, // actively spinning during loading
    baseRotationSpeed: 0.35,
    scale: 1,
    targetScale: 1,
    scaleVelocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
    dragDistance: 0,
    lastScrollY: 0,
  });

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const p = physicsRef.current;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = Math.abs(scrollY - p.lastScrollY);
      p.lastScrollY = scrollY;

      if (!p.isDragging && !prefersReducedMotion) {
        p.angularVelocity += scrollDelta * 0.003;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Smooth cubic bezier easing function
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const tick = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 16.667, 2.0);
      lastTime = currentTime;

      const isMobile = window.innerWidth < 768;

      if (!prefersReducedMotion) {
        // =====================================================================
        // A. INTRO LOADING & SWOOP ARC TRAJECTORY (Managed via Portal Container)
        // =====================================================================
        if (phase === "loading") {
          // 1. More active spin during loading phase
          p.baseRotationSpeed = 0.35;

          // 2. Organic alive floating hover in top half (centered on mobile)
          const baseStartX = isMobile ? window.innerWidth * 0.50 : window.innerWidth * 0.20;
          const baseStartY = isMobile ? window.innerHeight * 0.35 : window.innerHeight * 0.26;

          const floatX = Math.cos(currentTime * 0.0022) * (isMobile ? 3 : 6);
          const floatY = Math.sin(currentTime * 0.0028) * (isMobile ? 5 : 9);

          const curX = baseStartX + floatX;
          const curY = baseStartY + floatY;

          startSwoopPosRef.current = { x: curX, y: curY };

          if (portalContainerRef.current) {
            portalContainerRef.current.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) translate(-50%, -50%)`;
          }
        } else if (phase === "transitioning") {
          // First frame of transition: mark start time
          if (!transitionStartTimeRef.current) {
            transitionStartTimeRef.current = currentTime;
          }

          const elapsed = currentTime - transitionStartTimeRef.current;
          const DURATION = 1050; // ms
          const u = Math.min(elapsed / DURATION, 1.0);
          const t = easeInOutCubic(u);

          // Hero target coordinates from anchor element
          let targetX = isMobile ? window.innerWidth * 0.50 : window.innerWidth * 0.80;
          let targetY = isMobile ? window.innerHeight * 0.38 : window.innerHeight * 0.42;

          if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            targetX = rect.left + rect.width / 2;
            targetY = rect.top + rect.height / 2;
          }

          const p0 = startSwoopPosRef.current || {
            x: isMobile ? window.innerWidth * 0.38 : window.innerWidth * 0.20,
            y: isMobile ? window.innerHeight * 0.28 : window.innerHeight * 0.26,
          };

          // Deep dip point towards the bottom of the screen
          const midX = (p0.x + targetX) * 0.48;
          const dipY = Math.max(window.innerHeight * 0.98, (p0.y + targetY) * 0.5 + 350);

          // Quadratic Bezier formula: (1 - t)^2 * P0 + 2(1 - t)t * P_dip + t^2 * P1
          const oneMinusT = 1 - t;
          const curX = oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * midX + t * t * targetX;
          const curY = oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * dipY + t * t * targetY;

          if (portalContainerRef.current) {
            portalContainerRef.current.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) translate(-50%, -50%)`;
          }

          // Dynamic angular velocity surge: spins faster through the bottom valley curve
          const surge = Math.sin(u * Math.PI) * 2.8;
          p.angularVelocity += surge * 0.08 * dt;

          // As it climbs into the hero position, decelerate back to calm ambient hero speed
          p.baseRotationSpeed = 0.35 * (1 - u) + 0.08 * u;

          // Subtle scale expansion during downward plunge, cushioning upon landing
          if (u < 0.6) {
            p.targetScale = 1.0 + Math.sin((u / 0.6) * Math.PI) * 0.06;
          } else {
            p.targetScale = 1.0;
          }
        } else {
          // Intro complete: reset transition tracking
          transitionStartTimeRef.current = null;
          p.baseRotationSpeed = 0.08;
        }

        // =====================================================================
        // B. LOCAL MICRO PHYSICS (Spin, Spring Position, Scale Bounce)
        // =====================================================================
        if (phase === "complete" && !p.isDragging) {
          const springK = 0.042;
          const damping = 0.88;
          const forceX = -p.x * springK;
          const forceY = -p.y * springK;

          p.vx = (p.vx + forceX * dt) * damping;
          p.vy = (p.vy + forceY * dt) * damping;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }

        // Clean, continuous rotation physics
        p.rotation = (p.rotation + p.angularVelocity * dt) % 360;
        p.angularVelocity += (p.baseRotationSpeed - p.angularVelocity) * 0.02 * dt;

        // Scale spring physics
        const scaleSpringK = 0.12;
        const scaleDamping = 0.78;
        const scaleForce = (p.targetScale - p.scale) * scaleSpringK;
        p.scaleVelocity = (p.scaleVelocity + scaleForce * dt) * scaleDamping;
        p.scale += p.scaleVelocity * dt;

        // Apply physical transform directly to SVG element
        if (asteriskRef.current) {
          const offsetX = phase === "complete" ? p.x : 0;
          const offsetY = phase === "complete" ? p.y : 0;
          asteriskRef.current.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) rotate(${p.rotation.toFixed(2)}deg) scale(${p.scale.toFixed(3)})`;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phase]);

  // Pointer Interactions: Drag & Fling Physics (Active after intro completes)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;

    const p = physicsRef.current;
    p.isDragging = true;
    p.dragDistance = 0;
    p.dragStartX = e.clientX - p.x;
    p.dragStartY = e.clientY - p.y;
    p.lastPointerX = e.clientX;
    p.lastPointerY = e.clientY;
    p.lastPointerTime = performance.now();
    p.vx = 0;
    p.vy = 0;
    p.targetScale = 1.03;

    setIsDraggingState(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;

    const newX = e.clientX - p.dragStartX;
    const newY = e.clientY - p.dragStartY;

    const dx = e.clientX - p.lastPointerX;
    const dy = e.clientY - p.lastPointerY;
    const dt = Math.max(performance.now() - p.lastPointerTime, 1);

    p.dragDistance += Math.hypot(dx, dy);

    p.vx = (dx / dt) * 12;
    p.vy = (dy / dt) * 12;

    p.x = newX;
    p.y = newY;
    p.lastPointerX = e.clientX;
    p.lastPointerY = e.clientY;
    p.lastPointerTime = performance.now();
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;

    p.isDragging = false;
    setIsDraggingState(false);
    p.targetScale = 1.0;

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (p.dragDistance < 6) {
      handleBobAway(e.clientX, e.clientY);
    }
  }, []);

  // Bob-Away / Click Reaction
  const handleBobAway = (clickX: number, clickY: number) => {
    const p = physicsRef.current;
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dirX = centerX - clickX;
    const dirY = centerY - clickY;
    const dist = Math.hypot(dirX, dirY) || 1;
    const normX = dirX / dist;
    const normY = dirY / dist;

    // Clean recoil impulse
    const impulseForce = 26 + Math.random() * 8;
    p.vx += normX * impulseForce;
    p.vy += normY * impulseForce;

    // Gentle spin burst
    const spinSign = Math.random() > 0.5 ? 1 : -1;
    p.angularVelocity += spinSign * 4;

    p.scale = 0.92;
    p.scaleVelocity = 0.12;
    p.targetScale = 1.0;
  };

  const ARM_LENGTH = 180; // half-bar length from center to tip
  const BAR_THICKNESS = isMobileScreen ? 64 : 36; // chunky brutalist on mobile, original slender on desktop

  const isIntroActive = phase !== "complete";
  const isTransitioning = phase === "transitioning";

  // Shared Asterisk SVG Element
  const AsteriskGraphic = (
    <svg
      ref={asteriskRef}
      viewBox="-215 -215 430 430"
      className={`w-full h-full touch-none select-none transition-opacity duration-300 ${
        isIntroActive
          ? "pointer-events-none"
          : isDraggingState
          ? "cursor-grabbing pointer-events-auto"
          : "cursor-grab pointer-events-auto"
      }`}
      style={{
        transformOrigin: "center center",
      }}
      onPointerDown={isIntroActive ? undefined : handlePointerDown}
      onPointerMove={isIntroActive ? undefined : handlePointerMove}
      onPointerUp={isIntroActive ? undefined : handlePointerUp}
      onPointerCancel={isIntroActive ? undefined : handlePointerUp}
      onMouseEnter={() => {
        if (!isIntroActive) {
          setIsHovered(true);
          physicsRef.current.targetScale = 1.03;
        }
      }}
      onMouseLeave={() => {
        if (!isIntroActive) {
          setIsHovered(false);
          if (!physicsRef.current.isDragging) {
            physicsRef.current.targetScale = 1.0;
          }
        }
      }}
    >
      {/* Clean, Flat Graphic 6-Point Asterisk: Solid white on mobile, original subtle cream on desktop */}
      <g
        fill={
          phase === "loading"
            ? "#100f14"
            : isMobileScreen
            ? "#FFFFFF"
            : "#F2E9DC"
        }
        opacity={
          phase === "loading"
            ? 0.92
            : phase === "transitioning"
            ? isMobileScreen ? 0.95 : 0.10
            : isHovered || isDraggingState
            ? isMobileScreen ? 1.0 : 0.18
            : isMobileScreen ? 1.0 : 0.10
        }
        style={{
          transition: isTransitioning
            ? "fill 750ms cubic-bezier(0.4, 0, 0.2, 1), opacity 750ms ease"
            : "fill 300ms ease, opacity 300ms ease-out",
        }}
      >
        {[0, 60, 120].map((angle) => (
          <rect
            key={`bar-${angle}`}
            x={-ARM_LENGTH}
            y={-BAR_THICKNESS / 2}
            width={ARM_LENGTH * 2}
            height={BAR_THICKNESS}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  );

  // Responsive dimension: prominent on mobile, original elegant clamp on desktop
  const asteriskDimension = isMobileScreen
    ? "clamp(230px, 64vw, 290px)"
    : "clamp(220px, 34vw, 440px)";

  // During loading and transition phases, render via Portal above the white curtain (z-[90])
  if (mounted && isIntroActive) {
    return (
      <>
        {/* Invisible layout anchor in #hero to measure destination coordinates */}
        <div
          ref={anchorRef}
          className="relative md:absolute md:top-[38%] md:lg:top-[42%] md:right-[10%] md:lg:right-[15%] md:-translate-y-1/2 z-10 pointer-events-none select-none overflow-visible will-change-transform flex items-center justify-center shrink-0 mb-2 min-[380px]:mb-3 md:mb-0"
          style={{
            width: asteriskDimension,
            height: asteriskDimension,
          }}
          aria-hidden="true"
        />

        {/* Portal Element Floating Above White Curtain with GPU translate3d Swoop */}
        {createPortal(
          <div
            ref={portalContainerRef}
            className="fixed top-0 left-0 z-90 pointer-events-none select-none overflow-visible will-change-transform"
            style={{
              width: asteriskDimension,
              height: asteriskDimension,
            }}
            aria-label="Kinetic Asterisk Symbol"
          >
            {AsteriskGraphic}
          </div>,
          document.body
        )}
      </>
    );
  }

  // Once intro is complete, sit naturally inside #hero with full interactivity
  return (
    <div
      ref={anchorRef}
      className="relative md:absolute md:top-[38%] md:lg:top-[42%] md:right-[10%] md:lg:right-[15%] md:-translate-y-1/2 z-10 pointer-events-none select-none overflow-visible will-change-transform flex items-center justify-center shrink-0 mb-2 min-[380px]:mb-3 md:mb-0"
      style={{
        width: asteriskDimension,
        height: asteriskDimension,
      }}
      aria-label="Minimal Kinetic Asterisk"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            handleBobAway(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        }
      }}
    >
      {AsteriskGraphic}
    </div>
  );
}
