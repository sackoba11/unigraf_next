import { CategoryIndex } from "@/components/pages/ContentPageLayout";
import { realisationCategories } from "@/data/content/categories";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Réalisations",
  description: realisationCategories.description,
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <CategoryIndex category={realisationCategories} basePath="/realisations" />
  );
}
