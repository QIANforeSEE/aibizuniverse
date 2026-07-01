import { createFileRoute, Link, getRouteApi } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/seo";
import { useT, useLang, type Localized } from "@/lib/i18n";
import { featured, signals, videos, audios, reports } from "@/lib/mock-data";

const PATH = "/agentic-ai";
const TITLE_CN = "Agentic AI 智能体经济中枢";
const TITLE_EN = "Agentic AI Hub";
const TITLE = `${TITLE_CN} · ${TITLE_EN} — ${SITE_NAME}`;
const DESC_CN =
  "Agentic AI 中枢:从基础模型、Agent 部署、Agent 经济到品牌与增长落地的完整视图。汇聚最新分析、视频、播客与研究报告。";
const DESC_EN =
  "The Agentic AI hub: a complete view from foundation models and Agent deployment to the Agent economy, brand and growth. Curated analysis, video, podcasts and research.";
const DESC = `${DESC_CN} — ${DESC_EN}`;

// Curated slug lists — hand-picked items about Agentic AI across the site.
const FEATURED_SLUGS = ["2026-ai-operating-system", "brand-growth-ai-rebuild"];
const SIGNAL_SLUGS = [
  "openai-agent-builder-pricing-cut",
  "coze-commerce-agent-launch",
  "minimax-multimodal-agent-brand",
];
const VIDEO_SLUGS = [
  "agent-economy-roundtable",
  "human-plus-manifest",
  "founders-inside-the-agent-launch",
  "cmo-ai-native-keynote",
];
const REPORT_SLUGS = ["enterprise-ai-agent-playbook", "2026-ai-business-trends"];

// Topic tagging per slug — drives the topic filter chips.
type Topic = "foundation" | "orchestration" | "deployment" | "economy";
const TOPIC_TAGS: Record<string, Topic[]> = {
  // Featured
  "2026-ai-operating-system": ["foundation", "orchestration", "economy"],
  "brand-growth-ai-rebuild": ["deployment", "economy"],
  // Signals
  "openai-agent-builder-pricing-cut": ["foundation", "economy"],
  "coze-commerce-agent-launch": ["orchestration", "deployment", "economy"],
  "minimax-multimodal-agent-brand": ["foundation", "deployment"],
  // Videos
  "agent-economy-roundtable": ["orchestration", "economy"],
  "human-plus-manifest": ["economy"],
  "founders-inside-the-agent-launch": ["deployment", "orchestration"],
  "cmo-ai-native-keynote": ["deployment", "economy"],
  // Reports
  "enterprise-ai-agent-playbook": ["deployment", "orchestration"],
  "2026-ai-business-trends": ["foundation", "orchestration", "deployment", "economy"],
};

const TYPE_VALUES = ["all", "analysis", "video", "podcast", "report"] as const;
const TOPIC_VALUES = ["all", "foundation", "orchestration", "deployment", "economy"] as const;
type ContentType = (typeof TYPE_VALUES)[number];

const searchSchema = z.object({
  type: fallback(z.enum(TYPE_VALUES), "all").default("all"),
  topic: fallback(z.enum(TOPIC_VALUES), "all").default("all"),
});


