export type FormFieldErrors = Record<string, string>;

export type QuoteFormData = {
  lastName: string;
  firstName: string;
  company: string;
  city: string;
  address: string;
  phone: string;
  fax: string;
  mobile: string;
  email: string;
  serviceType: string;
  product: string;
  description: string;
  deliveryAddress: string;
};

export type SavFormData = {
  lastName: string;
  firstName: string;
  city: string;
  address: string;
  mobile: string;
  phone: string;
  machineBrand: string;
  machineModel: string;
  email: string;
  problemDescription: string;
  urgent: string;
};

export type FormSubmitResult =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: FormFieldErrors };
