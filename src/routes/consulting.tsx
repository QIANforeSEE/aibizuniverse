import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/consulting")({
  head: () =>
    buildStaticHead({
      path: "/consulting",
      title: "咨询 · 培训 · 共创 · Consulting — AI商业宇宙 · AI Business Universe",
      description:
        "AI 商业增长诊断、战略工作坊、Agent 共创营与企业转型陪跑服务 · AI growth diagnostics, workshops, agent co-build camps and transformation retainers.",
    }),
  component: () => <ComingSoon index="§ 07" label="咨询 · 培训 · 共创" en="Consulting" />,
});
