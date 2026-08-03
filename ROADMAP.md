# Portfolio Rebuild — Roadmap v3

**Direction:** The Roster · **Stack:** Astro 7 + React islands + Tailwind v4 · **Host:** Cloudflare Workers (static assets)
**Audience:** technology hiring managers and recruiters · **Cost:** $0 (domain optional)
**Live at:** `https://tech-portfolio.altusnix.workers.dev/` · **Repo:** `github.com/altusnix/tech-portfolio` (public)

Supersedes `roadmap_1.md` (v1) and the prior version of this file (v2). Work top to bottom. Each phase has a
**Done when** — don't start the next phase until it's true.

---

## What's actually left (read this first)

Everything below this section is done. This is the real, current punch list — ordered by what breaks the
site's core argument if left undone.

1. **🔴 Unverified: live images may still be broken.** Cloudflare deployed this as a **Workers** project, which
   defaults to running Astro in SSR mode — the live site was requesting images through an on-demand
   `/_image?href=...` endpoint that 404s, instead of the pre-built static WebP files our local build produces.
   Just pushed a fix (`wrangler.jsonc` with `assets.directory`, telling Cloudflare to serve `dist/` as pure
   static files, no server code). **Not yet confirmed live** — check `https://tech-portfolio.altusnix.workers.dev/work/goarmy/`
   and look for a normal image, not a broken icon.
2. **7 of 9 projects need a real outcome metric** — Rentals, Phonebook, Coke/Sonic, Abbvie, TAE, Seagen, Client
   Portal. Needs your input; the resume didn't call these out individually. (Phase 1)
3. **Testimonials decision** — declined once already; the hireability checklist raised it again. Final answer,
   or leave as declined? (Phase 5)
4. **Personal statement** — drafted on the homepage, needs your edit (role type, remote/Chicago preference,
   industries were guessed). (Phase 5)
5. **Phase 5b (resume password protection) — fully built and tested locally, only Cloudflare account setup
   left.** Went with KV over R2 (no card needed) and over storing the file on a private GitHub/GitLab repo
   (same setup cost as R2, plus an external API dependency, no real upside). Tested the complete flow via
   `wrangler dev` with the real PDF in local KV: wrong password → 401, correct password → the actual 2-page PDF,
   byte-for-byte. What's left is pure Cloudflare dashboard work: create the real KV namespace, upload the PDF to
   it, set `RESUME_PASSWORD` as a production secret — no more code anticipated.
6. **Phase 7 (accessibility audit) — paused mid-way.** Homepage scores 100/100/99/100 on Lighthouse; other
   routes score 94–96 and haven't been root-caused. Paused once at your request ("skip until more
   components"); more components exist now (gallery, lightbox, tech filters, resume gate).
7. **Employee-directory screenshot excluded from the Phonebook gallery** — real people's names/cell numbers.
   Waiting on your redacted version to add back. (Phase 1)
8. **Phase 8 launch items still open** — OG image, Open Graph testing, the domain decision, the old-Netlify-URL
   redirect, LinkedIn/GitHub profile link updates, README. (Analytics and favicon are done — see Phase 8.)

Phase 6 (contact form) is fully done — confirmed working end-to-end from a real phone submission.

---

## Phase 0 — Foundations ✅

- [x] Node 22+, Astro 7 scaffolded, React/Tailwind/sitemap integrations, `.nvmrc`
- [x] Repo public at `github.com/altusnix/tech-portfolio`
- [x] Connected to Cloudflare, live at `https://tech-portfolio.altusnix.workers.dev/` and auto-deploying on push
- [x] **Two real deploy failures diagnosed and fixed along the way:**
  - `wrangler.jsonc` originally used `pages_build_output_dir` (a **Pages-only** field) on what turned out to be a
    **Workers** project — meaningless there, and the mismatch broke the first deploy (`Missing entry-point to
    Worker script or to assets directory`)
  - Corrected to `assets.directory`, the actual Workers static-assets config — this is what's pending
    verification at the top of this document

**Done when:** a push updates the live URL with no manual steps. *(True — auto-deploy confirmed working; image serving is the one open question.)*

---

## Phase 1 — Content model

**Goal:** every project described by identical structured fields, backed by real outcomes.

- [x] Schema (`src/content.config.ts`): title, client, dates, myRole, crew, stack, problem, scope, outcome,
  cover, coverAlt, gallery, featured, order
- [x] 9 projects (was 10 — Voximetry 360 and Vox Explore Torch merged into one, see below)
- [x] Abbvie/TAE/Seagen rewritten with real, distinct scope text — no longer duplicated placeholder copy
- [x] GOARMY has real dates (2021–2026) and a real outcome (millions of monthly visitors, promoted within 14 months)
- [x] **Voximetry/Explore Torch merge, backed by evidence, not just inference.** A screenshot literally shows a
  nav menu reading "Lobby / Torch Lab / Discovery Center" inside one branded environment — they were the same
  platform, not two clients. Also corrected the "solo" framing to match the resume's account of collaborative work.
