"use client";

import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/commerce/pricing";

type PriceRow = {
  productId: string;
  name: string;
  defaultPrice: number | null;
  currentPrice: number | null;
  online: boolean;
};

export function PricesEditor() {
  const [rows, setRows] = useState<PriceRow[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/prices")
      .then((response) => response.json())
      .then((data: { rows: PriceRow[] }) => {
        setRows(data.rows);
        setDraft(
          Object.fromEntries(
            data.rows.map((row) => [row.productId, row.currentPrice?.toString() ?? ""]),
          ),
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const prices: Record<string, number | null> = {};
    for (const row of rows) {
      const raw = draft[row.productId]?.trim();
      prices[row.productId] = raw ? Number(raw) : null;
    }

    const response = await fetch("/api/admin/prices", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prices }),
    });

    const result = (await response.json()) as {
      ok: boolean;
      message?: string;
      rows?: PriceRow[];
    };

    setSaving(false);
    if (!result.ok) {
      setMessage(result.message ?? "Erreur lors de l'enregistrement.");
      return;
    }

    if (result.rows) setRows(result.rows);
    setMessage("Prix enregistrés — le catalogue est mis à jour.");
  }

  if (loading) {
    return <p className="text-sm text-slate-600">Chargement des prix…</p>;
  }

  return (
    <div className="space-y-4">
      <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Seuls les consommables listés ci-dessous sont vendus en ligne. Laissez vide ou 0 pour
        désactiver l&apos;achat en ligne (devis uniquement).
      </p>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Prix par défaut</th>
              <th className="px-4 py-3">Prix en ligne (FCFA)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.productId} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-brand-navy">{row.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  {row.defaultPrice ? formatMoney(row.defaultPrice) : "—"}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={draft[row.productId] ?? ""}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        [row.productId]: event.target.value,
                      }))
                    }
                    className="w-full max-w-[160px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-dark disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer les prix"}
        </button>
        {message && <p className="text-sm text-slate-600">{message}</p>}
      </div>
    </div>
  );
}
