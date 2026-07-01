import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/consulting")({
  component: () => <ComingSoon index="§ 07" label="咨询 · 培训 · 共创" en="Consulting" />,
});
