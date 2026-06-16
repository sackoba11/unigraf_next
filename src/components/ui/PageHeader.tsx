"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { easeOut } from "@/lib/motion";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      )}
      <Container className="relative py-12 sm:py-16">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          >
            {description}
          </motion.p>
        )}
        {children}
      </Container>
    </section>
  );
}
