import { useEffect, useCallback } from "react";
import { useHabits } from "@/store/habits";

export function useTheme() {
  const theme = useHabits((s) => s.settings.theme ?? "dark");
  const updateSettings = useHabits((s) => s.updateSettings);

  const applyThemeToDom = useCallback((activeTheme: "light" | "dark") => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (activeTheme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", activeTheme === "light" ? "#fbf9fc" : "#15091f");
    }
  }, []);

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme, applyThemeToDom]);

  const toggleTheme = useCallback(() => {
    const nextTheme: "light" | "dark" = theme === "light" ? "dark" : "light";
    applyThemeToDom(nextTheme);
    updateSettings({ theme: nextTheme });
  }, [theme, applyThemeToDom, updateSettings]);

  const setTheme = useCallback(
    (newTheme: "light" | "dark") => {
      applyThemeToDom(newTheme);
      updateSettings({ theme: newTheme });
    },
    [applyThemeToDom, updateSettings]
  );

  return {
    theme,
    toggleTheme,
    setTheme,
    isLight: theme === "light",
    isDark: theme !== "light",
  };
}
