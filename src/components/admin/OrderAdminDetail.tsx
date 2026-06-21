"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { orderStatusLabels, orderStatusOptions } from "@/lib/admin/labels";
import { formatMoney } from "@/lib/commerce/pricing";
import type { Order, OrderStatus } from "@/types/order";

export function OrderAdminDetail({ order }: { order: Order }) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = (await response.json()) as { ok: boolean; message?: string };
    setLoading(false);
    setMessage(result.ok ? "Statut mis à jour." : result.message ?? "Erreur.");
    router.refresh();
  }

  async function handleDelete() {
    if (!window.confirm(`Supprimer la commande ${order.id} ?`)) return;

    const response = await fetch(`/api/admin/orders/${order.id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/admin/commandes");
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Statut actuel", value: orderStatusLabels[order.status] },
          { label: "Total TTC", value: formatMoney(order.total) },
          {
            label: "Paiement",
            value: order.paymentMethod === "mobile_money" ? "Mobile Money" : "Virement",
          },
          { label: "Livraison", value: order.shippingMethod === "express" ? "Express" : "Poste" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 font-semibold text-brand-navy">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-brand-navy">Client</h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-600">
            <div>
              <dt className="font-medium text-slate-800">Nom</dt>
              <dd>
                {order.customer.firstName} {order.customer.lastName}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-800">E-mail</dt>
              <dd>{order.customer.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-800">Téléphone</dt>
              <dd>{order.customer.phone || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-800">Adresse</dt>
              <dd>
                {order.customer.address}
                <br />
                {order.customer.postalCode} {order.customer.city}
                <br />
                {order.customer.region}
              </dd>
            </div>
            {order.customer.note && (
              <div>
                <dt className="font-medium text-slate-800">Note</dt>
                <dd>{order.customer.note}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-brand-navy">Articles</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {order.lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-4 text-slate-600">
                <span>
                  {line.name} × {line.quantity}
                </span>
                <span>{formatMoney(line.unitPrice * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-200 pt-3 text-sm">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{formatMoney(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>{formatMoney(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>TVA</span>
              <span>{formatMoney(order.vatAmount)}</span>
            </div>
            <div className="mt-2 flex justify-between font-bold text-brand-navy">
              <span>Total</span>
              <span>{formatMoney(order.total)}</span>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-brand-navy">Mettre à jour le statut</h2>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Statut</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as OrderStatus)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              {orderStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark disabled:opacity-50"
          >
            {loading ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
        {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
      </section>
    </div>
  );
}
