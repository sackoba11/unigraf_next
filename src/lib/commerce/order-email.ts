import type { Order } from "@/types/order";
import { contact, siteConfig } from "@/data/site";
import { formatMoney } from "@/lib/commerce/pricing";
import { getSavRecipient, sendFormEmail } from "@/lib/forms/send-email";

export async function sendOrderEmails(order: Order): Promise<void> {
  const linesText = order.lines
    .map(
      (line) =>
        `- ${line.name} × ${line.quantity} = ${formatMoney(line.unitPrice * line.quantity)}`,
    )
    .join("\n");

  const commonLines = [
    { label: "Commande", value: order.id },
    { label: "Statut", value: order.status },
    { label: "Client", value: `${order.customer.firstName} ${order.customer.lastName}` },
    { label: "E-mail", value: order.customer.email },
    { label: "Téléphone", value: order.customer.phone },
    { label: "Adresse", value: order.customer.address },
    { label: "Ville", value: `${order.customer.postalCode} ${order.customer.city}` },
    { label: "Région", value: order.customer.region },
    { label: "Livraison", value: order.shippingMethod },
    { label: "Paiement", value: order.paymentMethod },
    { label: "Articles", value: linesText },
    { label: "Sous-total HT", value: formatMoney(order.subtotal) },
    { label: "Livraison", value: formatMoney(order.shippingCost) },
    { label: "TVA", value: formatMoney(order.vatAmount) },
    { label: "Total TTC", value: formatMoney(order.total) },
    { label: "Note client", value: order.customer.note },
  ];

  await sendFormEmail({
    subject: `[Commande ${order.id}] ${order.customer.lastName}`,
    replyTo: order.customer.email,
    to: process.env.FORM_TO_COMMERCIAL ?? contact.emails.commercial,
    lines: commonLines,
  });

  await sendFormEmail({
    subject: `Confirmation commande ${order.id} | ${siteConfig.name}`,
    replyTo: contact.emails.commercial,
    to: order.customer.email,
    lines: [
      { label: "Merci", value: "Votre commande a bien été enregistrée." },
      ...commonLines,
      {
        label: "Suivi",
        value: `${siteConfig.url}/commande/${order.id}`,
      },
    ],
  });
}
