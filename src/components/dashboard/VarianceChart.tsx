import { Card, CardHeader } from "./Primitives";
import { variance } from "@/lib/mock-data";
import { BarList } from "@tremor/react";

export function VarianceChart() {
  const sorted = [...variance].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  const max = Math.max(...sorted.map((d) => Math.abs(d.value)));
  const data = sorted.map((d) => ({
    name: d.driver,
    value: Math.abs(d.value),
    color: d.value >= 0 ? "cyan" : "red",
    icon: () => (
      <span
        className={`mr-2 inline-block text-[10px] font-mono ${
          d.value >= 0 ? "text-teal" : "text-destructive"
        }`}
      >
        {d.value >= 0 ? "+" : "−"}${Math.abs(d.value)}M
      </span>
    ),
  }));

  return (
    <Card>
      <CardHeader subtitle="SHAP attribution · USD millions · Tremor BarList" title="Variance vs. prior forecast" />
      <div className="px-5 pb-5">
        <BarList
          data={data.map((d) => ({ ...d, value: (d.value / max) * 100 }))}
          valueFormatter={() => ""}
          className="text-sm"
        />
      </div>
    </Card>
  );
}
