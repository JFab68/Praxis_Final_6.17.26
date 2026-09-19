<!-- generated-by: gsd-doc-writer -->

# Configuration

This project is a static Vite + React site. It has no backend server and no database — configuration is
limited to a single build-time environment variable used for form submissions, plus deployment rules in
`vercel.json`.

## Environment Variables

The canonical list lives in [`.env.example`](../.env.example).

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_WEB3FORMS_KEY` | Yes for working forms in production | `''` (empty string) | Web3Forms access key. Read via `import.meta.env.VITE_WEB3FORMS_KEY` in `src/lib/api.ts`, which POSTs to the hard-coded endpoint `https://api.web3forms.com/submit`. Get a key at [web3forms.com](https://web3forms.com) using `info@praxisinitiative.org`. |

Only variables prefixed with `VITE_` are exposed to client-side code (a Vite convention). Any future
variable must use that prefix to be readable in the browser bundle.

To configure locally:

```bash
cp .env.example .env
```

Then edit `.env`:

```bash
VITE_WEB3FORMS_KEY=your-access-key
```

`.env` and `.env.local` are gitignored.

## Config File Format

There is no dedicated app config file (`config.json`, `config.yaml`, `app.config.*`). Tooling
configuration is split across standard files:

- `vite.config.ts` — Vite build configuration. Sets **`base: '/'`** (absolute asset paths, required so
  deep links like `/news/<slug>` resolve `/assets/*` from the domain root), registers
  `@vitejs/plugin-react` plus `plugin-inspect-react-code` (dev only), defines the `@` → `./src` alias,
  and splits output into `react` / `motion` / `three` chunks.
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript project references and the
  `@/*` → `./src/*` alias. `tsconfig.app.json` includes `node` types because `src/entry-server.tsx`
  imports `node:stream` for prerendering.
- `tailwind.config.js` — Tailwind theme and content scanning.
- `eslint.config.js` — ESLint flat config (`@eslint/js`, `typescript-eslint`, React Hooks / Refresh).
- `components.json` — shadcn/ui generator configuration.
- `vercel.json` — deployment configuration (see below).
- `scripts/*.mjs` — build-time tooling; see [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md).

## Required vs Optional Settings

Nothing causes the application to fail at startup. `src/lib/api.ts` guards the key:

```ts
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';
```

**In development** (`import.meta.env.DEV`), a missing key makes `submitForm()` log the payload, wait
800 ms, and return success with "development mode — no email sent". Nothing leaves the browser, which is
intended.

**In production**, a missing key returns `success: false` with a message directing the visitor to email
`info@praxisinitiative.org`. This is deliberate: the previous behaviour returned a *success*
confirmation for a message that was never sent, so contact and newsletter submissions were discarded
silently.

Vite inlines `import.meta.env.VITE_WEB3FORMS_KEY` as an empty string when it is unset, so the guard
becomes provably true and the minifier **deletes the Web3Forms `fetch` from the bundle entirely**. The
deployed JavaScript then contains no `api.web3forms.com/submit` string. `npm run build` runs
`node scripts/check-env.mjs` and warns when the key is missing; the check warns rather than fails so a
missing key can never block a deploy.

So in practice:

- **Required for the site to build and load:** none.
- **Required for the Contact and Newsletter forms to deliver in production:** `VITE_WEB3FORMS_KEY`.

## Defaults

| Variable | Default | Set in |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | `''` (empty string) | `src/lib/api.ts` |

The Web3Forms endpoint itself is not configurable — it is the constant
`FORM_ENDPOINT = 'https://api.web3forms.com/submit'` in `src/lib/api.ts`.

## Per-Environment Overrides

There are no `.env.development`, `.env.production`, or `.env.test` files in the repository.

For local development, copy `.env.example` to `.env` (or `.env.local`) — Vite loads these automatically
and they are gitignored.

For production, set `VITE_WEB3FORMS_KEY` in the Vercel project (Settings → Environment Variables →
Production). Because it is inlined at build time it must be present **when the build runs**; adding it
afterwards requires a redeploy.

`vercel.json` also defines response headers applied to all deployed routes, independent of environment
variables:

```json
{
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
}
```

Static assets under `/assets/` and `/fonts/` receive a one-year immutable cache header. `/images/`
receives a one-week cache with `stale-while-revalidate`. There is **no catch-all rewrite**: known routes
are real prerendered HTML files, and unknown paths fall through to `dist/404.html` so they return 404
instead of 200. See [`docs/REDIRECTS.md`](./REDIRECTS.md).
