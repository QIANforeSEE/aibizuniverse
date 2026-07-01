import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/ai-now")({
  head: () => ({
    meta: [
      { title: "AI 最新 · AI Now — AI商业宇宙" },
      { name: "description", content: "全球 AI 商业信号、平台动态、Key Player 最新变化。" },
    ],
  }),
  component: () => <ComingSoon index="§ 01" label="AI 最新" en="AI Now" />,
});

export function ComingSoon({ index, label, en }: { index: string; label: string; en: string }) {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <SectionLabel index={index} label={label} en={en} color="violet" />
        <h1 className="mt-6 font-display text-6xl font-bold leading-[1.02] tracking-tight lg:text-8xl">
          {label}
          <span className="text-violet">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
          这个板块正在编辑部生产中 · Coming Soon。当前展示的是首页 MVP，后续将陆续开放深度分析、Key Players 详情、报告下载与 AI Agent 问答系统。
        </p>
      </section>
    </SiteLayout>
  );
}
