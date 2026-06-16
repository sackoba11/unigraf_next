"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

function ContactCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      whileHover={
        reduced
          ? undefined
          : { y: -4, boxShadow: "0 12px 32px -12px rgba(12,35,64,0.12)" }
      }
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-brand-navy">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-slate-600">{children}</div>
    </motion.div>
  );
}

export function ContactContent() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&t=m&z=15&output=embed`;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <Stagger className="space-y-6" stagger={0.1}>
            <StaggerItem>
              <ContactCard title="Adresse">
                <p>{contact.address.line1}</p>
                <p>{contact.address.bp}</p>
                <p>
                  {contact.address.city}, {contact.address.country}
                </p>
              </ContactCard>
            </StaggerItem>

            <StaggerItem>
              <ContactCard title="Téléphones">
                <p>
                  <span className="font-medium text-slate-800">Tél-Fax :</span>{" "}
                  <a href={`tel:${contact.phones.telFax.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                    {contact.phones.telFax}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-slate-800">WhatsApp :</span>{" "}
                  <a href={`tel:${contact.phones.whatsapp.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                    {contact.phones.whatsapp}
                  </a>
                </p>
                {contact.phones.mobile.map((phone) => (
                  <p key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                      {phone}
                    </a>
                  </p>
                ))}
                <p>
                  <span className="font-medium text-slate-800">Technicien offset :</span>{" "}
                  {contact.phones.technician}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Europe :</span>{" "}
                  {contact.phones.europe}
                </p>
              </ContactCard>
            </StaggerItem>

            <StaggerItem>
              <ContactCard title="Emails">
                <p>
                  <a href={`mailto:${contact.emails.info}`} className="hover:text-brand-orange">
                    {contact.emails.info}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${contact.emails.commercial}`} className="hover:text-brand-orange">
                    {contact.emails.commercial}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${contact.emails.marketing}`} className="hover:text-brand-orange">
                    {contact.emails.marketing}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-slate-800">DG :</span>{" "}
                  <a href={`mailto:${contact.emails.dg}`} className="hover:text-brand-orange">
                    {contact.emails.dg}
                  </a>
                </p>
              </ContactCard>
            </StaggerItem>

            <StaggerItem>
              <Button href="/devis">Demander un devis</Button>
            </StaggerItem>
          </Stagger>

          <div className="space-y-6">
            <Reveal direction="right" delay={0.1}>
              <ParallaxImage
                src="/images/Photo-Magasin_00pq66w8.jpg"
                alt="Photo du magasin UNIGRAF"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                containerClassName="aspect-[4/3] rounded-2xl shadow-md"
              />
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <motion.div
                className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <iframe
                  title="Carte Google Maps - UNIGRAF Yopougon"
                  src={mapSrc}
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
