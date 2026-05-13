import { Card, CardHeader } from "@/components/dashboard/Primitives";
import { cfoFcf } from "@/lib/mock-data";
import { Area, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sparkles, Copy, FileDown } from "lucide-react";
import { useEffect, useState } from "react";

const narrative =
  "Q3 free cash flow came in $42M above plan, driven primarily by stronger-than-expected AR collections in LATAM [+$28M], linked to corn price strength. This was partially offset by elevated active-ingredient costs in Crop Protection [-$11M], correlated with the natural gas spike in mid-August. Working capital normalized within target bands across EMEA and APAC. Looking forward, the base case for FY26 holds revenue at $14.2B with EBITDA margin at 22.4%, leaving covenant headroom comfortably at 2.8×.";

export function ForecastPage() {
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!streaming) return;
    let i = 0;
    const id = setInterval(() => {
      i += 4;
      if (i >= narrative.length) { setText(narrative); setStreaming(false); clearInterval(id); }
      else setText(narrative.slice(0, i));
    }, 18);
    return () => clearInterval(id);
  }, [streaming]);

  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1500px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Forecast</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
          18-month FCF with confidence intervals
        </h1>
      </div>

      <Card>
        <CardHeader subtitle="Monthly · USD millions · P10 / P50 / P90 + board target" title="Free cash flow trajectory" />
        <div className="h-[360px] px-2 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cfoFcf} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="band2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.74 0.16 220)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.74 0.16 220)" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "oklch(1 0 0 / 8%)" }} />
              <YAxis stroke="oklch(0.7 0.02 250)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} width={50} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.035 250)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="p90" stroke="none" fill="url(#band2)" />
              <Area type="monotone" dataKey="p10" stroke="none" fill="oklch(0.18 0.03 250)" />
              <Line type="monotone" dataKey="p50" stroke="oklch(0.78 0.15 200)" strokeWidth={2} dot={false} />
              <ReferenceLine y={0} stroke="oklch(1 0 0 / 10%)" />
              <Line type="monotone" dataKey="target" stroke="oklch(0.78 0.15 70)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card glow="teal" className="overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal to-transparent" />
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal" />
            <h3 className="text-base font-semibold tracking-tight">AI board commentary</h3>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Claude · grounded</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-surface-2/60 inline-flex items-center gap-1.5"><Copy className="h-3 w-3" /> Copy</button>
            <button className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-surface-2/60 inline-flex items-center gap-1.5"><FileDown className="h-3 w-3" /> Export</button>
            <button
              onClick={() => { setText(""); setStreaming(true); }}
              className="text-xs font-semibold px-3 py-1.5 rounded-md bg-gradient-to-r from-teal to-cyan text-primary-foreground"
            >
              Generate commentary
            </button>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className={`relative rounded-lg border border-border bg-surface/40 p-4 text-sm leading-relaxed min-h-[140px] ${streaming ? "shimmer" : ""}`}>
            {text || <span className="text-muted-foreground">Click "Generate commentary" to draft Q3 board narrative grounded in current forecast and SHAP attributions.</span>}
            {streaming && <span className="inline-block w-2 h-4 bg-teal align-middle animate-pulse ml-0.5" />}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader subtitle="Base case" title="FY26 segment contribution" />
          <SegmentBars segments={[
            { name: "Crop Protection", v: 7800 },
            { name: "Seeds", v: 4200 },
            { name: "Other", v: 2200 },
          ]} />
        </Card>
        <Card>
          <CardHeader subtitle="Downside scenario" title="FY26 segment contribution" />
          <SegmentBars segments={[
            { name: "Crop Protection", v: 7100 },
            { name: "Seeds", v: 3900 },
            { name: "Other", v: 2020 },
          ]} />
          <div className="px-5 pb-5 text-xs text-muted-foreground">
            Δ vs base: <span className="text-destructive font-semibold">−$180M FCF</span>, primarily LATAM AR delay.
          </div>
        </Card>
      </div>
    </div>
  );
}

function SegmentBars({ segments }: { segments: { name: string; v: number }[] }) {
  const max = Math.max(...segments.map((s) => s.v));
  return (
    <div className="px-5 pb-4 space-y-3">
      {segments.map((s) => (
        <div key={s.name}>
          <div className="flex justify-between text-xs">
            <span>{s.name}</span>
            <span className="tabular-nums text-muted-foreground">${s.v.toLocaleString()}M</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal to-cyan" style={{ width: `${(s.v / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
