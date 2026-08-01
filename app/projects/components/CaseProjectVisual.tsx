"use client";

import { useEffect, useRef } from "react";

type CaseProjectVisualProps = {
  variant: "mrshrimp" | "punto" | "smarthome";
  image: string;
};

export default function CaseProjectVisual({
  variant,
  image,
}: CaseProjectVisualProps) {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;

    if (
      !visual ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let frame = 0;

    const updateScrollPosition = () => {
      const rect = visual.getBoundingClientRect();
      const visualCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const offset = Math.max(
        -36,
        Math.min(36, (viewportCenter - visualCenter) * 0.065),
      );

      const rotation = Math.max(-1.4, Math.min(1.4, offset / 26));
      const blockOffset = Math.max(-14, Math.min(14, offset * 0.38));

      visual.style.setProperty("--cover-scroll-y", `${offset}px`);
      visual.style.setProperty("--cover-scroll-rotate", `${rotation}deg`);
      visual.style.setProperty("--cover-block-scroll-y", `${blockOffset}px`);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrollPosition);
    };

    updateScrollPosition();

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
      ref={visualRef}
      className={`shrimp-cover-visual reveal case-cover-visual case-cover-visual--${variant}`}
      aria-hidden="true"
      onPointerMove={(event) => {
        const visual = visualRef.current;

        if (
          !visual ||
          !window.matchMedia("(pointer: fine)").matches ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) return;

        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        visual.style.setProperty("--cover-pointer-x", `${x * 28}px`);
        visual.style.setProperty("--cover-pointer-y", `${y * 20}px`);
      }}
      onPointerLeave={() => {
        visualRef.current?.style.setProperty("--cover-pointer-x", "0px");
        visualRef.current?.style.setProperty("--cover-pointer-y", "0px");
      }}
    >
      <img
        className="case-cover-image"
        src={image}
        alt=""
      />
    </div>
  );
}
