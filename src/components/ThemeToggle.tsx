import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "daylight" ? "Midnight" : "Daylight"} Coven`}
    >
      <span aria-hidden="true">
        {theme === "daylight" ? <Moon size={18} /> : <Sun size={18} />}
      </span>
      <span>{theme === "daylight" ? "Midnight" : "Daylight"} Coven</span>
    </button>
  );
}
