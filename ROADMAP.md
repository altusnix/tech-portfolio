# Portfolio Rebuild — Roadmap v4: Job-Search Ready

**Direction:** The Roster · **Stack:** Astro 7 + React islands + Tailwind v4 · **Host:** Cloudflare Workers (static assets + KV)
**Audience:** technology hiring managers and recruiters · **Live:** `https://tech-portfolio.altusnix.workers.dev/`
**Repo:** `github.com/altusnix/tech-portfolio` (public)

Supersedes `ROADMAP.md` v3. That version tracked the rebuild itself (content model, components, pages,
resume gate, contact form, Lighthouse accessibility — all done). This version is the final push: making sure
the site is actually safe to hand to a hiring manager today. Reordered from how you listed it, by what breaks
things worst if skipped and what blocks what else.

---

## Phase A — Stop the bleeding: remove visible placeholder text 🔴

**Do this before anything else.** Verified live, right now:
- `/art` shows the literal text **"TODO: confirm city"** five times (Philadelphia/TriState, Tangent Gallery,
  Boomer Gallery, BWAC, and the 2020 Nasty Women show) — this pulls into the homepage's art teaser too
- Homepage's client wall has one logo with alt text **"TODO: unidentified client"**
- `/work/seagen` shows a placeholder graphic that visibly reads **"Cover image pending"**

None of this is a code comment — it's real text a visitor sees. A recruiter opening the site today would see it.

- [ ] Exhibition cities: either get the real ones from you, or rewrite those five entries to omit the city
  cleanly (venue name alone reads fine; "TODO: confirm city" does not)
- [ ] The unidentified client logo: confirm who it is, or drop it from the wall entirely — a wrong guess is
  worse than one fewer logo
- [ ] Seagen cover: needs a real screenshot, or the entry should explain there's no visual (a text-only card
  reads as intentional; "pending" reads as unfinished)
- [ ] Client Inventory Portal also has a placeholder cover — same treatment

**Done when:** `curl`-ing every route for the string "TODO" returns nothing.

---

## Phase B — Content cleanup: accuracy, spelling, grammar

Everything else in "content cleanup" that isn't visibly broken but isn't finished either.

- [ ] **7 of 9 projects still need a real outcome metric** (Rentals, Phonebook, Coke/Sonic, Abbvie, TAE, Seagen,
  Client Portal) — this is the single biggest lever left for "represents my abilities well." A case study
  with problem/role/process but no outcome reads as unfinished, not as a project with no results.
- [ ] Czarnowski-era projects use an approximate 2016–2021 range rather than exact per-project years — tighten
  if you know the real ones
- [ ] Testimonials — final answer: use the two LinkedIn ones, find others, or confirm skip for good
- [ ] A full read-through of every page for typos, awkward phrasing, and the handful of scope/problem
  statements flagged in the content files as "inferred, not sourced" (Abbvie, Seagen, Voximetry) — either
  confirm they're accurate or correct them
- [ ] Confirm the resume PDF itself (the actual file in KV) is current and consistent with what's on the
  site — same dates, same employment status, no contradictions between the two

**Done when:** nothing on the site is a guess, a placeholder, or stale.

---

## Phase C — QA: does everything actually work

Functional testing against final content, not the placeholder-era build.

- [ ] Every internal link resolves — worth an actual crawl now, since the project count changed (10 → 9) and
  one route (`/work/vox-explore-torch`) no longer exists; confirm nothing still points to it
- [ ] Contact form: already confirmed working end-to-end from a phone — re-confirm once content changes land
- [ ] Resume gate: already confirmed working end-to-end against production — re-confirm after any further
  changes near this area
- [ ] Mobile: re-check beyond the one breakpoint (390px) already fixed — a few sizes, both nav states
- [ ] Real browser + real device pass — everything so far has been headless Chrome; Safari (a lot of hiring
  managers are on Mac) and an actual phone haven't been tried yet
- [ ] 404 page actually reachable and correctly styled for a genuinely broken URL
- [ ] Every image loads (broken image icons are as bad as placeholder text for "represents me well")

**Done when:** a real click-through on a real phone in a real browser turns up nothing broken.

---

## Phase D — Usability: the manual accessibility passes Lighthouse can't automate

Lighthouse accessibility is 100/100 on every route — that's the automatable third of the claim. These are the
parts that need an actual human pass:

- [ ] **Keyboard only.** Unplug the mouse. Reach every link, every field, the resume gate, the lightbox, submit
  the form. The lightbox and resume gate both have custom focus-trap code that's only been verified by reading
  it, not by actually tabbing through it.
- [ ] **Screen reader.** VoiceOver (built into macOS) is free and right there. Specifically listen to a CrewBar
  — does the sentence it announces actually make sense out loud?
- [ ] `prefers-reduced-motion` — confirm the lightbox/gallery transitions respect it
- [ ] Zoom to 200% — nothing clipped, nothing forcing horizontal scroll
- [ ] Does the site make sense to someone who's never seen it, on a first read, with no context? (Worth an
  actual cold read from one person you trust, not just AI review.)

