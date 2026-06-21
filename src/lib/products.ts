import catalogData from "@/data/catalog/products.json";
import { onlinePrices } from "@/data/commerce";
import type { Product, ProductCategory } from "@/types/product";

type CatalogFile = {
  products: Product[];
};

const catalog = catalogData as CatalogFile;

export function getAllProducts(): Product[] {
  return catalog.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory | "all"): Product[] {
  if (category === "all") return catalog.products;
  return catalog.products.filter((product) => product.category === category);
}

export function searchProducts(query: string, category: ProductCategory | "all" = "all"): Product[] {
  const normalized = query.trim().toLowerCase();
  const base =
    category === "all" ? catalog.products : getProductsByCategory(category);

  if (!normalized) return base;

  return base.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized),
  );
}

export function getProductPrice(product: Product): number | null {
  const online = onlinePrices[product.id];
  if (typeof online === "number" && online > 0) return online;
  if (product.price !== null && product.price > 0) return product.price;
  return null;
}

export function formatProductPrice(product: Product): string {
  const price = getProductPrice(product);
  if (price === null) {
    return "Prix sur demande";
  }
  return `${price.toLocaleString("fr-FR")} ${product.currency}`;
}

export function getCategoryLabel(category: ProductCategory): string {
  const labels: Record<ProductCategory, string> = {
    offset: "Offset",
    copieurs: "Copieurs & Risographes",
    traceurs: "Traceurs",
    "broderie-couture": "Broderie & Couture",
    "serigraphie-massicots": "Sérigraphie & Massicots",
    consommables: "Consommables",
    personnalisation: "Personnalisation",
    autres: "Autres",
  };
  return labels[category];
}
