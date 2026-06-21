"use client";

import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import { formatMoney } from "@/lib/commerce/pricing";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({ productId, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    const ok = addItem(productId, 1);
    if (!ok) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-orange-dark ${className}`}
    >
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}

export function CartQuantityControl({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { setQuantity, removeItem } = useCart();

  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200">
      <button
        type="button"
        className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        onClick={() => setQuantity(productId, quantity - 1)}
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <span className="min-w-8 px-2 text-center text-sm font-semibold text-brand-navy">
        {quantity}
      </span>
      <button
        type="button"
        className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        onClick={() => setQuantity(productId, quantity + 1)}
        aria-label="Augmenter la quantité"
      >
        +
      </button>
      <button
        type="button"
        className="border-l border-slate-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
        onClick={() => removeItem(productId)}
      >
        Retirer
      </button>
    </div>
  );
}

export function CartSummaryPanel({
  subtotal,
  shippingCost = 0,
  vatAmount = 0,
  total,
  action,
}: {
  subtotal: number;
  shippingCost?: number;
  vatAmount?: number;
  total: number;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brand-navy">Récapitulatif</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <dt>Sous-total</dt>
          <dd>{formatMoney(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-slate-600">
          <dt>Livraison</dt>
          <dd>{formatMoney(shippingCost)}</dd>
        </div>
        <div className="flex justify-between text-slate-600">
          <dt>TVA (18%)</dt>
          <dd>{formatMoney(vatAmount)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-brand-navy">
          <dt>Total TTC</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
