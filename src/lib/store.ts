import { create } from "zustand";
import type { Persona } from "./mock-data";

interface AppState {
  persona: Persona;
  setPersona: (p: Persona) => void;
  scenario: string;
  setScenario: (s: string) => void;
  chatOpen: boolean;
  setChatOpen: (b: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  persona: "treasurer",
  setPersona: (persona) => set({ persona }),
  scenario: "Base FY26",
  setScenario: (scenario) => set({ scenario }),
  chatOpen: false,
  setChatOpen: (chatOpen) => set({ chatOpen }),
}));
