import Image from "next/image";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/gallery/ImageGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ProductActions } from "@/components/catalog/ProductActions";
import { getMergedOnlinePrices } from "@/lib/commerce/online-prices-store";
import {
  formatProductPrice,
  getAllProducts,
  getCategoryLabel,
  getProductBySlug,
  getProductPrice,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createPageMetadata({ title: "Produit introuvable", path: "/catalogue" });
  }

  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/catalogue/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const pricesMap = getMergedOnlinePrices();
  const priceLabel = formatProductPrice(product, pricesMap);
  const purchasable = getProductPrice(product, pricesMap) !== null;
  const quoteHref = `/devis?produit=${encodeURIComponent(product.name)}`;
  const galleryImages = product.images.map((src, index) => ({
    src,
    alt: `${product.name} — vue ${index + 1}`,
  }));

  return (
    <>
      <PageHeader
        title={product.name}
        description={getCategoryLabel(product.category)}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8">
            <Button href="/catalogue" variant="outline">
              ← Retour au catalogue
            </Button>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              {galleryImages.length > 0 ? (
                galleryImages.length === 1 ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={galleryImages[0].src}
                      alt={galleryImages[0].alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <ImageGallery images={galleryImages} />
                )
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  Image à venir
                </div>
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
                  {getCategoryLabel(product.category)}
                </p>
                <p className="mt-4 text-2xl font-bold text-brand-navy">{priceLabel}</p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  {purchasable
                    ? "Disponible à l'achat en ligne ou sur devis."
                    : product.description}
                </p>

                <ProductActions
                  productId={product.id}
                  productName={product.name}
                  purchasable={purchasable}
                />

                <p className="mt-6 text-sm text-slate-500">
                  Réf. {product.id} — Disponibilité :{" "}
                  {purchasable
                    ? "En stock (en ligne)"
                    : product.availability === "sur_demande"
                      ? "Sur demande"
                      : product.availability}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <div className="rounded-2xl bg-brand-navy px-6 py-8 text-center text-white sm:px-10">
              <h2 className="text-xl font-bold">Intéressé par ce produit ?</h2>
              <p className="mt-2 text-slate-200">
                Notre équipe commerciale vous répond rapidement pour un devis personnalisé.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button href={quoteHref}>Demander un devis</Button>
                <Button
                  href={`tel:${encodeURIComponent("+22521207496")}`}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:!text-brand-navy"
                >
                  Appeler le standard
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
