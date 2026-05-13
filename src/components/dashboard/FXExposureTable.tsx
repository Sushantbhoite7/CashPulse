import { Card, CardHeader } from "./Primitives";
import { fxExposure } from "@/lib/mock-data";

export function FXExposureTable() {
  return (
    <Card>
      <CardHeader subtitle="Net positions · USD millions" title="FX exposure" />
      <div className="px-2 pb-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-medium px-3 py-2">Pair</th>
              <th className="text-right font-medium px-3 py-2">Net</th>
              <th className="text-right font-medium px-3 py-2">VaR 95%</th>
              <th className="text-right font-medium px-3 py-2">Hedge</th>
              <th className="text-right font-medium px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {fxExposure.map((r) => {
              const tone =
                r.risk === "danger"
                  ? "text-destructive bg-destructive/10"
                  : r.risk === "warning"
                  ? "text-warning bg-warning/10"
                  : "text-success bg-success/10";
              return (
                <tr key={r.pair} className="border-t border-border/60 hover:bg-surface-2/40">
                  <td className="px-3 py-2.5 font-medium">{r.pair}</td>
                  <td className={`px-3 py-2.5 text-right tabular-nums ${r.net < 0 ? "text-destructive" : "text-success"}`}>
                    {r.net > 0 ? "+" : ""}{r.net}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{r.var95}</td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="ml-auto inline-flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-teal" style={{ width: `${r.hedge * 100}%` }} />
                      </div>
                      <span className="tabular-nums text-xs text-muted-foreground">{Math.round(r.hedge * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-semibold ${tone}`}>
                      {r.risk === "danger" ? "Hedge ↑" : r.risk === "warning" ? "Review" : "Hold"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
