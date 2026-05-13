import { createFileRoute } from "@tanstack/react-router";
import { DriversPage } from "@/components/pages/DriversPage";
export const Route = createFileRoute("/app/drivers")({ component: DriversPage });
