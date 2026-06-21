"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { searchProducts } from "@/lib/products";
import { productCategories } from "@/types/product";
import type { Product, ProductCategory } from "@/types/product";

type CatalogViewProps = {
  products: Product[];
};

export function CatalogView({ products }: CatalogViewProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(
    () => searchProducts(query, category),
    [query, category, products],
  );

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <label htmlFor="catalog-search" className="sr-only">
              Rechercher un produit
            </label>
            <input
              id="catalog-search"
              type="search"
              placeholder="Rechercher une machine, un consommable, un accessoire…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {productCategories.map((item) => {
                const active = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                      active
                        ? "bg-brand-navy text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-sm text-slate-500">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""} affiché
          {filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <Reveal className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <p className="text-lg font-semibold text-brand-navy">Aucun produit trouvé</p>
            <p className="mt-2 text-sm text-slate-600">
              Essayez un autre mot-clé ou sélectionnez une autre catégorie.
            </p>
          </Reveal>
        ) : (
          <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
