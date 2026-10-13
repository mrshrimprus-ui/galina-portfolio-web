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
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d={
            direction === "left"
              ? "M20 12H5M11 6l-6 6 6 6"
              : "M4 12h15M13 6l6 6-6 6"
          }
        />
      </svg>
    </span>
  );
}

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const nextPreviewRef = useRef<HTMLSpanElement>(null);
  const nextPreviewImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const enabled =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (!cursor || !enabled) return;

    let pointerX = -100;
    let pointerY = -100;
    let currentMode = "__initial__";
    let resetTimer: number | undefined;

    document.documentElement.classList.add(
      "custom-cursor-enabled",
    );

    const setMode = (mode: string) => {
      if (mode === currentMode) return;

      const label = labelRef.current;
      const showLabel = false;

      if (label && !showLabel) {
        label.style.display = "none";
      }

      currentMode = mode;
      cursor.dataset.mode = mode;

      if (label && showLabel) {
        label.textContent =
          mode === "video"
            ? "Посмотреть"
            : "Подробнее";

        label.style.display = "";
      }
    };

    const updateNextPreview = (target: HTMLElement) => {
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      const project = anchor?.getAttribute("href")?.match(
        /\/projects\/([^/?#]+)/,
      )?.[1];

      if (!project || !nextPreviewImageRef.current) return;

      const accents: Record<string, string> = {
        mrshrimp: "#ff8d28",
        punto: "#2e2da6",
        smarthome: "#da2025",
      };

      nextPreviewImageRef.current.src =
        `/assets/${project}/home/screen.webp`;
      nextPreviewRef.current?.style.setProperty(
        "--next-preview-color",
        accents[project] ?? "#2e2da6",
      );
    };

    const resolveMode = (
      target: HTMLElement | null,
    ) => {
      let mode = target?.dataset.cursor ?? "";

      if (target && mode.startsWith("carousel")) {
        const rect = target.getBoundingClientRect();
        const hoveredElement = document.elementFromPoint(
          pointerX,
          pointerY,
        ) as HTMLElement | null;
        const isProcessNavigation = Boolean(
          hoveredElement?.closest(".shrimp-process-tabs"),
        );
        const processResult = target.querySelector<HTMLElement>(
          ".shrimp-process-result",
        );
        const processResultRect =
          processResult?.getBoundingClientRect();
        const isProcessTextColumn = Boolean(
          processResultRect &&
            pointerX >= processResultRect.left - 24 &&
            pointerX <= processResultRect.right + 24 &&
            pointerY >= processResultRect.top - 24 &&
            pointerY <= processResultRect.bottom + 24,
        );

        if (isProcessNavigation || isProcessTextColumn) {
          mode = "";
        } else if (
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
              pointerX < rect.left + rect.width / 2
                ? "carousel-left"
                : "carousel-right";
          }
        } else {
          mode =
            pointerX < rect.left + rect.width / 2
              ? "carousel-left"
              : "carousel-right";
        }
      }

      if (target && mode.includes("next")) {
        updateNextPreview(target);
        mode = "next-preview";
      }

      if (resetTimer !== undefined) {
        window.clearTimeout(resetTimer);
        resetTimer = undefined;
      }

      setMode(mode);
    };

    const updateCursorTarget = () => {
      if (document.querySelector(".process-hypotheses-modal")) {
        const closeTarget = document
          .elementsFromPoint(pointerX, pointerY)
          .find((element) => element.closest("[data-cursor='close']"));
        setMode(closeTarget ? "close" : "");
        return;
      }

      const directTarget =
        document
          .elementsFromPoint(pointerX, pointerY)
          .map((element) =>
            element.closest<HTMLElement>("[data-cursor]"),
          )
          .find(
            (element) =>
              element !== null &&
              element !== cursor &&
              !cursor.contains(element),
          ) ?? null;

      resolveMode(directTarget);
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      cursor.classList.add("is-visible");
      cursor.style.transform =
        `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      updateCursorTarget();
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
      updateCursorTarget,
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


    return () => {
      if (resetTimer !== undefined) {
        window.clearTimeout(resetTimer);
      }

      window.removeEventListener(
        "pointermove",
        move,
      );

      window.removeEventListener(
        "scroll",
        updateCursorTarget,
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
      style={{ pointerEvents: "none" }}
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

      <span
        className="global-cursor-arrow global-cursor-arrow--project"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24">
          <path d="M7.5 16.5 16.5 7.5M10 7.5h6.5V14" />
        </svg>
      </span>

      <span className="global-cursor-play" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M10 6.7C9.2 6.2 8.2 6.8 8.2 7.8V16.2C8.2 17.2 9.2 17.8 10 17.3L17 13.1C17.8 12.6 17.8 11.4 17 10.9L10 6.7Z" />
        </svg>
      </span>

      <span
        className="next-project-pointer"
        ref={nextPreviewRef}
      >
        <img
          ref={nextPreviewImageRef}
          src="/assets/punto/home/screen.webp"
          alt=""
        />
      </span>
    </div>
  );
}
