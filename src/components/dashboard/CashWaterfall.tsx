import { Card, CardHeader } from "./Primitives";
import { cashForecast, minLiquidity } from "@/lib/mock-data";
import { AreaChart } from "@tremor/react";

export function CashWaterfall() {
  // Tremor needs a flat band: render p10 (lower bound) + delta to p90 stacked, plus p50 line via second chart layer.
  const data = cashForecast.map((d: any) => ({
    date: d.date,
    "P10–P90 band": d.p90 - d.p10,
    base: d.p10,
    P50: d.p50,
    "Min liquidity": minLiquidity,
  }));

  return (
    <Card>
      <CardHeader
        subtitle="13-week daily forecast · P10 / P50 / P90 · Tremor"
        title="Cash position fan chart"
      />
      <div className="px-4 pb-4">
        <AreaChart
          className="h-[340px]"
          data={data}
          index="date"
          categories={["P50", "P10–P90 band", "Min liquidity"]}
          colors={["cyan", "blue", "amber"]}
          valueFormatter={(v) => `$${(v / 1000).toFixed(2)}B`}
          showLegend
          showGridLines={false}
          yAxisWidth={60}
          curveType="monotone"
        />
      </div>
    </Card>
  );
}
