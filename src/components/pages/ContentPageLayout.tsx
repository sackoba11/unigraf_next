import Link from "next/link";
import { ImageGallery } from "@/components/gallery/ImageGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { curateGalleryImages } from "@/lib/curate-gallery-images";
import type { ContentCategory, ContentSection } from "@/types/content";

type CategoryIndexProps = {
  category: ContentCategory;
  basePath: string;
};

export function CategoryIndex({ category, basePath }: CategoryIndexProps) {
  return (
    <>
      <PageHeader title={category.title} description={category.description} />
      <section className="py-12 sm:py-16">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.sections.map((section) => (
              <StaggerItem key={section.slug}>
                <Link
                  href={`${basePath}/${section.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-md"
                >
                  <h2 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange">
                    {section.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {section.description}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-brand-orange">
                    Voir les détails →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}

type ContentPageProps = {
  title: string;
  description?: string;
  paragraphs: string[];
  images?: ContentSection["images"];
  highlights?: string[];
  backHref: string;
  backLabel: string;
};

export function ContentPage({
  title,
  description,
  paragraphs,
  images = [],
  highlights,
  backHref,
  backLabel,
}: ContentPageProps) {
  const galleryImages = curateGalleryImages(images);

  return (
    <>
      <PageHeader title={title} description={description} />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8">
            <Button href={backHref} variant="outline">
              ← {backLabel}
            </Button>
          </div>

          {highlights && highlights.length > 0 && (
            <Reveal>
              <ul className="mb-10 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="text-brand-orange">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <div className="max-w-3xl space-y-5">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={`${index}-${paragraph.slice(0, 24)}`} delay={index * 0.04}>
                <p className="leading-relaxed text-slate-600">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-12">
              <Reveal>
                <h2 className="mb-6 text-2xl font-bold text-brand-navy">Galerie</h2>
              </Reveal>
              <ImageGallery images={galleryImages} />
            </div>
          )}

          <Reveal className="mt-12">
            <div className="rounded-2xl bg-brand-navy px-6 py-8 text-center text-white sm:px-10">
              <h3 className="text-xl font-bold">Un projet similaire ?</h3>
              <p className="mt-2 text-slate-200">
                Contactez-nous pour un devis personnalisé.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button href="/devis">Demander un devis</Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:!text-brand-navy"
                >
                  Nous contacter
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
