# Praxis Initiative Website — Button & Link Audit Report
**Date:** July 20, 2026  
**Scope:** Every button, link, form, and interactive control across all pages and components  
**Status:** 19 routes audited | 80+ controls catalogued | 3 issues found

---

## 1. ROUTE MAP — All Internal Destinations (VALID)

All routes defined in `src/App.tsx` resolve to real page components. No 404s from internal navigation.

| Route | Page | Status |
|-------|------|--------|
| `/` | HomePage | OK |
| `/about` | AboutPage | OK |
| `/programs` | ProgramsPage | OK |
| `/oversight` | OversightPage | OK |
| `/policy` | PolicyPage | OK |
| `/training` | TrainingPage | OK |
| `/arts` | ArtsPage | OK |
| `/resources` | ResourcesPage | OK |
| `/news` | NewsPage | OK |
| `/news/:slug` | BlogArticlePage | OK |
| `/contact` | ContactPage | OK |
| `/donate` | DonatePage | OK |
| `/action` | ActionCenterPage | OK |
| `/partners` | PartnersPage | OK |
| `/privacy-policy` | PrivacyPolicyPage | OK |
| `/terms-of-use` | TermsOfUsePage | OK |
| `/accessibility` | AccessibilityPage | OK |
| `*` | NotFoundPage | OK |

---

## 2. GLOBAL NAVIGATION & FOOTER

### Desktop & Mobile Nav (`src/components/Navigation.tsx`)
- **Brand link** → `/`  
- **Nav links (11)** → `/about`, `/programs`, `/action`, `/partners`, `/oversight`, `/policy`, `/training`, `/arts`, `/resources`, `/news`, `/contact`  
- **Donate button** → `/donate`  
- **Skip-to-content** → `#main-content` (valid anchor on `<main>`)  
- **Mobile hamburger** → toggles overlay menu (no routing issues)  
- **Status:** ALL VALID

### Footer (`src/sections/Footer.tsx`)

**Navigate column:**
- Home → `/`
- About → `/about`
- Programs → `/programs`
- Action Center → `/action`
- Partners → `/partners`
- Independent Oversight → `/oversight`
- Policy & Advocacy → `/policy`
- Training → `/training`
- Arts in Prison → `/arts`

**Resources column:**
- Resources Hub → `/resources`
- News & Blog → `/news`
- Contact Us → `/contact`
- Donate → `/donate`

**Contact:**
- `mailto:info@praxisinitiative.org` (valid email link)

**Social Links (external, HTTPS, target="_blank"):**
- Facebook → `https://www.facebook.com/profile.php?id=61570241575216`
- Instagram → `https://www.instagram.com/praxis_in_az/`
- X (Twitter) → `https://x.com/PraxisInAZ`
- LinkedIn → `https://www.linkedin.com/company/praxis-initiative-az`

**Bottom bar legal:**
- Privacy Policy → `/privacy-policy`
- Terms of Use → `/terms-of-use`
- Accessibility → `/accessibility`

**Newsletter Sign Up:**
- Submits to `submitForm({ form: 'newsletter', email })` via `src/lib/api.ts`
- **Note:** If `VITE_FORM_ENDPOINT` is not configured in production, the form will show a success message but **no email will actually be sent** (dev-mode fallback).

**Status:** ALL VALID. Email and social links are correct.

---

## 3. DONATE CONTROLS AUDIT

### Question: Where does "Donate" go?

| Location | Destination | Notes |
|----------|-------------|-------|
| Nav (desktop + mobile) | `/donate` | OK |
| Footer | `/donate` | OK |
| Home — Hero | `/donate` | OK |
| Home — DonationSection amount chips ($25/$50/$100/$250/$500/Other) | `/donate` | OK (just navigates to full donate page) |
| Home — DonationSection "Donate Now" | `/donate` | OK |
| Home — FinalCTA | `/donate` | OK |
| Oversight page CTA | `/donate` | OK |
| Arts page CTA | `/donate` | OK |

### DonatePage (`src/pages/DonatePage.tsx`)
- **Actual donation form:** Feathr embed (`<div id="myForm" data-feathr-form="6a302dbd8417097454cb2867" />`)
- **Feathr script:** Loaded in `index.html` from `https://fthr-content.praxisinitiative.org/forms-js/embed-v2.js`
- **Institutional giving contact:** `mailto:info@praxisinitiative.org`
- **Status:** Donation links all route to `/donate`, which renders the Feathr form. **The Feathr form itself is dependent on their external script loading correctly.**

