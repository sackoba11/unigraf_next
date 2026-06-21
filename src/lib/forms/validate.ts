import type { FormFieldErrors, QuoteFormData, SavFormData } from "@/types/forms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} est obligatoire.`;
  return undefined;
}

function optionalEmail(value: string): string | undefined {
  if (!value.trim()) return undefined;
  if (!EMAIL_PATTERN.test(value.trim())) return "Adresse e-mail invalide.";
  return undefined;
}

function maxLength(value: string, max: number, label: string): string | undefined {
  if (value.length > max) return `${label} ne doit pas dépasser ${max} caractères.`;
  return undefined;
}

export function validateQuoteForm(data: QuoteFormData): FormFieldErrors {
  const errors: FormFieldErrors = {};

  const checks: [keyof QuoteFormData, string | undefined][] = [
    ["lastName", required(data.lastName, "Le nom")],
    ["firstName", required(data.firstName, "Le prénom")],
    ["city", required(data.city, "La ville")],
    ["mobile", required(data.mobile, "Le cellulaire")],
    ["email", required(data.email, "L'e-mail") ?? optionalEmail(data.email)],
    ["description", required(data.description, "La description")],
    ["description", maxLength(data.description, 2000, "La description")],
  ];

  for (const [field, error] of checks) {
    if (error && !errors[field]) errors[field] = error;
  }

  return errors;
}

export function validateSavForm(data: SavFormData): FormFieldErrors {
  const errors: FormFieldErrors = {};

  const checks: [keyof SavFormData, string | undefined][] = [
    ["lastName", required(data.lastName, "Le nom")],
    ["firstName", required(data.firstName, "Le prénom")],
    ["city", required(data.city, "La ville")],
    ["mobile", required(data.mobile, "Le cellulaire")],
    ["machineBrand", required(data.machineBrand, "La marque de la machine")],
    ["machineModel", required(data.machineModel, "Le modèle de la machine")],
    ["email", required(data.email, "L'e-mail") ?? optionalEmail(data.email)],
    ["problemDescription", required(data.problemDescription, "La description du problème")],
    ["problemDescription", maxLength(data.problemDescription, 2000, "La description")],
  ];

  for (const [field, error] of checks) {
    if (error && !errors[field]) errors[field] = error;
  }

  return errors;
}

export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseQuotePayload(body: Record<string, unknown>): QuoteFormData {
  return {
    lastName: String(body.lastName ?? ""),
    firstName: String(body.firstName ?? ""),
    company: String(body.company ?? ""),
    city: String(body.city ?? ""),
    address: String(body.address ?? ""),
    phone: String(body.phone ?? ""),
    fax: String(body.fax ?? ""),
    mobile: String(body.mobile ?? ""),
    email: String(body.email ?? "").trim(),
    serviceType: String(body.serviceType ?? ""),
    product: String(body.product ?? ""),
    description: String(body.description ?? ""),
    deliveryAddress: String(body.deliveryAddress ?? ""),
  };
}

export function parseSavPayload(body: Record<string, unknown>): SavFormData {
  return {
    lastName: String(body.lastName ?? ""),
    firstName: String(body.firstName ?? ""),
    city: String(body.city ?? ""),
    address: String(body.address ?? ""),
    mobile: String(body.mobile ?? ""),
    phone: String(body.phone ?? ""),
    machineBrand: String(body.machineBrand ?? ""),
    machineModel: String(body.machineModel ?? ""),
    email: String(body.email ?? "").trim(),
    problemDescription: String(body.problemDescription ?? ""),
    urgent: String(body.urgent ?? ""),
  };
}
