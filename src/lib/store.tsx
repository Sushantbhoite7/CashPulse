import { createContext, useContext, useState, type ReactNode } from "react";
import type { Persona } from "./mock-data";
import { useTheme } from "@/components/ThemeToggle";

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
  const { theme, toggleTheme } = useTheme();

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
