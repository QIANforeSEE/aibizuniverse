import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import { partnerNetwork } from "@/lib/mock-data";
import { UI, useLang, useT } from "@/lib/i18n";

export function SiteFooter() {
  const { lang } = useLang();
  const t = useT();

  const COLS = [
    {
      title: lang === "cn" ? "内容 Content" : "Content",
      links: [
        { to: "/ai-now", label: UI.aiNow },
        { to: "/analysis", label: UI.analysis },
        { to: "/key-players", label: UI.players },
        { to: "/video", label: UI.video },
        { to: "/podcast", label: UI.podcast },
      ],
    },
    {
      title: lang === "cn" ? "产品 Products" : "Products",
      links: [
        { to: "/reports", label: UI.reports },
        { to: "/agent", label: UI.agentFull },
      ],
    },
    {
      title: lang === "cn" ? "服务 Services" : "Services",
      links: [
        { to: "/consulting", label: UI.consulting },
        { to: "/about", label: { cn: "关于我们", en: "About" } },
      ],
    },
  ] as const;

  return (
    <footer className="border-t border-border bg-foreground text-background">
      {/* Partner network */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-background/60">
            <span className="rounded-full bg-lime px-2.5 py-1 text-foreground">{t(UI.network)}</span>
            <span className="h-px flex-1 bg-background/15" />
            <span>{lang === "cn" ? "AI 商业情报生态" : "AI Business Intelligence Ecosystem"}</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerNetwork.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-background/15 bg-background/[0.03] p-5 transition-colors hover:border-lime hover:bg-background/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-background">{p.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-background/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                </div>
                <span className="mt-1 text-[12px] text-background/70">{t(p.desc)}</span>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-background/40">
                  {p.url.replace("https://", "")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logoAsset.url} alt="AI Business Universe" className="h-10 w-10 rounded-md bg-background object-contain p-1" width={40} height={40} />
              <div>
                <div className="font-display text-lg font-bold">
                  {lang === "cn" ? "AI商业宇宙" : "AI Business Universe"}
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-background/60">
                  {lang === "cn" ? "AI Business Universe" : "AI 商业宇宙"}
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
              {lang === "cn"
                ? "AI+ 时代商业增长智库。为企业、品牌与广告主提供 AI 商业分析、增长方法论、咨询培训、共创服务与智能体问答系统。"
                : "AI-era business growth intelligence platform. Analysis, playbooks, consulting and the AI Business Universe Agent for enterprises, brands and advertisers."}
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/50">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-background/85 hover:text-lime">
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-background/10 pt-6 text-[12px] text-background/50 md:flex-row">
          <div>© {new Date().getFullYear()} AI Business Universe · {lang === "cn" ? "看懂 AI,重构商业增长" : "See AI. Rebuild growth."}</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-background">Newsletter</a>
            <a href="#" className="hover:text-background">Privacy</a>
            <a href="#" className="hover:text-background">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
