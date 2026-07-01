import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { audios } from "@/lib/mock-data";
import { useT, useLang } from "@/lib/i18n";
import { audioThumbs, str } from "@/lib/thumbs";

export const Route = createFileRoute("/podcast/$slug")({
  loader: ({ params }) => {
    const a = audios.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => {
    const title = str(loaderData?.title, "Podcast");
    const desc = str(loaderData?.excerpt, "");
    return {
      meta: [
        { title: `${title} · AI Business Universe Podcast` },
        { name: "description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Not found</h1>
        <Link to="/podcast" className="mt-6 inline-block text-sm underline">Back</Link>
      </div>
    </SiteLayout>
  ),
  component: PodcastDetail,
});

function PodcastDetail() {
  const a = Route.useLoaderData();
  const t = useT();
  const { lang } = useLang();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1000px] px-6 py-12 lg:px-10 lg:py-20">
        <Link to="/podcast" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> {lang === "cn" ? "返回播客" : "Back to Podcast"}
        </Link>
        <div className="mt-10 grid gap-10 md:grid-cols-[320px_1fr]">
          <img src={audioThumbs[a.thumb as keyof typeof audioThumbs]} alt={str(a.title)} width={640} height={640} className="aspect-square w-full rounded-lg object-cover shadow-xl" />
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-signal">{t(a.category)}</div>
            <h1 className="mt-3 font-display text-3xl leading-tight lg:text-5xl">{t(a.title)}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t(a.excerpt)}</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
