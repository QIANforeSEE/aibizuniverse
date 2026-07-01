import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import {
  signals,
  featured,
  growthSystem,
  keyPlayers,
  reports,
  consultingServices,
  suggestedQuestions,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI商业宇宙 AI Business Universe — 看懂AI，重构商业增长" },
      {
        name: "description",
        content:
          "AI+时代商业增长智库。为企业、品牌与广告主提供 AI 商业分析、增长方法论、咨询培训、共创服务与智能体问答系统。",
      },
      { property: "og:title", content: "AI商业宇宙 · AI Business Universe" },
      {
        property: "og:description",
        content: "AI Business Growth Intelligence Platform · 看懂AI，重构商业增长。",
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
      <Hero />
      <SignalStrip />
      <FeaturedAnalysis />
      <GrowthSystem />
      <KeyPlayersRadar />
      <ReportsRow />
      <Consulting />
      <AgentEntry />
      <Newsletter />
    </SiteLayout>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-lime/40 blur-3xl" />
      <div className="absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-violet/25 blur-3xl" />
      <div className="absolute right-1/3 top-1/2 h-[200px] w-[200px] rounded-full bg-signal/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-14 pb-20 lg:px-10 lg:pt-24 lg:pb-32">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          <span className="rounded-full bg-foreground px-3 py-1 text-background">Issue 03 · 2026</span>
          <span className="h-px flex-1 bg-border" />
          <span>AI Business Growth Intelligence</span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <h1 className="font-display text-[13vw] leading-[0.88] tracking-[-0.04em] text-foreground text-balance sm:text-[88px] lg:text-[132px]">
              AI<span className="text-violet">商</span>业
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">宇</span>
                <span className="absolute inset-x-0 bottom-2 z-0 h-4 bg-lime" />
              </span>
              宙<span className="text-signal">.</span>
            </h1>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-display text-2xl font-medium text-muted-foreground lg:text-3xl">
              <span>AI</span>
              <span>Business</span>
              <span>Universe</span>
              <span className="h-1.5 w-1.5 rounded-full bg-alert" />
              <span className="text-base text-muted-foreground/80">
                AI+ 时代商业增长智库
              </span>
            </div>

            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-foreground text-balance lg:text-2xl">
              看懂 AI，重构商业增长。<br className="hidden lg:block" />
              为 <span className="underline decoration-lime decoration-4 underline-offset-4">企业、品牌与广告主</span>{" "}
              提供 AI 商业分析、增长方法论、咨询培训、共创服务与智能体问答系统。
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/agent"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4 text-lime" />
                进入 AI 商业宇宙智能体
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/consulting"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                预约 AI 增长咨询
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/analysis"
                className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-foreground hover:bg-accent"
              >
                阅读最新分析 →
              </Link>
              <Link
                to="/reports"
                className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-foreground hover:bg-accent"
              >
                下载趋势报告 ↓
              </Link>
            </div>
          </div>

          {/* Editorial data card */}
          <div className="relative">
            <div className="rounded-2xl border-2 border-foreground bg-background p-6 shadow-[8px_8px_0_0_var(--color-lime)]">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span>Today · 今日 AI 商业地图</span>
                <span className="flex items-center gap-1.5 text-alert">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-alert" /> LIVE
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { k: "Signals", v: "128", d: "+24", c: "lime" },
                  { k: "Reports", v: "42", d: "+3", c: "violet" },
                  { k: "Players", v: "196", d: "+7", c: "signal" },
                ].map((s) => (
                  <div key={s.k} className="rounded-lg bg-paper p-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
                    <div className="mt-1 font-display text-3xl font-bold">{s.v}</div>
                    <div
                      className={
                        "mt-1 text-[11px] font-semibold " +
                        (s.c === "lime" ? "text-violet" : s.c === "violet" ? "text-signal" : "text-alert")
                      }
                    >
                      {s.d} · 7d
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {signals.slice(0, 3).map((s, i) => (
                  <div key={s.id} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold leading-snug text-foreground">
                        {s.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>Impact</span>
                        <span className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <span
                              key={k}
                              className={
                                "h-1 w-2.5 rounded-sm " +
                                (k < s.impact ? "bg-alert" : "bg-border")
                              }
                            />
                          ))}
                        </span>
                        <span>· {s.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className="text-muted-foreground">AI Business Index</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-violet" /> 87.4 · +2.1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SIGNAL STRIP ---------- */

function SignalStrip() {
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
                {s.title}
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
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="§ 02" label="精选深度分析" en="Featured Analysis" color="violet" />
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              读懂本周 AI 商业的<span className="text-violet">结构性变化</span>。
            </h2>
          </div>
          <Link to="/analysis" className="text-sm font-semibold text-foreground hover:text-violet">
            所有分析 →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {featured.map((f, idx) => (
            <article
              key={f.id}
              className={
                "group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--color-foreground)] " +
                (idx === 0 ? "lg:col-span-2 lg:row-span-1" : "")
              }
            >
              <div className="flex items-center justify-between">
                <span className={"rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest " + accentClass[f.color]}>
                  {f.category}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{f.time}</span>
              </div>

              <h3
                className={
                  "mt-6 font-display font-bold leading-[1.1] tracking-tight text-foreground " +
                  (idx === 0 ? "text-4xl lg:text-5xl" : "text-2xl")
                }
              >
                {f.title}
              </h3>

              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{f.excerpt}</p>

              {idx === 0 && (
                <div className="mt-6 rounded-xl bg-paper p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet">
                    Key Takeaways · 核心结论
                  </div>
                  <ul className="mt-3 space-y-2">
                    {f.takeaways.map((t, i) => (
                      <li key={i} className="flex gap-3 text-[13px] leading-snug text-foreground">
                        <span className="font-mono text-muted-foreground">0{i + 1}</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between pt-6 text-[12px] text-muted-foreground">
                <span>{f.author} · {f.readMin} 分钟阅读</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GROWTH SYSTEM ---------- */

function GrowthSystem() {
  return (
    <section className="border-b border-border bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionLabel index="§ 03" label="AI 商业增长系统" en="AI Business Growth System" color="lime" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl">
              让 AI 从工具，
              <br />
              <span className="bg-lime px-1">变成增长系统</span>。
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              AI 商业宇宙的 10 个增长引擎，从战略、品牌、内容、搜索、Agent、组织到数据资产，
              为企业与品牌搭建一整套可复用、可复利的 AI 增长操作系统。
            </p>
            <Link
              to="/playbooks"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-violet"
            >
              查看完整方法论 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
            {growthSystem.map((g) => (
              <div
                key={g.code}
                className={
                  "group cursor-pointer rounded-xl border-l-4 bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg " +
                  accentBorder[g.color]
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-muted-foreground">{g.code}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div className="mt-4 font-display text-lg font-bold leading-tight tracking-tight">
                  {g.title}
                </div>
                <div className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  {g.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- KEY PLAYERS RADAR ---------- */

function KeyPlayersRadar() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel index="§ 04" label="全球 AI 关键玩家雷达" en="Key Players Radar" color="signal" />
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl">
              谁在定义下一代<span className="text-signal">AI 商业秩序</span>？
            </h2>
          </div>
          <Link to="/key-players" className="text-sm font-semibold hover:text-signal">
            全部玩家 →
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-foreground">
          <div className="grid grid-cols-12 gap-4 border-b-2 border-foreground bg-foreground px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
            <div className="col-span-4">Company</div>
            <div className="col-span-1">Region</div>
            <div className="col-span-3">Sector</div>
            <div className="col-span-3">Signal · 最新动态</div>
            <div className="col-span-1 text-right">Score</div>
          </div>
          {keyPlayers.map((p, i) => (
            <div
              key={p.name}
              className={
                "grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-paper " +
                (i % 2 === 1 ? "bg-background" : "bg-background")
              }
            >
              <div className="col-span-4 flex items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-base font-bold">{p.name}</span>
              </div>
              <div className="col-span-1">
                <span
                  className={
                    "rounded-sm px-1.5 py-0.5 text-[10px] font-bold " +
                    (p.region === "CN" ? "bg-alert text-white" : "bg-violet text-white")
                  }
                >
                  {p.region}
                </span>
              </div>
              <div className="col-span-3 text-[13px] text-foreground">{p.sector}</div>
              <div className="col-span-3 text-[13px] text-muted-foreground">{p.note}</div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <span className="font-display text-lg font-bold">{p.score}</span>
                <span
                  className={
                    "font-mono text-[10px] " +
                    (p.delta.startsWith("+")
                      ? "text-violet"
                      : p.delta === "0"
                        ? "text-muted-foreground"
                        : "text-alert")
                  }
                >
                  {p.delta}
                </span>
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
  return (
    <section className="border-b border-border bg-foreground text-background noise">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-background/60">
              <span className="font-mono">§ 05</span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span>报告与方法论</span>
              <span className="text-background/40">/ Reports & Playbooks</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              把趋势变成<span className="text-lime">可执行的操作手册</span>。
            </h2>
          </div>
          <Link to="/reports" className="text-sm font-semibold text-background/80 hover:text-lime">
            全部报告 →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reports.map((r) => (
            <div
              key={r.id}
              className="group flex flex-col rounded-2xl border border-background/15 bg-background/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-background/40 hover:bg-background/[0.06]"
            >
              <span className={"self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest " + accentClass[r.color]}>
                {r.tag}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight">{r.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-background/70">{r.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-background/10 pt-4 text-[11px] text-background/60">
                <span>{r.pages} pages · {r.format}</span>
                <span className="flex items-center gap-1 font-semibold text-lime">
                  下载 <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONSULTING ---------- */

function Consulting() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionLabel index="§ 06" label="咨询 · 培训 · 共创" en="Consulting" color="alert" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              让 AI 从工具，
              <br />
              <span className="text-alert">变成增长系统。</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              我们与 CEO、CMO、CTO 以及品牌与广告主一起工作，
              把 AI 深度嵌入战略、组织、内容、营销、Agent 与数据资产。
            </p>

            <Link
              to="/consulting"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-alert px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              预约 30 分钟 AI 增长诊断 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {consultingServices.map((s, i) => (
              <div
                key={s.title}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>SVC · {String(i + 1).padStart(2, "0")}</span>
                  <span>{s.duration}</span>
                </div>
                <div className="mt-4 font-display text-lg font-bold leading-tight">{s.title}</div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-foreground">
                  预约咨询 <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- AGENT ENTRY ---------- */

function AgentEntry() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-paper">
      <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-lime/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-[400px] w-[400px] rounded-full bg-violet/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="§ 07" label="AI 商业宇宙智能体" en="Ask the Universe" color="violet" />
          <h2 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight lg:text-7xl">
            问 <span className="text-violet">AI 商业宇宙</span>
            <br />
            智能体。
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            输入你的问题，获得结构化的商业判断、行动建议、参考文章与咨询入口。
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border-2 border-foreground bg-background p-3 shadow-[8px_8px_0_0_var(--color-violet)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                placeholder="例如：我的品牌如何用 AI 提升增长？"
                className="w-full flex-1 bg-transparent px-4 py-4 text-[15px] outline-none placeholder:text-muted-foreground"
              />
              <Link
                to="/agent"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background hover:bg-violet"
              >
                提问 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {suggestedQuestions.map((q) => (
              <Link
                key={q}
                to="/agent"
                className="rounded-full border border-border bg-background px-4 py-2 text-[12px] text-foreground/80 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */

function Newsletter() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="§ 08" label="Newsletter" en="Weekly Signal" color="signal" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
              每周收到<br />
              <span className="bg-signal px-1">全球 AI 商业信号</span>。
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              每周一封，精选全球最重要的 AI 商业信号、深度分析、Key Player 动态与增长方法论。
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-border bg-paper p-6"
          >
            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              邮箱 Email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="mt-2 w-full border-b-2 border-foreground bg-transparent py-2 text-base outline-none"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  公司 Company
                </label>
                <input
                  className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  职位 Title
                </label>
                <input
                  className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                关注方向 Interests
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["AI战略", "品牌增长", "AI营销", "Agent部署", "GEO/AEO", "中国AI", "全球AI"].map((t) => (
                  <label key={t} className="cursor-pointer rounded-full border border-border px-3 py-1 text-[12px] hover:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background">
                    <input type="checkbox" className="hidden" />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-violet">
              订阅 · Subscribe <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
