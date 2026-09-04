import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { renderPage } = require("./templates.js");
const { beers } = require("./data.js");
const routes = [
  ["index.html", "home"],
  ["beers.html", "beers"],
  ["brewery.html", "brewery"],
  ["process.html", "process"],
  ["journal.html", "journal"],
  ["visit.html", "visit"],
  ...beers.map((b) => ["pivo/" + b.slug + ".html", "beer", b.slug]),
];
const titles = {
  home: "Добро пиво. Свој дух.",
  beers: "Пивата",
  brewery: "Пиварницата",
  process: "Процесот",
  journal: "Дневник",
  visit: "Посети нè",
  beer: "Пивата",
};
fs.mkdirSync("dist", { recursive: true });
for (const [file, page, slug = ""] of routes) {
  const root = page === "beer" ? "../" : "";
  const html = `<!doctype html>
<html lang="mk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#141a15"><title>${slug ? beers.find((b) => b.slug === slug).name.mk : titles[page]} — Пивара Хмел</title><meta name="description" content="Пет пива од Скопје, секое со свој карактер. Откриј ги пивата, пиварницата и дегустациите на Хмел."><link rel="icon" href="${root}public/assets/brand/logo-hmel.svg" type="image/svg+xml"><script>try{document.documentElement.dataset.theme=localStorage.getItem('hmel-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}</script><link rel="stylesheet" href="${root}styles.css"><script src="${root}public/vendor/gsap.min.js" defer></script><script src="${root}public/vendor/three.min.js" defer></script><script src="${root}data.js" defer></script><script src="${root}templates.js" defer></script><script src="${root}scene.js" defer></script><script src="${root}app.js" defer></script></head><body data-page="${page}" ${slug ? `data-beer="${slug}"` : ""}>${renderPage(page, "mk", slug)}</body></html>`;
  fs.mkdirSync(file.split("/").slice(0, -1).join("/") || ".", {
    recursive: true,
  });
  fs.writeFileSync(file, html);
  fs.mkdirSync("dist/" + (file.split("/").slice(0, -1).join("/") || ""), {
    recursive: true,
  });
  fs.writeFileSync("dist/" + file, html);
}
for (const f of ["styles.css", "app.js", "templates.js", "data.js", "scene.js"])
  fs.copyFileSync(f, "dist/" + f);
fs.cpSync("public", "dist/public", {
  recursive: true,
  filter: (p) => !p.endsWith(".DS_Store"),
});
console.log(`Built ${routes.length} static pages.`);
