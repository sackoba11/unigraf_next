import { ExpertiseContent } from "@/components/pages/ExpertiseContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Savoir-faire",
  description:
    "Sérigraphie, impression numérique et marquage publicitaire : découvrez l'expertise de Group C.I.E.B - UNIGRAF depuis 2006.",
  path: "/savoir-faire",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        title="Savoir-faire"
        description="Sérigraphie, impression numérique et marquage publicitaire : une équipe dynamique à votre service depuis 2006."
      />
      <ExpertiseContent />
    </>
  );
}
