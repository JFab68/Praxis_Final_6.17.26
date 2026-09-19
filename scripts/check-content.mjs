/**
 * Guards the one `dangerouslySetInnerHTML` sink in the site.
 *
 * `BlogArticlePage` renders `article.bodyHtml` as raw HTML. That content is
 * currently authored in `src/data/articles.ts` by the team, so it is trusted -
 * but the moment article bodies come from a CMS, a submission form, or any
 * other external source, this becomes a stored-XSS sink with no second line of
 * defence. This check makes an injected payload fail the build instead of
 * shipping silently.
 *
 * Run: node scripts/check-content.mjs   (npm run check:content)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const articlesFile = path.join(root, 'src', 'data', 'articles.ts');

if (!fs.existsSync(articlesFile)) {
  console.error(`Could not find ${articlesFile}`);
  process.exit(1);
}

const source = fs.readFileSync(articlesFile, 'utf8');

const FORBIDDEN = [
  { name: 'inline <script>', pattern: /<script[\s>]/gi },
  { name: 'inline event handler (on*=)', pattern: /\son[a-z]+\s*=\s*["']/gi },
  { name: 'javascript: URL', pattern: /javascript:/gi },
  { name: 'data: URL in src/href', pattern: /(src|href)\s*=\s*["']data:/gi },
  { name: 'iframe', pattern: /<iframe[\s>]/gi },
  { name: 'object/embed', pattern: /<(object|embed)[\s>]/gi },
  { name: 'srcdoc', pattern: /srcdoc\s*=/gi },
  { name: 'form element', pattern: /<form[\s>]/gi },
  { name: 'meta refresh', pattern: /http-equiv\s*=\s*["']refresh/gi },
  { name: 'CSS expression()', pattern: /expression\s*\(/gi },
];

const findings = [];
for (const rule of FORBIDDEN) {
  const matches = source.match(rule.pattern);
  if (matches) findings.push(`${rule.name} — ${matches.length} occurrence(s)`);
}

if (findings.length) {
  console.error('Article content contains active markup, which is rendered via dangerouslySetInnerHTML:');
  findings.forEach((finding) => console.error(`  - ${finding}`));
  console.error('\nSanitize the content or render it as text before shipping.');
  process.exit(1);
}

console.log('OK: article body HTML contains no active content (script, event handlers, iframes, javascript:/data: URLs).');
