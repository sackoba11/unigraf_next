import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { formatMoney } from "@/lib/commerce/pricing";
import { getOrderStats, listOrders } from "@/lib/commerce/orders-store";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Administration",
  path: "/admin",
});

export default async function AdminDashboardPage() {
  const orders = await listOrders();
  const stats = getOrderStats(orders);
  const recent = orders.slice(0, 5);

  return (
    <AdminShell
      title="Tableau de bord"
      description="Vue d'ensemble des commandes et de l'activité e-commerce."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Commandes totales", value: String(stats.total) },
          { label: "En attente paiement", value: String(stats.pendingPayment) },
          { label: "Virements en attente", value: String(stats.awaitingTransfer) },
          { label: "Chiffre d'affaires", value: formatMoney(stats.revenue) },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-brand-navy">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/commandes"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark"
        >
          Voir toutes les commandes
        </Link>
        <Link
          href="/admin/prix"
          className="rounded-lg border border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-navy/10"
        >
          Gérer les prix en ligne
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-brand-navy">Dernières commandes</h2>
        <OrdersTable orders={recent} />
      </div>
    </AdminShell>
  );
}
