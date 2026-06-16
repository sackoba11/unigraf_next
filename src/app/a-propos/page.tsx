import { AboutContent } from "@/components/pages/AboutContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Qui sommes-nous",
  description:
    "Découvrez Group C.I.E.B - UNIGRAF, imprimerie spécialisée en communication visuelle, impression et vente de machines à Abidjan.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Qui sommes-nous"
        description="Forts de plus de 10 ans d'expérience, nous mettons notre savoir-faire au service de votre image de marque à Abidjan et au-delà."
      />
      <AboutContent />
    </>
  );
}
