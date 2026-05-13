import { Card, CardHeader } from "@/components/dashboard/Primitives";
import { drivers as initialDrivers } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Save, RefreshCw } from "lucide-react";

export function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [recomputing, setRecomputing] = useState(false);

  const series = useMemo(() => {
    const shock = drivers.reduce((acc, d) => acc + (d.value / d.max), 0) / drivers.length;
    return Array.from({ length: 18 }, (_, i) => ({
      m: i + 1,
      v: Math.round(240 + i * 14 * shock + Math.sin(i / 2) * 10),
    }));
  }, [drivers]);

  function update(id: string, value: number) {
    setDrivers((ds) => ds.map((d) => (d.id === id ? { ...d, value } : d)));
    setRecomputing(true);
    setTimeout(() => setRecomputing(false), 400);
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">FP&A · Drivers</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Driver assumptions</h1>
        <p className="text-sm text-muted-foreground mt-1">Drag any slider — forecast recomputes live.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader subtitle="Base FY26" title="Macro & operational" right={
            <button className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-surface-2/60 inline-flex items-center gap-1.5">
              <Save className="h-3 w-3" /> Save scenario
            </button>
          } />
          <div className="px-5 pb-5 space-y-5">
            {drivers.map((d) => (
              <div key={d.id}>
                <div className="flex items-baseline justify-between text-sm">
                  <label className="text-muted-foreground">{d.label}</label>
                  <span className="tabular-nums font-semibold text-teal">{d.value}</span>
                </div>
                <input
                  type="range"
                  min={d.min}
                  max={d.max}
                  step={d.step}
                  value={d.value}
                  onChange={(e) => update(d.id, parseFloat(e.target.value))}
                  className="w-full mt-2 accent-teal"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>{d.min}</span><span>{d.max}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader subtitle="Recomputed in real time" title="FCF projection · 18 months" right={
            recomputing ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-teal">
                <RefreshCw className="h-3 w-3 animate-spin" /> Recomputing
              </span>
            ) : null
          } />
          <div className="h-[300px] px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="dgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} width={50} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 250)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.78 0.15 200)" strokeWidth={2} fill="url(#dgrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 pb-5 grid grid-cols-3 gap-3 text-center">
            <Stat label="FY FCF" value="$1.84B" />
            <Stat label="vs base" value="−4.2%" tone="warning" />
            <Stat label="Confidence" value="P50" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-lg font-semibold ${tone === "warning" ? "text-warning" : ""}`}>{value}</div>
    </div>
  );
}
