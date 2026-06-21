import { NextResponse } from "next/server";
import { quoteServiceTypes } from "@/data/forms";
import { getQuoteRecipient, sendFormEmail } from "@/lib/forms/send-email";
import {
  isHoneypotTriggered,
  parseQuotePayload,
  validateQuoteForm,
} from "@/lib/forms/validate";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ ok: true, message: "Demande envoyée." });
    }

    const data = parseQuotePayload(body);
    const errors = validateQuoteForm(data);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, message: "Veuillez corriger les champs indiqués.", errors },
        { status: 400 },
      );
    }

    const serviceLabel =
      quoteServiceTypes.find((item) => item.value === data.serviceType)?.label ??
      data.serviceType;

    await sendFormEmail({
      subject: `[Devis] ${data.lastName} ${data.firstName}`,
      replyTo: data.email,
      to: getQuoteRecipient(),
      lines: [
        { label: "Nom", value: data.lastName },
        { label: "Prénom", value: data.firstName },
        { label: "Société", value: data.company },
        { label: "Ville", value: data.city },
        { label: "Adresse", value: data.address },
        { label: "Téléphone", value: data.phone },
        { label: "Fax", value: data.fax },
        { label: "Cellulaire", value: data.mobile },
        { label: "E-mail", value: data.email },
        { label: "Type de demande", value: serviceLabel },
        { label: "Produit concerné", value: data.product },
        { label: "Description", value: data.description },
        { label: "Adresse de livraison", value: data.deliveryAddress },
      ],
    });

    return NextResponse.json({
      ok: true,
      message: "Votre demande de devis a été envoyée. Nous vous répondrons rapidement.",
    });
  } catch (error) {
    console.error("[Devis form]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Une erreur est survenue. Réessayez ou contactez-nous par téléphone.",
      },
      { status: 500 },
    );
  }
}
