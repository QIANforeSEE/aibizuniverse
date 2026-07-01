// Mock content for AI Business Universe MVP.
// Later this will move to Lovable Cloud (Postgres) via server functions.

export type Signal = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  impact: 1 | 2 | 3 | 4 | 5;
  time: string;
};

export const signals: Signal[] = [
  {
    id: "s1",
    title: "OpenAI 将 Agent Builder 定价体系全面下调，企业部署门槛塌方",
    excerpt: "面向企业的 AI Agent 商业化进入价格战阶段，中小品牌首次具备规模化部署条件。",
    tags: ["Agent", "平台", "全球"],
    impact: 5,
    time: "2 小时前",
  },
  {
    id: "s2",
    title: "字节 Coze 商业版发布：把 AI Agent 塞进电商与广告投放全链路",
    excerpt: "中国 AI 平台首次把 Agent 与广告投放、内容生产、私域运营打通为单一操作系统。",
    tags: ["中国", "Agent", "广告"],
    impact: 5,
    time: "6 小时前",
  },
  {
    id: "s3",
    title: "Google 搜索 AI Overviews 覆盖率破 42%，GEO 成为品牌新战场",
    excerpt: "品牌搜索可见性重心从 SEO 转向 GEO / AEO，传统内容策略进入结构性重估。",
    tags: ["GEO", "品牌", "搜索"],
    impact: 4,
    time: "今日",
  },
  {
    id: "s4",
    title: "Anthropic 完成 200 亿美元融资，估值 3400 亿指向下一轮平台战争",
    excerpt: "顶级基础模型公司估值分化加剧，企业选型窗口收窄至 3 家核心平台。",
    tags: ["投资", "大模型"],
    impact: 4,
    time: "今日",
  },
  {
    id: "s5",
    title: "MiniMax 面向企业推出音视频多模态 Agent，切入品牌媒体化赛道",
    excerpt: "中国多模态模型开始向 CMO 场景下沉，AI 品牌媒体从概念进入部署阶段。",
    tags: ["中国", "多模态", "品牌"],
    impact: 3,
    time: "昨日",
  },
];

export type Featured = {
  id: string;
  slug: string;
  category: string;
  color: "lime" | "violet" | "signal" | "alert";
  title: string;
  excerpt: string;
  takeaways: string[];
  author: string;
  time: string;
  readMin: number;
};

export const featured: Featured[] = [
  {
    id: "f1",
    slug: "2026-ai-operating-system",
    category: "封面深度 · Cover Story",
    color: "lime",
    title: "2026：AI 从工具进入商业操作系统时代",
    excerpt:
      "AI 不再是插件式的工具，而是重写企业增长引擎的操作系统。品牌、内容、营销、组织，都在被同一套底层重构。",
    takeaways: [
      "AI 正在取代 SaaS 成为企业新的操作系统层",
      "增长引擎从渠道驱动切换为智能体驱动",
      "CMO 岗位在 24 个月内将被重新定义",
      "GEO / AEO 取代 SEO 成为品牌基本功",
      "数据资产的所有权决定 AI 时代的护城河",
    ],
    author: "AI商业宇宙编辑部",
    time: "2026 · 03",
    readMin: 12,
  },
  {
    id: "f2",
    slug: "brand-growth-ai-rebuild",
    category: "品牌增长 · Brand Growth",
    color: "violet",
    title: "品牌广告主如何用 AI 重构增长模型",
    excerpt:
      "广告主正在从 “买流量” 迁移到 “造智能体”。用户资产、内容资产、Agent 资产，成为品牌新的三大账本。",
    takeaways: [
      "投放漏斗被 Agent 对话漏斗替代",
      "内容产能从 10x 提升到 100x",
      "品牌媒体化不是选择，而是生存条件",
    ],
    author: "L. Chen",
    time: "2026 · 02",
    readMin: 9,
  },
  {
    id: "f3",
    slug: "geo-aeo-search-war",
    category: "趋势 · Trend",
    color: "signal",
    title: "GEO 与 AEO：企业搜索可见性的下一场战争",
    excerpt:
      "搜索答案化之后，品牌不再竞争排名，而是竞争 “是否被 AI 引用”。GEO / AEO 正在成为新一代 CMO 的必修课。",
    takeaways: [
      "AI 答案引擎重塑品牌信息分发",
      "结构化知识资产是新的搜索护城河",
      "企业需要在 12 个月内完成 GEO 迁移",
    ],
    author: "R. Wang",
    time: "2026 · 02",
    readMin: 8,
  },
];

