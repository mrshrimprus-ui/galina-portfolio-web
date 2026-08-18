type CaseProjectVisualProps = {
  variant: "mrshrimp" | "punto" | "smarthome";
  image: string;
};

export default function CaseProjectVisual({
  variant,
  image,
}: CaseProjectVisualProps) {
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateParallax = () => {
      const rect = artwork.getBoundingClientRect();
      const offset = Math.max(
        -28,
        Math.min(28, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.08),
      );
      artwork.style.setProperty("--case-hero-scroll-y", `${offset.toFixed(2)}px`);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div
      ref={artworkRef}
      className={`case-hero-artwork case-hero-artwork--${variant}`}
      aria-hidden="true"
    >
      <img
        className="case-hero-artwork__image"
        src={image}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
