import { Card, Title, Text } from "@tremor/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const lineage = [
  { name: "SAP S/4HANA", meta: "2.4M rows · 3 min ago", quality: 99.7 },
  { name: "Bronze", meta: "Raw partitioned · 5 min", quality: 99.9 },
  { name: "Silver", meta: "Cleansed · joined", quality: 99.8 },
  { name: "Gold", meta: "Aggregates · marts", quality: 100 },
  { name: "Feature Store", meta: "342 features", quality: 100 },
  { name: "LightGBM v42", meta: "WAPE 4.2%", quality: 100 },
  { name: "Forecast cell", meta: "Live serving", quality: 100 },
];

export function LineagePage() {
  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Lineage</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Every cell, traceable</h1>
      </div>

      <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
        <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">End-to-end lineage</Text>
        <Title className="dark:text-white mt-1">From source system to forecast cell</Title>
        <div className="mt-5 overflow-x-auto">
          <div className="flex items-stretch gap-2 min-w-max">
            {lineage.map((node, i) => (
              <div key={node.name} className="flex items-center gap-2">
                <div className="rounded-lg border dark:border-zinc-800 dark:bg-zinc-950/40 px-4 py-3 min-w-[150px] hover:border-cyan-500/40 cursor-pointer transition-colors">
                  <div className="text-xs font-semibold dark:text-white">{node.name}</div>
                  <div className="text-[10px] dark:text-zinc-500 mt-1">{node.meta}</div>
                  <div className="text-[10px] mt-2 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> DQ {node.quality}%
                  </div>
                </div>
                {i < lineage.length - 1 && <ArrowRight className="h-4 w-4 dark:text-zinc-600" />}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
