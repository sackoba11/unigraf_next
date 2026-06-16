import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Savoir-faire",
  description:
    "Sérigraphie, impression numérique et marquage publicitaire : découvrez l'expertise de Group C.I.E.B - UNIGRAF depuis 2006.",
  path: "/savoir-faire",
});

const expertise = [
  {
    title: "Sérigraphie & marquage publicitaire",
    items: [
      "Équipe de graphistes-décorateurs pour valoriser votre image",
      "Accompagnement depuis 2006 en création, conception et réalisation de charte graphique",
      "Sérigraphie textile et sur matériaux plastiques pour grandes quantités",
    ],
  },
  {
    title: "Déco véhicule & vitrine",
    items: [
      "Adhésifs bas et haut de gamme, translucides, thermo-déformables et fluorescents",
      "Marquage publicitaire de véhicules, kits prêt à poser avec notice",
      "Lettres découpées, vitrines d'affichage et signalétique magasin",
    ],
  },
  {
    title: "Impression numérique & grands formats",
    items: [
      "Machines solvant et UV, laize 1200 mm, rouleaux 50 m",
      "Reproduction photo, bâches, stands, vitrophanie",
      "Pelliculage anti-UV pour une tenue longue durée en extérieur",
    ],
  },
  {
    title: "Enseignes lumineuses",
    items: [
      "Lettrage néon, éclairage direct/indirect, diodes",
      "Caissons lumineux conçus et fabriqués sur mesure",
      "Pose d'enseignes par des équipes expérimentées",
    ],
  },
  {
    title: "Création graphique & imprimerie",
    items: [
      "Logos, affiches, dépliants, cartes de visite et flyers",
      "Impression offset et numérique petit format (< 32×45 cm)",
      "Prépresse, flashage, photogravure et contrôle qualité",
    ],
  },
  {
    title: "Supports travaillés",
    items: [
      "PVC expansé 2 à 30 mm, panneaux composite aluminium",
      "Panneaux alvéolaires, plexi, contre-plaqué filmé",
      "Totems, banderoles et panneaux publicitaires extérieurs",
    ],
  },
];

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        title="Savoir-faire"
        description="Sérigraphie, impression numérique et marquage publicitaire : une équipe dynamique à votre service depuis 2006."
      />
      <section className="py-12 sm:py-16">
        <Container>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
            Aujourd&apos;hui, encore plus qu&apos;avant, votre entreprise doit refléter la
            qualité de votre travail. De la conception jusqu&apos;à la pose, UNIGRAF est
            l&apos;allié de votre image de marque.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((block) => (
              <article
                key={block.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-brand-navy">{block.title}</h2>
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-brand-orange">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
