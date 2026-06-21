import { NextResponse } from "next/server";
import { initiateCinetPayPayment } from "@/lib/commerce/cinetpay";
import { getMergedOnlinePrices } from "@/lib/commerce/online-prices-store";
import { sendOrderEmails } from "@/lib/commerce/order-email";
import { generateOrderNumber, saveOrder } from "@/lib/commerce/orders-store";
import {
  buildOrderLines,
  calculateTotals,
} from "@/lib/commerce/pricing";
import {
  parseCheckoutPayload,
  validateCheckoutCustomer,
} from "@/lib/commerce/validate-checkout";
import { isHoneypotTriggered } from "@/lib/forms/validate";
import type { Order } from "@/types/order";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = parseCheckoutPayload(body);

    if (isHoneypotTriggered(payload.website)) {
      return NextResponse.json({ ok: true, orderId: "ignored" });
    }

    if (!payload.items.length) {
      return NextResponse.json(
        { ok: false, message: "Votre panier est vide." },
        { status: 400 },
      );
    }

    const customerErrors = validateCheckoutCustomer(payload.customer);
    if (Object.keys(customerErrors).length > 0) {
      return NextResponse.json(
        { ok: false, message: "Veuillez corriger vos informations.", errors: customerErrors },
        { status: 400 },
      );
    }

    const pricesMap = getMergedOnlinePrices();
    const lines = buildOrderLines(
      payload.items.map((item) => ({
        productId: item.productId,
        quantity: Math.max(1, Math.min(99, item.quantity)),
      })),
      pricesMap,
    );

    const totals = calculateTotals(lines, payload.shippingMethod);

    const order: Order = {
      id: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      status:
        payload.paymentMethod === "bank_transfer" ? "awaiting_transfer" : "pending_payment",
      paymentMethod: payload.paymentMethod,
      shippingMethod: payload.shippingMethod,
      customer: payload.customer,
      lines,
      currency: "FCFA",
      ...totals,
    };

    if (payload.paymentMethod === "mobile_money") {
      const payment = await initiateCinetPayPayment(order);
      if (payment.ok) {
        order.paymentUrl = payment.paymentUrl;
        order.paymentReference = payment.paymentReference;
      }
    }

    await saveOrder(order);
    await sendOrderEmails(order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      status: order.status,
      paymentUrl: order.paymentUrl ?? null,
      message: "Commande enregistrée avec succès.",
    });
  } catch (error) {
    console.error("[Orders API]", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Impossible de créer la commande pour le moment.",
      },
      { status: 500 },
    );
  }
}
