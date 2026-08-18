"use client";

import { useEffect, useRef } from "react";

export default function SiteFooter() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncWithHeader = () => {
      const header =
        document.querySelector<HTMLElement>(".site-header");
      const footer = footerRef.current;

      if (!header || !footer) return;

      const rect = header.getBoundingClientRect();

      footer.style.setProperty(
        "width",
        `${rect.width}px`,
        "important",
      );

      footer.style.setProperty(
        "margin-left",
        `${rect.left}px`,
        "important",
      );

      footer.style.setProperty(
        "margin-right",
        "0",
        "important",
      );

      footer.style.setProperty(
        "max-width",
        "none",
        "important",
      );
    };

    syncWithHeader();

    window.addEventListener(
      "resize",
      syncWithHeader,
    );

    return () => {
      window.removeEventListener(
        "resize",
        syncWithHeader,
      );
    };
  }, []);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.classList.toggle(
          "case-nav-at-footer",
          entry.isIntersecting,
        );
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();

      document.documentElement.classList.remove(
        "case-nav-at-footer",
      );
    };
  }, []);

  return (
    <footer className="global-footer type-caption-small">
      <div
        ref={footerRef}
        className="global-footer__inner"
      >
        <span className="global-footer__copyright">
          © 2026
        </span>

        <a
          className="global-footer__policy"
          href="/privacy/"
          data-cursor="nav"
        >
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
}
