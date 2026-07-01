import { onlinePrices as defaultOnlinePrices } from "@/data/commerce";
import { isDemoMode } from "@/lib/storage/demo-mode";
import type { Order } from "@/types/order";

export function generateOrderNumber(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${yy}${mm}${dd}-${suffix}`;
}

export async function saveOrder(order: Order): Promise<void> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/orders-store-json");
    return store.saveOrder(order);
  }

  const store = await import("@/lib/commerce/orders-store-db");
  return store.saveOrder(order);
}

export async function getOrder(orderId: string): Promise<Order | null> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/orders-store-json");
    return store.getOrder(orderId);
  }

  const store = await import("@/lib/commerce/orders-store-db");
  return store.getOrder(orderId);
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  extra?: Partial<Order>,
): Promise<Order | null> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/orders-store-json");
    return store.updateOrderStatus(orderId, status, extra);
  }

  const store = await import("@/lib/commerce/orders-store-db");
  return store.updateOrderStatus(orderId, status, extra);
}

export async function listOrders(): Promise<Order[]> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/orders-store-json");
    return store.listOrders();
  }

  const store = await import("@/lib/commerce/orders-store-db");
  return store.listOrders();
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  if (isDemoMode()) {
    const store = await import("@/lib/commerce/orders-store-json");
    return store.deleteOrder(orderId);
  }

  const store = await import("@/lib/commerce/orders-store-db");
  return store.deleteOrder(orderId);
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
