import { Card, Title, Text, BarChart, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, Button } from "@tremor/react";
import { scenarios } from "@/lib/mock-data";
import { GitBranch, Plus, Share2 } from "lucide-react";

const compare = [
  { segment: "Crop Protection", Base: 7800, Downside: 7100, Stress: 6700 },
  { segment: "Seeds", Base: 4200, Downside: 3900, Stress: 3650 },
  { segment: "Other", Base: 2200, Downside: 2020, Stress: 1880 },
];

export function ScenariosPage() {
  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Scenarios</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Compare & branch</h1>
        </div>
        <Button icon={Plus} size="xs" color="cyan">New scenario</Button>
      </div>

      <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
        <div className="flex items-start justify-between">
          <div>
            <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">3-way comparison · USD millions FCF</Text>
            <Title className="dark:text-white mt-1">Segment-level waterfall</Title>
          </div>
          <Button icon={Share2} size="xs" variant="secondary">Share with CFO</Button>
        </div>
        <BarChart
          className="h-72 mt-4"
          data={compare}
          index="segment"
          categories={["Base", "Downside", "Stress"]}
          colors={["cyan", "amber", "red"]}
          valueFormatter={(v) => `$${v}M`}
          showLegend
          showGridLines={false}
          yAxisWidth={56}
        />
      </Card>

      <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
        <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Saved scenarios</Text>
        <Title className="dark:text-white mt-1">Version history</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="dark:text-zinc-400">Name</TableHeaderCell>
              <TableHeaderCell className="dark:text-zinc-400">Author</TableHeaderCell>
              <TableHeaderCell className="dark:text-zinc-400">Date</TableHeaderCell>
              <TableHeaderCell className="dark:text-zinc-400">Status</TableHeaderCell>
              <TableHeaderCell className="dark:text-zinc-400 text-right">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scenarios.map((s) => {
              const color = s.status === "Approved" ? "emerald" : s.status === "Draft" ? "amber" : "gray";
              return (
                <TableRow key={s.name}>
                  <TableCell className="dark:text-white font-medium">{s.name}</TableCell>
                  <TableCell className="dark:text-zinc-300">{s.author}</TableCell>
                  <TableCell className="dark:text-zinc-300 tabular-nums">{s.date}</TableCell>
                  <TableCell><Badge color={color}>{s.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button icon={GitBranch} size="xs" variant="secondary">Branch</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
