"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function ContactBanner() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-orange py-14 text-white">
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-orange via-orange-500 to-brand-orange-dark"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
      )}
      <Container className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Reveal direction="left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Un projet d&apos;impression ou de décoration ?
            </h2>
            <p className="mt-2 text-white/90">
              Contactez-nous au {contact.phones.whatsapp} (WhatsApp) ou demandez un devis en ligne.
            </p>
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div className="flex shrink-0 flex-wrap justify-center gap-3 sm:justify-end">
            <Button href="/devis" variant="secondary">
              Demander un devis
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-white text-white hover:bg-white hover:!text-brand-orange"
            >
              Voir nos coordonnées
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
