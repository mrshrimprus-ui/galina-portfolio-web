"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useNavMagnet } from "../hooks/useNavMagnet";
import InteractiveTitle from "../components/InteractiveTitle";
import CaseArtifactLink from "../projects/components/CaseArtifactLink";

export default function AboutPage() {

  useNavMagnet();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05 },
    );

    document
      .querySelectorAll(".about-page .reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page">
      <header className="site-header text-normal">
        <Link
          className="brand text-logo"
          href="/"
          aria-label="Galina Chumak — главная"
          data-cursor="link"
        >
          Galina Chumak
        </Link>

        <nav className="header-contact-nav" aria-label="Контакты">

          <button
            className="header-contact about-close"
            type="button"
            aria-label="Закрыть"
            data-cursor="nav"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = "/";
              }
            }}
          >
            ×
          </button>
        </nav>
      </header>

      <section className="about-content">
        <div className="about-left">
          <InteractiveTitle
            text="Контакты"
            className="about-title type-h1 reveal"
          />

          <div className="about-contacts about-contacts--reveal text-normal reveal">
<a
              href="mailto:galina.done@mail.ru"
              className="about-contact-link"
              data-cursor="nav"
            >
              <span>Email</span>
            </a>

            <a
              href="https://t.me/galina_done"
              target="_blank"
              rel="noreferrer"
              className="about-contact-link"
              data-cursor="nav"
            >
              <span>Telegram</span>
            </a>

            <a
              href="https://www.linkedin.com/in/галина-чумак-977951270"
              target="_blank"
              rel="noreferrer"
              className="about-contact-link"
              data-cursor="nav"
            >
              <span>LinkedIn</span>
            </a>

            <a
              href="https://drive.google.com/file/d/1ho40Lo-m_XTKQEZ73E2uDVyfBf6LDIcX/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="about-contact-link"
              data-cursor="nav"
            >
              <span>Скачать CV</span>
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}
