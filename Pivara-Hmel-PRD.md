# Пивара Хмел — Product Requirements Document (PRD)

**Project:** Презентациска веб-страница за крафт пиварница „Пивара Хмел"
**Course deliverable:** FINKI web project (team of 4)
**Type:** Presentation website (NOT a webshop) — bilingual MK / EN
**Deadline:** September

---

## 1. What this is

Пивара Хмел is a small craft brewery in North Macedonia that brews a full range — an everyday light lager, a dark roasted porter, a wheat beer, and two elegant Belgian-style specialties. The website's job is to **tell the story of the craft, present the beers, and get visitors to book a brewery tour or tasting.**

This is a *presentation* site, not a shop. We show the beers (with prices and "where to find us"), but the conversion goal is **"Book a tasting / tour,"** which keeps us aligned with what the assignment actually grades (`презентациска web страна`).

### The "how it's made" angle
The brand's hook is transparency about brewing. Every beer page shows real brewer's data (ABV, IBU, malt bill, hops, yeast) and the blog explains process. This is a deliberate content strategy — it fills the catalog *and* the blog naturally, and it's the thing that makes the site memorable.

---

## 2. Why this scores well (grading map)

The assignment grades on four axes. Here's how the build targets each:

| Grading source | Points | How we win it |
|---|---|---|
| Instructor review (presentation) | 50 | Complete, polished, every element present and working live |
| Peer review (3+ colleagues, 0–5) | 30 | **Design quality** — this is where points are won or lost. Distinctive visual identity (see §8) beats the templated restaurant/winery sites in the queue |
| Your reviews of 3+ projects | 10 | Just do them, with real written justification |
| **AI agent checks every element** | 10 | **§7 checklist must be 100% complete** — the agent verifies each required element exists |

The AI-agent line is the easy 10 points most teams will lose by forgetting one element (usually multilingual or cookies). §7 is the guarantee against that.

---

## 3. Audience

- **Locals** (MK) — looking to visit the taproom, book a tour, find where to buy.
- **Beer tourists / expats** (EN) — the reason multilingual is justified, not bolted on.
- **The graders** — instructor, peers, and the checking agent.

Design for the first two; the third is satisfied by completeness + polish.

---

## 4. Tech stack

University hosting is an unknown — it may be static-only or PHP. **Build static-first so it deploys anywhere.**

**Recommended:**
- **Astro** (or Next.js with `output: 'export'`) → produces a folder of static HTML/CSS/JS you can upload anywhere. Astro has clean built-in i18n routing (`/mk/`, `/en/`) and is light.
- Plain **HTML/CSS/vanilla JS** is a perfectly valid fallback if the team wants zero build tooling — the assignment allows any technology. The cost is duplicating pages per language manually.

**Form handling (important):** static hosting has no backend. Use **Formspree** (free tier) or **Web3Forms** for the contact form — point the `<form action>` at their endpoint and you get submissions by email with no server. Fallback: `mailto:` link. Decide this early; it affects the contact page.

**Assets:** Risto is generating the beer images via AI — see §11 for prompts so they stay visually consistent.

**Do NOT use** localStorage for anything critical, build a real backend, or make it a webshop. Out of scope.

---

## 5. Sitemap

```
/
├── Дома / Home              (hero, range strip, featured beers, blog teaser, CTA)
├── За нас / About           (story, philosophy, the team, the brewery/terroir)
├── Пива / Beers             (the range — 5 beers as cards)
│   └── /pivo/[slug]         (single beer: full brewer's spec + story)
├── Посета / Visit           (services: tours & tastings, with prices + booking)
├── Блог / Blog              (news + "how it's made" posts)
│   └── /blog/[slug]         (single post)
└── Контакт / Contact        (booking form, address, hours, map)
```

Global on every page: **header + nav + language switcher**, **footer**, **cookie banner**.

---

## 6. Page-by-page spec

### Home (`/`)
1. **Hero** — full-bleed dark cellar image, brand name "Пивара Хмел", tagline, primary CTA "Резервирај дегустација" / "Book a tasting".
2. **The Range strip** *(signature element, see §8)* — all 5 beers shown as their true liquid colors, pale → dark, doubling as navigation.
3. **Featured beers** — 2–3 beer cards.
4. **"Како варимe" / "How we brew"** — short intro to the process, link to blog.
5. **Blog teaser** — latest post.
6. **CTA band** — visit / book.

### About (`/za-nas` · `/about`)
- Founding story + philosophy.
- **Team** *(required element)* — brewmaster, head brewer, taproom host; photo + short bio each.
- The brewery & location (the "terroir" / water-source story).

### Beers (`/piva` · `/beers`)
- Grid of 5 beer cards. Each card: liquid-color accent, name, style, ABV, one-line note → links to detail page.

