import { Card, CardHeader } from "@/components/dashboard/Primitives";

export function SettingsPage() {
  return (
    <div className="px-4 md:px-6 py-6 space-y-6 max-w-[1100px] mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Settings</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Workspace</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader subtitle="Profile" title="Account" />
          <div className="px-5 pb-5 space-y-3 text-sm">
            <Row label="Name" value="Sarah Patel" />
            <Row label="Email" value="s.patel@cashpulse.io" />
            <Row label="Role" value="Treasurer" />
            <Row label="Tenant" value="cashpulse-prod" />
          </div>
        </Card>
        <Card>
          <CardHeader subtitle="Security" title="Access & RBAC" />
          <div className="px-5 pb-5 space-y-3 text-sm">
            <Row label="MFA" value="Enabled (FIDO2)" tone />
            <Row label="SSO" value="Azure AD" tone />
            <Row label="API keys" value="2 active" />
            <Row label="Session timeout" value="30 min" />
          </div>
        </Card>
        <Card>
          <CardHeader subtitle="Notifications" title="Alerts" />
          <div className="px-5 pb-5 space-y-3 text-sm">
            <Toggle label="Liquidity breach alerts" on />
            <Toggle label="FX move > 2%" on />
            <Toggle label="Scenario approval requests" on />
            <Toggle label="Weekly executive digest" />
          </div>
        </Card>
        <Card>
          <CardHeader subtitle="Tenant" title="Data retention" />
          <div className="px-5 pb-5 space-y-3 text-sm">
            <Row label="Forecast snapshots" value="90 days" />
            <Row label="Audit log" value="7 years" />
            <Row label="PII handling" value="Tokenized" tone />
            <Row label="Encryption" value="AES-256 + TLS 1.3" tone />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: boolean }) {
  return (
    <div className="flex justify-between border-b border-border/50 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={tone ? "text-success font-medium" : "font-medium"}>{value}</span>
    </div>
  );
}
function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${on ? "bg-teal" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </div>
  );
}
