import { prisma } from "@/lib/db/prisma";
import type {
  Order,
  OrderCustomer,
  OrderLine,
  OrderStatus,
  PaymentMethodId,
  ShippingMethodId,
} from "@/types/order";

type DbOrder = {
  id: string;
  createdAt: Date;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  customer: unknown;
  lines: unknown;
  subtotal: number;
  shippingCost: number;
  vatAmount: number;
  total: number;
  currency: string;
  paymentUrl: string | null;
  paymentReference: string | null;
};

function mapDbOrderToOrder(row: DbOrder): Order {
  return {
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    status: row.status as OrderStatus,
    paymentMethod: row.paymentMethod as PaymentMethodId,
    shippingMethod: row.shippingMethod as ShippingMethodId,
    customer: row.customer as OrderCustomer,
    lines: row.lines as OrderLine[],
    subtotal: row.subtotal,
    shippingCost: row.shippingCost,
    vatAmount: row.vatAmount,
    total: row.total,
    currency: row.currency,
    paymentUrl: row.paymentUrl ?? undefined,
    paymentReference: row.paymentReference ?? undefined,
  };
}

export function generateOrderNumber(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${yy}${mm}${dd}-${suffix}`;
}

export async function saveOrder(order: Order): Promise<void> {
  await prisma.order.create({
    data: {
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
      currency: order.currency,
      paymentUrl: order.paymentUrl ?? null,
      paymentReference: order.paymentReference ?? null,
    },
  });
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const row = await prisma.order.findUnique({ where: { id: orderId } });
  return row ? mapDbOrderToOrder(row) : null;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  extra?: Partial<Order>,
): Promise<Order | null> {
  const existing = await getOrder(orderId);
  if (!existing) return null;

  const updated: Order = { ...existing, ...extra, status };

  const row = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: updated.status,
      paymentMethod: updated.paymentMethod,
      shippingMethod: updated.shippingMethod,
      customer: updated.customer,
      lines: updated.lines,
      subtotal: updated.subtotal,
      shippingCost: updated.shippingCost,
      vatAmount: updated.vatAmount,
      total: updated.total,
      currency: updated.currency,
      paymentUrl: updated.paymentUrl ?? null,
      paymentReference: updated.paymentReference ?? null,
    },
  });

  return mapDbOrderToOrder(row);
}

export async function listOrders(): Promise<Order[]> {
  const rows = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapDbOrderToOrder);
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  try {
    await prisma.order.delete({ where: { id: orderId } });
    return true;
  } catch {
    return false;
  }
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
