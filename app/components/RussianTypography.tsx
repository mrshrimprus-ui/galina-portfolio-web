"use client";

import { useEffect } from "react";

const SHORT_WORDS =
  /(^|[\s([{«„"'—–-])(а|и|но|да|или|либо|в|во|на|по|к|ко|с|со|у|о|об|обо|от|до|из|за|для|при|без|над|под|про|через|между)\s+(?=\S)/giu;

const EXCLUDED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "CODE",
  "PRE",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
]);

function formatNode(node: Text) {
  const parent = node.parentElement;

  if (
    !parent ||
    EXCLUDED_TAGS.has(parent.tagName) ||
    parent.closest("[data-no-typography]") ||
    parent.isContentEditable
  ) {
    return;
  }

  const text = node.nodeValue;

  if (!text || !text.trim()) return;

  const formatted = text.replace(
    SHORT_WORDS,
    (_, prefix: string, word: string) =>
      `${prefix}${word}\u00A0`,
  );

  if (formatted !== text) {
    node.nodeValue = formatted;
  }
}

function formatPage() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
  );

  let node = walker.nextNode();

  while (node) {
    formatNode(node as Text);
    node = walker.nextNode();
  }
}

export default function RussianTypography() {
  useEffect(() => {
    let frame = 0;

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(formatPage);
    };

    formatPage();

    const firstTimer = window.setTimeout(formatPage, 50);
    const secondTimer = window.setTimeout(formatPage, 300);

    const observer = new MutationObserver(schedule);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
      observer.disconnect();
    };
  }, []);

  return null;
}
