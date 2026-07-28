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

Type-checks the project (`tsc -b`) and builds an optimized production bundle to `dist/`.

### Preview a production build

```bash
npm run preview
```

Serves the contents of `dist/` locally to sanity-check a production build before deploying.

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

This project is configured for deployment on Vercel (`vercel.json`), using `npm run build` as the build command and `dist/` as the output directory. Client-side routes are rewritten to `index.html` so deep links resolve correctly.

## License

No license file is currently present in this repository. This project is private (`"private": true` in `package.json`). <!-- VERIFY: confirm licensing/usage terms with the project owner -->
