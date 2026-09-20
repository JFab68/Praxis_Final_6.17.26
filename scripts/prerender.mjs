/**
 * Prerenders every public route to a complete HTML file after `vite build`.
 *
 * Why: the site is a client-rendered SPA, so the HTML shipped to crawlers and to
 * social scrapers used to be an empty <div id="root"> plus the generic homepage
 * tags. Each page's title, description, canonical URL, sharing image and body
 * copy only appeared after JavaScript ran. This step writes real HTML per route
 * so /programs, /news/<slug>, /events and the rest are readable before any
 * script executes.
 *
 * Head handling: react-helmet-async@3 on React 19 renders <title>/<meta>/<link>
 * as real elements, which React hoists to the front of the server-rendered
 * fragment. Those leading tags are moved into <head> here (and tagged
 * data-prerender so src/main.tsx can drop the build-time copies once React
 * renders its own).
 *
 * Run: node scripts/prerender.mjs  (part of `npm run build`)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

if (!fs.existsSync(ssrEntry)) {
  console.error(`Missing SSR bundle at ${ssrEntry}. Run "vite build --ssr src/entry-server.tsx --outDir dist-ssr" first.`);
  process.exit(1);
}

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const { render, PRERENDER_ROUTES } = await import(pathToFileURL(ssrEntry).href);

const SEO_START = '<!--seo-start-->';
const SEO_END = '<!--seo-end-->';
const NOT_FOUND_ROUTE = '/__not-found__';

const STATIC_HEAD_EXTRAS = [
  '<meta property="og:site_name" content="Praxis Initiative" />',
  '<meta name="twitter:card" content="summary_large_image" />',
].join('\n    ');

const HOISTABLE = /^<(title|meta|link|script|noscript|style)\b/i;

/** Split the leading hoistable tags off the server-rendered fragment. */
function splitHoistedTags(html) {
  const head = [];
  let rest = html;

  for (;;) {
    const match = HOISTABLE.exec(rest);
    if (!match) break;

    const tag = match[1].toLowerCase();
    let end;
    if (tag === 'title' || tag === 'script' || tag === 'style' || tag === 'noscript') {
      const closeIndex = rest.indexOf(`</${tag}>`);
      if (closeIndex === -1) break;
      end = closeIndex + `</${tag}>`.length;
    } else {
      const gtIndex = rest.indexOf('>');
      if (gtIndex === -1) break;
      end = gtIndex + 1;
    }

    head.push(rest.slice(0, end));
    rest = rest.slice(end);
  }

  return { head, body: rest };
}

/** Tag one element so the client can remove the build-time copy. */
function markPrerender(tagHtml) {
  // Applied per tag: passing the concatenated tag list here would only ever
  // rewrite the first opening tag, leaving the rest unmarked and therefore
  // never removed by src/main.tsx (which duplicates every meta tag in <head>).
  const match = /^<([a-z]+)([^>]*?)(\/?)>/i.exec(tagHtml);
  if (!match) return tagHtml;
  const [opening, name, attrs, selfClose] = match;
  return `<${name}${attrs} data-prerender="1"${selfClose}>` + tagHtml.slice(opening.length);
}

function renderPage(rawBody, helmetHead) {
  // The dev inspector's code-path attributes must not ship in production HTML.
  const cleaned = rawBody.replace(/\s+code-path="[^"]*"/g, '');
  const { head: hoisted, body } = splitHoistedTags(cleaned);

  const headContent = [
    hoisted.map(markPrerender).join(''),
    STATIC_HEAD_EXTRAS,
    helmetHead,
  ]
    .filter((part) => part && part.trim().length > 0)
    .join('\n    ');

  if (!/<title[\s>]/i.test(headContent)) {
    throw new Error('no <title> found in the rendered output - head hoisting failed');
  }

  const marked = (headContent.match(/data-prerender="1"/g) ?? []).length;
  if (marked !== hoisted.length) {
    throw new Error(`head marking mismatch: ${marked} tagged of ${hoisted.length} hoisted tags`);
  }

  // Function replacers: page copy contains "$" sequences that String.replace
  // would otherwise treat as capture-group references.
  let out = template.replace(
    /<!--seo-start-->[\s\S]*?<!--seo-end-->/,
    () => `${SEO_START}\n    ${headContent}\n    ${SEO_END}`
  );
  out = out.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  return out;
}

function outputPathFor(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  const trimmed = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(distDir, `${trimmed}.html`);
}

let written = 0;
const failures = [];

for (const route of PRERENDER_ROUTES) {
  try {
    const { html, head, errors } = await render(route);
    if (errors.length) failures.push(`${route}: ${errors.join(' | ')}`);
    if (!html || html.length < 200) throw new Error(`suspiciously small body (${html.length} chars)`);

    const page = renderPage(html, head.title || head.meta ? [head.title, head.meta, head.link, head.script].filter(Boolean).join('\n    ') : '');
    const file = outputPathFor(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);
    written += 1;
    console.log(`  ${route.padEnd(52)} ${String(html.length).padStart(7)} body bytes -> ${path.relative(distDir, file)}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`  FAILED ${route}: ${error instanceof Error ? error.message : error}`);
  }
}

// Vercel serves dist/404.html (with an actual 404 status) for any path that does
// not match a file, which is what turns unknown URLs from a 200 into a 404.
const notFound = await render(NOT_FOUND_ROUTE);
fs.writeFileSync(
  path.join(distDir, '404.html'),
  renderPage(notFound.html, [notFound.head.title, notFound.head.meta, notFound.head.link].filter(Boolean).join('\n    '))
);
console.log(`  ${'404.html'.padEnd(52)} ${String(notFound.html.length).padStart(7)} body bytes -> 404.html`);

console.log(`\nprerendered ${written}/${PRERENDER_ROUTES.length} routes + 404.html`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}
