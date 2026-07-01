import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { reports, type ReportItem } from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";
import { buildDetailHead } from "@/lib/seo";

export const Route = createFileRoute("/reports/$slug")({
  loader: ({ params }) => {
    const r = reports.find((x) => x.slug === params.slug);
    if (!r) throw notFound();
    return r;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: `Report · AI商业宇宙 · AI Business Universe` }] };
    }
    return buildDetailHead({
      path: `/reports/${params.slug}`,
      title: loaderData.title,
      description: loaderData.excerpt,
      type: "article",
    });
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Report not found</h1>
        <Link to="/reports" className="mt-6 inline-block text-sm underline">
          Back to Reports
        </Link>
      </div>
    </SiteLayout>
  ),
  component: ReportDetail,
});

const chip = {
  lime: "bg-lime text-foreground",
  violet: "bg-violet text-white",
  signal: "bg-signal text-foreground",
  alert: "bg-alert text-white",
} as const;

function ReportDetail() {
  const r = Route.useLoaderData() as ReportItem;
  const t = useT();
  const { lang } = useLang();
  return (
    <SiteLayout>
      <article>
        <div className="border-b border-border bg-paper">
          <div className="mx-auto max-w-[1000px] px-6 py-14 lg:px-10 lg:py-20">
            <Link to="/reports" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> {lang === "cn" ? "返回报告频道" : "Back to Reports"}
            </Link>
            <div className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className={`rounded-full px-2.5 py-1 ${chip[r.color]}`}>{t(r.tag)}</span>
              <span className="text-muted-foreground">{r.published}</span>
              <span className="text-muted-foreground">· {r.pages}p · {r.format}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground lg:text-6xl">
              {t(r.title)}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{t(r.excerpt)}</p>
          </div>
        </div>

        <div className="mx-auto max-w-[1000px] px-6 py-16 lg:px-10 lg:py-24">
          {r.highlights && r.highlights.length > 0 && (
            <section>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {lang === "cn" ? "报告核心亮点" : "Report Highlights"}
              </div>
              <ul className="mt-6 space-y-4 text-[17px] leading-[1.7]">
                {r.highlights.map((h, i) => (
                  <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                    <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t(h)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12 rounded-lg border border-border bg-foreground p-8 text-background">
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-lime">
                  <FileText className="h-3 w-3" /> {r.format} · {r.pages}p
                </div>
                <h2 className="mt-2 font-display text-2xl leading-tight lg:text-3xl">
                  {lang === "cn" ? "申请下载完整报告" : "Request the full report"}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-background/70">
                  {lang === "cn"
                    ? "填写企业邮箱,我们将在 24 小时内发送完整版报告与配套解读电话会。"
                    : "Share your work email and we'll send the full report and a briefing call within 24 hours."}
                </p>
              </div>
              <a
                href="mailto:report@aibizuniverse.com"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-foreground"
              >
                <Download className="h-4 w-4" /> {lang === "cn" ? "申请下载" : "Request download"}
              </a>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
