import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Kind = "article" | "video" | "podcast" | "report";

/**
 * One-click chip → jumps to /upload with edit context pre-filled.
 * When `slug` is supplied, the upload page opens the pre-filled editor
 * (mode=edit, correct type & item selected). Without a slug, it lands
 * on the manage list scoped to `kind`. Stops link bubbling so it won't
 * trigger the parent card navigation.
 */
export function EditInAdmin({
  kind,
  slug,
  title,
  className = "",
}: {
  kind: Kind;
  slug?: string;
  title?: string;
  className?: string;
}) {
  const { lang } = useLang();
  const search = slug
    ? ({ type: kind, view: "upload" as const, mode: "edit" as const, slug, ...(title ? { title } : {}) })
    : ({ type: kind, view: "manage" as const });
  return (
    <Link
      to="/upload"
      search={search}
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
