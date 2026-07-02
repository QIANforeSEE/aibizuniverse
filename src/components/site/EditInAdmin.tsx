import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Kind = "article" | "video" | "podcast" | "report";

/**
 * One-click chip → jumps to /upload?type=<kind>&view=manage
 * Stops link bubbling so it won't trigger the parent card navigation.
 */
export function EditInAdmin({ kind, className = "" }: { kind: Kind; className?: string }) {
  const { lang } = useLang();
  return (
    <Link
      to="/upload"
      search={{ type: kind, view: "manage" }}
      onClick={(e) => e.stopPropagation()}
      className={
        "inline-flex items-center gap-1 rounded-full border border-foreground/70 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur transition-colors hover:bg-foreground hover:text-background " +
        className
      }
      aria-label={lang === "cn" ? "在后台编辑" : "Edit in admin"}
    >
      <Pencil className="h-3 w-3" />
      {lang === "cn" ? "后台编辑" : "Edit"}
    </Link>
  );
}
