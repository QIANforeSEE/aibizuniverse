// Mock content for AI Business Universe. Bilingual (CN/EN) with Localized fields.
import type { Localized } from "./i18n";

export type Signal = {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  tags: string[];
  impact: 1 | 2 | 3 | 4 | 5;
  time: Localized;
};

export const signals: Signal[] = [
  {
    id: "s1",
    slug: "openai-agent-builder-pricing-cut",
    title: { cn: "OpenAI 将 Agent Builder 定价体系全面下调,企业部署门槛塌方", en: "OpenAI slashes Agent Builder pricing — enterprise deployment barrier collapses" },
    excerpt: { cn: "面向企业的 AI Agent 商业化进入价格战阶段,中小品牌首次具备规模化部署条件。", en: "Enterprise AI Agent commercialization enters a price-war phase; mid-market brands can now deploy at scale." },
    tags: ["Agent", "Platform", "Global"],
    impact: 5,
    time: { cn: "2 小时前", en: "2h ago" },
  },
  {
    id: "s2",
    slug: "coze-commerce-agent-launch",
    title: { cn: "字节 Coze 商业版发布:把 AI Agent 塞进电商与广告投放全链路", en: "ByteDance Coze Commerce ships: AI Agent embedded across ads and e-commerce" },
    excerpt: { cn: "中国 AI 平台首次把 Agent 与广告投放、内容生产、私域运营打通为单一操作系统。", en: "A Chinese AI platform unifies Agent, ad-buying, content and CRM into one operating system." },
    tags: ["China", "Agent", "Ads"],
    impact: 5,
    time: { cn: "6 小时前", en: "6h ago" },
  },
  {
    id: "s3",
    slug: "google-ai-overviews-42-percent",
    title: { cn: "Google 搜索 AI Overviews 覆盖率破 42%,GEO 成为品牌新战场", en: "Google AI Overviews cross 42% coverage — GEO becomes the new brand battlefield" },
    excerpt: { cn: "品牌搜索可见性重心从 SEO 转向 GEO / AEO,传统内容策略进入结构性重估。", en: "Brand visibility shifts from SEO to GEO/AEO; legacy content strategy faces structural reset." },
    tags: ["GEO", "Brand", "Search"],
    impact: 4,
    time: { cn: "今日", en: "Today" },
  },
  {
    id: "s4",
    slug: "anthropic-20b-funding",
    title: { cn: "Anthropic 完成 200 亿美元融资,估值 3400 亿指向下一轮平台战争", en: "Anthropic closes $20B round at $340B — the next platform war begins" },
    excerpt: { cn: "顶级基础模型公司估值分化加剧,企业选型窗口收窄至 3 家核心平台。", en: "Foundation model valuations diverge; enterprise selection narrows to three core platforms." },
    tags: ["Investment", "LLM"],
    impact: 4,
    time: { cn: "今日", en: "Today" },
  },
  {
    id: "s5",
    slug: "minimax-multimodal-agent-brand",
    title: { cn: "MiniMax 面向企业推出音视频多模态 Agent,切入品牌媒体化赛道", en: "MiniMax launches multimodal audio-video Agent for brands entering media-as-brand" },
    excerpt: { cn: "中国多模态模型开始向 CMO 场景下沉,AI 品牌媒体从概念进入部署阶段。", en: "Chinese multimodal models move into CMO workflows; AI brand media hits deployment." },
    tags: ["China", "Multimodal", "Brand"],
    impact: 3,
    time: { cn: "昨日", en: "Yesterday" },
  },
];

export type Featured = {
  id: string;
  slug: string;
  category: Localized;
  color: "lime" | "violet" | "signal" | "alert";
  title: Localized;
  excerpt: Localized;
  takeaways: Localized[];
  author: string;
  time: string;
  readMin: number;
};

