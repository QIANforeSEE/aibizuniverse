import { createFileRoute } from "@tanstack/react-router";

type Message = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `你是「AI商业宇宙」智能体（AI Business Universe Agent），一个面向企业 CEO、CMO、CTO、品牌广告主、创新与营销负责人的高端 AI 商业增长顾问。

你的能力融合：前沿科技媒体的敏锐度 + 商业创新媒体的趋势感 + 顶级投资研究机构的分析深度 + 咨询公司的结构化方法论。

回答要求：
1. 语言：默认中文，语气克制、专业、有洞察，不空话不套话。
2. 结构：面向商业决策者，先结论、后论据、再行动。
3. 引用：涉及数据/公司/产品时给出具体名称与时间窗口。
4. 面向增长：始终指向"企业如何用 AI 驱动商业增长"。

必须严格输出以下 JSON 结构（不得添加解释文字、代码围栏、markdown）：
{
  "answer": "面向商业决策者的核心回答，300-600 字，可用 markdown（**加粗**、列表、###小标题）。",
  "keyPoints": ["3-5 条最核心结论，每条不超过 40 字"],
  "recommendedReading": [
    { "title": "推荐阅读的标题", "category": "封面深度 / 品牌增长 / 趋势 / 报告 之一", "reason": "为什么值得读，一句话" }
  ],
  "followUpQuestions": ["3 个高质量的追问，帮助用户往决策方向继续深入"]
}`;

export const Route = createFileRoute("/api/agent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "Missing LOVABLE_API_KEY" }, { status: 500 });
        }

        let body: { messages?: Message[]; question?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const history: Message[] = Array.isArray(body.messages) ? body.messages : [];
        const question = (body.question ?? "").toString().trim();
        if (!question && history.length === 0) {
          return Response.json({ error: "question is required" }, { status: 400 });
        }

        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map((m) => ({ role: m.role, content: m.content })),
          ...(question ? [{ role: "user" as const, content: question }] : []),
        ];

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages,
            response_format: { type: "json_object" },
          }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 500;
          return Response.json(
            {
              error:
                upstream.status === 429
                  ? "请求过于频繁，请稍后再试。"
                  : upstream.status === 402
                    ? "AI 额度已用尽，请前往设置补充信用额。"
                    : `模型返回错误：${text.slice(0, 200)}`,
            },
            { status },
          );
        }

        const data = (await upstream.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const raw = data.choices?.[0]?.message?.content ?? "";

        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = { answer: raw, keyPoints: [], recommendedReading: [], followUpQuestions: [] };
        }

        return Response.json(parsed);
      },
    },
  },
});
