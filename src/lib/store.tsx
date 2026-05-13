// SYNGENTA-UPDATE
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Persona } from "./mock-data";

type Theme = "dark" | "light";

interface AppState {
  persona: Persona;
  setPersona: (p: Persona) => void;
  scenario: string;
  setScenario: (s: string) => void;
  chatOpen: boolean;
  setChatOpen: (b: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("treasurer");
  const [scenario, setScenario] = useState("Base FY26");
  const [chatOpen, setChatOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("cp-theme") as Theme) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    try { localStorage.setItem("cp-theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <Ctx.Provider value={{ persona, setPersona, scenario, setScenario, chatOpen, setChatOpen, theme, toggleTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("AppProvider missing");
  return v;
}
