import { ContentPage } from "@/components/pages/ContentPageLayout";
import { serviceCategories } from "@/data/content/categories";
import { mergeLegacyPages } from "@/lib/legacy";
import { createPageMetadata } from "@/lib/metadata";

const section = serviceCategories.sections[1];
const content = mergeLegacyPages(["vitrines", "habillage-vehicules", "vehicules"]);

export const metadata = createPageMetadata({
  title: section.title,
  description: section.description,
  path: "/services/decoration",
});

export default function DecorationPage() {
  return (
    <ContentPage
      title="Décoration & signalétique"
      description={section.description}
      paragraphs={content.paragraphs.slice(0, 8)}
      images={content.images}
      highlights={section.highlights}
      backHref="/services"
      backLabel="Retour aux services"
    />
  );
}
