import { createFileRoute } from "@tanstack/react-router";
import { GovernancePage } from "@/components/pages/GovernancePage";
export const Route = createFileRoute("/app/governance")({ component: GovernancePage });
