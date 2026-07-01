import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/analysis")({
  component: () => <ComingSoon index="§ 02" label="商业分析" en="Business Analysis" />,
});