**Done when:** you've personally done the keyboard and screen-reader pass, not just read that the code should support it.

---

## Phase E — Lighthouse scores, all four categories, every route

Accessibility is done and verified (100/100 everywhere, genuinely zero failing audits, confirmed twice this
session). Performance, Best Practices, and SEO were only spot-checked on the homepage early on — worth a full
sweep now that a lot has changed since (Google Analytics added, resume gate, lightbox, more images).

- [ ] Re-run all four categories on `/`, `/work`, a case study, `/about`, `/art`, `/contact`, a tech-filter page
- [ ] Performance: Google Analytics' `gtag.js` is a render-blocking-adjacent third-party script — worth
  confirming it isn't dragging the score down, and adding `async`/checking load order if it is
- [ ] Best Practices and SEO: fix whatever specifically comes up, the same way accessibility was handled (real
  bugs found and fixed, not just re-running until the number looks right)

**Done when:** real scores, not assumed ones, across every route — and they're good.

---

## Phase F — SEO

Sitemap and `robots.txt` already work (fixed earlier this session). What's still missing:

- [ ] **Open Graph tags** — `Layout.astro` has a plain `<meta name="description">` but no `og:title`,
  `og:description`, `og:image`, or `twitter:card`. Right now, pasting this URL into LinkedIn or Slack shows
  nothing useful. This matters a lot for a job search specifically, since the link will get shared.
- [ ] **OG image** — a real 1200×630 social preview image; there was an abandoned draft for this earlier in the
  session, worth finishing now that the hero copy is finalized
- [ ] Test the result by actually pasting the URL into LinkedIn's post composer
- [ ] Consider JSON-LD structured data (Person schema) — helps Google understand who you are for anyone
  searching your name directly, which recruiters do
- [ ] Per-page `<title>` tags — spot check they're all unique and descriptive (mostly already true, worth confirming)

**Done when:** sharing the link anywhere shows a real preview, and the site is legible to search engines as "Robyn Stokes, Technology Lead."

---

## Phase G — Analytics

Google Analytics is installed and confirmed compiling correctly into every page. Not yet confirmed as
*receiving* real data.

- [ ] Open GA's real-time report, visit the site yourself, confirm the hit shows up
- [ ] Decide if you want to track anything beyond pageviews (e.g., resume-gate opens, contact form submits) —
  optional, not required for launch

**Done when:** you've watched a real visit show up in GA's dashboard.

---

## Phase H — Design and content representing you at your best

This is the holistic pass — less a checklist, more a final review once A–G are done, since most of what makes
this true is already covered above (real outcome metrics, no placeholders, working everything, provable
accessibility). What's left is judgment, not mechanics:

- [ ] Read `/work` end to end as if you were a hiring manager with five minutes — does the strongest work lead?
  (Featured projects are currently GOARMY, Rentals, Voximetry — worth reconsidering once outcome metrics exist
  for everything, since the best 3 might change once every project actually has a number attached)
- [ ] Confirm the personal statement and hero both still feel accurate now that they've been reworded away
  from the LinkedIn original
- [ ] `/process` page — still accurate and worth keeping visible, given how much real engineering judgment
  happened this session (the SVG grid bug, the brass-dark contrast bug caught twice, the Voximetry merge). Consider
  adding 1–2 more entries from this later work (the Workers-vs-Pages architecture correction is a genuinely
  good story for a technology-lead audience).

**Done when:** you'd actually send this link to someone whose opinion you care about.

---

## Phase I — Other things worth doing (my additions)

Things not on your list but worth flagging for a job-search-ready site:

- [ ] **Domain.** Still on `tech-portfolio.altusnix.workers.dev` — a real domain (even a cheap one,
  ~$12/yr) reads more professional to a hiring manager than a raw `*.workers.dev` subdomain. Your call on
  whether that's worth it.
- [ ] **Update LinkedIn and GitHub profile links** to point at this new site — still says the old Netlify
  URL wherever it's referenced externally
- [ ] **Redirect the old `altusnixportfolio.netlify.app`** to the new site, if you still control that domain,
  so old links (résumés you've already sent, old LinkedIn posts) don't dead-end
- [ ] **README** in the repo explaining the stack — hiring managers who click through to the public GitHub repo
  (and some will, given the "How this site was built" page invites exactly that) will read it
- [ ] **A cold read from one real person** before you start actively sharing the link — everything above is
  mechanical; a fresh pair of human eyes catches what process can't

---

## Order of risk

If time runs short, protect these in order:

1. **Phase A** — visible placeholder text is actively embarrassing; this is non-negotiable before sharing the link anywhere
2. **Phase B's outcome metrics** — the single biggest lever for making the case studies actually persuasive
3. **Phase F's OG image/tags** — the link will get shared; right now sharing it shows nothing
4. **Phase D's manual accessibility passes** — the site's whole differentiator is an accessibility-led claim; it needs to survive a real human using it, not just an automated score

Everything else can ship at 80% and improve after you're actively interviewing.
