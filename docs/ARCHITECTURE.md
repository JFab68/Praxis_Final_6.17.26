<!-- generated-by: gsd-doc-writer -->
# Architecture

## System Overview

Praxis Initiative's website is a single-page application (SPA) built with React 19, TypeScript, and Vite. It is a marketing and advocacy site for a nonprofit organization — there is no backend server or database in this repository. The primary inputs are static content (page copy, article data, project/campaign data defined in TypeScript modules) and user-submitted forms (newsletter signup, contact, donation intent); the primary outputs are rendered marketing pages and outbound HTTP form submissions to a third-party form endpoint. The architectural style is a client-rendered, route-based SPA: `react-router-dom` handles in-browser routing, GSAP and Three.js drive scroll-based animation and WebGL visual effects, and all page content is composed from reusable presentational components. The production build is a static bundle (see `vite.config.ts`, `vercel.json`) deployed as a static site with client-side routing rewrites.

## Component Diagram

```
                        ┌─────────────┐
                        │  index.html │
                        └──────┬──────┘
                               │ mounts
                               ▼
                        ┌─────────────┐
                        │  main.tsx   │  HelmetProvider + BrowserRouter
                        └──────┬──────┘
                               ▼
                        ┌─────────────┐
                        │   App.tsx   │  Lenis smooth scroll, GSAP ScrollTrigger,
                        │             │  route table, lazy-loaded pages
                        └──────┬──────┘
                               ▼
                        ┌─────────────┐
                        │  Layout.tsx │  Navigation + <Outlet/> + Footer +
                        │             │  FluidBackground (home only)
                        └──────┬──────┘
                               ▼
              ┌────────────────┼─────────────────────┐
              ▼                ▼                      ▼
        ┌───────────┐   ┌─────────────┐       ┌──────────────┐
        │  pages/*  │   │ sections/*  │       │ components/* │
        │ (17 route │◄──┤ (page-scale │◄──────┤  (shared UI: │
        │  screens) │   │  building   │       │  Navigation, │
        └─────┬─────┘   │  blocks)    │       │  PageHero,   │
              │         └─────────────┘       │  SEOHead,    │
              │                                │  PageQuote,  │
              ▼                                │  FluidBg,    │
        ┌───────────┐                          │  ActionNet-  │
        │  data/*   │                          │  workEmbed)  │
        │ (articles │                          └──────────────┘
        │  content) │
        └───────────┘
              │
              ▼
        ┌───────────┐         ┌───────────┐
        │  lib/*    │────────►│  External │
        │ (api.ts,  │         │  form     │
        │  utils.ts)│         │  endpoint │
        └───────────┘         │ (VITE_    │
                               │ FORM_     │
                               │ ENDPOINT) │
                               └───────────┘
```

## Data Flow

A typical page view flows through the system as follows:

1. **Entry** — The browser loads `index.html`, which mounts `src/main.tsx`. This wraps the app in `HelmetProvider` (for per-page `<head>` management via `react-helmet-async`) and `BrowserRouter` (for client-side routing).
2. **Routing** — `src/App.tsx` registers all routes with `react-router-dom`. `HomePage` is eager-loaded for first paint; all other route components (`AboutPage`, `ProgramsPage`, `OversightPage`, `PolicyPage`, `TrainingPage`, `ArtsPage`, `ResourcesPage`, `NewsPage`, `BlogArticlePage`, `ContactPage`, `DonatePage`, `ActionCenterPage`, `PartnersPage`, `PrivacyPolicyPage`, `TermsOfUsePage`, `AccessibilityPage`, `NotFoundPage`) are code-split with `React.lazy` and rendered inside a `Suspense` boundary with a shared `PageLoader` fallback.
3. **Layout composition** — Every route renders inside `Layout.tsx`, which always renders `Navigation` and `Footer`, and conditionally renders the WebGL `FluidBackground` only on the home route (`/`). The active page renders into `<Outlet/>` inside `<main id="main-content">`.
4. **Page composition** — Individual page components (`src/pages/*.tsx`) compose shared building blocks: `SEOHead` (sets title/description/canonical/Open Graph/JSON-LD via `react-helmet-async`), `PageHero` (hero banner with reduced-motion awareness), `PageQuote` (pull-quote sections), and larger `src/sections/*` blocks such as `PhilosophyCarousel`, `MediumsGlossary`, `ImmersiveGallery`, and `HeroField` for content-heavy sections like the homepage.
5. **Content source** — Static content is defined directly in TypeScript: `src/config.ts` holds site-wide config objects (hero copy, navigation links, campaign/project data, footer columns), and `src/data/articles.ts` holds the full News/Blog article library (title, body HTML, pull quotes, citations) consumed by `NewsPage` and `BlogArticlePage`.
6. **Motion** — `App.tsx` initializes a `Lenis` smooth-scroll instance on mount and ties its scroll updates to GSAP's `ScrollTrigger` via `gsap.ticker`, so any component using `ScrollTrigger` (e.g., `HomePage`, `sections/*`) animates in sync with the smoothed scroll position.
7. **User-submitted forms** — Components like `Footer` (newsletter signup) and `ContactPage`/`DonatePage` call `submitForm()` from `src/lib/api.ts`, which POSTs a JSON payload to the endpoint configured via the `VITE_FORM_ENDPOINT` environment variable. If unset, submissions are simulated locally with a console log and a simulated delay — no request leaves the browser.
8. **Third-party embeds** — `ActionNetworkEmbed` injects an Action Network petition widget's CSS/JS directly into the DOM for the Action Center page, and `index.html` loads a Feathr forms/pixel tracking script independently of the React render tree.

