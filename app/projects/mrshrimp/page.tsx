"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

function CaseCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const enabled =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !enabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;
    let mode = "";

    document.documentElement.classList.add("custom-cursor-enabled");

    const updateMode = () => {
      const nextMode =
        document
          .elementFromPoint(targetX, targetY)
          ?.closest<HTMLElement>("[data-cursor]")
          ?.dataset.cursor ?? "";

      if (nextMode !== mode) {
        mode = nextMode;
        cursor.dataset.mode = nextMode;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      updateMode();
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.17;
      currentY += (targetY - currentY) * 0.17;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const leave = () => cursor.classList.remove("is-visible");
    const press = () => cursor.classList.add("is-pressed");
    const release = () => cursor.classList.remove("is-pressed");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", updateMode, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateMode);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}

function CaseExperience() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".shrimp-case .reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CaseCursor />
      <header className="shrimp-header">
        <a className="shrimp-brand" href="/" data-cursor="link">
          Galina Chumak
        </a>
        <nav aria-label="Навигация по портфолио">
          <a href="/#projects" data-cursor="link">
            Проекты
          </a>
          <a href="/#about" data-cursor="link">
            Обо мне
          </a>
        </nav>
        <button
          className="theme-switch"
          type="button"
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          data-cursor="link"
        >
          <span className={`theme-option ${theme === "light" ? "active" : ""}`}>
            <span className="theme-icon theme-icon--sun" aria-hidden="true" />
          </span>
          <span className={`theme-option ${theme === "dark" ? "active" : ""}`}>
            <span className="theme-icon theme-icon--moon" aria-hidden="true" />
          </span>
        </button>
      </header>
    </>
  );
}

export default function MrShrimpCase() {
  return (
    <main className="shrimp-case">
      <CaseExperience />

      <section className="shrimp-cover">
        <div className="shrimp-cover-copy">
          <h1 className="reveal reveal-heading" data-cursor="text">
            <span>MrShrimp</span>
          </h1>
          <p className="shrimp-summary reveal">
            Приложение с короткими разминками для людей, которые много работают за
            компьютером. Полный цикл создания продукта: от исследования до релиза и
            аналитики.
          </p>
        </div>

        <div className="shrimp-cover-visual reveal" aria-hidden="true">
          <img src="/assets/mrshrimp-screen.png" alt="" />
        </div>

        <p className="shrimp-meta reveal">
          <span>2025–2026 · Wellness · HealthTech</span>
          <span>Founder &amp; Product Designer</span>
          <span>iOS · Android · Web · 0→1</span>
        </p>
      </section>

      <section className="shrimp-story-section shrimp-context">
        <div className="shrimp-section-title reveal">
          <p>Контекст</p>
          <h2 data-cursor="text">
            Самостоятельно создала продукт
            <br />
            от гипотезы до релиза
          </h2>
        </div>
        <figure className="shrimp-media reveal">
          <img
            src="/assets/mrshrimp-context-grid.png"
            alt="Экраны приложения MrShrimp, интеграция с iPhone и персонаж разминки"
          />
        </figure>
      </section>

      <section className="shrimp-story-section shrimp-task">
        <div className="shrimp-section-title reveal">
          <p>Задача</p>
          <h2 data-cursor="text">
            Запустить MVP и проверить, впишутся
            <br />
            ли короткие разминки в рабочий день
          </h2>
        </div>
        <figure className="shrimp-media reveal">
          <img
            src="/assets/mrshrimp-mvp-collage.png"
            alt="Ключевые экраны MVP приложения MrShrimp"
          />
        </figure>
      </section>

      <footer className="shrimp-footer">
        <p>2026</p>
        <a href="/#projects" data-cursor="link">
          Все проекты ↗
        </a>
      </footer>
    </main>
  );
}
