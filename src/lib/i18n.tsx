import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "cn" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void; pick: <T>(cn: T, en: T) => T };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cn");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("aibu.lang") as Lang | null) : null;
    if (saved === "cn" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("aibu.lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l === "cn" ? "zh-CN" : "en";
  };

  const pick = <T,>(cn: T, en: T): T => (lang === "cn" ? cn : en);

  return <LangContext.Provider value={{ lang, setLang, pick }}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) return { lang: "cn", setLang: () => {}, pick: <T,>(cn: T) => cn };
  return c;
}

/** Translate a Localized field: string or { cn, en }. */
export type Localized = string | { cn: string; en: string };
export function useT() {
  const { pick } = useLang();
  return (v: Localized): string => (typeof v === "string" ? v : pick(v.cn, v.en));
}

/** UI strings dictionary */
export const UI = {
  agent: { cn: "智能体", en: "Agent" },
  agentFull: { cn: "AI 商业宇宙智能体", en: "AI Business Universe Agent" },
  home: { cn: "首页", en: "Home" },
  aiNow: { cn: "AI最新", en: "AI Now" },
  analysis: { cn: "分析", en: "Analysis" },
  players: { cn: "关键玩家", en: "Key Players" },
  video: { cn: "视频", en: "Video" },
  music: { cn: "音乐", en: "Music" },
  podcast: { cn: "播客", en: "Podcast" },
  reports: { cn: "报告", en: "Reports" },
  consulting: { cn: "咨询", en: "Consulting" },
  readMore: { cn: "阅读更多", en: "Read more" },
  viewAll: { cn: "全部", en: "View all" },
  network: { cn: "全球合作网络", en: "Global Network" },
} as const;
