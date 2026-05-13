import { Card, CardHeader, Delta, StatusDot } from "./Primitives";
import { sparkline } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

interface KPI {
  label: string;
  value: string;
  delta?: number;
  status?: "success" | "warning" | "danger";
  caption?: string;
  tone?: "teal" | "warning" | "danger" | "success";
}

export function KPIRow({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((k, i) => (
        <KPICard key={k.label} kpi={k} seed={i} />
      ))}
    </div>
  );
}

function KPICard({ kpi, seed }: { kpi: KPI; seed: number }) {
  const data = useMemo(() => sparkline(13, 100 + seed * 5, 6 + seed), [seed]);
  return (
    <Card glow={kpi.tone} className="overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          {kpi.status && <StatusDot tone={kpi.status} />}
          {kpi.label}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-3xl font-semibold tracking-tight">{kpi.value}</div>
          {kpi.delta !== undefined && <Delta value={kpi.delta} />}
        </div>
        {kpi.caption && <div className="text-xs text-muted-foreground mt-1">{kpi.caption}</div>}
      </div>
      <div className="h-14 -mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`spk-${seed}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="y"
              stroke="oklch(0.78 0.15 200)"
              strokeWidth={1.6}
              fill={`url(#spk-${seed})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export { CardHeader };
