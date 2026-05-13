import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, ProgressBar, Flex, Button } from "@tremor/react";
import { auditLog } from "@/lib/mock-data";

export function GovernancePage() {
  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Governance</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Model & audit oversight</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
          <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Active model</Text>
          <Title className="dark:text-white mt-1">Production model card</Title>
          <div className="mt-4 space-y-3">
            <Field label="Type" value="LightGBM Ensemble" />
            <Field label="Last trained" value="2026-05-12 14:30 UTC" />
            <div>
              <Flex>
                <Text className="dark:text-zinc-400 text-xs">Backtest WAPE</Text>
                <Text className="dark:text-white text-xs font-medium">4.2% (threshold 10%)</Text>
              </Flex>
              <ProgressBar value={42} color="cyan" className="mt-2" />
            </div>
            <Field label="Backtest MAPE" value="6.1%" />
            <Field label="Approved by" value="R. Chen (Head of FP&A)" />
            <div className="flex justify-between items-center">
              <Text className="dark:text-zinc-400 text-xs">Status</Text>
              <Badge color="emerald">Production</Badge>
            </div>
            <Button size="xs" variant="secondary" className="w-full mt-2">View full backtest report →</Button>
          </div>
        </Card>

        <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
          <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Last 50 actions</Text>
          <Title className="dark:text-white mt-1">Audit log</Title>
          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="dark:text-zinc-400">Timestamp</TableHeaderCell>
                <TableHeaderCell className="dark:text-zinc-400">User</TableHeaderCell>
                <TableHeaderCell className="dark:text-zinc-400">Action</TableHeaderCell>
                <TableHeaderCell className="dark:text-zinc-400">Entity</TableHeaderCell>
                <TableHeaderCell className="dark:text-zinc-400">Details</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLog.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="dark:text-zinc-400 tabular-nums text-xs">{r.ts}</TableCell>
                  <TableCell className="dark:text-zinc-300 text-xs">{r.user}</TableCell>
                  <TableCell><Badge color="cyan" size="xs">{r.action}</Badge></TableCell>
                  <TableCell className="dark:text-white text-xs">{r.entity}</TableCell>
                  <TableCell className="dark:text-zinc-400 text-xs">{r.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
        <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Compliance status</Text>
        <Title className="dark:text-white mt-1">Controls & certifications</Title>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          {[
            { name: "SOC2 Type II", status: "Certified", color: "emerald" as const },
            { name: "ISO 27001", status: "Certified", color: "emerald" as const },
            { name: "GDPR", status: "Compliant", color: "emerald" as const },
            { name: "SOX 404", status: "In review", color: "amber" as const },
          ].map((c) => (
            <div key={c.name} className="rounded-lg border dark:border-zinc-800 dark:bg-zinc-950/40 p-4">
              <Text className="dark:text-white text-sm font-medium">{c.name}</Text>
              <Badge color={c.color} className="mt-2">{c.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Flex>
      <Text className="dark:text-zinc-400 text-xs">{label}</Text>
      <Text className="dark:text-white text-xs font-medium">{value}</Text>
    </Flex>
  );
}
