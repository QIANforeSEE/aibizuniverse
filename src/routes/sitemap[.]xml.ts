import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { videos, audios, reports, featured, signals } from "@/lib/mock-data";
import { channels } from "@/lib/channels";


const BASE_URL = "https://aibizuniverse.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/ai-now", changefreq: "daily", priority: "0.9" },
          { path: "/analysis", changefreq: "weekly", priority: "0.8" },
          { path: "/trends", changefreq: "weekly", priority: "0.8" },
          { path: "/key-players", changefreq: "weekly", priority: "0.8" },
          { path: "/reports", changefreq: "weekly", priority: "0.9" },
          { path: "/playbooks", changefreq: "monthly", priority: "0.7" },
          { path: "/consulting", changefreq: "monthly", priority: "0.7" },
          { path: "/video", changefreq: "weekly", priority: "0.8" },
          { path: "/podcast", changefreq: "weekly", priority: "0.8" },
          { path: "/music", changefreq: "weekly", priority: "0.6" },
          { path: "/agent", changefreq: "monthly", priority: "0.7" },
          { path: "/agentic-ai", changefreq: "weekly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
        ];

        const videoEntries: SitemapEntry[] = videos.map((v) => ({
          path: `/video/${v.slug}`,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const podcastEntries: SitemapEntry[] = audios
          .filter((a) => a.kind === "podcast")
          .map((a) => ({ path: `/podcast/${a.slug}`, changefreq: "monthly", priority: "0.7" }));

        const musicEntries: SitemapEntry[] = audios
          .filter((a) => a.kind === "music")
          .map((a) => ({ path: `/music/${a.slug}`, changefreq: "monthly", priority: "0.5" }));

        const reportEntries: SitemapEntry[] = reports.map((r) => ({
          path: `/reports/${r.slug}`,
          changefreq: "monthly",
          priority: "0.8",
        }));

        const articleEntries: SitemapEntry[] = [
          ...featured.map((f) => ({ path: `/article/${f.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...signals.map((s) => ({ path: `/article/${s.slug}`, changefreq: "weekly" as const, priority: "0.6" })),
        ];

        const channelEntries: SitemapEntry[] = channels.map((c) => ({
          path: `/channel/${c.slug}`,
          changefreq: "weekly",
          priority: "0.8",
        }));


        const entries: SitemapEntry[] = [
          ...staticEntries,
          ...videoEntries,
          ...podcastEntries,
          ...musicEntries,
          ...reportEntries,
          ...articleEntries,
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
