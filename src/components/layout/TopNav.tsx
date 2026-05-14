import { useApp } from "@/lib/store";
import { personas } from "@/lib/mock-data";
import { Bell, ChevronDown, MessageSquareText, Moon, Sun, User } from "lucide-react";
import { motion } from "framer-motion";

export function TopNav() {
  const { persona, setPersona, scenario, setScenario, setChatOpen, theme, toggleTheme } = useApp();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 md:px-6 h-14">
        <div className="flex items-center gap-1 rounded-full bg-surface/80 p-1">
          {personas.map((p) => {
            const active = persona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  active ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="persona-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal to-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{p.label}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="appearance-none rounded-full bg-surface-2/60 pl-3 pr-8 py-1.5 text-xs font-medium hover:bg-surface-2 transition-colors"
            >
              <option>Base FY26</option>
              <option>El Niño Stress</option>
              <option>LATAM AR Delay</option>
              <option>Gas Spike +40%</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal to-cyan px-4 py-1.5 text-xs font-semibold text-white shadow-glow-teal hover:opacity-90"
          >
            <MessageSquareText className="h-3.5 w-3.5" /> Ask CashPulse
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-8 w-8 grid place-items-center rounded-full hover:bg-surface-2 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-surface-2 transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-surface-2 transition-colors">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
