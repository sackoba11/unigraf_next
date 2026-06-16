import { CategoryIndex } from "@/components/pages/ContentPageLayout";
import { serviceCategories } from "@/data/content/categories";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description: serviceCategories.description,
  path: "/services",
});

export default function ServicesPage() {
  return <CategoryIndex category={serviceCategories} basePath="/services" />;
}
