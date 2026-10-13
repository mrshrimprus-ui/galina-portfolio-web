"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./CookieConsent.module.css";

const NOTICE_KEY = "galina-portfolio-cookie-notice-seen-v2";
const NOTICE_EVENT = "cookie-notice-seen";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");
  const isHomePage = pathname === "/";
  const bannerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncVisibility = () => {
      setVisible(localStorage.getItem(NOTICE_KEY) === null);
    };

    syncVisibility();

    window.addEventListener(NOTICE_EVENT, syncVisibility);
    window.addEventListener("storage", syncVisibility);

    return () => {
      window.removeEventListener(NOTICE_EVENT, syncVisibility);
      window.removeEventListener("storage", syncVisibility);
    };
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!visible || !isHomePage || !banner) return;

    const footer = document.querySelector<HTMLElement>(".global-footer__inner");
    if (!footer) return;

    let frame = 0;

    const updatePosition = () => {
      frame = 0;

      const baseBottom = window.innerWidth <= 600 ? 16 : 20;
      const footerGap = 12;
      const footerTop = footer.getBoundingClientRect().top;
      const stoppedBottom = window.innerHeight - footerTop + footerGap;

      banner.style.bottom = `${Math.max(baseBottom, stoppedBottom)}px`;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      banner.style.removeProperty("bottom");
    };
  }, [isHomePage, visible]);

  const closeNotice = () => {
    localStorage.setItem(NOTICE_KEY, "seen");
    window.dispatchEvent(new Event(NOTICE_EVENT));
  };

  const handleButtonMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    const x = Math.max(-5, Math.min(5, offsetX * 0.12));
    const y = Math.max(-4, Math.min(4, offsetY * 0.12));

    button.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleButtonLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0, 0)";
  };

  if (!visible) return null;

  return (
    <section
      ref={bannerRef}
      className={`${styles.banner} ${isProjectPage ? styles.projectBanner : ""}`}
      data-cookie-notice="true"
      data-cursor="cookie"
      aria-label="Уведомление об аналитике"
      aria-live="polite"
    >
      <p className={styles.text}>
        Использую{" "}
        <Link className={styles.link} href="/privacy" data-cursor="link">
          Яндекс Метрику
        </Link>{" "}
        для аналитики портфолио.
      </p>

      <button
        ref={buttonRef}
        className={styles.primary}
        data-cursor="link"
        type="button"
        onMouseMove={handleButtonMove}
        onMouseLeave={handleButtonLeave}
        onClick={closeNotice}
      >
        Хорошо
      </button>
    </section>
  );
}