export const featured: Featured[] = [
  {
    id: "f1",
    slug: "2026-ai-operating-system",
    category: { cn: "封面深度 · Cover Story", en: "Cover Story" },
    color: "lime",
    title: { cn: "2026:AI 从工具进入商业操作系统时代", en: "2026: AI moves from tool to business operating system" },
    excerpt: {
      cn: "AI 不再是插件式的工具,而是重写企业增长引擎的操作系统。品牌、内容、营销、组织,都在被同一套底层重构。",
      en: "AI is no longer a plug-in tool — it is the operating system rewriting the growth engine. Brand, content, marketing and org are all being refactored on the same substrate.",
    },
    takeaways: [
      { cn: "AI 正在取代 SaaS 成为企业新的操作系统层", en: "AI is replacing SaaS as the enterprise OS layer" },
      { cn: "增长引擎从渠道驱动切换为智能体驱动", en: "Growth engines shift from channels to agents" },
      { cn: "CMO 岗位在 24 个月内将被重新定义", en: "The CMO role will be redefined within 24 months" },
      { cn: "GEO / AEO 取代 SEO 成为品牌基本功", en: "GEO / AEO replace SEO as brand fundamentals" },
      { cn: "数据资产的所有权决定 AI 时代的护城河", en: "Data ownership becomes the AI-era moat" },
    ],
    author: "AI Business Universe Editorial",
    time: "2026 · 03",
    readMin: 12,
  },
  {
    id: "f2",
    slug: "brand-growth-ai-rebuild",
    category: { cn: "品牌增长 · Brand Growth", en: "Brand Growth" },
    color: "violet",
    title: { cn: "品牌广告主如何用 AI 重构增长模型", en: "How brand advertisers rebuild their growth model with AI" },
    excerpt: {
      cn: "广告主正在从 “买流量” 迁移到 “造智能体”。用户资产、内容资产、Agent 资产,成为品牌新的三大账本。",
      en: "Advertisers are migrating from buying traffic to building agents. User, content and agent assets become the three new ledgers.",
    },
    takeaways: [
      { cn: "投放漏斗被 Agent 对话漏斗替代", en: "Ad funnels are replaced by agent-conversation funnels" },
      { cn: "内容产能从 10x 提升到 100x", en: "Content throughput moves from 10x to 100x" },
      { cn: "品牌媒体化不是选择,而是生存条件", en: "Brand-as-media is a survival condition, not an option" },
    ],
    author: "L. Chen",
    time: "2026 · 02",
    readMin: 9,
  },
  {
    id: "f3",
    slug: "geo-aeo-search-war",
    category: { cn: "趋势 · Trend", en: "Trend" },
    color: "signal",
    title: { cn: "GEO 与 AEO:企业搜索可见性的下一场战争", en: "GEO & AEO: the next war for enterprise search visibility" },
    excerpt: {
      cn: "搜索答案化之后,品牌不再竞争排名,而是竞争 “是否被 AI 引用”。GEO / AEO 正在成为新一代 CMO 的必修课。",
      en: "After search becomes answers, brands no longer fight for ranking — they fight to be cited by AI. GEO / AEO is now core CMO curriculum.",
    },
    takeaways: [
      { cn: "AI 答案引擎重塑品牌信息分发", en: "AI answer engines reshape brand distribution" },
      { cn: "结构化知识资产是新的搜索护城河", en: "Structured knowledge is the new search moat" },
      { cn: "企业需要在 12 个月内完成 GEO 迁移", en: "Enterprises must complete GEO migration within 12 months" },
    ],
    author: "R. Wang",
    time: "2026 · 02",
    readMin: 8,
  },
];

