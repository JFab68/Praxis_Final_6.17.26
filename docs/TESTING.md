<!-- generated-by: gsd-doc-writer -->
# Testing

## Current State

This project does **not** currently have an automated test suite. There is no test framework
installed (no Jest, Vitest, Mocha, or Playwright in `package.json`), no test configuration file,
and no `*.test.*` / `*.spec.*` files anywhere under `src/`. There is also no CI workflow
(`.github/workflows/`) that runs tests, since none exist to run.

This is an accurate reflection of the current repository, not an oversight in this document —
treat the sections below as the real, present-day verification story for this codebase.

## Available Verification Commands

In the absence of automated tests, the following commands (defined in `package.json` `scripts`)
are the available ways to verify the codebase before shipping a change:

| Command | What it does |
|---|---|
| `npm run lint` | Runs ESLint (`eslint .`) using the flat config in `eslint.config.js` — `@eslint/js` recommended rules, `typescript-eslint` recommended rules, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (Vite fast-refresh rules). Catches unused variables, hook-rule violations, and other static issues across `**/*.{ts,tsx}`. |
| `npm run build` | Runs `tsc -b && vite build` — a full TypeScript project build (type-checking every `.ts`/`.tsx` file per `tsconfig.json` project references) followed by the production Vite bundle. A failing type-check or bundling error will fail this command, so it doubles as the closest thing this project has to a correctness gate. |
| `npm run dev` | Starts the Vite dev server for manual, in-browser verification of a change (routes, forms, animations, responsive layout). |
| `npm run preview` | Serves the built `dist/` output locally so a production build can be manually smoke-tested before deploying. |

There is no `npm test` script. Running `npm run lint && npm run build` before committing is the
current de facto quality gate for this repository.

## Writing New Tests

No test framework is installed, so there is no existing naming convention, test helper, or
`tests/`/`__tests__/` directory to follow. If test coverage is introduced in the future, this
section should be updated to describe the chosen framework, file naming convention (e.g.,
`*.test.tsx` colocated with source, or a top-level `__tests__/` directory), and any shared test
utilities.

## Coverage Requirements

No coverage threshold is configured — there is no `jest.config.*`, `vitest.config.*`, `.nycrc`,
or `c8` configuration anywhere in the repository.

## CI Integration

No CI/CD pipeline is configured in this repository (no `.github/workflows/` directory), so no
tests or lint checks run automatically on push or pull request. Verification currently relies on
running `npm run lint` and `npm run build` locally before pushing changes. Deployment is handled
by Vercel (see `vercel.json`), which runs its own build step (`npm run build`) at deploy time —
this catches TypeScript and bundling errors but is not a substitute for a dedicated CI test run.

## Adding a Test Suite (Recommendation)

If automated testing is added to this project in the future, given the stack (Vite + React 19 +
TypeScript), the natural choices are:

- **Unit / component tests** — [Vitest](https://vitest.dev) integrates directly with the existing
  Vite config (`vite.config.ts`) and can test utilities like `src/lib/utils.ts` and `src/lib/api.ts`,
  plus component behavior with `@testing-library/react`.
- **End-to-end tests** — [Playwright](https://playwright.dev) for critical user flows: navigating
  between routes, submitting the newsletter/contact/donate forms (`src/lib/api.ts` `submitForm()`),
  and verifying `SEOHead` metadata renders correctly per page.
- **CI enforcement** — Once a test runner exists, add a `.github/workflows/ci.yml` workflow that
  runs `npm run lint`, `npm run build`, and the new test command on every push and pull request.

This section describes a possible future setup only — none of the above is currently installed or
configured in this repository.

## Related Documentation

- See [ARCHITECTURE.md](ARCHITECTURE.md) for the component structure and data flow that any future
  tests would exercise.
- See [CONFIGURATION.md](CONFIGURATION.md) for the environment variables (`VITE_FORM_ENDPOINT`)
  that affect form-submission behavior during manual or automated testing.
