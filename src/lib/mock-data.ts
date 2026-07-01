// Mock content for AI Business Universe MVP.
// Later this will move to Lovable Cloud (Postgres) via server functions.

export type Signal = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  impact: 1 | 2 | 3 | 4 | 5;
  time: string;
};

export const signals: Signal[] = [
  {
    id: "s1",
    slug: "openai-agent-builder-pricing-cut",
    title: "OpenAI 将 Agent Builder 定价体系全面下调,企业部署门槛塌方",
    excerpt: "面向企业的 AI Agent 商业化进入价格战阶段,中小品牌首次具备规模化部署条件。",
    tags: ["Agent", "平台", "全球"],
    impact: 5,
    time: "2 小时前",
  },
  {
    id: "s2",
    slug: "coze-commerce-agent-launch",
    title: "字节 Coze 商业版发布:把 AI Agent 塞进电商与广告投放全链路",
    excerpt: "中国 AI 平台首次把 Agent 与广告投放、内容生产、私域运营打通为单一操作系统。",
    tags: ["中国", "Agent", "广告"],
    impact: 5,
    time: "6 小时前",
  },
  {
    id: "s3",
    slug: "google-ai-overviews-42-percent",
    title: "Google 搜索 AI Overviews 覆盖率破 42%,GEO 成为品牌新战场",
    excerpt: "品牌搜索可见性重心从 SEO 转向 GEO / AEO,传统内容策略进入结构性重估。",
    tags: ["GEO", "品牌", "搜索"],
    impact: 4,
    time: "今日",
  },
  {
    id: "s4",
    slug: "anthropic-20b-funding",
    title: "Anthropic 完成 200 亿美元融资,估值 3400 亿指向下一轮平台战争",
    excerpt: "顶级基础模型公司估值分化加剧,企业选型窗口收窄至 3 家核心平台。",
    tags: ["投资", "大模型"],
    impact: 4,
    time: "今日",
  },
  {
    id: "s5",
    slug: "minimax-multimodal-agent-brand",
    title: "MiniMax 面向企业推出音视频多模态 Agent,切入品牌媒体化赛道",
    excerpt: "中国多模态模型开始向 CMO 场景下沉,AI 品牌媒体从概念进入部署阶段。",
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
    title: "2026:AI 从工具进入商业操作系统时代",
    excerpt:
      "AI 不再是插件式的工具,而是重写企业增长引擎的操作系统。品牌、内容、营销、组织,都在被同一套底层重构。",
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
      "广告主正在从 \u201c买流量\u201d 迁移到 \u201c造智能体\u201d。用户资产、内容资产、Agent 资产,成为品牌新的三大账本。",
    takeaways: [
      "投放漏斗被 Agent 对话漏斗替代",
      "内容产能从 10x 提升到 100x",
      "品牌媒体化不是选择,而是生存条件",
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
    title: "GEO 与 AEO:企业搜索可见性的下一场战争",
    excerpt:
      "搜索答案化之后,品牌不再竞争排名,而是竞争 \u201c是否被 AI 引用\u201d。GEO / AEO 正在成为新一代 CMO 的必修课。",
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
  { code: "01", title: "AI 战略诊断", desc: "从业务出发,识别 AI 增长的关键杠杆与优先级。", color: "lime" as const },
  { code: "02", title: "AI 品牌增长", desc: "重写品牌资产结构,把品牌变成 AI 时代可被引用的知识体。", color: "violet" as const },
  { code: "03", title: "AI 内容与品牌媒体", desc: "从内容工厂到品牌媒体化,构建可复利的内容资产。", color: "signal" as const },
  { code: "04", title: "AI 搜索 GEO / AEO", desc: "让品牌在 AI 答案引擎中被检索、被引用、被信任。", color: "alert" as const },
  { code: "05", title: "AI Agent 部署", desc: "把 Agent 嵌入营销、销售、服务、内容、投放全链路。", color: "violet" as const },
  { code: "06", title: "AI 营销自动化", desc: "从投放优化到全链路自动化决策,重构 ROI 模型。", color: "lime" as const },
  { code: "07", title: "AI 组织升级", desc: "重设岗位、协作与考核,让组织跑得赢智能体。", color: "signal" as const },
  { code: "08", title: "AI 商业创新", desc: "识别新赛道、新产品、新商业模式的 AI 增量。", color: "alert" as const },
  { code: "09", title: "AI 数据资产", desc: "把私域与业务数据变成可训练、可复用的战略资产。", color: "lime" as const },
  { code: "10", title: "AI 增长证据链", desc: "从投入到增长,建立可归因、可复盘的证据体系。", color: "violet" as const },
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
    excerpt: "AI 搜索时代品牌可见性作战手册:结构化知识、答案资产、引用信号。",
    pages: 64,
    format: "PDF",
  },
  {
    id: "r4",
    tag: "报告 · Report",
    color: "alert" as const,
    title: "AI 品牌媒体白皮书",
    excerpt: "内容工厂到品牌媒体化,广告主的下一场增长战。",
    pages: 72,
    format: "PDF",
  },
];

export const consultingServices = [
  { title: "AI 商业增长诊断", duration: "2 周", desc: "从业务、组织、数据三个维度扫描 AI 增长机会,输出优先级路线图。" },
  { title: "企业 AI 战略工作坊", duration: "3 天集中", desc: "面向 CEO、CMO、CTO 的高层共识工作坊,24 小时内产出战略画布。" },
  { title: "AI Agent 共创营", duration: "6–12 周", desc: "与团队共创可落地的 Agent 产品原型,从 PoC 走到生产环境。" },
  { title: "AI 品牌媒体系统搭建", duration: "8 周", desc: "从内容策略、生产链路到分发引擎,为品牌搭建 AI 时代的媒体系统。" },
  { title: "GEO / AEO 优化咨询", duration: "4 周", desc: "结构化知识资产梳理 + 答案引擎优化 + 引用信号建设。" },
  { title: "企业 AI 转型陪跑", duration: "6 个月起", desc: "季度节奏的深度陪跑,从战略、组织到执行,全链路 AI 化。" },
];

export const suggestedQuestions = [
  "2026 年企业最应该关注哪些 AI 商业趋势?",
  "品牌广告主如何用 AI 提升营销 ROI?",
  "GEO 和 AEO 对企业有什么价值?",
  "AI Agent 如何在营销部门落地?",
  "中国 AI 平台大战对品牌有什么影响?",
  "我的公司如何建立 AI 增长操作系统?",
];

/* ---------- VIDEO ---------- */

export type VideoItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  duration: string;
  category: string;
  thumb: "v1" | "v2";
  color: "lime" | "violet" | "signal" | "alert";
};