### Single beer (`/pivo/[slug]`)
- Hero with the beer's color accent.
- **Brewer's spec block** (mono type): ABV · IBU · OG · SRM · Malt · Hops · Yeast.
- Tasting notes + the story / what makes it distinctive.
- Food pairing, serving glass/temp.
- "Book a tasting" CTA.

### Visit (`/poseta` · `/visit`)
- **Services** *(required element)* — tour/tasting packages, each with what's included, duration, price:
  - *Дегустација* (tasting flight) · *Тура низ пиварницата* (brewery tour) · *Приватна група* (private group) · *Сезонски настан* (seasonal event).
- Opening hours, what to expect, booking CTA → contact form.

### Blog (`/blog`)
- List of posts. Mix of **news** (new release, event) and **process** ("Што е Tripel", "Како се вари weiss").
- 3–4 posts is enough for full marks.

### Contact (`/kontakt` · `/contact`)
- **Contact form** *(required element)*: name, email, date, group size, message — framed as a booking request. Wired to Formspree/Web3Forms.
- **Contact info** *(required element)*: address, phone, email, hours.
- **Embedded map** (Google Maps iframe).
- Social links.

---

## 7. Required-elements checklist (the 10 agent points)

Build this in and verify every box before submitting. This is the completeness guarantee.

