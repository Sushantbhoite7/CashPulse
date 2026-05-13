import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, TrendingUp, GitBranch, Sliders, Network, ShieldCheck,
  Plug, Settings, Sparkles
} from "lucide-react";

const items = [
  { to: "/app", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/app/forecast", icon: TrendingUp, label: "Forecast" },
  { to: "/app/scenarios", icon: GitBranch, label: "Scenarios" },
  { to: "/app/drivers", icon: Sliders, label: "Drivers" },
  { to: "/app/lineage", icon: Network, label: "Lineage" },
  { to: "/app/governance", icon: ShieldCheck, label: "Governance" },
  { to: "/app/connectors", icon: Plug, label: "Connectors" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-surface/40">
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-teal to-cyan grid place-items-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">CashPulse</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Syngenta</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {items.map(({ to, icon: Icon, label }) => {
          const active = to === "/app" ? pathname === "/app" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-teal/15 text-foreground border border-teal/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-teal" : ""}`} />
              <span>{label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-5 py-4 text-[10px] text-muted-foreground border-t border-border">
        v0.42.0 · prod
      </div>
    </aside>
  );
}
