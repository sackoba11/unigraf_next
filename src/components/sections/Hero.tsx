import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contact, siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-slate-800 text-white">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Imprimerie industrielle & numérique
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Bienvenue chez {siteConfig.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-200">
            L&apos;expérience et l&apos;exigence de l&apos;imprimeur au service de
            l&apos;impression numérique. Société de service et de conseils en
            imprimerie à Abidjan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/devis">Demander un devis</Button>
            <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-navy">
              Nous contacter
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-300">{contact.address.bp}</p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/images/Photo-Magasin_00pq66w8.jpg"
            alt="Magasin Group C.I.E.B - UNIGRAF à Yopougon"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}
