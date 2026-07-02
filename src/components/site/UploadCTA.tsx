import { Link } from "@tanstack/react-router";
import { Upload, LayoutDashboard, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Kind = "article" | "video" | "podcast" | "report";

const COPY: Record<Kind, { cn: { title: string; sub: string }; en: { title: string; sub: string } }> = {
  article: {
    cn: { title: "有观点想发表?", sub: "上载你的文章、分析或案例,编辑部 48 小时内审核。" },
    en: { title: "Got an insight?", sub: "Upload your article, analysis or case — editorial review within 48 hours." },
  },
  video: {
    cn: { title: "有视频想上线?", sub: "上载纪录短片、访谈、圆桌或品牌特稿。" },
    en: { title: "Have a film?", sub: "Upload documentary shorts, interviews, roundtables or brand features." },
  },
  podcast: {
    cn: { title: "有播客节目?", sub: "上载音频节目、访谈或圆桌。" },
    en: { title: "Have a podcast?", sub: "Upload audio episodes, interviews or roundtables." },
  },
  report: {
    cn: { title: "有研究报告?", sub: "上载 PDF 白皮书、趋势报告或方法论。" },
    en: { title: "Have a report?", sub: "Upload PDF whitepapers, trend reports or playbooks." },
  },
};

export function UploadCTA({ kind }: { kind: Kind }) {
  const { lang } = useLang();
  const c = COPY[kind][lang];
  return (
    <section className="border-y-2 border-foreground bg-gradient-to-r from-lime/25 via-signal/15 to-violet/25">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-5 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-10">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-lime">
            <Upload className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet">
              {lang === "cn" ? "上载 · 管理入口" : "Upload · Manage"}
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold leading-tight lg:text-3xl">{c.title}</h3>
            <p className="mt-1 max-w-xl text-[13px] text-foreground/75">{c.sub}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/upload"
            search={{ type: kind }}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-violet"
          >
            <Upload className="h-4 w-4" />
            {lang === "cn" ? "一键上载" : "Upload now"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/upload"
            search={{ type: kind, view: "manage" }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background"
          >
            <LayoutDashboard className="h-4 w-4" />
            {lang === "cn" ? "内容管理" : "Manage"}
          </Link>
        </div>
      </div>
    </section>
  );
}
