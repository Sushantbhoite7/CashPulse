import { StatusDot } from "./Primitives";

export interface KPI {
  label: string;
  value: string;
  delta?: number;
  status?: "success" | "warning" | "danger";
  caption?: string;
}

export function KPIRow({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((k) => (
        <div key={k.label} className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            {k.status && <StatusDot tone={k.status} />}
            {k.label}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">{k.value}</span>
            {k.delta !== undefined && <DeltaPill value={k.delta} />}
          </div>
          {k.caption && <p className="text-xs text-muted-foreground">{k.caption}</p>}
        </div>
      ))}
    </div>
  );
}

function DeltaPill({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
      positive
        ? "bg-success/15 text-success"
        : "bg-destructive/15 text-destructive"
    }`}>
      {positive ? "↑" : "↓"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}
