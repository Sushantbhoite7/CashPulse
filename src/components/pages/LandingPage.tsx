import { Link } from "@tanstack/react-router";
import { ArrowRight, Plug, Sparkles, ShieldCheck, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export function LandingPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <header className="px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal to-cyan grid place-items-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">CashPulse</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Treasury AI</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/app"
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-border hover:bg-surface-2/60"
          >
            Launch dashboard →
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-10 pt-20 pb-32 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border bg-surface/50 mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
          Now serving Q3 board pack · grounded by Claude
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          Cashflow intelligence for{" "}
          <span className="text-gradient">global agriculture</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
        >
          AI-powered forecasting with enterprise governance. From SAP to scenario in seconds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-teal to-cyan text-primary-foreground font-semibold shadow-glow-teal hover:opacity-90"
          >
            Launch dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border hover:bg-surface-2/60 font-semibold">
            <PlayCircle className="h-4 w-4" /> Watch demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 mx-auto max-w-5xl rounded-2xl border border-border glass p-6 shadow-card"
        >
          <div className="flex items-center gap-1.5 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { l: "Opening", v: "$2.4B" },
              { l: "Closing 13W", v: "$1.87B" },
              { l: "Headroom", v: "$340M" },
              { l: "FX exposure", v: "−$128M" },
            ].map((k) => (
              <div key={k.l} className="rounded-lg bg-surface/60 border border-border p-4 text-left">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</div>
                <div className="text-2xl font-semibold mt-1">{k.v}</div>
                <div className="mt-2 h-1 rounded-full bg-gradient-to-r from-teal/60 to-transparent" />
              </div>
            ))}
          </div>
          <div className="mt-4 h-40 rounded-lg bg-surface/40 border border-border relative overflow-hidden">
            <svg viewBox="0 0 600 160" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,110 C80,90 140,130 200,80 S360,40 440,70 S560,30 600,50 L600,160 L0,160 Z"
                fill="url(#lg)"
              />
              <path
                d="M0,110 C80,90 140,130 200,80 S360,40 440,70 S560,30 600,50"
                fill="none"
                stroke="oklch(0.78 0.15 200)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 pb-24 max-w-[1200px] mx-auto">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Plug, title: "Multi-source connectors", body: "SAP S/4HANA, Databricks, Bloomberg, ECB, NOAA — wired in once, refreshed continuously." },
            { icon: Sparkles, title: "AI-driven insights", body: "Claude-powered narrative generation with grounded citations and SHAP attributions." },
            { icon: ShieldCheck, title: "Enterprise governance", body: "Lineage on every cell, role-based access, full audit trail. SOC2 Type II." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card/60 p-6 hover:border-teal/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-teal/15 grid place-items-center text-teal">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Powered by</div>
          <div className="mt-4 flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground/80">
            <span>SAP</span><span>·</span><span>Databricks</span><span>·</span><span>Anthropic Claude</span><span>·</span><span>Azure</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 md:px-10 py-6 text-[11px] text-muted-foreground flex flex-wrap gap-3 justify-between">
        <span>© 2026 CashPulse</span>
        <span className="flex items-center gap-3">
          <span>🔒 SOC2 Type II</span>
          <span>🔒 AES-256</span>
          <span>🔒 TLS 1.3</span>
        </span>
      </footer>
    </div>
  );
}
