"use client";

import { useEffect } from "react";

const TABLET_BREAKPOINT = 1200;
const NAV_BOTTOM = 20;
const FOOTER_GAP = 16;
const COOKIE_GAP = 8;

export default function CaseBottomNavDock() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(
      ".case-page .case-bottom-nav",
    );
    const footer = document.querySelector<HTMLElement>(
      ".global-footer__inner",
    );

    if (!nav || !footer) return;

    let frame = 0;

    const updatePosition = () => {
      frame = 0;

      const cookie = document.querySelector<HTMLElement>(
        '[data-cookie-notice="true"]',
      );

      if (window.innerWidth > TABLET_BREAKPOINT) {
        nav.style.removeProperty("bottom");
        cookie?.style.removeProperty("bottom");
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const stoppedBottom = window.innerHeight - footerTop + FOOTER_GAP;
      const navBottom = Math.max(NAV_BOTTOM, stoppedBottom);

      nav.style.bottom = `${navBottom}px`;

      if (cookie) {
        cookie.style.bottom = `${navBottom + nav.offsetHeight + COOKIE_GAP}px`;
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updatePosition);
    };

    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    updatePosition();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      nav.style.removeProperty("bottom");

      document
        .querySelector<HTMLElement>('[data-cookie-notice="true"]')
        ?.style.removeProperty("bottom");
    };
  }, []);

  return null;
}
