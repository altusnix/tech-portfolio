# Portfolio Rebuild — Roadmap v2

**Direction:** The Roster · **Stack:** Astro 7 + React islands + Tailwind v4 · **Host:** Cloudflare Pages
**Audience:** technology hiring managers and recruiters · **Cost:** $0 (domain optional)

Supersedes the original `roadmap_1.md`. That roadmap's Phases 0–4 are substantially built — this version
records real status and folds in a fresh hireability checklist as **Phase 5**. Work top to bottom. Each
phase has a **Done when** — don't start the next phase until it's true.

---

## Phase 0 — Foundations

**Goal:** an empty site deploying automatically on every push.

- [x] Node 22+ confirmed (22.23.2 via nvm)
- [x] Scaffolded: Astro 7, TypeScript strict
- [x] React, Tailwind, sitemap integrations added
- [x] `.nvmrc` set to 22
- [ ] Create repo `robyn-portfolio`, **public**
- [ ] Cloudflare Pages → connect repo (build: `npm run build`, output: `dist`)
- [ ] Push, confirm live on `*.pages.dev`

**Done when:** you push a commit and the live URL updates without you doing anything.
*(Blocked on your GitHub/Cloudflare accounts — not something I can do for you.)*

---

## Phase 1 — Content model

**Goal:** every project described by identical structured fields.

- [x] Schema defined (`src/content.config.ts`) — title, client, dates, myRole, crew, stack, scope, outcome, cover, coverAlt, featured, order
- [x] All 10 projects drafted, including Client Inventory Management Portal (completed using resume detail, not cut)
- [x] Abbvie Skyrizi / TAE Lifesciences / Seagen rewritten with real, distinct scope text (resume-sourced) — no longer duplicated placeholder copy
- [x] GOARMY has real dates (2021–2026) and a real, measurable outcome
- [ ] **8 of 10 projects still need a real outcome metric** — Rentals, Phonebook, Coke/Sonic, Abbvie, TAE, Seagen, Client Portal, Vox Explore Torch, Voximetry 360. Resume didn't call these out individually; need your input or actual numbers.
- [ ] Czarnowski-era projects use an approximate 2016–2021 range (your employment dates there), not exact per-project years — tighten if you know the real ones
- [ ] **Open question:** is "Voximetry" Czarnowski's platform/product name, or a separate real client? Resume suggests the former (collaborative, not solo) — Voximetry 360 / Vox Explore Torch currently still show solo/separate-client, flagged but unresolved

**Done when:** all 10 markdown files have a real outcome metric, not a TODO placeholder.

---

## Phase 2 — Design tokens

**Goal:** every color, size, and font traceable to one file.

- [x] `@theme` block: bone/plum/brass/sage/ink palette, Instrument Serif + Figtree + DM Mono
- [x] Self-hosted via Fontsource, latin subset only
- [x] 6-size type scale, Tailwind defaults reset so nothing else can be used
- [x] Contrast actually verified (not just assumed) — **caught a real bug**: brass on bone is 2.67:1, fails even large-text/non-text minimums, not just body text as originally assumed. Added `--color-brass-dark` (3.53:1) for anything brass on the light background; original brass reserved for plum/ink surfaces
- [x] Focus ring: 3px brass-dark, 3px offset, global `:focus-visible`

**Done when:** ✅ done.

---

## Phase 3 — Components

