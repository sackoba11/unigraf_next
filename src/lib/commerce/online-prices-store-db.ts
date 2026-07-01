import { prisma } from "@/lib/db/prisma";

export async function getMergedOnlinePrices(
  defaultOnlinePrices: Record<string, number>,
): Promise<Record<string, number>> {
  const rows = await prisma.priceOverride.findMany();
  const overrides: Record<string, number> = {};

  for (const row of rows) {
    overrides[row.productId] = row.price;
  }

  return { ...defaultOnlinePrices, ...overrides };
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

  await prisma.$transaction([
    prisma.priceOverride.deleteMany(),
    ...Object.entries(sanitized).map(([productId, price]) =>
      prisma.priceOverride.create({ data: { productId, price } }),
    ),
  ]);
}
