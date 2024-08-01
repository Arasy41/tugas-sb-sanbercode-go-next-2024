import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme:
        typeof window !== "undefined"
          ? localStorage.getItem("theme") || "light"
          : "light",
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);
          }
          return { theme: newTheme };
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;
