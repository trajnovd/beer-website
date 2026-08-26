# beer-website

Presentation site for **Пивара Хмел**, a small-batch craft brewery in Skopje —
five bottled beers, brewery tours and tastings. Static HTML, CSS and vanilla
JavaScript, bilingual (Macedonian / English), no build step.

Built for the FCSE *Business Practice 2025/2026* project assignment.

## Run it

```bash
npm run dev          # serves on http://localhost:5173
```

Any static file server works — there is nothing to compile.

## Check the brewing data

```bash
npm run check
```

Verifies the brew-sheet maths behind the beer-page animation across all five
recipes in both languages: liquid level never falls, colour never walks
backwards, the boil is the hottest stage, and every derived final gravity lands
between 1.000 and its original gravity.

## Layout

```
index.html              one-page site: beers, brewing, team, visit, FAQ, blog, contact
pivo/<slug>.html        one page per beer; the body is injected from app.js
app.js                  all content + rendering: beers, services, FAQ, posts, i18n
styles.css              design tokens and every component
public/assets/          photography (JPEG, sized for display)
public/vendor/          GSAP and Three.js, vendored so the site works offline
check-brew.mjs          assertions for the brewing model
```

## How the beer pages work

`app.js` holds one `beers` array. A beer page sets `<body data-beer="slug">` and
everything on it — hero, spec sheet, five brewing steps, prev/next — is rendered
from that entry, so each beer's copy lives in exactly one place.

The scroll animation beside the brewing steps is a **sight glass**, the level
tube on a real brewhouse tank. It is driven entirely by data already in the
recipe: liquid colour walks the standard SRM chart from pale wort to the beer's
measured SRM, final gravity is derived from OG and ABV, and fermentation
temperature comes from the yeast each recipe names. A pale lager barely shifts
colour; the porter runs almost black.

## Notes

- Content is visible without JavaScript. `.reveal` only hides behind
  `html[data-motion="on"]`, which JS sets, so a crawler or a failed script still
  sees every section.
- `prefers-reduced-motion` disables the bubbles, the boil and all reveals.
- Full-resolution PNG sources for the photography are kept outside this repo.