---

## 4. "JOIN US" / "JOIN THE MOVEMENT" CONTROLS AUDIT

| Location | Destination | Notes |
|----------|-------------|-------|
| Home — Hero | `/action` | OK |
| Home — JusticeManifesto | `/action` | OK |
| Home — FinalCTA | `/action` | OK |

### ActionCenterPage (`src/pages/ActionCenterPage.tsx`)
- **3 Active Petitions** embedded via ActionNetwork widgets (external):
  1. "Let Arizona's Non-Violent Offenders Work..." — `https://actionnetwork.org/widgets/v6/petition/sign-now-let-arizonas-non-violent-offenders-work-support-their-families-and-come-home`
  2. "Governor Hobbs: Sign the Funding Bill..." — `https://actionnetwork.org/widgets/v6/petition/governor-hobbs-sign-the-funding-bill-arizonas-prison-oversight-office-cant-wait`
  3. "Tell Governor Hobbs... Withdraw the Jensen Appeal" — `https://actionnetwork.org/widgets/v6/petition/tell-governor-hobbs-attorney-general-kris-mayes-and-director-ryan-thornell-withdraw-the-jensen-appeal`
- **Events "Learn More"** → `/contact` (not a direct signup link — just goes to contact page)
- **Status:** Petition scripts load dynamically. If ActionNetwork is down or blocked, the embeds will fail silently.

---

## 5. "LEARN MORE" CONTROLS AUDIT

| Location | Destination | Notes |
|----------|-------------|-------|
| Home — CorePrograms (Oversight card) | `/oversight` | OK |
| Home — CorePrograms (Reform card) | `/policy` | OK |
| Home — CorePrograms (Training card) | `/training` | OK |
| Home — CorePrograms (Arts card) | `/arts` | OK |
| Home — LeadershipSection "Full Bio" | `/about` | OK |
| ProgramsPage — "Learn More" (Oversight) | `/oversight` | OK |
| ProgramsPage — "Learn More" (Training) | `/training` | OK |
| ProgramsPage — "Learn More" (Arts) | `/arts` | OK |
| ProgramsPage — "Learn More" (Reform/default) | `/policy` | OK |
| BlogArticlePage — "Learn About Us" | `/about` | OK |
| ActionCenter — Events "Learn More" | `/contact` | OK |

---

## 6. CONTACT & FORM CONTROLS AUDIT

### ContactPage (`src/pages/ContactPage.tsx`)
- **Form fields:** Name, Email, Phone, Organization, Reason (dropdown), Message, Consent checkbox
- **Submit action:** `submitForm({ form: 'contact', ... })` → `src/lib/api.ts`
- **Email link:** `mailto:info@praxisinitiative.org`
- **Status:** Same caveat as newsletter — if `VITE_FORM_ENDPOINT` is unset, form appears to succeed but no message is actually sent.

### Footer Newsletter
- Same `submitForm` API as contact form.

---

## 7. EXTERNAL LINKS AUDIT

| Link | URL | Status |
|------|-----|--------|
| Facebook | `https://www.facebook.com/profile.php?id=61570241575216` | OK |
| Instagram | `https://www.instagram.com/praxis_in_az/` | OK |
| X/Twitter | `https://x.com/PraxisInAZ` | OK |
| LinkedIn | `https://www.linkedin.com/company/praxis-initiative-az` | OK |
| AFSC Arizona | `https://www.afsc.org/office/arizona` | OK |
| Arizona Justice Project | `https://www.azjusticeproject.org` | OK |
| Crossroads Programs | `https://www.crossroadsprograms.org` | OK |
| Dream.Org | `https://dream.org` | OK |
| FWD.us | `https://www.fwd.us` | OK |
| Phoenix Indian Center | `https://www.phoenixindcenter.org` | OK |
| ACESDV | `https://www.acesdv.org` | OK |
| Reframe Reentry | `https://reframereentry.org` | OK |
| ActionNetwork petition 1 | `https://actionnetwork.org/widgets/v6/petition/...` | OK (script) |
| ActionNetwork petition 2 | `https://actionnetwork.org/widgets/v6/petition/...` | OK (script) |
| ActionNetwork petition 3 | `https://actionnetwork.org/widgets/v6/petition/...` | OK (script) |
| Feathr forms embed JS | `https://fthr-content.praxisinitiative.org/forms-js/embed-v2.js` | OK (script) |
| Feathr boomerang | `https://cdn.feathr.co/js/boomerang.min.js` | OK (script) |
| Twitter share (blog) | `https://twitter.com/intent/tweet?...` | OK |
| Facebook share (blog) | `https://www.facebook.com/sharer/sharer.php?...` | OK |
| LinkedIn share (blog) | `https://www.linkedin.com/shareArticle?...` | OK |

