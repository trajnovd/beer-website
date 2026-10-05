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
