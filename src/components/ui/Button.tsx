import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const variants = {
  primary:
    "bg-brand-orange text-white hover:bg-brand-orange-dark shadow-sm",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-navy-light shadow-sm",
  outline:
    "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
