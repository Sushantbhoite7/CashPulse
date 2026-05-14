import { Card, CardHeader, Badge, ProgressBar } from "@/components/dashboard/Primitives";
import { auditLog } from "@/lib/mock-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <div className="overflow-x-auto">
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
          <div className="space-y-3 text-sm">
            <Field label="Type" value="LightGBM Ensemble" />
            <Field label="Last trained" value="2026-05-12 14:30 UTC" />
            <Field label="Backtest WAPE" value="4.2%" tone="success" />
            <ProgressBar value={42} color="teal" className="mt-1" />
            <Field label="Backtest MAPE" value="6.1%" />
            <Field label="Approved by" value="R. Chen (Head of FP&A)" />
            <Field label="Status" value="Production" tone="success" />
            <button className="w-full mt-2 text-xs px-3 py-2 rounded-full bg-surface-2/60 hover:bg-surface-2 transition-colors">
              View full backtest report
            </button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader subtitle="Last 50 actions" title="Audit log" />
          <div className="-mx-2">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-medium">Timestamp</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium">User</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium">Action</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium">Entity</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLog.map((r, i) => (
                  <TableRow key={i} className="border-border">
                    <TableCell className="tabular-nums text-xs">{r.ts}</TableCell>
                    <TableCell className="text-xs">{r.user}</TableCell>
                    <TableCell><Badge color="cyan" size="sm">{r.action}</Badge></TableCell>
                    <TableCell className="text-xs">{r.entity}</TableCell>
                    <TableCell className="text-xs">{r.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
