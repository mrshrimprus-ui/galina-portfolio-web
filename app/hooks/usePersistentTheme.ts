"use client";

import { useEffect, useState } from "react";

export type SiteTheme = "dark" | "light";

const THEME_STORAGE_KEY = "galina-chumak-theme";

function getSavedTheme(): SiteTheme {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "light" ? "light" : "dark";
}

export function usePersistentTheme() {
  const [theme, setThemeState] = useState<SiteTheme>("dark");

  useEffect(() => {
    const savedTheme = getSavedTheme();
    document.documentElement.dataset.theme = savedTheme;
    setThemeState(savedTheme);

    const syncTheme = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const nextTheme = event.newValue === "light" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      setThemeState(nextTheme);
    };

    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const setTheme = (nextTheme: SiteTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  };

  return { theme, setTheme };
}
