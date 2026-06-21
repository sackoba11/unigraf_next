export type PaymentMethodId = "mobile_money" | "bank_transfer";

export type ShippingMethodId = "poste" | "express";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "awaiting_transfer"
  | "processing"
  | "shipped"
  | "cancelled";

export type OrderLine = {
  productId: string;
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
  vatRate: number;
  image?: string;
};

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  region: string;
  note: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethodId;
  shippingMethod: ShippingMethodId;
  customer: OrderCustomer;
  lines: OrderLine[];
  subtotal: number;
  shippingCost: number;
  vatAmount: number;
  total: number;
  currency: string;
  paymentUrl?: string;
  paymentReference?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutPayload = {
  items: CartItem[];
  shippingMethod: ShippingMethodId;
  paymentMethod: PaymentMethodId;
  customer: OrderCustomer;
  website?: string;
};
