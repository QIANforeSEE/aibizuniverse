import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Headphones } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { audios } from "@/lib/mock-data";
import audioThumb1 from "@/assets/audio-thumb-1.jpg";
import audioThumb2 from "@/assets/audio-thumb-2.jpg";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "音乐 & 播客频道 Music · AI商业宇宙" },
      { name: "description", content: "AI 商业深度播客、创始人音频札记、AI 原生环境音乐与增长电台。" },
      { property: "og:title", content: "音乐 & 播客频道 · AI Business Universe Audio" },
      { property: "og:description", content: "AI 商业深度播客、创始人音频札记、AI 原生环境音乐与增长电台。" },
    ],
  }),
  component: MusicPage,
});

const thumbs = { a1: audioThumb1, a2: audioThumb2 } as const;

const chip = {
  lime: "bg-lime text-foreground",
  violet: "bg-violet text-white",
  signal: "bg-signal text-foreground",
  alert: "bg-alert text-white",
} as const;

function MusicPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-signal/10">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <span className="rounded-full bg-signal px-3 py-1 text-foreground">Channel · Audio</span>
            <span className="h-px flex-1 bg-border" />
            <span>Podcast · Music · Field Notes</span>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-foreground lg:text-7xl">
            音乐 & 播客 <span className="text-signal">/ Sound</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/75">
            用耳朵理解 AI 商业。深度播客、创始人音频札记、AI 原生环境音乐与每周增长电台,把商业世界的信号转成可以听的语言。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <SectionLabel index="A · 01" label="正在播放" en="Now Playing" color="signal" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {audios.map((a) => (
            <Link
              key={a.id}
              to="/music/$slug"
              params={{ slug: a.slug }}
              className="group flex overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
            >
              <div className="relative w-40 shrink-0 sm:w-56">
                <img
                  src={thumbs[a.thumb]}
                  alt={a.title}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
                  <span className={`rounded-full px-2.5 py-1 ${chip[a.color]}`}>{a.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Headphones className="h-3 w-3" />
                    {a.duration}
                  </span>
                </div>
                <h3 className="font-display text-xl leading-snug group-hover:text-violet">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
