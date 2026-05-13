import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "teal" | "warning" | "danger" | "success";
}) {
  const glowMap = {
    teal: "before:bg-teal/30",
    warning: "before:bg-warning/30",
    danger: "before:bg-destructive/30",
    success: "before:bg-success/30",
  } as const;
  return (
    <div
      className={`relative rounded-xl border border-border bg-card/80 shadow-card ${
        glow ? `before:absolute before:inset-x-0 before:-top-px before:h-px ${glowMap[glow]}` : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between px-5 pt-5 pb-3">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</div>
        <h3 className="text-base font-semibold tracking-tight mt-0.5">{title}</h3>
      </div>
      {right}
    </div>
  );
}

export function Delta({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
        positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
      }`}
    >
      {positive ? "▲" : "▼"} {Math.abs(value).toFixed(1)}{suffix}
    </span>
  );
}

export function StatusDot({ tone }: { tone: "success" | "warning" | "danger" }) {
  const map = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };
  return (
    <span className={`relative inline-block h-2 w-2 rounded-full bg-current ${map[tone]} glow-dot`} />
  );
}
