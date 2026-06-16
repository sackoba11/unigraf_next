"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavigation, siteConfig, type NavItem } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    item.href !== "#" &&
    (pathname === item.href ||
      item.children?.some((child) => child.href === pathname));

  if (item.disabled) {
    return (
      <span className="cursor-not-allowed text-slate-400" title="Bientôt disponible">
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={`text-sm font-medium transition-colors hover:text-brand-orange ${
        isActive ? "text-brand-orange" : "text-slate-700"
      }`}
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (item.children?.length) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {item.label}
        </p>
        <div className="flex flex-col gap-2 pl-3">
          {item.children.map((child) =>
            child.disabled ? (
              <span key={child.label} className="text-sm text-slate-400">
                {child.label}
              </span>
            ) : (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="text-sm font-medium text-slate-700 hover:text-brand-orange"
              >
                {child.label}
              </Link>
            ),
          )}
        </div>
      </div>
    );
  }

  if (item.disabled) {
    return <span className="text-sm text-slate-400">{item.label}</span>;
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="text-sm font-medium text-slate-700 hover:text-brand-orange"
    >
      {item.label}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold text-brand-navy sm:text-lg">
              {siteConfig.name}
            </span>
            <span className="hidden truncate text-xs text-slate-500 sm:block">
              {siteConfig.tagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {mainNavigation.map((item) =>
              item.children?.length ? (
                <div key={item.label} className="group relative">
                  <NavLink item={item} />
                  <div className="invisible absolute left-0 top-full z-50 min-w-48 rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) =>
                      child.disabled ? (
                        <span
                          key={child.label}
                          className="block px-4 py-2 text-sm text-slate-400"
                        >
                          {child.label}
                        </span>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-orange"
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <NavLink key={item.label} item={item} />
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/devis" className="hidden sm:inline-flex">
              Demander un devis
            </Button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="space-y-4 border-t border-slate-200 py-4 lg:hidden">
            {mainNavigation.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={() => setOpen(false)} />
            ))}
            <Button href="/devis" className="w-full">
              Demander un devis
            </Button>
          </nav>
        )}
      </Container>
    </header>
  );
}