export const videos: VideoItem[] = [
  {
    id: "v1",
    slug: "cmo-ai-native-keynote",
    title: "CMO 的 AI Native 时刻:一场关于增长引擎的公开演讲",
    excerpt: "全球 500 强 CMO 联席会主题演讲:当增长模型被智能体重写,营销组织如何被重新绘制。",
    duration: "28:14",
    category: "Keynote · 主题演讲",
    thumb: "v1",
    color: "lime",
  },
  {
    id: "v2",
    slug: "inside-ai-chip-lab",
    title: "走进 AI 芯片实验室:一颗芯片如何决定商业格局",
    excerpt: "五位芯片架构师、系统工程师与产业投资人,拆解算力经济下一次重估。",
    duration: "17:42",
    category: "纪录短片 · Documentary",
    thumb: "v2",
    color: "violet",
  },
  {
    id: "v3",
    slug: "agent-economy-roundtable",
    title: "Agent 经济圆桌:谁在建造下一代商业操作系统",
    excerpt: "来自 OpenAI、字节 Coze、DeepSeek 生态的产品负责人,同框对谈 Agent 商业化边界。",
    duration: "42:08",
    category: "圆桌 · Roundtable",
    thumb: "v1",
    color: "signal",
  },
  {
    id: "v4",
    slug: "brand-media-newsroom",
    title: "品牌即媒体:一间由 AI 编辑部驱动的新型内容中台",
    excerpt: "跟拍一间被 AI 重写的品牌新闻编辑部,每天产出 800 条内容资产。",
    duration: "12:36",
    category: "特稿短片 · Feature",
    thumb: "v2",
    color: "alert",
  },
];

/* ---------- MUSIC / AUDIO ---------- */

export type AudioItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  duration: string;
  category: string;
  thumb: "a1" | "a2";
  color: "lime" | "violet" | "signal" | "alert";
};

