import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  Upload, FileText, Film, Mic, FileBarChart2, CheckCircle2, ImagePlus,
  LayoutDashboard, Plus, Pencil, Trash2, AlertCircle, Loader2,
} from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { ContactChannels } from "@/components/site/ContactChannels";
import { useLang } from "@/lib/i18n";
import { buildStaticHead } from "@/lib/seo";
import {
  FILE_LIMITS, COVER_LIMIT, MSG, TAKEN_SLUGS,
  slugify, validateFile, validateUpload,
  type Kind, type FieldError,
} from "@/lib/upload-validation";
import { featured, reports, videos, audios } from "@/lib/mock-data";

type View = "upload" | "manage";
type Mode = "new" | "edit";

const KINDS: { id: Kind; icon: typeof FileText; cn: string; en: string; note: { cn: string; en: string } }[] = [
  { id: "article", icon: FileText, cn: "文章 · 分析", en: "Article", note: { cn: "深度分析 / 案例拆解 / 观点评论", en: "Analysis, case study, essay" } },
  { id: "video", icon: Film, cn: "视频", en: "Video", note: { cn: "封面故事、访谈、创意短片", en: "Cover films, interviews, shorts" } },
  { id: "podcast", icon: Mic, cn: "播客", en: "Podcast", note: { cn: "音频节目 / 圆桌", en: "Audio episodes, roundtables" } },
  { id: "report", icon: FileBarChart2, cn: "报告", en: "Report", note: { cn: "白皮书 / 趋势报告 / 方法论", en: "Whitepapers, trend reports" } },
];

const searchSchema = z.object({
  type: z.enum(["article", "video", "podcast", "report"]).optional(),
  view: z.enum(["upload", "manage"]).optional(),
  mode: z.enum(["new", "edit"]).optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
});

export const Route = createFileRoute("/upload")({
  validateSearch: searchSchema,
  head: () =>
    buildStaticHead({
      path: "/upload",
      title: "内容上载与管理 · Upload — AI商业宇宙",
      description:
        "编辑与合作方入口:上载文章、视频、播客、报告并管理已发布内容 · Editorial and partner entry to upload articles, videos, podcasts and reports.",
    }),
  component: UploadPage,
});

// Look up an existing item by slug across all mock content, so an Edit
// deep-link from any card can prefill CN/EN titles + excerpt automatically.
function lookupBySlug(slug: string, kind: Kind) {
  if (kind === "article") return featured.find((x) => x.slug === slug);
  if (kind === "report") return reports.find((x) => x.slug === slug);
  if (kind === "video") return videos.find((x) => x.slug === slug);
  return audios.find((x) => x.slug === slug);
}

type FormState = {
  titleCn: string;
  titleEn: string;
  excerpt: string;
  body: string;
  mediaUrl: string;
  duration: string;
  guest: string;
  pages: string;
  format: string;
  tags: string;
  mediaFile: File | null;
  coverFile: File | null;
};

const EMPTY: FormState = {
  titleCn: "", titleEn: "", excerpt: "", body: "", mediaUrl: "",
  duration: "", guest: "", pages: "", format: "PDF", tags: "",
  mediaFile: null, coverFile: null,
};

