import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";
import videoThumb3 from "@/assets/video-thumb-3.jpg";
import videoThumb4 from "@/assets/video-thumb-4.jpg";
import videoThumb5 from "@/assets/video-thumb-5.jpg";
import videoThumb6 from "@/assets/video-thumb-6.jpg";
import audioThumb1 from "@/assets/audio-thumb-1.jpg";
import audioThumb2 from "@/assets/audio-thumb-2.jpg";
import audioThumb3 from "@/assets/audio-thumb-3.jpg";
import audioThumb4 from "@/assets/audio-thumb-4.jpg";

export const videoThumbs = {
  v1: videoThumb1, v2: videoThumb2, v3: videoThumb3,
  v4: videoThumb4, v5: videoThumb5, v6: videoThumb6,
} as const;

export const audioThumbs = {
  a1: audioThumb1, a2: audioThumb2, a3: audioThumb3, a4: audioThumb4,
} as const;

import type { Localized } from "./i18n";
export function str(v: Localized | undefined | null, fallback = ""): string {
  if (!v) return fallback;
  return typeof v === "string" ? v : v.cn;
}
