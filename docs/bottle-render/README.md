# Bottle lighting review

All captures use the locally built `dist/` site at http://127.0.0.1:5186,
served with `python3 -m http.server 5186 --bind 127.0.0.1 --directory dist`.
Desktop: Chromium, 1440 × 1000 viewport, device scale 2, dark theme,
reduced motion, consent dismissed, fonts loaded. PNGs crop the actual product
section, including its dark green page background. No image colour adjustments.

[All five, before above / after below](comparison.png)

| Bottle | Before | After |
| --- | --- | --- |
| Zrno | [PNG](before/zrno.png) | [PNG](after/zrno.png) |
| Magla | [PNG](before/magla.png) | [PNG](after/magla.png) |
| Kaluger | [PNG](before/kaluger.png) | [PNG](after/kaluger.png) |
| Opat | [PNG](before/opat.png) | [PNG](after/opat.png) |
| Koren | [PNG](before/koren.png) | [PNG](after/koren.png) |
| Homepage Zrno | [PNG](before/home-zrno.png) | [PNG](after/home-zrno.png) |

Additional [mobile Koren](after/mobile-koren.png) at a 390 × 844 viewport.

## Exact changes in scene.js

- Enable `THREE.ColorManagement.enabled`: r150 defaults to disabled. Existing hex
  colours are now converted from sRGB into linear working space correctly.
- Replace unsupported `renderer.outputColorSpace` with r150's
  `renderer.outputEncoding = THREE.sRGBEncoding`; replace both environment and
  label texture `colorSpace` assignments with `encoding = THREE.sRGBEncoding`.
  This corrects the washed-out label and environment interpretation.
- Keep ACES filmic tone mapping; reduce exposure from 1.55 to 0.95.
- Reduce hemisphere light 2 → 0.45, key 3 → 2, rim 2.5 → 1.5, front 1.2 → 0.35.
  This retains highlights while restoring shading and bottle depth.
- Reduce glass environment intensity 1.4 → 0.85 to control reflections.
- Increase label roughness 0.82 → 0.95 and set label environment intensity to
  0.25 (previous default 1), making paper matte and ink more legible.

All beer data, material colour values, label artwork colours, and geometry are
unchanged. The existing scene selects one amber and one dark glass colour by SRM;
that selection is preserved. No emissive materials or transmission settings were
causing the issue. `app.js` only initializes scenes and requires no change.

## Verification

- `npm run build`: 24 pages generated.
- `npm run check`: all recipe checks and 806 local links/assets passed.
- Actual WebGL scenes rendered for all five detail pages and the homepage before
  and after; no browser console errors or uncaught page errors.
- Visually reviewed all five before/after pairs.
- Keyboard and pointer drag rotation each changed rendered canvas pixels.
- Mobile Koren WebGL rendered successfully with reduced motion.
- `git diff --check` passed.

Local review only; no push or deployment.

## Follow-up: individual colours and moving liquid

The latest version is [glass + liquid comparison](liquid-comparison.png).
The previous lighting-only render is the top row; the new version is below.
The `after/` files above remain the previous version for comparison.

- [Zrno PNG](liquid/zrno.png), [Magla PNG](liquid/magla.png),
  [Kaluger PNG](liquid/kaluger.png), [Opat PNG](liquid/opat.png),
  [Koren PNG](liquid/koren.png).
- [Homepage PNG](liquid/home-zrno.png), [mobile PNG](liquid/mobile-koren.png).
- [Recorded motion preview](liquid/motion-preview.webm).
- [Browser verification results](liquid/verification.json).

Changes:

1. Read the existing `beer.color` for each liquid: Zrno `#E8B33A`, Magla `#E9CE72`,
   Kaluger `#D9A227`, Opat `#6E3A1E`, Koren `#1E120B`. No recipe data changed.
2. Replace the solid coloured bottle material with a separate refractive glass
   shell (transmission 1, IOR 1.5, thickness 0.055, roughness 0.08, metalness 0),
   with a light amber attenuation tint.
3. Add an inner beer mesh with view-dependent absorption shading, clipped against
   its own liquid surface. The beer shader approximates optical density; this is
   a lightweight visual simulation, not computational fluid dynamics.
4. Add a reflective surface and meniscus fitted to the inside of the shoulder.
   The surface follows gravity instead of remaining glued to the bottle tilt.
5. Drive slosh with a damped spring responding to rotation, plus small idle ripples
   and 28 rising interior bubbles. Keep the existing exterior condensation.
6. Freeze fluid motion under reduced motion or the site's pause control. Reuse
   the existing visibility lifecycle and geometry/material disposal.

Validation: rebuilt and rendered all five detail pages plus homepage with no
browser errors; checked mobile rendering, finite surface coordinates, a nonzero
slosh response to drag, settling after five seconds, advancing liquid time, and
frozen time/slosh under reduced motion. Build, recipe/site checks and diff checks
passed. Labels and the approved lighting settings remain unchanged.
