import type { OrderStatus } from "@/types/order";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending_payment: "En attente de paiement",
  paid: "Payée",
  awaiting_transfer: "Virement en attente",
  processing: "En préparation",
  shipped: "Expédiée",
  cancelled: "Annulée",
};

export const orderStatusOptions: { value: OrderStatus; label: string }[] = (
  Object.entries(orderStatusLabels) as [OrderStatus, string][]
).map(([value, label]) => ({ value, label }));
