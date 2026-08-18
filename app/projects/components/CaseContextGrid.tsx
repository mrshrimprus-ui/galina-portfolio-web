"use client";

import { useEffect, useRef } from "react";

type CaseContextItem = {
  type?: "image" | "video";
  src: string;
  alt: string;
};

type CaseContextGridProps = {
  items: [CaseContextItem, CaseContextItem, CaseContextItem];
};

const cardClasses = [
  "shrimp-context-card--left",
  "shrimp-context-card--top",
  "shrimp-context-card--video",
];

export default function CaseContextGrid({
  items,
}: CaseContextGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".shrimp-context-card"),
    );
    let frame = 0;
    const currentOffsets = cards.map(() => 0);
    const targetOffsets = cards.map(() => 0);

    const updateTargets = () => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const depth = index === 0 ? 0.13 : index === 1 ? 0.105 : 0.14;
        const limit = index === 1 ? 34 : 56;
        targetOffsets[index] = Math.max(
          -limit,
          Math.min(limit, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * depth),
        );
      });
    };

    const renderParallax = () => {
      let moving = false;
      cards.forEach((card, index) => {
        const difference = targetOffsets[index] - currentOffsets[index];
        currentOffsets[index] += difference * 0.12;
        card.style.setProperty(
          "--context-scroll-y",
          `${currentOffsets[index].toFixed(2)}px`,
        );
        if (Math.abs(difference) > 0.05) moving = true;
      });
      frame = moving ? requestAnimationFrame(renderParallax) : 0;
    };

    const scheduleUpdate = () => {
      updateTargets();
      if (!frame) frame = requestAnimationFrame(renderParallax);
    };

    updateTargets();
    targetOffsets.forEach((offset, index) => {
      currentOffsets[index] = offset;
      cards[index].style.setProperty("--context-scroll-y", `${offset.toFixed(2)}px`);
    });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div ref={gridRef} className="shrimp-context-grid reveal">
      {items.map((item, index) => (
        <div
          key={item.src}
          className={[
            "shrimp-context-card",
            cardClasses[index],
            index === 2 && item.type !== "video"
              ? "shrimp-context-card--image-contain"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-label={item.alt}
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      ))}
    </div>
  );
}
