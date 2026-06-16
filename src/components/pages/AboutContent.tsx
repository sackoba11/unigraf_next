"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

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

export function AboutContent() {
  const reduced = useReducedMotion();

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Stagger className="space-y-10" stagger={0.12}>
          {sections.map((section) => (
            <StaggerItem key={section.title}>
              <motion.article
                className="rounded-2xl border border-transparent p-2 transition-colors duration-300 hover:border-slate-100 hover:bg-slate-50/50"
                whileHover={reduced ? undefined : { x: 4 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-brand-navy">{section.title}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
