import { Card, Title, Text, Tracker, Flex, Badge, Button, type Color } from "@tremor/react";
import { connectors } from "@/lib/mock-data";
import { Plus, UploadCloud } from "lucide-react";
import { useMemo } from "react";

function makeUptime(uptime: number, seed: number): { color: Color; tooltip: string }[] {
  // deterministic pseudo-random based on seed
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const downRate = uptime < 100 ? 0.05 : 0.005;
  return Array.from({ length: 30 }, (_, i) => {
    const ok = rand() > downRate;
    return {
      color: (ok ? "emerald" : "rose") as Color,
      tooltip: `Day ${i + 1} — ${ok ? "Operational" : "Incident"}`,
    };
  });
}

export function ConnectorsPage() {
  const items = useMemo(
    () => connectors.map((c, i) => ({ ...c, uptimeData: makeUptime(c.uptime, i + 1) })),
    [],
  );

  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Connectors</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Data sources</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((c) => (
          <Card key={c.name} className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
            <Flex alignItems="start">
              <div>
                <Title className="dark:text-white text-base">{c.name}</Title>
                <Text className="dark:text-zinc-500 uppercase tracking-wider text-[10px] mt-0.5">{c.records} records</Text>
              </div>
              <Badge color={c.status === "connected" ? "emerald" : "amber"}>
                {c.status === "connected" ? "Connected" : "Pending"}
              </Badge>
            </Flex>
            <Flex className="mt-4">
              <div>
                <Text className="dark:text-zinc-500 text-[10px]">Last sync</Text>
                <Text className="dark:text-white text-sm font-medium">{c.lastSync}</Text>
              </div>
              <div className="text-right">
                <Text className="dark:text-zinc-500 text-[10px]">30-day uptime</Text>
                <Text className="text-cyan-400 text-sm font-medium tabular-nums">{c.uptime}%</Text>
              </div>
            </Flex>
            <Tracker data={c.uptimeData} className="mt-3" />
            <Button size="xs" variant="secondary" className="mt-4 w-full">Test connection</Button>
          </Card>
        ))}

        <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0 border-dashed">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-cyan-400" />
            <Title className="dark:text-white text-base">Add connector</Title>
          </div>
          <Text className="dark:text-zinc-500 uppercase tracking-wider text-[10px] mt-1">Oracle EBS · Bloomberg · SWIFT</Text>
          <div className="mt-4 rounded-lg border border-dashed dark:border-zinc-800 p-6 grid place-items-center text-center">
            <UploadCloud className="h-6 w-6 dark:text-zinc-500" />
            <Text className="dark:text-white text-xs mt-2">Drop CSV / Excel here</Text>
            <Text className="dark:text-zinc-500 text-[10px]">or click to browse</Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
