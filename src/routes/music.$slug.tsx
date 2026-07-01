import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { audios } from "@/lib/mock-data";
import audioThumb1 from "@/assets/audio-thumb-1.jpg";
import audioThumb2 from "@/assets/audio-thumb-2.jpg";

export const Route = createFileRoute("/music/$slug")({
  loader: ({ params }) => {
    const a = audios.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "音频"} · AI商业宇宙` },
      { name: "description", content: loaderData?.excerpt ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">音频未找到</h1>
        <Link to="/music" className="mt-6 inline-block text-sm underline">返回音频频道</Link>
      </div>
    </SiteLayout>
  ),
  component: MusicDetail,
});

const thumbs = { a1: audioThumb1, a2: audioThumb2 } as const;

function MusicDetail() {
  const a = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1000px] px-6 py-12 lg:px-10 lg:py-20">
        <Link to="/music" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> 返回音频频道
        </Link>

        <div className="mt-10 grid gap-10 md:grid-cols-[320px_1fr]">
          <img
            src={thumbs[a.thumb]}
            alt={a.title}
            width={640}
            height={640}
            className="aspect-square w-full rounded-lg object-cover shadow-xl"
          />
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-signal">{a.category}</div>
            <h1 className="mt-3 font-display text-3xl leading-tight lg:text-5xl">{a.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{a.excerpt}</p>

            <div className="mt-8 rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-4">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                  <Play className="h-5 w-5 fill-current" />
                </button>
                <div className="flex-1">
                  <div className="h-1.5 w-full rounded-full bg-border">
                    <div className="h-1.5 w-1/4 rounded-full bg-signal" />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                    <span>04:12</span>
                    <span>{a.duration}</span>
                  </div>
                </div>
                <button className="rounded-md border border-border p-2 text-muted-foreground">
                  <Pause className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-[16px] leading-[1.8] text-foreground/85">
              <p>本期节目由 AI 商业宇宙编辑部制作,聚焦企业 AI 商业化关键议题,面向 CEO、CMO 与创新负责人。</p>
              <p>音频完整版将同步在主流播客平台上线。订阅《AI 商业宇宙 · 每周简报》即可第一时间收到更新提醒。</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
