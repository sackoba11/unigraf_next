"use client";

import { useState } from "react";
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
import { contact } from "@/data/site";
import { urgentOptions } from "@/data/forms";
import type { FormFieldErrors } from "@/types/forms";

const initialState = {
  lastName: "",
  firstName: "",
  city: "",
  address: "",
  mobile: "",
  phone: "",
  machineBrand: "",
  machineModel: "",
  email: "",
  problemDescription: "",
  urgent: "",
  website: "",
};

export function SavForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
      const response = await fetch("/api/forms/sav", {
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
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer le formulaire. Vérifiez votre connexion.");
    }
  }

  function handleReset() {
    setForm(initialState);
    setErrors({});
    setStatus("idle");
    setMessage("");
  }

  return (
    <>
      <PageHeader
        title="Demande d'intervention SAV"
        description="Réparation et maintenance de machines offset, copieurs, traceurs et équipements d'imprimerie."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
            Pour une urgence, contactez directement le technicien offset au{" "}
            <a
              href={`tel:${contact.phones.technician.replace(/\s/g, "")}`}
              className="font-semibold text-brand-orange hover:underline"
            >
              {contact.phones.technician}
            </a>
            .
          </div>

          {status === "error" && message && <FormAlert type="error" message={message} />}

          <FormSuccessPopup
            open={status === "success"}
            title="Intervention demandée !"
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

            <FormGrid>
              <FormField label="Ville" name="city" required error={errors.city}>
                <FormInput
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  error={Boolean(errors.city)}
                />
              </FormField>

              <FormField label="Adresse" name="address">
                <FormInput
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
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
                />
              </FormField>

              <FormField label="Tél-Fax" name="phone">
                <FormInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </FormField>
            </FormGrid>

            <FormGrid>
              <FormField
                label="Marque de la machine"
                name="machineBrand"
                required
                error={errors.machineBrand}
              >
                <FormInput
                  id="machineBrand"
                  name="machineBrand"
                  value={form.machineBrand}
                  onChange={(e) => updateField("machineBrand", e.target.value)}
                  error={Boolean(errors.machineBrand)}
                  placeholder="Ex. Heidelberg, Canon, Roland…"
                />
              </FormField>

              <FormField
                label="Modèle de la machine"
                name="machineModel"
                required
                error={errors.machineModel}
              >
                <FormInput
                  id="machineModel"
                  name="machineModel"
                  value={form.machineModel}
                  onChange={(e) => updateField("machineModel", e.target.value)}
                  error={Boolean(errors.machineModel)}
                  placeholder="Ex. GTO 52, IR 7200…"
                />
              </FormField>
            </FormGrid>

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

            <FormField
              label="Description du problème"
              name="problemDescription"
              required
              error={errors.problemDescription}
            >
              <FormTextarea
                id="problemDescription"
                name="problemDescription"
                value={form.problemDescription}
                onChange={(e) => updateField("problemDescription", e.target.value)}
                error={Boolean(errors.problemDescription)}
                rows={6}
                placeholder="Symptômes, codes d'erreur, contexte de la panne…"
              />
            </FormField>

            <FormField label="Urgence" name="urgent">
              <FormSelect
                id="urgent"
                name="urgent"
                value={form.urgent}
                onChange={(e) => updateField("urgent", e.target.value)}
              >
                {urgentOptions.map((option) => (
                  <option key={option.value || "default"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
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
