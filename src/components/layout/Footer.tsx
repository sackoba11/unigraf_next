import Link from "next/link";
import { contact, siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-brand-navy text-slate-300">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm">
              {contact.address.line1}
              <br />
              {contact.address.bp}
              <br />
              {contact.address.city}, {contact.address.country}
            </p>
          </div>

          <div>
            <p className="font-semibold text-white">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/a-propos" className="hover:text-brand-orange">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link href="/savoir-faire" className="hover:text-brand-orange">
                  Savoir-faire
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-brand-orange">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`tel:${contact.phones.telFax.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                  Tél-Fax : {contact.phones.telFax}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phones.whatsapp.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                  WhatsApp : {contact.phones.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.emails.info}`} className="hover:text-brand-orange">
                  {contact.emails.info}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © {year} {siteConfig.legalName}. Tous droits réservés.
        </div>
      </Container>
    </footer>
  );
}
