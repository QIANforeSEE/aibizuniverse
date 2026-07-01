import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Headphones } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { audios } from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";
import { audioThumbs, str } from "@/lib/thumbs";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast · AI商业宇宙 · AI Business Universe" },
      { name: "description", content: "AI 商业深度播客、CEO 简报、创始人音频札记与商业增长电台。" },
      { property: "og:title", content: "Podcast · AI Business Universe" },
      { property: "og:description", content: "AI business deep-dive podcasts, CEO briefings and founder audio notes." },
    ],
  }),
  component: PodcastPage,
});

const chip = {
  lime: "bg-lime text-foreground",
  violet: "bg-violet text-white",
  signal: "bg-signal text-foreground",
  alert: "bg-alert text-white",
} as const;

function PodcastPage() {
  const t = useT();
  const { lang } = useLang();
  const list = audios.filter((a) => a.kind === "podcast");
  return (
    <SiteLayout>
      <section className="border-b border-border bg-violet/10">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <span className="rounded-full bg-violet px-3 py-1 text-white">Channel · Podcast</span>
            <span className="h-px flex-1 bg-border" />
            <span>{lang === "cn" ? "深度播客 · 创始人对话 · 商业电台" : "Deep podcasts · Founder talks · Growth radio"}</span>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-foreground lg:text-7xl">
            {lang === "cn" ? "播客" : "Podcast"} <span className="text-violet">/ Podcast</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/75">
            {lang === "cn"
              ? "写给 CEO、CMO 与创始人的 AI 商业深度节目。每周更新,15–45 分钟一集。"
              : "AI business deep-dives for CEOs, CMOs and founders. Weekly, 15–45 min per episode."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <SectionLabel index="P · 01" label={lang === "cn" ? "全部剧集" : "All Episodes"} en="All Episodes" color="violet" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {list.map((a) => (
            <Link
              key={a.id}
              to="/podcast/$slug"
              params={{ slug: a.slug }}
              className="group flex overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
            >
              <div className="relative w-40 shrink-0 sm:w-56">
                <img src={audioThumbs[a.thumb]} alt={str(a.title)} loading="lazy" width={640} height={640} className="h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
                  <span className={`rounded-full px-2.5 py-1 ${chip[a.color]}`}>{t(a.category)}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Headphones className="h-3 w-3" />
                    {a.duration}
                  </span>
                </div>
                <h3 className="font-display text-xl leading-snug group-hover:text-violet">{t(a.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(a.excerpt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
