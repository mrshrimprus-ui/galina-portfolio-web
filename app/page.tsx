"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    slug: "mrshrimp",
    title: "MrShrimp",
    description:
      "Приложение с короткими разминками: полный цикл от исследования и проектирования до релиза и аналитики.",
    meta: ["2025–2026 · Wellness · HealthTech", "Founder & Product Designer", "iOS · Android · Web · 0→1"],
    hand: "/assets/mrshrimp-hand.png",
    screen: "/assets/mrshrimp-screen.png",
  },
  {
    slug: "punto",
    title: "Punto Pago",
    description:
      "Развитие коммерческого финтех-продукта: кошелёк, маркетплейс, банковские сервисы и web-админка.",
    meta: ["2021–2022 · Team project", "B2C · B2B · FinTech · Marketplace", "iOS · Android · Web-admin"],
    hand: "/assets/punto-hand.png",
    screen: "/assets/punto-screen.png",
  },
  {
    slug: "smarthome",
    title: "Smart Home",
    description:
      "Интеграция нового IoT-устройства в систему умного дома: от документации до реализации.",
    meta: ["2024–2025 · Team project", "B2C · IoT · Smart Home", "iOS · Android"],
    hand: "/assets/smarthome-hand.png",
    screen: "/assets/smarthome-screen.png",
  },
];

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canUseCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !canUseCursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;
    let currentMode = "";

    document.documentElement.classList.add("custom-cursor-enabled");

    const updateMode = () => {
      const target = document
        .elementFromPoint(targetX, targetY)
        ?.closest<HTMLElement>("[data-cursor]");
      const nextMode = target?.dataset.cursor ?? "";

      if (nextMode !== currentMode) {
        currentMode = nextMode;
        cursor.dataset.mode = nextMode;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      updateMode();
    };

    const leave = () => cursor.classList.remove("is-visible");
    const press = () => cursor.classList.add("is-pressed");
    const release = () => cursor.classList.remove("is-pressed");

    const render = () => {
      currentX += (targetX - currentX) * 0.17;
      currentY += (targetY - currentY) * 0.17;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", updateMode, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateMode);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor-label">Подробнее</span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateScrollParallax = () => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = Math.max(-58, Math.min(58, (viewportCenter - cardCenter) * 0.105));
      card.style.setProperty("--scroll-lag", `${offset}px`);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrollParallax);
    };

    updateScrollParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const moveImage = (event: React.PointerEvent<HTMLElement>) => {
    if (
      !cardRef.current ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty("--pointer-x", `${x * 52}px`);
    cardRef.current.style.setProperty("--pointer-y", `${y * 38}px`);
  };

  const resetImage = () => {
    cardRef.current?.style.setProperty("--pointer-x", "0px");
    cardRef.current?.style.setProperty("--pointer-y", "0px");
  };

  return (
    <article
      className={`project-card project-card--${project.slug} reveal`}
      ref={cardRef}
      style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
      onPointerMove={moveImage}
      onPointerLeave={resetImage}
      aria-labelledby={`${project.slug}-title`}
      data-cursor="project"
    >
      {project.slug === "mrshrimp" && (
        <a
          className="project-link"
          href="/projects/mrshrimp"
          aria-label="Открыть кейс MrShrimp"
        />
      )}
      <div className="project-copy">
        <h2 id={`${project.slug}-title`}>{project.title}</h2>
        <p>{project.description}</p>
      </div>

      <div className="project-visual" aria-hidden="true">
        <img className="project-hand" src={project.hand} alt="" />
        <div className="screen-mask">
          <img className="project-screen" src={project.screen} alt="" />
        </div>
      </div>

      <p className="project-meta">
        {project.meta.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </article>
  );
}

export default function Home() {
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
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Galina Chumak — наверх" data-cursor="link">
          Galina Chumak
        </a>
        <nav aria-label="Основная навигация">
          <a href="#projects" data-cursor="link">Проекты</a>
          <a href="#about" data-cursor="link">Обо мне</a>
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

      <section className="hero" id="top">
        <h1 className="reveal reveal-heading" data-cursor="text">
          <span>Senior Product</span>
          <span>Designer</span>
        </h1>
        <p className="hero-description reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
          9+ лет создаю продукты с нуля и развиваю мобильные / веб-сервисы для B2C и B2B.
        </p>
      </section>

      <section className="projects" id="projects" aria-label="Избранные проекты">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      <footer id="about">
        <p>2026</p>
        <a href="mailto:galina-done@yandex.com" data-cursor="link">Связаться ↗</a>
      </footer>
      </main>
    </>
  );
}
