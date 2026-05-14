import { Card, CardHeader, Badge, ProgressBar } from "./Primitives";
import { fxExposure } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function FXExposureTable() {
  return (
    <Card className="overflow-hidden">
      <CardHeader subtitle="Net positions · USD millions" title="FX exposure" />
      <div className="-mx-2">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-medium">Pair</TableHead>
              <TableHead className="text-right text-muted-foreground text-xs font-medium">Net</TableHead>
              <TableHead className="text-right text-muted-foreground text-xs font-medium">VaR 95%</TableHead>
              <TableHead className="text-right text-muted-foreground text-xs font-medium">Hedge</TableHead>
              <TableHead className="text-right text-muted-foreground text-xs font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fxExposure.map((r) => {
              const badgeColor = r.risk === "danger" ? "red" : r.risk === "warning" ? "amber" : "emerald";
              const actionLabel = r.risk === "danger" ? "Hedge ↑" : r.risk === "warning" ? "Review" : "Hold";
              return (
                <TableRow key={r.pair} className="border-border">
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
