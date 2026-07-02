import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, Globe } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";
import { buildStaticHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildStaticHead({
      path: "/contact",
      title: "联系我们 · Contact — AI商业宇宙 · AI Business Universe",
      description:
        "联系 AI商业宇宙,探索 AI+品牌增长、AI 营销转型、企业 GEO/AEO、AI Agent 工作流、企业培训、战略共创与定制研究 · Contact AI BIZ UNIVERSE for AI-powered brand growth, marketing transformation, GEO/AEO, Agent workflows and executive training.",
    }),
  component: ContactPage,
});

const TOPICS_CN = [
  "AI 品牌增长咨询",
  "AI 营销转型",
  "企业 GEO / AEO",
  "AI Agent 工作流",
  "企业培训 / 高管工作坊",
  "战略共创 / 定制研究",
  "报告下载 / 采购",
  "媒体合作",
];
const TOPICS_EN = [
  "AI Brand Growth",
  "AI Marketing Transformation",
  "Enterprise GEO / AEO",
  "AI Agent Workflows",
  "Executive Training",
  "Strategic Co-Creation",
  "Report Download",
  "Media Partnership",
];

function ContactPage() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const topics = lang === "cn" ? TOPICS_CN : TOPICS_EN;

  return (
    <SiteLayout>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <SectionLabel index="§ 12" label={lang === "cn" ? "关于 · 联系" : "About · Contact"} en="About & Contact" color="violet" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] lg:text-7xl">
            {lang === "cn" ? (<>联系 <span className="text-violet">AI 商业宇宙</span></>) : (<>Contact <span className="text-violet">AI BIZ UNIVERSE</span></>)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-foreground/75">
            {lang === "cn"
              ? "AI商业宇宙｜AI BIZ UNIVERSE 是面向企业创始人、CEO、CMO、品牌主、广告主与商业创新者的 AI+商业增长智库与内容平台。"
              : "AI BIZ UNIVERSE is an AI-powered business intelligence, strategy and growth platform built for founders, CEOs, CMOs, brand leaders, advertisers and business innovators."}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:py-24">
        <div className="space-y-6 text-[15px] leading-[1.8] text-foreground/85">
          <h2 className="font-display text-3xl">
            {lang === "cn" ? "关于 AI 商业宇宙" : "About AI BIZ UNIVERSE"}
          </h2>
          {lang === "cn" ? (
            <>
              <p>
                我们站在全球 AI 浪潮与商业变革的前沿,持续追踪全球 AI 巨头、关键技术平台、商业模式重构、品牌营销创新、媒介生态演进与企业 AI 转型趋势,为企业提供深度研究、战略简报、趋势报告、案例拆解、企业培训、共创工作坊与 AI 增长咨询服务。
              </p>
              <p>
                AI 商业宇宙相信,AI 不只是效率工具,而是重构企业战略、品牌增长、组织能力与商业竞争力的核心变量。我们的使命,是帮助企业真正看懂 AI 时代的商业新规则,把 AI 从单点工具升级为战略能力、增长系统与组织生产力。
              </p>
              <p className="text-foreground">
                如果你正在关注 AI+品牌增长、AI+营销转型、企业 GEO/AEO、AI Agent 工作流、AI 商业培训、战略共创或定制研究服务,欢迎与 AI 商业宇宙联系。
              </p>
            </>
          ) : (
            <>
              <p>
                Positioned at the intersection of global AI transformation and business reinvention, we track the world's leading AI companies, technology platforms, business model shifts, brand marketing innovation, media ecosystem changes and enterprise AI transformation trends. We provide in-depth research, strategic briefs, trend reports, case studies, executive training, co-creation workshops and AI growth consulting for forward-looking companies.
              </p>
              <p>
                We believe AI is no longer just a productivity tool. It is a new strategic infrastructure reshaping corporate strategy, brand growth, organizational capability and competitive advantage. Our mission is to help companies understand the new rules of business in the AI era and turn AI from isolated tools into strategic capability, growth systems and organizational productivity.
              </p>
              <p className="text-foreground">
                For AI-powered brand growth, AI marketing transformation, enterprise GEO/AEO, AI Agent workflows, executive training, strategic co-creation or customized research services, please contact AI BIZ UNIVERSE.
              </p>
            </>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href="mailto:hello@aibizuniverse.com" className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-foreground">
              <Mail className="h-5 w-5 text-violet" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</div>
                <div className="text-sm font-semibold">hello@aibizuniverse.com</div>
              </div>
            </a>
            <a href="mailto:report@aibizuniverse.com" className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-foreground">
              <Globe className="h-5 w-5 text-lime" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {lang === "cn" ? "报告下载 / 采购" : "Reports"}
                </div>
                <div className="text-sm font-semibold">report@aibizuniverse.com</div>
              </div>
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="h-fit rounded-2xl border-2 border-foreground bg-background p-6 shadow-[8px_8px_0_0_var(--color-violet)] lg:p-8"
        >
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-violet">
            <MessageSquare className="h-3.5 w-3.5" />
            {lang === "cn" ? "联系表单 · Contact Form" : "Contact Form"}
          </div>
          <h3 className="mt-3 font-display text-2xl leading-tight">
            {lang === "cn" ? "留下你的商业问题,我们 24 小时内回复。" : "Tell us your business question — reply within 24 hours."}
          </h3>

          {sent ? (
            <div className="mt-8 flex items-start gap-3 rounded-xl bg-lime/25 p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-foreground" />
              <div>
                <div className="font-display text-lg font-bold">
                  {lang === "cn" ? "已收到,感谢联系" : "Message received. Thank you."}
                </div>
                <div className="mt-1 text-[13px] text-foreground/75">
                  {lang === "cn" ? "AI 商业宇宙团队将在 24 小时内与你联系。" : "Our team will reach out within 24 hours."}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={lang === "cn" ? "姓名" : "Name"} required>
                  <input required type="text" className="inp" placeholder={lang === "cn" ? "张三" : "Jane Doe"} />
                </Field>
                <Field label={lang === "cn" ? "职务" : "Title"}>
                  <input type="text" className="inp" placeholder="CEO / CMO / Head of Growth" />
                </Field>
              </div>
              <Field label={lang === "cn" ? "企业邮箱" : "Work email"} required>
                <input required type="email" className="inp" placeholder="you@company.com" />
              </Field>
              <Field label={lang === "cn" ? "公司 · 品牌" : "Company / Brand"}>
                <input type="text" className="inp" />
              </Field>
              <Field label={lang === "cn" ? "咨询主题" : "Topic"} required>
                <select required className="inp bg-background" defaultValue="">
                  <option value="" disabled>{lang === "cn" ? "请选择" : "Select…"}</option>
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label={lang === "cn" ? "简述你的问题或需求" : "Briefly describe your question"} required>
                <textarea required rows={4} className="inp" />
              </Field>
              <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:bg-violet">
                <Send className="h-4 w-4" /> {lang === "cn" ? "发送 · Send" : "Send"}
              </button>
              <p className="text-[11px] text-muted-foreground">
                {lang === "cn"
                  ? "提交即表示同意 AI 商业宇宙就相关服务与你联系。"
                  : "Submitting means you agree to be contacted about relevant services."}
              </p>
            </div>
          )}
        </form>
      </section>

      <style>{`.inp{width:100%;border:1px solid var(--color-border);border-radius:8px;padding:10px 12px;font-size:14px;background:transparent;outline:none;transition:border-color .15s}.inp:focus{border-color:var(--color-foreground)}`}</style>
    </SiteLayout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-alert">*</span>}
      </span>
      {children}
    </label>
  );
}
