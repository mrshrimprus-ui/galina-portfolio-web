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
  mobileCompact?: boolean;
  mobileTagsBelowTitle?: boolean;
};

export default function CaseProcessSlider({
  stages,
  ariaLabel = "Этапы процесса",
  mobileCompact = false,
  mobileTagsBelowTitle = false,
}: CaseProcessSliderProps) {
  const processSliderRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];

  useEffect(() => {
    const slider = processSliderRef.current;
    if (!slider) return;

    let frame = 0;
    let visualCurrent = 0;
    let visualTarget = 0;
    let copyCurrent = 0;
    let copyTarget = 0;
    const applyPositions = () => {
      const visualTransform = `translate3d(0, ${visualCurrent.toFixed(2)}px, 0)`;
      slider.querySelectorAll<HTMLElement>(".process-scroll-parallax__visual").forEach((layer) => {
        const transform = layer.querySelector(".case-video-preview")
          ? "translate3d(0, 0, 0)"
          : visualTransform;

        layer.style.setProperty("transform", transform, "important");
      });
      const copyTransform = `translate3d(0, ${copyCurrent.toFixed(2)}px, 0)`;
      slider.querySelectorAll<HTMLElement>(".process-scroll-parallax__copy").forEach((layer) => {
        layer.style.setProperty("transform", copyTransform, "important");
      });
    };

    const updateTargets = () => {
      const rect = slider.getBoundingClientRect();
      const isCompactMobile =
        window.innerWidth <= 700 &&
        Boolean(slider.querySelector(".case-process-mobile-compact"));

      const maxVisualShift = isCompactMobile ? 16 : 58;
      const visualStrength = isCompactMobile ? 0.035 : 0.115;

      visualTarget = Math.max(
        -maxVisualShift,
        Math.min(
          maxVisualShift,
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) * visualStrength,
        ),
      );
      copyTarget = visualTarget * -0.45;
    };

    const renderParallax = () => {
      updateTargets();
      const visualDifference = visualTarget - visualCurrent;
      const copyDifference = copyTarget - copyCurrent;
      visualCurrent += visualDifference * 0.11;
      copyCurrent += copyDifference * 0.1;
      slider.style.setProperty("--process-scroll-y", `${visualCurrent.toFixed(2)}px`);
      slider.style.setProperty("--process-copy-scroll-y", `${copyCurrent.toFixed(2)}px`);
      applyPositions();
      frame = requestAnimationFrame(renderParallax);
    };

    updateTargets();
    visualCurrent = visualTarget;
    copyCurrent = copyTarget;
    slider.style.setProperty("--process-scroll-y", `${visualCurrent.toFixed(2)}px`);
    slider.style.setProperty("--process-copy-scroll-y", `${copyCurrent.toFixed(2)}px`);
    applyPositions();
    frame = requestAnimationFrame(renderParallax);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  const mobileSwipeStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

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
      className={`shrimp-process-slider reveal${
        mobileCompact ? " has-mobile-compact" : ""
      }`}
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
                <div className="process-scroll-parallax__visual">
                  {item.visual}
                </div>
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
          <div className="process-scroll-parallax__copy">
            <h3 className="type-text-l">
              {stage.title}
            </h3>

            <p className="type-caption-regular">
              {stage.description}
            </p>
          </div>
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
              onPointerEnter={() => selectStage(index)}
              onFocus={() => selectStage(index)}
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

      {mobileCompact && (
        <div
          className={`case-process-mobile-compact${
            mobileTagsBelowTitle ? " has-tags-below-title" : ""
          }`}
          onPointerDown={(event) => {
            if (
              (event.target as HTMLElement).closest(
                "button, .case-process-mobile-compact__tags",
              )
            ) {
              return;
            }

            if (
              event.pointerType === "mouse" &&
              event.button !== 0
            ) {
              return;
            }

            mobileSwipeStartRef.current = {
              x: event.clientX,
              y: event.clientY,
            };

            event.currentTarget.setPointerCapture(
              event.pointerId,
            );
          }}
          onPointerMove={(event) => {
            event.stopPropagation();
          }}
          onPointerUp={(event) => {
            event.stopPropagation();

            const start =
              mobileSwipeStartRef.current;

            mobileSwipeStartRef.current = null;

            if (
              event.currentTarget.hasPointerCapture(
                event.pointerId,
              )
            ) {
              event.currentTarget.releasePointerCapture(
                event.pointerId,
              );
            }

            if (!start) return;

            const deltaX =
              event.clientX - start.x;
            const deltaY =
              event.clientY - start.y;

            const isHorizontal =
              Math.abs(deltaX) >
              Math.abs(deltaY) * 1.15;

            if (
              !isHorizontal ||
              Math.abs(deltaX) < 48
            ) {
              return;
            }

            move(deltaX < 0 ? 1 : -1);
          }}
          onPointerCancel={(event) => {
            mobileSwipeStartRef.current = null;

            if (
              event.currentTarget.hasPointerCapture(
                event.pointerId,
              )
            ) {
              event.currentTarget.releasePointerCapture(
                event.pointerId,
              );
            }
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="case-process-mobile-compact__visual">
            <motion.div
              className="process-scroll-parallax__visual"
              key={`mobile-visual-${stage.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {stage.visual}
            </motion.div>
          </div>

          <div
            className="case-process-mobile-compact__tabs"
            role="tablist"
            aria-label={ariaLabel}
          >
            {stages.map((item, index) => {
              const isActive = index === activeStage;

              return (
                <button
                  className={isActive ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  key={`mobile-${item.label}-${index}`}
                  onClick={() => selectStage(index)}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="case-process-mobile-compact__copy">
            <motion.div
              className="process-scroll-parallax__copy"
              key={`mobile-copy-${stage.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <h3 className="type-text-l">
                {stage.title}
              </h3>

              {mobileTagsBelowTitle && (
                <div className="case-process-mobile-compact__tags">
                  {stage.tags.map((tag) => (
                    <span
                      className="type-caption-small"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="type-caption-regular">
                {stage.card}
              </p>

              {!mobileTagsBelowTitle && (
                <div className="case-process-mobile-compact__tags">
                  {stage.tags.map((tag) => (
                    <span
                      className="type-caption-small"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
