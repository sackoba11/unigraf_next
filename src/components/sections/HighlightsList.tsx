"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homeHighlights } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function HighlightsList() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Ce que nous faisons"
              title="Une imprimerie complète à votre service"
              description="Offset, numérique, grands formats, machines et consommables — nous accompagnons les professionnels et particuliers à Abidjan et au-delà."
            />
          </Reveal>
          <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {homeHighlights.map((item) => (
              <StaggerItem key={item}>
                <motion.li
                  className="flex list-none items-start gap-3 rounded-xl bg-white p-4 text-sm text-slate-700 shadow-sm"
                  whileHover={
                    reduced
                      ? undefined
                      : { x: 4, boxShadow: "0 8px 24px -8px rgba(12,35,64,0.12)" }
                  }
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs text-white"
                    initial={reduced ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                  >
                    ✓
                  </motion.span>
                  {item}
                </motion.li>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