- [ ] Основни информации (basic info — who/what/where)
- [ ] Тим / вработени (team page with people)
- [ ] Услуги (services — the tour/tasting packages)
- [ ] Контакт форма (working contact form)
- [ ] Контакт информации (address, phone, email, hours)
- [ ] Новости / блог (blog with multiple posts)
- [ ] **Повеќејазичност (MK + EN, real switcher on every page)** ← most-missed
- [ ] **Cookies banner / consent** ← second most-missed
- [ ] Детални информации (beer detail pages — the brewer's specs)
- [ ] Entity-specific element (the **Range** strip + brewer's spec sheets — our distinctive extras)
- [ ] Responsive on mobile
- [ ] Footer with nav + contact + social
- [ ] Embedded map

---

## 8. Design system / design pattern

**Direction:** a warm, dark **cellar** — roasted-malt browns, not the generic near-black. Each beer carries its **true liquid color** as its own accent, and the brewing data is set in mono type like a **brewer's spec sheet**. Deliberately avoids the default AI looks (cream + serif + terracotta; pure-black + acid accent; broadsheet).

### Color tokens
```css
--malt-dark:  #1F1611;  /* base background — deep roasted malt, warm not black */
--cellar:     #2A1E16;  /* cards / raised surfaces */
--foam:       #F3EBDD;  /* primary text on dark; light section surface */
--amber:      #C8761B;  /* signature accent — CTAs, links, focus */
--gold:       #E0A53D;  /* highlight / hover */
--hop:        #6B7A4A;  /* secondary accent — tags, available/sold-out chips */
--copper:     #9C5A2C;  /* hairlines, borders */
```

**Per-beer liquid colors** (drive the per-page accent + the Range strip):
```css
--zrno:    #E8B33A;  /* Зрно — pale lager */
--magla:   #E9CE72;  /* Магла — hazy weiss */
--kalugjer:#D9A227;  /* Калуѓер — golden tripel */
--opat:    #6E3A1E;  /* Опат — ruby-brown dubbel */
--koren:   #1E120B;  /* Корен — near-black porter */
```

### Typography (all Cyrillic-safe — critical, the site is bilingual)
- **Display:** `Oswald` — condensed, reads like tap-room / crate signage. Full Cyrillic support. Use UPPERCASE for big headers, sparingly.
- **Body:** `Inter` (or `IBM Plex Sans`) — clean, excellent Cyrillic.
- **Data / specs:** `IBM Plex Mono` — for the brewer's spec numbers (ABV/IBU/OG). The mono = "brewer's lab" feel and is genuinely functional. Cyrillic-safe.

> ⚠️ Do NOT use Anton, Bebas Neue, or Fraunces for headers — they lack proper Cyrillic and will break Macedonian text. Verify Cyrillic glyphs before swapping any font.

Type scale: `clamp()` for fluid sizing. Display hero ~clamp(2.5rem, 6vw, 5rem). Generous line-height on body (1.6).

### Signature element — "The Range"
A full-width horizontal band: the 5 beers as vertical color blocks transitioning pale gold → ruby → near-black, left to right. Each block labeled with the beer name + style. It's both **the most beautiful thing on the page** and a **functional nav** (click a block → that beer's page). On the beer pages, the active beer's liquid color theming carries through the accent. This is the "remembered by" element.

### Layout
- Dark base, foam-cream content cards floating on it.
- Generous whitespace; let the beer colors be the loud thing, everything else quiet.
- Max content width ~1200px; comfortable mobile down to 360px.
- Border-radius: subtle (4–8px), not pill-shaped, not zero.

### Components
- `SiteHeader` (logo, nav, lang switcher)
- `RangeStrip` (the signature)
- `BeerCard` (color accent, name, style, ABV, note)
- `SpecSheet` (mono data block on beer pages)
- `ServiceCard` (package: includes, duration, price)
- `BlogCard`
- `BookingForm`
- `MapEmbed`
- `CookieBanner`
- `SiteFooter`

### Motion (restrained)
- Range strip blocks: subtle widen-on-hover.
- Scroll-reveal fade-up on section entry (respect `prefers-reduced-motion`).
- That's it. Over-animating reads as AI-generated.

### Quality floor (don't skip — peers notice)
Responsive to mobile · visible keyboard focus (use `--amber` outline) · alt text on all images · reduced-motion respected · real `<title>` + meta per page.

---

## 9. The beer catalog (content — ready to use)

Five beers, ordered pale → dark for the Range strip. Specs are realistic so the "how it's made" story holds up.

### 1. Зрно / *Zrno* ("Grain") — Pale Lager (Helles)
- **Color:** `#E8B33A` · **ABV** 4.8% · **IBU** 18 · **OG** 1.046 · **SRM** 4
- **Malt:** Pilsner, Vienna · **Hops:** Saaz, Hallertau · **Yeast:** Lager
- **MK:** Секојдневното пиво. Чисто, свежо, со благ хмелен горчлив тон и леб-сладок завршеток. Лесно за пиење, без компромис.
- **EN:** The everyday beer. Clean, crisp, a gentle hop bite and a soft bready finish. Easy-drinking without cutting corners.
- **Pairing:** grilled meats, light cheese. **Serve:** 5–7°C, tall glass.

### 2. Магла / *Magla* ("Mist") — Hefeweizen (Weiss)
- **Color:** `#E9CE72` (hazy) · **ABV** 5.2% · **IBU** 12 · **OG** 1.051 · **SRM** 4
- **Malt:** Wheat, Pilsner · **Hops:** Tettnang · **Yeast:** Weizen (banana/clove esters)
- **MK:** Матно, нефилтрирано пченично пиво. Арома на банана и каранфилче од квасецот, мека текстура и густа пена. Лето во чаша.
- **EN:** Cloudy, unfiltered wheat beer. Banana and clove from the yeast, a soft body and thick head. Summer in a glass.
- **Pairing:** salads, seafood, brunch. **Serve:** 4–6°C, weizen glass.

### 3. Калуѓер / *Kaluǵer* ("Monk") — Belgian Tripel
- **Color:** `#D9A227` · **ABV** 8.5% · **IBU** 30 · **OG** 1.078 · **SRM** 5
- **Malt:** Pilsner, Belgian candi sugar · **Hops:** Styrian Goldings, Saaz · **Yeast:** Belgian abbey
- **MK:** Елегантно, измамливо силно. Златна боја, зачински и овошни тонови од квасецот, суво завршеток што го крие алкохолот. Сложено пиво без еден доминантен вкус — се менува со секоја голтка.
- **EN:** Elegant and deceptively strong. Golden, with spice and fruit from the yeast and a dry finish that hides the strength. A layered beer with no single dominant flavour — it shifts with every sip.
- **Pairing:** roast chicken, washed-rind cheese. **Serve:** 8–10°C, tulip glass.

### 4. Опат / *Opat* ("Abbot") — Belgian Dubbel
- **Color:** `#6E3A1E` · **ABV** 7.5% · **IBU** 20 · **OG** 1.068 · **SRM** 18
- **Malt:** Pilsner, CaraMunich, Special B, dark candi sugar · **Hops:** Styrian Goldings · **Yeast:** Belgian abbey
- **MK:** Рубинесто-кафеаво, со длабочина на суво грозје, смокви, карамела и темно овошје. Богато но не тешко, со топла, сложена завршница. Второто од нашите белгиски пива.
- **EN:** Ruby-brown, with depth of raisin, fig, caramel and dark fruit. Rich but not heavy, with a warm, complex finish. The second of our two Belgian beers.
- **Pairing:** stews, aged gouda, dark chocolate. **Serve:** 10–12°C, chalice.

### 5. Корен / *Koren* ("Root") — Robust Porter
- **Color:** `#1E120B` · **ABV** 6.2% · **IBU** 38 · **OG** 1.060 · **SRM** 32
- **Malt:** Maris Otter, Roasted barley, Chocolate, Black · **Hops:** Fuggle, East Kent Goldings · **Yeast:** Ale
- **MK:** Темно, печено, со тонови на кафе и горчливо чоколадо. Полно тело, кремаста пена, долга топла завршница. Зимското пиво.
- **EN:** Dark and roasty, with coffee and bitter-chocolate notes. Full body, creamy head, a long warm finish. The winter beer.
- **Pairing:** grilled meat, chocolate dessert. **Serve:** 10–12°C, pint.

---

## 10. Content model (build the site from data, not hardcoded HTML)

Store beers as JSON/JS so cards, the Range strip, and detail pages all read from one source. Per language, or with `name_mk`/`name_en` fields.

```json
{
  "slug": "kaluger",
  "name": { "mk": "Калуѓер", "en": "Kaluǵer" },
  "style": { "mk": "Белгиски Трипел", "en": "Belgian Tripel" },
  "color": "#D9A227",
  "abv": 8.5, "ibu": 30, "og": 1.078, "srm": 5,
  "malt": ["Pilsner", "Belgian candi sugar"],
  "hops": ["Styrian Goldings", "Saaz"],
  "yeast": "Belgian abbey",
  "notes": { "mk": "Елегантно, измамливо силно…", "en": "Elegant and deceptively strong…" },
  "pairing": { "mk": "Печено пиле, сирење", "en": "Roast chicken, washed-rind cheese" },
  "serve": "8–10°C",
  "image": "/img/beers/kaluger.png"
}
```

Same pattern for services and blog posts.

---

## 11. Image generation direction (so your AI images match)

Generate each beer in a **consistent style** so the catalog looks like one brand. Shared prompt skeleton:

> *Studio product photo of a [GLASS] of [COLOR] craft beer with [HEAD], on a dark roasted-wood cellar surface, warm amber rim-lighting, dark moody background, shallow depth of field, photorealistic, no text, no label.*

Per beer:
- **Зрно** — tall lager glass, pale gold, white head.
- **Магла** — weizen glass, hazy straw, tall thick foam.
- **Калуѓер** — tulip glass, deep gold, fine head.
- **Опат** — chalice, ruby-brown, tan head.
- **Корен** — pint glass, near-black, thick creamy tan head.

Plus: 1 wide **hero** (dark brewery interior / copper kettles / rows of glasses), team headshots (warm, consistent lighting), and a couple of process shots for the blog. Keep lighting and background consistent across all — that consistency is what reads as "professional brand."

---

## 12. i18n (multilingual) approach

- Two locales: **mk** (default) and **en**.
- **Astro/Next:** route-based `/mk/...` and `/en/...`; switcher swaps the path.
- **Plain HTML:** either a `/en/` folder mirror, or a `data-i18n` key system with a JS dictionary swapping `textContent` and persisting choice. The folder approach is simpler and more reliable for a class project.
- Switcher must appear in the header **on every page**. Translate everything visible — nav, buttons, beer notes, form labels, footer. (The agent checks this.)

---

## 13. Cookies & contact form

**Cookie banner:** small fixed bar, "Прифати / Accept" + "Дознај повеќе / Learn more" → a short `/cookies` policy page. Remember consent in a cookie (not localStorage). Required element — keep it simple but present.

**Contact form:** static hosting = no backend, so:
1. Sign up for **Formspree** or **Web3Forms** (free), put the endpoint in `<form action>`.
2. Fields: name, email, date, group size, message. Client-side validation + a success state ("Пораката е испратена / Message sent").
3. Honeypot field for spam. Fallback `mailto:` if you skip the service.

---

## 14. Division of labor (4 people)

| Person | Owns |
|---|---|
| **A — Design/shell** | Design system, header/footer/nav, Range strip, fonts, responsive shell, mobile |
| **B — Beers** | Beers list + detail pages, SpecSheet component, content model/JSON, integrate images |
| **C — Visit + Contact** | Services page, contact form (Formspree wiring), map, cookies banner |
| **D — About + Blog + i18n** | About/team page, blog list + posts, the MK/EN translation system across the whole site |

Everyone: write your section's MK + EN copy and check your pages against the §7 checklist.

---

## 15. Milestones (June → September)

1. **Setup** — repo, stack chosen, Formspree account, fonts, design tokens in CSS. Agree the Range strip + color system.
2. **Shell** — header, footer, nav, language switcher working, responsive skeleton.
3. **Content** — beer JSON filled, images generated, beer pages + Range strip live.
4. **Pages** — About/team, Visit/services, Blog, Contact (form working).
5. **Polish** — cookies banner, i18n complete on every page, mobile pass, focus states, alt text, meta tags.
6. **Verify & ship** — run the §7 checklist end to end in both languages, deploy to FINKI hosting, submit the link.

---

## 16. Out of scope (don't build these)

- E-commerce / cart / payments (it's a presentation site).
- User accounts / login.
- A custom backend or database.
- More than 2 languages.

---

*Topic line for the submission field:*
**Веб-страница за крафт пиварница „Пивара Хмел" (пиво, тури и дегустации)**
