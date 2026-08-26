# Пивара Хмел — Redesign + Per-Beer Pages (Design Spec)

**Date:** 2026-06-27
**Scope:** Redesign the existing static site, elevate the cellar identity, load real
typography, and give every beer its own real page that explains the full brewing process.

## Decisions (locked)

- **1A — Real separate beer pages.** Each beer gets its own HTML file at its own URL
  (`pivo/<slug>.html`). The home one-pager keeps Home/About/Visit/Blog/Contact.
- **2A — Elevate the cellar identity.** Keep the warm roasted-malt/amber direction (it
  matches the bottle photography); rework layout, type, per-beer color theming and motion.
- **Typography:** Oswald (display, condensed tap-room caps) + Montserrat (body) +
  IBM Plex Mono (spec numbers). All Cyrillic-safe. Loaded via Google Fonts (was never
  loaded before — the old CSS named the fonts but no `<link>` existed).

## Architecture

Static, no build step. One shared `styles.css` + one shared `app.js` (single data source).

```
/index.html              Home (elevated). Range strip + beer cards link OUT to beer pages.
/pivo/zrno.html          ┐
/pivo/magla.html         │  5 real beer pages. Each: full header/footer/cookie/lang
/pivo/kaluger.html       │  switcher as real HTML; <body data-beer="slug">; beer-specific
/pivo/opat.html          │  content injected by app.js from the shared `beers` data.
/pivo/koren.html         ┘
/styles.css  /app.js     Shared.
/public/assets/...       Existing brand/bottle/process imagery.
```

- Beer pages reference assets with `../` (e.g. `../styles.css`, `../public/...`,
  `../index.html#beers`).
- Language persists across pages via the existing `pivaraLang` cookie.
- `app.js` becomes page-aware: if `document.body.dataset.beer` is set → render the beer
  page; otherwise render the home page. Every render function guards for missing mounts.
- The old in-place `#beer-detail` swap panel is removed from home; cards/Range become links.

## Beer page anatomy ("the whole process")

1. **Color hero** — bottle photo + the beer's liquid color theming the page (`--beer-color`).
   Name, style, one-line note, key stats.
2. **Brewer's spec sheet** (mono) — ABV · IBU · OG · SRM · Malt · Hops · Yeast · Serve.
3. **Tasting notes + story** — what makes this beer distinctive.
4. **How this beer is made** — a tailored 5-step brewing walkthrough, NEW per-beer content
   in MK + EN, using the `mash`/`hops`/`tanks` process photos. Steps:
   1. Слад и меленье / Malt & milling
   2. Замешување / Mash
   3. Варење и хмел / Boil & hops
   4. Ферментација / Fermentation
   5. Зреење и точење / Conditioning & serving
   Copy is specific to each beer's malt bill, hops, yeast and style.
5. **Pairing & serving** + **"Book a tasting"** CTA (→ `../index.html#contact`).
6. **Prev/next** navigation along the Range (pale → dark).

Data model gains a `brewing` array per beer: `[{ img, title:{mk,en}, body:{mk,en} }]`.

## Visual elevation (keep cellar identity)

- Real fonts loaded; tighter type scale and vertical rhythm.
- Range strip as the signature element: taller, hover-widen, labeled, now a nav of links.
- Refined per-beer color theming (accent, hairlines, soft glow) on each beer page.
- Restrained motion: scroll-reveal fade-up + hover lift, `prefers-reduced-motion` respected.
- Quality floor preserved: visible focus, alt text, real `<title>`/meta per page, responsive
  to 360px.

## Preserved (required-elements checklist)

MK/EN switcher on every page · cookie consent · booking form (+ mailto fallback) ·
contact info · embedded map · blog · team/about · services · footer · responsive.

## Out of scope

Webshop/cart, accounts, backend, more than 2 languages, splitting About/Visit/Blog/Contact
into separate pages (they stay on the home one-pager).
