"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const COUNTER_ID = 111298116;
const CONSENT_KEY = "galina-portfolio-analytics-consent";
const CONSENT_EVENT = "analytics-consent-changed";

type YmFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YmFunction;
  }
}

function initializeMetrika() {
  if (!window.ym) {
    const ym: YmFunction = (...args: unknown[]) => {
      ym.a = ym.a || [];
      ym.a.push(args);
    };

    ym.l = Date.now();
    window.ym = ym;
  }

  if (!document.getElementById("yandex-metrika-script")) {
    const script = document.createElement("script");

    script.id = "yandex-metrika-script";
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;

    document.head.appendChild(script);
  }

  window.ym?.(COUNTER_ID, "init", {
    clickmap: true,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

export default function YandexMetrika() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    const startMetrika = () => {
      const consent = localStorage.getItem(CONSENT_KEY);

      if (consent !== "accepted" || initialized.current) {
        return;
      }

      initializeMetrika();
      initialized.current = true;
      previousUrl.current = window.location.href;
    };

    startMetrika();
    window.addEventListener(CONSENT_EVENT, startMetrika);

    return () => {
      window.removeEventListener(CONSENT_EVENT, startMetrika);
    };
  }, []);

  useEffect(() => {
    if (
      !initialized.current ||
      localStorage.getItem(CONSENT_KEY) !== "accepted"
    ) {
      return;
    }

    const currentUrl = window.location.href;

    if (previousUrl.current && previousUrl.current !== currentUrl) {
      window.ym?.(COUNTER_ID, "hit", currentUrl, {
        referer: previousUrl.current,
        title: document.title,
      });
    }

    previousUrl.current = currentUrl;
  }, [pathname]);

  return null;
}
