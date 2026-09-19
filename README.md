<!-- generated-by: gsd-doc-writer -->
# Praxis Initiative Website

The marketing and advocacy website for **Praxis Initiative**, a 100% system-impacted Arizona nonprofit advancing independent prison oversight, criminal legal system reform, overdose prevention, civic advocacy training, and arts in prison programming.

This repository contains the React + TypeScript single-page application that powers [praxisinitiative.org](https://praxisinitiative.org) <!-- VERIFY: confirm this is the live production domain -->, including all marketing pages, the blog/news section, donation and action-center calls to action, and site-wide SEO metadata.

## Installation

This project uses npm and Vite.

```bash
npm install
```

## Quick Start

1. Install dependencies: `npm install`
2. Start the local dev server: `npm run dev`
3. Open the URL Vite prints in the terminal (typically `http://localhost:5173`)

## Usage

### Development server

```bash
npm run dev
```

Runs the app locally with Vite's hot module replacement.

### Production build

```bash
npm run build
```

Runs four steps: type-check (`tsc -b`), build the client bundle, build an SSR bundle, then prerender
every public route to a complete HTML file. Output goes to `dist/`.

Because the site is prerendered, each route ships as real HTML (`dist/about.html`,
`dist/news/<slug>.html`, …) with its own title, description, canonical URL and sharing image already in
`<head>` — no JavaScript required to read a page. `dist/404.html` handles unknown paths with an actual
404 status.

**When you add a page**, add the route in three places: `src/App.tsx`, `PRERENDER_ROUTES` in
`src/entry-server.tsx`, and `public/sitemap.xml`. The build fails if a route prerenders without a
`<title>`, so a missed entry is caught rather than shipped.

### Preview a production build

```bash
npm run preview          # SPA fallback on every path - convenience only
npx serve dist -l 4321   # clean URLs + real 404s, closer to Vercel
```

`npm run preview` rewrites every path to `index.html`, so it will not show you which routes genuinely
404. Use `npx serve dist` when checking status codes.

### Verify redirects

```bash
npm run check:redirects   # every redirect destination must exist in dist/
npm run docs:redirects    # regenerate docs/REDIRECTS.md from vercel.json
```

### Regenerate optimised assets

```bash
npm run optimize:images   # resize + convert images to WebP (needs ImageMagick)
npm run optimize:fonts    # fetch self-hosted font subsets
```

### Lint

```bash
npm run lint
```

Runs ESLint across the project using the flat config in `eslint.config.js`.

## Project Structure

```
src/
├── components/   # Shared UI components (Layout, Navigation, PageHero, SEOHead, etc.)
├── sections/     # Reusable page sections
├── pages/        # Route-level pages (HomePage, AboutPage, ProgramsPage, etc.)
├── data/         # Static content data
├── hooks/        # Custom React hooks
├── lib/          # Utility/helper modules
├── config.ts     # Site-wide content configuration (nav, hero, footer, campaigns)
├── App.tsx       # Route definitions
└── main.tsx      # Application entry point
```

Routing is handled with `react-router-dom`. Route-level pages (other than the eagerly-loaded `HomePage`) are lazy-loaded for faster first paint. See `src/App.tsx` for the full route list, including `/about`, `/programs`, `/oversight`, `/policy`, `/training`, `/arts`, `/resources`, `/news`, `/news/:slug`, `/contact`, `/donate`, `/action`, `/partners`, `/privacy-policy`, `/terms-of-use`, and `/accessibility`.

## Tech Stack

- **React 19** + **TypeScript** — UI and application logic
- **Vite** — dev server and build tooling
- **React Router** — client-side routing
- **Tailwind CSS** — styling, with Radix UI primitives for accessible components
- **GSAP** + **ScrollTrigger** and **Lenis** — scroll animation and smooth scrolling
- **react-hook-form** + **zod** — form handling and validation
- **react-helmet-async** — per-page SEO metadata

## Deployment

This project deploys to Vercel (`vercel.json`) via Git integration: a push to `main` builds and
publishes automatically.

- **Build** — `npm run build`, output to `dist/`. Every public route is prerendered to real HTML.
- **Routing** — `cleanUrls` + `trailingSlash: false`, with **no catch-all rewrite**. Known routes are
  real files; unknown paths fall through to `dist/404.html` and return 404.
- **Legacy URLs** — 63 permanent redirects map the old WordPress addresses to their replacements. See
  [`docs/REDIRECTS.md`](docs/REDIRECTS.md).
- **Assets** — self-hosted fonts and WebP images; hashed bundles under `/assets/` are cached immutably.

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the full pipeline, environment variables and
rollback steps.

## License

No license file is currently present in this repository. This project is private (`"private": true` in `package.json`). <!-- VERIFY: confirm licensing/usage terms with the project owner -->
