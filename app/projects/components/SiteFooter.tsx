"use client";

import { useEffect, useRef } from "react";

export default function SiteFooter() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncWithHeader = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      const footer = footerRef.current;

      if (!header || !footer) return;

      const rect = header.getBoundingClientRect();

      footer.style.setProperty("width", `${rect.width}px`, "important");
      footer.style.setProperty("margin-left", `${rect.left}px`, "important");
      footer.style.setProperty("margin-right", "0", "important");
      footer.style.setProperty("max-width", "none", "important");
    };

    syncWithHeader();
    window.addEventListener("resize", syncWithHeader);

    return () => window.removeEventListener("resize", syncWithHeader);
  }, []);

  return (
    <footer className="global-footer text-normal">
      <div ref={footerRef} className="global-footer__inner">
        <span>© 2026 Galina Chumak</span>
        <span>Политика конфиденциальности</span>
      </div>
    </footer>
  );
}
