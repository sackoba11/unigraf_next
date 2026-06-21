import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Demander un devis",
  description:
    "Demandez un devis en ligne pour vos travaux d'impression, décoration, personnalisation ou achat de machines.",
  path: "/devis",
});

export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-500">Chargement du formulaire…</div>
      }
    >
      <QuoteForm />
    </Suspense>
  );
}
