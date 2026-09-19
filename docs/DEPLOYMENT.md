# Deployment

This project is a Vite + React application (see [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)). It is deployed
as static files from `dist/`, but it is **not** a plain client-rendered SPA: every public route is
prerendered to a complete HTML file at build time (see [Prerendering](#prerendering)).

## Deployment Targets

| Target | Config file | Notes |
|---|---|---|
| Vercel | [`vercel.json`](../vercel.json), [`.vercel/project.json`](../.vercel/project.json) | Primary and only deployment target. |

- `.vercel/project.json` references `projectName: "praxis-initiative"` with a `projectId`/`orgId` pair.
- `.vercel` is gitignored, so the linked-project state is local to whoever ran `vercel link`.

No `Dockerfile`, `netlify.toml`, `fly.toml`, or `railway.json` exists, so no other target is configured.

## Build Pipeline

There are no CI workflow files (`.github/workflows/` does not exist). Deployment is Vercel's own Git
integration: a push to `main` builds and publishes automatically.

`npm run build` runs four steps in order:

```bash
tsc -b                                                   # 1. type-check (project references)
vite build                                               # 2. client bundle -> dist/
vite build --ssr src/entry-server.tsx --outDir dist-ssr   # 3. SSR bundle for prerendering
node scripts/prerender.mjs                               # 4. write real HTML per route
```

Step 4 is what makes each page readable before JavaScript runs. It renders every route through
`src/entry-server.tsx` and writes one HTML file per route, plus `dist/404.html`.

To reproduce the production build locally:

```bash
npm install
npm run build
npx serve dist -l 4321     # serve clean URLs + 404.html the way Vercel does
```

`npm run preview` also works but applies SPA fallback to *every* path, so it will not show you which
routes genuinely 404. Use `npx serve dist` when checking status codes.

### Prerendering

`src/entry-server.tsx` renders with `renderToPipeableStream` + `onAllReady` rather than
`renderToString`, because the pages are `React.lazy()` boundaries — the synchronous renderer emits the
Suspense fallback (a spinner) instead of the page.

`scripts/prerender.mjs` walks `PRERENDER_ROUTES` (exported from `entry-server.tsx`: 18 static routes plus
one per article in `src/data/articles.ts`). When adding a page:

1. Add the route to `src/App.tsx`.
2. Add the same path to `PRERENDER_ROUTES` in `src/entry-server.tsx`.
3. Add it to `public/sitemap.xml`.

The prerender step **fails the build** if a route renders no `<title>`, so a missing entry is caught
rather than silently shipping an untagged page.

Head tags: `react-helmet-async@3` on React 19 renders `<title>`/`<meta>`/`<link>` as real elements and
lets React hoist them to the front of the server-rendered fragment (it does not populate the classic
server context). The prerender moves those leading tags into `<head>` and marks them `data-prerender`;
`src/main.tsx` removes the build-time copies once React renders its own, so head tags are never
duplicated.

### Asset optimisation

Two scripts regenerate committed assets. Run them only when the source material changes:

```bash
npm run optimize:images   # scripts/optimize-images.sh  (ImageMagick; PNG/JPG -> resized WebP)
npm run optimize:fonts    # scripts/fetch-fonts.mjs    (Google Fonts -> self-hosted latin woff2)
```

`optimize:images` reads from `public/images/`, so re-running it after the source PNGs have been deleted
will skip those files rather than fail.

Fonts are self-hosted (`public/fonts/`, one variable woff2 per family, latin subset) — there are no
`fonts.googleapis.com` or `fonts.gstatic.com` requests at runtime.

## Routing, Redirects and 404s

`vercel.json` sets `cleanUrls: true` and `trailingSlash: false`, and **no catch-all rewrite**. That
combination is deliberate:

- Every known route exists as a real file (`dist/about.html`, `dist/news/<slug>.html`, …), so clean URLs
  resolve to prerendered HTML.
- Any path that matches no file falls through to `dist/404.html`, which Vercel serves with an actual
  **404** status. Unknown URLs used to return 200.
- `dist/404.html` carries `<meta name="robots" content="noindex, follow">` and renders the app shell, so
  the client router shows `NotFoundPage`.

Old WordPress URLs are handled by 63 permanent (308) redirects defined in `vercel.json`. See
[`docs/REDIRECTS.md`](./REDIRECTS.md) for the full map and the rules for adding entries.

Do not add a catch-all rewrite back. It would make every unknown path return 200 again and break the
404 behaviour.

## Environment Setup

See [`docs/CONFIGURATION.md`](./CONFIGURATION.md). Because the variables are `VITE_`-prefixed they are
inlined at build time and must be set as **build-time** environment variables in the Vercel project
(Project Settings → Environment Variables → Production). They cannot be injected at runtime.

| Variable | Required for production | Notes |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Yes — forms are non-functional without it | Access key from web3forms.com, tied to `info@praxisinitiative.org`. |

`npm run build` runs `node scripts/check-env.mjs` first and prints a warning block when a required
variable is missing.

### Why a missing key is silent by default

Vite inlines `import.meta.env.VITE_WEB3FORMS_KEY` as an empty string when it is unset, so the
`if (!ACCESS_KEY)` branch becomes provably true and the minifier deletes the Web3Forms `fetch` from the
bundle. The deployed JavaScript then contains no `api.web3forms.com/submit` string at all. To confirm
what actually shipped:

```bash
curl -s https://praxisinitiative.org/ | grep -oE '/assets/index-[A-Za-z0-9_-]+\.js'
curl -s https://praxisinitiative.org/assets/index-XXXX.js | grep -c "api.web3forms.com/submit"
```

A count of `0` means the key was missing at build time. `src/lib/api.ts` now returns a visible failure
with a direct email fallback in that case, rather than showing a confirmation for a message that was
never sent.

## Monitoring

No application-error tracking is installed (no `@sentry/*`, `dd-trace`, `newrelic`, or
`@opentelemetry/*`).

Vercel Web Analytics and Speed Insights are wired into the app via `src/components/Analytics.tsx`
(`@vercel/analytics/react` and `@vercel/speed-insights/react`). **Installing the packages is not
sufficient** — both must also be enabled for the project in the Vercel dashboard (Analytics tab →
Enable; Speed Insights tab → Enable) before any data appears.

Custom outcome events are sent through `src/lib/analytics.ts`:

| Event | Fires when |
|---|---|
| `donate_tier_selected` | A giving tier is clicked |
| `donate_checkout_opened` | The donor portal link is clicked |
| `donate_gift_completed` | The page loads with a Givebutter completion parameter |
| `event_registration_opened` | An Action Network registration CTA is clicked |
| `newsletter_signup_completed` | The footer newsletter form submits successfully |
| `contact_form_submitted` | The contact form submits successfully (includes `is_training_inquiry`) |

Clicks and completions are separate names on purpose. Completed gifts are confirmed against Givebutter
records and registrations against Action Network records; the site does not infer a completion from a
click.

Third-party scripts in `index.html`: the Feathr tracking pixel (`cdn.feathr.co/js/boomerang.min.js`) and
a Feathr forms embed loaded by the donate page. The Givebutter Widgets library is **not** loaded globally
— `src/lib/givebutter.ts` loads it on demand from the donate page only.

## Rollback Procedure

No rollback automation exists in the repository. To roll back:

1. Find the last known-good deployment in the Vercel dashboard's Deployments list.
2. Promote it to Production (or use `vercel rollback`), rather than reverting Git history, to restore
   service quickly.
3. Separately fix or revert the offending commit so the next deploy from `main` is also correct.

A failed build leaves the previous deployment serving, so a bad `vercel.json` or a prerender failure is
recoverable without downtime.

## Deployment Configuration Reference

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [ "… 63 permanent redirects — see docs/REDIRECTS.md …" ],
  "headers": [ "… security + cache headers, see vercel.json …" ]
}
```

- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Strict-Transport-Security`) apply to every route.
- `/assets/*` and `/fonts/*` receive a one-year immutable cache header — safe because Vite fingerprints
  asset filenames and the font files are content-stable.
- `/images/*` receives a one-week cache with `stale-while-revalidate`.

`public/robots.txt` and `public/sitemap.xml` reference `https://praxisinitiative.org` as the canonical
production domain, and `index.html` sets the same domain in its canonical, Open Graph, and JSON-LD tags.
