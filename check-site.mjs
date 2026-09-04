import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
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
let links = 0;
for (const [file, page, slug] of routes) {
  for (const lang of ["mk", "en"]) {
    const html = renderPage(page, lang, slug);
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${file}/${lang}: one main title`,
    );
    assert.ok(
      !html.includes("undefined"),
      `${file}/${lang}: no missing translations`,
    );
    assert.ok(
      html.includes('<main id="main">') && html.includes("</main>"),
      `${file}: main landmark`,
    );
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}/${lang}: unique IDs`);
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = m[1];
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const [base, hash] = href.split("#");
      const target = base.split("?")[0];
      if (!target) {
        assert.ok(ids.includes(hash), `${file}: anchor ${href}`);
        continue;
      }
      const resolved = path.normalize(path.join(path.dirname(file), target));
      assert.ok(fs.existsSync(resolved), `${file}: missing ${resolved}`);
      if (hash && resolved.endsWith(".html"))
        assert.ok(
          fs.readFileSync(resolved, "utf8").includes(`id="${hash}"`),
          `${file}: missing target ${href}`,
        );
      links++;
    }
  }
  const built = fs.readFileSync("dist/" + file, "utf8");
  assert.ok(
    built.includes(renderPage(page, "mk", slug)),
    `${file}: production page up to date`,
  );
  assert.ok(built.includes("scene.js"), `${file}: scene module included`);
}
console.log(
  `ok — ${routes.length} pages in two languages, ${links} local links/assets, unique landmarks and current production output`,
);