export const Route = createFileRoute("/agentic-ai")({
  validateSearch: zodValidator(searchSchema),
  head: () => {
    const url = absUrl(PATH);
    const curatedFeatured = featured.filter((f) => FEATURED_SLUGS.includes(f.slug));
    const curatedVideos = videos.filter((v) => VIDEO_SLUGS.includes(v.slug));
    const curatedPodcasts = audios.filter((a) => a.kind === "podcast");
    const curatedReports = reports.filter((r) => REPORT_SLUGS.includes(r.slug));

    const itemListElement = [
      ...curatedFeatured.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absUrl(`/article/${f.slug}`),
        name: typeof f.title === "string" ? f.title : `${f.title.cn} · ${f.title.en}`,
      })),
      ...curatedVideos.map((v, i) => ({
        "@type": "ListItem",
        position: curatedFeatured.length + i + 1,
        url: absUrl(`/video/${v.slug}`),
        name: typeof v.title === "string" ? v.title : `${v.title.cn} · ${v.title.en}`,
      })),
      ...curatedPodcasts.map((p, i) => ({
        "@type": "ListItem",
        position: curatedFeatured.length + curatedVideos.length + i + 1,
        url: absUrl(`/podcast/${p.slug}`),
        name: typeof p.title === "string" ? p.title : `${p.title.cn} · ${p.title.en}`,
      })),
      ...curatedReports.map((r, i) => ({
        "@type": "ListItem",
        position:
          curatedFeatured.length + curatedVideos.length + curatedPodcasts.length + i + 1,
        url: absUrl(`/reports/${r.slug}`),
        name: typeof r.title === "string" ? r.title : `${r.title.cn} · ${r.title.en}`,
      })),
    ];

    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { name: "keywords", content: "Agentic AI, AI Agent, Agent Economy, AI 智能体, 企业 AI, Agent Ops, AI 商业化" },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:title", content: `${TITLE_CN} · ${TITLE_EN}` },
        { property: "og:description", content: DESC },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:locale", content: "zh_CN" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${TITLE_CN} · ${TITLE_EN}` },
        { name: "twitter:description", content: DESC },
      ],
      links: [{ rel: "canonical", href: url }]  ,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${TITLE_CN} · ${TITLE_EN}`,
            description: DESC,
            url,
            inLanguage: ["zh-CN", "en-US"],
            isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
            about: [
              { "@type": "Thing", name: "Agentic AI" },
              { "@type": "Thing", name: "AI Agent" },
              { "@type": "Thing", name: "Agent Economy" },
              { "@type": "Thing", name: "Enterprise AI" },
            ],
            mainEntity: {
              "@type": "ItemList",
              name: "Agentic AI curated items",
              itemListElement,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Agentic AI", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: AgenticAIHub,
});

const routeApi = getRouteApi("/agentic-ai");

const TYPE_LABELS: Record<ContentType, Localized> = {
  all: { cn: "全部内容", en: "All" },
  analysis: { cn: "分析", en: "Analysis" },
  video: { cn: "视频", en: "Video" },
  podcast: { cn: "播客", en: "Podcasts" },
  report: { cn: "报告", en: "Reports" },
};

const TOPIC_LABELS: Record<(typeof TOPIC_VALUES)[number], Localized> = {
  all: { cn: "全部主题", en: "All topics" },
  foundation: { cn: "基础模型", en: "Foundation" },
  orchestration: { cn: "Agent 编排", en: "Orchestration" },
  deployment: { cn: "企业部署", en: "Deployment" },
  economy: { cn: "Agent 经济", en: "Economy" },
};

function hasTopic(slug: string, topic: (typeof TOPIC_VALUES)[number]): boolean {
  if (topic === "all") return true;
  return (TOPIC_TAGS[slug] ?? []).includes(topic as Topic);
}

function AgenticAIHub() {
  const t = useT();
  const { pick } = useLang();
  const { type, topic } = routeApi.useSearch();

  const showAnalysis = type === "all" || type === "analysis";
  const showVideo = type === "all" || type === "video";
  const showPodcast = type === "all" || type === "podcast";
  const showReport = type === "all" || type === "report";

  const curatedFeatured = featured
    .filter((f) => FEATURED_SLUGS.includes(f.slug))
    .filter((f) => hasTopic(f.slug, topic));
  const curatedSignals = signals
    .filter((s) => SIGNAL_SLUGS.includes(s.slug))
    .filter((s) => hasTopic(s.slug, topic));
  const curatedVideos = videos
    .filter((v) => VIDEO_SLUGS.includes(v.slug))
    .filter((v) => hasTopic(v.slug, topic));
  const curatedPodcasts = audios
    .filter((a) => a.kind === "podcast")
    .filter((a) => hasTopic(a.slug, topic) || topic === "all");
  const curatedReports = reports
    .filter((r) => REPORT_SLUGS.includes(r.slug))
    .filter((r) => hasTopic(r.slug, topic));

  const analysisCount = showAnalysis ? curatedFeatured.length + curatedSignals.length : 0;
  const videoCount = showVideo ? curatedVideos.length : 0;
  const podcastCount = showPodcast ? curatedPodcasts.length : 0;
  const reportCount = showReport ? curatedReports.length : 0;
  const totalCount = analysisCount + videoCount + podcastCount + reportCount;

  const pillars = [
    {
      code: "01",
      title: { cn: "基础模型 · Foundation", en: "Foundation Models" },
      desc: {
        cn: "驱动 Agent 的底层模型与推理经济,决定智能体能力边界。",
        en: "The underlying models and inference economics that set the Agent's capability frontier.",
      },
      color: "bg-lime text-black",
    },
    {
      code: "02",
      title: { cn: "Agent 编排 · Orchestration", en: "Agent Orchestration" },
      desc: {
        cn: "多智能体协作、工具调用与任务分解的操作系统层。",
        en: "The OS layer for multi-agent collaboration, tool use and task decomposition.",
      },
      color: "bg-violet text-white",
    },
    {
      code: "03",
      title: { cn: "企业部署 · Deployment", en: "Enterprise Deployment" },
      desc: {
        cn: "从 PoC 到生产环境,Agent 嵌入营销、销售、服务全链路。",
        en: "PoC to production — Agents embedded across marketing, sales and service.",
      },
      color: "bg-signal text-black",
    },
    {
      code: "04",
      title: { cn: "Agent 经济 · Economy", en: "Agent Economy" },
      desc: {
        cn: "Agent 作为新交易主体重塑广告、内容与商业模式。",
        en: "Agents as new economic actors reshaping ads, content and business models.",
      },
      color: "bg-alert text-white",
    },
  ] as const;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <SectionLabel index="§ HUB" label="Agentic AI 中枢" en="Agentic AI Hub" color="violet" />
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight lg:text-8xl">
            {pick("智能体经济", "The Agent")}
            <span className="text-violet">.</span>
            <br />
            {pick("正在重写商业", "Economy is here")}
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-muted-foreground lg:text-xl">
            {pick(
              "从基础模型到企业部署,从 Agent 编排到 Agent 经济 —— 这是 AI商业宇宙对 Agentic AI 的完整策展。汇聚最前沿的分析、纪录短片、播客与研究报告。",
              "From foundation models to enterprise deployment, from orchestration to the Agent economy — the AI Business Universe curation of Agentic AI: the sharpest analysis, films, podcasts and research in one place.",
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/agent"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-violet hover:text-white"
            >
              {pick("与 AI 智能体对话 →", "Talk to the AI Agent →")}
            </Link>
            <Link
              to="/reports"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-foreground"
            >
              {pick("下载 Agent 报告", "Download Agent research")}
            </Link>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <SectionLabel index="§ 01" label="四大支柱" en="Four Pillars" color="lime" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.code} className="rounded-2xl border border-border bg-background p-6">
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-bold ${p.color}`}>
                  {p.code}
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{t(p.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ANALYSIS */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <SectionLabel index="§ 02" label="深度分析" en="Featured Analysis" color="violet" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {curatedFeatured.map((f) => (
              <Link
                key={f.id}
                to="/article/$slug"
                params={{ slug: f.slug }}
                className="group rounded-2xl border border-border p-8 transition hover:border-foreground"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-violet">{t(f.category)}</div>
                <h3 className="mt-4 font-display text-3xl font-bold leading-tight group-hover:text-violet">
                  {t(f.title)}
                </h3>
                <p className="mt-4 text-muted-foreground">{t(f.excerpt)}</p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{f.author}</span>
                  <span>·</span>
                  <span>{f.time}</span>
                  <span>·</span>
                  <span>{f.readMin} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNALS */}
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <SectionLabel index="§ 03" label="Agent 信号" en="Agent Signals" color="signal" />
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-background">
            {curatedSignals.map((s) => (
              <Link
                key={s.id}
                to="/article/$slug"
                params={{ slug: s.slug }}
                className="flex flex-col gap-2 p-6 transition hover:bg-muted/50 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="font-mono text-signal">IMPACT {s.impact}/5</span>
                    <span>·</span>
                    <span>{t(s.time)}</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-semibold">{t(s.title)}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{t(s.excerpt)}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex items-end justify-between">
            <SectionLabel index="§ 04" label="Agent 视频" en="Agent Video" color="alert" />
            <Link to="/video" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
              {pick("全部视频 →", "All video →")}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {curatedVideos.map((v) => (
              <Link
                key={v.id}
                to="/video/$slug"
                params={{ slug: v.slug }}
                className="group rounded-2xl border border-border p-5 transition hover:border-foreground"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{t(v.category)}</span>
                  <span className="font-mono">{v.duration}</span>
                </div>
                <h4 className="mt-4 font-display text-lg font-bold leading-tight group-hover:text-violet">
                  {t(v.title)}
                </h4>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{t(v.excerpt)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PODCASTS */}
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex items-end justify-between">
            <SectionLabel index="§ 05" label="Agent 播客" en="Agent Podcasts" color="lime" />
            <Link to="/podcast" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
              {pick("全部播客 →", "All podcasts →")}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {curatedPodcasts.map((p) => (
              <Link
                key={p.id}
                to="/podcast/$slug"
                params={{ slug: p.slug }}
                className="group rounded-2xl border border-border bg-background p-6 transition hover:border-foreground"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{t(p.category)}</span>
                  <span className="font-mono">{p.duration}</span>
                </div>
                <h4 className="mt-4 font-display text-xl font-bold leading-tight group-hover:text-violet">
                  {t(p.title)}
                </h4>
                <p className="mt-3 text-sm text-muted-foreground">{t(p.excerpt)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTS */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <SectionLabel index="§ 06" label="Agent 研究报告" en="Agent Research" color="violet" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {curatedReports.map((r) => (
              <Link
                key={r.id}
                to="/reports/$slug"
                params={{ slug: r.slug }}
                className="group flex flex-col rounded-2xl border border-border p-8 transition hover:border-foreground"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-violet">{t(r.tag)}</div>
                <h4 className="mt-4 font-display text-2xl font-bold leading-tight group-hover:text-violet">
                  {t(r.title)}
                </h4>
                <p className="mt-3 text-muted-foreground">{t(r.excerpt)}</p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{r.pages} pages</span>
                  <span>·</span>
                  <span>{r.format}</span>
                  <span>·</span>
                  <span>{r.published}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <SectionLabel index="§ CTA" label="进入智能体" en="Enter the Agent" color="lime" />
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight lg:text-6xl">
            {pick("直接与 AI商业宇宙智能体对话", "Talk directly to the AI Business Agent")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-background/70">
            {pick(
              "把你关于 Agentic AI 的战略问题交给我们的智能体,即刻得到结构化答案与推荐阅读。",
              "Hand your Agentic AI strategy questions to our agent for structured answers and recommended reading, instantly.",
            )}
          </p>
          <Link
            to="/agent"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-semibold text-black transition hover:bg-white"
          >
            {pick("打开 AI 智能体 →", "Open the AI Agent →")}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
