import { Card, CardHeader } from "@/components/dashboard/Primitives";
import { auditLog } from "@/lib/mock-data";
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
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Lineage & governance</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Every cell, traceable</h1>
      </div>

      <Card>
        <CardHeader subtitle="End-to-end lineage" title="From source system to forecast cell" />
        <div className="px-5 pb-6 overflow-x-auto">
          <div className="flex items-stretch gap-2 min-w-max">
            {lineage.map((node, i) => (
              <div key={node.name} className="flex items-center gap-2">
                <div className="rounded-lg border border-border bg-surface/60 px-4 py-3 min-w-[150px] hover:border-teal/40 cursor-pointer">
                  <div className="text-xs font-semibold">{node.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{node.meta}</div>
                  <div className="text-[10px] mt-2 text-success flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> DQ {node.quality}%</div>
                </div>
                {i < lineage.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <Card>
          <CardHeader subtitle="Active model" title="Production model card" />
          <div className="px-5 pb-5 space-y-3 text-sm">
            <Field label="Type" value="LightGBM Ensemble" />
            <Field label="Last trained" value="2026-05-12 14:30 UTC" />
            <Field label="Backtest WAPE" value="4.2%" tone="success" />
            <Field label="Backtest MAPE" value="6.1%" />
            <Field label="Approved by" value="R. Chen (Head of FP&A)" />
            <Field label="Status" value="Production ✓" tone="success" />
            <button className="w-full mt-2 text-xs px-3 py-2 rounded-md border border-border hover:bg-surface-2/60">
              View full backtest report →
            </button>
          </div>
        </Card>

        <Card>
          <CardHeader subtitle="Last 50 actions" title="Audit log" />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="text-left font-medium px-5 py-2">Timestamp</th>
                <th className="text-left font-medium px-3 py-2">User</th>
                <th className="text-left font-medium px-3 py-2">Action</th>
                <th className="text-left font-medium px-3 py-2">Entity</th>
                <th className="text-left font-medium px-5 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((r, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="px-5 py-2.5 tabular-nums text-muted-foreground text-xs">{r.ts}</td>
                  <td className="px-3 py-2.5 text-xs">{r.user}</td>
                  <td className="px-3 py-2.5 text-xs"><span className="px-2 py-0.5 rounded bg-teal/10 text-teal text-[10px] font-semibold uppercase tracking-wider">{r.action}</span></td>
                  <td className="px-3 py-2.5 text-xs">{r.entity}</td>
                  <td className="px-5 py-2.5 text-xs text-muted-foreground">{r.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`text-sm font-medium ${tone === "success" ? "text-success" : ""}`}>{value}</span>
    </div>
  );
}
