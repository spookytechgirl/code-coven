import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
type Theme = "daylight" | "midnight";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "daylight",
  toggle: () => {},
});
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem("code-coven-theme") === "midnight"
        ? "midnight"
        : "daylight";
    } catch {
      return "daylight";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("code-coven-theme", theme);
    } catch {
      /* The theme still works when storage is unavailable. */
    }
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () =>
          setTheme((t) => (t === "daylight" ? "midnight" : "daylight")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