- [x] Image galleries added for Coke/Sonic (6), Voximetry (6), TAE (1), Phonebook (1) — every image visually
  reviewed and attributed by hand, not guessed from filenames (this review is what caught the PII issue below)
- [ ] **7 of 9 projects still need a real outcome metric** (see punch list above)
- [ ] Czarnowski-era projects use an approximate 2016–2021 range, not exact per-project years
- [ ] Phonebook gallery missing one image pending your redaction (real employee PII — names, cell numbers —
  excluded on sight rather than published)

**Done when:** all 9 files have a real outcome metric, not a placeholder.

---

## Phase 2 — Design tokens ✅

- [x] `@theme` palette (bone/plum/brass/sage/ink), Instrument Serif + Figtree + DM Mono, self-hosted
- [x] 6-size type scale, Tailwind defaults reset so nothing outside it can be used
- [x] **Caught a real contrast bug**, not just assumed: brass on bone measured 2.67:1, failing even large-text
  minimums. Added `--color-brass-dark` (3.53:1) for the light background; original brass reserved for plum/ink.
- [x] Focus ring: 3px brass-dark, 3px offset, global

**Done when:** ✅ done.

---

## Phase 3 — Components ✅

- [x] `Layout`, `Nav` (sticky, no-JS mobile disclosure menu), `Footer`
- [x] `CrewBar` — proportional-segment bar, `role="img"` + full sentence `aria-label`; verified against team
  of 11 / team of 2 / solo with no special-casing
- [x] `Legend`, `ProjectEntry`, `ArtPlate`, `ProjectCard` (lighter teaser card, added when a full `ProjectEntry`
  per homepage feature read as a boring stack)
- [x] `ProjectGallery` + `Lightbox` (React island, `client:visible`) — keyboard nav, focus trap, focus-return-on-close
- [x] Tech stack pills are real filters (`/work/tech/[tech]`, 22 statically-generated pages)

**Done when:** ✅ done.

---

## Phase 4 — Pages ✅

- [x] `/`, `/work`, `/work/[slug]`, `/work/tech/[tech]`, `/about`, `/art`, `/contact` + `/contact/thank-you`, `/404`, `/process`
- [x] Client logo wall rebuilt (6 logos had malformed inline data-URIs on the old site) and later **fixed a
  real Chromium bug**: SVGs loaded via `<img>` with only a `viewBox` collapse to zero size inside CSS Grid with
  `justify-items: center` — AbbVie, GM, Grainger, Lexus, Porsche, Coca-Cola were all silently invisible
- [x] Location fixed (Detroit Metro), resume link swapped to the 2026 PDF
- [x] **Fixed a real navigation dead-end**: `/work` used to render full case-study content inline for every
  project, so nothing ever linked to `/work/[slug]` — those pages were only reachable by typing the URL
  directly. Now a `ProjectCard` grid that actually links through.

**Done when:** every route works, no page repeats text verbatim from another. ✅ true today.

---

## Phase 5 — Hireability pass

- [~] Personal statement — drafted, needs your edit (see punch list)
- [x] Certifications section skipped (confirmed with you — nothing formal on the resume to list)
- [x] Case study structure — explicit problem → role → process → outcome, schema-enforced
- [ ] Testimonials/references — open question (see punch list)
- [x] Featured work curated (3 of 9), clear contact method, mobile-responsive (see Phase 4 nav fix), fast/optimized images
- [x] Resume link opens in a new tab

**Done when:** the two open content decisions above are made.

---

## Phase 5b — Resume password protection

**Goal:** the resume link requires a real password before the PDF can be viewed or downloaded — not just a UI gate.

A client-side "enter password" prompt isn't real security on a static site; the file would still sit at a
public URL discoverable via devtools regardless. Real protection means the file is never in the public static
output, and a server-side function checks the password before serving it.

**Storage: went with Cloudflare KV, not R2.** You considered storing the file on GitHub/GitLab instead — same
problem either way: it would need a *separate private* repo (the current one is public) plus an access token
managed as a secret plus an external API call on every request. KV needed none of that: no card on file (unlike
R2), no new account, no external dependency, native to the same platform already hosting the site. Binary
values up to 25MB are fine for one small PDF.

