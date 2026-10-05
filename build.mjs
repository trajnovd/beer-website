import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { renderPage, pageFile, siteRootFor } = require("./templates.js");
const { beers } = require("./data.js");
const routes = [
  ["home"],
  ["beers"],
  ["brewery"],
  ["process"],
  ["journal"],
  ["visit"],
  ["cookies"],
  ...beers.map((b) => ["beer", b.slug]),
];
const titles = {
  home: ["Добро пиво. Свој дух.", "Good beer. Free spirit."],
  beers: ["Пивата", "The beers"],
  brewery: ["Пиварницата", "Our brewery"],
  process: ["Процесот", "The process"],
  journal: ["Дневник", "Journal"],
  visit: ["Посети нè", "Visit us"],
  cookies: ["Колачиња", "Cookies"],
};
const descriptions = {
  home: [
    "Хмел е независна пиварница од Скопје. Пет пива со отворени рецепти, од свеж лагер до темен портер, и дегустации во пиварницата.",
    "Hmel is an independent brewery in Skopje. Five beers with open recipes, from a crisp lager to a dark porter, plus tastings at the brewery.",
  ],
  beers: [
    "Сите пет пива на Хмел: Зрно, Магла, Калуѓер, Опат и Корен. Стил, јачина и карактер на секое шише.",
    "All five Hmel beers: Zrno, Magla, Kaluǵer, Opat and Koren. The style, strength and character of every bottle.",
  ],
  brewery: [
    "Луѓето и вредностите зад Хмел: добри состојки, време за ферментација и отворени рецепти.",
    "The people and values behind Hmel: good ingredients, time to ferment and open recipes.",
  ],
  process: [
    "Од зрно до чаша во пет чекори: мелење, замешување, варење, ферментација и зреење на Зрно, нашиот светол лагер.",
    "From grain to glass in five stages: milling, mashing, boiling, fermenting and conditioning Zrno, our pale lager.",
  ],
  journal: [
    "Белешки од пиварницата: зошто Калуѓер завршува суво, како квасецот ја гради Магла и како да дегустираш пет пива по ред.",
    "Notes from the brewery: why Kaluǵer finishes dry, how yeast builds Magla, and how to taste five beers in order.",
  ],
  visit: [
    "Дегустации, тури низ пиварницата и приватни групи во Скопје. Цени, работно време, мапа и формулар за барање посета.",
    "Tastings, brewery tours and private groups in Skopje. Prices, opening hours, a map and a form to request a visit.",
  ],
  cookies: [
    "Што зачувува страницата на Хмел на твојот уред и зошто. Едно колаче, без следење и реклами.",
    "What the Hmel site stores on your device and why. One cookie, no tracking, no ads.",
  ],
};
// The public RepoRun address; link previews and search engines need absolute URLs.
const SITE_URL = "https://team-54--delovna2526.reporun.finki.net.mk/";
const attr = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const write = (file, html) => {
  for (const out of [file, "dist/" + file]) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }
};
let count = 0;
for (const [page, slug = ""] of routes) {
  const file = pageFile(page, slug);
  for (const lang of ["mk", "en"]) {
    const root = siteRootFor(page, lang),
      i = lang === "mk" ? 0 : 1;
    const beer = beers.find((b) => b.slug === slug),
      site = ["Пивара Хмел", "Pivara Hmel"][i];
    const title = (beer ? beer.name[lang] : titles[page][i]) + " — " + site;
    const description = beer
      ? `${beer.name[lang]}: ${beer.style[lang]}, ${beer.abv} ABV. ${beer.note[lang]}`
      : descriptions[page][i];
    const url = (l) => SITE_URL + (l === "en" ? "en/" : "") + (file === "index.html" ? "" : file);
    const preview = [
      ["og:type", "website"],
      ["og:url", url(lang)],
      ["og:image", SITE_URL + "public/assets/brand/bottle-lineup-ai.jpg"],
      ["og:image:width", "1672"],
      ["og:image:height", "941"],
      ["og:site_name", site],
      ["og:title", title],
      ["og:description", description],
      ["og:locale", lang === "mk" ? "mk_MK" : "en_US"],
      ["og:locale:alternate", lang === "mk" ? "en_US" : "mk_MK"],
    ]
      .map(([p, v]) => `<meta property="${p}" content="${attr(v)}">`)
      .join("");
    // Three.js loads as an ES module (the classic build warns on every page); module scripts run
    // in document order with the deferred scripts, so window.THREE is set before app.js boots.
    const html = `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#141a15"><title>${title}</title><meta name="description" content="${attr(description)}">${preview}<meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${url(lang)}"><link rel="alternate" hreflang="mk" href="${url("mk")}"><link rel="alternate" hreflang="en" href="${url("en")}"><link rel="alternate" hreflang="x-default" href="${url("mk")}"><link rel="icon" href="${root}public/assets/brand/logo-hmel.svg" type="image/svg+xml"><script>try{document.documentElement.dataset.theme=localStorage.getItem('hmel-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}try{if(/(^|; )hmel-consent=1/.test(document.cookie))document.documentElement.dataset.consent='1'}catch(e){}</script><link rel="stylesheet" href="${root}styles.css"><script src="${root}public/vendor/gsap.min.js" defer></script><script type="module">import * as THREE from "${root || "./"}public/vendor/three.module.min.js";window.THREE=THREE;</script><script src="${root}data.js" defer></script><script src="${root}scene.js" defer></script><script src="${root}app.js" defer></script></head><body data-page="${page}" ${slug ? `data-beer="${slug}"` : ""}>${renderPage(page, lang, slug)}</body></html>`;
    write(lang === "en" ? "en/" + file : file, html);
    count++;
  }
}
for (const f of ["styles.css", "app.js", "data.js", "scene.js"])
  fs.copyFileSync(f, "dist/" + f);
fs.cpSync("public", "dist/public", {
  recursive: true,
  filter: (p) => !p.endsWith(".DS_Store"),
});
console.log(`Built ${count} static pages (${routes.length} in Macedonian and English).`);
