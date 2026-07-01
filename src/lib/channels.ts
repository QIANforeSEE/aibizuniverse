import type { Localized } from "./i18n";

export type ChannelSlug =
  | "ai-business"
  | "ai-org"
  | "ai-brand"
  | "ai-media"
  | "ai-marketing"
  | "ai-ads"
  | "ai-strategy"
  | "ai-training";

export type ChannelColor = "lime" | "violet" | "signal" | "alert";

export type Channel = {
  slug: ChannelSlug;
  name: Localized;
  tagline: Localized;
  desc: Localized;
  color: ChannelColor;
  keywords: string[];
};

export const channels: Channel[] = [
  {
    slug: "ai-business",
    name: { cn: "AI 商业", en: "AI Business" },
    tagline: { cn: "AI 时代的商业新引擎", en: "The new business engine of the AI era" },
    desc: {
      cn: "AI 如何重写公司、行业与商业模式,从操作系统到 Agent 经济的完整视图。",
      en: "How AI rewrites companies, industries and business models — from OS to Agent economy.",
    },
    color: "lime",
    keywords: ["商业", "business", "operating", "os", "economy", "商业化", "commerc", "增长", "growth"],
  },
  {
    slug: "ai-org",
    name: { cn: "AI 组织", en: "AI Organization" },
    tagline: { cn: "重写组织与协作", en: "Rewriting org & collaboration" },
    desc: {
      cn: "AI 时代的组织架构、岗位重塑、协作方式与人才升级。",
      en: "Org design, role redesign, collaboration and talent upgrades in the AI era.",
    },
    color: "violet",
    keywords: ["组织", "org", "enterprise", "企业", "team", "role", "岗位", "founder", "创始人", "ceo", "cfo"],
  },
  {
    slug: "ai-brand",
    name: { cn: "AI 品牌", en: "AI Brand" },
    tagline: { cn: "品牌资产的 AI 重构", en: "Rebuilding brand assets with AI" },
    desc: {
      cn: "品牌资产、内容体系、品牌媒体化与 AI 引用信号的完整方法论。",
      en: "Brand assets, content systems, brand-as-media and AI citation signals.",
    },
    color: "signal",
    keywords: ["品牌", "brand", "cmo"],
  },
  {
    slug: "ai-media",
    name: { cn: "AI 媒体", en: "AI Media" },
    tagline: { cn: "AI 驱动的新媒体形态", en: "The new media shape driven by AI" },
    desc: {
      cn: "从内容工厂到 AI 编辑部,媒体形态与内容分发的结构性变化。",
      en: "From content factory to AI newsroom — structural shifts in media and distribution.",
    },
    color: "alert",
    keywords: ["media", "媒体", "content", "内容", "newsroom", "编辑部", "音场", "音乐", "music"],
  },
  {
    slug: "ai-marketing",
    name: { cn: "AI 营销", en: "AI Marketing" },
    tagline: { cn: "从投放到 Agent 增长", en: "From ad-buying to Agent-native growth" },
    desc: {
      cn: "营销自动化、Agent 增长引擎、CMO 岗位重构与 ROI 新模型。",
      en: "Marketing automation, Agent growth engines, CMO redesign and new ROI models.",
    },
    color: "lime",
    keywords: ["marketing", "营销", "cmo", "growth", "增长", "roi", "funnel", "漏斗"],
  },
  {
    slug: "ai-ads",
    name: { cn: "AI 广告", en: "AI Advertising" },
    tagline: { cn: "广告的下一场重塑", en: "The next reshaping of advertising" },
    desc: {
      cn: "广告投放、创意生产、广告主组织与 Agent 时代的广告新形态。",
      en: "Ad-buying, creative production, advertiser org and the Agent-era ad format.",
    },
    color: "violet",
    keywords: ["ads", "ad-buy", "广告", "广告主", "advertis", "投放", "creative"],
  },
  {
    slug: "ai-strategy",
    name: { cn: "AI 战略咨询", en: "AI Strategy" },
    tagline: { cn: "企业 AI 战略与咨询", en: "Enterprise AI strategy & advisory" },
    desc: {
      cn: "AI 战略诊断、企业 Agent 部署路线、GEO / AEO 与商业模式创新。",
      en: "Strategy diagnostics, enterprise Agent roadmap, GEO / AEO and new business models.",
    },
    color: "signal",
    keywords: ["strategy", "战略", "consulting", "咨询", "advisory", "diagnostic", "诊断", "geo", "aeo", "roadmap", "路线"],
  },
  {
    slug: "ai-training",
    name: { cn: "AI 培训", en: "AI Training" },
    tagline: { cn: "AI 时代的能力体系", en: "Capability building for the AI era" },
    desc: {
      cn: "工作坊、共创营、Playbook 与 CMO / CEO 层面的 AI 能力升级。",
      en: "Workshops, co-build camps, playbooks and CMO/CEO-level AI upskilling.",
    },
    color: "alert",
    keywords: ["training", "培训", "playbook", "手册", "指南", "handbook", "workshop", "工作坊", "camp", "共创营", "briefing", "brief"],
  },
];

export function getChannel(slug: string): Channel | undefined {
  return channels.find((c) => c.slug === slug);
}

function haystack(...parts: (Localized | string | undefined)[]): string {
  return parts
    .map((p) => (!p ? "" : typeof p === "string" ? p : `${p.cn} ${p.en}`))
    .join(" ")
    .toLowerCase();
}

export function matchesChannel(
  item: {
    title?: Localized;
    excerpt?: Localized;
    category?: Localized;
    tag?: Localized;
    tags?: string[];
  },
  channel: Channel,
): boolean {
  const h = haystack(item.title, item.excerpt, item.category, item.tag, (item.tags ?? []).join(" "));
  return channel.keywords.some((k) => h.includes(k.toLowerCase()));
}
