import legacyData from "@/data/legacy/pages.json";
import { curateGalleryImages } from "@/lib/curate-gallery-images";
import type { GalleryImage } from "@/types/content";

export type LegacyPage = {
  slug: string;
  category: string;
  filename: string;
  title: string;
  paragraphs: string[];
  images: GalleryImage[];
};

const pages = legacyData.pages as LegacyPage[];

export function getLegacyPage(slug: string): LegacyPage | undefined {
  const page = pages.find((p) => p.slug === slug);
  if (!page) return undefined;

  return {
    ...page,
    images: curateGalleryImages(page.images),
  };
}

export function getLegacyPagesByCategory(category: string): LegacyPage[] {
  return pages.filter((page) => page.category === category);
}

export function mergeLegacyPages(slugs: string[]) {
  const selected = slugs
    .map(getLegacyPage)
    .filter((page): page is LegacyPage => Boolean(page));

  return {
    title: selected[0]?.title ?? "",
    paragraphs: [...new Set(selected.flatMap((page) => page.paragraphs))],
    images: curateGalleryImages(selected.flatMap((page) => page.images)),
  };
}
