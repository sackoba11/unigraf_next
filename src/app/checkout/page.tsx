import { CheckoutPageContent } from "@/components/cart/CheckoutPageContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Commande",
  description: "Finalisez votre commande de consommables UNIGRAF.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
