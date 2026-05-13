import { createFileRoute } from "@tanstack/react-router";
import { ForecastPage } from "@/components/pages/ForecastPage";
export const Route = createFileRoute("/app/forecast")({ component: ForecastPage });
