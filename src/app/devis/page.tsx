import { QuoteContent } from "@/components/pages/QuoteContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Demander un devis",
  description: "Demandez un devis pour vos travaux d'impression, décoration ou personnalisation.",
  path: "/devis",
});

export default function QuotePage() {
  return <QuoteContent />;
}
