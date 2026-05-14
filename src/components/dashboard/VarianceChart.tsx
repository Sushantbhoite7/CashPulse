import { Card, CardHeader } from "./Primitives";
import { variance } from "@/lib/mock-data";
import { BarList } from "@tremor/react";

export function VarianceChart() {
  const sorted = [...variance].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  const positive = sorted
    .filter((d) => d.value >= 0)
    .map((d) => ({ name: `${d.driver} (+$${d.value}M)`, value: d.value }));

  const negative = sorted
    .filter((d) => d.value < 0)
    .map((d) => ({ name: `${d.driver} (−$${Math.abs(d.value)}M)`, value: Math.abs(d.value) }));

  return (
    <Card>
      <CardHeader subtitle="SHAP attribution · USD millions" title="Variance vs. prior forecast" />
      <div className="space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Positive drivers</p>
          <BarList data={positive} color="cyan" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Negative drivers</p>
          <BarList data={negative} color="rose" />
        </div>
      </div>
    </Card>
  );
}
