"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { useNavMagnet } from "./hooks/useNavMagnet";
const projects = [
  {
    slug: "mrshrimp",
    title: "MrShrimp",
    description:
      "Приложение с короткими разминками: полный цикл от исследования и проектирования до релиза и аналитики.",
    meta: ["2025–2026 · Wellness · HealthTech", "Founder & Product Designer", "iOS · Android · 0→1"],
    screen: "/assets/mrshrimp/home/screen.webp",
  },
  {
    slug: "punto",
    title: "Punto Pago",
    description:
      "Развитие коммерческого финтех-продукта: кошелёк, маркетплейс, банковские сервисы и web-админка.",
    meta: ["2021–2022 · Team project", "B2C · B2B · FinTech · Marketplace", "iOS · Android · Web-admin"],
    screen: "/assets/punto/home/screen.webp",
  },
  {
    slug: "smarthome",
    title: "Smart Home",
    description:
      "Интеграция нового IoT-устройства в систему умного дома: от документации до реализации.",
    meta: ["2024–2025 · Team project", "B2C · IoT · Smart Home", "iOS · Android"],
    screen: "/assets/smarthome/home/screen.webp",
  },
];

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
    cardRef.current.style.setProperty("--pointer-x", `${x * 36}px`);
    cardRef.current.style.setProperty("--pointer-y", `${y * 26}px`);
  };

  const resetImage = () => {
    cardRef.current?.style.setProperty("--pointer-x", "0px");
    cardRef.current?.style.setProperty("--pointer-y", "0px");
  };

  return (
    <article
      className={`project-card project-card--${project.slug} ${
        index === 0 ? "is-visible" : "reveal"
      }`}
      ref={cardRef}
      style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
      onPointerMove={moveImage}
      onPointerLeave={resetImage}
      aria-labelledby={`${project.slug}-title`}
      data-cursor="project"
    >
      <a
        className="project-link"
        href={`/projects/${project.slug}`}
        aria-label={`Открыть кейс ${project.title}`}
      />
      <div className="project-copy">
        <h2 className="type-h2" id={`${project.slug}-title`}>{project.title}</h2>
        <p className="project-description type-caption">{project.description}</p>
      </div>

      <div className="project-visual" aria-hidden="true">
        <img
          className="project-art"
          src={project.screen}
          alt=""
        />
      </div>

      <p className="project-meta type-caption-regular">
        {project.meta.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </article>
  );
}

export default function Home() {
  useNavMagnet();
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

  // HOME SCROLL DEPTH START
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = document.querySelector<HTMLElement>(".hero h1");
    const description =
      document.querySelector<HTMLElement>(".hero-description");

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".project-card"),
    );

    let frame = 0;

    const clamp = (
      value: number,
      minimum: number,
      maximum: number,
    ) => Math.max(minimum, Math.min(maximum, value));

    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;

      if (title) {
        const rect = title.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        title.style.setProperty(
          "--hero-title-scroll-y",
          `${clamp((viewportCenter - center) * 0.055, -26, 26)}px`,
        );
      }

      if (description) {
        const rect = description.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        description.style.setProperty(
          "--hero-description-scroll-y",
          `${clamp((viewportCenter - center) * 0.035, -16, 16)}px`,
        );
      }

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        const cardOffset = clamp(
          (viewportCenter - center) * 0.018,
          -10,
          10,
        );

        const copyOffset = clamp(
          (viewportCenter - center) * 0.04,
          -20,
          20,
        );

        const metaOffset = clamp(
          (viewportCenter - center) * 0.026,
          -14,
          14,
        );

        card.style.setProperty(
          "--project-card-scroll-y",
          `${cardOffset}px`,
        );

        card.querySelector<HTMLElement>(".project-copy")
          ?.style.setProperty(
            "--project-copy-scroll-y",
            `${copyOffset}px`,
          );

        card.querySelector<HTMLElement>(".project-meta")
          ?.style.setProperty(
            "--project-meta-scroll-y",
            `${metaOffset}px`,
          );
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);
  // HOME SCROLL DEPTH END

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.05 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main>
      <header className="site-header text-normal shared-container">
        <a className="brand text-logo" href="#top" aria-label="Galina Chumak — наверх" data-cursor="link">
          Galina Chumak
        </a>
        <nav aria-label="Основная навигация">
          <a href="#projects" data-cursor="nav">Проекты</a>
          <a href="/about" data-cursor="nav">Обо мне</a>
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
        <h1 className="type-title reveal reveal-heading">
          <span>Senior Product</span>
          <span>Designer</span>
        </h1>
        <p className="hero-description type-caption text-secondary reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
          9+ лет создаю продукты с нуля и развиваю мобильные и веб-сервисы для B2C и B2B.
        </p>
      </section>

      <section className="projects" id="projects" aria-label="Избранные проекты">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>
      </main>
    </>
  );
}
