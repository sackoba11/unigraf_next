import { AdminShell } from "@/components/admin/AdminShell";
import { PricesEditor } from "@/components/admin/PricesEditor";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Prix en ligne",
  path: "/admin/prix",
});

export default function AdminPricesPage() {
  return (
    <AdminShell
      title="Prix en ligne"
      description="Modifiez les prix des consommables vendus sur le catalogue."
    >
      <PricesEditor />
    </AdminShell>
  );
}
