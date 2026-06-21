import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "unigraf_admin";
const SESSION_HOURS = 8;

function getAdminSecret(): string {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (adminSecret) return adminSecret;
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createAdminSessionToken(): string | null {
  const secret = getAdminSecret();
  if (!secret) return null;

  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const signature = createHmac("sha256", secret).update(String(expiresAt)).digest("hex");
  return `${expiresAt}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  const secret = getAdminSecret();
  if (!secret) return false;

  const [expiresRaw, signature] = token.split(".");
  const expiresAt = Number(expiresRaw);
  if (!expiresAt || !signature || Date.now() > expiresAt) return false;

  const expected = createHmac("sha256", secret).update(String(expiresAt)).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  };
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