- [x] `Layout.astro`, `Nav.astro`, `Footer.astro` (footer wasn't in v1, added for social links + "built with" credit)
- [x] `CrewBar.astro` — proportional-segment bar, `role="img"` + full sentence `aria-label`, verified against team of 11 / team of 2 / solo with no special-casing
- [x] `Legend.astro`, `ProjectEntry.astro`, `ArtPlate.astro`
- [x] `ProjectCard.astro` (not in v1) — lighter teaser card for homepage grid, since a full `ProjectEntry` per featured project read as a boring vertical stack

**Done when:** ✅ done.

---

## Phase 4 — Pages

- [x] `/` — hero, leadership stat band (new), featured work as a 3-card grid, client wall, art teaser, contact CTA
- [x] `/work` — all 10 projects, newest-first sort (currently ties on year until Phase 1's dates are filled in)
- [x] `/work/[slug]` — full case study per project
- [x] `/about` — bio, Burton Chill detail, education, recognition, new Skills section
- [x] `/art` — real exhibition timeline, deduped the `5.jpeg` reuse bug (old site used one image for two different shows)
- [x] `/contact`, `/404`
- [x] Client logo wall rebuilt — 6 logos were broken on the old site (malformed inline data-URIs instead of the real files already sitting in `/icons`)
- [x] Location fixed: Detroit Metropolitan Area (was "Digital Realm, Cyberspace")
- [x] Resume link swapped to `Robyn-Stokes-Resume-2026.pdf` (found on your Desktop, matching filename)
- [ ] Homepage hero doesn't currently show name/title/contact info directly (see Phase 5 below)

**Done when:** every route works, no page repeats text verbatim from another. *(True today, modulo the resume-link swap above.)*

---

## Phase 5 — Hireability pass *(new)*

Folded in from a fresh best-practices checklist. Ordered by what's missing vs. what already exists.

- [~] **Personal statement / what you're looking for** — drafted on the homepage (right after the hero), clearly flagged as a TODO for you to edit. Guessed at role type, remote/Chicago preference, and industries — correct or rewrite as needed
- [x] Resume link swapped to the 2026 PDF (see Phase 4)
- [x] **Certifications section — skipped.** No formal certs on the resume (Scrum Master etc. are skills, not credentials); you confirmed no section needed
- [x] **Case study structure** — restructured to explicit problem → role → process → outcome. Added a `problem` field to the schema; `myRole`/crew already covered role, `scope` already covered process. Filled in for all 10 projects — 6 are well-grounded, 4 (Abbvie, TAE, Seagen, Vox Explore Torch, Voximetry 360) are honestly flagged as inferred/unsourced since the resume didn't give a specific brief for those
- [ ] **Testimonials/references** — you declined using the two named LinkedIn recommendations earlier; this checklist raises it again. Reconsider, or still no?
- [x] Featured work curated (3 of 10 flagged featured, not all 10 dumped on the homepage)
- [x] Clear contact method (email + form page)
- [x] Mobile-responsive layout — tested for real via screenshot at 390px width; found and fixed a real horizontal-overflow bug (nav had no mobile treatment at all). Nav rebuilt with a sticky header + no-JS `<details>`/`<summary>` dropdown menu on mobile
- [~] Fast load / optimized images — Astro's `<Image />` already converts covers to responsive WebP (one PNG went 3.9MB → ~11–120KB across breakpoints); Lighthouse confirms 99–100 performance on the routes checked so far

**Done when:** the remaining open content decisions above are made.

- [x] Resume link opens in a new tab (`target="_blank" rel="noopener noreferrer"`, with "(opens in a new tab)" for screen readers)

---

## Phase 5b — Resume password protection *(new, paused)*

**Goal:** the resume link requires a password before the PDF can be viewed or downloaded — for real, not just a UI gate.

**Why this needs care:** this is a static site with no server. A client-side "enter password to unlock the link" prompt is *not* real security — the PDF would still sit at a public URL discoverable via the browser's network tab regardless of any password prompt in front of it. Real protection means the file is never in the public static output at all, and a server-side function checks the password before ever serving the bytes. You confirmed you want the real version, not the soft gate.

**Cost check (you asked):** free for this use case — Cloudflare Pages (hosting) and Pages Functions (the password check) both have generous free tiers a personal-portfolio resume gate will never approach. R2 (where the actual PDF would live) is also free at this scale, but **Cloudflare requires a payment method on file to enable R2 at all**, even though usage stays at $0. That's the one real catch, and it's why we paused to think it through rather than just building it.

**Where this stands right now:**
- [x] The resume PDF must never be committed to git — this repo is meant to be public (Phase 0), and committing the file anywhere in its history defeats a server-side gate entirely. Confirmed `public/resume/` was never previously committed, so no history to clean up.
- [x] `.gitignore` updated with a `.private/` entry (for local-only files never meant to be committed) and `.wrangler/` (local dev state)
- [x] `@cloudflare/workers-types` installed
- [~] Draft-only, not wired up or tested: `wrangler.jsonc` (R2 binding scaffold), `.dev.vars.example`, `functions/api/resume.ts` (a Pages Function that would check a password via constant-time comparison against an env var, then stream the PDF from an R2 bucket). None of this is connected to the live site yet.
- [ ] **Decide:** accept the R2 card-on-file requirement, or use a different storage approach for the gated PDF?
- [ ] Pick the actual password (not something I should choose for you)
- [ ] Build the client-side password form (would need a small React island — this is genuinely the one place a bit of JS is unavoidable, since submitting a password and handling a PDF response can't be done with plain HTML)
- [ ] Wire it into `Nav.astro`, replacing the current plain link
- [ ] Test locally via `wrangler pages dev` with local R2 emulation before touching production
- [ ] Depends on Phase 0 (Cloudflare Pages connected) for a real production test, though local testing via Wrangler doesn't need that

**Current interim state:** the resume link is back to a plain, unprotected link in `public/resume/` (restored so the site isn't left broken mid-feature) — exactly as it was before this phase started. No password protection is live.

**Done when:** the password is real, tested locally via Wrangler, confirmed working after Phase 0's Cloudflare Pages connection goes live, and the plain PDF is removed from `public/resume/` for good.

---

## Phase 6 — Contact form (was Phase 5 in v1)

- [x] Went with Web3Forms over a Cloudflare Worker — no account/card needed, just a free access key by email, and it works with a plain form POST (no JS required at all)
- [x] Honeypot field for spam — a `botcheck` checkbox, hidden via `sr-only` (Web3Forms' documented convention)
- [x] Errors tied to inputs with `aria-describedby` (native HTML5 `required` validation, no custom JS)
- [x] Success message moves focus — solved without any JavaScript: the form redirects to a real `/contact/thank-you` page, so a full page navigation happens, which is a genuinely valid way to satisfy this rather than a JS-driven inline message
- [x] Test with JavaScript disabled — works by construction, since this is a plain HTML form POST, not a fetch/AJAX flow
- [ ] **You need to get a real Web3Forms access key** (free, instant, at web3forms.com) and drop it into `contact.astro` — currently a `TODO-REPLACE-WITH-REAL-WEB3FORMS-KEY` placeholder
- [ ] The `redirect` field is a placeholder domain (`TODO-REAL-DOMAIN`) — needs the real launch domain from Phase 7, since Web3Forms requires an absolute URL there

**Done when:** the real access key and domain are in place, and you submit it from your phone and the email arrives.

---

## Phase 7 — Prove the accessibility claim (was Phase 6 in v1)

- [~] Lighthouse: homepage now scores 100/100/99/100 (a11y/best-practices/perf/SEO) — found and fixed a real bug along the way (footer text at 0.6 opacity landed at 4.38:1, just under the 4.5:1 AA line). Other routes (`/work`, `/about`, `/art`, `/contact`, case studies) still score 94–96 on accessibility and haven't been root-caused yet — paused mid-audit, resume later
- [ ] axe DevTools: zero violations on every route
- [ ] Keyboard only — reach every link, field, submit the form
- [ ] Screen reader — listen to a CrewBar, does it make sense?
- [ ] `prefers-reduced-motion` respected
- [ ] Zoom to 200% — nothing clipped
- [x] Images have real alt text; the one placeholder cover (Seagen) is explicitly flagged as such, not passed off as real
- [x] Images converted to WebP via Astro's `<Image />`
- [ ] Test on a real phone, not just devtools

**Done when:** the scores are real and on the site.

---

## Phase 8 — Launch (was Phase 7 in v1)

- [ ] Cloudflare Web Analytics
- [ ] `robots.txt`, OG image, favicon
- [ ] Open Graph tested on LinkedIn's post composer
- [ ] Domain decision: `*.pages.dev` free, or a real one
- [ ] Redirect old `altusnixportfolio.netlify.app`
- [ ] Update LinkedIn/GitHub profile links
- [ ] README explaining stack choices

**Done when:** it's live, the old URL forwards, and one trusted person has done a cold read.

---

## Order of risk

1. **Phase 1's remaining outcome metrics** — bad/missing data still undercuts the design's whole argument
2. **Phase 5's two open content decisions** (personal statement, certifications) — can't be guessed, only you can answer them
3. **Phase 7** — it's the proof behind the accessibility claim

Everything else can ship at 80%.
