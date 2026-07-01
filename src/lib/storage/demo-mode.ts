/** Présentation / Vercel sans PostgreSQL — données JSON statiques + mémoire runtime. */
export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "true" || process.env.DEMO_MODE === "1") {
    return true;
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  return !databaseUrl;
}
