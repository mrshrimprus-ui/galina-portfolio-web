"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import CaseVideoPreview from "./CaseVideoPreview";

export type CaseSolutionSlide = {
  title: string;
  description: string;
  visual: string;
  background?: string;
  picture?: string;
  video?: {
    src: string;
    title: string;
  };
};

type CaseSolutionSliderProps = {
  slides: readonly CaseSolutionSlide[];
  ariaLabel: string;
  renderVisual?: (visual: string) => ReactNode;
  mobileCards?: boolean;
};

function CaseSolutionAssetVisual({
  background,
  picture,
  video,
}: {
  background: string;
  picture?: string;
  video?: {
    src: string;
    title: string;
  };
}) {
  return (
    <div
      className="solution-visual solution-visual--asset"
      aria-hidden="true"
    >
      <motion.div
        className="solution-visual__background-reveal"
        initial={{
          opacity: 0.72,
          scale: 1.035,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          className="solution-visual__background"
          src={background}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {picture && (
        <motion.div
          className="solution-visual__picture-reveal"
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="solution-visual__picture-wrap">
            <img
              className="solution-visual__picture"
              src={picture}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      )}

      {video && (
        <CaseVideoPreview
          src={video.src}
          title={video.title}
        />
      )}
    </div>
  );
}

export default function CaseSolutionSlider({
  slides,
  ariaLabel,
  renderVisual,
  mobileCards = false,
}: CaseSolutionSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRootRef = useRef<HTMLDivElement>(null);

  const active = slides[activeSlide];

  useEffect(() => {
    const sources = slides.flatMap((slide) =>
      [slide.background, slide.picture].filter(
        (source): source is string => Boolean(source),
      ),
    );
    const preloaders = sources.map((source) => {
      const image = new Image();
      image.decoding = "async";
      image.src = source;
      image.decode().catch(() => undefined);
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [slides]);

  const goTo = (requestedIndex: number) => {
    const total = slides.length;

    if (!total) return;

    setActiveSlide(
      (requestedIndex + total) % total,
    );
  };

  useEffect(() => {
    const slider = sliderRootRef.current;

    if (
      !slider ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      if (window.matchMedia("(max-width: 1200px)").matches) {
        slider.style.setProperty("--solution-scroll-y", "0px");
        return;
      }

      const rect = slider.getBoundingClientRect();
      const sliderCenter =
        rect.top + rect.height / 2;
      const viewportCenter =
        window.innerHeight / 2;

      const offset = Math.max(
        -28,
        Math.min(
          28,
          (viewportCenter - sliderCenter) * 0.08,
        ),
      );

      slider.style.setProperty(
        "--solution-scroll-y",
        `${offset.toFixed(2)}px`,
      );
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(
        updateParallax,
      );
    };

    updateParallax();

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      scheduleUpdate,
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        scheduleUpdate,
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate,
      );
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        className="shrimp-solution-single case-solution-desktop reveal"
        ref={sliderRootRef}
        role="region"
        aria-roledescription="слайдер"
        aria-label={ariaLabel}
        tabIndex={0}
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        data-cursor="carousel-right"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            goTo(activeSlide - 1);
          }

          if (event.key === "ArrowRight") {
            goTo(activeSlide + 1);
          }
        }}
        onPointerMove={(event) => {
          const target = event.target as HTMLElement;

          if (target.closest(".case-video-preview, .case-video-modal")) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();

          event.currentTarget.dataset.cursor =
            event.clientX < rect.left + rect.width / 2
              ? "carousel-left"
              : "carousel-right";
        }}
        onClick={(event) => {
          const target = event.target as HTMLElement;

          if (target.closest(".case-video-preview, .case-video-modal")) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();

          goTo(
            event.clientX < rect.left + rect.width / 2
              ? activeSlide - 1
              : activeSlide + 1,
          );
        }}
      >
          <article
            className={[
              "solution-single__panel",
              "solution-slide",
              `solution-slide--${active.visual}`,
              "is-active",
            ].join(" ")}
            key={`${activeSlide}-${active.visual}`}
          >
            <div className="solution-single__copy">
              <div
                className="solution-single__copy-motion"
              >
                <div className="solution-single__heading">
                  <span className="solution-single__counter type-caption-small">
                    <span>{activeSlide + 1}</span>

                    <span className="solution-single__counter-divider">
                      /
                    </span>

                    <span>{slides.length}</span>
                  </span>

                  <h3 className="type-h4">
                    {active.title}
                  </h3>
                </div>

                <p className="type-caption solution-slide__description">
                  {active.description}
                </p>
              </div>
            </div>

            {renderVisual ? (
              renderVisual(active.visual)
            ) : active.background ? (
              <CaseSolutionAssetVisual
                background={active.background}
                picture={active.picture}
                video={active.video}
              />
            ) : (
              <div
                className="solution-visual solution-visual--empty"
                aria-hidden="true"
              />
            )}
          </article>

        <p
          className="sr-only"
          aria-live="polite"
        >
          {activeSlide + 1} из {slides.length}:{" "}
          {active.title}
        </p>
      </div>

      {mobileCards && (
        <div
          className="case-solution-mobile reveal"
          role="region"
          aria-roledescription="слайдер"
          aria-label={`${ariaLabel}: мобильная версия`}
        >
          <div className="case-solution-mobile__track">
            {slides.map((slide, index) => (
              <article
                className="case-solution-mobile__slide"
                key={`mobile-${index}-${slide.visual}`}
              >
                <div className="case-solution-mobile__card">
                  <div className="case-solution-mobile__visual">
                    {renderVisual ? (
                      renderVisual(slide.visual)
                    ) : slide.background ? (
                      <>
                        <img
                          className="case-solution-mobile__background"
                          src={slide.background}
                          alt=""
                          draggable={false}
                        />

                        {slide.picture && (
                          <img
                            className="case-solution-mobile__picture"
                            src={slide.picture}
                            alt=""
                            draggable={false}
                          />
                        )}

                        {slide.video && (
                          <CaseVideoPreview
                            src={slide.video.src}
                            title={slide.video.title}
                          />
                        )}
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="case-solution-mobile__copy">
                  <div className="solution-single__heading">
                    <span className="solution-single__counter type-caption-small">
                      <span>{index + 1}</span>
                      <span className="solution-single__counter-divider">
                        /
                      </span>
                      <span>{slides.length}</span>
                    </span>

                    <h3 className="type-h4">
                      {slide.title}
                    </h3>
                  </div>

                  <p className="type-caption solution-slide__description">
                    {slide.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
