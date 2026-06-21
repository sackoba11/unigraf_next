const COOKIE_NAME = "unigraf_admin";

function getAdminSecret(): string {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (adminSecret) return adminSecret;
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export async function verifyAdminSessionTokenEdge(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;

  const secret = getAdminSecret();
  if (!secret) return false;

  const [expiresRaw, signature] = token.split(".");
  const expiresAt = Number(expiresRaw);
  if (!expiresAt || !signature || Date.now() > expiresAt) return false;

  const expected = await hmacHex(secret, String(expiresAt));
  return safeEqual(signature, expected);
}
