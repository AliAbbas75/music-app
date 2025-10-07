import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => {
      // helper: apply to <html>
      const applyTheme = (theme) => {
        document.documentElement.classList.remove("light", "dark");

        if (theme === "system") {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.classList.add(prefersDark ? "dark" : "light");
        } else {
          document.documentElement.classList.add(theme);
        }
      };

      // listen for OS changes if system mode is active
      const watchSystemTheme = () => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => {
          if (get().theme === "system") {
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(e.matches ? "dark" : "light");
          }
        };
        mediaQuery.addEventListener("change", handler);
      };

      // initialize watcher once
      if (typeof window !== "undefined") {
        watchSystemTheme();
      }

      return {
        theme: "light",

        toggleTheme: () => {
          const newTheme = get().theme === "light" ? "dark" : "light";
          applyTheme(newTheme);
          set({ theme: newTheme });
        },

        setTheme: (theme) => {
          applyTheme(theme);
          set({ theme });
        }
      };
    },
    { name: "theme-storage" }
  )
);

export default useThemeStore;
