// Shared SEO helpers for building bilingual meta + Open Graph across detail pages.
import type { Localized } from "./i18n";
import { str } from "./thumbs";

export const SITE_URL = "https://aibizuniverse.lovable.app";
export const SITE_NAME = "AI商业宇宙 · AI Business Universe";

export function absUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Join CN + EN for a bilingual title/description, deduping when identical. */
export function bilingual(v: Localized | undefined | null, sep = " · "): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (!v.cn) return v.en ?? "";
  if (!v.en || v.cn === v.en) return v.cn;
  return `${v.cn}${sep}${v.en}`;
}

export type DetailSeoInput = {
  path: string; // e.g. "/video/foo"
  title: Localized;
  description: Localized;
  image?: string; // absolute or root-relative URL
  type?: "article" | "video.other" | "music.song" | "website";
};

/** Build meta + links for a bilingual leaf detail page. */
export function buildDetailHead(input: DetailSeoInput) {
  const url = absUrl(input.path);
  const image = input.image ? absUrl(input.image) : undefined;
  const titleCn = str(input.title);
  const titleEn = typeof input.title === "string" ? input.title : input.title.en ?? titleCn;
  const bilingualTitle = bilingual(input.title);
  const bilingualDesc = bilingual(input.description, " — ");
  const type = input.type ?? "article";

  const meta: Array<Record<string, string>> = [
    { title: `${bilingualTitle} · ${SITE_NAME}` },
    { name: "description", content: bilingualDesc },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: bilingualTitle },
    { property: "og:description", content: bilingualDesc },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:locale", content: "zh_CN" },
    { property: "og:locale:alternate", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: bilingualTitle },
    { name: "twitter:description", content: bilingualDesc },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ property: "og:image:alt", content: titleEn || titleCn });
    meta.push({ name: "twitter:image", content: image });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
