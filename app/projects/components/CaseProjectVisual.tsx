type CaseProjectVisualProps = {
  variant: "mrshrimp" | "punto" | "smarthome";
  image: string;
  tabletImage?: string;
  mobileImage?: string;
};

export default function CaseProjectVisual({
  variant,
  image,
  tabletImage,
  mobileImage,
}: CaseProjectVisualProps) {
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;

    const img = artwork.querySelector<HTMLImageElement>(
      ".case-hero-artwork__image",
    );

    if (!img) return;

    const markLoaded = () => {
      artwork.classList.add("is-media-loaded");
    };

    if (img.complete) {
      markLoaded();
    }

    img.addEventListener("load", markLoaded);
    img.addEventListener("error", markLoaded);

    return () => {
      img.removeEventListener("load", markLoaded);
      img.removeEventListener("error", markLoaded);
    };
  }, [image]);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateParallax = () => {
      if (window.matchMedia("(max-width: 1200px)").matches) {
        artwork.style.setProperty("--case-hero-scroll-y", "0px");
        return;
      }

      const rect = artwork.getBoundingClientRect();
      const offset = Math.max(
        -28,
        Math.min(28, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.08),
      );
      const devicePixelRatio = window.devicePixelRatio || 1;
      const crispOffset =
        Math.round(offset * devicePixelRatio) / devicePixelRatio;
      artwork.style.setProperty("--case-hero-scroll-y", `${crispOffset}px`);
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
      <span className="case-media-loader" aria-hidden="true" />

      <picture>
        {mobileImage && (
          <source media="(max-width: 600px)" srcSet={mobileImage} />
        )}
        {tabletImage && (
          <source
            media="(min-width: 601px) and (max-width: 1200px)"
            srcSet={tabletImage}
          />
        )}
        <img
          className="case-hero-artwork__image"
          src={image}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={(event) => {
            event.currentTarget
              .closest(".case-hero-artwork")
              ?.classList.add("is-media-loaded");
          }}
        />
      </picture>
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
