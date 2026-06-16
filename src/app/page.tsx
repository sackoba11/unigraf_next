import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HighlightsList } from "@/components/sections/HighlightsList";
import { ContactBanner } from "@/components/sections/ContactBanner";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Accueil",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <HighlightsList />
      <ContactBanner />
    </>
  );
}
