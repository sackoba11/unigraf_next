"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { contact, siteConfig } from "@/data/site";
import { easeOut, staggerContainer, staggerItem } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-slate-800 text-white">
      {/* Animated background orbs */}
      {!reduced && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={staggerItem}
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-orange"
          >
            Imprimerie industrielle & numérique
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-4xl font-bold leading-tight sm:text-5xl"
          >
            Bienvenue chez {siteConfig.name}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mt-5 text-lg leading-relaxed text-slate-200"
          >
            L&apos;expérience et l&apos;exigence de l&apos;imprimeur au service de
            l&apos;impression numérique. Société de service et de conseils en
            imprimerie à Abidjan.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/devis">Demander un devis</Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-white text-white hover:bg-white hover:!text-brand-navy"
            >
              Nous contacter
            </Button>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="mt-6 text-sm text-slate-300"
          >
            {contact.address.bp}
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 40, rotate: 1 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-3 rounded-3xl bg-brand-orange/30 blur-2xl"
            animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <ParallaxImage
            src="/images/Photo-Magasin_00pq66w8.jpg"
            alt="Magasin Group C.I.E.B - UNIGRAF à Yopougon"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            containerClassName="aspect-[4/3] rounded-2xl shadow-2xl ring-1 ring-white/20"
          />
        </motion.div>
      </Container>
    </section>
  );
}
