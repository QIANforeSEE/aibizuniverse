import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    buildStaticHead({
      path: "/about",
      title: "关于我们 · About — AI商业宇宙 · AI Business Universe",
      description:
        "AI+ 时代商业增长智库。看懂 AI、使用 AI、部署 AI、用 AI 驱动商业增长 · The AI-era business growth intelligence platform.",
    }),
  component: () => <ComingSoon index="§ 09" label="关于我们" en="About" />,
});
