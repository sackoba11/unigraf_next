import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const CART_FILE = path.resolve("..", "2020", "cart", "x5cart.js");
const OUTPUT = path.resolve("src", "data", "catalog", "products.json");
const PUBLIC_IMAGES = path.resolve("public", "images", "products");
const LEGACY_IMAGES = path.resolve("..", "2020", "images");

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodeHtml(text) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

function categorize(name) {
  const n = name.toLowerCase();

  if (/personnalisation|tasse|tricot|casquette|cl[eé] usb|tampon trodat/i.test(n)) {
    return "personnalisation";
  }
  if (/encre|toner|cartouche|cartons rame|consommable/i.test(n)) {
    return "consommables";
  }
  if (/copieur|risograph|duplicopieur|kyocera|canon ir/i.test(n)) {
    return "copieurs";
  }
  if (/traceur|roland|mimaki/i.test(n)) {
    return "traceurs";
  }
  if (/broder|broderie|corteuse|boutonni|sifileuse|piqueuse|durkopp|coudre/i.test(n)) {
    return "broderie-couture";
  }
  if (/s[eé]rigraphie|carrousel|tampograph|massicot|polar|ideal/i.test(n)) {
    return "serigraphie-massicots";
  }
  if (/machine d.imprimerie|imprimerie|offset|heidelberg|adast|ryobi|abdik|gto|moz/i.test(n)) {
    return "offset";
  }
  return "autres";
}

function pickImages(images, name) {
  if (!images?.length) return [];

  // Certains produits legacy ont une galerie entière par erreur : on garde la 1re image pertinente.
  const normalized = images
    .filter((src) => src && !src.includes("_thumb"))
    .slice(0, 1);

  return normalized.map((src) => {
    const filename = path.basename(src);
    return `/images/products/${filename}`;
  });
}

function loadCartData() {
  const raw = fs.readFileSync(CART_FILE, "utf8");
  const objectLiteral = raw
    .replace(/^var x5CartData = /, "")
    .replace(/;\s*\n?x5engine[\s\S]*$/, "");
  return new Function(`return ${objectLiteral}`)();
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyImage(relativeSrc) {
  const filename = path.basename(relativeSrc);
  const source = path.join(LEGACY_IMAGES, filename);
  const dest = path.join(PUBLIC_IMAGES, filename);

  if (!fs.existsSync(source)) return false;
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(source, dest);
  }
  return true;
}

const cart = loadCartData();
const products = Object.values(cart.products);
const usedSlugs = new Set();

ensureDir(path.dirname(OUTPUT));
ensureDir(PUBLIC_IMAGES);

const catalog = products.map((product) => {
  let slug = slugify(product.name);
  if (usedSlugs.has(slug)) slug = `${slug}-${product.id}`;
  usedSlugs.add(slug);

  const images = pickImages(product.images, product.name);
  const copiedImages = [];
  for (const img of images) {
    const legacyPath = product.images.find((p) => img.endsWith(path.basename(p)));
    if (legacyPath && copyImage(legacyPath)) {
      copiedImages.push(img);
    }
  }

  const category = categorize(product.name);
  const description = decodeHtml(product.description);
  const priceOnRequest =
    !product.price || product.price <= 0 || description.toLowerCase().includes("aucun achat");

  return {
    id: product.id,
    slug,
    name: product.name,
    category,
    description: priceOnRequest
      ? "Prix sur demande — contactez-nous pour un devis personnalisé."
      : description,
    price: product.price > 0 ? product.price : null,
    currency: "FCFA",
    availability: product.avail === "unknown" ? "sur_demande" : product.avail,
    images: copiedImages,
    vat: product.vat ?? 0.18,
  };
});

fs.writeFileSync(
  OUTPUT,
  JSON.stringify(
    {
      meta: {
        importedAt: new Date().toISOString(),
        count: catalog.length,
        source: "2020/cart/x5cart.js",
      },
      products: catalog,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`Imported ${catalog.length} products → src/data/catalog/products.json`);
console.log(`Images copied to public/images/products/`);
