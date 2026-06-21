import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Connexion admin",
  path: "/admin/login",
});

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-slate-500">Chargement…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
