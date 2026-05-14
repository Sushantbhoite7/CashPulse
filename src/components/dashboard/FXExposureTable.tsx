import { Card, CardHeader } from "./Primitives";
import { fxExposure } from "@/lib/mock-data";
import {
  Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, ProgressBar,
} from "@tremor/react";

export function FXExposureTable() {
  return (
    <Card className="overflow-hidden">
      <CardHeader subtitle="Net positions · USD millions" title="FX exposure" />
      <div className="-mx-2">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Pair</TableHeaderCell>
              <TableHeaderCell className="text-right">Net</TableHeaderCell>
              <TableHeaderCell className="text-right">VaR 95%</TableHeaderCell>
              <TableHeaderCell className="text-right">Hedge</TableHeaderCell>
              <TableHeaderCell className="text-right">Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fxExposure.map((r) => {
              const badgeColor = r.risk === "danger" ? "red" : r.risk === "warning" ? "amber" : "emerald";
              const actionLabel = r.risk === "danger" ? "Hedge ↑" : r.risk === "warning" ? "Review" : "Hold";
              return (
                <TableRow key={r.pair}>
                  <TableCell className="font-medium">{r.pair}</TableCell>
                  <TableCell className={`text-right tabular-nums ${r.net < 0 ? "text-destructive" : "text-success"}`}>
                    {r.net > 0 ? "+" : ""}{r.net}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{r.var95}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <ProgressBar value={r.hedge * 100} color="teal" className="w-16" />
                      <span className="tabular-nums text-xs text-muted-foreground">{Math.round(r.hedge * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge color={badgeColor} size="sm">{actionLabel}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
