import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getAdminCookieName,
  getSessionCookieOptions,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Administration non configurée. Définissez ADMIN_PASSWORD dans .env.local",
      },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { password?: string };
  const password = String(body.password ?? "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { ok: false, message: "Mot de passe incorrect." },
      { status: 401 },
    );
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Impossible de créer la session." },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), token, getSessionCookieOptions());

  return NextResponse.json({ ok: true, message: "Connexion réussie." });
}
