import type { PaymentMethodId, ShippingMethodId } from "@/types/order";

/** Prix catalogue en ligne — consommables uniquement pour l'e-commerce Phase 5. */
export const onlinePrices: Record<string, number> = {
  "353pva4g": 25_000,
  "12kor0n7": 85_000,
  "z42l4jh6": 45_000,
  "88wopae3": 120_000,
  "1398vagv": 55_000,
  "0s1e300n": 35_000,
  "3ku5hzem": 28_000,
};

export const defaultVatRate = 0.18;

export const shippingMethods: {
  id: ShippingMethodId;
  label: string;
  description: string;
  price: number;
}[] = [
  {
    id: "poste",
    label: "Poste",
    description: "Livraison en 3 à 5 jours ouvrés",
    price: 0,
  },
  {
    id: "express",
    label: "Courrier express",
    description: "Livraison en 1 à 2 jours ouvrés",
    price: 10_000,
  },
];

export const paymentMethods: {
  id: PaymentMethodId;
  label: string;
  description: string;
}[] = [
  {
    id: "mobile_money",
    label: "Mobile Money",
    description: "Orange Money, MTN, Moov, Wave (via CinetPay)",
  },
  {
    id: "bank_transfer",
    label: "Virement bancaire",
    description: "Paiement anticipé — envoyez la preuve avec le n° de commande",
  },
];

export const bankTransferInstructions = {
  referenceLabel: "Référence bancaire",
  reference: "À communiquer par notre service commercial",
  note:
    "Après virement, envoyez une copie du reçu avec votre numéro de commande à commercial@groupciebunigraf.com",
};

export const mobileMoneyChannels = ["Orange Money", "MTN Mobile Money", "Moov Money", "Wave"];
