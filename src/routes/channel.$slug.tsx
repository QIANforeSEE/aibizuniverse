import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Headphones, FileText, ArrowUpRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { channels, getChannel, matchesChannel, type ChannelColor } from "@/lib/channels";
import { featured, signals, videos, audios, reports } from "@/lib/mock-data";
import { videoThumbs, audioThumbs, str } from "@/lib/thumbs";
import { useT, useLang } from "@/lib/i18n";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/seo";

export const Route = createFileRoute("/channel/$slug")({
  loader: ({ params }) => {
    const ch = getChannel(params.slug);
    if (!ch) throw notFound();
    return ch;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: `Channel · ${SITE_NAME}` }] };
    const url = absUrl(`/channel/${params.slug}`);
    const nameCN = str(loaderData.name);
    const nameEN = typeof loaderData.name === "string" ? loaderData.name : loaderData.name.en;
    const descCN = str(loaderData.desc);
    const descEN = typeof loaderData.desc === "string" ? loaderData.desc : loaderData.desc.en;
    const title = `${nameCN} · ${nameEN} — ${SITE_NAME}`;
    const desc = `${descCN} — ${descEN}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:title", content: `${nameCN} · ${nameEN}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:locale", content: "zh_CN" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${nameCN} · ${nameEN}` },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${nameCN} · ${nameEN}`,
            description: desc,
            url,
            inLanguage: ["zh-CN", "en-US"],
            isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          }),
        },
      ],
    };
  },

  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Channel not found</h1>
        <Link to="/" className="mt-6 inline-block text-sm underline">Back home</Link>
      </div>
    </SiteLayout>
  ),
  component: ChannelPage,
});

const COLOR_BG: Record<ChannelColor, string> = {
  lime: "bg-lime text-black",
  violet: "bg-violet text-white",
  signal: "bg-signal text-black",
  alert: "bg-alert text-white",
};

