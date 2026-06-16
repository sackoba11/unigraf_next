import { services } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, string> = {
  print: "🖨️",
  sign: "🏷️",
  shirt: "👕",
  machine: "⚙️",
};

export function ServicesGrid() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Nos expertises"
          title="Des services complets pour votre communication"
          description="De l'impression à la personnalisation, en passant par la vente et l'installation de machines industrielles."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-3xl" aria-hidden>
                {icons[service.icon]}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
