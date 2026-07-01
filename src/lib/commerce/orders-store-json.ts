import demoOrders from "@/data/demo/orders.json";
import type { Order } from "@/types/order";

const seedOrders = demoOrders as Order[];

type DemoRuntime = {
  orders: Map<string, Order>;
  deletedOrderIds: Set<string>;
};

const globalForDemo = globalThis as unknown as { unigrafDemoRuntime?: DemoRuntime };

function getRuntime(): DemoRuntime {
  if (!globalForDemo.unigrafDemoRuntime) {
    globalForDemo.unigrafDemoRuntime = {
      orders: new Map(),
      deletedOrderIds: new Set(),
    };
  }
  return globalForDemo.unigrafDemoRuntime;
}

function getSeedOrders(): Order[] {
  const runtime = getRuntime();
  return seedOrders.filter((order) => !runtime.deletedOrderIds.has(order.id));
}

function getAllOrders(): Order[] {
  const runtime = getRuntime();
  const merged = new Map<string, Order>();

  for (const order of getSeedOrders()) {
    merged.set(order.id, order);
  }

  for (const [id, order] of runtime.orders) {
    merged.set(id, order);
  }

  return [...merged.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function generateOrderNumber(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${yy}${mm}${dd}-${suffix}`;
}

export async function saveOrder(order: Order): Promise<void> {
  getRuntime().orders.set(order.id, order);
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const runtime = getRuntime();
  if (runtime.deletedOrderIds.has(orderId)) return null;

  const runtimeOrder = runtime.orders.get(orderId);
  if (runtimeOrder) return runtimeOrder;

  return seedOrders.find((order) => order.id === orderId) ?? null;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  extra?: Partial<Order>,
): Promise<Order | null> {
  const existing = await getOrder(orderId);
  if (!existing) return null;

  const updated: Order = { ...existing, ...extra, status };
  getRuntime().orders.set(orderId, updated);
  return updated;
}

export async function listOrders(): Promise<Order[]> {
  return getAllOrders();
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  const runtime = getRuntime();
  const exists =
    runtime.orders.has(orderId) || seedOrders.some((order) => order.id === orderId);

  if (!exists) return false;

  runtime.orders.delete(orderId);
  runtime.deletedOrderIds.add(orderId);
  return true;
}

export function getOrderStats(orders: Order[]) {
  return {
    total: orders.length,
    pendingPayment: orders.filter((order) => order.status === "pending_payment").length,
    awaitingTransfer: orders.filter((order) => order.status === "awaiting_transfer").length,
    paid: orders.filter((order) => order.status === "paid").length,
    revenue: orders
      .filter((order) => ["paid", "processing", "shipped"].includes(order.status))
      .reduce((sum, order) => sum + order.total, 0),
  };
}
