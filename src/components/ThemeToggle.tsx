import { Moon, Sun } from "lucide-react";
import { useApp } from "@/lib/store";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`h-8 w-8 grid place-items-center rounded-lg border border-border hover:bg-surface-2/60 ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
