import { Card, CardHeader } from "@/components/dashboard/Primitives";
import { scenarios } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GitBranch, Plus, Share2 } from "lucide-react";

const compare = [
  { segment: "Crop Protection", base: 7800, downside: 7100, stress: 6700 },
  { segment: "Seeds", base: 4200, downside: 3900, stress: 3650 },
  { segment: "Other", base: 2200, downside: 2020, stress: 1880 },
];

export function ScenariosPage() {
  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Scenarios</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Compare & branch</h1>
        </div>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-md bg-gradient-to-r from-teal to-cyan text-primary-foreground inline-flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New scenario
        </button>
      </div>

      <Card>
        <CardHeader subtitle="3-way comparison · USD millions FCF" title="Segment-level waterfall" right={
          <button className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-surface-2/60 inline-flex items-center gap-1.5">
            <Share2 className="h-3 w-3" /> Share with CFO
          </button>
        } />
        <div className="h-[320px] px-2 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compare} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
              <XAxis dataKey="segment" stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} width={50} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.035 250)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="base" fill="oklch(0.78 0.15 200)" radius={[4,4,0,0]} />
              <Bar dataKey="downside" fill="oklch(0.78 0.15 70)" radius={[4,4,0,0]} />
              <Bar dataKey="stress" fill="oklch(0.66 0.22 25)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <CardHeader subtitle="Saved scenarios" title="Version history" />
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-medium px-5 py-2">Name</th>
              <th className="text-left font-medium px-3 py-2">Author</th>
              <th className="text-left font-medium px-3 py-2">Date</th>
              <th className="text-left font-medium px-3 py-2">Status</th>
              <th className="text-right font-medium px-5 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((s) => {
              const tone =
                s.status === "Approved" ? "bg-success/15 text-success" :
                s.status === "Draft" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground";
              return (
                <tr key={s.name} className="border-t border-border/60">
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{s.author}</td>
                  <td className="px-3 py-3 text-muted-foreground tabular-nums">{s.date}</td>
                  <td className="px-3 py-3"><span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-semibold ${tone}`}>{s.status}</span></td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-surface-2/60 inline-flex items-center gap-1.5">
                      <GitBranch className="h-3 w-3" /> Branch
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
