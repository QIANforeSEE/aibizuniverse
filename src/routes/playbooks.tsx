import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/playbooks")({
  component: () => <ComingSoon index="§ 06" label="增长方法论" en="Playbooks" />,
});