export const growthSystem: { code: string; title: Localized; desc: Localized; color: "lime" | "violet" | "signal" | "alert" }[] = [
  { code: "01", title: { cn: "AI 战略诊断", en: "AI Strategy Diagnostic" }, desc: { cn: "从业务出发,识别 AI 增长的关键杠杆与优先级。", en: "Identify AI-growth leverage and priority from the business side." }, color: "lime" },
  { code: "02", title: { cn: "AI 品牌增长", en: "AI Brand Growth" }, desc: { cn: "重写品牌资产结构,把品牌变成 AI 时代可被引用的知识体。", en: "Rewrite brand assets into a knowledge body citable by AI." }, color: "violet" },
  { code: "03", title: { cn: "AI 内容与品牌媒体", en: "AI Content & Brand Media" }, desc: { cn: "从内容工厂到品牌媒体化,构建可复利的内容资产。", en: "From content factory to brand-as-media — compounding content assets." }, color: "signal" },
  { code: "04", title: { cn: "AI 搜索 GEO / AEO", en: "AI Search — GEO / AEO" }, desc: { cn: "让品牌在 AI 答案引擎中被检索、被引用、被信任。", en: "Get cited, retrieved and trusted by AI answer engines." }, color: "alert" },
  { code: "05", title: { cn: "AI Agent 部署", en: "AI Agent Deployment" }, desc: { cn: "把 Agent 嵌入营销、销售、服务、内容、投放全链路。", en: "Embed Agents across marketing, sales, service, content and ads." }, color: "violet" },
  { code: "06", title: { cn: "AI 营销自动化", en: "AI Marketing Automation" }, desc: { cn: "从投放优化到全链路自动化决策,重构 ROI 模型。", en: "From ad optimization to end-to-end automated decisioning." }, color: "lime" },
  { code: "07", title: { cn: "AI 组织升级", en: "AI Org Upgrade" }, desc: { cn: "重设岗位、协作与考核,让组织跑得赢智能体。", en: "Redesign roles, collaboration and KPIs to run with agents." }, color: "signal" },
  { code: "08", title: { cn: "AI 商业创新", en: "AI Business Innovation" }, desc: { cn: "识别新赛道、新产品、新商业模式的 AI 增量。", en: "Identify AI upside in new categories, products and models." }, color: "alert" },
  { code: "09", title: { cn: "AI 数据资产", en: "AI Data Assets" }, desc: { cn: "把私域与业务数据变成可训练、可复用的战略资产。", en: "Turn first-party and ops data into trainable strategic assets." }, color: "lime" },
  { code: "10", title: { cn: "AI 增长证据链", en: "AI Growth Evidence Chain" }, desc: { cn: "从投入到增长,建立可归因、可复盘的证据体系。", en: "Build attributable, reviewable evidence from spend to growth." }, color: "violet" },
];

export const keyPlayers: { name: string; region: "US" | "CN"; sector: Localized; score: number; delta: string; note: Localized }[] = [
  { name: "OpenAI", region: "US", sector: { cn: "基础模型 / Agent", en: "Foundation / Agent" }, score: 98, delta: "+3", note: { cn: "Agent Builder 定价重构市场", en: "Agent Builder pricing resets the market" } },
  { name: "Anthropic", region: "US", sector: { cn: "基础模型 / 安全", en: "Foundation / Safety" }, score: 94, delta: "+2", note: { cn: "200 亿美元融资完成", en: "Closes $20B round" } },
  { name: "Google DeepMind", region: "US", sector: { cn: "多模态 / 搜索", en: "Multimodal / Search" }, score: 93, delta: "+4", note: { cn: "Gemini 3 覆盖搜索答案化", en: "Gemini 3 powers AI Overviews" } },
  { name: "ByteDance · Doubao / Coze", region: "CN", sector: { cn: "商业化 / Agent", en: "Commercialization / Agent" }, score: 90, delta: "+5", note: { cn: "Coze 商业版切入投放", en: "Coze Commerce enters ad-buying" } },
  { name: "NVIDIA", region: "US", sector: { cn: "基础设施", en: "Infrastructure" }, score: 89, delta: "0", note: { cn: "企业推理成本持续下降", en: "Enterprise inference costs keep falling" } },
  { name: "DeepSeek", region: "CN", sector: { cn: "开源基础模型", en: "Open-source Foundation" }, score: 87, delta: "+6", note: { cn: "R2 系列进入企业部署", en: "R2 series enters enterprise deployment" } },
  { name: "Alibaba · Tongyi / Bailian", region: "CN", sector: { cn: "企业 AI", en: "Enterprise AI" }, score: 84, delta: "+1", note: { cn: "面向电商与广告主打包", en: "Bundled for commerce and advertisers" } },
  { name: "Microsoft", region: "US", sector: { cn: "企业 Copilot", en: "Enterprise Copilot" }, score: 83, delta: "-1", note: { cn: "企业 Copilot 增速放缓", en: "Enterprise Copilot growth slows" } },
  { name: "MiniMax", region: "CN", sector: { cn: "多模态 / 品牌", en: "Multimodal / Brand" }, score: 79, delta: "+4", note: { cn: "音视频 Agent 切入 CMO", en: "AV Agents enter the CMO stack" } },
  { name: "xAI", region: "US", sector: { cn: "基础模型", en: "Foundation" }, score: 74, delta: "+2", note: { cn: "Grok 4 面向企业开放", en: "Grok 4 opens to enterprise" } },
];

