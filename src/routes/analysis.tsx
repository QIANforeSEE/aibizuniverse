import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/analysis")({
  head: () =>
    buildStaticHead({
      path: "/analysis",
      title: "商业分析 · Business Analysis — AI商业宇宙 · AI Business Universe",
      description:
        "AI 商业深度分析、战略拆解与产业洞察 · Deep AI business analysis, strategic teardowns and industry insight.",
    }),
  component: () => <ComingSoon index="§ 02" label="商业分析" en="Business Analysis" />,
});
