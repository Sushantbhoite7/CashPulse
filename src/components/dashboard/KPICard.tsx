import { sparkline } from "@/lib/mock-data";
import { Card, Metric, Text, Flex, BadgeDelta, SparkAreaChart, type DeltaType } from "@tremor/react";
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

  let deltaType: DeltaType = "unchanged";
  if (kpi.delta !== undefined) {
    if (kpi.delta > 1) deltaType = "moderateIncrease";
    else if (kpi.delta > 0) deltaType = "increase";
    else if (kpi.delta < -1) deltaType = "moderateDecrease";
    else if (kpi.delta < 0) deltaType = "decrease";
  }

  return (
    <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0 hover:-translate-y-0.5 transition-transform duration-200">
      <Flex alignItems="start">
        <div className="min-w-0">
          <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">{kpi.label}</Text>
          <Metric className="dark:text-white mt-1">{kpi.value}</Metric>
          {kpi.caption && <Text className="dark:text-zinc-500 text-xs mt-1">{kpi.caption}</Text>}
        </div>
        {kpi.delta !== undefined && (
          <BadgeDelta deltaType={deltaType} size="xs">
            {Math.abs(kpi.delta).toFixed(1)}%
          </BadgeDelta>
        )}
      </Flex>
      <SparkAreaChart
        data={data}
        categories={["y"]}
        index="x"
        colors={[color]}
        className="mt-4 h-10 w-full"
      />
    </Card>
  );
}

export { CardHeader } from "./Primitives";
