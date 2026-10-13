"use client";

import MagneticTags from "./components/MagneticTags";
import { useEffect, useRef, useState } from "react";
import { useNavMagnet } from "./hooks/useNavMagnet";
import { usePersistentTheme } from "./hooks/usePersistentTheme";
import {
  PROJECT_TRANSITIONS,
  requestProjectPageTransition,
} from "./components/ProjectPageTransition";
const projects = [
  {
    slug: "industry",
    name: "EKF Connect Industry — промышленность",
    title: "Развивала IIoT-платформу",
    description:
      "Проектировала интерфейсы для технически сложных процессов, мониторинга и анализа данных.",
    meta: ["B2B", "Industrial IoT", "Web Platform"],
    screen: "/assets/industry/hero/industryhome.png",
    mobileScreen: "/assets/industry/hero/industryhome.png",
    imageWidth: 1968,
    imageHeight: 1292,
  },
  {
    slug: "punto",
    name: "Punto Pago — суперапп",
    title: "Спроектировала админ-панель маркетплейса",
    description:
      "С нуля разработала структуру панели и пользовательские сценарии для управления каталогом товаров, магазинами и заказами.",
    meta: ["B2B", "Marketplace", "Admin Panel"],
    screen: "/assets/punto/home/main_punto.png",
    mobileScreen: "/assets/punto/home/main_punto.png",
    imageWidth: 3244,
    imageHeight: 2055,
  },
  {
    slug: "mrshrimp",
    name: "MrShrimp — приложение с разминками",
    title: "Самостоятельно запустила MVP",
    description:
      "Сама прошла весь путь: исследование, дизайн, разработка с AI, релиз и аналитика",
    meta: ["B2C", "0→1", "Wellness", "Mobile App"],
    screen: "/assets/mrshrimp/home/main_shrimp.png",
    mobileScreen: "/assets/mrshrimp/home/main_shrimp.png",
    imageWidth: 2126,
    imageHeight: 1346,
  },
];

const otherProjects = [
  {
    domain: "Security · B2B",
    name: "SecurOS",
    description: "Диспетчерская платформа для управления инцидентами и координации ГБР.",
  },
  {
    domain: "Healthcare · B2B / B2C",
    name: "EngagedMD",
    description: "Платформа для fertility-клиник: обучение пациентов и рабочий интерфейс персонала.",
  },
  {
    domain: "Wine Marketplace · B2C / B2B",
    name: "Qvino",
    description: "Винный маркетплейс с мобильным приложением и ролевой админкой.",
  },
  {
    domain: "Real Estate · B2B / B2C",
    name: "Propy",
    description: "Платформа для сделок с недвижимостью: листинги, офферы и транзакции.",
  },
  {
    domain: "Travel · B2C / B2B",
    name: "Virgl",
    description: "Travel-платформа для путешественников, гидов и туристических агентств.",
  },
  {
    domain: "Social · B2C",
    name: "PollPapa",
    description: "Социальная платформа с опросами: mobile app, web и admin.",
  },
  {
    domain: "Social · B2C",
    name: "Weera",
    description: "Семейная платформа: mobile app, web и admin для общения и истории семьи.",
  },
  {
    domain: "Fitness · B2C",
    name: "Voum",
    description: "Социальное фитнес-приложение для тренировок, прогресса и челленджей.",
  },
] as const;

const heroTitleLines = [
  "Проектирую сложные",
  "цифровые продукты",
];


const heroTags = [
  "Senior Product Designer",
  "9+ лет",
  "Remote",
];

function HeroPills() {
  return (
    <MagneticTags
      items={heroTags}
      separator="·"
      className="hero-interactive-tags"
    />
  );
}


const heroInteractiveTags = [
  "Senior Product Designer",
  "9+ лет",
  "Remote",
];

