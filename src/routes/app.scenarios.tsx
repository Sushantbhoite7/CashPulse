import { createFileRoute } from "@tanstack/react-router";
import { ScenariosPage } from "@/components/pages/ScenariosPage";
export const Route = createFileRoute("/app/scenarios")({ component: ScenariosPage });
