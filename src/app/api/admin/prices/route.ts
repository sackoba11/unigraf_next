import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/guard";
import { getAdminPriceRows, updateAdminPrices } from "@/lib/admin/prices-store";

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const rows = await getAdminPriceRows();
  return NextResponse.json({ rows });
}

export async function PUT(request: Request) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const body = (await request.json()) as {
    prices?: Record<string, number | null>;
  };

  if (!body.prices || typeof body.prices !== "object") {
    return NextResponse.json({ ok: false, message: "Données invalides." }, { status: 400 });
  }

  const prices = await updateAdminPrices(body.prices);
  const rows = await getAdminPriceRows();
  return NextResponse.json({ ok: true, prices, rows });
}