function ChannelPage() {
  const ch = Route.useLoaderData();
  const t = useT();
  const { pick } = useLang();

  const chFeatured = featured.filter((f) => matchesChannel(f, ch));
  const chSignals = signals.filter((s) => matchesChannel(s, ch));
  const chVideos = videos.filter((v) => matchesChannel(v, ch));
  const chPodcasts = audios.filter((a) => a.kind === "podcast" && matchesChannel(a, ch));
  const chReports = reports.filter((r) => matchesChannel(r, ch));

  const totalCount =
    chFeatured.length + chSignals.length + chVideos.length + chPodcasts.length + chReports.length;

  // Fallback: if nothing matched, still show a slim curated slice so the page never looks empty.
  const showFeatured = chFeatured.length ? chFeatured : featured.slice(0, 2);
  const showSignals = chSignals.length ? chSignals : signals.slice(0, 3);
  const showVideos = chVideos.length ? chVideos : videos.slice(0, 4);
  const showPodcasts = chPodcasts.length ? chPodcasts : audios.filter((a) => a.kind === "podcast").slice(0, 2);
  const showReports = chReports.length ? chReports : reports.slice(0, 2);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className={`border-b border-border/60 ${COLOR_BG[ch.color as ChannelColor]}`}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] opacity-80 hover:opacity-100"
          >
            <ArrowLeft className="h-3 w-3" /> {pick("返回首页", "Back home")}
          </Link>
          <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] opacity-80">
            {pick("频道 · Channel", "Channel")} / {ch.slug}
          </div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight lg:text-7xl">
            {t(ch.name)}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-2xl font-semibold leading-tight opacity-90 lg:text-3xl">
            {t(ch.tagline)}
          </p>
          <p className="mt-6 max-w-2xl text-base opacity-80 lg:text-lg">{t(ch.desc)}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest opacity-80">
            <span>{totalCount} {pick("条内容匹配", "items matched")}</span>
            <span>·</span>
            <span>
              {chFeatured.length} {pick("文章", "articles")} · {chVideos.length} {pick("视频", "videos")} ·{" "}
              {chPodcasts.length} {pick("播客", "podcasts")} · {chReports.length} {pick("报告", "reports")}
            </span>
          </div>
        </div>
      </section>

      {/* CHANNEL SWITCHER */}
      <section className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-[1400px] overflow-x-auto px-6 py-4 lg:px-10">
          <div className="flex min-w-max items-center gap-2">
            <span className="mr-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {pick("频道", "Channels")}
            </span>
            {channels.map((c) => {
              const active = c.slug === ch.slug;
              return (
                <Link
                  key={c.slug}
                  to="/channel/$slug"
                  params={{ slug: c.slug }}
                  className={
                    "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition " +
                    (active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground")
                  }
                >
                  {t(c.name)}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {showFeatured.length > 0 && (
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <SectionLabel index="§ 01" label="深度文章" en="Featured Analysis" color={ch.color} />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {showFeatured.map((f) => (
                <Link
                  key={f.id}
                  to="/article/$slug"
                  params={{ slug: f.slug }}
                  className="group rounded-2xl border border-border p-8 transition hover:border-foreground"
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-violet">
                    {t(f.category)}
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight group-hover:text-violet">
                    {t(f.title)}
                  </h3>
                  <p className="mt-4 text-muted-foreground">{t(f.excerpt)}</p>
                  <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{f.author}</span>
                    <span>·</span>
                    <span>{f.time}</span>
                    <span>·</span>
                    <span>{f.readMin} min</span>
                    <ArrowUpRight className="ml-auto h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VIDEOS */}
      {showVideos.length > 0 && (
        <section className="border-b border-border/60 bg-muted/30">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <div className="flex items-end justify-between">
              <SectionLabel index="§ 02" label="视频" en="Video" color="alert" />
              <Link to="/video" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                {pick("全部视频 →", "All video →")}
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {showVideos.map((v) => (
                <Link
                  key={v.id}
                  to="/video/$slug"
                  params={{ slug: v.slug }}
                  className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:border-foreground"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={videoThumbs[v.thumb]}
                      alt={str(v.title)}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white">
                      {v.duration}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-black">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {t(v.category)}
                    </div>
                    <h4 className="mt-2 font-display text-base font-bold leading-tight group-hover:text-violet">
                      {t(v.title)}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SIGNALS (image + text) */}
      {showSignals.length > 0 && (
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <SectionLabel index="§ 03" label="信号快讯" en="Signals" color="signal" />
            <div className="mt-8 divide-y divide-border rounded-2xl border border-border">
              {showSignals.map((s) => (
                <Link
                  key={s.id}
                  to="/article/$slug"
                  params={{ slug: s.slug }}
                  className="flex items-center gap-4 p-5 transition hover:bg-muted/50"
                >
                  <FileText className="h-5 w-5 shrink-0 text-signal" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      <span className="font-mono text-signal">IMPACT {s.impact}/5</span>
                      <span>·</span>
                      <span>{t(s.time)}</span>
                    </div>
                    <h4 className="mt-1.5 font-display text-lg font-semibold">{t(s.title)}</h4>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PODCASTS */}
      {showPodcasts.length > 0 && (
        <section className="border-b border-border/60 bg-muted/30">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <div className="flex items-end justify-between">
              <SectionLabel index="§ 04" label="播客" en="Podcasts" color="lime" />
              <Link to="/podcast" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                {pick("全部播客 →", "All podcasts →")}
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {showPodcasts.map((p) => (
                <Link
                  key={p.id}
                  to="/podcast/$slug"
                  params={{ slug: p.slug }}
                  className="group flex gap-5 rounded-2xl border border-border bg-background p-5 transition hover:border-foreground"
                >
                  <img
                    src={audioThumbs[p.thumb]}
                    alt={str(p.title)}
                    className="h-24 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      <Headphones className="h-3 w-3" /> {t(p.category)} · {p.duration}
                    </div>
                    <h4 className="mt-2 font-display text-lg font-bold leading-tight group-hover:text-violet">
                      {t(p.title)}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{t(p.excerpt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REPORTS */}
      {showReports.length > 0 && (
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <SectionLabel index="§ 05" label="研究报告" en="Research Reports" color="violet" />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {showReports.map((r) => (
                <Link
                  key={r.id}
                  to="/reports/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-2xl border border-border p-8 transition hover:border-foreground"
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-violet">{t(r.tag)}</div>
                  <h4 className="mt-3 font-display text-2xl font-bold leading-tight group-hover:text-violet">
                    {t(r.title)}
                  </h4>
                  <p className="mt-3 text-muted-foreground">{t(r.excerpt)}</p>
                  <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
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
      )}

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <SectionLabel index="§ CTA" label="向智能体提问" en="Ask the Agent" color="lime" />
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight lg:text-5xl">
            {pick(
              `把关于 “${str(ch.name)}” 的问题交给 AI 商业宇宙智能体`,
              `Hand your questions about "${typeof ch.name === "string" ? ch.name : ch.name.en}" to the AI Business Universe Agent`,

            )}
          </h2>
          <Link
            to="/agent"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-semibold text-black transition hover:bg-white"
          >
            {pick("打开 AI 智能体 →", "Open the AI Agent →")}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
