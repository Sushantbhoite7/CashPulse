import { KPIRow } from "@/components/dashboard/KPICard";
import { CashWaterfall } from "@/components/dashboard/CashWaterfall";
import { FXExposureTable } from "@/components/dashboard/FXExposureTable";
import { VarianceChart } from "@/components/dashboard/VarianceChart";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const personaKpis: Record<string, any[]> = {
  treasurer: [
    { label: "Opening balance", value: "$2.4B", delta: 2.3, status: "success", caption: "vs prior week", tone: "teal" },
    { label: "Forecasted closing 13W", value: "$1.87B", delta: -4.1, status: "warning", caption: "P50 estimate", tone: "warning" },
    { label: "Liquidity headroom", value: "$340M", status: "success", caption: "Above $1.7B minimum", tone: "success" },
    { label: "FX exposure (net)", value: "−$128M", delta: -3.2, status: "warning", caption: "USD/BRL dominant", tone: "warning" },
  ],
  cfo: [
    { label: "FCF vs guidance", value: "+$42M", delta: 8.1, status: "success", caption: "Q3 actuals", tone: "success" },
    { label: "Revenue forecast FY", value: "$14.2B", delta: 1.4, status: "success", caption: "vs board target", tone: "teal" },
    { label: "EBITDA margin", value: "22.4%", delta: 0.6, status: "success", caption: "TTM", tone: "teal" },
    { label: "Covenant headroom", value: "2.8×", status: "success", caption: "Min 2.0×", tone: "success" },
  ],
  fpa: [
    { label: "Active scenarios", value: "12", caption: "3 in review", tone: "teal" },
    { label: "Driver inputs", value: "84", caption: "Last refresh 9 min", tone: "teal" },
    { label: "Forecast WAPE", value: "4.2%", delta: -0.3, status: "success", tone: "success" },
    { label: "Override count", value: "27", delta: 12, status: "warning", caption: "30-day", tone: "warning" },
  ],
  controller: [
    { label: "Close progress", value: "78%", caption: "Day 4 of 5", tone: "teal" },
    { label: "Open journal items", value: "142", delta: -18, status: "success", tone: "success" },
    { label: "AR DSO", value: "61 days", delta: 2.1, status: "warning", tone: "warning" },
    { label: "Reconciliation breaks", value: "9", status: "warning", tone: "warning" },
  ],
  regional: [
    { label: "LATAM cash", value: "$612M", delta: -2.1, status: "warning", tone: "warning" },
    { label: "EMEA cash", value: "$884M", delta: 1.4, status: "success", tone: "teal" },
    { label: "APAC cash", value: "$402M", delta: 0.6, status: "success", tone: "teal" },
    { label: "NAM cash", value: "$502M", delta: 3.2, status: "success", tone: "success" },
  ],
  it: [
    { label: "Pipeline uptime", value: "99.98%", status: "success", tone: "success" },
    { label: "Active connectors", value: "5 / 6", caption: "FRED pending", tone: "teal" },
    { label: "Daily rows ingested", value: "118M", delta: 4.2, status: "success", tone: "teal" },
    { label: "Model drift score", value: "0.07", status: "success", caption: "Threshold 0.20", tone: "success" },
  ],
};

export function Dashboard() {
  const { persona } = useApp();
  const kpis = personaKpis[persona] ?? personaKpis.treasurer;

  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{persona} view</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
            <span className="text-gradient">Cashflow intelligence</span>, real-time
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            13-week forecast updated 3 minutes ago · Base FY26 scenario · 32 entities
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          Streaming from SAP · Databricks · Bloomberg
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={persona}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <KPIRow items={kpis} />
          <CashWaterfall />
          <div className="grid gap-6 lg:grid-cols-2">
            <FXExposureTable />
            <VarianceChart />
          </div>
          <AlertPanel />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
