"use client";

import { useEffect, useRef } from "react";

export default function PuntoResult() {
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
        "--punto-result-scroll-y",
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
    <div className="punto-result reveal">
      <div
        ref={visualRef}
        className="punto-result__visual"
      >
        <img
          src="/assets/punto/result/result.png"
          alt="Punto Pago в 2022 и 2026 году"
        />

        <span className="punto-result__years">
          2022 · 2026
        </span>
      </div>

      <div className="punto-result__metrics">
        <div className="punto-result__metric">
          <strong>4,7</strong>
          <span>12,3 тыс. отзывов</span>
        </div>

        <div className="punto-result__metric">
          <strong>1M+</strong>
          <span>более 1 млн загрузок</span>
        </div>
      </div>

      <p className="punto-result__summary type-text">
        Все ключевые направления были реализованы:
        маркетплейс, административная система и банковские
        функции. Спустя 4 года основная логика сценариев
        сохранилась, а продукт продолжил развиваться на её
        основе.
      </p>
    </div>
  );
}
