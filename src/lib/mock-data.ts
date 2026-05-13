export type Persona = "treasurer" | "cfo" | "fpa" | "controller" | "regional" | "it";

export const personas: { id: Persona; label: string }[] = [
  { id: "treasurer", label: "Treasurer" },
  { id: "cfo", label: "CFO" },
  { id: "fpa", label: "FP&A" },
  { id: "controller", label: "Controller" },
  { id: "regional", label: "Regional" },
  { id: "it", label: "IT / Architect" },
];

// 13-week daily cash forecast with P10/P50/P90
export const cashForecast = (() => {
  const out: { day: number; date: string; p10: number; p50: number; p90: number }[] = [];
  let v = 2400;
  const start = new Date(2026, 4, 13);
  for (let i = 0; i < 91; i++) {
    const drift = -2.4 + Math.sin(i / 6) * 12 + (Math.random() - 0.5) * 8;
    v += drift;
    const spread = 60 + i * 2.4;
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    out.push({
      day: i,
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      p50: Math.round(v),
      p10: Math.round(v - spread),
      p90: Math.round(v + spread),
    });
  }
  return out;
})();

export const minLiquidity = 1700;

export const sparkline = (n = 13, base = 100, vol = 8) =>
  Array.from({ length: n }, (_, i) => ({
    x: i,
    y: Math.round(base + Math.sin(i / 2) * vol + (Math.random() - 0.5) * vol),
  }));

export const fxExposure = [
  { pair: "USD/BRL", net: -128, var95: 14.2, hedge: 0.62, risk: "danger" },
  { pair: "USD/EUR", net: 84, var95: 6.8, hedge: 0.81, risk: "success" },
  { pair: "USD/CNY", net: -42, var95: 9.4, hedge: 0.55, risk: "warning" },
  { pair: "USD/INR", net: -28, var95: 5.1, hedge: 0.7, risk: "warning" },
  { pair: "GBP/EUR", net: 19, var95: 3.2, hedge: 0.88, risk: "success" },
];

export const variance = [
  { driver: "Corn price", value: 28 },
  { driver: "AR collections LATAM", value: 15 },
  { driver: "Seeds revenue APAC", value: 9 },
  { driver: "Natural gas", value: -11 },
  { driver: "USD/BRL FX", value: -18 },
];

export const alerts = [
  {
    type: "warning" as const,
    title: "Liquidity breach projected · Week 7",
    body: "Under stress scenario P10 dips below threshold by $42M. Recommended: draw $45M on RCF by Week 5.",
  },
  {
    type: "info" as const,
    title: "USD/BRL moved +3.2% overnight",
    body: "FX impact: −$8.4M on LATAM receivables. Hedge ratio still within policy band.",
  },
];

export const cfoFcf = (() => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"];
  let v = 240;
  return months.map((m, i) => {
    v += 18 + Math.sin(i / 2) * 14 + (Math.random() - 0.5) * 8;
    const spread = 30 + i * 2;
    return {
      month: m,
      p50: Math.round(v),
      p10: Math.round(v - spread),
      p90: Math.round(v + spread),
      target: Math.round(220 + i * 18),
    };
  });
})();

export const drivers = [
  { id: "cocoa", label: "Cocoa price ($/ton)", min: 2000, max: 6000, value: 3400, step: 50 },
  { id: "urea", label: "Urea price ($/ton)", min: 200, max: 600, value: 340, step: 5 },
  { id: "usdbrl", label: "USD/BRL", min: 4, max: 7, value: 5.2, step: 0.05 },
  { id: "acres", label: "Planted acreage (M)", min: 85, max: 100, value: 92, step: 0.5 },
  { id: "glypho", label: "Glyphosate index", min: 80, max: 150, value: 105, step: 1 },
];

export const scenarios = [
  { name: "Base FY26", author: "S. Patel", date: "2026-05-10", status: "Approved" },
  { name: "El Niño Stress", author: "M. Costa", date: "2026-05-11", status: "Draft" },
  { name: "LATAM AR Delay", author: "J. Okafor", date: "2026-05-09", status: "Approved" },
  { name: "Gas Spike +40%", author: "R. Chen", date: "2026-05-08", status: "Archived" },
];

export const auditLog = [
  { ts: "2026-05-13 09:42", user: "s.patel@syngenta.com", action: "Override", entity: "LATAM Q3 forecast", details: "+5% vs model" },
  { ts: "2026-05-13 08:15", user: "m.costa@syngenta.com", action: "Scenario created", entity: "El Niño Stress", details: "Branched from Base FY26" },
  { ts: "2026-05-12 17:01", user: "system", action: "Model retrained", entity: "LightGBM Ensemble v42", details: "WAPE 4.2%" },
  { ts: "2026-05-12 14:30", user: "r.chen@syngenta.com", action: "Approved", entity: "Base FY26", details: "Sign-off for board pack" },
];

export const connectors = [
  { name: "SAP S/4HANA", status: "connected", lastSync: "3 min ago", records: "2.4M", uptime: 99.98 },
  { name: "Databricks Lakehouse", status: "connected", lastSync: "1 min ago", records: "118M", uptime: 99.99 },
  { name: "Bloomberg FX", status: "connected", lastSync: "live", records: "stream", uptime: 99.92 },
  { name: "ECB Rates", status: "connected", lastSync: "12 min ago", records: "84K", uptime: 100 },
  { name: "NOAA Weather", status: "connected", lastSync: "1 hr ago", records: "5.2M", uptime: 99.7 },
  { name: "FRED Macro", status: "pending", lastSync: "—", records: "—", uptime: 0 },
];
