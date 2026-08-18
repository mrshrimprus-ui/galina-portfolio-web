"use client";

import { useEffect, useRef, useState } from "react";
import { useNavMagnet } from "./hooks/useNavMagnet";
import { usePersistentTheme } from "./hooks/usePersistentTheme";
const projects = [
  {
    slug: "mrshrimp",
    title: "MrShrimp",
    description:
      "Приложение с короткими разминками: полный цикл от исследования и проектирования до релиза и аналитики.",
    meta: ["2025–2026 · Wellness · HealthTech", "Founder & Product Designer", "iOS · Android · 0→1"],
    screen: "/assets/mrshrimp/home/screen.webp",
    mobileScreen: "/assets/mrshrimp/home/screen.webp",
  },
  {
    slug: "punto",
    title: "Punto Pago",
    description:
      "Развитие коммерческого финтех-продукта: кошелёк, маркетплейс, банковские сервисы и web-админка.",
    meta: ["2021–2022 · Team project", "B2C · B2B · FinTech · Marketplace", "iOS · Android · Web-admin"],
    screen: "/assets/punto/home/screen.webp",
    mobileScreen: "/assets/punto/home/screen.webp",
  },
  {
    slug: "smarthome",
    title: "Smart Home",
    description:
      "Интеграция нового IoT-устройства в систему умного дома: от документации до реализации.",
    meta: ["2024–2025 · Team project", "B2C · IoT · Smart Home", "iOS · Android"],
    screen: "/assets/smarthome/home/screen.webp",
    mobileScreen: "/assets/smarthome/home/screen.webp",
  },
];

