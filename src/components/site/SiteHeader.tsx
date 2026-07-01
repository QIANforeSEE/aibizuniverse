import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";


const NAV = [
  { to: "/", label: "首页", en: "Home" },
  { to: "/ai-now", label: "AI最新", en: "AI Now" },
  { to: "/analysis", label: "商业分析", en: "Analysis" },
  { to: "/key-players", label: "Key Players", en: "Players" },
  { to: "/trends", label: "行业趋势", en: "Trends" },
  { to: "/reports", label: "报告", en: "Reports" },
  { to: "/playbooks", label: "方法论", en: "Playbooks" },
  { to: "/consulting", label: "咨询", en: "Consulting" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="AI商业宇宙 Logo"
            className="h-10 w-10 rounded-md object-contain"
            width={40}
            height={40}
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold tracking-tight">AI商业宇宙</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI Biz Universe</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "!text-foreground !bg-accent" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/agent"
            className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12px] font-semibold text-background transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            智能体
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            className="rounded-md border border-border p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-[1400px] px-6 py-4">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-accent"
                >
                  {n.label} <span className="text-[10px] uppercase text-muted-foreground">{n.en}</span>
                </Link>
              ))}
              <Link
                to="/agent"
                onClick={() => setOpen(false)}
                className="col-span-2 mt-2 flex items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-3 text-sm font-semibold text-background"
              >
                进入AI商业宇宙智能体 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
