// Usage: npm run media -- <source-dir>
// Turns <id>.png (desktop, cropped to 16:10) and <id>.mobile.png (phone, 9:19.5)
// into public/media/<id>-<width>.{avif,webp}. Source screenshots stay outside this repo.
import { mkdir, readdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SIZES = {
  desktop: { widths: [800, 1600], ratio: 10 / 16 },
  mobile: { widths: [400, 800], ratio: 19.5 / 9 },
};

const root = resolve(fileURLToPath(import.meta.url), '../..');
const source = process.argv[2];
if (!source) {
  console.error('Pass the folder that holds the source screenshots.');
  process.exit(1);
}
const out = join(root, 'public/media');
await mkdir(out, { recursive: true });

for (const file of await readdir(source)) {
  const ext = extname(file);
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) continue;
  const name = file.slice(0, -ext.length);
  const mobile = name.endsWith('.mobile');
  const id = mobile ? name.slice(0, -'.mobile'.length) : name;
  const { widths, ratio } = mobile ? SIZES.mobile : SIZES.desktop;
  for (const width of widths) {
    const height = Math.round(width * ratio);
    const image = sharp(join(source, file)).resize(width, height, { fit: 'cover', position: 'top' });
    await image.clone().avif({ quality: 55 }).toFile(join(out, `${id}-${width}.avif`));
    await image.clone().webp({ quality: 78 }).toFile(join(out, `${id}-${width}.webp`));
  }
  console.log(`${id}: ${widths.join(', ')}`);
}
