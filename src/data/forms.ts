export const quoteServiceTypes = [
  { value: "", label: "Sélectionnez un type de demande" },
  { value: "impression", label: "Impression & reprographie" },
  { value: "decoration", label: "Décoration & signalétique" },
  { value: "personnalisation", label: "Personnalisation textile" },
  { value: "machine", label: "Vente de machine" },
  { value: "consommable", label: "Consommables" },
  { value: "autre", label: "Autre demande" },
] as const;

export const urgentOptions = [
  { value: "", label: "—" },
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
] as const;
