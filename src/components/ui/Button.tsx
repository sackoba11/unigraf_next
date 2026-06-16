"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { springSnappy } from "@/lib/motion";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const variants = {
  primary:
    "bg-brand-orange text-white hover:bg-brand-orange-dark shadow-sm hover:shadow-md",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-navy-light shadow-sm hover:shadow-md",
  outline:
    // Keep outline flexible: callers can override hover styles safely.
    "border-2 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
      className="inline-flex"
    >
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
