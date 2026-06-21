"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CartSummaryPanel } from "@/components/cart/CartUI";
import { FormSuccessPopup } from "@/components/forms/FormSuccessPopup";
import {
  FormActions,
  FormAlert,
  FormField,
  FormGrid,
  FormInput,
  FormSelect,
  FormTextarea,
  HoneypotField,
  SubmitButton,
} from "@/components/forms/FormField";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  bankTransferInstructions,
  mobileMoneyChannels,
  paymentMethods,
  shippingMethods,
} from "@/data/commerce";
import { useCart } from "@/context/CartProvider";
import { calculateTotals } from "@/lib/commerce/pricing";
import type { OrderLine, PaymentMethodId, ShippingMethodId } from "@/types/order";

function cartItemsToOrderLines(
  items: {
    productId: string;
    quantity: number;
    product: { slug: string; name: string; price: number | null; vat: number; images: string[] };
  }[],
): OrderLine[] {
  return items.map((line) => ({
    productId: line.productId,
    slug: line.product.slug,
    name: line.product.name,
    unitPrice: line.product.price ?? 0,
    quantity: line.quantity,
    vatRate: line.product.vat ?? 0.18,
    image: line.product.images[0],
  }));
}

const initialCustomer = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  region: "",
  note: "",
};

export function CheckoutPageContent() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [customer, setCustomer] = useState(initialCustomer);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>("poste");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("mobile_money");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totals = useMemo(() => {
    if (!items.length) return null;
    return calculateTotals(cartItemsToOrderLines(items), shippingMethod);
  }, [items, shippingMethod]);

  function updateField(name: keyof typeof initialCustomer, value: string) {
    setCustomer((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || !totals) return;

    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shippingMethod,
          paymentMethod,
          customer,
          website: String(formData.get("website") ?? ""),
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        orderId?: string;
        paymentUrl?: string | null;
        errors?: Record<string, string>;
      };

      if (!result.ok || !result.orderId) {
        setMessage(result.message);
        setErrors(result.errors ?? {});
        setLoading(false);
        return;
      }

      clearCart();
      setShowSuccess(true);

      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
        return;
      }

      router.push(`/commande/${result.orderId}`);
    } catch {
      setMessage("Impossible de finaliser la commande. Réessayez.");
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <>
        <PageHeader title="Commande" description="Votre panier est vide." />
        <section className="py-12">
          <Container className="text-center">
            <p className="text-slate-600">Ajoutez des articles avant de passer commande.</p>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Finaliser la commande"
        description="Renseignez vos coordonnées, choisissez la livraison et le mode de paiement."
      />
      <section className="py-12 sm:py-16">
        <Container>
          {message && !showSuccess && <FormAlert type="error" message={message} />}

          <FormSuccessPopup
            open={showSuccess}
            title="Commande enregistrée !"
            message="Redirection vers la confirmation de commande…"
            onClose={() => setShowSuccess(false)}
          />

          <form onSubmit={handleSubmit} className="mt-6 grid gap-8 lg:grid-cols-3" noValidate>
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <HoneypotField />
              <h2 className="text-lg font-bold text-brand-navy">Vos informations</h2>

              <FormGrid>
                <FormField label="Prénom" name="firstName" required error={errors.firstName}>
                  <FormInput
                    id="firstName"
                    value={customer.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    error={Boolean(errors.firstName)}
                  />
                </FormField>
                <FormField label="Nom" name="lastName" required error={errors.lastName}>
                  <FormInput
                    id="lastName"
                    value={customer.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    error={Boolean(errors.lastName)}
                  />
                </FormField>
              </FormGrid>

              <FormGrid>
                <FormField label="E-mail" name="email" required error={errors.email}>
                  <FormInput
                    id="email"
                    type="email"
                    value={customer.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    error={Boolean(errors.email)}
                  />
                </FormField>
                <FormField label="Téléphone" name="phone">
                  <FormInput
                    id="phone"
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </FormField>
              </FormGrid>

              <FormField label="Adresse" name="address" required error={errors.address}>
                <FormInput
                  id="address"
                  value={customer.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  error={Boolean(errors.address)}
                />
              </FormField>

              <FormGrid>
                <FormField label="Code postal" name="postalCode" required error={errors.postalCode}>
                  <FormInput
                    id="postalCode"
                    value={customer.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    error={Boolean(errors.postalCode)}
                  />
                </FormField>
                <FormField label="Ville" name="city" required error={errors.city}>
                  <FormInput
                    id="city"
                    value={customer.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    error={Boolean(errors.city)}
                  />
                </FormField>
              </FormGrid>

              <FormField label="État / Région" name="region" required error={errors.region}>
                <FormInput
                  id="region"
                  value={customer.region}
                  onChange={(e) => updateField("region", e.target.value)}
                  error={Boolean(errors.region)}
                />
              </FormField>

              <FormField label="Note" name="note">
                <FormTextarea
                  id="note"
                  value={customer.note}
                  onChange={(e) => updateField("note", e.target.value)}
                  rows={3}
                />
              </FormField>

              <div>
                <h2 className="text-lg font-bold text-brand-navy">Livraison</h2>
                <div className="mt-3 space-y-2">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                        shippingMethod === method.id
                          ? "border-brand-orange bg-brand-orange/5"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={() => setShippingMethod(method.id)}
                        className="mt-1"
                      />
                      <span>
                        <span className="block font-semibold text-brand-navy">{method.label}</span>
                        <span className="block text-sm text-slate-600">{method.description}</span>
                        <span className="mt-1 block text-sm font-medium text-brand-orange">
                          {method.price.toLocaleString("fr-FR")} FCFA
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-brand-navy">Paiement</h2>
                <div className="mt-3 space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                        paymentMethod === method.id
                          ? "border-brand-orange bg-brand-orange/5"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mt-1"
                      />
                      <span>
                        <span className="block font-semibold text-brand-navy">{method.label}</span>
                        <span className="block text-sm text-slate-600">{method.description}</span>
                      </span>
                    </label>
                  ))}
                </div>

                {paymentMethod === "mobile_money" && (
                  <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Canaux acceptés : {mobileMoneyChannels.join(", ")}.
                  </p>
                )}

                {paymentMethod === "bank_transfer" && (
                  <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {bankTransferInstructions.referenceLabel} : {bankTransferInstructions.reference}
                    <br />
                    {bankTransferInstructions.note}
                  </p>
                )}
              </div>

              <FormActions>
                <SubmitButton loading={loading} label="Confirmer la commande" />
              </FormActions>
            </div>

            {totals && (
              <CartSummaryPanel
                subtotal={totals.subtotal}
                shippingCost={totals.shippingCost}
                vatAmount={totals.vatAmount}
                total={totals.total}
              />
            )}
          </form>
        </Container>
      </section>
    </>
  );
}
