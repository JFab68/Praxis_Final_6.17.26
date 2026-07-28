<!-- generated-by: gsd-doc-writer -->
# Development

Guide for developers working on the Praxis Initiative website locally.

## Local Setup

This is a client-only Vite + React + TypeScript single-page application — there is no backend server to run alongside it.

1. Clone the repository and move into the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment example file and fill in the form endpoint if you want real form submissions during development:
   ```bash
   cp .env.example .env
   ```
   `VITE_FORM_ENDPOINT` is the only variable defined in `.env.example`. If it is left empty, `submitForm()` in `src/lib/api.ts` simulates a submission locally (console log + artificial delay) instead of sending a real network request. See `docs/CONFIGURATION.md` for details.
4. Start the dev server:
   ```bash
   npm run dev
   ```
   Vite prints a local URL (typically `http://localhost:5173`) with hot module replacement enabled.

There is no separate build step required before running the dev server — `npm run dev` runs directly against the TypeScript/TSX source.

## Build Commands

All available scripts are defined in `package.json`:

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot module replacement. |
| `npm run build` | Type-checks the project with `tsc -b`, then builds an optimized production bundle to `dist/`. |
| `npm run preview` | Serves the built `dist/` output locally to sanity-check a production build before deploying. |
| `npm run lint` | Runs ESLint across the project using the flat config in `eslint.config.js`. |

There are no test-related scripts defined in `package.json` — see `docs/TESTING.md` if it exists, or note that no automated test suite is currently configured for this project.

## Code Style

**ESLint** — Configured via `eslint.config.js` (flat config format). It extends `@eslint/js` recommended rules, `typescript-eslint` recommended rules, `eslint-plugin-react-hooks` recommended rules, and `eslint-plugin-react-refresh`'s Vite preset. It applies to all `**/*.{ts,tsx}` files and ignores the `dist/` directory.

Run it with:
```bash
npm run lint
```

**TypeScript** — The project is written entirely in TypeScript/TSX. Type checking happens as part of `npm run build` (`tsc -b`), driven by `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`. Run type checking on its own with:
```bash
npx tsc -b --noEmit
```

**Prettier / Biome** — No `.prettierrc*`, `prettier.config.*`, or `biome.json` file is present in the repository, so no dedicated code formatter is currently configured. Follow the existing formatting conventions in the file you are editing.

**Path alias** — `vite.config.ts` registers a `@/*` alias that resolves to `src/*`; prefer this alias over long relative import paths in new code.

## Branch Conventions

No `.github/` directory, `CONTRIBUTING.md`, or pull request template exists in this repository, so there is no documented branch naming convention. The default branch is `main`. Until a convention is documented, use short, descriptive branch names that indicate the type of change (e.g., `fix/...`, `feat/...`).

## PR Process

No pull request template or contributing guide is present in this repository, so there is no documented review process. Until one is documented, follow these general practices:

- Run `npm run lint` and `npm run build` locally before opening a pull request to catch lint errors and type errors.
- Keep pull requests scoped to a single change or fix where possible.
- Write a clear description of what changed and why in the pull request description.
- Manually verify affected pages in the dev server (`npm run dev`) and, for layout/visual changes, in a production preview (`npm run build && npm run preview`).
