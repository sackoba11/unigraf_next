import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin/auth";

export async function requireAdminSession(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;

  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ ok: false, message: "Non autorisé." }, { status: 401 });
  }

  return null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;
  return verifyAdminSessionToken(token);
}
