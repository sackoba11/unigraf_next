import { getAllProducts } from "@/lib/products";
import {
  defaultOnlinePrices,
  getMergedOnlinePrices,
  saveOnlinePriceOverrides,
} from "@/lib/commerce/online-prices-store";

export function getAdminPriceRows() {
  const merged = getMergedOnlinePrices();

  return getAllProducts()
    .filter((product) => product.id in defaultOnlinePrices || product.id in merged)
    .map((product) => ({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      defaultPrice: defaultOnlinePrices[product.id] ?? null,
      currentPrice: merged[product.id] ?? null,
      online: Boolean(merged[product.id] && merged[product.id] > 0),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export async function updateAdminPrices(updates: Record<string, number | null>) {
  const current = getMergedOnlinePrices();
  const next: Record<string, number> = {};

  for (const productId of Object.keys(defaultOnlinePrices)) {
    const value = updates[productId] ?? current[productId] ?? defaultOnlinePrices[productId];
    if (typeof value === "number" && value > 0) {
      next[productId] = Math.round(value);
    }
  }

  const overrides: Record<string, number> = {};
  for (const [productId, value] of Object.entries(next)) {
    if (value !== defaultOnlinePrices[productId]) {
      overrides[productId] = value;
    }
  }

  await saveOnlinePriceOverrides(overrides);
  return getMergedOnlinePrices();
}
