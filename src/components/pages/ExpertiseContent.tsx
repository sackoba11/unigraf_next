"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

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

export function ExpertiseContent() {
  const reduced = useReducedMotion();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
            Aujourd&apos;hui, encore plus qu&apos;avant, votre entreprise doit refléter la
            qualité de votre travail. De la conception jusqu&apos;à la pose, UNIGRAF est
            l&apos;allié de votre image de marque.
          </p>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {expertise.map((block) => (
            <StaggerItem key={block.title}>
              <motion.article
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                whileHover={
                  reduced
                    ? undefined
                    : { y: -6, boxShadow: "0 16px 40px -12px rgba(12,35,64,0.15)" }
                }
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-semibold text-brand-navy">{block.title}</h2>
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                      <motion.span
                        className="text-brand-orange"
                        initial={reduced ? false : { scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        •
                      </motion.span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