export const audios: AudioItem[] = [
  {
    id: "a1",
    slug: "ceo-briefing-06-ai-os",
    title: "CEO Briefing #06:当公司变成一个可对话的系统",
    excerpt: "18 分钟深度播客,写给 CEO 与 CFO 的 AI 商业操作系统备忘录。",
    duration: "18:22",
    category: "深度播客 · CEO Briefing",
    thumb: "a1",
    color: "signal",
  },
  {
    id: "a2",
    slug: "ambient-neural-signals",
    title: "Ambient · Neural Signals(AI 生成环境音场)",
    excerpt: "由多模态模型生成的 42 分钟环境音场,写作、深度阅读与远距离思考的背景音。",
    duration: "42:00",
    category: "AI 原生音乐 · AI Native Music",
    thumb: "a2",
    color: "violet",
  },
  {
    id: "a3",
    slug: "founders-audio-notes-agent",
    title: "创始人音频札记:第一次亲手部署 Agent 的 90 天",
    excerpt: "三位创始人、三段第一现场录音,记录 Agent 从 PoC 走进生产环境的真实节奏。",
    duration: "26:47",
    category: "音频札记 · Founder Notes",
    thumb: "a1",
    color: "lime",
  },
  {
    id: "a4",
    slug: "growth-radio-cmo-shift",
    title: "Growth Radio:CMO 岗位正在被重写的 6 个信号",
    excerpt: "每周一档的商业增长电台,拆解一线 CMO 正在应对的 6 个结构性变化。",
    duration: "31:05",
    category: "电台 · Growth Radio",
    thumb: "a2",
    color: "alert",
  },
];

/* ---------- ARTICLE BODIES ---------- */

// A tiny inline body store keyed by slug so /article/$slug can render real prose.
// In Phase 3 this moves to the database.
export const articleBodies: Record<
  string,
  { kicker: string; sections: { heading: string; paragraphs: string[] }[] }
> = {
  "2026-ai-operating-system": {
    kicker: "封面故事 · Cover Story",
    sections: [
      {
        heading: "从工具到操作系统",
        paragraphs: [
          "过去两年,企业里最常听到的一句话是 \u201c我们要上一个 AI\u201d。但在 2026 年,\u201c上一个 AI\u201d 已经变成一句过时的表达。真正在发生的事情是:AI 正在成为一整套企业操作系统,替代过去 20 年由 SaaS 构筑的分层架构。",
          "企业不再需要一个孤立的模型,他们需要一个可以理解业务、驱动决策、编排团队的智能层。这一层的名字,我们称之为 AI OS。",
        ],
      },
      {
        heading: "三条正在被重写的增长曲线",
        paragraphs: [
          "第一条曲线,是 \u201c流量增长\u201d 曲线。它正在被 Agent 对话漏斗取代:用户不再只是浏览网页,他们与品牌的智能体协商、比较、决策。",
          "第二条曲线,是 \u201c内容产能\u201d 曲线。品牌媒体不再是可选项,而是新的默认状态。谁不能持续产出结构化知识,谁就会从 AI 搜索结果里消失。",
          "第三条曲线,是 \u201c组织效率\u201d 曲线。Agent 承担了大量的重复、协调与执行动作,组织重心开始从 \u201c执行者\u201d 移向 \u201c策略者\u201d。",
        ],
      },
      {
        heading: "留给企业的 24 个月窗口",
        paragraphs: [
          "AI 操作系统的建立,并不是一个 6 个月就能完成的项目。真正需要重构的,是数据、组织、品牌和 Agent 四层堆栈。24 个月,是一个务实的窗口期。",
          "在这个窗口内,能率先建立可训练数据资产、可复用 Agent 资产、可被引用品牌资产的企业,将获得未来 5-10 年的结构性优势。",
        ],
      },
    ],
  },
  "brand-growth-ai-rebuild": {
    kicker: "品牌增长 · Brand Growth",
    sections: [
      {
        heading: "从买流量到造智能体",
        paragraphs: [
          "广告主的核心账本正在被改写。过去我们记录的是曝光、点击、转化;而在 AI 时代,新的账本记录的是用户资产、内容资产与 Agent 资产。",
          "品牌真正拥有的,不再是渠道位置,而是一整套可对话、可推理、可复用的智能资产。",
        ],
      },
      {
        heading: "内容产能的 100 倍拐点",
        paragraphs: [
          "AI 让内容生产的边际成本无限接近于零,但也让 \u201c内容同质化\u201d 成为新的品牌风险。真正的机会,在于建立一套只有你能生产的结构化知识体系。",
        ],
      },
    ],
  },
  "geo-aeo-search-war": {
    kicker: "趋势 · Trend",
    sections: [
      {
        heading: "搜索答案化之后",
        paragraphs: [
          "当搜索结果不再是十条蓝色链接,而是一段完整的 AI 回答时,品牌竞争的对象也在改变。你不再是和别的品牌争排名,而是在和 \u201c沉默\u201d 争引用。",
          "GEO(生成式引擎优化)和 AEO(答案引擎优化)是这一轮结构性变化中,CMO 必须重新学习的两门基本功。",
        ],
      },
    ],
  },
};
