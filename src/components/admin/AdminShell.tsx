"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/data/site";

const links = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/prix", label: "Prix en ligne" },
];

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-brand-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">Administration</p>
            <p className="font-bold">{siteConfig.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-white/80 hover:text-white">
              Voir le site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-white/30 px-3 py-1.5 text-sm font-semibold hover:bg-white/10"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <nav className="space-y-1">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-brand-orange text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-brand-orange"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-brand-navy">{title}</h1>
            {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