const heroTitleLines = ["Senior Product", "Designer"];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const magnetFrameRef = useRef(0);
  const magnetCurrentRef = useRef({ x: 0, y: 0 });
  const magnetTargetRef = useRef({ x: 0, y: 0 });
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;

    let cancelled = false;
    const showImage = () => {
      if (!cancelled) setImageReady(true);
    };

    image.decode().then(showImage).catch(showImage);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(magnetFrameRef.current);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (
      !card ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 560px)").matches
    ) return;

    let frame = 0;
    const updateParallax = () => {
      const rect = card.getBoundingClientRect();
      const offset = Math.max(
        -10,
        Math.min(22, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.08),
      );
      card.style.setProperty("--project-art-scroll-y", `${offset.toFixed(2)}px`);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const animateMagnet = () => {
    const card = cardRef.current;
    if (!card) return;

    const current = magnetCurrentRef.current;
    const target = magnetTargetRef.current;
    current.x += (target.x - current.x) * 0.1;
    current.y += (target.y - current.y) * 0.1;

    card.style.setProperty("--pointer-x", `${current.x.toFixed(2)}px`);
    card.style.setProperty("--pointer-y", `${current.y.toFixed(2)}px`);

    if (
      Math.abs(target.x - current.x) > 0.05 ||
      Math.abs(target.y - current.y) > 0.05
    ) {
      magnetFrameRef.current = requestAnimationFrame(animateMagnet);
    } else {
      current.x = target.x;
      current.y = target.y;
      card.style.setProperty("--pointer-x", `${target.x}px`);
      card.style.setProperty("--pointer-y", `${target.y}px`);
      magnetFrameRef.current = 0;
    }
  };

  const scheduleMagnet = () => {
    if (magnetFrameRef.current) return;
    magnetFrameRef.current = requestAnimationFrame(animateMagnet);
  };

  const moveImage = (event: React.PointerEvent<HTMLElement>) => {
    if (
      !cardRef.current ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    magnetTargetRef.current.x = x * 56;
    magnetTargetRef.current.y = y * 36;
    scheduleMagnet();
  };

  const resetImage = () => {
    magnetTargetRef.current.x = 0;
    magnetTargetRef.current.y = 0;
    scheduleMagnet();
  };

  return (
    <article
      className={`project-card project-card--${project.slug} ${
        index === 0 ? "is-visible" : "reveal"
      }`}
      ref={cardRef}
      style={{ "--delay": `${index * 35}ms` } as React.CSSProperties}
      aria-labelledby={`${project.slug}-title`}
      data-cursor="project"
      onPointerMove={moveImage}
      onPointerLeave={resetImage}
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
        <picture className="project-picture">
          <source
            media="(max-width: 560px)"
            srcSet={project.mobileScreen}
          />
          <img
            ref={imageRef}
            className="project-art"
            src={project.screen}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            onLoad={(event) => {
              const image = event.currentTarget;
              image
                .decode()
                .catch(() => undefined)
                .finally(() => setImageReady(true));
            }}
            style={{
              opacity: imageReady ? 1 : 0,
              transition: "opacity 180ms ease",
            }}
          />
        </picture>
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
  const { theme, setTheme } = usePersistentTheme();
  const heroGlyphsRef = useRef<
    Array<{ element: HTMLElement; x: number; y: number }>
  >([]);

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }),
      {
        threshold: 0.01,
        rootMargin: "0px 0px 35% 0px",
      },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const measureHeroTitle = (title: HTMLHeadingElement) => {
    const titleRect = title.getBoundingClientRect();

    heroGlyphsRef.current = Array.from(
      title.querySelectorAll<HTMLElement>(".hero-title-glyph"),
    ).map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        x: rect.left + rect.width / 2 - titleRect.left,
        y: rect.top + rect.height / 2 - titleRect.top,
      };
    });
  };

  const distortHeroTitle = (event: React.PointerEvent<HTMLHeadingElement>) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const title = event.currentTarget;
    if (heroGlyphsRef.current.length === 0) measureHeroTitle(title);

    const titleRect = title.getBoundingClientRect();
    const pointerX = event.clientX - titleRect.left;
    const pointerY = event.clientY - titleRect.top;
    const radius = 150;

    title.classList.add("is-distorting");

    heroGlyphsRef.current.forEach(({ element: glyph, x, y }) => {
      const dx = x - pointerX;
      const dy = y - pointerY;
      const distance = Math.hypot(dx, dy);
      const linearInfluence = Math.max(0, 1 - distance / radius);
      const influence =
        linearInfluence * linearInfluence * (3 - 2 * linearInfluence);

      if (influence === 0) {
        glyph.style.transform = "";
        return;
      }

      const directionX = dx / Math.max(distance, 1);
      const directionY = dy / Math.max(distance, 1);
      const translateX = directionX * 7 * influence;
      const translateY = directionY * 5 * influence;
      const scaleX = 1 + 0.12 * influence;
      const scaleY = 1 - 0.045 * influence;
      const skew = -directionY * 5 * influence;
      const rotate = directionX * directionY * 2.4 * influence;

      glyph.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY}) skewX(${skew}deg) rotate(${rotate}deg)`;
    });
  };

  const resetHeroTitle = (event: React.PointerEvent<HTMLHeadingElement>) => {
    event.currentTarget.classList.remove("is-distorting");
    event.currentTarget
      .querySelectorAll<HTMLElement>(".hero-title-glyph")
      .forEach((glyph) => {
        glyph.style.transform = "";
      });
  };

  return (
    <>
      <main>
      <header className="site-header text-normal">
        <a className="brand text-logo" href="#top" aria-label="Galina Chumak — наверх" data-cursor="link">
          Galina Chumak
        </a>
        <nav aria-label="Основная навигация">
          <a href="#projects" aria-current="page" data-cursor="nav">Проекты</a>
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
        <h1
          className="type-title reveal reveal-heading hero-title-glass"
          aria-label="Senior Product Designer"
          onPointerEnter={(event) => measureHeroTitle(event.currentTarget)}
          onPointerMove={distortHeroTitle}
          onPointerLeave={resetHeroTitle}
        >
          {heroTitleLines.map((line) => (
            <span key={line} aria-hidden="true">
              {Array.from(line).map((character, index) => (
                <span className="hero-title-glyph" key={`${character}-${index}`}>
                  {character === " " ? "\u00A0" : character}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="hero-description text-secondary reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
          <p>9+ лет · Mobile / Web · B2C / B2B</p>
          <p>
            Запускаю продукты с нуля и новые направления внутри систем — от своего приложения до fintech- и B2B-платформ с ролями и правами доступа.
          </p>
        </div>
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
