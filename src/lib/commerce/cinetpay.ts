import type { Order } from "@/types/order";
import { siteConfig } from "@/data/site";

type CinetPayInitResult =
  | { ok: true; paymentUrl: string; paymentReference: string }
  | { ok: false; message: string };

export async function initiateCinetPayPayment(order: Order): Promise<CinetPayInitResult> {
  const apiKey = process.env.CINETPAY_API_KEY;
  const siteId = process.env.CINETPAY_SITE_ID;

  if (!apiKey || !siteId) {
    return {
      ok: false,
      message:
        "Paiement Mobile Money configuré en mode attente. Finalisez via les instructions affichées.",
    };
  }

  const notifyUrl = `${siteConfig.url}/api/payments/webhook`;
  const returnUrl = `${siteConfig.url}/commande/${order.id}?paid=1`;

  const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: apiKey,
      site_id: siteId,
      transaction_id: order.id,
      amount: Math.round(order.total),
      currency: "XOF",
      alternative_currency: "",
      description: `Commande ${order.id} — ${siteConfig.name}`,
      customer_name: order.customer.firstName,
      customer_surname: order.customer.lastName,
      customer_email: order.customer.email,
      customer_phone_number: order.customer.phone,
      customer_address: order.customer.address,
      customer_city: order.customer.city,
      customer_country: "CI",
      customer_state: order.customer.region,
      customer_zip_code: order.customer.postalCode,
      notify_url: notifyUrl,
      return_url: returnUrl,
      channels: "ALL",
      metadata: order.id,
      lang: "fr",
    }),
  });

  const payload = (await response.json()) as {
    code?: string;
    message?: string;
    data?: { payment_url?: string; payment_token?: string };
  };

  if (payload.code !== "201" || !payload.data?.payment_url) {
    return {
      ok: false,
      message: payload.message ?? "Impossible d'initialiser le paiement Mobile Money.",
    };
  }

  return {
    ok: true,
    paymentUrl: payload.data.payment_url,
    paymentReference: payload.data.payment_token ?? order.id,
  };
}

export async function verifyCinetPayTransaction(transactionId: string): Promise<boolean> {
  const apiKey = process.env.CINETPAY_API_KEY;
  const siteId = process.env.CINETPAY_SITE_ID;
  if (!apiKey || !siteId) return false;

  const response = await fetch("https://api-checkout.cinetpay.com/v2/payment/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: apiKey,
      site_id: siteId,
      transaction_id: transactionId,
    }),
  });

  const payload = (await response.json()) as {
    code?: string;
    data?: { status?: string };
  };

  return payload.code === "00" && payload.data?.status === "ACCEPTED";
}
