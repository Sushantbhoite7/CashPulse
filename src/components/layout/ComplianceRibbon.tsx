import { Lock, ScrollText, Clock, ShieldCheck } from "lucide-react";

export function ComplianceRibbon() {
  const items = [
    { icon: Lock, label: "Encrypted at rest" },
    { icon: Lock, label: "TLS 1.3 in transit" },
    { icon: ScrollText, label: "Audit logging active" },
    { icon: Clock, label: "90-day retention" },
    { icon: ShieldCheck, label: "SOC2 Type II" },
  ];
  return (
    <footer className="border-t border-border bg-surface/40 px-6 py-2">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] text-muted-foreground">
        {items.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <Icon className="h-3 w-3 text-teal" /> {label}
          </span>
        ))}
        <span className="ml-auto">© 2026 Syngenta Group · CashPulse</span>
      </div>
    </footer>
  );
}
