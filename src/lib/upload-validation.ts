import { z } from "zod";
import { featured, reports, videos, audios } from "@/lib/mock-data";

export type Kind = "article" | "video" | "podcast" | "report";
export type Lang = "cn" | "en";

// Bilingual error messages — one source of truth for client + server.
export const MSG = {
  required: { cn: "此项为必填", en: "This field is required" },
  titleCnLen: { cn: "中文标题需在 4–120 字之间", en: "CN title must be 4–120 characters" },
  titleEnLen: { cn: "英文标题需在 4–160 字符之间", en: "EN title must be 4–160 characters" },
  excerptLen: { cn: "摘要需在 20–400 字之间", en: "Excerpt must be 20–400 characters" },
  bodyLen: { cn: "正文至少 200 字", en: "Body must be at least 200 characters" },
  urlOrFile: { cn: "请填写有效 URL 或选择文件", en: "Provide a valid URL or upload a file" },
  duplicateSlug: {
    cn: "已存在同名内容 (slug 冲突),请修改标题或使用编辑模式",
    en: "A published item with this slug already exists — change the title or use Edit mode",
  },
  fileTooLarge: (maxMB: number) => ({
    cn: `文件超出限制 (最大 ${maxMB} MB)`,
    en: `File exceeds the ${maxMB} MB limit`,
  }),
  fileType: (types: string) => ({
    cn: `文件类型必须是 ${types}`,
    en: `File must be ${types}`,
  }),
} as const;

export const FILE_LIMITS: Record<Kind, { maxMB: number; accept: string[]; label: string }> = {
  article: { maxMB: 10, accept: ["image/jpeg", "image/png", "image/webp"], label: "JPG / PNG / WEBP" },
  video: { maxMB: 500, accept: ["video/mp4", "video/webm", "video/quicktime"], label: "MP4 / WEBM / MOV" },
  podcast: { maxMB: 200, accept: ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-m4a", "audio/mp4"], label: "MP3 / WAV / M4A" },
  report: { maxMB: 50, accept: ["application/pdf"], label: "PDF" },
};

export const COVER_LIMIT = { maxMB: 10, accept: ["image/jpeg", "image/png", "image/webp"], label: "JPG / PNG / WEBP" };

// Build a set of already-taken slugs across all published mock content.
export const TAKEN_SLUGS: ReadonlySet<string> = new Set<string>([
  ...featured.map((f) => f.slug),
  ...reports.map((r) => r.slug),
  ...videos.map((v) => v.slug),
  ...audios.map((a) => a.slug),
]);

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const urlLike = z.string().trim().refine(
  (v) => /^(https?:\/\/)[^\s]+\.[^\s]+/.test(v),
  { message: "url" },
);

// Base bilingual title/excerpt schema shared across all kinds.
const baseSchema = z.object({
  kind: z.enum(["article", "video", "podcast", "report"]),
  mode: z.enum(["new", "edit"]).default("new"),
  slug: z.string().optional(),
  titleCn: z.string().trim().min(4, "titleCnLen").max(120, "titleCnLen"),
  titleEn: z.string().trim().min(4, "titleEnLen").max(160, "titleEnLen"),
  excerpt: z.string().trim().min(20, "excerptLen").max(400, "excerptLen"),
  body: z.string().optional(),
  mediaUrl: z.string().optional(),
  hasMediaFile: z.boolean().optional(),
  tags: z.string().optional(),
});

export type UploadPayload = z.infer<typeof baseSchema>;

export type FieldError = { field: string; message: { cn: string; en: string } };

/** Pure validator — same output on client and server. */
export function validateUpload(input: unknown): FieldError[] {
  const errors: FieldError[] = [];
  const parsed = baseSchema.safeParse(input);
  if (!parsed.success) {
    for (const iss of parsed.error.issues) {
      const key = iss.message as keyof typeof MSG;
      const message = (MSG as any)[key] ?? MSG.required;
      errors.push({ field: iss.path.join("."), message });
    }
  }
  const data = (parsed.success ? parsed.data : (input as any)) ?? {};

  // Kind-specific rules
  if (data.kind === "article") {
    if (!data.body || String(data.body).trim().length < 200) {
      errors.push({ field: "body", message: MSG.bodyLen });
    }
  }
  if (data.kind === "video" || data.kind === "podcast") {
    const hasUrl = typeof data.mediaUrl === "string" && /^https?:\/\//.test(data.mediaUrl.trim());
    if (!hasUrl && !data.hasMediaFile) {
      errors.push({ field: "mediaUrl", message: MSG.urlOrFile });
    }
  }
  if (data.kind === "report" && !data.hasMediaFile) {
    errors.push({ field: "mediaFile", message: MSG.required });
  }

  // Duplicate slug check — only in `new` mode. Edit mode preserves the existing slug.
  if (data.mode !== "edit") {
    const s = slugify(String(data.titleEn ?? data.titleCn ?? ""));
    if (s && TAKEN_SLUGS.has(s)) {
      errors.push({ field: "titleEn", message: MSG.duplicateSlug });
    }
  }

  return errors;
}

export function validateFile(file: File, limits: { maxMB: number; accept: string[]; label: string }): FieldError | null {
  if (!limits.accept.includes(file.type)) {
    return { field: "file", message: MSG.fileType(limits.label) };
  }
  if (file.size > limits.maxMB * 1024 * 1024) {
    return { field: "file", message: MSG.fileTooLarge(limits.maxMB) };
  }
  return null;
}