export type ReportItem = {
  id: string;
  slug: string;
  tag: Localized;
  color: "lime" | "violet" | "signal" | "alert";
  title: Localized;
  excerpt: Localized;
  pages: number;
  format: string;
  published: string;
  highlights?: Localized[];
};

export const reports: ReportItem[] = [
  {
    id: "r1",
    slug: "2026-ai-business-trends",
    tag: { cn: "旗舰 · Flagship", en: "Flagship" },
    color: "lime",
    title: { cn: "2026 AI 商业趋势报告", en: "2026 AI Business Trends Report" },
    excerpt: { cn: "全球 AI 商业化 12 大趋势、48 个 Key Player、9 大增长引擎的完整版年度报告。", en: "The annual: 12 global trends, 48 Key Players, 9 growth engines." },
    pages: 128,
    format: "PDF · CN/EN",
    published: "2026-03",
    highlights: [
      { cn: "12 条全球 AI 商业化主赛道全景", en: "12 global AI commercialization tracks" },
      { cn: "48 家 Key Player 的战略打分与解读", en: "Strategic scorecards on 48 Key Players" },
      { cn: "9 大企业级增长引擎方法论", en: "9 enterprise growth-engine methodologies" },
    ],
  },
  {
    id: "r2",
    slug: "enterprise-ai-agent-playbook",
    tag: { cn: "白皮书 · Whitepaper", en: "Whitepaper" },
    color: "violet",
    title: { cn: "企业 AI Agent 落地指南", en: "The Enterprise AI Agent Playbook" },
    excerpt: { cn: "从战略选型、场景优先级到组织重塑的完整 Agent 部署路线图。", en: "A full route from strategy and prioritization to org redesign." },
    pages: 86,
    format: "PDF",
    published: "2026-02",
    highlights: [
      { cn: "Agent 场景优先级评估矩阵", en: "Agent use-case prioritization matrix" },
      { cn: "从 PoC 到生产环境的部署路径", en: "PoC-to-production deployment path" },
      { cn: "Agent 时代的组织角色再设计", en: "Org role redesign in the Agent era" },
    ],
  },
  {
    id: "r3",
    slug: "geo-aeo-growth-handbook",
    tag: { cn: "指南 · Playbook", en: "Playbook" },
    color: "signal",
    title: { cn: "GEO / AEO 企业增长手册", en: "GEO / AEO Growth Handbook" },
    excerpt: { cn: "AI 搜索时代品牌可见性作战手册:结构化知识、答案资产、引用信号。", en: "Brand visibility in the AI-search era: structured knowledge, answer assets, citation signals." },
    pages: 64,
    format: "PDF",
    published: "2026-01",
    highlights: [
      { cn: "AI 答案引擎的品牌引用机制", en: "How AI answer engines cite brands" },
      { cn: "结构化知识资产的搭建流程", en: "Building structured knowledge assets" },
      { cn: "12 个月 GEO 迁移路线图", en: "12-month GEO migration roadmap" },
    ],
  },
  {
    id: "r4",
    slug: "ai-brand-as-media-report",
    tag: { cn: "报告 · Report", en: "Report" },
    color: "alert",
    title: { cn: "AI 品牌媒体白皮书", en: "The AI Brand-as-Media Report" },
    excerpt: { cn: "内容工厂到品牌媒体化,广告主的下一场增长战。", en: "From content factory to brand-as-media — the advertiser's next war." },
    pages: 72,
    format: "PDF",
    published: "2025-12",
    highlights: [
      { cn: "品牌媒体化的组织与流程模板", en: "Org and workflow templates for brand-as-media" },
      { cn: "AI 内容资产的复利模型", en: "Compounding model for AI content assets" },
      { cn: "从内容工厂到答案引擎的路径", en: "From content factory to answer engine" },
    ],
  },
];

