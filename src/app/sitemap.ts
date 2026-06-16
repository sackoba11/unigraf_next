import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

const routes = [
  "",
  "/a-propos",
  "/savoir-faire",
  "/contact",
  "/devis",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
