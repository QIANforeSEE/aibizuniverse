import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { featured, signals, articleBodies } from "@/lib/mock-data";
import editoRobot from "@/assets/edito-robot.jpg";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }) => {
    const f = featured.find((x) => x.slug === params.slug);
    const s = signals.find((x) => x.slug === params.slug);
    if (!f && !s) throw notFound();
    return { featured: f, signal: s };
  },
  head: ({ params }) => {
    const item =
      featured.find((x) => x.slug === params.slug) ??
      signals.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: item ? `${item.title} · AI商业宇宙` : "文章 · AI商业宇宙" },
        { name: "description", content: item?.excerpt ?? "" },
        { property: "og:title", content: item?.title ?? "AI商业宇宙" },
        { property: "og:description", content: item?.excerpt ?? "" },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h1 className="font-display text-4xl">文章未找到</h1>
        <Link to="/" className="mt-6 inline-block text-sm underline">返回首页</Link>
      </div>
    </SiteLayout>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { featured: f, signal: s } = Route.useLoaderData();
  const item = f ?? s!;
  const body =
    articleBodies[item.slug] ?? {
      kicker: "AI Business",
      sections: [
        {
          heading: "编辑部速递",
          paragraphs: [
            item.excerpt,
            "完整深度分析正在编辑部内部评审中,更多结构化解读将随本主题在报告频道同步上线。",
          ],
        },
      ],
    };

  return (
    <SiteLayout>
      <article>
        <div className="border-b border-border bg-paper">
          <div className="mx-auto max-w-[900px] px-6 py-14 lg:px-10 lg:py-20">
            <Link to="/" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> 返回首页
            </Link>
            <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {body.kicker}
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground lg:text-6xl">
              {item.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{item.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
              {f && <span>作者 · {f.author}</span>}
              {f && <span>· {f.time}</span>}
              {f && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {f.readMin} 分钟阅读
                </span>
              )}
              {s && <span>{s.time}</span>}
            </div>
          </div>
        </div>

        <img
          src={editoRobot}
          alt=""
          width={1920}
          height={1080}
          className="h-[320px] w-full object-cover lg:h-[520px]"
        />

        <div className="mx-auto max-w-[760px] px-6 py-16 lg:px-0 lg:py-24">
          {f && f.takeaways.length > 0 && (
            <aside className="mb-12 rounded-lg border-l-4 border-l-lime bg-paper p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Key Takeaways · 关键要点
              </div>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-foreground">
                {f.takeaways.map((t: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="space-y-10">
            {body.sections.map((sec, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl leading-tight text-foreground lg:text-3xl">
                  {sec.heading}
                </h2>
                <div className="mt-5 space-y-5 text-[17px] leading-[1.8] text-foreground/85">
                  {sec.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8">
            <Link to="/agent" className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">
              与 AI 商业宇宙智能体讨论本文 →
            </Link>
            <Link to="/reports" className="rounded-full border border-border px-5 py-3 text-sm">
              下载相关报告
            </Link>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
