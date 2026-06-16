import { ContentPage } from "@/components/pages/ContentPageLayout";
import { serviceCategories } from "@/data/content/categories";
import { mergeLegacyPages } from "@/lib/legacy";
import { createPageMetadata } from "@/lib/metadata";

const section = serviceCategories.sections[0];
const content = mergeLegacyPages(["services", "competences"]);

export const metadata = createPageMetadata({
  title: section.title,
  description: section.description,
  path: "/services/impression",
});

export default function ImpressionPage() {
  return (
    <ContentPage
      title="Impression"
      description={section.description}
      paragraphs={content.paragraphs.slice(0, 8)}
      highlights={section.highlights}
      backHref="/services"
      backLabel="Retour aux services"
    />
  );
}
