"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type HighlightSlide = {
  label: string;
  image: string;
  alt: string;
  description: string;
  scrollX?: boolean;
  visualClassName?: string;
};

type CaseHighlightsSliderProps = {
  slides: readonly HighlightSlide[];
  ariaLabel: string;
};

export default function CaseHighlightsSlider({
  slides,
  ariaLabel,
}: CaseHighlightsSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  const tabsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    scroller: HTMLElement;
  } | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const tabs = tabsRef.current;
    const activeTab = tabs?.children[
      activeSlide
    ] as HTMLElement | undefined;

    if (!tabs || !activeTab) return;

    const safeEdge = 16;
    const tabLeft = activeTab.offsetLeft;
    const tabRight = tabLeft + activeTab.offsetWidth;
    const visibleLeft = tabs.scrollLeft + safeEdge;
    const visibleRight =
      tabs.scrollLeft + tabs.clientWidth - safeEdge;

    if (tabLeft < visibleLeft) {
      tabs.scrollTo({
        left: Math.max(0, tabLeft - safeEdge),
        behavior: "smooth",
      });
    } else if (tabRight > visibleRight) {
      tabs.scrollTo({
        left: tabRight - tabs.clientWidth + safeEdge,
        behavior: "smooth",
      });
    }
  }, [activeSlide]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const visual = visualRef.current;

      visual?.scrollTo({ left: 0, behavior: "auto" });
      visual
        ?.querySelector<HTMLElement>(".case-highlights-pan--manual")
        ?.scrollTo({ left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeSlide]);

  const swipeStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const move = (direction: number) => {
    setActiveSlide(
      (current) =>
        (current + direction + slides.length) %
        slides.length,
    );
  };

  return (
    <div
      className="case-highlights-slider"
      role="region"
      aria-roledescription="карусель"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <div className="case-highlights-tabs" ref={tabsRef}>
        {slides.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={index === activeSlide ? "is-active" : ""}
            data-cursor="link"
            onPointerEnter={() => setActiveSlide(index)}
            onFocus={() => setActiveSlide(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        ref={visualRef}
        className={`case-highlights-visual${
          slide.scrollX
            ? " case-highlights-visual--scroll-x"
            : ""
        }${
          slide.visualClassName
            ? ` ${slide.visualClassName}`
            : ""
        }`}
        data-cursor={slide.scrollX ? undefined : "carousel-right"}
        onPointerDown={(event) => {
          if (
            !slide.scrollX ||
            event.pointerType === "touch" ||
            event.button !== 0
          )
            return;

          const scroller = event.currentTarget.querySelector<HTMLElement>(
            ".case-highlights-pan--manual",
          );

          if (!scroller) return;

          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: scroller.scrollLeft,
            scroller,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add("is-dragging");
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;

          if (slide.scrollX && drag?.pointerId === event.pointerId) {
            drag.scroller.scrollLeft =
              drag.startScrollLeft - (event.clientX - drag.startX);
            event.preventDefault();
            return;
          }

          if (
            slide.scrollX ||
            window.matchMedia("(max-width: 900px)")
              .matches
          )
            return;

          const rect =
            event.currentTarget.getBoundingClientRect();

          event.currentTarget.dataset.cursor =
            event.clientX <
            rect.left + rect.width / 2
              ? "carousel-left"
              : "carousel-right";
        }}
        onPointerUp={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) return;

          dragRef.current = null;
          event.currentTarget.classList.remove("is-dragging");

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) return;

          dragRef.current = null;
          event.currentTarget.classList.remove("is-dragging");
        }}
        onClick={(event) => {
          if (
            slide.scrollX ||
            window.matchMedia("(max-width: 900px)")
              .matches
          )
            return;

          const rect =
            event.currentTarget.getBoundingClientRect();

          move(
            event.clientX <
              rect.left + rect.width / 2
              ? -1
              : 1,
          );
        }}
        onTouchStart={(event) => {
          const touch = event.touches[0];

          swipeStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
          };
        }}
        onTouchEnd={(event) => {
          if (
            slide.scrollX ||
            event.currentTarget.scrollWidth >
              event.currentTarget.clientWidth + 1
          ) {
            swipeStartRef.current = null;
            return;
          }

          const start = swipeStartRef.current;
          swipeStartRef.current = null;

          if (!start) return;

          const touch = event.changedTouches[0];
          const deltaX =
            touch.clientX - start.x;
          const deltaY =
            touch.clientY - start.y;

          if (
            Math.abs(deltaX) >
              Math.abs(deltaY) * 1.2 &&
            Math.abs(deltaX) >= 48
          ) {
            move(deltaX < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => {
          swipeStartRef.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {slide.scrollX ? (
            <motion.div
              key={slide.image}
              className="case-highlights-pan case-highlights-pan--manual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                draggable={false}
              />
            </motion.div>
          ) : (
            <motion.img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              draggable={false}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="case-highlights-description">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={slide.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {slide.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
