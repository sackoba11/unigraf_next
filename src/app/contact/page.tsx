import Image from "next/image";
import { contact } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contactez Group C.I.E.B - UNIGRAF à Yopougon, Abidjan. Téléphone, WhatsApp, email et adresse.",
  path: "/contact",
});

function ContactCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-brand-navy">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&t=m&z=15&output=embed`;

  return (
    <>
      <PageHeader
        title="Contact"
        description="Situés à Yopougon, nous sommes joignables par téléphone, WhatsApp ou email."
      />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <ContactCard title="Adresse">
                <p>{contact.address.line1}</p>
                <p>{contact.address.bp}</p>
                <p>
                  {contact.address.city}, {contact.address.country}
                </p>
              </ContactCard>

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

              <Button href="/devis">Demander un devis</Button>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/images/Photo-Magasin_00pq66w8.jpg"
                  alt="Photo du magasin UNIGRAF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  title="Carte Google Maps - UNIGRAF Yopougon"
                  src={mapSrc}
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
