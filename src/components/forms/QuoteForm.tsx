"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
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
  ResetButton,
  SubmitButton,
} from "@/components/forms/FormField";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { quoteServiceTypes } from "@/data/forms";
import type { FormFieldErrors } from "@/types/forms";

const initialState = {
  lastName: "",
  firstName: "",
  company: "",
  city: "",
  address: "",
  phone: "",
  fax: "",
  mobile: "",
  email: "",
  serviceType: "",
  product: "",
  description: "",
  deliveryAddress: "",
  website: "",
};

export function QuoteForm() {
  const searchParams = useSearchParams();
  const productFromUrl = searchParams.get("produit") ?? "";

  const [form, setForm] = useState({
    ...initialState,
    product: productFromUrl,
    description: productFromUrl
      ? `Demande de devis pour : ${productFromUrl}\n\n`
      : "",
  });
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const serviceOptions = useMemo(() => quoteServiceTypes, []);

  function updateField(name: keyof typeof initialState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
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
    setStatus("loading");
    setMessage("");
    setErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/forms/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: String(formData.get("website") ?? ""),
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: FormFieldErrors;
      };

      if (!result.ok) {
        setStatus("error");
        setMessage(result.message);
        setErrors(result.errors ?? {});
        return;
      }

      setStatus("success");
      setMessage(result.message);
      setForm({ ...initialState, product: "", description: "" });
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer le formulaire. Vérifiez votre connexion.");
    }
  }

  function handleReset() {
    setForm({ ...initialState, product: "", description: "" });
    setErrors({});
    setStatus("idle");
    setMessage("");
  }

  return (
    <>
      <PageHeader
        title="Demander un devis"
        description="Impression, décoration, personnalisation, machines et consommables — décrivez votre projet et nous vous répondrons rapidement."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
            Les champs marqués d&apos;un <span className="font-semibold text-brand-orange">*</span>{" "}
            sont obligatoires.
          </div>

          {status === "error" && message && <FormAlert type="error" message={message} />}

          <FormSuccessPopup
            open={status === "success"}
            title="Demande envoyée !"
            message={message}
            onClose={() => {
              setStatus("idle");
              setMessage("");
            }}
          />

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            noValidate
          >
            <HoneypotField />

            <FormGrid>
              <FormField label="Nom" name="lastName" required error={errors.lastName}>
                <FormInput
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  error={Boolean(errors.lastName)}
                  autoComplete="family-name"
                />
              </FormField>

              <FormField label="Prénom" name="firstName" required error={errors.firstName}>
                <FormInput
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  error={Boolean(errors.firstName)}
                  autoComplete="given-name"
                />
              </FormField>
            </FormGrid>

            <FormField label="Société" name="company">
              <FormInput
                id="company"
                name="company"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                autoComplete="organization"
              />
            </FormField>

            <FormGrid>
              <FormField label="Ville" name="city" required error={errors.city}>
                <FormInput
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  error={Boolean(errors.city)}
                  autoComplete="address-level2"
                />
              </FormField>

              <FormField label="Adresse" name="address">
                <FormInput
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  autoComplete="street-address"
                />
              </FormField>
            </FormGrid>

            <FormGrid>
              <FormField label="Téléphone" name="phone">
                <FormInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  autoComplete="tel"
                />
              </FormField>

              <FormField label="Fax" name="fax">
                <FormInput
                  id="fax"
                  name="fax"
                  type="tel"
                  value={form.fax}
                  onChange={(e) => updateField("fax", e.target.value)}
                />
              </FormField>
            </FormGrid>

            <FormGrid>
              <FormField label="Cellulaire" name="mobile" required error={errors.mobile}>
                <FormInput
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  error={Boolean(errors.mobile)}
                  autoComplete="tel"
                />
              </FormField>

              <FormField label="E-mail" name="email" required error={errors.email}>
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  error={Boolean(errors.email)}
                  autoComplete="email"
                />
              </FormField>
            </FormGrid>

            <FormGrid>
              <FormField label="Type de demande" name="serviceType">
                <FormSelect
                  id="serviceType"
                  name="serviceType"
                  value={form.serviceType}
                  onChange={(e) => updateField("serviceType", e.target.value)}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value || "default"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField
                label="Produit concerné"
                name="product"
                hint="Optionnel — utile pour une machine ou un article du catalogue"
              >
                <FormInput
                  id="product"
                  name="product"
                  value={form.product}
                  onChange={(e) => updateField("product", e.target.value)}
                />
              </FormField>
            </FormGrid>

            <FormField
              label="Description du devis"
              name="description"
              required
              error={errors.description}
            >
              <FormTextarea
                id="description"
                name="description"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                error={Boolean(errors.description)}
                rows={6}
                placeholder="Quantités, formats, délais, couleurs, support souhaité…"
              />
            </FormField>

            <FormField label="Adresse de livraison" name="deliveryAddress">
              <FormInput
                id="deliveryAddress"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={(e) => updateField("deliveryAddress", e.target.value)}
              />
            </FormField>

            <FormActions>
              <SubmitButton loading={status === "loading"} label="Envoyer la demande" />
              <ResetButton onClick={handleReset} />
            </FormActions>
          </form>
        </Container>
      </section>
    </>
  );
}
