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
  expandImage?: string;
  expandAlt?: string;
};

type CaseProcessSliderProps = {
  stages: readonly CaseProcessStage[];
  ariaLabel?: string;
  mobileCompact?: boolean;
  mobileTagsBelowTitle?: boolean;
  hideStageCopy?: boolean;
  persistentVisual?: ReactNode;
};

export default function CaseProcessSlider({
  stages,
  ariaLabel = "Этапы процесса",
  mobileCompact = false,
  mobileTagsBelowTitle = false,
  hideStageCopy = false,
  persistentVisual,
}: CaseProcessSliderProps) {
  const processSliderRef = useRef<HTMLDivElement>(null);
  const processMobileTabsRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const stage = stages[activeStage];

  useEffect(() => {
    if (!expandedImage) return;

    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedImage(null);
    };

    window.addEventListener("keydown", closeByEscape);
    return () => window.removeEventListener("keydown", closeByEscape);
  }, [expandedImage]);

  /* PROCESS DESKTOP PARALLAX */
  useEffect(() => {
    const slider = processSliderRef.current;
    if (!slider) return;

    let frame = 0;
    let visualCurrent = 0;
    let visualTarget = 0;
    let copyCurrent = 0;
    let copyTarget = 0;

    const resetAdaptive = () => {
      visualCurrent = 0;
      visualTarget = 0;
      copyCurrent = 0;
      copyTarget = 0;

      slider.style.setProperty("--process-scroll-y", "0px");
      slider.style.setProperty("--process-copy-scroll-y", "0px");

      slider
        .querySelectorAll<HTMLElement>(".shrimp-process-visual-layer .process-scroll-parallax__visual")
        .forEach((layer) => layer.style.removeProperty("transform"));

      slider
        .querySelectorAll<HTMLElement>(".shrimp-process-result .process-scroll-parallax__copy")
        .forEach((layer) => layer.style.removeProperty("transform"));
    };

    const renderParallax = () => {
      if (window.matchMedia("(max-width: 1200px)").matches) {
        resetAdaptive();
        frame = requestAnimationFrame(renderParallax);
        return;
      }

      const rect = slider.getBoundingClientRect();

      visualTarget = Math.max(
        -58,
        Math.min(
          58,
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.115,
        ),
      );

      copyTarget = visualTarget * -0.45;

      visualCurrent += (visualTarget - visualCurrent) * 0.11;
      copyCurrent += (copyTarget - copyCurrent) * 0.1;

      slider.style.setProperty(
        "--process-scroll-y",
        `${visualCurrent.toFixed(2)}px`,
      );

      slider.style.setProperty(
        "--process-copy-scroll-y",
        `${copyCurrent.toFixed(2)}px`,
      );

      const visualTransform =
        `translate3d(0, ${visualCurrent.toFixed(2)}px, 0)`;

      slider
        .querySelectorAll<HTMLElement>(".shrimp-process-visual-layer .process-scroll-parallax__visual")
        .forEach((layer) => {
          const transform = layer.querySelector(".case-video-preview")
            ? "translate3d(0, 0, 0)"
            : visualTransform;

          layer.style.setProperty("transform", transform, "important");
        });

      const copyTransform =
        `translate3d(0, ${copyCurrent.toFixed(2)}px, 0)`;

      slider
        .querySelectorAll<HTMLElement>(".shrimp-process-result .process-scroll-parallax__copy")
        .forEach((layer) => {
          layer.style.setProperty("transform", copyTransform, "important");
        });

      frame = requestAnimationFrame(renderParallax);
    };

    frame = requestAnimationFrame(renderParallax);

    return () => cancelAnimationFrame(frame);
  }, []);


  useEffect(() => {
    if (!window.matchMedia("(max-width: 1200px)").matches) return;

    const tabs = processMobileTabsRef.current;
    if (!tabs) return;

    const frame = requestAnimationFrame(() => {
      const buttons =
        tabs.querySelectorAll<HTMLElement>('button[role="tab"]');

      const activeButton = buttons[activeStage];
      if (!activeButton) return;

      const targetLeft =
        activeButton.offsetLeft -
        (tabs.clientWidth - activeButton.offsetWidth) / 2;

      tabs.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeStage]);

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
    setExpandedImage(null);
    if (index === activeStage) return;
    setActiveStage(index);
  };

  return (
    <div
      className={`shrimp-process-slider reveal${
        mobileCompact ? " has-mobile-compact" : ""
      }`}
      ref={processSliderRef}
      data-cursor=""
      role="region"
      aria-roledescription="карусель"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onPointerDown={(event) => {
        if (!window.matchMedia("(max-width: 1200px)").matches) return;
        if (event.pointerType === "mouse") return;

        if (
          (event.target as HTMLElement).closest(
            "button, a, .case-video-modal",
          )
        ) {
          mobileSwipeStartRef.current = null;
          return;
        }

        mobileSwipeStartRef.current = {
          x: event.clientX,
          y: event.clientY,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (!window.matchMedia("(max-width: 1200px)").matches) return;

        const start = mobileSwipeStartRef.current;
        mobileSwipeStartRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (!start) return;

        const deltaX = event.clientX - start.x;
        const deltaY = event.clientY - start.y;

        if (
          Math.abs(deltaX) >= 40 &&
          Math.abs(deltaX) > Math.abs(deltaY) * 1.15
        ) {
          move(deltaX < 0 ? 1 : -1);
        }
      }}
      onPointerCancel={(event) => {
        mobileSwipeStartRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onClick={(event) => {
        if (window.matchMedia("(max-width: 1200px)").matches) return;
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
        <div className="shrimp-process-visual-stack">
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
                  {item.expandImage ? (
                    <button
                      className="case-process-zoom-trigger"
                      type="button"
                      data-cursor="link"
                      aria-label={item.expandAlt ?? "Посмотреть изображение"}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        setExpandedImage(item.expandImage ?? null);
                      }}
                    >
                      {item.visual}
                    </button>
                  ) : (
                    item.visual
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {!hideStageCopy && (
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
        )}

        <AnimatePresence>
          {expandedImage && (
            <motion.div
              className="case-process-image-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              data-cursor="close"
              role="dialog"
              aria-modal="true"
              aria-label="Увеличенное изображение"
              data-lenis-prevent
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                setExpandedImage(null);
              }}
            >

              <div className="case-process-image-modal__scroll">
              <motion.img
                src={expandedImage}
                alt={stage.expandAlt ?? ""}
                draggable={false}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={(event) => event.stopPropagation()}
              />

              </div>

              <button
                className="case-process-image-modal__close"
                type="button"
                data-cursor="close"
                aria-label="Закрыть изображение"
                onPointerDown={(event) => event.stopPropagation()}
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x =
                    (event.clientX - (rect.left + rect.width / 2)) /
                    rect.width;
                  const y =
                    (event.clientY - (rect.top + rect.height / 2)) /
                    rect.height;

                  event.currentTarget.style.transform =
                    `translate(${x * 8}px, ${y * 8}px)`;
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.transform = "";
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  setExpandedImage(null);
                }}
              >
                <span />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
              onPointerEnter={(event) => {
                if (
                  event.pointerType === "mouse" &&
                  window.matchMedia("(min-width: 1201px)").matches
                ) {
                  selectStage(index);
                }
              }}
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

      {persistentVisual && (
        <div className="shrimp-process-persistent-visual">
          {persistentVisual}
        </div>
      )}

      {mobileCompact && (
        <div
          style={{ position: "relative" }}
          className={`case-process-mobile-compact${
            mobileTagsBelowTitle ? " has-tags-below-title" : ""
          }`}
        >
          <div className="case-process-mobile-compact__visual">
            {stages.map((item, index) => {
              const isActive = index === activeStage;

              return (
                <motion.div
                  className="process-scroll-parallax__visual"
                  key={`mobile-visual-${item.label}-${index}`}
                  aria-hidden={!isActive}
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
                  {item.expandImage ? (
                    <button
                      className="case-process-zoom-trigger"
                      type="button"
                      data-cursor="link"
                      aria-label={item.expandAlt ?? "Посмотреть изображение"}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        setExpandedImage(item.expandImage ?? null);
                      }}
                    >
                      {item.visual}
                    </button>
                  ) : (
                    item.visual
                  )}
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {expandedImage && (
              <motion.div
                className="case-process-image-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                role="dialog"
                aria-modal="true"
                aria-label="Увеличенное изображение"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  setExpandedImage(null);
                }}
              >

                <div className="case-process-image-modal__scroll">
                <motion.img
                  src={expandedImage}
                  alt={stage.expandAlt ?? ""}
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={(event) => event.stopPropagation()}
                />

                </div>

                <button
                  className="case-process-image-modal__close"
                  type="button"
                  data-cursor="close"
                  aria-label="Закрыть изображение"
                  onPointerDown={(event) => event.stopPropagation()}
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x =
                    (event.clientX - (rect.left + rect.width / 2)) /
                    rect.width;
                  const y =
                    (event.clientY - (rect.top + rect.height / 2)) /
                    rect.height;

                  event.currentTarget.style.transform =
                    `translate(${x * 8}px, ${y * 8}px)`;
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.transform = "";
                }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpandedImage(null);
                  }}
                >
                  <span />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            ref={processMobileTabsRef}
            className="case-process-mobile-compact__tabs"
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
                  key={`mobile-${item.label}-${index}`}
                  onClick={() => selectStage(index)}
                  transition={{
                    layout: {
                      duration: 0.48,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  }}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="case-process-mobile-compact__copy">
            <motion.div
              className="process-scroll-parallax__copy"
              key={`mobile-copy-${stage.label}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
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
