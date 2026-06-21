import { AdminShell } from "@/components/admin/AdminShell";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { listOrders } from "@/lib/commerce/orders-store";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Commandes admin",
  path: "/admin/commandes",
});

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <AdminShell title="Commandes" description="Liste des commandes enregistrées sur le site.">
      <OrdersTable orders={orders} />
    </AdminShell>
  );
}
