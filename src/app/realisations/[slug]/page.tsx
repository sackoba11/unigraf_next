import { notFound } from "next/navigation";
import { ContentPage } from "@/components/pages/ContentPageLayout";
import { realisationCategories } from "@/data/content/categories";
import { getLegacyPage } from "@/lib/legacy";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return realisationCategories.sections.map((section) => ({
    slug: section.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const section = realisationCategories.sections.find((item) => item.slug === slug);
  const legacy = getLegacyPage(slug);

  if (!section || !legacy) return {};

  return createPageMetadata({
    title: section.title,
    description: section.description,
    path: `/realisations/${slug}`,
  });
}

export default async function RealisationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const section = realisationCategories.sections.find((item) => item.slug === slug);
  const legacy = getLegacyPage(slug);

  if (!section || !legacy) notFound();

  return (
    <ContentPage
      title={section.title}
      description={section.description}
      paragraphs={legacy.paragraphs}
      images={legacy.images}
      backHref="/realisations"
      backLabel="Retour aux réalisations"
    />
  );
}
