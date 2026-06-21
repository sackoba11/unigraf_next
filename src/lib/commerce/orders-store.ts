import fs from "node:fs";
import path from "node:path";
import type { Order } from "@/types/order";

const ORDERS_DIR = path.join(process.cwd(), "data", "orders");

function ensureOrdersDir() {
  if (!fs.existsSync(ORDERS_DIR)) {
    fs.mkdirSync(ORDERS_DIR, { recursive: true });
  }
}

export function generateOrderNumber(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${yy}${mm}${dd}-${suffix}`;
}

export async function saveOrder(order: Order): Promise<void> {
  ensureOrdersDir();
  const filePath = path.join(ORDERS_DIR, `${order.id}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(order, null, 2), "utf8");
}

export async function getOrder(orderId: string): Promise<Order | null> {
  ensureOrdersDir();
  const filePath = path.join(ORDERS_DIR, `${orderId}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(raw) as Order;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  extra?: Partial<Order>,
): Promise<Order | null> {
  const order = await getOrder(orderId);
  if (!order) return null;

  const updated: Order = { ...order, ...extra, status };
  await saveOrder(updated);
  return updated;
}
