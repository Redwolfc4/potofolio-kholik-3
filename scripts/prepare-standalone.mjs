import { cpSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const staticSrc = resolve(root, ".next/static");
const staticDest = resolve(root, ".next/standalone/.next/static");
const publicSrc = resolve(root, "public");
const publicDest = resolve(root, ".next/standalone/public");

if (!existsSync(resolve(root, ".next/standalone"))) {
  console.error("❌ No standalone build found. Run 'npm run build' first.");
  process.exit(1);
}

// Copy static assets into standalone directory
if (existsSync(staticSrc)) {
  cpSync(staticSrc, staticDest, { recursive: true });
  console.log("✓ Copied .next/static → standalone");
}

if (existsSync(publicSrc)) {
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log("✓ Copied public → standalone");
}

console.log("✓ Ready to start standalone server");
