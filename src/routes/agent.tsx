import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Loader2, Send, Sparkles } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { suggestedQuestions } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/agent")({
  head: () =>
    buildStaticHead({
      path: "/agent",
      title: "AI商业宇宙智能体 · AI Business Universe Agent",
      description:
        "面向 CEO、CMO 与品牌广告主的 AI 商业增长顾问。提出你的商业问题,智能体将给出结构化答案与推荐阅读 · AI business growth advisor for CEOs, CMOs and advertisers — structured answers and recommended reading.",
    }),
  component: AgentPage,
});

type AgentReading = { title: string; category?: string; reason?: string };
type AgentResponse = {
  answer: string;
  keyPoints?: string[];
  recommendedReading?: AgentReading[];
  followUpQuestions?: string[];
};
type Turn = { question: string; response?: AgentResponse; error?: string };

function AgentPage() {
  const t = useT();
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, loading]);

  async function ask(q: string) {
    const question = q.trim();
    if (!question || loading) return;
    setInput("");
    const history = turns.flatMap((t) =>
      t.response
        ? [
            { role: "user" as const, content: t.question },
            { role: "assistant" as const, content: t.response.answer },
          ]
        : [],
    );
    setTurns((prev) => [...prev, { question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, question }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTurns((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { question, error: data?.error ?? "请求失败" };
          return copy;
        });
      } else {
        setTurns((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { question, response: data as AgentResponse };
          return copy;
        });
      }
    } catch (e) {
      setTurns((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { question, error: (e as Error).message };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-16 lg:px-10 lg:pt-24">
          <SectionLabel index="§ 08" label="AI 商业宇宙智能体" en="AI Business Universe Agent" color="violet" />
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight lg:text-7xl">
                提出你的商业问题<span className="text-violet">.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                面向 CEO、CMO、品牌广告主与创新负责人的 AI 商业顾问。
                回答结构：<span className="font-medium text-foreground">核心结论 · 关键要点 · 推荐阅读 · 追问建议</span>。
              </p>
            </div>
            <aside className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet" /> 建议提问
              </div>
              <ul className="mt-4 space-y-2">
                {suggestedQuestions.slice(0, 4).map((q, i) => {
                  const text = t(q);
                  return (
                    <li key={i}>
                      <button
                        onClick={() => ask(text)}
                        className="group flex w-full items-start justify-between gap-3 rounded-md border border-transparent px-2 py-2 text-left text-sm text-foreground transition-colors hover:border-border hover:bg-accent"
                      >
                        <span>{text}</span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
        <div
          ref={scrollRef}
          className="flex max-h-[70vh] flex-col gap-8 overflow-y-auto pr-2"
        >
          {turns.length === 0 && !loading && (
            <div className="rounded-2xl border border-dashed border-border bg-paper p-10 text-center text-sm text-muted-foreground">
              提出你的第一个商业问题，或从右上角建议提问开始。
            </div>
          )}
          {turns.map((t, i) => (
            <TurnBlock key={i} turn={t} loading={loading && i === turns.length - 1 && !t.response && !t.error} onAsk={ask} />
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                ask(input);
              }
            }}
            placeholder="例如：品牌广告主如何用 AI 重构 2026 年的增长模型？"
            className="min-h-[96px] resize-none border-0 bg-transparent px-2 text-base shadow-none focus-visible:ring-0"
            disabled={loading}
          />
          <div className="flex items-center justify-between border-t border-border pt-3">
            <p className="text-xs text-muted-foreground">
              由 AI商业宇宙智能体驱动 · 回答仅供决策参考 · ⌘ + Enter 发送
            </p>
            <Button type="submit" disabled={loading || !input.trim()} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "生成中" : "发送"}
            </Button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}

function TurnBlock({
  turn,
  loading,
  onAsk,
}: {
  turn: Turn;
  loading: boolean;
  onAsk: (q: string) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground px-5 py-3 text-sm text-background">
          {turn.question}
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-violet" />
          智能体正在检索 AI 商业宇宙知识库…
        </div>
      )}

      {turn.error && (
        <div className="rounded-xl border border-alert/40 bg-alert/5 p-4 text-sm text-alert">
          {turn.error}
        </div>
      )}

      {turn.response && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> 智能体回答 · Answer
            </div>
            <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
              {turn.response.answer}
            </div>

            {turn.response.keyPoints && turn.response.keyPoints.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  关键结论 · Key Points
                </div>
                <ul className="mt-3 space-y-2">
                  {turn.response.keyPoints.map((p, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="mt-0.5 font-mono text-xs text-violet">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {turn.response.followUpQuestions && turn.response.followUpQuestions.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  继续追问 · Follow-up
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {turn.response.followUpQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => onAsk(q)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-violet hover:text-violet"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="rounded-2xl border border-border bg-paper p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              推荐阅读 · Recommended
            </div>
            <ul className="mt-4 space-y-4">
              {(turn.response.recommendedReading ?? []).map((r, i) => (
                <li key={i} className="group border-b border-border pb-4 last:border-b-0 last:pb-0">
                  {r.category && (
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet">
                      {r.category}
                    </div>
                  )}
                  <div className="mt-1 text-sm font-semibold text-foreground">{r.title}</div>
                  {r.reason && (
                    <div className="mt-1 text-xs text-muted-foreground">{r.reason}</div>
                  )}
                </li>
              ))}
              {(!turn.response.recommendedReading || turn.response.recommendedReading.length === 0) && (
                <li className="text-xs text-muted-foreground">暂无推荐阅读。</li>
              )}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
