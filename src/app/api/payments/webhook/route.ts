import { NextResponse } from "next/server";
import { verifyCinetPayTransaction } from "@/lib/commerce/cinetpay";
import { updateOrderStatus } from "@/lib/commerce/orders-store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const transactionId = String(body.cpm_trans_id ?? body.transaction_id ?? "");

    if (!transactionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const paid = await verifyCinetPayTransaction(transactionId);
    if (paid) {
      await updateOrderStatus(transactionId, "paid");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[CinetPay webhook]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "cinetpay-webhook" });
}
