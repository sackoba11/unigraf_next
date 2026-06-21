import Image from "next/image";
import Link from "next/link";
import { formatProductPrice, getCategoryLabel } from "@/lib/products";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const priceLabel = formatProductPrice(product);

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Image à venir
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur-sm">
          {getCategoryLabel(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 text-lg font-bold text-brand-navy group-hover:text-brand-orange">
          {product.name}
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-brand-orange">{priceLabel}</span>
          <span className="text-sm font-semibold text-brand-navy">Voir →</span>
        </div>
      </div>
    </Link>
  );
}