function UploadPage() {
  const { lang } = useLang();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/upload" });
  const [kind, setKind] = useState<Kind>(search.type ?? "article");
  const [view, setView] = useState<View>(search.view ?? "upload");
  const [mode, setMode] = useState<Mode>(search.mode ?? "new");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const active = KINDS.find((k) => k.id === kind)!;

  // Prefill from ?slug= / ?title= so both New and Edit deep-links carry over.
  useEffect(() => {
    if (search.type && search.type !== kind) setKind(search.type);
    if (search.view && search.view !== view) setView(search.view);
    if (search.mode && search.mode !== mode) setMode(search.mode);

    if (search.mode === "edit" && search.slug) {
      const item = lookupBySlug(search.slug, search.type ?? kind);
      if (item) {
        const t = item.title as any;
        const e = (item as any).excerpt;
        setForm((f) => ({
          ...f,
          titleCn: typeof t === "string" ? t : t.cn,
          titleEn: typeof t === "string" ? t : t.en,
          excerpt: !e ? f.excerpt : typeof e === "string" ? e : e.cn,
        }));
      } else if (search.title) {
        setForm((f) => ({ ...f, titleEn: search.title!, titleCn: search.title! }));
      }
      setSent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.type, search.view, search.mode, search.slug, search.title]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors.length) setErrors((prev) => prev.filter((e) => e.field !== k));
  };

  const updateKind = (k: Kind) => {
    setKind(k);
    setSent(false);
    setErrors([]);
    navigate({ search: { ...search, type: k } });
  };
  const updateView = (v: View) => {
    setView(v);
    navigate({ search: { ...search, view: v } });
  };
  const startNew = () => {
    setMode("new");
    setForm(EMPTY);
    setSent(false);
    setErrors([]);
    navigate({ search: { type: kind, view: "upload", mode: "new" } });
  };
  const startEdit = (slug: string, title: string) => {
    setMode("edit");
    setView("upload");
    setSent(false);
    setErrors([]);
    navigate({ search: { type: kind, view: "upload", mode: "edit", slug, title } });
  };

  const derivedSlug = useMemo(
    () => (mode === "edit" && search.slug ? search.slug : slugify(form.titleEn || form.titleCn)),
    [form.titleEn, form.titleCn, mode, search.slug],
  );
  const slugCollision = mode !== "edit" && derivedSlug.length > 0 && TAKEN_SLUGS.has(derivedSlug);

  const errFor = (field: string) => errors.find((e) => e.field === field);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const localErrors: FieldError[] = [];

    // File validation (client-side, fast fail before hitting the server)
    if (form.mediaFile) {
      const err = validateFile(form.mediaFile, FILE_LIMITS[kind]);
      if (err) localErrors.push({ ...err, field: "mediaFile" });
    }
    if (form.coverFile) {
      const err = validateFile(form.coverFile, COVER_LIMIT);
      if (err) localErrors.push({ ...err, field: "coverFile" });
    }

    const payload = {
      kind, mode,
      slug: derivedSlug,
      titleCn: form.titleCn,
      titleEn: form.titleEn,
      excerpt: form.excerpt,
      body: form.body,
      mediaUrl: form.mediaUrl,
      hasMediaFile: !!form.mediaFile,
      tags: form.tags,
    };
    localErrors.push(...validateUpload(payload));

    if (localErrors.length) {
      setErrors(localErrors);
      setSubmitting(false);
      return;
    }

    // Server-side validation (defense in depth — same rules, canonical response)
    try {
      const res = await fetch("/api/upload-validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { errors?: FieldError[] };
        setErrors(data.errors ?? [{ field: "_", message: { cn: "服务器校验失败", en: "Server validation failed" } }]);
        setSubmitting(false);
        return;
      }
    } catch {
      setErrors([{ field: "_", message: { cn: "网络错误,请重试", en: "Network error — please retry" } }]);
      setSubmitting(false);
      return;
    }

    setSent(true);
    setSubmitting(false);
  };

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

          <div className="mt-8 inline-flex rounded-full border-2 border-foreground bg-background p-1">
            <button
              onClick={() => updateView("upload")}
              className={"inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors " + (view === "upload" ? "bg-foreground text-background" : "text-foreground hover:bg-paper")}
            >
              <Upload className="h-3.5 w-3.5" /> {lang === "cn" ? "上载" : "Upload"}
            </button>
            <button
              onClick={() => updateView("manage")}
              className={"inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors " + (view === "manage" ? "bg-foreground text-background" : "text-foreground hover:bg-paper")}
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> {lang === "cn" ? "内容管理" : "Manage"}
            </button>
          </div>
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
                onClick={() => updateKind(k.id)}
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

        {view === "manage" ? (
          <ManageView kind={kind} lang={lang} onNew={startNew} onEdit={startEdit} />
        ) : (

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} className="rounded-2xl border-2 border-foreground bg-background p-6 lg:p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-violet">
                <Upload className="h-3.5 w-3.5" />
                {mode === "edit"
                  ? (lang === "cn" ? "编辑内容" : "Editing")
                  : (lang === "cn" ? "上载表单" : "Upload form")}
                {" · "}{lang === "cn" ? active.cn : active.en}
              </div>
              {mode === "edit" && (
                <button
                  type="button"
                  onClick={startNew}
                  className="rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] hover:border-foreground"
                >
                  {lang === "cn" ? "改为新建" : "Switch to New"}
                </button>
              )}
            </div>

            {derivedSlug && (
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                <span>slug:</span>
                <code className={"rounded px-2 py-0.5 " + (slugCollision ? "bg-alert/15 text-alert" : "bg-paper text-foreground/75")}>
                  {derivedSlug || "—"}
                </code>
                {slugCollision && (
                  <span className="text-alert">
                    · {lang === "cn" ? "已被占用" : "already taken"}
                  </span>
                )}
              </div>
            )}

            {errFor("_") && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-alert bg-alert/10 p-3 text-[13px] text-alert">
                <AlertCircle className="mt-0.5 h-4 w-4" />
                <span>{errFor("_")!.message[lang]}</span>
              </div>
            )}

            {sent ? (
              <div className="mt-8 flex items-start gap-3 rounded-xl bg-lime/25 p-6">
                <CheckCircle2 className="mt-0.5 h-6 w-6" />
                <div>
                  <div className="font-display text-xl font-bold">
                    {mode === "edit"
                      ? (lang === "cn" ? "编辑已提交" : "Edit submitted")
                      : (lang === "cn" ? "已提交审核" : "Submitted for review")}
                  </div>
                  <div className="mt-1 text-[13px] text-foreground/75">
                    {lang === "cn"
                      ? "编辑部会在 48 小时内审核并回复。可在“内容管理”查看状态。"
                      : "Editorial will review within 48 hours. Track status in Content Manager."}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <Field label={lang === "cn" ? "标题 (中文)" : "Title (CN)"} required error={errFor("titleCn")?.message[lang]}>
                  <input required value={form.titleCn} onChange={(e) => update("titleCn", e.target.value)} maxLength={120} className="inp" />
                </Field>
                <Field label={lang === "cn" ? "标题 (英文)" : "Title (EN)"} required error={errFor("titleEn")?.message[lang]}>
                  <input required value={form.titleEn} onChange={(e) => update("titleEn", e.target.value)} maxLength={160} className="inp" />
                </Field>
                <Field label={lang === "cn" ? "摘要" : "Excerpt"} required error={errFor("excerpt")?.message[lang]}>
                  <textarea required rows={3} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} maxLength={400} className="inp" />
                </Field>

                {kind === "article" && (
                  <Field label={lang === "cn" ? "正文 (Markdown)" : "Body (Markdown)"} required error={errFor("body")?.message[lang]}>
                    <textarea required rows={8} value={form.body} onChange={(e) => update("body", e.target.value)} className="inp font-mono text-[13px]" />
                  </Field>
                )}

                {kind === "video" && (
                  <>
                    <Field label={lang === "cn" ? "视频 URL" : "Video URL"} error={errFor("mediaUrl")?.message[lang]}>
                      <input value={form.mediaUrl} onChange={(e) => update("mediaUrl", e.target.value)} className="inp" placeholder="https://..." />
                    </Field>
                    <Field label={lang === "cn" ? "或上传视频文件" : "…or upload video file"} error={errFor("mediaFile")?.message[lang]}>
                      <input type="file" accept={FILE_LIMITS.video.accept.join(",")} onChange={(e) => update("mediaFile", e.target.files?.[0] ?? null)} className="inp" />
                      <FileHint lang={lang} limits={FILE_LIMITS.video} />
                    </Field>
                    <Field label={lang === "cn" ? "时长" : "Duration"}>
                      <input value={form.duration} onChange={(e) => update("duration", e.target.value)} className="inp" placeholder="08:24" />
                    </Field>
                  </>
                )}

                {kind === "podcast" && (
                  <>
                    <Field label={lang === "cn" ? "音频 URL" : "Audio URL"} error={errFor("mediaUrl")?.message[lang]}>
                      <input value={form.mediaUrl} onChange={(e) => update("mediaUrl", e.target.value)} className="inp" placeholder="https://..." />
                    </Field>
                    <Field label={lang === "cn" ? "或上传音频文件" : "…or upload audio file"} error={errFor("mediaFile")?.message[lang]}>
                      <input type="file" accept={FILE_LIMITS.podcast.accept.join(",")} onChange={(e) => update("mediaFile", e.target.files?.[0] ?? null)} className="inp" />
                      <FileHint lang={lang} limits={FILE_LIMITS.podcast} />
                    </Field>
                    <Field label={lang === "cn" ? "嘉宾" : "Guest"}>
                      <input value={form.guest} onChange={(e) => update("guest", e.target.value)} className="inp" />
                    </Field>
                  </>
                )}

                {kind === "report" && (
                  <>
                    <Field label={lang === "cn" ? "PDF 文件" : "PDF file"} required error={errFor("mediaFile")?.message[lang]}>
                      <input required type="file" accept="application/pdf" onChange={(e) => update("mediaFile", e.target.files?.[0] ?? null)} className="inp" />
                      <FileHint lang={lang} limits={FILE_LIMITS.report} />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label={lang === "cn" ? "页数" : "Pages"}>
                        <input value={form.pages} onChange={(e) => update("pages", e.target.value)} className="inp" type="number" />
                      </Field>
                      <Field label={lang === "cn" ? "格式" : "Format"}>
                        <input value={form.format} onChange={(e) => update("format", e.target.value)} className="inp" />
                      </Field>
                    </div>
                  </>
                )}

                <Field label={lang === "cn" ? "封面图" : "Cover image"} error={errFor("coverFile")?.message[lang]}>
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-paper p-4 text-sm text-muted-foreground">
                    <ImagePlus className="h-5 w-5" />
                    <input type="file" accept={COVER_LIMIT.accept.join(",")} onChange={(e) => update("coverFile", e.target.files?.[0] ?? null)} className="text-xs" />
                  </div>
                  <FileHint lang={lang} limits={COVER_LIMIT} />
                </Field>

                <Field label={lang === "cn" ? "标签 (逗号分隔)" : "Tags (comma separated)"}>
                  <input value={form.tags} onChange={(e) => update("tags", e.target.value)} className="inp" placeholder="Agent, GEO, Brand" />
                </Field>

                <button
                  disabled={submitting}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:bg-violet disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {mode === "edit"
                    ? (lang === "cn" ? "保存修改" : "Save changes")
                    : (lang === "cn" ? "提交审核" : "Submit for review")}
                </button>
              </div>
            )}
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {lang === "cn" ? "校验规则" : "Validation Rules"}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">
                {lang === "cn" ? "客户端 + 服务端双重校验" : "Client + Server double-check"}
              </h3>
              <ul className="mt-4 space-y-2 text-[13px] text-foreground/80">
                <li>· {MSG.titleCnLen[lang]}</li>
                <li>· {MSG.titleEnLen[lang]}</li>
                <li>· {MSG.excerptLen[lang]}</li>
                <li>· {lang === "cn"
                  ? `文件限制:视频 ${FILE_LIMITS.video.maxMB}MB / 音频 ${FILE_LIMITS.podcast.maxMB}MB / 报告 ${FILE_LIMITS.report.maxMB}MB`
                  : `Files: video ${FILE_LIMITS.video.maxMB}MB · audio ${FILE_LIMITS.podcast.maxMB}MB · report ${FILE_LIMITS.report.maxMB}MB`}
                </li>
                <li>· {lang === "cn" ? "自动 slug 去重" : "Auto slug de-duplication"}</li>
              </ul>
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
        )}

        <div className="mt-12">
          <ContactChannels formHref="/consulting#booking" />
        </div>
      </section>

      <style>{`.inp{width:100%;border:1px solid var(--color-border);border-radius:8px;padding:10px 12px;font-size:14px;background:transparent;outline:none}.inp:focus{border-color:var(--color-foreground)}`}</style>
    </SiteLayout>
  );
}

