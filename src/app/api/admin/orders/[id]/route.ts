import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/guard";
import {
  deleteOrder,
  getOrder,
  updateOrderStatus,
} from "@/lib/commerce/orders-store";
import type { OrderStatus } from "@/types/order";

const allowedStatuses: OrderStatus[] = [
  "pending_payment",
  "paid",
  "awaiting_transfer",
  "processing",
  "shipped",
  "cancelled",
];

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return NextResponse.json({ ok: false, message: "Commande introuvable." }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const { id } = await params;
  const body = (await request.json()) as { status?: OrderStatus };
  const status = body.status;

  if (!status || !allowedStatuses.includes(status)) {
    return NextResponse.json(
      { ok: false, message: "Statut invalide." },
      { status: 400 },
    );
  }

  const order = await updateOrderStatus(id, status);
  if (!order) {
    return NextResponse.json({ ok: false, message: "Commande introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, order });
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const { id } = await params;
  const deleted = await deleteOrder(id);
  if (!deleted) {
    return NextResponse.json({ ok: false, message: "Commande introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
