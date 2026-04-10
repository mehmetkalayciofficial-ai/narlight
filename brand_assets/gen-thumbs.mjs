// Generate small (200w) WebP thumbnails for mega-menu / nav references.
// Output: <original-stem>-thumb.webp next to each source.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Paths referenced by src/components/nav.mjs (mega-menu thumbnails + feature cards).
const sources = [
  // Kurumsal mega
  'brand_assets/images/PROJELER/Izmir-Saat-Kulesi/izmir-kule-slide.webp',
  'brand_assets/images/PROJELER/HAVELSAN_Teknoloji_Kampusu_ANKARA_/HAVELSAN_Teknoloji_Kampusu_ANKARA_2.webp',
  'brand_assets/images/PROJELER/Aktepe_Kultur_Merkezi/Aktepe_Kultur_Merkezi_1.webp',
  'brand_assets/images/PROJELER/Efes_Antik_Kenti/Efes_Antik_Kenti_1.webp',
  // Ürünler mega
  'brand_assets/images/Urunler/Projektorler/AGRESTIS_yeni_2.webp',
  'brand_assets/images/PROJELER/Cine-Otogari1.webp',
  'brand_assets/images/PROJELER/Karapınar-SuParkı/buyukresimm.webp',
  // Projeler mega
  'brand_assets/images/PROJELER/15-Temmuz-Demokrasi/Galeri.webp',
  'brand_assets/images/PROJELER/Izmir-Ege-Uni-Camii/1.webp',
  'brand_assets/images/PROJELER/Efes_Celsus_kutuphanesi/Efes_Celsus_kutuphanesi.webp',
];

const SIZE_THUMB = 200;     // for the 40-48px tile thumbnails
const SIZE_FEATURE = 800;   // for the larger 200-300px feature card backgrounds
const QUALITY = 80;

let made = 0, skipped = 0, missing = 0;
for (const src of sources) {
  if (!fs.existsSync(src)) { missing++; console.error('MISSING', src); continue; }
  const dir = path.dirname(src);
  const stem = path.basename(src, path.extname(src));
  for (const [variant, width] of [['thumb', SIZE_THUMB], ['feature', SIZE_FEATURE]]) {
    const out = path.join(dir, `${stem}-${variant}.webp`);
    if (fs.existsSync(out)) { skipped++; continue; }
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    const sz = Math.round(fs.statSync(out).size / 1024);
    console.log(`  ${variant.padEnd(7)} ${sz.toString().padStart(3)} KB  ${out}`);
    made++;
  }
}
console.log(`\nDone: made ${made}, skipped ${skipped}, missing ${missing}`);