export const consultingServices: { title: Localized; duration: Localized; desc: Localized }[] = [
  { title: { cn: "AI 商业增长诊断", en: "AI Growth Diagnostic" }, duration: { cn: "2 周", en: "2 weeks" }, desc: { cn: "从业务、组织、数据三个维度扫描 AI 增长机会,输出优先级路线图。", en: "Scan business, org and data for AI-growth opportunities; output a priority roadmap." } },
  { title: { cn: "企业 AI 战略工作坊", en: "Executive AI Strategy Workshop" }, duration: { cn: "3 天集中", en: "3-day intensive" }, desc: { cn: "面向 CEO、CMO、CTO 的高层共识工作坊,24 小时内产出战略画布。", en: "For CEO, CMO, CTO — strategy canvas produced within 24 hours." } },
  { title: { cn: "AI Agent 共创营", en: "AI Agent Co-Build Camp" }, duration: { cn: "6–12 周", en: "6–12 weeks" }, desc: { cn: "与团队共创可落地的 Agent 产品原型,从 PoC 走到生产环境。", en: "Co-build a shippable Agent prototype, PoC to production." } },
  { title: { cn: "AI 品牌媒体系统搭建", en: "AI Brand-Media System Build" }, duration: { cn: "8 周", en: "8 weeks" }, desc: { cn: "从内容策略、生产链路到分发引擎,为品牌搭建 AI 时代的媒体系统。", en: "Strategy → production → distribution engine for the brand-as-media era." } },
  { title: { cn: "GEO / AEO 优化咨询", en: "GEO / AEO Advisory" }, duration: { cn: "4 周", en: "4 weeks" }, desc: { cn: "结构化知识资产梳理 + 答案引擎优化 + 引用信号建设。", en: "Structured knowledge audit + answer-engine optimization + citation signals." } },
  { title: { cn: "企业 AI 转型陪跑", en: "Enterprise AI Transformation Retainer" }, duration: { cn: "6 个月起", en: "6+ months" }, desc: { cn: "季度节奏的深度陪跑,从战略、组织到执行,全链路 AI 化。", en: "Quarterly-cadence deep engagement across strategy, org and execution." } },
];

export const suggestedQuestions: Localized[] = [
  { cn: "2026 年企业最应该关注哪些 AI 商业趋势?", en: "Which AI business trends should enterprises watch in 2026?" },
  { cn: "品牌广告主如何用 AI 提升营销 ROI?", en: "How can brand advertisers lift ROI with AI?" },
  { cn: "GEO 和 AEO 对企业有什么价值?", en: "What is the enterprise value of GEO and AEO?" },
  { cn: "AI Agent 如何在营销部门落地?", en: "How do you land AI Agents inside a marketing team?" },
  { cn: "中国 AI 平台大战对品牌有什么影响?", en: "What does the China AI platform war mean for brands?" },
  { cn: "我的公司如何建立 AI 增长操作系统?", en: "How do we build an AI growth OS in my company?" },
];

/* ---------- VIDEO ---------- */

export type VideoItem = {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  duration: string;
  category: Localized;
  thumb: "v1" | "v2" | "v3" | "v4" | "v5" | "v6";
  color: "lime" | "violet" | "signal" | "alert";
};

