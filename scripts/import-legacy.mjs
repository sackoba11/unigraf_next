import fs from "node:fs";
import path from "node:path";
import { curateGalleryImages } from "./curate-gallery-images.mjs";

const LEGACY_DIR = path.resolve("..", "2020");
const OUTPUT_DIR = path.resolve("src", "data", "legacy");

const PAGE_MAP = {
  "services.html": { slug: "services", category: "services" },
  "ce-que-sommes-capables.html": { slug: "competences", category: "services" },
  "deco---voitures---motos.html": { slug: "vehicules", category: "realisations" },
  "deco---vitrines.html": { slug: "vitrines", category: "realisations" },
  "deco---tee-shirt.html": { slug: "textile", category: "realisations" },
  "deco---gadgets.html": { slug: "gadgets", category: "realisations" },
  "cartes-d-invitation.html": { slug: "cartes-invitation", category: "realisations" },
  "habillez-vos-vehicules.html": { slug: "habillage-vehicules", category: "realisations" },
  "machines-d-imprimerie.html": { slug: "offset", category: "machines" },
  "traceurs--plotters-.html": { slug: "traceurs", category: "machines" },
  "copieurs-canon---riso.html": { slug: "copieurs", category: "machines" },
  "machines-broderie-logo.html": { slug: "broderie", category: "machines" },
  "machines-serigraphie.html": { slug: "serigraphie", category: "machines" },
  "machines-a-coudre.html": { slug: "couture", category: "machines" },
  "massicots.html": { slug: "massicots", category: "machines" },
  "vente-consommables-d-imprimerie-et-copieurs.html": {
    slug: "consommables",
    category: "machines",
  },
};

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<wbr\s*\/?>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTitle(html) {
  const match = html.match(/<h2 id="imPgTitle">([^<]+)<\/h2>/);
  return match ? match[1].trim() : "";
}

function extractParagraphs(html) {
  const blocks = [...html.matchAll(/<div class="text-inner">([\s\S]*?)<\/div>/g)];
  const paragraphs = [];

  for (const block of blocks) {
    const text = stripHtml(block[1]);
    if (!text || text.length < 20) continue;
    for (const part of text.split(/\n{2,}/)) {
      const cleaned = part.replace(/\s+/g, " ").trim();
      if (cleaned.length > 30) paragraphs.push(cleaned);
    }
  }

  return [...new Set(paragraphs)];
}

function extractGalleries(html) {
  const galleries = [];
  const regex = /imObjectGallery_\d+_settings\s*=\s*(\{[\s\S]*?\});/g;

  for (const match of html.matchAll(regex)) {
    try {
      const settings = Function(`"use strict"; return (${match[1]});`)();
      const images = (settings.media ?? [])
        .filter((item) => item.type === "image")
        .map((item) => ({
          src: item.url.replace(/^gallery\//, "/gallery/"),
          alt: item.description || "",
        }));
      if (images.length) galleries.push(images);
    } catch {
      // skip malformed gallery blocks
    }
  }

  return galleries.flat();
}

function parsePage(filename) {
  const filePath = path.join(LEGACY_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, "utf8");
  const meta = PAGE_MAP[filename];

  return {
    ...meta,
    filename,
    title: extractTitle(html),
    paragraphs: extractParagraphs(html).slice(0, 8),
    images: curateGalleryImages(extractGalleries(html)),
  };
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pages = Object.keys(PAGE_MAP)
  .map(parsePage)
  .filter(Boolean);

const byCategory = {
  services: pages.filter((p) => p.category === "services"),
  realisations: pages.filter((p) => p.category === "realisations"),
  machines: pages.filter((p) => p.category === "machines"),
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, "pages.json"),
  JSON.stringify({ pages, byCategory }, null, 2),
  "utf8",
);

console.log(`Imported ${pages.length} legacy pages into src/data/legacy/pages.json`);
