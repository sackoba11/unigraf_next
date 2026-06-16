import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
};

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
  };
}
