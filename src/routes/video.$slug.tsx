import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { videos } from "@/lib/mock-data";
import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";

export const Route = createFileRoute("/video/$slug")({
  loader: ({ params }) => {
    const v = videos.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "视频"} · AI商业宇宙` },
      { name: "description", content: loaderData?.excerpt ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">视频未找到</h1>
        <Link to="/video" className="mt-6 inline-block text-sm underline">返回视频频道</Link>
      </div>
    </SiteLayout>
  ),
  component: VideoDetail,
});

const thumbs = { v1: videoThumb1, v2: videoThumb2 } as const;

function VideoDetail() {
  const v = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">
          <Link to="/video" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-background/70 hover:text-lime">
            <ArrowLeft className="h-3 w-3" /> 返回视频频道
          </Link>
          <div className="relative mt-6 aspect-video overflow-hidden rounded-lg bg-black">
            <img src={thumbs[v.thumb as keyof typeof thumbs]} alt={v.title} width={1920} height={1080} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-foreground shadow-2xl transition-transform hover:scale-105">
                <Play className="h-8 w-8 fill-current" />
              </button>
            </div>
            <span className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 font-mono text-xs text-background">
              {v.duration}
            </span>
          </div>
          <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-lime">{v.category}</div>
          <h1 className="mt-3 font-display text-3xl leading-tight lg:text-5xl">{v.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-background/80">{v.excerpt}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["拍摄制作 · Production", "研究支持 · Research", "编辑部评审 · Editorial"].map((k) => (
              <div key={k} className="rounded border border-background/15 p-4 text-sm text-background/75">
                {k} — AI 商业宇宙编辑部
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
