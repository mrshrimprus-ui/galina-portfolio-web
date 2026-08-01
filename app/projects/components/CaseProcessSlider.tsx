"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export type CaseProcessStage = {
  label: string;
  title: string;
  description: string;
  card: string;
  tags: readonly string[];
  visual?: ReactNode;
};

type CaseProcessSliderProps = {
  stages: readonly CaseProcessStage[];
  ariaLabel?: string;
};

export default function CaseProcessSlider({
  stages,
  ariaLabel = "Этапы процесса",
}: CaseProcessSliderProps) {
  const processSliderRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];

  useEffect(() => {
    const processSlider = processSliderRef.current;

    if (
      !processSlider ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const rect = processSlider.getBoundingClientRect();
      const sliderCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const offset = Math.max(
        -22,
        Math.min(
          22,
          (viewportCenter - sliderCenter) * 0.06,
        ),
      );

      processSlider.style.setProperty(
        "--process-scroll-y",
        `${offset.toFixed(2)}px`,
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

  if (!stage) return null;

  const move = (direction: number) => {
    if (!stages.length) return;

    setActiveStage(
      (current) =>
        (current + direction + stages.length) %
        stages.length,
    );
  };

  const selectStage = (index: number) => {
    if (index === activeStage) return;
    setActiveStage(index);
  };

  return (
    <div
      className="shrimp-process-slider reveal"
      ref={processSliderRef}
      data-cursor="carousel-right"
      role="region"
      aria-roledescription="карусель"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onPointerMove={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;

        const rect = event.currentTarget.getBoundingClientRect();

        event.currentTarget.dataset.cursor =
          event.clientX < rect.left + rect.width / 2
            ? "carousel-left"
            : "carousel-right";
      }}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;

        const rect = event.currentTarget.getBoundingClientRect();

        move(
          event.clientX < rect.left + rect.width / 2
            ? -1
            : 1,
        );
      }}
    >
      <div className="shrimp-process-scene">
        <div
          className="shrimp-process-visual-stack"
          aria-hidden="true"
        >
          {stages.map((item, index) => {
            const isActive = index === activeStage;

            return (
              <motion.div
                className="shrimp-process-visual-layer"
                key={`${item.label}-${index}`}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 10,
                  scale: isActive ? 1 : 0.992,
                }}
                transition={{
                  duration: isActive ? 0.8 : 0.22,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                style={{
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {item.visual}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="shrimp-process-result"
          key={stage.label}
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
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <h3 className="type-text-l">
            {stage.title}
          </h3>

          <p className="type-caption-small">
            {stage.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="shrimp-process-tabs"
        role="tablist"
        aria-label={ariaLabel}
        layout
      >
        {stages.map((item, index) => {
          const isActive = index === activeStage;

          return (
            <motion.button
              layout
              style={{ borderRadius: 24 }}
              className={isActive ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={isActive}
              key={item.label}
              onClick={() => selectStage(index)}
              data-cursor="link"
              transition={{
                layout: {
                  duration: 0.48,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
            >
              <motion.span
                className="shrimp-process-tab-head"
                layout="position"
              >
                <span className="shrimp-process-tab-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="shrimp-process-tab-label">
                  {item.label}
                </span>
              </motion.span>

              <AnimatePresence
                initial={false}
                mode="popLayout"
              >
                {isActive && (
                  <motion.span
                    className="shrimp-process-tab-copy"
                    key={`copy-${item.label}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1] as const,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.12,
                        ease: "easeOut",
                      },
                    }}
                  >
                    <span className="shrimp-process-tab-copy-inner">
                      <span className="shrimp-process-tab-description type-caption-small">
                        {item.card}
                      </span>

                      <span className="shrimp-process-tags">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </span>
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
