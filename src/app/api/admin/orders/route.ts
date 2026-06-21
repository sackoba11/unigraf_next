import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/guard";
import { getOrderStats, listOrders } from "@/lib/commerce/orders-store";

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const orders = await listOrders();
  return NextResponse.json({ orders, stats: getOrderStats(orders) });
}
