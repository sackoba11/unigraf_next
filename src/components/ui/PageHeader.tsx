import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <h1 className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
