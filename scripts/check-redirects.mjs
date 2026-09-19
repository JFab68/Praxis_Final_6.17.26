/**
 * Fails if any redirect in vercel.json points at a path that the build did not
 * produce. Run after `npm run build` (npm run check:redirects).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) {
  console.error('dist/ not found - run `npm run build` first.');
  process.exit(1);
}

const broken = [];
for (const rule of config.redirects) {
  const target = rule.destination.split('?')[0].split('#')[0];
  if (/^https?:\/\//.test(target)) continue;

  const candidates = [
    target === '/' ? path.join(dist, 'index.html') : path.join(dist, `${target.replace(/^\//, '')}.html`),
    path.join(dist, target.replace(/^\//, '')),
  ];
  if (!candidates.some((file) => fs.existsSync(file))) {
    broken.push(`${rule.source} -> ${rule.destination}`);
  }
}

// Unknown paths must not be swallowed by a rewrite, or they stop returning 404.
if (config.rewrites?.length) {
  console.warn('WARNING: vercel.json has rewrites - unknown paths will not reach 404.html.');
}

if (broken.length) {
  console.error(`${broken.length} redirect destination(s) missing from dist/:`);
  broken.forEach((entry) => console.error(`  - ${entry}`));
  process.exit(1);
}

console.log(`OK: all ${config.redirects.length} redirect destinations exist in dist/`);
