import { onlinePrices as defaultOnlinePrices } from "@/data/commerce";
import { isDemoMode } from "@/lib/storage/demo-mode";

export async function getMergedOnlinePrices(): Promise<Record<string, number>> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/online-prices-store-json");
    return store.getMergedOnlinePrices(defaultOnlinePrices);
  }

  const store = await import("@/lib/commerce/online-prices-store-db");
  return store.getMergedOnlinePrices(defaultOnlinePrices);
}

export async function saveOnlinePriceOverrides(
  prices: Record<string, number>,
): Promise<void> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/online-prices-store-json");
    return store.saveOnlinePriceOverrides(prices);
  }

  const store = await import("@/lib/commerce/online-prices-store-db");
  return store.saveOnlinePriceOverrides(prices);
}

export { defaultOnlinePrices };
