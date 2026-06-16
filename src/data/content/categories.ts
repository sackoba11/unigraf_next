import type { ContentCategory } from "@/types/content";

export const serviceCategories: ContentCategory = {
  slug: "services",
  title: "Nos services",
  description:
    "Impression, décoration et personnalisation : des solutions complètes pour votre communication visuelle à Abidjan.",
  sections: [
    {
      slug: "impression",
      title: "Impression",
      description:
        "Offset, numérique, cartes de visite, brochures, reliure et grands formats.",
      paragraphs: [],
      images: [],
      highlights: [
        "Cartes de visite et papeterie",
        "Brochures, flyers et dépliants",
        "Thèses, mémoires et reliure",
        "Impression numérique et offset",
        "Plastification et façonnage",
      ],
    },
    {
      slug: "decoration",
      title: "Décoration & signalétique",
      description:
        "Enseignes, vitrines, véhicules, bâches et marquage adhésif intérieur/extérieur.",
      paragraphs: [],
      images: [],
      highlights: [
        "Enseignes et caissons lumineux",
        "Marquage de vitrines",
        "Habillage de véhicules",
        "Banderoles et bâches numériques",
        "Panneaux et signalétique",
      ],
    },
    {
      slug: "personnalisation",
      title: "Personnalisation",
      description:
        "Textile, objets publicitaires et gadgets personnalisés pour vos événements.",
      paragraphs: [],
      images: [],
      highlights: [
        "Flocage et sérigraphie textile",
        "Tee-shirts, polos et casquettes",
        "Gadgets et objets publicitaires",
        "Tampons Trodat sur mesure",
        "Cartes d'invitation",
      ],
    },
  ],
};

export const realisationCategories: ContentCategory = {
  slug: "realisations",
  title: "Nos réalisations",
  description:
    "Découvrez nos projets de décoration, personnalisation et communication visuelle.",
  sections: [
    {
      slug: "vehicules",
      title: "Véhicules",
      description: "Habillage et marquage publicitaire de voitures, motos et utilitaires.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "vitrines",
      title: "Vitrines",
      description: "Vitrophanie, adhésifs dépolis et décoration de vitrines commerciales.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "textile",
      title: "Textile",
      description: "Personnalisation de tee-shirts, polos et textiles professionnels.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "gadgets",
      title: "Gadgets",
      description: "Objets publicitaires personnalisés : tasses, stylos, briquets et plus.",
      paragraphs: [],
      images: [],
    },
  ],
};

export const machineCategories: ContentCategory = {
  slug: "machines",
  title: "Machines & équipements",
  description:
    "Vente, installation et SAV de machines d'imprimerie, traceurs, copieurs et consommables.",
  sections: [
    {
      slug: "offset",
      title: "Machines offset",
      description: "Presse offset Heidelberg et équipements d'imprimerie révisés.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "traceurs",
      title: "Traceurs & plotters",
      description: "Traceurs Roland, Mimaki et équipements grands formats.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "copieurs",
      title: "Copieurs & risographes",
      description: "Canon, Riso, Kyocera et duplicopieurs professionnels.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "consommables",
      title: "Consommables",
      description: "Encres, toners, papier, plaques offset et fournitures.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "broderie",
      title: "Broderie",
      description: "Machines de broderie logo multi-têtes.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "serigraphie",
      title: "Sérigraphie",
      description: "Carrousels et équipements de sérigraphie professionnelle.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "massicots",
      title: "Massicots",
      description: "Massicots Polar, Ideal et équipements de coupe.",
      paragraphs: [],
      images: [],
    },
    {
      slug: "couture",
      title: "Couture industrielle",
      description: "Machines à coudre industrielles et équipements textile.",
      paragraphs: [],
      images: [],
    },
  ],
};
