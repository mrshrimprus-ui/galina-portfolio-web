"use client";

import { AnimatePresence, motion } from "motion/react";
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
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          className="solution-visual__background"
          src={background}
          alt=""
          draggable={false}
        />
      </motion.div>

      {picture && (
        <motion.div
          className="solution-visual__picture-reveal"
          initial={{
            opacity: 0,
            y: 48,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.85,
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
}: CaseSolutionSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRootRef = useRef<HTMLDivElement>(null);

  const active = slides[activeSlide];

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
    <div
      className="shrimp-solution-single reveal"
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

        if (
          target.closest(
            ".case-video-preview, .case-video-modal",
          )
        ) {
          return;
        }

        const rect =
          event.currentTarget.getBoundingClientRect();

        event.currentTarget.dataset.cursor =
          event.clientX <
          rect.left + rect.width / 2
            ? "carousel-left"
            : "carousel-right";
      }}
      onClick={(event) => {
        const target = event.target as HTMLElement;

        if (
          target.closest(
            ".case-video-preview, .case-video-modal",
          )
        ) {
          return;
        }

        const rect =
          event.currentTarget.getBoundingClientRect();

        goTo(
          event.clientX <
          rect.left + rect.width / 2
            ? activeSlide - 1
            : activeSlide + 1,
        );
      }}
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.article
          className={[
            "solution-single__panel",
            "solution-slide",
            `solution-slide--${active.visual}`,
            "is-active",
          ].join(" ")}
          key={`${activeSlide}-${active.visual}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="solution-single__copy">
            <motion.div
              className="solution-single__copy-motion"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="solution-single__heading">
                <span className="solution-single__counter type-caption-small">
                  <span>{activeSlide + 1}</span>

                  <span className="solution-single__counter-divider">
                    /
                  </span>

                  <span>{slides.length}</span>
                </span>

                <h3 className="type-text-l">
                  {active.title}
                </h3>
              </div>

              <p className="type-caption-regular">
                {active.description}
              </p>
            </motion.div>
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
        </motion.article>
      </AnimatePresence>

      <p
        className="sr-only"
        aria-live="polite"
      >
        {activeSlide + 1} из {slides.length}:{" "}
        {active.title}
      </p>
    </div>
  );
}