export const videos: VideoItem[] = [
  { id: "v1", slug: "cmo-ai-native-keynote", title: { cn: "CMO 的 AI Native 时刻:一场关于增长引擎的公开演讲", en: "The CMO's AI-Native moment: a public keynote on growth engines" }, excerpt: { cn: "全球 500 强 CMO 联席会主题演讲,营销组织的重新绘制。", en: "A Fortune 500 CMO council keynote on redrawing the marketing org." }, duration: "28:14", category: { cn: "Keynote · 主题演讲", en: "Keynote" }, thumb: "v1", color: "lime" },
  { id: "v2", slug: "inside-ai-chip-lab", title: { cn: "走进 AI 芯片实验室:一颗芯片如何决定商业格局", en: "Inside the AI chip lab: how one chip decides the business landscape" }, excerpt: { cn: "五位芯片架构师与产业投资人拆解算力经济。", en: "Five architects and investors unpack the compute economy." }, duration: "17:42", category: { cn: "纪录短片", en: "Documentary" }, thumb: "v2", color: "violet" },
  { id: "v3", slug: "agent-economy-roundtable", title: { cn: "Agent 经济圆桌:谁在建造下一代商业操作系统", en: "Agent Economy roundtable: who is building the next business OS" }, excerpt: { cn: "OpenAI、字节 Coze、DeepSeek 生态产品负责人同框对谈。", en: "Product leads from OpenAI, ByteDance Coze and DeepSeek at one table." }, duration: "42:08", category: { cn: "圆桌", en: "Roundtable" }, thumb: "v5", color: "signal" },
  { id: "v4", slug: "brand-media-newsroom", title: { cn: "品牌即媒体:一间由 AI 编辑部驱动的新型内容中台", en: "Brand as media: inside an AI-driven newsroom producing 800 assets a day" }, excerpt: { cn: "跟拍一间被 AI 重写的品牌新闻编辑部。", en: "A behind-the-scenes look at an AI-rewritten brand newsroom." }, duration: "12:36", category: { cn: "特稿短片", en: "Feature" }, thumb: "v3", color: "alert" },
  { id: "v5", slug: "human-plus-manifest", title: { cn: "HUMAN+ 宣言:当每个人都嵌入了智能体", en: "HUMAN+ Manifesto: when every person embeds an agent" }, excerpt: { cn: "一部关于人机共生新物种的短片。", en: "A short film about a new species of human–AI symbiosis." }, duration: "09:21", category: { cn: "短片", en: "Short Film" }, thumb: "v4", color: "violet" },
  { id: "v6", slug: "data-cathedral-tour", title: { cn: "数据殿堂:一次算力基础设施的深度巡礼", en: "The Data Cathedral: a deep tour of compute infrastructure" }, excerpt: { cn: "一次进入千卡集群与冷通道的商业视角巡礼。", en: "A business-eye tour into thousand-GPU clusters and cold aisles." }, duration: "22:48", category: { cn: "纪录短片", en: "Documentary" }, thumb: "v6", color: "lime" },
  { id: "v7", slug: "founders-inside-the-agent-launch", title: { cn: "创始人内部录像:一个 Agent 产品从 0 到 1 的 90 天", en: "Founder tapes: 90 days from 0 to 1 of an Agent product" }, excerpt: { cn: "三位创始人分享 Agent 从原型到市场的关键节点。", en: "Three founders walk through key moments from prototype to market." }, duration: "18:03", category: { cn: "纪录", en: "Docu-series" }, thumb: "v1", color: "signal" },
  { id: "v8", slug: "geo-aeo-live-lab", title: { cn: "GEO / AEO 直播实验室:AI 搜索时代的品牌新战场", en: "GEO / AEO Live Lab: brand's new battlefield in AI-search" }, excerpt: { cn: "一场围绕品牌可见性的现场公开实验。", en: "A live public lab experiment on brand visibility in AI search." }, duration: "31:59", category: { cn: "直播", en: "Live Lab" }, thumb: "v2", color: "alert" },
];

/* ---------- MUSIC / AUDIO / PODCAST ---------- */

export type AudioItem = {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  duration: string;
  category: Localized;
  kind: "podcast" | "music";
  thumb: "a1" | "a2" | "a3" | "a4";
  color: "lime" | "violet" | "signal" | "alert";
};

