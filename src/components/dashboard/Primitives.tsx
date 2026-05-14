import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={cn("rounded-xl bg-card border border-border p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        {subtitle && <div className="text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</div>}
        <h3 className="text-base font-semibold tracking-tight mt-0.5">{title}</h3>
      </div>
      {right}
    </div>
  );
}

export function StatusDot({ tone }: { tone: "success" | "warning" | "danger" }) {
  const map = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };
  return (
    <span className={cn("relative inline-block h-2 w-2 rounded-full bg-current glow-dot", map[tone])} />
  );
}

// Enterprise Badge Component
interface BadgeProps {
  children: ReactNode;
  color?: "emerald" | "amber" | "red" | "cyan" | "gray" | "teal" | "blue";
  size?: "sm" | "md";
  className?: string;
}

const badgeColorMap = {
  emerald: "bg-success/15 text-success border-success/25",
  amber: "bg-warning/15 text-warning border-warning/25",
  red: "bg-destructive/15 text-destructive border-destructive/25",
  cyan: "bg-cyan/15 text-cyan border-cyan/25",
  teal: "bg-teal/15 text-teal border-teal/25",
  blue: "bg-primary/15 text-primary border-primary/25",
  gray: "bg-muted text-muted-foreground border-border",
};

export function Badge({ children, color = "gray", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        badgeColorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}

// Enterprise Progress Bar
interface ProgressBarProps {
  value: number;
  color?: "teal" | "cyan" | "emerald" | "amber" | "red";
  className?: string;
  showLabel?: boolean;
}

const progressColorMap = {
  teal: "bg-teal",
  cyan: "bg-cyan",
  emerald: "bg-success",
  amber: "bg-warning",
  red: "bg-destructive",
};

export function ProgressBar({ value, color = "teal", className, showLabel }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-300", progressColorMap[color])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="tabular-nums text-xs text-muted-foreground w-10 text-right">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}

// Enterprise Tracker (uptime visualization)
interface TrackerDataItem {
  color: "emerald" | "red" | "amber" | "gray";
  tooltip?: string;
}

interface TrackerProps {
  data: TrackerDataItem[];
  className?: string;
}

const trackerColorMap = {
  emerald: "bg-success",
  red: "bg-destructive",
  amber: "bg-warning",
  gray: "bg-muted",
};

export function Tracker({ data, className }: TrackerProps) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {data.map((item, i) => (
        <div
          key={i}
          className={cn(
            "h-6 flex-1 rounded-sm transition-colors hover:opacity-80",
            trackerColorMap[item.color]
          )}
          title={item.tooltip}
        />
      ))}
    </div>
  );
}

// Enterprise Callout
interface CalloutProps {
  title: string;
  children: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  color?: "amber" | "blue" | "red" | "emerald";
  className?: string;
}

const calloutColorMap = {
  amber: "border-warning/30 bg-warning/5",
  blue: "border-primary/30 bg-primary/5",
  red: "border-destructive/30 bg-destructive/5",
  emerald: "border-success/30 bg-success/5",
};

const calloutIconColorMap = {
  amber: "text-warning",
  blue: "text-primary",
  red: "text-destructive",
  emerald: "text-success",
};

export function Callout({ title, children, icon: Icon, color = "blue", className }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        calloutColorMap[color],
        className
      )}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", calloutIconColorMap[color])} />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{children}</p>
        </div>
      </div>
    </div>
  );
}

// Enterprise Bar List (horizontal bar chart)
interface BarListItem {
  name: string;
  value: number;
}

interface BarListProps {
  data: BarListItem[];
  color?: "cyan" | "teal" | "rose" | "emerald" | "amber";
  className?: string;
}

const barListColorMap = {
  cyan: "bg-cyan",
  teal: "bg-teal",
  rose: "bg-destructive",
  emerald: "bg-success",
  amber: "bg-warning",
};

export function BarList({ data, color = "teal", className }: BarListProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  
  return (
    <div className={cn("space-y-2", className)}>
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="relative h-8 rounded-full bg-muted/50 overflow-hidden">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                  barListColorMap[color]
                )}
                style={{ width: `${(item.value / maxValue) * 100}%`, opacity: 0.8 }}
              />
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-xs font-medium text-foreground truncate">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Donut Chart using Recharts
export { DonutChart } from "./DonutChart";
export { Legend } from "./Legend";
