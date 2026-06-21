"use client";

import Link from "next/link";
import { orderStatusLabels } from "@/lib/admin/labels";
import { formatMoney } from "@/lib/commerce/pricing";
import type { Order } from "@/types/order";

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600">
        Aucune commande pour le moment.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">N° commande</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Paiement</th>
            <th className="px-4 py-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-3 font-semibold text-brand-navy">
                <Link href={`/admin/commandes/${order.id}`} className="hover:text-brand-orange">
                  {order.id}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {new Date(order.createdAt).toLocaleString("fr-FR")}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {order.customer.firstName} {order.customer.lastName}
              </td>
              <td className="px-4 py-3 font-medium">{formatMoney(order.total)}</td>
              <td className="px-4 py-3 text-slate-600">
                {order.paymentMethod === "mobile_money" ? "Mobile Money" : "Virement"}
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {orderStatusLabels[order.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
