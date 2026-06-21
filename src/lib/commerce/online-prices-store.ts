import fs from "node:fs";
import path from "node:path";
import { onlinePrices as defaultOnlinePrices } from "@/data/commerce";

const PRICES_DIR = path.join(process.cwd(), "data", "admin");
const PRICES_FILE = path.join(PRICES_DIR, "prices.json");

function ensurePricesDir() {
  if (!fs.existsSync(PRICES_DIR)) {
    fs.mkdirSync(PRICES_DIR, { recursive: true });
  }
}

function readOverrides(): Record<string, number> {
  ensurePricesDir();
  if (!fs.existsSync(PRICES_FILE)) return {};

  try {
    const raw = fs.readFileSync(PRICES_FILE, "utf8");
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getMergedOnlinePrices(): Record<string, number> {
  const overrides = readOverrides();
  return { ...defaultOnlinePrices, ...overrides };
}

export async function saveOnlinePriceOverrides(
  prices: Record<string, number>,
): Promise<void> {
  ensurePricesDir();
  const sanitized: Record<string, number> = {};

  for (const [productId, value] of Object.entries(prices)) {
    if (typeof value === "number" && value > 0) {
      sanitized[productId] = Math.round(value);
    }
  }

  await fs.promises.writeFile(PRICES_FILE, JSON.stringify(sanitized, null, 2), "utf8");
}

export { defaultOnlinePrices };
