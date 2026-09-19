/**
 * Warns when a production build is missing build-time configuration.
 *
 * Vite inlines `import.meta.env.VITE_*` at build time, and the minifier removes
 * branches that become provably dead. A missing VITE_WEB3FORMS_KEY therefore
 * does not just disable form delivery - it deletes the Web3Forms request from
 * the bundle entirely, so the failure is invisible unless you grep the output.
 * This check makes that visible in the build log. It warns rather than fails so
 * a missing key can never block a deploy.
 *
 * Run: node scripts/check-env.mjs   (npm run check:env)
 */
const REQUIRED = [
  {
    name: 'VITE_WEB3FORMS_KEY',
    consequence: 'contact and newsletter form submissions will show an error instead of sending',
  },
];

const missing = REQUIRED.filter((entry) => !process.env[entry.name]?.trim());

if (!missing.length) {
  console.log(`OK: all ${REQUIRED.length} build-time variable(s) present.`);
  process.exit(0);
}

console.warn('');
console.warn('  WARNING: build-time configuration missing');
console.warn('  ' + '-'.repeat(52));
for (const entry of missing) {
  console.warn(`  ${entry.name} is not set`);
  console.warn(`    -> ${entry.consequence}`);
}
console.warn('');
console.warn('  Set these in the Vercel project (Settings -> Environment Variables,');
console.warn('  Production) or in a local .env file, then redeploy. See docs/CONFIGURATION.md.');
console.warn('');
process.exit(0);
