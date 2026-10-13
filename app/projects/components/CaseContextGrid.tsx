"use client";

import { useEffect, useRef } from "react";

type CaseContextItem = {
  type?: "image" | "video" | "youtube";
  src: string;
  alt: string;
};

type CaseContextGridProps = {
  items: [CaseContextItem, CaseContextItem, CaseContextItem];
  parallax?: boolean;
  priority?: boolean;
};

const cardClasses = [
  "shrimp-context-card--left",
  "shrimp-context-card--top",
  "shrimp-context-card--video",
];

export default function CaseContextGrid({
  items,
  parallax = true,
  priority = false,
}: CaseContextGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const mediaKey = items.map((item) => item.src).join("|");
  const mediaTypes = items.map((item) => item.type ?? "image").join("|");

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".shrimp-context-card"),
    );
    const types = mediaTypes.split("|");

    if (!parallax || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.style.removeProperty("--context-scroll-y"));
      return;
    }
    let frame = 0;
    const currentOffsets = cards.map(() => 0);
    const targetOffsets = cards.map(() => 0);

    const updateTargets = () => {
      cards.forEach((card, index) => {
        if (types[index] === "video" || types[index] === "youtube") {
          targetOffsets[index] = 0;
          return;
        }

        const rect = card.getBoundingClientRect();
        const compactMrShrimpIcon =
          index === 1 &&
          Boolean(grid.closest(".mrshrimp-case")) &&
          window.matchMedia("(max-width: 700px)").matches;
        const depth = compactMrShrimpIcon
          ? 0.04
          : index === 0
            ? 0.13
            : index === 1
              ? 0.105
              : 0.14;
        const limit = compactMrShrimpIcon ? 12 : index === 1 ? 34 : 56;
        targetOffsets[index] = Math.max(
          -limit,
          Math.min(limit, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * depth),
        );
      });
    };

    const renderParallax = () => {
      let moving = false;
      cards.forEach((card, index) => {
        if (types[index] === "video" || types[index] === "youtube") {
          currentOffsets[index] = 0;
          card.style.removeProperty("--context-scroll-y");
          return;
        }

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
      if (types[index] === "video" || types[index] === "youtube") {
        cards[index].style.removeProperty("--context-scroll-y");
        return;
      }

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
  }, [mediaKey, mediaTypes, parallax]);

  return (
    <div ref={gridRef} className="shrimp-context-grid reveal">
      {items.map((item, index) => (
        <div
          key={item.src}
          className={[
            "shrimp-context-card",
            cardClasses[index],
            index === 2 && item.type !== "video" && item.type !== "youtube"
              ? "shrimp-context-card--image-contain"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.type === "youtube" ? (
            <iframe
              className="shrimp-context-youtube"
              src={item.src}
              title={item.alt}
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
            />
          ) : item.type === "video" ? (
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
            <img
              src={item.src}
              alt={item.alt}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
            />
          )}
        </div>
      ))}
    </div>
  );
}
