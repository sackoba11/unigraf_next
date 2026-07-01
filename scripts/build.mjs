import { execSync } from "node:child_process";

function isDemoMode() {
  return (
    process.env.DEMO_MODE === "true" ||
    process.env.DEMO_MODE === "1" ||
    !process.env.DATABASE_URL?.trim()
  );
}

if (isDemoMode()) {
  console.log("[build] Mode démo — PostgreSQL ignoré (données JSON).");
} else {
  execSync("npx prisma generate", { stdio: "inherit" });
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
}

execSync("next build", { stdio: "inherit" });
