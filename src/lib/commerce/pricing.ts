import {
  defaultVatRate,
  onlinePrices,
  shippingMethods,
} from "@/data/commerce";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import type { CartItem, OrderLine, ShippingMethodId } from "@/types/order";

export function getOnlinePrice(productId: string): number | null {
  const price = onlinePrices[productId];
  return typeof price === "number" && price > 0 ? price : null;
}

export function resolveProductPricing(product: Product): Product {
  const onlinePrice = getOnlinePrice(product.id);
  if (onlinePrice === null) return product;

  return {
    ...product,
    price: onlinePrice,
    availability: "en_stock",
    description: product.description.startsWith("Prix sur demande")
      ? "Disponible à l'achat en ligne."
      : product.description,
  };
}

export function getPurchasableProduct(productId: string): Product | undefined {
  const product = getAllProducts().find((item) => item.id === productId);
  if (!product) return undefined;
  const priced = resolveProductPricing(product);
  return isPurchasable(priced) ? priced : undefined;
}

export function getPurchasableProductBySlug(slug: string): Product | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;
  const priced = resolveProductPricing(product);
  return isPurchasable(priced) ? priced : undefined;
}

export function isPurchasable(product: Product): boolean {
  return getOnlinePrice(product.id) !== null;
}

export function formatMoney(amount: number, currency = "FCFA"): string {
  return `${Math.round(amount).toLocaleString("fr-FR")} ${currency}`;
}

export function getShippingCost(shippingMethod: ShippingMethodId): number {
  return shippingMethods.find((method) => method.id === shippingMethod)?.price ?? 0;
}

export function buildOrderLines(items: CartItem[]): OrderLine[] {
  return items.map((item) => {
    const product = getPurchasableProduct(item.productId);
    if (!product || product.price === null) {
      throw new Error(`Produit non disponible à l'achat: ${item.productId}`);
    }

    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      unitPrice: product.price,
      quantity: item.quantity,
      vatRate: product.vat ?? defaultVatRate,
      image: product.images[0],
    };
  });
}

export function calculateTotals(
  lines: OrderLine[],
  shippingMethod: ShippingMethodId,
): { subtotal: number; shippingCost: number; vatAmount: number; total: number } {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );
  const shippingCost = getShippingCost(shippingMethod);
  const vatAmount = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity * line.vatRate,
    0,
  );
  const total = subtotal + shippingCost + vatAmount;

  return { subtotal, shippingCost, vatAmount, total };
}