## Key Abstractions

| Abstraction | Location | Purpose |
|---|---|---|
| `App` (route table + motion bootstrap) | `src/App.tsx` | Registers all page routes, lazy-loads non-home pages, and wires `Lenis` smooth scrolling to GSAP `ScrollTrigger`. |
| `Layout` | `src/components/Layout.tsx` | Shared page shell rendered for every route: `Navigation`, routed `<Outlet/>`, `Footer`, and the conditional home-only `FluidBackground`. |
| `SEOHead` | `src/components/SEOHead.tsx` | Reusable per-page SEO component setting title, meta description, canonical URL, Open Graph/Twitter tags, and optional JSON-LD schema via `react-helmet-async`. |
| `PageHero` | `src/components/PageHero.tsx` | Shared hero-banner component used across interior pages, with `prefers-reduced-motion` detection and configurable background/overlay/gradient props. |
| `PageQuote` | `src/components/PageQuote.tsx` | Shared pull-quote section component used across pages to feature a quote and attribution. |
| `FluidBackground` | `src/components/FluidBackground.tsx` | Three.js/WebGL interactive fluid-simulation background (custom vertex/fragment shaders) rendered behind the homepage. |
| `ActionNetworkEmbed` | `src/components/ActionNetworkEmbed.tsx` | Injects a third-party Action Network petition widget's CSS and JS into the DOM for a given `petitionId`/`scriptSrc`. |
| `submitForm()` | `src/lib/api.ts` | Central form-submission utility; POSTs to `VITE_FORM_ENDPOINT` or simulates submission locally when unset. |
| `cn()` | `src/lib/utils.ts` | Class-name merge utility combining `clsx` and `tailwind-merge`, used for conditional Tailwind class composition (shadcn/ui convention). |
| `siteConfig`, `navigationConfig`, `heroConfig`, `galleryConfig`, `mediumsConfig`, `footerConfig` | `src/config.ts` | Typed, centrally-defined content objects driving site copy, navigation links, campaign/project data, program-area descriptions, and footer structure. |
| `Article` data model + `articles[]` | `src/data/articles.ts` | Typed content model and dataset for the News/Blog section, consumed by `NewsPage` and `BlogArticlePage`. |
| `useIsMobile()` | `src/hooks/use-mobile.ts` | Shared hook exposing a boolean mobile/breakpoint state via `matchMedia` at a 768px breakpoint. |

## Directory Structure Rationale

```
src/
├── components/    Shared, reusable UI building blocks used across multiple pages
│                  (Layout, Navigation, PageHero, PageQuote, SEOHead,
│                   FluidBackground, ActionNetworkEmbed)
├── sections/      Larger, page-scale content blocks composed from components
│                  (Footer, HeroField, ImmersiveGallery, MediumsGlossary,
│                   PhilosophyCarousel) — primarily used to build HomePage
├── pages/         One component per route, registered in App.tsx
│                  (HomePage, AboutPage, ProgramsPage, OversightPage, PolicyPage,
│                   TrainingPage, ArtsPage, ResourcesPage, NewsPage,
│                   BlogArticlePage, ContactPage, DonatePage, ActionCenterPage,
│                   PartnersPage, PrivacyPolicyPage, TermsOfUsePage,
│                   AccessibilityPage, NotFoundPage, ProjectDetail)
├── data/          Static content datasets consumed by pages (articles.ts)
├── lib/           Framework-agnostic utilities (api.ts form submission,
│                   utils.ts class-name helper)
├── hooks/         Shared React hooks (use-mobile.ts)
├── config.ts      Centralized, typed site content and configuration objects
├── index.css      Global styles and Tailwind CSS entry point
├── main.tsx       Application entry point (HelmetProvider + BrowserRouter)
└── App.tsx        Route table and top-level motion/scroll bootstrap
```

Top-level project structure:

- `public/` — Static assets served as-is: `favicon.svg`, `images/`, `videos/`, `robots.txt`, `sitemap.xml`.
- `docs/` — Project documentation (this file and related docs).
- `index.html` — HTML shell containing SEO meta tags, JSON-LD structured data, and third-party script tags (Feathr forms embed, Feathr tracking pixel, Google Fonts preconnects).
- `vite.config.ts` — Vite build configuration; defines the `@/*` path alias to `src/*` and registers the React plugin plus a dev-only `inspectAttr` plugin.
- `vercel.json` — Deployment configuration for Vercel: build command, output directory, SPA rewrite rule (all non-asset paths rewrite to `/index.html`), and security/caching headers.
- `components.json` — shadcn/ui configuration (style: "new-york", Tailwind base color: "slate") for scaffolding future UI primitives into `src/components/ui`; no components have been generated into that directory yet.
- `tailwind.config.js`, `postcss.config.js` — Tailwind CSS and PostCSS build configuration.
- `.env.example` — Documents the single required environment variable, `VITE_FORM_ENDPOINT`, used by `src/lib/api.ts` for form submissions.
