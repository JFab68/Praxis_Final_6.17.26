<!-- generated-by: gsd-doc-writer -->
# Deployment

This project is a static Vite + React single-page application (see [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)).
There is no backend server or database to deploy — deployment produces a static asset bundle in `dist/`
that is served from a CDN/edge platform, with client-side routing handled via a rewrite rule.

## Deployment Targets

| Target | Config file | Notes |
|---|---|---|
| Vercel | [`vercel.json`](../vercel.json), [`.vercel/project.json`](../.vercel/project.json) | Primary and only deployment target detected in this repository. |

Evidence this project targets Vercel:

- `vercel.json` at the project root explicitly sets `"framework": "vite"`, `"buildCommand": "npm run build"`,
  and `"outputDirectory": "dist"`.
- A `.vercel/project.json` file is present (this directory is normally created by the Vercel CLI after
  running `vercel link` or a first deploy), referencing:
  - `projectName: "praxis-initiative"`
  - `projectId` and `orgId` values <!-- VERIFY: these are internal Vercel identifiers tied to a specific Vercel team/account; confirm current ownership and access in the Vercel dashboard before assuming they are still valid -->
- `.vercel` is listed in `.gitignore`, meaning the linked-project state is local to whoever ran the CLI and
  is not shared via version control.

No `Dockerfile`, `docker-compose.yml`, `netlify.toml`, `fly.toml`, `railway.json`, or `serverless.yml` was
found in the repository, so no other deployment target is configured.

## Build Pipeline

No CI/CD workflow files were found in this repository (`.github/workflows/` does not exist).
<!-- VERIFY: confirm whether Vercel's own Git integration (auto-deploy on push, configured directly in the Vercel dashboard rather than in-repo) is enabled for this project's connected Git remote -->

The build itself, as defined in `package.json` and `vercel.json`, is:

1. **Install dependencies** — `npm install` (implied by `package-lock.json` presence; Vercel runs this
   automatically as part of its build step when a project uses `npm`).
2. **Build** — `npm run build`, which runs:
   ```bash
   tsc -b && vite build
   ```
   This type-checks the project (`tsc -b`, per the TypeScript project references in `tsconfig.json`) and
   then produces an optimized production bundle with Vite.
3. **Output** — The build output directory is `dist/` (set in `vercel.json` `outputDirectory` and matches
   Vite's default output location).
4. **Serve** — Vercel serves the static files from `dist/` and applies the `rewrites` and `headers` rules
   defined in `vercel.json` (see below).

To reproduce the production build locally:

```bash
npm install
npm run build
npm run preview
```

`npm run preview` serves the built `dist/` output locally so a production build can be sanity-checked
before deploying.

## Environment Setup

See [`docs/CONFIGURATION.md`](./CONFIGURATION.md) for the full environment variable reference. In summary:

| Variable | Required for production | Notes |
|---|---|---|
| `VITE_FORM_ENDPOINT` | Effectively required (forms silently no-op without it) | Not set anywhere in the repository (`.env`, `.env.local` are gitignored and not committed). |

<!-- VERIFY: confirm VITE_FORM_ENDPOINT is set in the Vercel project's Environment Variables dashboard (Project Settings → Environment Variables) for the Production environment. This cannot be confirmed from repository contents alone, since Vite only reads .env files at build time and none are committed to this repo. -->

Because `VITE_FORM_ENDPOINT` is a `VITE_`-prefixed variable, it must be set as a **build-time** environment
variable on the deployment platform (not injected at runtime) — Vite inlines `import.meta.env.VITE_*`
values into the bundle during `vite build`.

## Rollback Procedure

No rollback automation or scripting was found in this repository (no rollback step in a CI workflow, and no
rollback command in `vercel.json`).

<!-- VERIFY: Vercel retains prior deployments and supports promoting any previous deployment back to production from the Vercel dashboard (Deployments tab → "Promote to Production") or via `vercel rollback` in the Vercel CLI. Confirm the exact rollback steps and access permissions with whoever administers the connected Vercel project. -->

General approach based on the detected platform:

1. Identify the last known-good deployment in the Vercel dashboard's Deployments list for this project.
2. Promote that deployment to Production (or redeploy it), rather than reverting the Git history, to
   restore service quickly.
3. Separately, revert or fix the offending commit(s) in Git so the next deploy from the default branch is
   also correct.

## Monitoring

No error-tracking or observability library was found in `package.json` `dependencies` or `devDependencies`
(no `@sentry/*`, `dd-trace`, `newrelic`, or `@opentelemetry/*` packages), and no `sentry.config.*` or
equivalent monitoring configuration file exists in the repository.

Two third-party scripts are loaded directly in `index.html` that provide some visibility, though neither is
an application-error monitoring tool:

- A Feathr forms embed script (`https://fthr-content.praxisinitiative.org/forms-js/embed-v2.js`)
  <!-- VERIFY: confirm this is an intentionally configured, currently active Feathr account/subdomain -->
- A Feathr tracking pixel (`boomerang.min.js` loaded from `https://cdn.feathr.co/js/boomerang.min.js`)
  <!-- VERIFY: confirm this tracking script is intentional and its data destination/dashboard -->

<!-- VERIFY: confirm whether Vercel's built-in Analytics/Speed Insights or any other monitoring is enabled for this project in the Vercel dashboard; this cannot be determined from repository contents since it is configured outside the codebase. -->

## Deployment Configuration Reference

The full `vercel.json` used for deployment:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/((?!assets|images|videos|robots.txt|sitemap.xml|favicon).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

Notes on this configuration:

- The `rewrites` rule sends any request that is not for `assets/`, `images/`, `videos/`, `robots.txt`,
  `sitemap.xml`, or `favicon` to `/index.html`, which is what allows `react-router-dom` client-side routes
  (e.g. `/about`, `/news/:slug`) to resolve correctly on a full page load or refresh.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Strict-Transport-Security`) are applied to every route.
- Files under `/assets/` (Vite's hashed build output) receive a one-year immutable cache header, which is
  safe because Vite fingerprints those filenames on every build.

`public/robots.txt` and `public/sitemap.xml` reference `https://praxisinitiative.org` as the canonical
production domain, and `index.html` sets the same domain in its `<link rel="canonical">`, Open Graph, and
JSON-LD tags.
<!-- VERIFY: confirm https://praxisinitiative.org is the current live production domain and that it is the domain actually attached to this Vercel project -->
