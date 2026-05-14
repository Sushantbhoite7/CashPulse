import { Card, CardHeader } from "@/components/dashboard/Primitives";
import { scenarios } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GitBranch, Plus, Share2 } from "lucide-react";
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge } from "@tremor/react";

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
        <button className="text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-teal to-cyan text-white shadow-glow-teal hover:opacity-90 inline-flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New scenario
        </button>
      </div>

      <Card>
        <CardHeader subtitle="3-way comparison · USD millions FCF" title="Segment-level waterfall" right={
          <button className="text-xs px-3 py-1.5 rounded-full bg-surface-2/60 hover:bg-surface-2 transition-colors inline-flex items-center gap-1.5">
            <Share2 className="h-3 w-3" /> Share with CFO
          </button>
        } />
        <div className="h-[320px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compare} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
              <XAxis dataKey="segment" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} width={50} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--foreground)" }} />
              <Bar dataKey="base" fill="var(--teal)" radius={[4,4,0,0]} />
              <Bar dataKey="downside" fill="var(--warning)" radius={[4,4,0,0]} />
              <Bar dataKey="stress" fill="var(--destructive)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <CardHeader subtitle="Saved scenarios" title="Version history" />
        <div className="-mx-2">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Author</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell className="text-right">Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scenarios.map((s) => {
                const badgeColor = s.status === "Approved" ? "emerald" : s.status === "Draft" ? "amber" : "gray";
                return (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.author}</TableCell>
                    <TableCell className="tabular-nums">{s.date}</TableCell>
                    <TableCell><Badge color={badgeColor} size="sm">{s.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <button className="text-xs px-3 py-1.5 rounded-full bg-surface-2/60 hover:bg-surface-2 transition-colors inline-flex items-center gap-1.5">
                        <GitBranch className="h-3 w-3" /> Branch
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