export const audios: AudioItem[] = [
  { id: "a1", slug: "ceo-briefing-06-ai-os", title: { cn: "CEO Briefing #06:当公司变成一个可对话的系统", en: "CEO Briefing #06: when the company becomes a conversational system" }, excerpt: { cn: "18 分钟深度播客,写给 CEO 与 CFO 的 AI 商业操作系统备忘录。", en: "18-minute deep dive — an AI business-OS memo for CEO and CFO." }, duration: "18:22", category: { cn: "深度播客 · CEO Briefing", en: "Podcast · CEO Briefing" }, kind: "podcast", thumb: "a4", color: "signal" },
  { id: "a2", slug: "ambient-neural-signals", title: { cn: "Ambient · Neural Signals(AI 生成环境音场)", en: "Ambient · Neural Signals (AI-generated soundscape)" }, excerpt: { cn: "由多模态模型生成的 42 分钟环境音场,深度阅读的背景音。", en: "A 42-minute ambient field generated by multimodal models — a deep-reading soundtrack." }, duration: "42:00", category: { cn: "AI 原生音乐", en: "AI Native Music" }, kind: "music", thumb: "a3", color: "violet" },
  { id: "a3", slug: "founders-audio-notes-agent", title: { cn: "创始人音频札记:第一次亲手部署 Agent 的 90 天", en: "Founder audio notes: 90 days of deploying an Agent by hand" }, excerpt: { cn: "三位创始人第一现场录音,记录 Agent 从 PoC 走进生产环境。", en: "Three founders in-the-room recordings: from PoC to production." }, duration: "26:47", category: { cn: "音频札记 · Founder Notes", en: "Founder Notes" }, kind: "podcast", thumb: "a1", color: "lime" },
  { id: "a4", slug: "growth-radio-cmo-shift", title: { cn: "Growth Radio:CMO 岗位正在被重写的 6 个信号", en: "Growth Radio: 6 signals the CMO role is being rewritten" }, excerpt: { cn: "每周一档的商业增长电台,拆解 CMO 面对的结构性变化。", en: "A weekly growth radio unpacking structural shifts facing CMOs." }, duration: "31:05", category: { cn: "电台 · Growth Radio", en: "Growth Radio" }, kind: "podcast", thumb: "a2", color: "alert" },
];

/* ---------- ARTICLE BODIES ---------- */

export const articleBodies: Record<
  string,
  { kicker: Localized; sections: { heading: Localized; paragraphs: Localized[] }[] }
