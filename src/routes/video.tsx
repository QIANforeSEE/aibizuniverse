import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { videos } from "@/lib/mock-data";
import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "视频频道 Video · AI商业宇宙" },
      { name: "description", content: "AI 商业纪录片、主题演讲、圆桌与特稿短片,视觉化解读 AI 商业增长。" },
      { property: "og:title", content: "视频频道 · AI Business Universe Video" },
      { property: "og:description", content: "AI 商业纪录片、主题演讲、圆桌与特稿短片。" },
    ],
  }),
  component: VideoPage,
});

const thumbs = { v1: videoThumb1, v2: videoThumb2 } as const;

function VideoPage() {
  const [hero, ...rest] = videos;
  return (
    <SiteLayout>
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-background/60">
            <span className="rounded-full bg-lime px-3 py-1 text-foreground">Channel · Video</span>
            <span className="h-px flex-1 bg-background/20" />
            <span>AI Business Cinema</span>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] lg:text-7xl">
            视频频道 <span className="text-lime">/ Video</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-background/75">
            用镜头讲述 AI 商业:主题演讲、纪录短片、深度圆桌与品牌特稿。每一部作品,都是一次对 AI 商业世界的近距离观察。
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <Link
          to="/video/$slug"
          params={{ slug: hero.slug }}
          className="group relative block overflow-hidden"
        >
          <img
            src={thumbs[hero.thumb]}
            alt={hero.title}
            width={1920}
            height={900}
            className="h-[480px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[620px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 pb-14 lg:px-10 lg:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              <Play className="h-3 w-3 fill-current" />
              {hero.category} · {hero.duration}
            </span>
            <h2 className="mt-5 max-w-4xl font-display text-3xl leading-tight text-background lg:text-6xl">
              {hero.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-background/80 lg:text-lg">{hero.excerpt}</p>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <SectionLabel index="V · 02" label="更多视频" en="More Films" color="lime" />
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((v) => (
            <Link
              key={v.id}
              to="/video/$slug"
              params={{ slug: v.slug }}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-md bg-foreground">
                <img
                  src={thumbs[v.thumb]}
                  alt={v.title}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-foreground">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 rounded-sm bg-foreground/85 px-2 py-0.5 font-mono text-[11px] text-background">
                  {v.duration}
                </span>
              </div>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {v.category}
              </div>
              <h3 className="mt-2 font-display text-xl leading-snug group-hover:text-violet">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
