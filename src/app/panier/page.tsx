import { CartPageContent } from "@/components/cart/CartPageContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Panier",
  description: "Consultez votre panier et passez commande de consommables UNIGRAF.",
  path: "/panier",
});

export default function CartPage() {
  return <CartPageContent />;
}
