import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, BadgeDelta, ProgressBar } from "@tremor/react";
import { fxExposure } from "@/lib/mock-data";

export function FXExposureTable() {
  return (
    <Card className="dark:bg-zinc-900 dark:border-zinc-800 dark:ring-0">
      <Text className="dark:text-zinc-400 uppercase tracking-wider text-xs">Net positions · USD millions</Text>
      <Title className="dark:text-white mt-1">FX exposure</Title>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="dark:text-zinc-400">Pair</TableHeaderCell>
            <TableHeaderCell className="dark:text-zinc-400 text-right">Net</TableHeaderCell>
            <TableHeaderCell className="dark:text-zinc-400 text-right">VaR 95%</TableHeaderCell>
            <TableHeaderCell className="dark:text-zinc-400">Hedge</TableHeaderCell>
            <TableHeaderCell className="dark:text-zinc-400 text-right">Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fxExposure.map((r) => {
            const color = r.risk === "danger" ? "red" : r.risk === "warning" ? "amber" : "emerald";
            return (
              <TableRow key={r.pair}>
                <TableCell className="dark:text-white font-medium">{r.pair}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={r.net >= 0 ? "increase" : "decrease"} size="xs">
                    {r.net > 0 ? "+" : ""}{r.net}
                  </BadgeDelta>
                </TableCell>
                <TableCell className="dark:text-zinc-300 text-right tabular-nums">{r.var95}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ProgressBar value={r.hedge * 100} color="cyan" className="w-20" />
                    <span className="text-xs tabular-nums dark:text-zinc-400">{Math.round(r.hedge * 100)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge color={color}>
                    {r.risk === "danger" ? "Hedge ↑" : r.risk === "warning" ? "Review" : "Hold"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
