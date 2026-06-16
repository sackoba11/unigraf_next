/** @typedef {{ src: string; alt: string }} GalleryImage */

export const MAX_GALLERY_IMAGES = 10;

function basename(src) {
  return src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? src;
}

function normalizeBaseKey(src) {
  return basename(src)
    .toLowerCase()
    .replace(/_thumb.*$/i, "")
    .replace(/[-_]?\d+x\d+.*$/i, "")
    .replace(/[-_]?\d{1,2}$/i, "")
    .replace(/_?[a-f0-9]{6,}$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeAltKey(alt) {
  return (alt || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreImage(image) {
  const src = image.src.toLowerCase();
  const alt = (image.alt || "").toLowerCase();
  const name = basename(src).toLowerCase();
  let score = 50;

  if (/_thumb|thumb\./i.test(src)) return -1000;
  if (/\.gif$/i.test(src)) score -= 10;
  if (/couleur|color|colore|sublim|magic|personnalis/i.test(alt + name)) score += 25;
  if (/dsc\d|photo|covering|deco-|transfert|canon|heidelberg|roland|mimaki/i.test(name))
    score += 15;
  if (/mini_|nb-|noir|blanc|gray|grey|monochrome|bandw|b&w/i.test(name + alt)) score -= 35;
  if (/^deco\d+$/.test(name)) score -= 20;
  if (/\d{2,}x\d{2,}/.test(name)) score -= 15;
  if (/^[a-f0-9]{20,}/.test(name)) score -= 20;
  if (/[-_]\d+$/.test(name) && !/dsc\d+/i.test(name)) score -= 5;

  return score;
}

export function curateGalleryImages(images, limit = MAX_GALLERY_IMAGES) {
  if (!images?.length) return [];

  const ranked = images
    .filter((img) => !/_thumb/i.test(img.src))
    .map((image, index) => ({
      image,
      index,
      score: scoreImage(image),
      baseKey: normalizeBaseKey(image.src),
      altKey: normalizeAltKey(image.alt || basename(image.src)),
    }))
    .filter((item) => item.score > -500)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const picked = [];
  const usedSrc = new Set();
  const usedBase = new Set();
  const usedAlt = new Set();

  const tryPick = (item, allowDuplicateAlt = false) => {
    if (picked.length >= limit) return false;
    if (usedSrc.has(item.image.src)) return false;
    if (usedBase.has(item.baseKey)) return false;
    if (!allowDuplicateAlt && item.altKey && usedAlt.has(item.altKey)) return false;

    picked.push(item.image);
    usedSrc.add(item.image.src);
    usedBase.add(item.baseKey);
    if (item.altKey) usedAlt.add(item.altKey);
    return true;
  };

  for (const item of ranked) tryPick(item);
  if (picked.length < limit) {
    for (const item of ranked) {
      if (picked.length >= limit) break;
      tryPick(item, true);
    }
  }

  return picked;
}
