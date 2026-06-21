import type { CheckoutPayload, OrderCustomer } from "@/types/order";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckoutCustomer(customer: OrderCustomer): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!customer.firstName.trim()) errors.firstName = "Le prénom est obligatoire.";
  if (!customer.lastName.trim()) errors.lastName = "Le nom est obligatoire.";
  if (!customer.email.trim()) errors.email = "L'e-mail est obligatoire.";
  else if (!EMAIL_PATTERN.test(customer.email.trim())) errors.email = "E-mail invalide.";
  if (!customer.address.trim()) errors.address = "L'adresse est obligatoire.";
  if (!customer.postalCode.trim()) errors.postalCode = "Le code postal est obligatoire.";
  if (!customer.city.trim()) errors.city = "La ville est obligatoire.";
  if (!customer.region.trim()) errors.region = "La région est obligatoire.";

  return errors;
}

export function parseCheckoutPayload(body: Record<string, unknown>): CheckoutPayload {
  const customer = body.customer as Record<string, unknown> | undefined;

  return {
    items: Array.isArray(body.items)
      ? body.items.map((item) => ({
          productId: String((item as CartItemLike).productId ?? ""),
          quantity: Number((item as CartItemLike).quantity ?? 1),
        }))
      : [],
    shippingMethod: body.shippingMethod === "express" ? "express" : "poste",
    paymentMethod: body.paymentMethod === "bank_transfer" ? "bank_transfer" : "mobile_money",
    customer: {
      firstName: String(customer?.firstName ?? ""),
      lastName: String(customer?.lastName ?? ""),
      email: String(customer?.email ?? "").trim(),
      phone: String(customer?.phone ?? ""),
      address: String(customer?.address ?? ""),
      postalCode: String(customer?.postalCode ?? ""),
      city: String(customer?.city ?? ""),
      region: String(customer?.region ?? ""),
      note: String(customer?.note ?? ""),
    },
    website: String(body.website ?? ""),
  };
}

type CartItemLike = { productId?: string; quantity?: number };
