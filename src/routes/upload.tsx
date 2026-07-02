import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Film, Mic, FileBarChart2, CheckCircle2, ImagePlus } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";
import { buildStaticHead } from "@/lib/seo";

type Kind = "article" | "video" | "podcast" | "report";

const KINDS: { id: Kind; icon: typeof FileText; cn: string; en: string; note: { cn: string; en: string } }[] = [
  { id: "article", icon: FileText, cn: "文章 · 分析", en: "Article", note: { cn: "深度分析 / 案例拆解 / 观点评论", en: "Analysis, case study, essay" } },
  { id: "video", icon: Film, cn: "视频", en: "Video", note: { cn: "封面故事、访谈、创意短片", en: "Cover films, interviews, shorts" } },
  { id: "podcast", icon: Mic, cn: "播客", en: "Podcast", note: { cn: "音频节目 / 圆桌", en: "Audio episodes, roundtables" } },
  { id: "report", icon: FileBarChart2, cn: "报告", en: "Report", note: { cn: "白皮书 / 趋势报告 / 方法论", en: "Whitepapers, trend reports" } },
];

export const Route = createFileRoute("/upload")({
  head: () =>
    buildStaticHead({
      path: "/upload",
      title: "内容上载与管理 · Upload — AI商业宇宙",
      description:
        "编辑与合作方入口:上载文章、视频、播客、报告并管理已发布内容 · Editorial and partner entry to upload articles, videos, podcasts and reports.",
    }),
  component: UploadPage,
});

