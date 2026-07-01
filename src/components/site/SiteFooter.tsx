import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.asset.json";


const COLS = [
  {
    title: "内容 Content",
    links: [
      { to: "/ai-now", label: "AI最新" },
      { to: "/analysis", label: "商业分析" },
      { to: "/trends", label: "行业趋势" },
      { to: "/key-players", label: "Key Players" },
    ],
  },
  {
    title: "产品 Products",
    links: [
      { to: "/reports", label: "趋势报告" },
      { to: "/playbooks", label: "增长方法论" },
      { to: "/agent", label: "AI 智能体" },
    ],
  },
  {
    title: "服务 Services",
    links: [
      { to: "/consulting", label: "咨询 / 培训 / 共创" },
      { to: "/about", label: "关于我们" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logoAsset.url} alt="AI商业宇宙" className="h-10 w-10 rounded-md bg-background object-contain p-1" width={40} height={40} />
              <div>
                <div className="font-display text-lg font-bold">AI商业宇宙</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-background/60">AI Business Universe</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
              AI+ 时代商业增长智库。为企业、品牌与广告主提供 AI 商业分析、增长方法论、咨询培训、共创服务与智能体问答系统。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-background/20 px-3 py-1 text-[11px] text-background/70">AI Business</span>
              <span className="rounded-full border border-background/20 px-3 py-1 text-[11px] text-background/70">Growth Intelligence</span>
              <span className="rounded-full border border-background/20 px-3 py-1 text-[11px] text-background/70">Global · 全球</span>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/50">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-background/85 hover:text-lime">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-background/10 pt-6 text-[12px] text-background/50 md:flex-row">
          <div>© {new Date().getFullYear()} AI Business Universe · 看懂AI，重构商业增长</div>
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
