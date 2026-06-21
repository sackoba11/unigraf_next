import { SavForm } from "@/components/forms/SavForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Demande SAV",
  description:
    "Demandez l'intervention d'un technicien pour la réparation de vos machines d'imprimerie, copieurs et traceurs.",
  path: "/sav",
});

export default function SavPage() {
  return <SavForm />;
}
