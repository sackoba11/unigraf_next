import { CatalogView } from "@/components/catalog/CatalogView";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProducts } from "@/lib/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Catalogue",
  description:
    "Consultez notre catalogue de machines d'imprimerie, copieurs, traceurs, consommables et produits personnalisés. Prix sur demande.",
  path: "/catalogue",
});

export default function CataloguePage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        title="Catalogue produits"
        description="Machines, consommables et articles personnalisés — consultation en ligne, devis sur demande."
      />
      <CatalogView products={products} />
    </>
  );
}
