import type { MetadataRoute } from "next";

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
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    images: path === "/" ? [`${baseUrl}/og-image.png`] : undefined,
  }));
}