function UploadPage() {
  const { lang } = useLang();
  const [kind, setKind] = useState<Kind>("article");
  const [sent, setSent] = useState(false);
  const active = KINDS.find((k) => k.id === kind)!;

  return (
    <SiteLayout>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <SectionLabel index="§ CMS" label={lang === "cn" ? "内容上载 · 管理入口" : "Upload · Manage"} en="Content Studio" color="lime" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] lg:text-7xl">
            {lang === "cn" ? (<>把你的洞察 <span className="text-lime px-1 bg-foreground">发布到宇宙</span>。</>) : (<>Publish your insight <span className="text-lime px-1 bg-foreground">into the universe</span>.</>)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-foreground/75">
            {lang === "cn"
              ? "编辑、合作作者与机构合作方可通过本页上载文章、视频、播客与报告,提交后由编辑部审核发布。"
              : "Editors, contributors and institutional partners can upload articles, videos, podcasts and reports. Editorial review before publication."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {KINDS.map((k) => {
            const Icon = k.icon;
            const on = kind === k.id;
            return (
              <button
                key={k.id}
                onClick={() => { setKind(k.id); setSent(false); }}
                className={
                  "group rounded-2xl border-2 p-6 text-left transition-all " +
                  (on ? "border-foreground bg-foreground text-background shadow-[6px_6px_0_0_var(--color-lime)]" : "border-border bg-card hover:border-foreground")
                }
              >
                <Icon className={"h-6 w-6 " + (on ? "text-lime" : "text-violet")} />
                <div className="mt-4 font-display text-xl font-bold">{lang === "cn" ? k.cn : k.en}</div>
                <div className={"mt-1 text-[12px] " + (on ? "text-background/70" : "text-muted-foreground")}>
                  {lang === "cn" ? k.note.cn : k.note.en}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-2xl border-2 border-foreground bg-background p-6 lg:p-8"
          >
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-violet">
              <Upload className="h-3.5 w-3.5" /> {lang === "cn" ? "上载表单" : "Upload form"} · {lang === "cn" ? active.cn : active.en}
            </div>

            {sent ? (
              <div className="mt-8 flex items-start gap-3 rounded-xl bg-lime/25 p-6">
                <CheckCircle2 className="mt-0.5 h-6 w-6" />
                <div>
                  <div className="font-display text-xl font-bold">{lang === "cn" ? "已提交审核" : "Submitted for review"}</div>
                  <div className="mt-1 text-[13px] text-foreground/75">
                    {lang === "cn"
                      ? "编辑部会在 48 小时内审核并回复。可在下方“内容管理”查看状态。"
                      : "Editorial will review within 48 hours. Track status in Content Manager below."}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <Field label={lang === "cn" ? "标题 (中文)" : "Title (CN)"} required>
                  <input required className="inp" />
                </Field>
                <Field label={lang === "cn" ? "标题 (英文)" : "Title (EN)"} required>
                  <input required className="inp" />
                </Field>
                <Field label={lang === "cn" ? "摘要" : "Excerpt"} required>
                  <textarea required rows={3} className="inp" />
                </Field>

                {kind === "article" && (
                  <Field label={lang === "cn" ? "正文 (Markdown)" : "Body (Markdown)"} required>
                    <textarea required rows={8} className="inp font-mono text-[13px]" />
                  </Field>
                )}

                {kind === "video" && (
                  <>
                    <Field label={lang === "cn" ? "视频文件 或 URL" : "Video file or URL"} required>
                      <input required className="inp" placeholder="https://... or upload .mp4" />
                    </Field>
                    <Field label={lang === "cn" ? "时长" : "Duration"}><input className="inp" placeholder="08:24" /></Field>
                  </>
                )}

                {kind === "podcast" && (
                  <>
                    <Field label={lang === "cn" ? "音频文件 或 URL" : "Audio file or URL"} required>
                      <input required className="inp" placeholder="https://... or upload .mp3" />
                    </Field>
                    <Field label={lang === "cn" ? "嘉宾" : "Guest"}><input className="inp" /></Field>
                  </>
                )}

                {kind === "report" && (
                  <>
                    <Field label={lang === "cn" ? "PDF 文件" : "PDF file"} required>
                      <input required type="file" accept="application/pdf" className="inp" />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label={lang === "cn" ? "页数" : "Pages"}><input className="inp" type="number" /></Field>
                      <Field label={lang === "cn" ? "格式" : "Format"}><input className="inp" defaultValue="PDF" /></Field>
                    </div>
                  </>
                )}

                <Field label={lang === "cn" ? "封面图" : "Cover image"}>
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-paper p-4 text-sm text-muted-foreground">
                    <ImagePlus className="h-5 w-5" /> <input type="file" accept="image/*" className="text-xs" />
                  </div>
                </Field>

                <Field label={lang === "cn" ? "标签 (逗号分隔)" : "Tags (comma separated)"}>
                  <input className="inp" placeholder="Agent, GEO, Brand" />
                </Field>

                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:bg-violet">
                  <Upload className="h-4 w-4" /> {lang === "cn" ? "提交审核" : "Submit for review"}
                </button>
              </div>
            )}
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {lang === "cn" ? "内容管理" : "Content Manager"}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">
                {lang === "cn" ? "已发布 · 待审 · 草稿" : "Published · Pending · Drafts"}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { s: "Published", t: lang === "cn" ? "AI 走进董事会" : "AI enters the boardroom", k: "Article", color: "bg-lime" },
                  { s: "Pending", t: lang === "cn" ? "GEO 品牌可见性实验" : "GEO brand visibility trial", k: "Report", color: "bg-signal" },
                  { s: "Draft", t: lang === "cn" ? "算力经济的液态涌动" : "Liquid surge of compute", k: "Video", color: "bg-alert" },
                ].map((r) => (
                  <li key={r.t} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2">
                    <span className={"rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest " + r.color + " text-foreground"}>{r.s}</span>
                    <span className="flex-1 truncate text-foreground/85">{r.t}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{r.k}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-muted-foreground">
                {lang === "cn" ? "完整 CMS 与权限系统将随 Cloud 后台上线。" : "Full CMS with roles ships with the Cloud backend."}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-foreground p-6 text-background">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-lime">
                {lang === "cn" ? "编辑准则" : "Editorial Standard"}
              </div>
              <ul className="mt-3 space-y-2 text-[13px] text-background/85">
                <li>· {lang === "cn" ? "原创、有观点、可执行" : "Original, opinionated, actionable"}</li>
                <li>· {lang === "cn" ? "中英双语字段" : "Bilingual CN/EN fields"}</li>
                <li>· {lang === "cn" ? "标注数据来源" : "Cite data sources"}</li>
                <li>· {lang === "cn" ? "禁止硬广与洗稿" : "No advertorial, no plagiarism"}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <style>{`.inp{width:100%;border:1px solid var(--color-border);border-radius:8px;padding:10px 12px;font-size:14px;background:transparent;outline:none}.inp:focus{border-color:var(--color-foreground)}`}</style>
    </SiteLayout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-alert">*</span>}
      </span>
      {children}
    </label>
  );
}