function ManageView({
  kind, lang, onNew, onEdit,
}: {
  kind: Kind;
  lang: "cn" | "en";
  onNew: () => void;
  onEdit: (slug: string, title: string) => void;
}) {
  const active = KINDS.find((k) => k.id === kind)!;

  // Real items for this kind, so Edit deep-links match the public routes.
  const items = useMemo(() => {
    const t = (o: { cn: string; en: string }) => (lang === "cn" ? o.cn : o.en);
    if (kind === "article") return featured.slice(0, 6).map((x) => ({ slug: x.slug, title: t(x.title), status: "Published" }));
    if (kind === "report") return reports.slice(0, 6).map((x) => ({ slug: x.slug, title: t(x.title), status: "Published" }));
    if (kind === "video") return videos.slice(0, 6).map((x) => ({ slug: x.slug, title: t(x.title), status: "Published" }));
    return audios.slice(0, 6).map((x) => ({ slug: x.slug, title: t(x.title), status: "Published" }));
  }, [kind, lang]);

  return (
    <div className="mt-10 rounded-2xl border-2 border-foreground bg-background p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet">
            {lang === "cn" ? "内容管理" : "Content Manager"} · {lang === "cn" ? active.cn : active.en}
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold">
            {lang === "cn" ? "已发布 · 待审 · 草稿" : "Published · Pending · Drafts"}
          </h2>
        </div>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-violet"
        >
          <Plus className="h-4 w-4" /> {lang === "cn" ? "新建" : "New"} · {lang === "cn" ? active.cn : active.en}
        </button>
      </div>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {items.map((r) => (
          <li key={r.slug} className="flex items-center justify-between gap-3 bg-paper px-4 py-3 text-sm">
            <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground">{r.status}</span>
            <span className="flex-1 truncate text-foreground/85">{r.title}</span>
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">{r.slug}</span>
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(r.slug, r.title)}
                className="rounded-full border border-border p-1.5 hover:border-foreground"
                aria-label={lang === "cn" ? "编辑" : "Edit"}
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button className="rounded-full border border-border p-1.5 hover:border-alert hover:text-alert" aria-label={lang === "cn" ? "删除" : "Delete"}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-muted-foreground">
        {lang === "cn" ? "完整 CMS 与权限系统将随 Cloud 后台上线。" : "Full CMS with roles ships with the Cloud backend."}
      </p>
    </div>
  );
}

function Field({
  label, required, error, children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-alert">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-alert">
          <AlertCircle className="h-3 w-3" /> {error}
        </span>
      )}
    </label>
  );
}

function FileHint({ lang, limits }: { lang: "cn" | "en"; limits: { maxMB: number; label: string } }) {
  return (
    <span className="mt-1 block text-[11px] text-muted-foreground">
      {lang === "cn" ? `格式:${limits.label} · 最大 ${limits.maxMB} MB` : `${limits.label} · max ${limits.maxMB} MB`}
    </span>
  );
}
