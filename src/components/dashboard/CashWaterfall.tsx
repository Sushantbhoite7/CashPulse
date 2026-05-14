import { Card, CardHeader } from "./Primitives";
import { cashForecast, minLiquidity } from "@/lib/mock-data";
import {
  Area, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export function CashWaterfall() {
  return (
    <Card>
      <CardHeader
        subtitle="13-week daily forecast · P10 / P50 / P90"
        title="Cash position fan chart"
        right={
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <Legend swatch="bg-teal/20" label="P10–P90" />
            <Legend swatch="bg-teal" label="P50" />
            <Legend swatch="border border-dashed border-warning" label="Min liquidity" />
          </div>
        }
      />
      <div className="h-[400px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={cashForecast} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 10 }}
              interval={9}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`}
              tickLine={false}
              axisLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--foreground)",
              }}
              labelStyle={{ color: "var(--muted-foreground)" }}
              formatter={(v: any, name: any) => [`$${(Number(v) / 1000).toFixed(2)}B`, String(name).toUpperCase()]}
            />
            <Area type="monotone" dataKey="p90" stroke="none" fill="url(#band)" />
            <Area type="monotone" dataKey="p10" stroke="none" fill="var(--background)" />
            <Line type="monotone" dataKey="p50" stroke="var(--teal)" strokeWidth={2} dot={false} />
            <ReferenceLine
              y={minLiquidity}
              stroke="var(--warning)"
              strokeDasharray="4 4"
              label={{ value: "Min liquidity $1.7B", position: "insideTopRight", fill: "var(--warning)", fontSize: 10 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2 w-3 rounded-sm ${swatch}`} />
      {label}
    </span>
  );
}
