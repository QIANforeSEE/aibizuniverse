import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SectionLabel({
  index,
  label,
  en,
  color = "violet",
}: {
  index: string;
  label: string;
  en: string;
  color?: "violet" | "lime" | "signal" | "alert";
}) {
  const dot = {
    violet: "bg-violet",
    lime: "bg-lime",
    signal: "bg-signal",
    alert: "bg-alert",
  }[color];
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
      <span className="font-mono text-foreground">{index}</span>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span>{label}</span>
      <span className="text-muted-foreground/60">/ {en}</span>
    </div>
  );
}
