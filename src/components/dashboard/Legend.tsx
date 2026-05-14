import { cn } from "@/lib/utils";

interface LegendProps {
  categories: string[];
  colors?: string[];
  className?: string;
}

const colorMap: Record<string, string> = {
  cyan: "bg-cyan",
  violet: "bg-[oklch(0.65_0.18_280)]",
  slate: "bg-muted-foreground",
  teal: "bg-teal",
  emerald: "bg-success",
  amber: "bg-warning",
  rose: "bg-destructive",
};

export function Legend({ categories, colors = ["cyan", "violet", "slate"], className }: LegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-4 gap-y-2", className)}>
      {categories.map((category, i) => (
        <div key={category} className="flex items-center gap-2">
          <span 
            className={cn(
              "h-3 w-3 rounded-sm",
              colorMap[colors[i % colors.length]] || "bg-muted"
            )} 
          />
          <span className="text-xs text-muted-foreground">{category}</span>
        </div>
      ))}
    </div>
  );
}
