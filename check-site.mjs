import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { renderPage, pageFile } = require("./templates.js");
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
let links = 0;
for (const [page, slug] of routes) {
  for (const lang of ["mk", "en"]) {
    const file = (lang === "en" ? "en/" : "") + pageFile(page, slug);
    const html = renderPage(page, lang, slug);
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${file}: one main title`,
    );
    assert.ok(!html.includes("undefined"), `${file}: no missing translations`);
    assert.ok(
      html.includes('<main id="main">') && html.includes("</main>"),
      `${file}: main landmark`,
    );
    assert.ok(
      html.includes('class="cookie-banner"') && html.includes("cookies.html"),
      `${file}: cookie notice and policy link`,
    );
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: unique IDs`);
    const built = fs.readFileSync("dist/" + file, "utf8");
    assert.ok(built.includes(html), `${file}: production page up to date`);
    assert.ok(built.includes(`<html lang="${lang}">`), `${file}: lang attribute`);
    assert.ok(
      built.includes('hreflang="mk"') && built.includes('hreflang="en"'),
      `${file}: hreflang alternates`,
    );
    assert.ok(built.includes("scene.js"), `${file}: scene module included`);
    for (const m of built.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = m[1];
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const [base, hash] = href.split("#");
      const target = base.split("?")[0];
      if (!target) {
        assert.ok(ids.includes(hash), `${file}: anchor ${href}`);
        continue;
      }
      const resolved = path.normalize(path.join("dist", path.dirname(file), target));
      assert.ok(fs.existsSync(resolved), `${file}: missing ${resolved}`);
      if (hash && resolved.endsWith(".html"))
        assert.ok(
          fs.readFileSync(resolved, "utf8").includes(`id="${hash}"`),
          `${file}: missing target ${href}`,
        );
      links++;
    }
  }
}
console.log(
  `ok — ${routes.length} pages × 2 languages, ${links} local links/assets, unique landmarks and current production output`,
);
