"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export function QuoteContent() {
  return (
    <>
      <PageHeader
        title="Demander un devis"
        description="Le formulaire en ligne sera disponible prochainement. En attendant, contactez-nous directement."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <motion.div
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10"
              animate={{ borderColor: ["#cbd5e1", "#e85d04", "#cbd5e1"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 text-3xl"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📋
              </motion.div>
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
            </motion.div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
