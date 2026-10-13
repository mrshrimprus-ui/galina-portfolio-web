"use client";

import { useEffect, useRef } from "react";

type CaseTaskVisualProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function CaseTaskVisual({
  src,
  alt,
  priority = false,
}: CaseTaskVisualProps) {
  const visualRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let current = 0;
    let target = 0;

    const updateTarget = () => {
      if (window.matchMedia("(max-width: 1200px)").matches) {
        target = 0;
        current = 0;
        visual.style.setProperty("--mvp-scroll-y", "0px");
        return;
      }

      const rect = visual.getBoundingClientRect();
      target = Math.max(
        -52,
        Math.min(52, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.11),
      );
    };

    const renderParallax = () => {
      const difference = target - current;
      current += difference * 0.12;
      visual.style.setProperty("--mvp-scroll-y", `${current.toFixed(2)}px`);
      frame = Math.abs(difference) > 0.05
        ? requestAnimationFrame(renderParallax)
        : 0;
    };

    const scheduleUpdate = () => {
      updateTarget();
      if (!frame) frame = requestAnimationFrame(renderParallax);
    };

    updateTarget();
    current = target;
    visual.style.setProperty("--mvp-scroll-y", `${current.toFixed(2)}px`);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <figure ref={visualRef} className="shrimp-mvp-media case-task-visual reveal">
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </figure>
  );
}
