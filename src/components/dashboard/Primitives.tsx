import { type ReactNode } from "react";
import { Card as TremorCard } from "@tremor/react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TremorCard className={`bg-card border border-border p-6 ${className}`}>
      {children}
    </TremorCard>
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
    <span className={`relative inline-block h-2 w-2 rounded-full bg-current ${map[tone]} glow-dot`} />
  );
}
