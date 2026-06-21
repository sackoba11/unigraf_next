import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 disabled:bg-slate-50";

type FormFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, name, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-brand-navy">
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function FormInput({ error, className = "", ...props }: FormInputProps) {
  return (
    <input
      {...props}
      className={`${fieldClass} ${error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""} ${className}`}
    />
  );
}

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function FormTextarea({ error, className = "", ...props }: FormTextareaProps) {
  return (
    <textarea
      {...props}
      className={`${fieldClass} min-h-[120px] resize-y ${error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""} ${className}`}
    />
  );
}

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export function FormSelect({ error, className = "", children, ...props }: FormSelectProps) {
  return (
    <select
      {...props}
      className={`${fieldClass} ${error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""} ${className}`}
    >
      {children}
    </select>
  );
}

export function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

export function FormAlert({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`} role="alert">
      {message}
    </div>
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3 pt-2">{children}</div>;
}

type SubmitButtonProps = {
  loading?: boolean;
  label?: string;
};

export function SubmitButton({ loading = false, label = "Envoyer" }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Envoi en cours…" : label}
    </button>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg border-2 border-brand-navy px-6 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/10"
    >
      Réinitialiser
    </button>
  );
}

export function HoneypotField() {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor="website">Site web</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
