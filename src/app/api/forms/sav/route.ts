import { NextResponse } from "next/server";
import { urgentOptions } from "@/data/forms";
import { getSavRecipient, sendFormEmail } from "@/lib/forms/send-email";
import {
  isHoneypotTriggered,
  parseSavPayload,
  validateSavForm,
} from "@/lib/forms/validate";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ ok: true, message: "Demande envoyée." });
    }

    const data = parseSavPayload(body);
    const errors = validateSavForm(data);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, message: "Veuillez corriger les champs indiqués.", errors },
        { status: 400 },
      );
    }

    const urgentLabel =
      urgentOptions.find((item) => item.value === data.urgent)?.label ?? data.urgent;

    await sendFormEmail({
      subject: `[SAV] ${data.machineBrand} ${data.machineModel} — ${data.lastName}`,
      replyTo: data.email,
      to: getSavRecipient(),
      lines: [
        { label: "Nom", value: data.lastName },
        { label: "Prénom", value: data.firstName },
        { label: "Ville", value: data.city },
        { label: "Adresse", value: data.address },
        { label: "Cellulaire", value: data.mobile },
        { label: "Tél-Fax", value: data.phone },
        { label: "Marque machine", value: data.machineBrand },
        { label: "Modèle machine", value: data.machineModel },
        { label: "E-mail", value: data.email },
        { label: "Urgence", value: urgentLabel },
        { label: "Description du problème", value: data.problemDescription },
      ],
    });

    return NextResponse.json({
      ok: true,
      message:
        "Votre demande d'intervention a été envoyée. Un technicien vous contactera rapidement.",
    });
  } catch (error) {
    console.error("[SAV form]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Une erreur est survenue. Réessayez ou appelez le technicien offset.",
      },
      { status: 500 },
    );
  }
}
