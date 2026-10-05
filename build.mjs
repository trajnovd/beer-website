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
    const title =
      (slug ? beers.find((b) => b.slug === slug).name[lang] : titles[page][i]) +
      " — " +
      ["Пивара Хмел", "Pivara Hmel"][i];
    const html = `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#141a15"><title>${title}</title><meta name="description" content="Пет пива од Скопје, секое со свој карактер. Откриј ги пивата, пиварницата и дегустациите на Хмел."><link rel="alternate" hreflang="mk" href="${root}${file}"><link rel="alternate" hreflang="en" href="${root}en/${file}"><link rel="alternate" hreflang="x-default" href="${root}${file}"><link rel="icon" href="${root}public/assets/brand/logo-hmel.svg" type="image/svg+xml"><script>try{document.documentElement.dataset.theme=localStorage.getItem('hmel-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}try{if(/(^|; )hmel-consent=1/.test(document.cookie))document.documentElement.dataset.consent='1'}catch(e){}</script><link rel="stylesheet" href="${root}styles.css"><script src="${root}public/vendor/gsap.min.js" defer></script><script src="${root}public/vendor/three.min.js" defer></script><script src="${root}data.js" defer></script><script src="${root}scene.js" defer></script><script src="${root}app.js" defer></script></head><body data-page="${page}" ${slug ? `data-beer="${slug}"` : ""}>${renderPage(page, lang, slug)}</body></html>`;
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
