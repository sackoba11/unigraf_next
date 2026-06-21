"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { contact, siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  const reduced = useReducedMotion();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-brand-navy text-slate-300">
      <Container className="py-12">
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem className="sm:col-span-2">
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm">
              {contact.address.line1}
              <br />
              {contact.address.bp}
              <br />
              {contact.address.city}, {contact.address.country}
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="font-semibold text-white">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { href: "/a-propos", label: "Qui sommes-nous" },
                { href: "/savoir-faire", label: "Savoir-faire" },
                { href: "/contact", label: "Contact" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/panier", label: "Panier" },
                { href: "/devis", label: "Demander un devis" },
                { href: "/sav", label: "Demande SAV" },
              ].map((link) => (
                <li key={link.href}>
                  <motion.div whileHover={reduced ? undefined : { x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href={link.href} className="transition-colors duration-200 hover:text-brand-orange">
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`tel:${contact.phones.telFax.replace(/\s/g, "")}`} className="transition-colors hover:text-brand-orange">
                  Tél-Fax : {contact.phones.telFax}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phones.whatsapp.replace(/\s/g, "")}`} className="transition-colors hover:text-brand-orange">
                  WhatsApp : {contact.phones.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.emails.info}`} className="transition-colors hover:text-brand-orange">
                  {contact.emails.info}
                </a>
              </li>
            </ul>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.2}>
          <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
            © {year} {siteConfig.legalName}. Tous droits réservés.
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
