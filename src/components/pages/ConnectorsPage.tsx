import { Card, CardHeader } from "@/components/dashboard/Primitives";
import { connectors } from "@/lib/mock-data";
import { CheckCircle2, Clock, Plus, UploadCloud } from "lucide-react";
import { Tracker, Badge } from "@tremor/react";
import { useMemo } from "react";

function generateTrackerData(uptime: number) {
  const seed = uptime * 100;
  return Array.from({ length: 30 }, (_, i) => {
    const hash = Math.sin(seed + i * 7.3) * 10000;
    const ok = (hash - Math.floor(hash)) > (uptime < 100 ? 0.05 : 0.005);
    return { color: ok ? "emerald" : "red", tooltip: `Day ${i + 1}` } as const;
  });
}

export function ConnectorsPage() {
  const trackerDataMap = useMemo(
    () => Object.fromEntries(connectors.map((c) => [c.name, generateTrackerData(c.uptime)])),
    []
  );

  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Connectors</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Data sources</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {connectors.map((c) => (
          <Card key={c.name} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{c.records} records</div>
              </div>
              <Badge color={c.status === "connected" ? "emerald" : "amber"} size="sm">
                {c.status === "connected" ? "Connected" : "Pending"}
              </Badge>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground">Last sync</div>
                <div className="text-sm font-medium">{c.lastSync}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground text-right">30-day uptime</div>
                <div className="text-sm font-medium tabular-nums text-teal">{c.uptime}%</div>
              </div>
            </div>
            <Tracker data={trackerDataMap[c.name]} className="mt-3" />
            <button className="mt-4 w-full text-xs px-3 py-1.5 rounded-md border border-border hover:bg-surface-2/60">Test connection</button>
          </Card>
        ))}

        <Card className="p-5 border-dashed">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-teal" />
            <div className="text-sm font-semibold">Add connector</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Oracle EBS · Bloomberg · SWIFT</div>
          <div className="mt-4 rounded-lg border border-dashed border-border p-6 grid place-items-center text-center">
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
            <div className="text-xs mt-2">Drop CSV / Excel here</div>
            <div className="text-[10px] text-muted-foreground">or click to browse</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
