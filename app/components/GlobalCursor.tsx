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
  const previewShellRef = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

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
      const showLabel =
        mode === "project" || mode === "video";

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

    const updatePreview = (target: HTMLElement) => {
      const anchor =
        target.closest<HTMLAnchorElement>("a[href]") ??
        target.querySelector<HTMLAnchorElement>("a[href]");

      const href = anchor?.getAttribute("href") ?? "";
      const match = href.match(
        /\/projects\/([^/?#]+)/,
      );

      if (!match || !previewRef.current) return;

      const project = match[1];

      const accentByProject: Record<string, string> = {
        mrshrimp: "#ff8d28",
        punto: "#2e2da6",
        smarthome: "#da2025",
      };

      previewRef.current.src =
        `/assets/${project}/home/screen.webp`;

      previewShellRef.current?.style.setProperty(
        "--case-next-accent",
        accentByProject[project] ?? "#2e2da6",
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

      if (resetTimer !== undefined) {
        window.clearTimeout(resetTimer);
        resetTimer = undefined;
      }

      if (!mode && currentMode === "project") {
        resetTimer = window.setTimeout(() => {
          resetTimer = undefined;
          setMode("");
        }, 140);
        return;
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
        className="case-next-cursor"
        ref={previewShellRef}
      >
        <img
          ref={previewRef}
          src="/assets/punto/home/screen.webp"
          alt=""
        />
      </span>
    </div>
  );
}