- [x] PDF confirmed never committed to git history; `.gitignore` covers `public/resume/`, `.private/`, `.wrangler/`
- [x] **Architecture corrected first** — the original `functions/api/resume.ts` assumed Cloudflare **Pages**
  Functions (file-based routing), but this project is actually a **Workers** project with static-assets hosting,
  where that convention doesn't apply — it would've been dead code, never invoked. Replaced with
  `worker/index.ts`: a real Worker `fetch` handler that intercepts `POST /api/resume` and falls back to
  `env.ASSETS.fetch()` for everything else (the standard "Workers + static assets" pattern).
- [x] Password picked, wired into `.dev.vars` (gitignored, local-only)
- [x] Client-side form built: `ResumeGate.tsx` (React island, `client:idle`), wired into `Nav.astro` desktop and
  mobile — popover with password input, inline error message, Escape/click-outside to close, focus returns to
  the trigger button on close
- [x] **Tested for real end-to-end via `wrangler dev` with the actual PDF in local KV** (`wrangler kv key put
  ... --local`), not just the auth check in isolation:
  - Wrong password → `401 "Incorrect password"`
  - Correct password → `200`, real PDF returned, 124,377 bytes matching the source file exactly, verified as
    a valid 2-page PDF via `file`
- [ ] **Production setup still needed** (all requires your Cloudflare account, not something done from here):
  - Create the real KV namespace (`wrangler kv namespace create RESUME_KV` or via the dashboard) and swap the
    placeholder id in `wrangler.jsonc`
  - Upload the real PDF to that namespace (`--remote`, not `--local`)
  - Set `RESUME_PASSWORD` as a secret in the Cloudflare dashboard (`.dev.vars` only covers local testing)
  - Confirm live, then remove the plain unprotected copy from `public/resume/` for good

**Current state:** everything is built and proven working locally. What's left is entirely account setup on
Cloudflare's side — no more code changes anticipated unless something unexpected comes up in production.

**Done when:** the real namespace exists, the real PDF is in it, the password secret is set, and the live gate works.

---

## Phase 5c — "How this site was built" ✅

A distinctive idea, not from the original checklist: show the actual artifact of "AI-augmented development"
instead of just claiming it.

- [x] `/process` — real, curated highlights: the contrast bug, the Chromium SVG-in-grid bug, the PII catch, the
  Voximetry merge, the schema-enforced case study structure
- [x] Links straight to this file on GitHub so the claim is checkable, not just written
- [x] Linked from the footer's "Built with..." line

**Done when:** ✅ done.

---

## Phase 6 — Contact form

- [x] Web3Forms over a Cloudflare Worker — no account/card needed, plain form POST, zero JS required
- [x] Honeypot field, `aria-describedby` errors via native HTML5 validation
- [x] Success state moves focus for free — redirects to a real `/contact/thank-you` page (full navigation, no
  JS-driven inline message needed)
- [x] Works with JS disabled by construction (plain POST, not fetch/AJAX)
- [x] Real access key and real domain wired in everywhere (`contact.astro`, `astro.config.mjs`'s `site` field,
  `robots.txt`) — this is also what finally made the sitemap generate; it had been silently skipped all session
  for lack of a `site` value
- [x] Real end-to-end test: submitted from your phone, confirmed the email arrived

**Done when:** ✅ done.

---

## Phase 7 — Prove the accessibility claim (paused)

- [~] Lighthouse: homepage scores 100/100/99/100 (a11y/best-practices/perf/SEO). **Caught a real bug getting
  there**: footer text at 0.6 opacity measured 4.38:1, just under the 4.5:1 AA line. Other routes (`/work`,
  `/about`, `/art`, `/contact`, case studies) score 94–96 and haven't been root-caused — paused at your request
  to wait for more components; those now exist (gallery, lightbox, tech filters)
- [ ] axe DevTools zero violations, keyboard-only pass, screen reader pass on a CrewBar, `prefers-reduced-motion`, zoom to 200%
- [x] Real alt text everywhere; the one placeholder cover (Seagen) is explicitly flagged as such
- [x] WebP via Astro's `<Image />`
- [ ] Test on a real phone

**Done when:** the scores are real and on the site.

---

## Phase 8 — Launch

- [x] Analytics — went with Google Analytics (gtag) instead of Cloudflare Web Analytics; snippet wired into `Layout.astro`'s `<head>`, loads on every page
- [x] `robots.txt` done, `favicon.svg` already replaced with an on-brand CrewBar-inspired mark (bone/plum/brass bars) earlier this session — not Astro's default logo as previously noted here
- [ ] OG image still open
- [ ] Open Graph tested on LinkedIn's post composer
- [ ] Domain decision: keep `*.workers.dev`, or a real one
- [ ] Redirect old `altusnixportfolio.netlify.app`
- [ ] Update LinkedIn/GitHub profile links
- [ ] README explaining stack choices

**Done when:** it's live, the old URL forwards, and one trusted person has done a cold read.
