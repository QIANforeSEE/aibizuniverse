import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/agent")({
  component: () => <ComingSoon index="§ 08" label="AI 商业宇宙智能体" en="AI Business Universe Agent" />,
});
