export type ProductCategory =
  | "offset"
  | "copieurs"
  | "traceurs"
  | "broderie-couture"
  | "serigraphie-massicots"
  | "consommables"
  | "personnalisation"
  | "autres";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  currency: string;
  availability: string;
  images: string[];
  vat: number;
};

export const productCategories: {
  id: ProductCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Tous" },
  { id: "offset", label: "Offset" },
  { id: "copieurs", label: "Copieurs & Risographes" },
  { id: "traceurs", label: "Traceurs" },
  { id: "broderie-couture", label: "Broderie & Couture" },
  { id: "serigraphie-massicots", label: "Sérigraphie & Massicots" },
  { id: "consommables", label: "Consommables" },
  { id: "personnalisation", label: "Personnalisation" },
];
