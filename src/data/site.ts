import { machineCategories } from "@/data/content/categories";

export const siteConfig = {
  name: "Group C.I.E.B - UNIGRAF",
  legalName: "Group C.I.E.B - UNIGRAF S.A.R.L",
  tagline: "Votre imprimerie industrielle, moderne & numérique",
  description:
    "Imprimerie, impression numérique et offset, décoration, personnalisation, vente de machines d'imprimerie et consommables à Abidjan, Côte d'Ivoire.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr-CI",
} as const;

export const contact = {
  address: {
    line1: "Yopougon, axe Pharmacie Keneya – Pharmacie Phénix",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    bp: "21 BP 2627 Abidjan 21",
  },
  phones: {
    telFax: "+225 21 20 74 96",
    whatsapp: "+225 06 02 20 77",
    mobile: [
      "+225 08 46 04 01",
      "+225 40 62 62 53",
      "+225 05 64 37 08",
      "+225 03 43 45 04",
      "+225 58 22 42 94",
      "+225 64 31 21 63",
    ],
    technician: "+225 01 01 20 67",
    europe: "+39 338 85 83 763",
  },
  emails: {
    info: "info@groupciebunigraf.com",
    commercial: "commercial@groupciebunigraf.com",
    marketing: "marketing@groupciebunigraf.com",
    dg: "e.diabydrissa@gmail.com",
  },
  mapQuery: "YOPOUGON ATTIE Cote d'Ivoire",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  disabled?: boolean;
};

export const mainNavigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "À propos",
    href: "/a-propos",
    children: [
      { label: "Qui sommes-nous", href: "/a-propos" },
      { label: "Savoir-faire", href: "/savoir-faire" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Impression", href: "/services/impression" },
      { label: "Décoration", href: "/services/decoration" },
      { label: "Personnalisation", href: "/services/personnalisation" },
    ],
  },
  {
    label: "Réalisations",
    href: "/realisations",
    children: [
      { label: "Véhicules", href: "/realisations/vehicules" },
      { label: "Vitrines", href: "/realisations/vitrines" },
      { label: "Textile", href: "/realisations/textile" },
      { label: "Gadgets", href: "/realisations/gadgets" },
    ],
  },
  {
    label: "Machines",
    href: "/machines",
    children: machineCategories.sections.map((section) => ({
      label: section.title,
      href: `/machines/${section.slug}`,
    })),
  },
  { label: "Catalogue", href: "/catalogue" },
  {
    label: "Contact",
    href: "/contact",
    children: [
      { label: "Coordonnées", href: "/contact" },
      { label: "Demander un devis", href: "/devis" },
      { label: "Demande SAV", href: "/sav" },
    ],
  },
];

export const services = [
  {
    title: "Impression numérique & offset",
    description:
      "Cartes de visite, flyers, brochures, thèses, reliure et grands formats jusqu'à 2,20 m.",
    icon: "print",
    href: "/services/impression",
  },
  {
    title: "Décoration & signalétique",
    description:
      "Enseignes, vitrines, véhicules, bâches, panneaux et marquage adhésif intérieur/extérieur.",
    icon: "sign",
    href: "/services/decoration",
  },
  {
    title: "Personnalisation textile",
    description:
      "Flocage, sérigraphie et transfert sur tee-shirts, polos, casquettes et textiles professionnels.",
    icon: "shirt",
    href: "/services/personnalisation",
  },
  {
    title: "Machines & consommables",
    description:
      "Vente, installation et SAV de machines offset Heidelberg, traceurs, copieurs et consommables.",
    icon: "machine",
    href: "/machines",
  },
] as const;

export const homeHighlights = [
  "Tous travaux de reproduction et impression",
  "Impression offset traditionnelle et numérique",
  "Impression de livres de 1 à 5 000 exemplaires",
  "Calligraphie, sérigraphie et gadgets publicitaires",
  "Conception graphique et couverture d'événements",
  "Affiches grand format : A2, A1, A0 jusqu'à 2,20 × 1,10 m",
  "Photocopie et impression de plans en couleur ou N/B",
  "Installation gratuite des machines offset",
] as const;
