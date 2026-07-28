<!-- generated-by: gsd-doc-writer -->
# Getting Started

This guide walks through getting the Praxis Initiative website running locally for the first time.

## Prerequisites

- **Node.js** — Vite 7 (used by this project, see `package.json`) requires a current Node.js LTS release.
  `Node.js >= 20.19` (or `22.12+`) is recommended. No `.nvmrc` or `engines` field is committed to this
  repository, so there is no enforced/pinned version — this recommendation is based on Vite 7's stated
  runtime requirements. <!-- VERIFY: confirm the exact minimum Node.js version supported for this deployment -->
- **npm** — This project uses `npm` (a `package-lock.json` is committed; no `yarn.lock` or `pnpm-lock.yaml`
  is present). Any npm version bundled with a supported Node.js release will work.
- **Git** — To clone the repository.

No database, backend service, or additional system dependency is required — this is a static,
client-rendered React application (see `docs/ARCHITECTURE.md`).

## Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/JFab68/Praxis_Final_6.17.26.git
   cd Praxis_Final_6.17.26
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and configure the form endpoint:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `VITE_FORM_ENDPOINT` to a working POST endpoint (for example, a Formspree or
   Web3Forms URL). See `docs/CONFIGURATION.md` for full details. This step is optional for local
   development — if `VITE_FORM_ENDPOINT` is left unset, the Contact and Newsletter forms fall back to a
   simulated dev-mode submission (logs to the console, no request sent).

## First Run

Start the Vite development server:

```bash
npm run dev
```

Open the URL Vite prints in the terminal (typically `http://localhost:5173`). The homepage should load
with live hot module replacement — edits to files under `src/` are reflected in the browser immediately.

To verify a production build works before deploying:

```bash
npm run build
npm run preview
```

`npm run build` type-checks the project (`tsc -b`) and produces an optimized bundle in `dist/`.
`npm run preview` serves that `dist/` output locally.

## Common Setup Issues

- **Contact/Newsletter forms don't actually send anything.** This is expected until `VITE_FORM_ENDPOINT`
  is set in `.env`. Without it, `submitForm()` in `src/lib/api.ts` simulates a successful submission
  locally and never sends a network request. See `docs/CONFIGURATION.md` for how to configure a real
  endpoint.
- **`npm install` succeeds but `npm run build` fails with TypeScript errors.** `npm run build` runs
  `tsc -b` before bundling, so any type error in `src/` will fail the build even though `npm run dev`
  may still appear to work. Run `npm run lint` and check the TypeScript errors reported by `tsc -b`
  directly to narrow down the failing file.
- **Port `5173` is already in use.** Vite will automatically try the next available port and print the
  actual URL it bound to — check the terminal output rather than assuming `5173`.
- **`.env` changes don't seem to take effect.** Vite only re-reads environment files on server restart;
  stop and re-run `npm run dev` after editing `.env`.

## Next Steps

- See `docs/ARCHITECTURE.md` for how the application is structured (routing, layout, components, data
  flow).
- See `docs/CONFIGURATION.md` for the full list of environment variables and configuration files.
- See the root `README.md` for an overview of available npm scripts and the tech stack.
