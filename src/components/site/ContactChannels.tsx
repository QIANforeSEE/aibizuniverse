import { Phone, Mail, MessageSquare } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * Standardized bilingual contact CTA — Phone / Email / Form.
 * Used on /consulting and /upload for a consistent experience.
 */
export function ContactChannels({
  formHref = "#booking",
  variant = "default",
}: {
  formHref?: string;
  variant?: "default" | "compact";
}) {
  const { lang } = useLang();

  const channels = [
    {
      key: "phone",
      icon: Phone,
      chip: "bg-lime text-foreground",
      label: { cn: "电话", en: "Phone" },
      value: "+86 138 0000 0000",
      sub: { cn: "工作日 9:00–20:00", en: "Mon–Fri · 9:00–20:00" },
      href: "tel:+8613800000000",
    },
    {
      key: "email",
      icon: Mail,
      chip: "bg-violet text-white",
      label: { cn: "邮箱", en: "Email" },
      value: "hello@aibizuniverse.com",
      sub: { cn: "24 小时内回复", en: "Reply within 24h" },
      href: "mailto:hello@aibizuniverse.com",
    },
    {
      key: "form",
      icon: MessageSquare,
      chip: "bg-alert text-white",
      label: { cn: "在线表单", en: "Online form" },
      value: lang === "cn" ? "预约 30 分钟诊断" : "Book 30-min diagnostic",
      sub: { cn: "免费 · 专属回复", en: "Free · personal reply" },
      href: formHref,
    },
  ] as const;

  return (
    <div className={"rounded-2xl border-2 border-foreground bg-paper " + (variant === "compact" ? "p-4" : "p-5")}>
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet">
        {lang === "cn" ? "三种联系方式,任选其一" : "Three ways to reach us — pick one"}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {channels.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.key}
              href={c.href}
              className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-foreground"
            >
              <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-full " + c.chip}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {lang === "cn" ? c.label.cn : c.label.en}
                </div>
                <div className="text-sm font-semibold break-all">{c.value}</div>
                <div className="text-[11px] text-muted-foreground">
                  {lang === "cn" ? c.sub.cn : c.sub.en}
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">
        {lang === "cn"
          ? "咨询 · 培训 · 共创 — Consulting · Training · Co-Creation"
          : "Consulting · Training · Co-Creation — 咨询 · 培训 · 共创"}
      </p>
    </div>
  );
}
