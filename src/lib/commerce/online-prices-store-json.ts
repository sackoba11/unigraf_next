import priceOverridesSeed from "@/data/demo/price-overrides.json";

const seedOverrides = priceOverridesSeed as Record<string, number>;

type PriceRuntime = {
  priceOverrides: Record<string, number> | null;
};

const globalForPrices = globalThis as unknown as { unigrafPriceRuntime?: PriceRuntime };

function getRuntime(): PriceRuntime {
  if (!globalForPrices.unigrafPriceRuntime) {
    globalForPrices.unigrafPriceRuntime = { priceOverrides: null };
  }
  return globalForPrices.unigrafPriceRuntime;
}

function getEffectiveOverrides(): Record<string, number> {
  const runtime = getRuntime();
  return runtime.priceOverrides ?? seedOverrides;
}

export async function getMergedOnlinePrices(
  defaultOnlinePrices: Record<string, number>,
): Promise<Record<string, number>> {
  return { ...defaultOnlinePrices, ...getEffectiveOverrides() };
}

export async function saveOnlinePriceOverrides(
  prices: Record<string, number>,
): Promise<void> {
  const sanitized: Record<string, number> = {};

  for (const [productId, value] of Object.entries(prices)) {
    if (typeof value === "number" && value > 0) {
      sanitized[productId] = Math.round(value);
    }
  }

  getRuntime().priceOverrides = sanitized;
}
