import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: Array<{ name: string; value: number }>;
  category?: string;
  index?: string;
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
}

const colorMap: Record<string, string> = {
  cyan: "var(--cyan)",
  violet: "oklch(0.65 0.18 280)",
  slate: "var(--muted-foreground)",
  teal: "var(--teal)",
  emerald: "var(--success)",
  amber: "var(--warning)",
  rose: "var(--destructive)",
};

export function DonutChart({
  data,
  colors = ["cyan", "violet", "slate"],
  className,
  valueFormatter = (v) => v.toString(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category: _category,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index: _index,
}: DonutChartProps) {
  const resolvedColors = colors.map((c) => colorMap[c] || c);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={resolvedColors[index % resolvedColors.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-lg">
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-muted-foreground">{valueFormatter(item.value)}</div>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
