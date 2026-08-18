"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

const CONSENT_KEY = "galina-portfolio-analytics-consent";
const CONSENT_EVENT = "analytics-consent-changed";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) === null);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      className={styles.banner}
      data-cursor="cookie"
      role="dialog"
      aria-label="Настройки аналитики"
      aria-live="polite"
    >
      <div>
        <p className={styles.title}>
          Разрешить аналитику посещений?
        </p>

        <p className={styles.text}>
          С помощью{" "}
          <Link className={styles.link} href="/privacy" data-cursor="link">
            Яндекс Метрики
          </Link>{" "}
          проверяю, работает ли портфолио.
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.secondary}
          data-cursor="link"
          type="button"
          onClick={decline}
        >
          Нет
        </button>

        <button
          className={styles.primary}
          data-cursor="link"
          type="button"
          onClick={accept}
        >
          Разрешить
        </button>
      </div>
    </section>
  );
}
