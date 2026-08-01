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

    if (
      !grid ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".shrimp-context-card"),
    );

    let frame = 0;

    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;

        const offset = Math.max(
          -26,
          Math.min(
            26,
            (viewportCenter - cardCenter) * 0.075,
          ),
        );

        card.style.setProperty(
          "--context-scroll-y",
          `${offset}px`,
        );
      });
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
    <div
      ref={gridRef}
      className="shrimp-context-grid reveal"
    >
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
              preload="auto"
              disablePictureInPicture
              aria-label={item.alt}
            />
          ) : (
            <img src={item.src} alt={item.alt} />
          )}
        </div>
      ))}
    </div>
  );
}
