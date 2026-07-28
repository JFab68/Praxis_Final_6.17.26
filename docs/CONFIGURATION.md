<!-- generated-by: gsd-doc-writer -->

# Configuration

This project is a static Vite + React site (see `package.json`, `name: "my-app"`). It has no backend
server and no database — configuration is limited to a single build-time environment variable used for
form submissions, plus deployment headers defined in `vercel.json`.

## Environment Variables

The canonical list of environment variables lives in [`.env.example`](../.env.example).

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_FORM_ENDPOINT` | Optional (Required for working forms in production) | `''` (empty string) | POST endpoint URL that the Contact and Newsletter forms submit to. Supports Formspree, Web3Forms, Netlify Forms, or any custom POST endpoint. Read via `import.meta.env.VITE_FORM_ENDPOINT` in `src/lib/api.ts`. |

Because this is a Vite project, only variables prefixed with `VITE_` are exposed to client-side code
(this is a Vite framework convention, not a custom setting in this repo). Any additional environment
variable added in the future must use the `VITE_` prefix to be accessible in the browser bundle.

To configure locally:

```bash
cp .env.example .env
```

Then edit `.env` and set:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

`.env` and `.env.local` are excluded from version control via `.gitignore`.

## Config File Format

There is no dedicated app configuration file (no `config.json`, `config.yaml`, or `app.config.*`).
Build and tooling configuration is split across standard tool-specific files instead:

- `vite.config.ts` — Vite build configuration. Sets `base: './'` for relative asset paths, registers the
  `@vitejs/plugin-react` and `plugin-inspect-react-code` plugins, and defines the `@` path alias pointing
  to `./src`.
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript project references and the
  `@/*` → `./src/*` path alias.
- `tailwind.config.js` — Tailwind CSS theme and content-scanning configuration.
- `eslint.config.js` — ESLint flat config using `@eslint/js`, `typescript-eslint`, and the React Hooks /
  React Refresh plugins.
- `components.json` — shadcn/ui component generator configuration (aliases and paths for UI primitives).
- `vercel.json` — deployment configuration for the Vercel platform (see below).

## Required vs Optional Settings

There are no environment variables that cause the application to fail at startup or build time — the
codebase does not perform any `process.env` / `import.meta.env` validation or throw on a missing
variable. `src/lib/api.ts` explicitly guards against a missing `VITE_FORM_ENDPOINT`:

```ts
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
```

When `VITE_FORM_ENDPOINT` is unset, `submitForm()` falls back to a simulated dev-mode submission: it logs
the payload to the console, waits 800ms, and returns a success message stating "Form submitted
(development mode — no email sent)." No error is thrown and no build/runtime crash occurs — the form
just silently does not deliver submissions. See `button-link-audit-report.md` in the project root for a
prior audit note flagging this behavior as a production risk when the variable is left unconfigured.

So in practice:

- **Required for the site to build and load:** none.
- **Required for the Contact and Newsletter forms to actually deliver submissions in production:**
  `VITE_FORM_ENDPOINT`.

## Defaults

| Variable | Default | Set in |
|---|---|---|
| `VITE_FORM_ENDPOINT` | `''` (empty string, triggers dev-mode simulation) | `src/lib/api.ts`, line 5 |

No other defaulted configuration values were found in the source tree.

## Per-Environment Overrides

There are no `.env.development`, `.env.production`, or `.env.test` files in the repository, and no
`NODE_ENV`-conditional configuration branches were found in the source code.

For local development, copy `.env.example` to `.env` (or `.env.local`) and set `VITE_FORM_ENDPOINT`
there — Vite automatically loads these files and they are gitignored.

For production, the project is configured for deployment on Vercel (`vercel.json` sets
`"framework": "vite"`, `"buildCommand": "npm run build"`, and `"outputDirectory": "dist"`).
<!-- VERIFY: Confirm VITE_FORM_ENDPOINT is set in the Vercel project's Environment Variables dashboard for the Production environment. This cannot be confirmed from the repository contents alone. -->

`vercel.json` also defines response headers applied to all deployed routes, independent of any
environment variable:

```json
{
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
}
```

Static assets under `/assets/` receive a long-lived cache header
(`Cache-Control: public, max-age=31536000, immutable`), and all non-asset routes are rewritten to
`/index.html` for client-side routing support (via `react-router-dom`).