---

## 8. ISSUES FOUND

### ISSUE 1: CRITICAL — Resources Page Cards Are Not Clickable
**File:** `src/pages/ResourcesPage.tsx`  
**Lines:** 107–153  
**Problem:** Every resource card shows a "Download" or "View" label but the card has **no `href`, no `onClick`, and no `<Link>`**. Users cannot actually access any resources. These are purely decorative UI elements.

**Evidence:**
```tsx
<span>
  {resource.type === 'link' ? <><ExternalLink size={12} /> View</> : <><Download size={12} /> Download</>}
</span>
```
There is no wrapping `<a>` or `<Link>`.

**Fix:** Wrap each card in a link:
- For `type: 'link'` → `<a href={resource.url} target="_blank">`
- For `type: 'document'` / `'report'` → `<a href={resource.url} download>` or `<Link to={resource.path}>`
- **However:** The `Resource` interface does not currently have a `url` or `path` property. You need to add one.

---

### ISSUE 2: WARNING — Contact & Newsletter Forms May Fail Silently in Production
**File:** `src/lib/api.ts`  
**Problem:** If the environment variable `VITE_FORM_ENDPOINT` is not configured on Vercel, both the Contact form and Newsletter form will:
- Show a success message
- NOT actually send any email or store any data

**Evidence:**
```ts
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
if (!FORM_ENDPOINT) {
  return { success: true, message: 'Form submitted (development mode — no email sent).' };
}
```

**Fix:** Set `VITE_FORM_ENDPOINT` in your Vercel environment variables to a working endpoint (Formspree, Web3Forms, Netlify Forms, or your own backend).

---

### ISSUE 3: MINOR — Dead Config File Contains Stale Navigation Data
**File:** `src/config.ts`  
**Lines:** 96–104, 106–115  
**Problem:** `navigationConfig` and `heroConfig` contain old anchor-based links (`#about`, `#programs`, `#impact`, `#footer`) and a CTA target (`philosophy`) that are **not used anywhere** in the actual app. The real navigation is hardcoded in `Navigation.tsx`. This is not a user-facing bug but creates maintenance confusion.

**Fix:** Remove or update `navigationConfig` and `heroConfig` to match the actual router-based navigation, or delete them if unused.

---

### ISSUE 4: INFO — ProjectDetail Component Is Unreachable
**File:** `src/pages/ProjectDetail.tsx`  
**Problem:** This component exists but is **not imported or routed** in `App.tsx`. It is dead code. No user can ever reach it.

**Fix:** Either add a route for it or delete the file.

---

## 9. SUMMARY TABLE

| Category | Count | Issues |
|----------|-------|--------|
| Internal links (Nav + Footer) | 22 | 0 |
| Page-to-page CTAs | 30+ | 0 |
| Social / external links | 12 | 0 |
| Donate buttons | 9 | 0 |
| Join Us / Action buttons | 4 | 0 |
| Contact / form buttons | 2 | 1 (no endpoint configured) |
| Resources | 16 | **1 critical (not clickable)** |
| Partner links | 8 | 0 |
| Blog share buttons | 3 | 0 |
| Dead code routes | 1 | 1 (ProjectDetail unused) |

---

## 10. RECOMMENDED PRIORITY FIXES

1. **HIGH:** Add real URLs to the Resources page cards so users can actually download/view documents.
2. **HIGH:** Configure `VITE_FORM_ENDPOINT` in production environment variables so contact and newsletter forms actually work.
3. **LOW:** Remove or clean up stale config in `src/config.ts`.
4. **LOW:** Remove `ProjectDetail.tsx` if it will not be used.

---

*Audit conducted on source files in `C:\Users\johnf\Desktop\New-Praxis-Website5.3.26-Backup`*
