import { Card, Title, Text, AreaChart, Button, Metric, Flex } from "@tremor/react";
import { drivers as initialDrivers } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { Save, RefreshCw } from "lucide-react";

export function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [recomputing, setRecomputing] = useState(false);

  const series = useMemo(() => {
    const shock = drivers.reduce((acc, d) => acc + (d.value / d.max), 0) / drivers.length;
    return Array.from({ length: 18 }, (_, i) => ({
      month: `M${i + 1}`,
      FCF: Math.round(240 + i * 14 * shock + Math.sin(i / 2) * 10),
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
        <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
          <Flex alignItems="start">
            <div>
              <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Base FY26</Text>
              <Title className="dark:text-white mt-1">Macro & operational</Title>
            </div>
            <Button icon={Save} size="xs" variant="secondary">Save</Button>
          </Flex>
          <div className="mt-5 space-y-5">
            {drivers.map((d) => (
              <div key={d.id}>
                <div className="flex items-baseline justify-between text-sm">
                  <label className="dark:text-zinc-400">{d.label}</label>
                  <span className="tabular-nums font-semibold text-cyan-400">{d.value}</span>
                </div>
                <input
                  type="range"
                  min={d.min}
                  max={d.max}
                  step={d.step}
                  value={d.value}
                  onChange={(e) => update(d.id, parseFloat(e.target.value))}
                  className="w-full mt-2 accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] dark:text-zinc-500 mt-1">
                  <span>{d.min}</span><span>{d.max}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
          <Flex alignItems="start">
            <div>
              <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Recomputed in real time</Text>
              <Title className="dark:text-white mt-1">FCF projection · 18 months</Title>
            </div>
            {recomputing && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400">
                <RefreshCw className="h-3 w-3 animate-spin" /> Recomputing
              </span>
            )}
          </Flex>
          <AreaChart
            className="h-72 mt-4"
            data={series}
            index="month"
            categories={["FCF"]}
            colors={["cyan"]}
            valueFormatter={(v) => `$${v}M`}
            showLegend={false}
            showGridLines={false}
            yAxisWidth={56}
            curveType="monotone"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
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
    <div className="rounded-lg border dark:border-zinc-800 dark:bg-zinc-950/50 px-3 py-2">
      <Text className="dark:text-zinc-500 uppercase tracking-wider text-[10px]">{label}</Text>
      <Metric className={`text-lg ${tone === "warning" ? "text-amber-400" : "dark:text-white"}`}>{value}</Metric>
    </div>
  );
}
