import { Card, CardHeader } from "./Primitives";
import { variance } from "@/lib/mock-data";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function VarianceChart() {
  const data = [...variance].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  return (
    <Card>
      <CardHeader subtitle="SHAP attribution · USD millions" title="Variance vs. prior forecast" />
      <div className="h-[260px] px-2 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
            <XAxis type="number" stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="driver"
              stroke="oklch(0.7 0.02 250)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={140}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.22 0.035 250)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: any) => [`${Number(v) > 0 ? "+" : ""}$${v}M`, "Impact"]}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.value >= 0 ? "oklch(0.78 0.15 200)" : "oklch(0.66 0.22 25)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
