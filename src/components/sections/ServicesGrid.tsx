"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const icons: Record<string, string> = {
  print: "🖨️",
  sign: "🏷️",
  shirt: "👕",
  machine: "⚙️",
};

export function ServicesGrid() {
  const reduced = useReducedMotion();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Nos expertises"
            title="Des services complets pour votre communication"
            description="De l'impression à la personnalisation, en passant par la vente et l'installation de machines industrielles."
            align="center"
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <motion.article
                className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                whileHover={
                  reduced
                    ? undefined
                    : { y: -6, boxShadow: "0 20px 40px -12px rgba(12,35,64,0.15)" }
                }
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="inline-block text-3xl"
                  aria-hidden
                  whileHover={reduced ? undefined : { scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {icons[service.icon]}
                </motion.span>
                <h3 className="mt-4 text-lg font-semibold text-brand-navy transition-colors group-hover:text-brand-orange">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <motion.div
                  className="mt-4 h-0.5 w-0 rounded-full bg-brand-orange"
                  whileHover={reduced ? undefined : { width: "3rem" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
