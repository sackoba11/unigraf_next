"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  CartQuantityControl,
  CartSummaryPanel,
} from "@/components/cart/CartUI";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCart } from "@/context/CartProvider";
import { calculateTotals } from "@/lib/commerce/pricing";
import type { OrderLine } from "@/types/order";

export function CartPageContent() {
  const { items, clearCart } = useCart();

  const totals = useMemo(() => {
    if (!items.length) return null;
    const lines: OrderLine[] = items.map((line) => ({
      productId: line.productId,
      slug: line.product.slug,
      name: line.product.name,
      unitPrice: line.product.price ?? 0,
      quantity: line.quantity,
      vatRate: line.product.vat ?? 0.18,
      image: line.product.images[0],
    }));
    return calculateTotals(lines, "poste");
  }, [items]);

  return (
    <>
      <PageHeader
        title="Panier"
        description="Consommables disponibles à l'achat en ligne — machines et équipements sur devis."
      />
      <section className="py-12 sm:py-16">
        <Container>
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-brand-navy">Votre panier est vide</p>
              <p className="mt-2 text-sm text-slate-600">
                Parcourez le catalogue des consommables pour ajouter des articles.
              </p>
              <div className="mt-6">
                <Button href="/catalogue">Voir le catalogue</Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {items.map((line) => (
                  <article
                    key={line.productId}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-28">
                      {line.product.images[0] ? (
                        <Image
                          src={line.product.images[0]}
                          alt={line.product.name}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/catalogue/${line.product.slug}`}
                        className="font-semibold text-brand-navy hover:text-brand-orange"
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-brand-orange">
                        {(line.product.price ?? 0).toLocaleString("fr-FR")} FCFA / unité
                      </p>
                      <div className="mt-3">
                        <CartQuantityControl
                          productId={line.productId}
                          quantity={line.quantity}
                        />
                      </div>
                    </div>
                    <p className="text-right text-sm font-bold text-brand-navy sm:w-28">
                      {((line.product.price ?? 0) * line.quantity).toLocaleString("fr-FR")} FCFA
                    </p>
                  </article>
                ))}
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Vider le panier
                </button>
              </div>

              {totals && (
                <CartSummaryPanel
                  subtotal={totals.subtotal}
                  shippingCost={totals.shippingCost}
                  vatAmount={totals.vatAmount}
                  total={totals.total}
                  action={
                    <Button href="/checkout" className="w-full justify-center">
                      Passer la commande
                    </Button>
                  }
                />
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
