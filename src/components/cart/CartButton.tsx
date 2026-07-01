"use client";

import Link from "next/link";
import { useCartCount } from "@/context/CartProvider";

export function CartButton() {
  const count = useCartCount();

  return (
    <Link
      href="/panier"
      className="relative inline-flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-700 transition hover:border-brand-orange/40 hover:text-brand-orange"
      aria-label={`Panier${count > 0 ? `, ${count} produit${count > 1 ? "s" : ""}` : ""}`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
