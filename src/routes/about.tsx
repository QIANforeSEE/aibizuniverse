import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/about")({
  component: () => <ComingSoon index="§ 09" label="关于我们" en="About" />,
});
