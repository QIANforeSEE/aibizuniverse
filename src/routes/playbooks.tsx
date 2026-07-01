import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/playbooks")({
  head: () =>
    buildStaticHead({
      path: "/playbooks",
      title: "增长方法论 · Playbooks — AI商业宇宙 · AI Business Universe",
      description:
        "面向 CEO、CMO 与广告主的 AI 增长方法论与作战手册 · AI growth playbooks for CEOs, CMOs and advertisers.",
    }),
  component: () => <ComingSoon index="§ 06" label="增长方法论" en="Playbooks" />,
});
