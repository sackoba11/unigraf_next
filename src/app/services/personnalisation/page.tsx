import { ContentPage } from "@/components/pages/ContentPageLayout";
import { serviceCategories } from "@/data/content/categories";
import { mergeLegacyPages } from "@/lib/legacy";
import { createPageMetadata } from "@/lib/metadata";

const section = serviceCategories.sections[2];
const content = mergeLegacyPages(["textile", "gadgets", "cartes-invitation"]);

export const metadata = createPageMetadata({
  title: section.title,
  description: section.description,
  path: "/services/personnalisation",
});

export default function PersonnalisationPage() {
  return (
    <ContentPage
      title="Personnalisation"
      description={section.description}
      paragraphs={content.paragraphs.slice(0, 8)}
      images={content.images}
      highlights={section.highlights}
      backHref="/services"
      backLabel="Retour aux services"
    />
  );
}
