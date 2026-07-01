import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import { UI, useLang, useT, type Lang } from "@/lib/i18n";
import { channels } from "@/lib/channels";


const NAV = [
  { to: "/", label: UI.home },
  { to: "/ai-now", label: UI.aiNow },
  { to: "/analysis", label: UI.analysis },
  { to: "/key-players", label: UI.players },
  { to: "/video", label: UI.video },
  { to: "/podcast", label: UI.podcast },
  { to: "/music", label: UI.music },
  { to: "/reports", label: UI.reports },
  { to: "/consulting", label: UI.consulting },
] as const;

function LangToggle() {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["cn", "en"];
  return (
    <div className="hidden items-center rounded-full border border-border bg-background p-0.5 text-[11px] font-bold uppercase tracking-widest md:inline-flex">
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={
            "rounded-full px-2.5 py-1 transition-colors " +
            (lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")
          }
        >
          {l === "cn" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const { lang, setLang } = useLang();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      {/* Top strip: agent CTA up top */}
      <div className="border-b border-border/40 bg-foreground text-background">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 text-[11px] font-medium lg:px-10">
          <span className="flex items-center gap-2 text-background/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            {lang === "cn"
              ? "AI 商业宇宙智能体 · 24/7 在线为你解答商业问题"
              : "AI Business Universe Agent · Answering business questions 24/7"}
          </span>
          <Link
            to="/agent"
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-[11px] font-bold text-foreground transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-3 w-3" />
            {t(UI.agentFull)}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="AI Business Universe Logo"
            className="h-10 w-10 rounded-md object-contain"
            width={40}
            height={40}
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold tracking-tight">
              {lang === "cn" ? "AI商业宇宙" : "AI Business Universe"}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {lang === "cn" ? "AI Business Universe" : "AI 商业宇宙"}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-2.5 py-2 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "!text-foreground !bg-accent" }}
              activeOptions={{ exact: true }}
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
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
            <div className="mb-3 flex items-center gap-2">
              <button
                onClick={() => setLang("cn")}
                className={"rounded-full px-3 py-1 text-xs " + (lang === "cn" ? "bg-foreground text-background" : "border border-border")}
              >中文</button>
              <button
                onClick={() => setLang("en")}
                className={"rounded-full px-3 py-1 text-xs " + (lang === "en" ? "bg-foreground text-background" : "border border-border")}
              >English</button>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-accent"
                >
                  {t(n.label)}
                </Link>
              ))}
              <Link
                to="/agent"
                onClick={() => setOpen(false)}
                className="col-span-2 mt-2 flex items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-3 text-sm font-semibold text-background"
              >
                {t(UI.agentFull)} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
