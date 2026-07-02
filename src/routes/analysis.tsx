import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { UploadCTA } from "@/components/site/UploadCTA";
import { featured, signals } from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/analysis")({
  head: () =>
    buildStaticHead({
      path: "/analysis",
      title: "商业分析 · Business Analysis — AI商业宇宙 · AI Business Universe",
      description:
        "AI 商业深度分析、战略拆解与产业洞察 · Deep AI business analysis, strategic teardowns and industry insight.",
    }),
  component: AnalysisPage,
});

function AnalysisPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <SiteLayout>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <SectionLabel index="§ 02" label={lang === "cn" ? "商业分析" : "Business Analysis"} en="Business Analysis" color="violet" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] lg:text-7xl">
            {lang === "cn" ? (<>AI 时代的<span className="text-violet"> 深度分析</span></>) : (<>Deep <span className="text-violet">analysis</span> for the AI era</>)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/75">
            {lang === "cn"
              ? "战略拆解、案例研究、产业洞察 — 面向 CEO、CMO 与创新负责人的结构化 AI 商业分析。"
              : "Strategic teardowns, case studies and industry insight — structured AI business analysis for CEOs, CMOs and innovation leads."}
          </p>
        </div>
      </section>

      <UploadCTA kind="article" />

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <SectionLabel index="A · 01" label={lang === "cn" ? "精选分析" : "Featured Analysis"} en="Featured" color="lime" />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {featured.map((a) => (
            <Link key={a.slug} to="/article/$slug" params={{ slug: a.slug }} className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{t(a.category)}</div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight group-hover:text-violet lg:text-3xl">{t(a.title)}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{t(a.excerpt)}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold text-foreground">
                {lang === "cn" ? "阅读全文" : "Read more"} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
          <SectionLabel index="A · 02" label={lang === "cn" ? "商业信号" : "Signals"} en="Signals" color="signal" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {signals.map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-background p-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.tag}</div>
                <div className="mt-2 font-display text-lg font-bold leading-tight">{t(s.title)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
