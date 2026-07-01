import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/key-players")({
  head: () =>
    buildStaticHead({
      path: "/key-players",
      title: "Key Players · Global AI Players — AI商业宇宙 · AI Business Universe",
      description:
        "全球 AI 商业化关键玩家的战略打分、动态与解读 · Strategic scorecards and moves of the global AI Key Players.",
    }),
  component: () => <ComingSoon index="§ 03" label="Key Players" en="Global AI Players" />,
});
