import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/reports")({
  component: () => <ComingSoon index="§ 05" label="趋势报告" en="Reports" />,
});