function HeroInteractiveTags() {
  return (
    <MagneticTags
      items={heroInteractiveTags}
      separator="·"
      className="hero-interactive-tags reveal"
    />
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
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
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let frame = 0;
    const updateParallax = () => {
      const rect = card.getBoundingClientRect();
      const isMobile = window.matchMedia("(max-width: 560px)").matches;

      const offset = Math.max(
        isMobile ? -8 : -10,
        Math.min(
          isMobile ? 12 : 22,
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) *
            (isMobile ? 0.04 : 0.08),
        ),
      );
      const devicePixelRatio = window.devicePixelRatio || 1;
      const crispOffset =
        Math.round(offset * devicePixelRatio) / devicePixelRatio;
      card.style.setProperty("--scroll-lag", `${crispOffset}px`);
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
    if (window.matchMedia("(min-width: 1201px)").matches) {
      card.style.setProperty("--copy-layer-x", "0px");
      card.style.setProperty("--copy-layer-y", "0px");
      card.style.setProperty("--meta-layer-x", "0px");
      card.style.setProperty("--meta-layer-y", "0px");
    }

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

    magnetTargetRef.current.x = x * 45;
    magnetTargetRef.current.y = y * 30;
    scheduleMagnet();
  };

  const resetImage = () => {
    magnetTargetRef.current.x = 0;
    magnetTargetRef.current.y = 0;
    scheduleMagnet();
  };

  const handleProjectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    event.preventDefault();
    requestProjectPageTransition(
      PROJECT_TRANSITIONS[`/projects/${project.slug}`],
    );
  };

  return (
    <div
      className={`project-card-motion project-card-motion--${project.slug}`}
      ref={motionRef}
    >
      <article
      className={`project-card project-card--${project.slug} is-visible`}
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
        onClick={handleProjectClick}
      />
      <div className="project-copy-group">
        <div className="project-copy">
          <p className="project-name">{project.name}</p>
          <h2 className="type-h2" id={`${project.slug}-title`}>
            {project.slug === "industry" ? (
              <>
                Развивала<br />
                IIoT-платформу
              </>
            ) : project.slug === "punto" ? (
              <>
                Спроектировала<br />
                админ-панель маркетплейса
              </>
            ) : project.slug === "smarthome" ? (
              <>
                Развивала<br />
                новый продукт
              </>
            ) : project.title}
          </h2>
          <p className="project-description type-caption">{project.description}</p>
        </div>

        <div className="project-meta">
          {project.meta.flatMap((tag, index) => [
            index > 0 ? (
              <span
                className="magnetic-tags__separator"
                aria-hidden="true"
                key={`separator-${index}`}
              >
                ·
              </span>
            ) : null,
            <span
              className="magnetic-tag"
              key={`${tag}-${index}`}
            >
              {tag}
            </span>,
          ])}
        </div>
      </div>

      <div className="project-visual" aria-hidden="true">
        <picture className="project-picture">
          {["industry", "mrshrimp"].includes(project.slug) && (
            <source
              media="(max-width: 1200px)"
              srcSet={project.mobileScreen}
            />
          )}
          <source
            media="(max-width: 560px)"
            srcSet={project.mobileScreen}
          />
          <img
            ref={imageRef}
            className="project-art"
            src={project.screen}
            width={project.imageWidth}
            height={project.imageHeight}
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
          />
        </picture>
      </div>

      </article>
    </div>
  );
}

