import { createFileRoute } from "@tanstack/react-router";
import { LineagePage } from "@/components/pages/LineagePage";
export const Route = createFileRoute("/app/lineage")({ component: LineagePage });