> = {
  "2026-ai-operating-system": {
    kicker: { cn: "封面故事 · Cover Story", en: "Cover Story" },
    sections: [
      {
        heading: { cn: "从工具到操作系统", en: "From tool to operating system" },
        paragraphs: [
          { cn: "过去两年,企业里最常听到的一句话是 “我们要上一个 AI”。但在 2026 年,“上一个 AI” 已经变成一句过时的表达。真正在发生的事情是:AI 正在成为一整套企业操作系统,替代过去 20 年由 SaaS 构筑的分层架构。", en: "For two years the most-heard sentence inside enterprises was ‘we need to add an AI.' In 2026 that phrase is obsolete. What's actually happening: AI is becoming a full enterprise operating system, replacing the layered SaaS architecture of the last two decades." },
          { cn: "企业不再需要一个孤立的模型,他们需要一个可以理解业务、驱动决策、编排团队的智能层。这一层的名字,我们称之为 AI OS。", en: "Enterprises no longer need an isolated model — they need an intelligence layer that understands the business, drives decisions and orchestrates teams. We call this layer the AI OS." },
        ],
      },
      {
        heading: { cn: "三条正在被重写的增长曲线", en: "Three growth curves being rewritten" },
        paragraphs: [
          { cn: "第一条曲线,是 “流量增长” 曲线。它正在被 Agent 对话漏斗取代:用户不再只是浏览网页,他们与品牌的智能体协商、比较、决策。", en: "First: the traffic-growth curve. It's being replaced by agent-conversation funnels — users no longer just browse pages, they negotiate and decide with the brand's agent." },
          { cn: "第二条曲线,是 “内容产能” 曲线。品牌媒体不再是可选项,而是新的默认状态。谁不能持续产出结构化知识,谁就会从 AI 搜索结果里消失。", en: "Second: content throughput. Brand-as-media is no longer optional — it is the default state. Those who can't produce structured knowledge disappear from AI answers." },
          { cn: "第三条曲线,是 “组织效率” 曲线。Agent 承担了大量的重复、协调与执行动作,组织重心开始从 “执行者” 移向 “策略者”。", en: "Third: org efficiency. Agents absorb repetitive coordination and execution work; the org's center of gravity moves from executors to strategists." },
        ],
      },
      {
        heading: { cn: "留给企业的 24 个月窗口", en: "The 24-month window enterprises still have" },
        paragraphs: [
          { cn: "AI 操作系统的建立,并不是一个 6 个月就能完成的项目。真正需要重构的,是数据、组织、品牌和 Agent 四层堆栈。24 个月,是一个务实的窗口期。", en: "Standing up an AI OS is not a 6-month project. Data, org, brand and agent — four stacks must be refactored. 24 months is a pragmatic window." },
          { cn: "在这个窗口内,能率先建立可训练数据资产、可复用 Agent 资产、可被引用品牌资产的企业,将获得未来 5-10 年的结构性优势。", en: "Enterprises that first build trainable data, reusable agent assets and citable brand assets in this window will hold a 5–10 year structural advantage." },
        ],
      },
    ],
  },
  "brand-growth-ai-rebuild": {
    kicker: { cn: "品牌增长 · Brand Growth", en: "Brand Growth" },
    sections: [
      {
        heading: { cn: "从买流量到造智能体", en: "From buying traffic to building agents" },
        paragraphs: [
          { cn: "广告主的核心账本正在被改写。过去我们记录的是曝光、点击、转化;而在 AI 时代,新的账本记录的是用户资产、内容资产与 Agent 资产。", en: "The advertiser's ledger is being rewritten. We used to log impressions, clicks and conversions; in the AI era the new ledger records user, content and agent assets." },
          { cn: "品牌真正拥有的,不再是渠道位置,而是一整套可对话、可推理、可复用的智能资产。", en: "What a brand actually owns is no longer channel placement — it is a full set of conversational, reasoning, reusable intelligent assets." },
        ],
      },
      {
        heading: { cn: "内容产能的 100 倍拐点", en: "The 100× content-throughput inflection" },
        paragraphs: [
          { cn: "AI 让内容生产的边际成本无限接近于零,但也让 “内容同质化” 成为新的品牌风险。真正的机会,在于建立一套只有你能生产的结构化知识体系。", en: "AI drives marginal content cost toward zero — and makes sameness the new brand risk. The real opportunity is a structured knowledge system only you can produce." },
        ],
      },
    ],
  },
  "geo-aeo-search-war": {
    kicker: { cn: "趋势 · Trend", en: "Trend" },
    sections: [
      {
        heading: { cn: "搜索答案化之后", en: "After search becomes answers" },
        paragraphs: [
          { cn: "当搜索结果不再是十条蓝色链接,而是一段完整的 AI 回答时,品牌竞争的对象也在改变。你不再是和别的品牌争排名,而是在和 “沉默” 争引用。", en: "When search results are no longer ten blue links but a full AI answer, brand competition changes. You no longer fight other brands for ranking — you fight silence for citation." },
          { cn: "GEO(生成式引擎优化)和 AEO(答案引擎优化)是这一轮结构性变化中,CMO 必须重新学习的两门基本功。", en: "GEO (generative engine optimization) and AEO (answer engine optimization) are the two disciplines every CMO must relearn." },
        ],
      },
    ],
  },
};

/* ---------- PARTNER NETWORK ---------- */

export const partnerNetwork = [
  { name: "Media360 Info", url: "https://media360.info", desc: { cn: "全球媒体商业情报", en: "Global media business intelligence" } },
  { name: "Media360 AI", url: "https://media360.ai", desc: { cn: "AI 驱动的媒体智能平台", en: "AI-driven media intelligence platform" } },
  { name: "Qian Foresee", url: "https://qianforesee.com", desc: { cn: "前瞻趋势与商业洞察", en: "Foresight trends & business insight" } },
  { name: "Innovation Plus", url: "https://innovationplus.org", desc: { cn: "全球创新加速网络", en: "Global innovation acceleration network" } },
] as const;
