import { Card, Delta, StatusDot } from "./Primitives";
import { sparkline } from "@/lib/mock-data";
import { SparkAreaChart } from "@tremor/react";
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
  const color =
    kpi.tone === "danger" ? "red" : kpi.tone === "warning" ? "amber" : kpi.tone === "success" ? "emerald" : "cyan";
  return (
    <Card glow={kpi.tone} className="overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
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
        <SparkAreaChart
          data={data}
          categories={["y"]}
          index="x"
          colors={[color]}
          className="h-12 w-24 shrink-0"
        />
      </div>
    </Card>
  );
}

export { CardHeader } from "./Primitives";
