import { alerts } from "@/lib/mock-data";
import { AlertTriangle, Info } from "lucide-react";
import { Callout } from "@tremor/react";
import { motion } from "framer-motion";

export function AlertPanel() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {alerts.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Callout
            title={a.title}
            icon={a.type === "warning" ? AlertTriangle : Info}
            color={a.type === "warning" ? "amber" : "teal"}
            className="rounded-xl"
          >
            {a.body}
          </Callout>
        </motion.div>
      ))}
    </div>
  );
}
