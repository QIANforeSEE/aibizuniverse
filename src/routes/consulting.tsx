import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, GraduationCap, Compass, Users, Sparkles, Send } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/SiteLayout";
import { ContactChannels } from "@/components/site/ContactChannels";
import { useT, useLang } from "@/lib/i18n";
import { consultingServices } from "@/lib/mock-data";
import { buildStaticHead } from "@/lib/seo";


export const Route = createFileRoute("/consulting")({
  head: () =>
    buildStaticHead({
      path: "/consulting",
      title: "咨询 · 培训 · 共创 · Consulting — AI商业宇宙 · AI Business Universe",
      description:
        "AI 商业增长诊断、战略工作坊、Agent 共创营与企业转型陪跑服务 · AI growth diagnostics, workshops, agent co-build camps and transformation retainers.",
    }),
  component: ConsultingPage,
});

function ConsultingPage() {
  const t = useT();
  const { lang } = useLang();
  const [sent, setSent] = useState(false);

  const tracks = [
    {
      icon: Compass,
      title: { cn: "AI 战略咨询", en: "AI Strategy Consulting" },
      desc: { cn: "AI+品牌增长、GEO/AEO、Agent 工作流、组织转型的高层战略陪跑。", en: "Executive advisory on AI+ brand growth, GEO/AEO, agent workflows and org transformation." },
    },
    {
      icon: GraduationCap,
      title: { cn: "企业 AI 培训", en: "Enterprise AI Training" },
      desc: { cn: "CEO/CMO 高管班、营销团队实战训练、AI Native 组织认证课程。", en: "CEO/CMO briefings, marketing bootcamps and AI-Native org certification." },
    },
    {
      icon: Users,
      title: { cn: "共创工作坊", en: "Co-Creation Workshops" },
      desc: { cn: "2-3 天沉浸式工作坊,产出品牌 AI 战略、Agent 蓝图与增长路线图。", en: "Immersive 2-3 day workshops delivering brand AI strategy, agent blueprint and growth roadmap." },
    },
    {
      icon: Sparkles,
      title: { cn: "定制研究报告", en: "Custom Research" },
      desc: { cn: "行业深度研究、竞品 AI 能力扫描、CEO 决策简报与内部白皮书。", en: "Sector research, competitive AI scans, CEO briefings and internal whitepapers." },
    },
  ];

  return (
    <SiteLayout>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          <SectionLabel index="§ 07" label={lang === "cn" ? "咨询 · 培训 · 共创" : "Consulting · Training"} en="Consulting" color="alert" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] lg:text-7xl">
            {lang === "cn" ? (<>把 AI 变成你企业的<span className="text-alert"> 增长系统</span>。</>) : (<>Turn AI into your company's <span className="text-alert">growth system</span>.</>)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-foreground/75">
            {lang === "cn"
              ? "AI 商业宇宙与 CEO、CMO、CTO、创新负责人一起工作,提供从战略诊断、Agent 共创、组织培训到定制研究的全链路服务。"
              : "We work with CEOs, CMOs, CTOs and innovation leads — from strategic diagnostics to agent co-creation, executive training and custom research."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <SectionLabel index="C · 01" label={lang === "cn" ? "四大服务线" : "Four Service Tracks"} en="Service Tracks" color="violet" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tracks.map((tr) => {
            const Icon = tr.icon;
            return (
              <div key={t(tr.title)} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground">
                <Icon className="h-6 w-6 text-violet" />
                <h3 className="mt-5 font-display text-xl font-bold leading-tight">{t(tr.title)}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t(tr.desc)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
          <SectionLabel index="C · 02" label={lang === "cn" ? "标准化服务包" : "Service Packages"} en="Packages" color="lime" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {consultingServices.map((s, i) => (
              <div key={i} className="flex flex-col rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-foreground">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>SVC · {String(i + 1).padStart(2, "0")}</span>
                  <span>{t(s.duration)}</span>
                </div>
                <div className="mt-4 font-display text-lg font-bold leading-tight">{t(s.title)}</div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{t(s.desc)}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-foreground hover:text-violet">
                  {lang === "cn" ? "预约咨询 →" : "Book →"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-10 lg:py-24">
        <div>
          <SectionLabel index="C · 03" label={lang === "cn" ? "联系咨询团队" : "Talk to Us"} en="Contact" color="alert" />
          <h2 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">
            {lang === "cn" ? (<>预约 <span className="text-alert">30 分钟</span> AI 增长诊断</>) : (<>Book a <span className="text-alert">30-min</span> AI growth diagnostic</>)}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {lang === "cn"
              ? "免费,面向 CEO / CMO / CTO / 创新负责人。我们会带着一份定制化的 AI 增长机会图与你对齐第一步。"
              : "Complimentary. For CEO / CMO / CTO / innovation leads. We arrive with a tailored AI growth opportunity map."}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-foreground/85">
            {[
              lang === "cn" ? "定位品牌在 AI 时代的 3 个增长机会点" : "3 AI-era growth opportunities for your brand",
              lang === "cn" ? "评估当前 AI 能力成熟度与差距" : "Assess current AI maturity and gaps",
              lang === "cn" ? "给出下一步 90 天行动建议" : "Actionable 90-day roadmap",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-lime" />{x}</li>
            ))}
          </ul>

          <div className="mt-8">
            <ContactChannels formHref="#booking" />
          </div>
        </div>


        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="h-fit rounded-2xl border-2 border-foreground bg-background p-6 shadow-[8px_8px_0_0_var(--color-alert)] lg:p-8"
        >
          {sent ? (
            <div className="flex items-start gap-3 rounded-xl bg-lime/25 p-6">
              <CheckCircle2 className="mt-0.5 h-6 w-6" />
              <div>
                <div className="font-display text-xl font-bold">{lang === "cn" ? "预约已提交" : "Booking received"}</div>
                <div className="mt-1 text-[13px] text-foreground/75">
                  {lang === "cn" ? "我们将在 24 小时内与你确认时间。" : "We'll confirm a time within 24 hours."}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <F label={lang === "cn" ? "姓名" : "Name"} req><input required className="inp" /></F>
                <F label={lang === "cn" ? "职务" : "Title"}><input className="inp" placeholder="CEO / CMO" /></F>
              </div>
              <F label={lang === "cn" ? "企业邮箱" : "Work email"} req><input required type="email" className="inp" placeholder="you@company.com" /></F>
              <F label={lang === "cn" ? "公司 · 品牌" : "Company / Brand"}><input className="inp" /></F>
              <F label={lang === "cn" ? "关注服务" : "Interested in"}>
                <select className="inp bg-background" defaultValue="">
                  <option value="" disabled>{lang === "cn" ? "请选择" : "Select…"}</option>
                  {consultingServices.map((s, i) => <option key={i}>{t(s.title)}</option>)}
                </select>
              </F>
              <F label={lang === "cn" ? "简述你的挑战" : "Brief your challenge"} req>
                <textarea required rows={4} className="inp" />
              </F>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-alert px-6 py-4 text-sm font-semibold text-white hover:bg-foreground">
                <Send className="h-4 w-4" /> {lang === "cn" ? "提交预约" : "Submit booking"} <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>
      </section>

      <style>{`.inp{width:100%;border:1px solid var(--color-border);border-radius:8px;padding:10px 12px;font-size:14px;background:transparent;outline:none}.inp:focus{border-color:var(--color-foreground)}`}</style>
    </SiteLayout>
  );
}

function F({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label} {req && <span className="text-alert">*</span>}
      </span>
      {children}
    </label>
  );
}
