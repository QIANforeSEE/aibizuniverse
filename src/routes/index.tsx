import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, Sparkles, TrendingUp, Zap, Play, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import {
  signals,
  featured,
  growthSystem,
  keyPlayers,
  reports,
  consultingServices,
  suggestedQuestions,
  videos,
  audios,
} from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";
import { videoThumbs, audioThumbs, str } from "@/lib/thumbs";
import hero1 from "@/assets/hero-banner.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import editoRobot from "@/assets/edito-robot.jpg";
import editoHumanPlus from "@/assets/edito-humanplus.jpg";
import editoCathedral from "@/assets/edito-cathedral.jpg";
import editoHand from "@/assets/edito-hand.jpg";
import editoMist from "@/assets/edito-mist.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI商业宇宙 AI Business Universe — 看懂AI,重构商业增长" },
      { name: "description", content: "AI+ 时代商业增长智库。为企业、品牌与广告主提供 AI 商业分析、增长方法论、咨询培训、共创服务与智能体问答系统 · AI-era business growth intelligence for enterprises, brands and advertisers." },
      { property: "og:site_name", content: "AI商业宇宙 · AI Business Universe" },
      { property: "og:title", content: "AI商业宇宙 · AI Business Universe" },
      { property: "og:description", content: "AI Business Growth Intelligence Platform · 看懂AI,重构商业增长。" },
      { property: "og:image", content: `https://aibizuniverse.lovable.app${hero1}` },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aibizuniverse.lovable.app/" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://aibizuniverse.lovable.app${hero1}` },
    ],
    links: [{ rel: "canonical", href: "https://aibizuniverse.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AI商业宇宙 · AI Business Universe",
          alternateName: ["AI Business Universe", "AI商业宇宙"],
          url: "https://aibizuniverse.lovable.app/",
          inLanguage: ["zh-CN", "en"],
          publisher: {
            "@type": "Organization",
            name: "AI商业宇宙 · AI Business Universe",
            url: "https://aibizuniverse.lovable.app/",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AI商业宇宙 · AI Business Universe",
          url: "https://aibizuniverse.lovable.app/",
          description: "AI+ 时代商业增长智库 · AI Business Growth Intelligence Platform",
          sameAs: [
            "https://media360.info",
            "https://media360.ai",
            "https://qianforesee.com",
            "https://innovationplus.org",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const accentClass = {
  lime: "bg-lime text-foreground",
  violet: "bg-violet text-white",
  signal: "bg-signal text-foreground",
  alert: "bg-alert text-white",
} as const;

const accentBorder = {
  lime: "border-l-lime",
  violet: "border-l-violet",
  signal: "border-l-signal",
  alert: "border-l-alert",
} as const;

function Home() {
  return (
    <SiteLayout>
      <TopCarousel />
      <AgentEntry />
      <GrowthHub />
      <SignalStrip />
      <FeaturedAnalysis />
      <VideoGrid />
      <AudioRow />
      <HumanPlusFilm />
      <VisualField />
      <GrowthSystem />
      <KeyPlayersRadar />
      <ReportsRow />
      <Consulting />
      <Newsletter />
    </SiteLayout>
  );
}

/* ---------- AI+ GROWTH HUB ---------- */

function GrowthHub() {
  const { lang } = useLang();
  const pillars = [
    { c: "01", cn: "AI 战略咨询", en: "AI Strategy", color: "bg-violet text-white" },
    { c: "02", cn: "AI 品牌增长", en: "Brand Growth", color: "bg-lime text-foreground" },
    { c: "03", cn: "AI 营销转型", en: "Marketing Ops", color: "bg-signal text-foreground" },
    { c: "04", cn: "AI Agent 共创", en: "Agent Co-Build", color: "bg-alert text-white" },
    { c: "05", cn: "AI 企业培训", en: "Executive Training", color: "bg-foreground text-background" },
    { c: "06", cn: "定制研究报告", en: "Custom Research", color: "bg-violet text-white" },
  ];
  return (
    <section className="relative overflow-hidden border-b-2 border-foreground bg-gradient-to-br from-lime/30 via-signal/20 to-violet/25">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
              <Sparkles className="h-3 w-3" /> AI+ GROWTH HUB
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight lg:text-6xl">
              {lang === "cn"
                ? (<>一个入口,连接你所需要的 <span className="bg-foreground px-1 text-lime">AI 增长能力</span>。</>)
                : (<>One hub for every <span className="bg-foreground px-1 text-lime">AI growth capability</span> you need.</>)}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-foreground/80">
              {lang === "cn"
                ? "从战略到 Agent,从品牌到组织。AI+ GROWTH HUB 汇集咨询、共创、培训与研究,为企业提供端到端的增长服务。"
                : "From strategy to agents, brand to org. AI+ GROWTH HUB unites consulting, co-creation, training and research into an end-to-end offering."}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/consulting" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-violet">
              {lang === "cn" ? "预约诊断" : "Book diagnostic"} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background">
              {lang === "cn" ? "联系我们" : "Contact"}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {pillars.map((p) => (
            <Link
              key={p.c}
              to="/consulting"
              className="group relative overflow-hidden rounded-xl border-2 border-foreground bg-background p-5 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
            >
              <span className={"inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest " + p.color}>
                {p.c}
              </span>
              <div className="mt-4 font-display text-[15px] font-bold leading-tight">
                {lang === "cn" ? p.cn : p.en}
              </div>
              <ArrowUpRight className="mt-3 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- TOP CAROUSEL — 6 rotating covers ---------- */

const HERO_SLIDES = [
  {
    src: hero1,
    kicker: { cn: "封面故事 · Cover Story", en: "Cover Story" },
    title: { cn: "AI 商业宇宙,正在诞生。", en: "The AI Business Universe is being born." },
    subtitle: {
      cn: "从模型、Agent、品牌到组织,我们记录正在被重写的商业秩序。",
      en: "From models to agents to brands — we chronicle the business order being rewritten.",
    },
    slug: "2026-ai-operating-system",
    accent: "lime" as const,
  },
  {
    src: hero2,
    kicker: { cn: "Issue 03 · 2026", en: "Issue 03 · 2026" },
    title: { cn: "AI 走进董事会。", en: "AI takes a seat in the boardroom." },
    subtitle: {
      cn: "当 CEO 的第一个员工是智能体,战略会议的语言正在被改写。",
      en: "When the CEO's first hire is an agent, strategy meetings speak a new language.",
    },
    slug: "brand-growth-ai-rebuild",
    accent: "violet" as const,
  },
  {
    src: hero3,
    kicker: { cn: "封面人物 · Cover Portrait", en: "Cover Portrait" },
    title: { cn: "算力的守夜人。", en: "The keepers of compute." },
    subtitle: {
      cn: "在千卡集群的白噪声里,新一代女性创始人正在重画基础设施地图。",
      en: "Inside GPU clusters, a new generation of founders is redrawing the infra map.",
    },
    slug: "geo-aeo-search-war",
    accent: "signal" as const,
  },
  {
    src: hero4,
    kicker: { cn: "全球观察 · Global", en: "Global Observation" },
    title: { cn: "一颗大脑漂浮在城市之上。", en: "A brain floating above the city." },
    subtitle: {
      cn: "当 AI 成为城市的操作系统,每一个品牌都在被重新索引。",
      en: "As AI becomes the city's OS, every brand is being re-indexed.",
    },
    slug: "geo-aeo-search-war",
    accent: "lime" as const,
  },
  {
    src: hero5,
    kicker: { cn: "HUMAN+ · 人机共生", en: "HUMAN+" },
    title: { cn: "新的一代,自带 AI 视野。", en: "A new generation with AI vision." },
    subtitle: {
      cn: "AR 眼镜背后,是被 AI 增强的商业直觉与决策速度。",
      en: "Behind the AR lenses: AI-augmented business intuition and decision speed.",
    },
    slug: "2026-ai-operating-system",
    accent: "alert" as const,
  },
  {
    src: hero6,
    kicker: { cn: "特稿 · Feature", en: "Feature" },
    title: { cn: "一枚芯片,一场商业重估。", en: "One chip. A business revaluation." },
    subtitle: {
      cn: "算力经济的液态涌动,正在把品牌资产重新排序。",
      en: "The liquid surge of the compute economy is re-sorting brand assets.",
    },
    slug: "brand-growth-ai-rebuild",
    accent: "violet" as const,
  },
];

function TopCarousel() {
  const [i, setI] = useState(0);
  const t = useT();
  const { lang } = useLang();

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const s = HERO_SLIDES[i];
  const prev = () => setI((v) => (v - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setI((v) => (v + 1) % HERO_SLIDES.length);

  return (
    <section className="relative overflow-hidden border-b border-border bg-foreground text-background">
      {HERO_SLIDES.map((slide, idx) => (
        <img
          key={idx}
          src={slide.src}
          alt=""
          width={1920}
          height={1024}
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out will-change-transform " +
            (idx === i ? "opacity-100 animate-hero-kenburns" : "opacity-0")
          }
        />
      ))}

      {/* Ambient nebula blobs — subtle motion */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lime/35 blur-3xl mix-blend-screen animate-hero-drift-a" />
      <div className="pointer-events-none absolute right-[-6rem] top-1/3 h-[480px] w-[480px] rounded-full bg-violet/40 blur-3xl mix-blend-screen animate-hero-drift-b" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-1/3 h-[420px] w-[420px] rounded-full bg-alert/30 blur-3xl mix-blend-screen animate-hero-drift-c" />

      {/* Preserve height */}
      <img src={s.src} alt="" width={1920} height={1024} className="invisible h-[62vh] min-h-[460px] w-full object-cover lg:h-[80vh]" />

      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent" />
      {/* Subtle grain / scanline overlay for futurism */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,#fff_2px,#fff_3px)]" />

      <div className="absolute inset-0 mx-auto flex max-w-[1400px] flex-col justify-between px-6 py-10 lg:px-10 lg:py-14">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-background/80">
          <span className={"rounded-full px-3 py-1 text-foreground " + (s.accent === "violet" ? "bg-violet text-white" : s.accent === "signal" ? "bg-signal" : s.accent === "alert" ? "bg-alert text-white" : "bg-lime")}>
            {t(s.kicker)}
          </span>
          <span className="hidden h-px flex-1 bg-background/25 md:block" />
          <span className="hidden md:inline">AI Business Growth Intelligence · {lang === "cn" ? "全球版" : "Global"}</span>
          <span className="flex items-center gap-1.5 text-lime">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> LIVE
          </span>
        </div>

        <div key={i} className="max-w-3xl animate-hero-reveal">
          <h1 className="mt-4 font-display text-[10vw] font-bold leading-[0.9] tracking-[-0.03em] text-background sm:text-6xl lg:text-[96px] [text-shadow:0_2px_40px_rgba(0,0,0,0.35)]">
            {t(s.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-background/85 lg:text-lg">{t(s.subtitle)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/article/$slug" params={{ slug: s.slug }} className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5">
              {lang === "cn" ? "阅读封面故事" : "Read cover story"} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/video" className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3 text-sm font-semibold text-background hover:bg-background hover:text-foreground">
              <Play className="h-4 w-4" /> {lang === "cn" ? "视频频道" : "Video"}
            </Link>
            <Link to="/podcast" className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3 text-sm font-semibold text-background hover:bg-background hover:text-foreground">
              <Headphones className="h-4 w-4" /> {lang === "cn" ? "播客" : "Podcast"}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={
                  "h-1 rounded-full transition-all " +
                  (idx === i ? "w-8 bg-lime" : "w-4 bg-background/40 hover:bg-background/70")
                }
              />
            ))}
            <span className="ml-3 font-mono text-[11px] text-background/60">
              {String(i + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="rounded-full border border-background/40 p-2 text-background hover:bg-background hover:text-foreground" aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={next} className="rounded-full border border-background/40 p-2 text-background hover:bg-background hover:text-foreground" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroKenBurns { 0% { transform: scale(1.02) translate3d(0,0,0); } 100% { transform: scale(1.12) translate3d(-1.5%,-1%,0); } }
        @keyframes heroReveal { 0% { opacity: 0; transform: translateY(24px); filter: blur(6px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes heroDriftA { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(40px,-24px,0) scale(1.08); } }
        @keyframes heroDriftB { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-30px,20px,0) scale(1.1); } }
        @keyframes heroDriftC { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(20px,-30px,0) scale(1.06); } }
        .animate-hero-kenburns { animation: heroKenBurns 8s ease-out both; }
        .animate-hero-reveal { animation: heroReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-hero-drift-a { animation: heroDriftA 14s ease-in-out infinite; }
        .animate-hero-drift-b { animation: heroDriftB 18s ease-in-out infinite; }
        .animate-hero-drift-c { animation: heroDriftC 16s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-hero-kenburns, .animate-hero-reveal, .animate-hero-drift-a, .animate-hero-drift-b, .animate-hero-drift-c { animation: none !important; }
        }
      `}</style>
    </section>
  );
}


/* ---------- AGENT ENTRY — moved up ---------- */

function AgentEntry() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="relative overflow-hidden border-b border-border bg-paper">
      <div className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-lime/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-violet/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <SectionLabel index="§ 01" label={lang === "cn" ? "AI 商业宇宙智能体" : "Ask the Universe"} en="Ask the Universe" color="violet" />
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>问 <span className="text-violet">AI 商业宇宙</span> 智能体。</>) : (<>Ask the <span className="text-violet">AI Business</span> Universe.</>)}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {lang === "cn"
                ? "输入你的商业问题,获得结构化的判断、行动建议、参考文章与咨询入口。"
                : "Ask your business question — get structured judgment, actions, references and a consulting entry."}
            </p>
          </div>

          <div>
            <div className="rounded-2xl border-2 border-foreground bg-background p-3 shadow-[8px_8px_0_0_var(--color-violet)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  placeholder={lang === "cn" ? "例如:我的品牌如何用 AI 提升增长?" : "e.g. How can my brand use AI to grow?"}
                  className="w-full flex-1 bg-transparent px-4 py-4 text-[15px] outline-none placeholder:text-muted-foreground"
                />
                <Link to="/agent" className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background hover:bg-violet">
                  <Sparkles className="h-4 w-4 text-lime" />
                  {lang === "cn" ? "提问" : "Ask"}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 4).map((q, i) => (
                <Link
                  key={i}
                  to="/agent"
                  className="rounded-full border border-border bg-background px-3.5 py-1.5 text-[12px] text-foreground/80 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {t(q)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SIGNAL STRIP ---------- */

function SignalStrip() {
  const t = useT();
  return (
    <section className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] overflow-hidden">
        <div className="flex items-center gap-8 px-6 py-3 text-[12px] font-medium lg:px-10">
          <span className="flex shrink-0 items-center gap-2 rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">
            <Zap className="h-3 w-3" /> AI SIGNAL
          </span>
          <div className="flex animate-[scroll_40s_linear_infinite] gap-10 whitespace-nowrap">
            {[...signals, ...signals].map((s, i) => (
              <span key={i} className="flex items-center gap-3 text-background/85">
                <span className="text-lime">●</span>
                {t(s.title)}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}

/* ---------- FEATURED ANALYSIS ---------- */

function FeaturedAnalysis() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="§ 02" label={lang === "cn" ? "精选深度分析" : "Featured Analysis"} en="Featured Analysis" color="violet" />
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>读懂本周 AI 商业的<span className="text-violet">结构性变化</span>。</>) : (<>Read this week's <span className="text-violet">structural shifts</span> in AI business.</>)}
            </h2>
          </div>
          <Link to="/analysis" className="text-sm font-semibold text-foreground hover:text-violet">
            {lang === "cn" ? "所有分析 →" : "All analysis →"}
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {featured.map((f, idx) => (
            <Link
              key={f.id}
              to="/article/$slug"
              params={{ slug: f.slug }}
              className={
                "group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--color-foreground)] " +
                (idx === 0 ? "lg:col-span-2 lg:row-span-1" : "")
              }
            >
              <div className="flex items-center justify-between">
                <span className={"rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest " + accentClass[f.color]}>
                  {t(f.category)}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{f.time}</span>
              </div>

              <h3 className={"mt-6 font-display font-bold leading-[1.1] tracking-tight text-foreground group-hover:text-violet " + (idx === 0 ? "text-4xl lg:text-5xl" : "text-2xl")}>
                {t(f.title)}
              </h3>

              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{t(f.excerpt)}</p>

              {idx === 0 && (
                <div className="mt-6 rounded-xl bg-paper p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet">
                    {lang === "cn" ? "Key Takeaways · 核心结论" : "Key Takeaways"}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {f.takeaways.map((tk, i) => (
                      <li key={i} className="flex gap-3 text-[13px] leading-snug text-foreground">
                        <span className="font-mono text-muted-foreground">0{i + 1}</span>
                        <span>{t(tk)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between pt-6 text-[12px] text-muted-foreground">
                <span>{f.author} · {f.readMin} {lang === "cn" ? "分钟阅读" : "min read"}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- VIDEO GRID — 8 cells ---------- */

function VideoGrid() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-background/60">
              <span className="font-mono">§ 03</span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span>{lang === "cn" ? "视频频道 / Video Channel" : "Video Channel"}</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>用镜头讲述 <span className="text-lime">AI 商业</span>。</>) : (<>AI business, <span className="text-lime">on film</span>.</>)}
            </h2>
          </div>
          <Link to="/video" className="text-sm font-semibold text-background/80 hover:text-lime">
            {lang === "cn" ? "进入视频频道 →" : "Enter channel →"}
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.slice(0, 8).map((v) => (
            <Link
              key={v.id}
              to="/video/$slug"
              params={{ slug: v.slug }}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                <img
                  src={videoThumbs[v.thumb]}
                  alt={str(v.title)}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-foreground shadow-lg">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-background">
                  {v.duration}
                </span>
                <span className={"absolute left-2 top-2 rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest " + accentClass[v.color]}>
                  {t(v.category)}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-background group-hover:text-lime">
                {t(v.title)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AUDIO ROW ---------- */

function AudioRow() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="§ 04" label={lang === "cn" ? "音乐 & 播客" : "Sound & Podcast"} en="Sound Channel" color="signal" />
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>用耳朵理解 <span className="text-signal">AI 商业</span>。</>) : (<>Understand AI business, <span className="text-signal">by ear</span>.</>)}
            </h2>
          </div>
          <div className="flex gap-4 text-sm font-semibold">
            <Link to="/podcast" className="hover:text-signal">{lang === "cn" ? "播客 →" : "Podcast →"}</Link>
            <Link to="/music" className="hover:text-violet">{lang === "cn" ? "音乐 →" : "Music →"}</Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audios.map((a) => (
            <Link
              key={a.id}
              to={a.kind === "podcast" ? "/podcast/$slug" : "/music/$slug"}
              params={{ slug: a.slug }}
              className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={audioThumbs[a.thumb]}
                  alt={str(a.title)}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-lg">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span className="absolute right-3 top-3 rounded bg-background/90 px-2 py-0.5 font-mono text-[10px] text-foreground">
                  {a.duration}
                </span>
              </div>
              <div className="p-4">
                <div className={"inline-block rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest " + accentClass[a.color]}>
                  {t(a.category)}
                </div>
                <div className="mt-3 font-display text-base font-semibold leading-snug group-hover:text-violet">
                  {t(a.title)}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
                  {t(a.excerpt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HUMAN+ FILM ---------- */

function HumanPlusFilm() {
  const { lang } = useLang();
  return (
    <section className="relative overflow-hidden border-b border-border bg-foreground text-background">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[720px]">
          <img
            src={editoRobot}
            alt="HUMAN+"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1280}
            height={1600}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-foreground/60" />
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-background backdrop-blur-md">
            <Play className="h-3 w-3 fill-lime text-lime" /> Film · 01 / HUMAN+
          </div>
        </div>

        <div className="relative flex flex-col justify-between p-10 lg:p-16">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-background/60">
            <span className="font-mono">§ 05</span>
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span>HUMAN+ · {lang === "cn" ? "人机共生" : "Symbiosis"}</span>
          </div>

          <div className="my-12 lg:my-0">
            <h2 className="font-display text-[10vw] font-bold leading-[0.9] tracking-[-0.04em] sm:text-6xl lg:text-[92px]">
              {lang === "cn" ? (<>我们不再是<br /><span className="text-lime">单一物种</span>。</>) : (<>We are no longer<br /><span className="text-lime">one species</span>.</>)}
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-background/75">
              {lang === "cn"
                ? "HUMAN+ 不是科幻,而是正在发生的商业现实。当每一个个体都嵌入 AI,每一家公司都在被 Agent 重写。"
                : "HUMAN+ is not sci-fi — it is the arriving business reality. As every individual embeds AI, every company is being rewritten by agents."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-background/15 pt-6">
            {[
              { k: "AI Native", v: "62%", d: lang === "cn" ? "全球企业已部署" : "of global enterprises" },
              { k: "Agent Ops", v: "3.4x", d: lang === "cn" ? "生产效率提升" : "productivity lift" },
              { k: "Human+", v: "2029", d: lang === "cn" ? "融合临界点" : "convergence tipping point" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-[10px] uppercase tracking-widest text-background/50">{s.k}</div>
                <div className="mt-2 font-display text-3xl font-bold text-lime">{s.v}</div>
                <div className="mt-1 text-[11px] text-background/60">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- VISUAL FIELD ---------- */

function VisualField() {
  const { lang } = useLang();
  const tiles = [
    { src: editoHumanPlus, title: { cn: "神经界面", en: "Neural Interface" }, tag: "HUMAN+", color: "violet" as const, span: "lg:col-span-2 lg:row-span-2", ratio: "aspect-[4/5] lg:aspect-auto" },
    { src: editoCathedral, title: { cn: "数据殿堂", en: "The Data Cathedral" }, tag: "INFRA", color: "lime" as const, span: "lg:col-span-2", ratio: "aspect-[16/9]" },
    { src: editoHand, title: { cn: "AI 之触", en: "The Touch" }, tag: "AGENT", color: "signal" as const, span: "lg:col-span-1", ratio: "aspect-[4/5]" },
    { src: editoMist, title: { cn: "未来行者", en: "The Walker" }, tag: "FUTURE", color: "alert" as const, span: "lg:col-span-1", ratio: "aspect-[4/5]" },
  ];
  const t = useT();
  return (
    <section className="border-b border-border bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="§ 06" label={lang === "cn" ? "视觉场 · Visual Field" : "Visual Field"} en="AI Futures Imagery" color="violet" />
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>一场关于 <span className="text-violet">AI 未来</span> 的视觉调查。</>) : (<>A visual survey of the <span className="text-violet">AI future</span>.</>)}
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:auto-rows-[260px]">
          {tiles.map((tile) => (
            <figure key={tile.tag} className={"group relative overflow-hidden rounded-2xl border border-border bg-foreground " + tile.span + " " + tile.ratio}>
              <img src={tile.src} alt={str(tile.title)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-background">
                <div>
                  <div className={"inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] " + accentClass[tile.color]}>{tile.tag}</div>
                  <div className="mt-2 font-display text-2xl font-bold leading-tight">{t(tile.title)}</div>
                </div>
                <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border-2 border-foreground bg-foreground text-background">
          <div className="flex items-center gap-6 whitespace-nowrap py-4">
            <div className="flex animate-[scroll_50s_linear_infinite] gap-10 px-6 font-display text-3xl font-bold lg:text-5xl">
              {["HUMAN +", "AI NATIVE", "AGENT ECONOMY", "POST-SEARCH", "CREATOR × MACHINE", "NEW BUSINESS OS", "HUMAN +", "AI NATIVE", "AGENT ECONOMY", "POST-SEARCH", "CREATOR × MACHINE", "NEW BUSINESS OS"].map((w, i) => (
                <span key={i} className={i % 2 === 0 ? "text-background" : "text-lime"}>
                  {w} <span className="text-signal">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- GROWTH SYSTEM ---------- */

function GrowthSystem() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionLabel index="§ 07" label={lang === "cn" ? "AI 商业增长系统" : "AI Business Growth System"} en="AI Business Growth System" color="lime" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl">
              {lang === "cn" ? (<>让 AI 从工具,<br /><span className="bg-lime px-1">变成增长系统</span>。</>) : (<>Turn AI from a tool<br />into a <span className="bg-lime px-1">growth system</span>.</>)}
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {lang === "cn"
                ? "10 个增长引擎,从战略、品牌、内容、搜索、Agent、组织到数据资产。"
                : "Ten growth engines — strategy, brand, content, search, agent, org and data assets."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {growthSystem.map((g) => (
              <div key={g.code} className={"group cursor-pointer rounded-xl border-l-4 bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg " + accentBorder[g.color]}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-muted-foreground">{g.code}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div className="mt-4 font-display text-lg font-bold leading-tight tracking-tight">{t(g.title)}</div>
                <div className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{t(g.desc)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- KEY PLAYERS ---------- */

function KeyPlayersRadar() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel index="§ 08" label={lang === "cn" ? "全球 AI 关键玩家雷达" : "Key Players Radar"} en="Key Players Radar" color="signal" />
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl">
              {lang === "cn" ? (<>谁在定义下一代<span className="text-signal">AI 商业秩序</span>?</>) : (<>Who defines the next <span className="text-signal">AI business order</span>?</>)}
            </h2>
          </div>
          <Link to="/key-players" className="text-sm font-semibold hover:text-signal">
            {lang === "cn" ? "全部玩家 →" : "All players →"}
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-foreground">
          <div className="grid grid-cols-12 gap-4 border-b-2 border-foreground bg-foreground px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
            <div className="col-span-4">Company</div>
            <div className="col-span-1">Region</div>
            <div className="col-span-3">Sector</div>
            <div className="col-span-3">Signal</div>
            <div className="col-span-1 text-right">Score</div>
          </div>
          {keyPlayers.map((p, i) => (
            <div key={p.name} className="grid grid-cols-12 items-center gap-4 bg-background px-6 py-4 transition-colors hover:bg-paper">
              <div className="col-span-4 flex items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-base font-bold">{p.name}</span>
              </div>
              <div className="col-span-1">
                <span className={"rounded-sm px-1.5 py-0.5 text-[10px] font-bold " + (p.region === "CN" ? "bg-alert text-white" : "bg-violet text-white")}>{p.region}</span>
              </div>
              <div className="col-span-3 text-[13px] text-foreground">{t(p.sector)}</div>
              <div className="col-span-3 text-[13px] text-muted-foreground">{t(p.note)}</div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <span className="font-display text-lg font-bold">{p.score}</span>
                <span className={"font-mono text-[10px] " + (p.delta.startsWith("+") ? "text-violet" : p.delta === "0" ? "text-muted-foreground" : "text-alert")}>{p.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- REPORTS ---------- */

function ReportsRow() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-background/60">
              <span className="font-mono">§ 09</span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span>{lang === "cn" ? "报告与方法论" : "Reports & Playbooks"}</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>把趋势变成<span className="text-lime">可执行的操作手册</span>。</>) : (<>Turn trends into <span className="text-lime">executable playbooks</span>.</>)}
            </h2>
          </div>
          <Link to="/reports" className="text-sm font-semibold text-background/80 hover:text-lime">
            {lang === "cn" ? "全部报告 →" : "All reports →"}
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reports.map((r) => (
            <Link
              key={r.id}
              to="/reports/$slug"
              params={{ slug: r.slug }}
              className="group flex flex-col rounded-2xl border border-background/15 bg-background/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-background/40 hover:bg-background/[0.06]"
            >
              <span className={"self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest " + accentClass[r.color]}>
                {t(r.tag)}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight">{t(r.title)}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-background/70">{t(r.excerpt)}</p>
              <div className="mt-6 flex items-center justify-between border-t border-background/10 pt-4 text-[11px] text-background/60">
                <span>{r.pages} pages · {r.format}</span>
                <span className="flex items-center gap-1 font-semibold text-lime">
                  {lang === "cn" ? "下载报告" : "Download"} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------- CONSULTING ---------- */

function Consulting() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionLabel index="§ 10" label={lang === "cn" ? "咨询 · 培训 · 共创" : "Consulting"} en="Consulting" color="alert" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>让 AI 从工具,<br /><span className="text-alert">变成增长系统。</span></>) : (<>From tool to<br /><span className="text-alert">growth engine.</span></>)}
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {lang === "cn"
                ? "我们与 CEO、CMO、CTO 以及品牌与广告主一起工作,把 AI 深度嵌入战略、组织、内容、营销与数据资产。"
                : "We work with CEO, CMO, CTO and advertisers to embed AI into strategy, org, content, marketing and data assets."}
            </p>

            <Link to="/consulting" className="mt-8 inline-flex items-center gap-2 rounded-full bg-alert px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              {lang === "cn" ? "预约 30 分钟 AI 增长诊断" : "Book 30-min AI growth diagnostic"} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {consultingServices.map((s, i) => (
              <div key={i} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>SVC · {String(i + 1).padStart(2, "0")}</span>
                  <span>{t(s.duration)}</span>
                </div>
                <div className="mt-4 font-display text-lg font-bold leading-tight">{t(s.title)}</div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{t(s.desc)}</p>
                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-foreground">
                  {lang === "cn" ? "预约咨询" : "Book"} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */

function Newsletter() {
  const { lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="§ 11" label="Newsletter" en="Weekly Signal" color="signal" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              {lang === "cn" ? (<>每周收到<br /><span className="bg-signal px-1">全球 AI 商业信号</span>。</>) : (<>Weekly<br /><span className="bg-signal px-1">global AI business signals</span>.</>)}
            </h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-border bg-paper p-6">
            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</label>
            <input type="email" placeholder="you@company.com" className="mt-2 w-full border-b-2 border-foreground bg-transparent py-2 text-base outline-none" />
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-violet">
              {lang === "cn" ? "订阅 · Subscribe" : "Subscribe"} <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
              <TrendingUp className="h-3 w-3" /> {lang === "cn" ? "每周一封 · 全球 AI 商业增长精选" : "One email per week · curated global AI business growth"}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
