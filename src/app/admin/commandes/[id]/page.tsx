import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrderAdminDetail } from "@/components/admin/OrderAdminDetail";
import { getOrder } from "@/lib/commerce/orders-store";
import { createPageMetadata } from "@/lib/metadata";

type AdminOrderPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: AdminOrderPageProps) {
  const { id } = await params;
  return createPageMetadata({ title: `Commande ${id}`, path: `/admin/commandes/${id}` });
}

export default async function AdminOrderDetailPage({ params }: AdminOrderPageProps) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <AdminShell
      title={`Commande ${order.id}`}
      description={`Créée le ${new Date(order.createdAt).toLocaleString("fr-FR")}`}
    >
      <Link
        href="/admin/commandes"
        className="mb-6 inline-flex text-sm font-semibold text-brand-orange hover:underline"
      >
        ← Retour aux commandes
      </Link>
      <OrderAdminDetail order={order} />
    </AdminShell>
  );
}
