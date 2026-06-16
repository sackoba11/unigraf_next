import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Qui sommes-nous",
  description:
    "Découvrez Group C.I.E.B - UNIGRAF, imprimerie spécialisée en communication visuelle, impression et vente de machines à Abidjan.",
  path: "/a-propos",
});

const sections = [
  {
    title: "Notre entreprise",
    content: [
      "Imprimerie Group C.I.E.B - UNIGRAF est située en Côte d'Ivoire, à Yopougon sur l'axe Pharmacie Keneya – Pharmacie Phénix. Son activité se concentre sur la communication visuelle et est spécialisée dans le marquage adhésif.",
      "Group C.I.E.B - UNIGRAF vous garantit un accueil à la hauteur de vos attentes et un travail de qualité. Ne cherchez plus votre partenaire en communication visuelle : vous l'avez trouvé.",
    ],
  },
  {
    title: "Impression numérique & découpe",
    content: [
      "Signalétique intérieure et extérieure, véhicules, enseignes, pré-enseignes, vitrines, panneaux, totems, kakémonos, plaques magnétiques, caissons lumineux, banderoles, films dépolis…",
    ],
  },
  {
    title: "Imprimerie & personnalisation",
    content: [
      "Cartes de visite, en-têtes de lettres, étiquettes, dépliants, flyers, flocage de vêtements (tee-shirt, polo, casquette…) et sérigraphie.",
      "Personnalisation : stylos, briquets, porte-clés, clés USB, sacs shopping, tampons Trodat et bien plus.",
    ],
  },
  {
    title: "Machines & consommables",
    content: [
      "Spécialisés en vente et conseil de machines offset d'imprimerie révisées venues d'Europe. Nous installons les machines gratuitement à nos frais, avec un service après-vente dédié.",
      "Vente de consommables : papier rame, ramette, papier NCR, plaques offset, encres, vernis, films de pelliculeuse.",
    ],
  },
  {
    title: "Matériaux & finitions",
    content: [
      "PVC, PMMA, plaque magnétique, aluminium, polypropylène, vinyles adhésifs (colorés, dépolis, translucides, réflectifs), banderoles 750g/550g.",
      "Découpe adhésive, contre-collage, plastification pour panneaux de chantier, kakémonos, adhésifs vitrine et grands formats.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Qui sommes-nous"
        description="Forts de plus de 10 ans d'expérience, nous mettons notre savoir-faire au service de votre image de marque à Abidjan et au-delà."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-2xl font-bold text-brand-navy">{section.title}</h2>
              <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
