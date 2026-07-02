import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ArrowUpRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { UploadCTA } from "@/components/site/UploadCTA";
import { reports } from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports · 趋势报告 · AI商业宇宙 · AI Business Universe" },
      {
        name: "description",
        content:
          "AI 商业趋势旗舰报告、企业 Agent 落地指南、GEO/AEO 增长手册与品牌媒体白皮书 · Flagship AI business trends, enterprise Agent playbooks, GEO/AEO handbooks and brand-as-media reports.",
      },
      { property: "og:title", content: "Reports · AI商业宇宙 · AI Business Universe" },
      {
        property: "og:description",
        content:
          "AI 商业趋势报告、白皮书与指南 · AI business trend reports, whitepapers and playbooks.",
      },
      { property: "og:url", content: "https://aibizuniverse.lovable.app/reports" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://aibizuniverse.lovable.app/reports" }],
  }),
  component: ReportsPage,
});

const chip = {
  lime: "bg-lime text-foreground",
  violet: "bg-violet text-white",
  signal: "bg-signal text-foreground",
  alert: "bg-alert text-white",
} as const;

function ReportsPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <SiteLayout>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <span className="rounded-full bg-foreground px-3 py-1 text-background">§ 05 · Reports</span>
            <span className="h-px flex-1 bg-border" />
            <span>{lang === "cn" ? "旗舰报告 · 白皮书 · 指南" : "Flagship · Whitepaper · Playbook"}</span>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] lg:text-7xl">
            {lang === "cn" ? "趋势报告" : "Reports"} <span className="text-violet">/ Intelligence</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/75">
            {lang === "cn"
              ? "面向 CEO、CMO、创新负责人的结构化 AI 商业情报。年度旗舰报告、白皮书与增长手册,可下载、可引用。"
              : "Structured AI business intelligence for CEOs, CMOs and innovation leads. Flagship annuals, whitepapers and growth handbooks — downloadable and citable."}
          </p>
        </div>
      </section>

      <UploadCTA kind="report" />

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <SectionLabel index="R · 01" label={lang === "cn" ? "全部报告" : "All Reports"} en="All Reports" color="violet" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reports.map((r) => (
            <Link
              key={r.id}
              to="/reports/$slug"
              params={{ slug: r.slug }}
              className="group flex flex-col gap-5 rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] lg:p-8"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em]">
                <span className={`rounded-full px-2.5 py-1 ${chip[r.color]}`}>{t(r.tag)}</span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-3 w-3" /> {r.pages}p · {r.format}
                </span>
              </div>
              <h2 className="font-display text-2xl leading-snug group-hover:text-violet lg:text-3xl">{t(r.title)}</h2>
              <p className="text-sm text-muted-foreground lg:text-base">{t(r.excerpt)}</p>
              <div className="mt-auto inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-foreground">
                {lang === "cn" ? "查看报告" : "View report"} <ArrowUpRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
