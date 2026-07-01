import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { videos } from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";
import { videoThumbs, str } from "@/lib/thumbs";
import { buildDetailHead, absUrl } from "@/lib/seo";

export const Route = createFileRoute("/video/$slug")({
  loader: ({ params }) => {
    const v = videos.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: `Video · AI商业宇宙 · AI Business Universe` }] };
    }
    const base = buildDetailHead({
      path: `/video/${params.slug}`,
      title: loaderData.title,
      description: loaderData.excerpt,
      image: videoThumbs[loaderData.thumb],
      type: "video.other",
    });
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: str(loaderData.title),
      description: str(loaderData.excerpt),
      thumbnailUrl: absUrl(videoThumbs[loaderData.thumb]),
      uploadDate: "2026-01-01",
      duration: `PT${loaderData.duration.replace(":", "M")}S`,
      inLanguage: ["zh-CN", "en"],
      publisher: {
        "@type": "Organization",
        name: "AI商业宇宙 · AI Business Universe",
        url: "https://aibizuniverse.lovable.app/",
      },
    };
    return {
      ...base,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Not found</h1>
        <Link to="/video" className="mt-6 inline-block text-sm underline">Back</Link>
      </div>
    </SiteLayout>
  ),
  component: VideoDetail,
});

function VideoDetail() {
  const v = Route.useLoaderData();
  const t = useT();
  const { lang } = useLang();
  return (
    <SiteLayout>
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">
          <Link to="/video" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-background/70 hover:text-lime">
            <ArrowLeft className="h-3 w-3" /> {lang === "cn" ? "返回视频频道" : "Back to Video"}
          </Link>
          <div className="relative mt-6 aspect-video overflow-hidden rounded-lg bg-black">
            <img src={videoThumbs[v.thumb as keyof typeof videoThumbs]} alt={str(v.title)} width={1920} height={1080} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-foreground shadow-2xl transition-transform hover:scale-105">
                <Play className="h-8 w-8 fill-current" />
              </button>
            </div>
            <span className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 font-mono text-xs text-background">
              {v.duration}
            </span>
          </div>
          <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-lime">{t(v.category)}</div>
          <h1 className="mt-3 font-display text-3xl leading-tight lg:text-5xl">{t(v.title)}</h1>
          <p className="mt-4 max-w-3xl text-lg text-background/80">{t(v.excerpt)}</p>
        </div>
      </div>
    </SiteLayout>
  );
}