export default function Home() {
  useNavMagnet();
  const { theme, setTheme } = usePersistentTheme();
  const [showAllProjects, setShowAllProjects] = useState(false);
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
      <main className="home-page">
      <header className="site-header text-normal">
        <a className="brand text-logo" href="#top" aria-label="Galina Chumak — наверх" data-cursor="link">
          Galina Chumak
        </a>
        <nav className="header-contact-nav" aria-label="Связаться">
          <a
            className="header-contact"
            href="/about"
            data-cursor="nav"
          >
            Связаться
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

      <section className="hero hero--positioning" id="top">        <HeroInteractiveTags />
<h1
          className="type-title hero-title-glass reveal reveal-heading"
          aria-label="Проектирую сложные цифровые продукты"
          onPointerEnter={(event) => measureHeroTitle(event.currentTarget)}
          onPointerMove={distortHeroTitle}
          onPointerLeave={resetHeroTitle}
        >
          {heroTitleLines.map((line) => (
            <span
              className="hero-title-desktop-line"
              key={line}
              aria-hidden="true"
            >
              {line.split(" ").map((word, wordIndex) => (
                <span className="hero-title-word" key={`${word}-${wordIndex}`}>
                  {Array.from(word).map((character, index) => (
                    <span
                      className="hero-title-glyph"
                      key={`${character}-${index}`}
                    >
                      {character}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
          <span className="hero-title-mobile-line" aria-hidden="true">
            Проектирую
          </span>
          <span className="hero-title-mobile-line" aria-hidden="true">
            сложные цифровые
          </span>
          <span className="hero-title-mobile-line" aria-hidden="true">
            продукты
          </span>
        </h1>

        <p
          className="hero-positioning-description hero-positioning-description--wide text-secondary reveal type-description"
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          <span className="keep-together">
            <span className="hero-description-mobile-line">
              10+ мобильных приложений
            </span>{" "}
            <span className="hero-description-mobile-line">
              и&nbsp;веб-платформ
            </span>
          </span>
          <br className="hero-description-desktop-break" />
          <span className="keep-together">
            B2C&nbsp;/&nbsp;B2B · развиваю свой продукт
          </span>
        </p>
</section>

      <section className="projects" id="projects" aria-label="Избранные проекты">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      <section className="home-about-heading" aria-labelledby="home-about-title">
        <h2 id="home-about-title" className="home-about-summary__title type-h2 reveal reveal-heading">
          Обо мне
        </h2>
      </section>

      <section className="home-about-summary" aria-label="Основные принципы работы">
        <div className="about-copy__body about-copy__body--reveal reveal">
          <div className="about-point">
            <div className="about-point__symbol about-point__symbol--burst" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <polygon points="20,2 23,13 32,6 27,16 38,17 28,21 36,29 25,24 26,36 20,27 14,36 15,24 4,29 12,21 2,17 13,16 8,6 17,13" />
              </svg>
            </div>
            <div className="about-point__copy">
              <h3 className="about-point__title">Ценности</h3>
              <p className="about-point__text text-normal">
                Готовый и проверенный результат важнее идеального, но
                нереализованного сценария. Близки CustDev и MVP: сначала понять,
                что нужно пользователям, потом собрать продукт вокруг главного и
                довести до результата.
              </p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point__symbol about-point__symbol--loops" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <ellipse cx="20" cy="20" rx="16" ry="9" />
                <ellipse cx="20" cy="20" rx="16" ry="9" transform="rotate(60 20 20)" />
                <ellipse cx="20" cy="20" rx="16" ry="9" transform="rotate(120 20 20)" />
              </svg>
            </div>
            <div className="about-point__copy">
              <h3 className="about-point__title">Подход</h3>
              <p className="about-point__text text-normal">
                Люблю формировать решение вместе с командой. Разработчик — такой
                же участник процесса, как продакт или дизайнер. Сценарии и
                прототипы помогают обсуждать задачи и находить решение вместе.
              </p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point__symbol about-point__symbol--orbit" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="6" />
                <ellipse cx="20" cy="20" rx="17" ry="10" />
                <circle className="about-point__orbit-dot" cx="35" cy="20" r="2.2" />
              </svg>
            </div>
            <div className="about-point__copy">
              <h3 className="about-point__title">Мышление</h3>
              <p className="about-point__text text-normal">
                На собственном проекте смотрю на продукт целиком: дизайн связан
                с аудиторией, коммуникацией, маркетингом и аналитикой. Одно
                решение может влиять сразу на несколько частей продукта.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`other-projects ${showAllProjects ? "other-projects--expanded" : ""}`}
        aria-labelledby="other-projects-title"
      >
        <div className="other-projects-heading">
          <h2 id="other-projects-title" className="type-h2 reveal reveal-heading">
            <span style={{ display: "block" }}>Продукты в разных</span>
            <span style={{ display: "block" }}>доменах</span>
          </h2>
        </div>

        <div className="other-projects-grid">
          {otherProjects.map((item) => (
            <article className="other-projects-item reveal" key={item.name}>
              <MagneticTags
                items={item.domain.split(" · ")}
                separator="·"
                className="other-projects-tags"
              />

              <h3 className="other-projects-product">{item.name}</h3>

              <p className="other-projects-description">
                {item.description}
              </p>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="other-projects-more"
          aria-expanded={showAllProjects}
          onClick={() => setShowAllProjects((value) => !value)}
        >
          <span>{showAllProjects ? "Скрыть" : "Показать все"}</span>

          <svg
            className="other-projects-more__arrow"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M4.5 7.25 10 12.75l5.5-5.5" />
          </svg>
        </button>

      </section>
      </main>
    </>
  );
}
