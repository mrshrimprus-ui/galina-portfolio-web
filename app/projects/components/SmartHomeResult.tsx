"use client";

import { useEffect, useRef } from "react";

export default function SmartHomeResult() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;

    if (
      !visual ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const rect = visual.getBoundingClientRect();
      const visualCenter =
        rect.top + rect.height / 2;
      const viewportCenter =
        window.innerHeight / 2;

      const offset = Math.max(
        -46,
        Math.min(
          46,
          (viewportCenter - visualCenter) * 0.09,
        ),
      );

      visual.style.setProperty(
        "--smarthome-result-scroll-y",
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

  return (
    <div className="smarthome-result reveal">
      <div
        ref={visualRef}
        className="smarthome-result__visual"
      >
        <img
          src="/assets/smarthome/result/result.png"
          alt="Термоголовка EKF Smart Home и экран приложения"
        />
      </div>

      <p className="smarthome-result__summary type-text reveal">
        Спроектированные сценарии согласовали с командой и
        реализовали в приложении.
      </p>
    </div>
  );
}
