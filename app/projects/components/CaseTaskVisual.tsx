"use client";

import { useEffect, useRef } from "react";

type CaseTaskVisualProps = {
  src: string;
  alt: string;
};

export default function CaseTaskVisual({
  src,
  alt,
}: CaseTaskVisualProps) {
  const mediaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = mediaRef.current;

    if (
      !media ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const rect = media.getBoundingClientRect();
      const mediaCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const offset = Math.max(
        -44,
        Math.min(
          44,
          (viewportCenter - mediaCenter) * 0.1,
        ),
      );

      media.style.setProperty(
        "--mvp-scroll-y",
        `${offset}px`,
      );
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <figure
      ref={mediaRef}
      className="shrimp-mvp-media case-task-visual reveal"
    >
      <img src={src} alt={alt} />
    </figure>
  );
}
