# Hmel — Independent Craft Brewery

A complete multi-page redesign of the fictional **Пивара Хмел** student brewery project. Twelve pages pre-rendered in Macedonian (site root) and English (`en/`), light and dark themes, and interactive Three.js product scenes.

```sh
npm run build  # generates the HTML pages and dist/ production directory
npm run dev    # local server, http://localhost:5173
npm run check  # recipe invariants and page integrity
```

The site uses vanilla JavaScript, locally vendored Three.js and GSAP, and Google Fonts with system fallbacks. There are no runtime npm dependencies. All primary content and navigation, in both languages, are pre-rendered and remain accessible without JavaScript. The language switch is a plain link to the same page in the other language, and every page declares both versions with `hreflang`. Run the build after editing templates or data.

## Pages

- `index.html`: editorial homepage and interactive 3D bottle
- `beers.html`: complete five-beer collection
- `brewery.html`: story, brewing values, and team
- `process.html`: recipe-driven scrolling brewing visualization
- `journal.html`: expandable brewing stories
- `visit.html`: experiences, contact details, FAQs, and email request preparation
- `cookies.html`: what the site stores and why; every page links here from the cookie notice and the footer
- `pivo/{zrno,magla,kaluger,opat,koren}.html`: individual beer pages with interactive bottles, specifications, and keyboard-accessible brewing tabs

## Source

- `data.js`: original bilingual recipes, experiences, articles, and FAQs; brewing calculations
- `templates.js`: bilingual HTML templates, used only by the build
- `styles.css`: responsive layouts, both themes, transitions, reduced-motion support
- `app.js`: themes, navigation, brewing controls, request preparation, and animation lifecycle
- `scene.js`: Three.js bottle geometry, branded label textures, studio lighting, drag/keyboard rotation, and resource cleanup
- `build.mjs`: generates every page in both languages and stages public production assets
- `public/assets/`: original brewery photography and identity
- `.openai/hosting.json`: private Sites hosting configuration

The cookie notice is in every page's HTML; accepting it sets one `hmel-consent` cookie (1 year), and a head script hides the notice when that cookie exists. Preferences are stored locally on the visitor’s device. Themes initially follow the system setting. Motion follows the system reduced-motion preference, with a separate footer pause control. WebGL failures retain a photographic fallback; scenes stop rendering when outside the viewport or when the tab is hidden.

The brewery and its contact details are fictional. The visit form validates the request and shows a review before offering a mailto link. It does not submit to a backend, send email automatically, or confirm a booking.
