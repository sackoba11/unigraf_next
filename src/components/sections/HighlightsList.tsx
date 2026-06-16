import { homeHighlights } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HighlightsList() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="Ce que nous faisons"
            title="Une imprimerie complète à votre service"
            description="Offset, numérique, grands formats, machines et consommables — nous accompagnons les professionnels et particuliers à Abidjan et au-delà."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {homeHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm text-slate-700 shadow-sm"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
