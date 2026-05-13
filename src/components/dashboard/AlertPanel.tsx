import { alerts } from "@/lib/mock-data";
import { AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

export function AlertPanel() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {alerts.map((a, i) => {
        const Icon = a.type === "warning" ? AlertTriangle : Info;
        const tone =
          a.type === "warning"
            ? "border-warning/40 bg-warning/5"
            : "border-teal/40 bg-teal/5";
        const iconTone = a.type === "warning" ? "text-warning" : "text-teal";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-xl border p-4 ${tone}`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${iconTone}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.body}</div>
              </div>
              <button className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
                Resolve
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
