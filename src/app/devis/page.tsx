import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Demander un devis",
  description: "Demandez un devis pour vos travaux d'impression, décoration ou personnalisation.",
  path: "/devis",
});

export default function QuotePage() {
  return (
    <>
      <PageHeader
        title="Demander un devis"
        description="Le formulaire en ligne sera disponible prochainement. En attendant, contactez-nous directement."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-2xl text-center">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10">
            <p className="text-lg text-slate-600">
              Cette fonctionnalité sera mise en place en <strong>Phase 4</strong> du
              projet. Pour toute demande urgente, utilisez nos coordonnées ou
              envoyez-nous un email.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Voir nos coordonnées</Button>
              <Button href="mailto:info@groupciebunigraf.com" variant="outline">
                Envoyer un email
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
