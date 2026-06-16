import { ContactContent } from "@/components/pages/ContactContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contactez Group C.I.E.B - UNIGRAF à Yopougon, Abidjan. Téléphone, WhatsApp, email et adresse.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Situés à Yopougon, nous sommes joignables par téléphone, WhatsApp ou email."
      />
      <ContactContent />
    </>
  );
}
