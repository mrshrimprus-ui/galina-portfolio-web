"use client";

import { useEffect, useRef } from "react";

function CursorArrow({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <span
      className={`global-cursor-arrow global-cursor-arrow--${direction}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d={
            direction === "left"
              ? "M15 5l-7 7 7 7"
              : "M9 5l7 7-7 7"
          }
        />
      </svg>
    </span>
  );
}

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const enabled =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (!cursor || !enabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;
    let currentMode = "";
    let resetTimer = 0;

    document.documentElement.classList.add(
      "custom-cursor-enabled",
    );

    const setMode = (mode: string) => {
      if (mode === currentMode) return;

      currentMode = mode;
      cursor.dataset.mode = mode;

      if (labelRef.current) {
        labelRef.current.textContent =
          mode === "video"
            ? "Посмотреть"
            : "Подробнее";
      }
    };

    const updatePreview = (target: HTMLElement) => {
      const anchor =
        target.closest<HTMLAnchorElement>("a[href]") ??
        target.querySelector<HTMLAnchorElement>("a[href]");

      const href = anchor?.getAttribute("href") ?? "";
      const match = href.match(
        /\/projects\/([^/?#]+)/,
      );

      if (!match || !previewRef.current) return;

      previewRef.current.src =
        `/assets/${match[1]}/home/screen.webp`;
    };

    const resolveMode = () => {
      const target = document
        .elementFromPoint(targetX, targetY)
        ?.closest<HTMLElement>("[data-cursor]");

      let mode = target?.dataset.cursor ?? "";

      if (target && mode.startsWith("carousel")) {
        const rect = target.getBoundingClientRect();

        if (
          target.classList.contains(
            "shrimp-solution-viewport",
          )
        ) {
          const slides = Array.from(
            target.querySelectorAll<HTMLElement>(
              ".solution-slide",
            ),
          );

          const activeIndex = slides.findIndex(
            (slide) =>
              slide.classList.contains("is-active"),
          );

          if (activeIndex <= 0) {
            mode = "carousel-right";
          } else if (
            activeIndex === slides.length - 1
          ) {
            mode = "carousel-left";
          } else {
            mode =
              targetX < rect.left + rect.width / 2
                ? "carousel-left"
                : "carousel-right";
          }
        } else {
          mode =
            targetX < rect.left + rect.width / 2
              ? "carousel-left"
              : "carousel-right";
        }
      }

      if (
        target &&
        (
          mode.includes("next") ||
          target.className.includes("next-project")
        )
      ) {
        updatePreview(target);
        mode = "case-next";
      }

      window.clearTimeout(resetTimer);

      if (
        currentMode === "project" &&
        mode === ""
      ) {
        resetTimer = window.setTimeout(() => {
          setMode(mode);
        }, 90);

        return;
      }

      setMode(mode);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      cursor.classList.add("is-visible");
      resolveMode();
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.17;
      currentY += (targetY - currentY) * 0.17;

      cursor.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;

      frame = requestAnimationFrame(render);
    };

    const leave = () => {
      cursor.classList.remove("is-visible");
    };

    const press = () => {
      cursor.classList.add("is-pressed");
    };

    const release = () => {
      cursor.classList.remove("is-pressed");
    };

    window.addEventListener(
      "pointermove",
      move,
      { passive: true },
    );

    window.addEventListener(
      "scroll",
      resolveMode,
      { passive: true },
    );

    window.addEventListener(
      "pointerdown",
      press,
      { passive: true },
    );

    window.addEventListener(
      "pointerup",
      release,
      { passive: true },
    );

    document.documentElement.addEventListener(
      "mouseleave",
      leave,
    );

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resetTimer);

      window.removeEventListener(
        "pointermove",
        move,
      );

      window.removeEventListener(
        "scroll",
        resolveMode,
      );

      window.removeEventListener(
        "pointerdown",
        press,
      );

      window.removeEventListener(
        "pointerup",
        release,
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        leave,
      );

      document.documentElement.classList.remove(
        "custom-cursor-enabled",
      );
    };
  }, []);

  return (
    <div
      className="custom-cursor global-cursor"
      ref={cursorRef}
      aria-hidden="true"
    >
      <span
        ref={labelRef}
        className="custom-cursor-label"
        aria-hidden="true"
      >
        Подробнее
      </span>

      <CursorArrow direction="left" />
      <CursorArrow direction="right" />

      <span className="case-next-cursor">
        <img
          ref={previewRef}
          src="/assets/punto/home/screen.webp"
          alt=""
        />
      </span>
    </div>
  );
}
