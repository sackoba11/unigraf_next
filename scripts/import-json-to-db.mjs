import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

async function importPriceOverrides() {
  const pricesFile = path.join(root, "data", "admin", "prices.json");
  if (!fs.existsSync(pricesFile)) {
    console.log("[import] Aucun fichier data/admin/prices.json — ignoré.");
    return 0;
  }

  const parsed = JSON.parse(fs.readFileSync(pricesFile, "utf8")) as Record<string, number>;
  let count = 0;

  for (const [productId, price] of Object.entries(parsed)) {
    if (typeof price !== "number" || price <= 0) continue;

    await prisma.priceOverride.upsert({
      where: { productId },
      create: { productId, price: Math.round(price) },
      update: { price: Math.round(price) },
    });
    count += 1;
  }

  console.log(`[import] ${count} prix admin importés.`);
  return count;
}

async function importOrders() {
  const ordersDir = path.join(root, "data", "orders");
  if (!fs.existsSync(ordersDir)) {
    console.log("[import] Aucun dossier data/orders/ — ignoré.");
    return 0;
  }

  const files = fs.readdirSync(ordersDir).filter((file) => file.endsWith(".json"));
  let count = 0;

  for (const file of files) {
    const order = JSON.parse(fs.readFileSync(path.join(ordersDir, file), "utf8"));

    await prisma.order.upsert({
      where: { id: order.id },
      create: {
        id: order.id,
        createdAt: new Date(order.createdAt),
        status: order.status,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        customer: order.customer,
        lines: order.lines,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        vatAmount: order.vatAmount,
        total: order.total,
        currency: order.currency ?? "FCFA",
        paymentUrl: order.paymentUrl ?? null,
        paymentReference: order.paymentReference ?? null,
      },
      update: {
        status: order.status,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        customer: order.customer,
        lines: order.lines,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        vatAmount: order.vatAmount,
        total: order.total,
        currency: order.currency ?? "FCFA",
        paymentUrl: order.paymentUrl ?? null,
        paymentReference: order.paymentReference ?? null,
      },
    });
    count += 1;
  }

  console.log(`[import] ${count} commandes importées.`);
  return count;
}

async function main() {
  const prices = await importPriceOverrides();
  const orders = await importOrders();
  console.log(`[import] Terminé — ${orders} commande(s), ${prices} prix.`);
}

main()
  .catch((error) => {
    console.error("[import] Erreur :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
