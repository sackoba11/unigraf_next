import { contact } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactBanner() {
  return (
    <section className="bg-brand-orange py-14 text-white">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Un projet d&apos;impression ou de décoration ?
          </h2>
          <p className="mt-2 text-white/90">
            Contactez-nous au {contact.phones.whatsapp} (WhatsApp) ou demandez un devis en ligne.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href="/devis" variant="secondary">
            Demander un devis
          </Button>
          <Button
            href="/contact"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-brand-orange"
          >
            Voir nos coordonnées
          </Button>
        </div>
      </Container>
    </section>
  );
}
