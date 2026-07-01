import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/trends")({
  component: () => <ComingSoon index="§ 04" label="行业趋势" en="Trends" />,
});
