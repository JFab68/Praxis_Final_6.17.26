# Security Review

A static site has a small attack surface, but "static" is not "nothing to check": the risks that matter
here are a duplicate indexable hostname, unhardened response headers, a public build-time key, one raw
HTML sink, and vulnerable build tooling.

Last reviewed: 2026-09-19. Re-run the commands in [Reproducing this review](#reproducing-this-review)
after dependency or hosting changes.

## Fixed

| Finding | Detail | Fix |
|---|---|---|
| Duplicate indexable hostname | `praxis-initiative.vercel.app` served the entire site with HTTP 200 and **no** `X-Robots-Tag`, so a second hostname could be crawled and indexed alongside `praxisinitiative.org`. | `vercel.json` now sends `X-Robots-Tag: noindex, nofollow` for any `*.vercel.app` host, which also covers preview deployments. |
| No Content-Security-Policy | Four third-party script origins (Feathr, Givebutter, Action Network, Vercel Analytics) plus one inline script were unrestricted. | `Content-Security-Policy-Report-Only` added — see [CSP](#content-security-policy) below for why it is report-only and how to enforce it. |
| No Permissions-Policy | Camera, microphone, geolocation, USB and payment APIs were reachable by any embedded third-party frame. | `Permissions-Policy` disables them all; only `fullscreen` and `picture-in-picture` are allowed for self. |
| Cross-origin window leakage | No COOP, so a cross-origin opener could retain a reference to the window. | `Cross-Origin-Opener-Policy: same-origin-allow-popups` (popups are kept working for the Givebutter and Action Network flows). |
| Vulnerable router | `react-router` 7.16.0 carried a high-severity advisory (open redirect via backslash in `<Link>`/`useNavigate`). | Upgraded to `react-router` / `react-router-dom` 7.18.4. **Both packages must move together** — `react-router-dom` pins `react-router` to an exact version, and a mismatch produces two copies with two separate Router contexts, which breaks `StaticRouter` during prerendering with `useLocation() may be used only in the context of a <Router> component`. |
| Raw HTML sink unguarded | `BlogArticlePage` renders `article.bodyHtml` via `dangerouslySetInnerHTML`. Content is trusted today, but nothing enforced that. | `scripts/check-content.mjs` fails the build if article content contains `<script>`, `on*=` handlers, `javascript:`/`data:` URLs, `<iframe>`, `<object>`/`<embed>`, `srcdoc`, `<form>`, meta refresh, or CSS `expression()`. |

## Verified clean

| Check | Result |
|---|---|
| Secrets in the working tree or git history | None. `.env` has never been committed and is not tracked; only `.env.example` is. |
| Source maps deployed | Not served (`403`); no `.map` files in `dist/`. |
| Sensitive paths exposed | `/.env`, `/.git/config`, `/package.json`, `/vercel.json`, `/docs/*`, `/graphify-out/*`, `/_source-articles/*`, `/node_modules/*` all return `404`. |
| Path traversal | `/donate-2/../../etc/passwd` → `403`; `/%2e%2e/%2e%2e/etc/passwd` → `403`; `/news/..%2f..%2fpackage.json` → `400`. No file disclosure. |
| Open redirect | `//evil.example.com` → `308` to `https://praxisinitiative.org/evil.example.com` (same-origin normalisation, not an off-site redirect). All 63 redirect destinations are static, hard-coded paths. |
| `target="_blank"` without `rel` | All 8 external links carry `rel="noopener noreferrer"`. |
| `eval` / `new Function` / `document.write` / `innerHTML` assignment | None. The only dynamic script creation is `createElement('script')` with hard-coded vendor URLs (Feathr, Givebutter, Action Network). |
| TLS | TLS 1.0 and 1.1 refused; TLS 1.2+ served. Certificate chain validates. `http://` → `308` → `https://`. HSTS is set with `includeSubDomains; preload`. |
| 404 handling | Unknown paths return **404** with `noindex, follow` and the full security header set (previously 200). |
| Third-party external images | None — all article imagery is local. |

## Third-party trackers (needs a decision)

Instrumented in a real browser, loading one article page fires these off-site requests:

| Host | Purpose |
|---|---|
| `cdn.feathr.co`, `polo.feathr.co`, `marco.feathr.co` | Feathr CRM / marketing analytics |
| `match.adsrvr.org` | **The Trade Desk** — programmatic-advertising identity sync, called by Feathr with `ttd_passthrough=<feathr account id>` |

The `match.adsrvr.org` request is an advertising identifier sync, not a first-party analytics call. For a
criminal-justice-reform nonprofit whose audience includes system-impacted people, that is sensitive:
it builds and shares an ad-tech profile of visitors. It is loaded indirectly by the Feathr pixel in
`index.html`; no code in this repository references it.

`src/pages/PrivacyPolicyPage.tsx` is 56 lines and mentions **none** of the vendors the site actually
uses — no Feathr, no Givebutter, no Web3Forms, no Vercel, no advertising or tracking disclosure at all.
That is a disclosure gap independent of whether the tracker stays: visitors are not told that payment
data goes to Givebutter, form data to Web3Forms, or that ad-tech identifiers are set.

This is a policy decision, not a code fix, so it is left open deliberately. The options, cheapest first:

1. Update the privacy policy to name the processors and disclose advertising/analytics cookies.
2. Ask Feathr to disable the Trade Desk identity sync on the account (keeps attribution, drops the ad
   network).
3. Remove the Feathr pixel (`index.html`) if the CRM attribution is not actually in use. Note the Feathr
   **form** embed on the donate page is separate and is a donation fallback — check whether it is still
   needed before removing anything.

Blocking `match.adsrvr.org` in the CSP would need `img-src` narrowed from `https:` to an explicit
allowlist, and a report-only policy cannot block it anyway. Do not attempt this before the CSP is
enforced.

## Accepted risks

**`VITE_WEB3FORMS_KEY` is public by design.** It is inlined into the JavaScript bundle, so anyone can
read it and POST to the Web3Forms endpoint with it. That is inherent to Web3Forms' client-side model,
not a misconfiguration. Mitigate in the Web3Forms dashboard (allowed-domain restriction, spam
protection, or hCaptcha) rather than in code. Note this key is currently **not set** in the Vercel
production environment, so the forms cannot deliver at all — see `docs/DEPLOYMENT.md`.

**`Access-Control-Allow-Origin: *` on static assets.** Vercel's default for static files. Every asset is
public content, so this leaks nothing, but it does permit other sites to hotlink the images and fonts.
Restricting it would require an explicit header rule and risks breaking vendor embeds that fetch our
assets; the bandwidth exposure is judged not worth the risk.

**Security headers are absent on redirect responses.** Vercel's routing layer emits 308s before the
`headers` rules apply, so `/donate-2` → `/donate` carries only Vercel's own HSTS value. A redirect
response has a `text/plain` body and no script context, so the impact is negligible; it is recorded here
so the inconsistency is not mistaken for a regression later.

**One low-severity advisory remains in dev tooling.** `esbuild` (transitive via Vite) allows arbitrary
file read when running the development server on Windows — a risk only while `npm run dev` is running
locally, not in the deployed site. `npm audit fix` cannot resolve it without a breaking Vite upgrade.

**Inline styles preclude a strict `style-src`.** The UI is built from ~264 inline `style=` attributes and
8 `<style>` blocks, so `style-src` requires `'unsafe-inline'`. Tightening this means a large migration to
CSS classes, which is out of scope for a hardening pass.

## Content Security Policy

The CSP is shipped as `Content-Security-Policy-Report-Only`: it reports violations to the browser console
without blocking anything. That is deliberate — this site depends on three vendor embeds for donations
and event registration, and an incorrect enforced CSP fails **silently** from the server's point of view
while breaking the donate button for real donors.

To enforce it:

1. Open the site in a browser with DevTools, then exercise each of: the donate page (Givebutter widget
   and button), the events page (Action Network RSVP embed), the newsletter form, and the contact form.
2. Collect every CSP violation the console reports and add the missing origins to the relevant directive
   in `vercel.json`.
3. Rename the header key from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.
4. Re-test the four flows above plus a completed test donation.

`script-src` currently allows `'unsafe-inline'` for the Feathr pixel in `index.html`. That inline script
is static, so it can be replaced by its SHA-256 hash to drop `'unsafe-inline'` from `script-src` — the
main remaining hardening win once the policy is enforced.

## Reproducing this review

```bash
npm audit --omit=dev                 # production dependency advisories
npm run check:content                # raw-HTML sink guard
npm run check:redirects              # every redirect destination exists in dist/

# Live header + exposure checks
curl -s -D - -o /dev/null https://praxisinitiative.org/
curl -s -o /dev/null -w '%{http_code}\n' https://praxisinitiative.org/.env
curl -s -o /dev/null -w '%{http_code}\n' https://praxisinitiative.org/no-such-page-abc   # expect 404
curl -s -D - -o /dev/null https://praxis-initiative.vercel.app/ | grep -i x-robots-tag   # expect noindex
```

After any dependency bump, run `npm run build` — the prerender step fails loudly on a broken router
context, which is how the two-copy `react-router` problem above was caught.
