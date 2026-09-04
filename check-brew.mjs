/* Check the brew-sheet maths against the five real recipes.
   Runs app.js in a stubbed browser context and asserts each stage. */
import fs from "node:fs";
import assert from "node:assert/strict";
import vm from "node:vm";

const src = fs.readFileSync(new URL("./data.js", import.meta.url), "utf8");
const noop = () => {};
const ctx = {
  document: {
    addEventListener: noop,
    body: { dataset: {} },
    cookie: "",
    querySelector: () => null,
    querySelectorAll: () => [],
    documentElement: { dataset: {} },
  },
  navigator: { language: "en" },
  window: {},
  matchMedia: () => ({ matches: false }),
  addEventListener: noop,
  removeEventListener: noop,
  requestAnimationFrame: noop,
  Intl,
  console,
  innerHeight: 800,
};
ctx.globalThis = ctx;
vm.createContext(ctx);
// top-level const/function live in the script's lexical scope, not on ctx,
// so hand them out explicitly from inside the script.
vm.runInContext(
  src + "\n;globalThis.__api = { beers, brewStages, srmRgb, state };",
  ctx,
);

const { beers, brewStages, srmRgb, state } = ctx.__api;
assert.equal(beers.length, 5, "five beers");

let checked = 0;
for (const lang of ["mk", "en"]) {
  state.lang = lang;
  for (const beer of beers) {
    const s = brewStages(beer);
    assert.equal(s.length, 5, `${beer.slug}: five stages`);
    assert.equal(
      s.length,
      beer.brewing.length,
      `${beer.slug}: stages match written steps`,
    );

    // Liquid only ever rises, and colour only ever walks toward the final SRM.
    for (let i = 1; i < s.length; i++) {
      assert.ok(
        s[i].fill >= s[i - 1].fill,
        `${beer.slug}: fill must not drop at stage ${i}`,
      );
      assert.ok(
        s[i].tint >= s[i - 1].tint,
        `${beer.slug}: tint must not reverse at stage ${i}`,
      );
    }
    assert.equal(s[0].tint, 0, `${beer.slug}: starts as pale wort`);
    assert.equal(s[4].tint, 1, `${beer.slug}: ends at its own SRM colour`);

    // Boil is the hottest point of a brew day; fermentation is cooler than the boil.
    assert.equal(s[2].temp, 100, `${beer.slug}: boil is 100C`);
    assert.ok(s[3].temp < s[2].temp, `${beer.slug}: ferments below boiling`);
    assert.ok(s[1].temp > 60 && s[1].temp < 75, `${beer.slug}: mash in range`);

    // FG derived from OG and ABV must be a real finishing gravity.
    const og = parseFloat(beer.og);
    const fg = og - parseFloat(beer.abv) / 131.25;
    assert.ok(
      fg > 1.0 && fg < og,
      `${beer.slug}: FG ${fg} between 1.000 and OG`,
    );
    assert.ok(
      s[3].gravity.includes(og.toFixed(3)) &&
        s[3].gravity.includes(fg.toFixed(3)),
      `${beer.slug}: fermentation shows OG -> FG`,
    );
    assert.equal(s[4].gravity, fg.toFixed(3), `${beer.slug}: finishes at FG`);

    // Every stage renders a colour and a non-empty detail line.
    for (const [i, st] of s.entries()) {
      assert.match(
        st.color,
        /^rgb\(\d+ \d+ \d+\)$/,
        `${beer.slug}: stage ${i} colour`,
      );
      assert.ok(
        String(st.detail).trim().length,
        `${beer.slug}: stage ${i} has detail`,
      );
      assert.ok(
        String(st.clock).trim().length,
        `${beer.slug}: stage ${i} has a clock`,
      );
    }
    checked++;
  }
}

// Darker beers must end up visibly darker than pale ones.
const lum = (b) => srmRgb(b.srm).reduce((a, c) => a + c, 0);
const zrno = beers.find((b) => b.slug === "zrno");
const koren = beers.find((b) => b.slug === "koren");
assert.ok(
  lum(koren) < lum(zrno) / 2,
  "porter renders far darker than pale lager",
);

console.log(
  `ok — ${checked} beer/language combinations, all stage invariants hold`,
);
for (const b of beers) {
  const s = brewStages(b);
  console.log(
    `   ${b.slug.padEnd(8)} SRM ${String(b.srm).padStart(2)}  ${s[0].color} -> ${s[4].color}  ${s[4].gravity}`,
  );
}
