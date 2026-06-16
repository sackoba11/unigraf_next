import { CategoryIndex } from "@/components/pages/ContentPageLayout";
import { machineCategories } from "@/data/content/categories";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Machines",
  description: machineCategories.description,
  path: "/machines",
});

export default function MachinesPage() {
  return <CategoryIndex category={machineCategories} basePath="/machines" />;
}