export const growthSystem = [
  { code: "01", title: "AI 战略诊断", desc: "从业务出发，识别 AI 增长的关键杠杆与优先级。", color: "lime" as const },
  { code: "02", title: "AI 品牌增长", desc: "重写品牌资产结构，把品牌变成 AI 时代可被引用的知识体。", color: "violet" as const },
  { code: "03", title: "AI 内容与品牌媒体", desc: "从内容工厂到品牌媒体化，构建可复利的内容资产。", color: "signal" as const },
  { code: "04", title: "AI 搜索 GEO / AEO", desc: "让品牌在 AI 答案引擎中被检索、被引用、被信任。", color: "alert" as const },
  { code: "05", title: "AI Agent 部署", desc: "把 Agent 嵌入营销、销售、服务、内容、投放全链路。", color: "violet" as const },
  { code: "06", title: "AI 营销自动化", desc: "从投放优化到全链路自动化决策，重构 ROI 模型。", color: "lime" as const },
  { code: "07", title: "AI 组织升级", desc: "重设岗位、协作与考核，让组织跑得赢智能体。", color: "signal" as const },
  { code: "08", title: "AI 商业创新", desc: "识别新赛道、新产品、新商业模式的 AI 增量。", color: "alert" as const },
  { code: "09", title: "AI 数据资产", desc: "把私域与业务数据变成可训练、可复用的战略资产。", color: "lime" as const },
  { code: "10", title: "AI 增长证据链", desc: "从投入到增长，建立可归因、可复盘的证据体系。", color: "violet" as const },
];

export const keyPlayers = [
  { name: "OpenAI", region: "US", sector: "基础模型 / Agent", score: 98, delta: "+3", note: "Agent Builder 定价重构市场" },
  { name: "Anthropic", region: "US", sector: "基础模型 / 安全", score: 94, delta: "+2", note: "200 亿美元融资完成" },
  { name: "Google DeepMind", region: "US", sector: "多模态 / 搜索", score: 93, delta: "+4", note: "Gemini 3 覆盖搜索答案化" },
  { name: "字节 · Doubao / Coze", region: "CN", sector: "商业化 / Agent", score: 90, delta: "+5", note: "Coze 商业版切入投放" },
  { name: "NVIDIA", region: "US", sector: "基础设施", score: 89, delta: "0", note: "企业推理成本持续下降" },
  { name: "DeepSeek", region: "CN", sector: "开源基础模型", score: 87, delta: "+6", note: "R2 系列进入企业部署" },
  { name: "阿里 · 通义 / 百炼", region: "CN", sector: "企业 AI", score: 84, delta: "+1", note: "面向电商与广告主打包" },
  { name: "Microsoft", region: "US", sector: "企业 Copilot", score: 83, delta: "-1", note: "企业 Copilot 增速放缓" },
  { name: "MiniMax", region: "CN", sector: "多模态 / 品牌", score: 79, delta: "+4", note: "音视频 Agent 切入 CMO" },
  { name: "xAI", region: "US", sector: "基础模型", score: 74, delta: "+2", note: "Grok 4 面向企业开放" },
];

export const reports = [
  {
    id: "r1",
    tag: "旗舰 · Flagship",
    color: "lime" as const,
    title: "2026 AI 商业趋势报告",
    excerpt: "全球 AI 商业化 12 大趋势、48 个 Key Player、9 大增长引擎的完整版年度报告。",
    pages: 128,
    format: "PDF · 中英",
  },
  {
    id: "r2",
    tag: "白皮书 · Whitepaper",
    color: "violet" as const,
    title: "企业 AI Agent 落地指南",
    excerpt: "从战略选型、场景优先级到组织重塑的完整 Agent 部署路线图。",
    pages: 86,
    format: "PDF",
  },
  {
    id: "r3",
    tag: "指南 · Playbook",
    color: "signal" as const,
    title: "GEO / AEO 企业增长手册",
    excerpt: "AI 搜索时代品牌可见性作战手册：结构化知识、答案资产、引用信号。",
    pages: 64,
    format: "PDF",
  },
  {
    id: "r4",
    tag: "报告 · Report",
    color: "alert" as const,
    title: "AI 品牌媒体白皮书",
    excerpt: "内容工厂到品牌媒体化，广告主的下一场增长战。",
    pages: 72,
    format: "PDF",
  },
];

export const consultingServices = [
  {
    title: "AI 商业增长诊断",
    duration: "2 周",
    desc: "从业务、组织、数据三个维度扫描 AI 增长机会，输出优先级路线图。",
  },
  {
    title: "企业 AI 战略工作坊",
    duration: "3 天集中",
    desc: "面向 CEO、CMO、CTO 的高层共识工作坊，24 小时内产出战略画布。",
  },
  {
    title: "AI Agent 共创营",
    duration: "6–12 周",
    desc: "与团队共创可落地的 Agent 产品原型，从 PoC 走到生产环境。",
  },
  {
    title: "AI 品牌媒体系统搭建",
    duration: "8 周",
    desc: "从内容策略、生产链路到分发引擎，为品牌搭建 AI 时代的媒体系统。",
  },
  {
    title: "GEO / AEO 优化咨询",
    duration: "4 周",
    desc: "结构化知识资产梳理 + 答案引擎优化 + 引用信号建设。",
  },
  {
    title: "企业 AI 转型陪跑",
    duration: "6 个月起",
    desc: "季度节奏的深度陪跑，从战略、组织到执行，全链路 AI 化。",
  },
];

export const suggestedQuestions = [
  "2026 年企业最应该关注哪些 AI 商业趋势？",
  "品牌广告主如何用 AI 提升营销 ROI？",
  "GEO 和 AEO 对企业有什么价值？",
  "AI Agent 如何在营销部门落地？",
  "中国 AI 平台大战对品牌有什么影响？",
  "我的公司如何建立 AI 增长操作系统？",
];
