import type { MetadataRoute } from "next";
import {
  machineCategories,
  realisationCategories,
  serviceCategories,
} from "@/data/content/categories";
import { siteConfig } from "@/data/site";

const staticRoutes = [
  "",
  "/a-propos",
  "/savoir-faire",
  "/contact",
  "/devis",
  "/services",
  "/realisations",
  "/machines",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const serviceRoutes = serviceCategories.sections.map(
    (section) => `/services/${section.slug}`,
  );
  const realisationRoutes = realisationCategories.sections.map(
    (section) => `/realisations/${section.slug}`,
  );
  const machineRoutes = machineCategories.sections.map(
    (section) => `/machines/${section.slug}`,
  );

  const routes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...realisationRoutes,
    ...machineRoutes,
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
