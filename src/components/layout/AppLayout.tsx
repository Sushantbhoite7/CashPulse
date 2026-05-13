import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { ComplianceRibbon } from "./ComplianceRibbon";
import { ChatDrawer } from "@/components/ai/ChatDrawer";
import { AppProvider } from "@/lib/store";

export function AppLayout() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <div className="flex flex-1 flex-col min-w-0">
            <TopNav />
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
            <ComplianceRibbon />
          </div>
        </div>
        <ChatDrawer />
      </div>
    </AppProvider>
  );
}
