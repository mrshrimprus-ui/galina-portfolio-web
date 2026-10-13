"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { useNavMagnet } from "../../hooks/useNavMagnet";
import { usePersistentTheme } from "../../hooks/usePersistentTheme";

export default function CaseExperience() {
  const pathname = usePathname();
  useNavMagnet();
  const { theme, setTheme } = usePersistentTheme();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useLayoutEffect(() => {
    document.documentElement.classList.remove("is-project-transitioning");

    const pageSelector =
      pathname === "/projects/mrshrimp"
        ? ".mrshrimp-case"
        : pathname === "/projects/punto"
          ? ".punto-case"
          : pathname === "/projects/industry"
            ? ".industry-case"
            : ".case-page";

    let heroFrame1 = 0;
    let heroFrame2 = 0;
    let heroStarted = false;

    const revealHero = () => {
      if (heroStarted) return;

      const heroElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          `${pageSelector} .case-intro .reveal`,
        ),
      );

      // При SPA-переходе новый кейс может появиться чуть позже pathname.
      if (heroElements.length === 0) return;

      heroStarted = true;

      heroElements.forEach((element) => {
        element.classList.remove("is-visible");
      });

      // Фиксируем стартовое состояние до запуска transition.
      void heroElements[0].offsetHeight;

      heroFrame1 = window.requestAnimationFrame(() => {
        heroFrame2 = window.requestAnimationFrame(() => {
          heroElements.forEach((element) => {
            element.classList.add("is-visible");
          });
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );

    const observeContent = () => {
      // Hero сюда специально НЕ попадает.
      document
        .querySelectorAll<HTMLElement>(
          `${pageSelector} .reveal:not(.is-visible)`,
        )
        .forEach((element) => {
          if (element.closest(".case-intro")) return;
          observer.observe(element);
        });

      // Если новый hero только что появился после router.push.
      revealHero();
    };

    observeContent();

    // Наблюдаем body, потому что при SPA-переходе старый .case-page
    // заменяется новым.
    const mutationObserver = new MutationObserver(observeContent);

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(heroFrame1);
      window.cancelAnimationFrame(heroFrame2);

      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const navigation = document.querySelector<HTMLElement>(
      ".case-bottom-nav",
    );

    if (!navigation) return;
    navigation.classList.remove("is-visible");

    const updateNavigation = () => {
      navigation.classList.toggle(
        "is-visible",
        window.scrollY >= 80,
      );
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateNavigation);
    };
  }, []);

  useEffect(() => {
    const nextProject = document.querySelector<HTMLElement>(
      ".case-bottom-nav-next",
    );

    if (!nextProject) return;

    const updateFillOrigin = (event: PointerEvent) => {
      const rect = nextProject.getBoundingClientRect();

      nextProject.style.setProperty(
        "--liquid-x",
        `${event.clientX - rect.left}px`,
      );
      nextProject.style.setProperty(
        "--liquid-y",
        `${event.clientY - rect.top}px`,
      );
    };

    nextProject.addEventListener("pointermove", updateFillOrigin);

    return () => {
      nextProject.removeEventListener(
        "pointermove",
        updateFillOrigin,
      );
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const resultVisuals = [
      {
        element: document.querySelector<HTMLElement>(
          ".mrshrimp-case .shrimp-result-stage",
        ),
        property: "--result-phone-y",
      },
      {
        element: document.querySelector<HTMLElement>(
          ".punto-case .punto-result__visual",
        ),
        property: "--punto-result-scroll-y",
      },
      {
        element: document.querySelector<HTMLElement>(
          ".smarthome-case .smarthome-result__visual",
        ),
        property: "--smarthome-result-scroll-y",
      },
    ].filter(
      (item): item is { element: HTMLElement; property: string } =>
        item.element !== null,
    );

    if (resultVisuals.length === 0) return;

    let frame = 0;
    let current = 0;

    const render = () => {
      if (
        reducedMotion.matches ||
        window.matchMedia("(max-width: 1200px)").matches
      ) {
        resultVisuals.forEach(({ element, property }) => {
          element.style.setProperty(property, "0px");
        });
      } else {
        const reference = resultVisuals[0].element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const visualCenter = reference.top + reference.height / 2;
        const target = Math.max(
          -52,
          Math.min(52, (viewportCenter - visualCenter) * 0.105),
        );

        current += (target - current) * 0.085;

        resultVisuals.forEach(({ element, property }) => {
          element.style.setProperty(property, `${current.toFixed(2)}px`);
        });
      }

      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      resultVisuals.forEach(({ element, property }) => {
        element.style.removeProperty(property);
      });
    };
  }, []);
return (
    <header className="site-header case-header text-normal">
      <a
        className="brand text-logo"
        href="/"
        aria-label="Galina Chumak — главная"
        data-cursor="link"
      >
        Galina Chumak
      </a>

      <button
        className="theme-switch"
        type="button"
        aria-label={
          theme === "dark"
            ? "Включить светлую тему"
            : "Включить тёмную тему"
        }
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

      <nav className="header-contact-nav" aria-label="Связаться">
        <a
          className="header-contact"
          href="/about"
          data-cursor="nav"
        >
          Связаться
        </a>
      </nav>
    </header>
  );
}
