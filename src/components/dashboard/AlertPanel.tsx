import { alerts } from "@/lib/mock-data";
import { AlertTriangle, Info } from "lucide-react";
import { Callout } from "@tremor/react";

export function AlertPanel() {
  return (
    <div className="space-y-2">
      {alerts.map((a, i) => (
        <Callout
          key={i}
          title={a.title}
          icon={a.type === "warning" ? AlertTriangle : Info}
          color={a.type === "warning" ? "amber" : "blue"}
          className="py-3"
        >
          {a.body}
        </Callout>
      ))}
    </div>
  );
}
