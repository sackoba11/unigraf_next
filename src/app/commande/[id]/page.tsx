import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  bankTransferInstructions,
  mobileMoneyChannels,
} from "@/data/commerce";
import { formatMoney } from "@/lib/commerce/pricing";
import { getOrder } from "@/lib/commerce/orders-store";
import { createPageMetadata } from "@/lib/metadata";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: OrderPageProps) {
  const { id } = await params;
  return createPageMetadata({
    title: `Commande ${id}`,
    path: `/commande/${id}`,
  });
}

export default async function OrderConfirmationPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <>
      <PageHeader
        title="Commande confirmée"
        description={`Merci — votre commande ${order.id} a été enregistrée.`}
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            Un e-mail de confirmation a été envoyé à {order.customer.email}.
          </div>

          <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Statut :{" "}
              <span className="font-semibold text-brand-navy">{order.status}</span>
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              {order.lines.map((line) => (
                <li key={line.productId} className="flex justify-between gap-4">
                  <span>
                    {line.name} × {line.quantity}
                  </span>
                  <span>{formatMoney(line.unitPrice * line.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-200 pt-4 text-sm">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{formatMoney(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>TVA</span>
                <span>{formatMoney(order.vatAmount)}</span>
              </div>
              <div className="mt-2 flex justify-between text-base font-bold text-brand-navy">
                <span>Total TTC</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>

          {order.paymentMethod === "mobile_money" && !order.paymentUrl && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-semibold text-brand-navy">Paiement Mobile Money</p>
              <p className="mt-2">
                Canaux : {mobileMoneyChannels.join(", ")}. Notre équipe vous contactera pour
                finaliser le paiement ou configurez CinetPay pour un paiement instantané.
              </p>
            </div>
          )}

          {order.paymentMethod === "bank_transfer" && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-semibold text-brand-navy">Virement bancaire</p>
              <p className="mt-2">
                {bankTransferInstructions.referenceLabel} : {bankTransferInstructions.reference}
              </p>
              <p className="mt-2">{bankTransferInstructions.note}</p>
              <p className="mt-2 font-semibold text-brand-orange">
                Numéro de commande : {order.id}
              </p>
            </div>
          )}

          {order.paymentUrl && (
            <div className="mt-6">
              <Button href={order.paymentUrl}>Payer avec Mobile Money</Button>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/catalogue">Continuer mes achats</Button>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-navy/10"
            >
              Nous contacter
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
