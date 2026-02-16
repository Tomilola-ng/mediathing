import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/conversions";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mediathing.app");

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/extract-audio", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/convert-video", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/convert-audio", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/convert-image", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    images: path === "/" ? [`${baseUrl}/og-image.png`] : undefined,
  }));

  // Add dynamic conversion routes
  const conversionSlugs = getAllSlugs();
  const conversionRoutes: MetadataRoute.Sitemap = conversionSlugs.map((slug) => ({
    url: `${baseUrl}/convert/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${baseUrl}/convert/${slug}/opengraph-image`],
  }));

  return [...staticRoutes, ...conversionRoutes];
}
