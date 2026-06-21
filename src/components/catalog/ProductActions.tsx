"use client";

import { AddToCartButton } from "@/components/cart/CartUI";
import { Button } from "@/components/ui/Button";

type ProductActionsProps = {
  productId: string;
  productName: string;
  purchasable: boolean;
};

export function ProductActions({ productId, productName, purchasable }: ProductActionsProps) {
  const quoteHref = `/devis?produit=${encodeURIComponent(productName)}`;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {purchasable ? (
        <>
          <AddToCartButton productId={productId} />
          <Button href="/panier" variant="outline">
            Voir le panier
          </Button>
        </>
      ) : null}
      <Button href={quoteHref} variant={purchasable ? "outline" : "primary"}>
        Demander un devis
      </Button>
      <Button href="/contact" variant="outline">
        Nous contacter
      </Button>
    </div>
  );
}
