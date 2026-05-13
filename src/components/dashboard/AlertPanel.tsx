import { alerts } from "@/lib/mock-data";
import { Callout } from "@tremor/react";
import { AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

export function AlertPanel() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {alerts.map((a, i) => {
        const Icon = a.type === "warning" ? AlertTriangle : Info;
        const color = a.type === "warning" ? "amber" : "blue";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Callout
              title={a.title}
              icon={Icon}
              color={color}
              className="dark:bg-zinc-900/60 dark:border-zinc-800 h-full"
            >
              {a.body}
            </Callout>
          </motion.div>
        );
      })}
    </div>
  );
}
