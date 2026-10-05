/* Page templates, rendered at build time into one static file per page and language. */
const D = require("./data.js");
const words = (mk, en, lang) => (lang === "mk" ? mk : en);
const icons = {
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/></svg>',
};
function renderPage(page = "home", lang = "mk", slug = "") {
  const w = (mk, en) => words(mk, en, lang),
    b = D.beers.find((b) => b.slug === slug),
    file = pageFile(page, slug),
    up = page === "beer" ? "../" : "",
    siteRoot = siteRootFor(page, lang);
  // Page links stay inside this language's folder; assets are shared at the site root.
  const href = (p) => up + p,
    asset = (p) => siteRoot + "public/assets/" + p;
  const nav = [
    ["beers.html", w("Пивата", "The beers"), "beers"],
    ["brewery.html", w("Пиварницата", "Our brewery"), "brewery"],
    ["process.html", w("Процесот", "The process"), "process"],
    ["journal.html", w("Дневник", "Journal"), "journal"],
  ];
  const link = (url, label, cls = "button") =>
    `<a class="${cls}" href="${href(url)}"><span>${label}</span>${icons.arrow}</a>`;
  const label = (number, text) =>
    `<p class="eyebrow"><span class="tiny-dot"></span>${number} / ${text}</p>`;
  const image = (file, alt, cls = "", lazy = true) =>
    `<img class="${cls}" src="${asset(file)}" alt="${alt}" ${lazy ? 'loading="lazy"' : ""} decoding="async">`;
  const card = (beer, i) =>
    `<a class="beer-card reveal" href="${href("pivo/" + beer.slug + ".html")}" style="--beer:${beer.color}"><div class="beer-card-image">${image("bottles/" + beer.slug + "-ai.jpg", beer.name[lang] + " — " + beer.style[lang])}<span class="card-index">0${i + 1} / 05</span><span class="card-arrow">${icons.arrow}</span></div><div class="beer-card-info"><div><h3>${beer.name[lang]}</h3><p>${beer.style[lang]}</p></div><span>${beer.abv}<small>ABV</small></span></div></a>`;
  const cta = () =>
    `<section class="visit-cta section"><div>${label("ХМЕЛ", w("Најдобро е во друштво", "Better together"))}<h2 class="display reveal">${w("ТВОЕ МЕСТО.<br>НАША ТУРА.", "YOUR PEOPLE.<br>OUR ROUND.")}</h2></div>${link("visit.html", w("Дојди на дегустација", "Come for a tasting"), "button button-dark")}</section>`;
  const header = `<a class="skip-link" href="#main">${w("Кон содржината", "Skip to content")}</a><header class="site-header"><a class="wordmark" href="${href("index.html")}" aria-label="${w("Хмел — почетна", "Hmel — home")}">${w("хмел", "hmel")}<span>®</span><small>${w("НЕЗАВИСНА ПИВАРНИЦА", "INDEPENDENT BREWERY")}</small></a><nav class="desktop-nav" aria-label="${w("Главна навигација", "Main navigation")}">${nav.map(([url, title, key]) => `<a href="${href(url)}" ${key === page ? 'aria-current="page"' : ""}>${title}</a>`).join("")}</nav><div class="header-actions"><a class="language-toggle" href="${siteRoot}${lang === "mk" ? "en/" : ""}${file}" hreflang="${w("en", "mk")}" lang="${w("en", "mk")}" aria-label="${w("Read in English", "Прочитај на македонски")}">${w("EN", "МК")}</a><button class="theme-toggle icon-button" type="button" aria-label="${w("Промени тема", "Change color theme")}" aria-pressed="false"><span class="sun-icon">${icons.sun}</span><span class="moon-icon">${icons.moon}</span></button>${link("visit.html", w("Посети нè", "Visit us"), "header-visit")}<button type="button" class="menu-toggle icon-button" aria-label="${w("Мени", "Menu")}" aria-controls="mobile-nav" aria-expanded="false"><span></span><span></span></button></div></header><nav id="mobile-nav" class="mobile-nav" hidden aria-label="${w("Мобилна навигација", "Mobile navigation")}">${[...nav, ["visit.html", w("Посети нè", "Visit us"), "visit"]].map(([url, title], i) => `<a href="${href(url)}"><small>0${i + 1}</small>${title}${icons.arrow}</a>`).join("")}</nav><div class="scroll-progress" aria-hidden="true"></div>`;
  let content = "";
  if (page === "home")
    content = `<section class="home-hero"><div class="hero-topline"><span><i class="status-dot"></i>${w("МАЛА СЕРИЈА. ГОЛЕМ КАРАКТЕР.", "SMALL BATCH. BIG CHARACTER.")}</span><span>${w("СКОПЈЕ, МАКЕДОНИЈА", "SKOPJE, MACEDONIA")} ↗</span></div><h1 class="hero-title"><span>${w("ДОБРО", "GOOD")}</span><span class="outline">${w("ПИВО.", "BEER.")}</span><span>${w("СВОЈ", "FREE")}</span><span>${w("ДУХ.", "SPIRIT.")}</span></h1><div class="hero-product"><div class="product-orbit" aria-hidden="true"></div><span class="product-coordinate">41°59′ N<br>21°26′ E</span>${image("bottles/zrno-ai.jpg", w("Зрно, нашиот светол лагер", "Zrno, our pale lager"), "scene-fallback", false)}<canvas class="bottle-canvas" data-bottle="zrno" aria-label="${w("Интерактивно 3Д шише Зрно", "Interactive 3D Zrno beer bottle")}"></canvas><div class="hero-stamp"><span>${w("НЕЗАВИСНО", "INDEPENDENT")}</span><b>100%</b><span>${w("СО КАРАКТЕР", "FULL OF CHARACTER")}</span></div><span class="drag-hint">↔ ${w("ПОВЛЕЧИ ЗА ДА ГО ЗАВРТИШ", "DRAG TO SPIN")}</span></div><div class="hero-bottom"><div class="hero-description"><p>${w("Од првото зрно до последната голтка. Пет пива од Скопје, секое со свој карактер.", "From the first grain to the last sip. Five beers from Skopje, each with a mind of its own.")}</p>${link("beers.html", w("Откриј ги пивата", "Explore the beers"), "button button-accent")}</div><a class="hero-feature" href="${href("pivo/zrno.html")}"><span>${w("ВО ФОКУС / 01", "IN FOCUS / 01")}</span><strong>${w("Зрно", "Zrno")} <i>↗</i></strong><small>PALE LAGER · 4.8% ABV</small></a><a class="scroll-cue" href="#collection">${w("НАДОЛУ", "SCROLL TO DISCOVER")}<span>↓</span></a></div></section><div class="marquee" aria-hidden="true"><div>${Array(
      4,
    )
      .fill(
        `<span>${w("ДОБРО ПИВО НЕ СЕ БРЗА", "GOOD BEER TAKES ITS TIME")}</span><b>✳</b><span>${w("ВАРЕНО СО КАРАКТЕР", "BREWED WITH CHARACTER")}</span><b>✳</b>`,
      )
      .join(
        "",
      )}</div></div><section id="collection" class="section collection-section"><div class="section-heading"><div>${label("01", w("Колекцијата", "The collection"))}<h2 class="display reveal">${w("ПЕТ ПИВА.<br>БЕЗ КОМПРОМИС.", "FIVE BEERS.<br>NO HALF MEASURES.")}</h2></div><div class="heading-aside"><p>${w("Светло, магливо, златно или темно.<br>Пронајди го твојот карактер.", "Crisp, cloudy, golden or dark.<br>Find your kind of character.")}</p>${link("beers.html", w("Сите пет пива", "Meet all five"), "text-link")}</div></div><div class="featured-grid">${D.beers
      .filter((_, i) => [0, 1, 4].includes(i))
      .map((x) => card(x, D.beers.indexOf(x)))
      .join(
        "",
      )}</div></section><section class="manifesto section"><div class="manifesto-photo reveal">${image("process/hops.jpg", w("Хмел во процесот на варење", "Hops in the brewing process"))}<span class="photo-caption">${w("ТУКА ПОЧНУВА КАРАКТЕРОТ.", "THIS IS WHERE CHARACTER BEGINS.")}</span></div><div class="manifesto-copy">${label("02", w("Нашиот начин", "The Hmel way"))}<h2 class="display reveal">${w("МАЛКУ<br>ТВРДОГЛАВИ.<br><em>СО ПРИЧИНА.</em>", "A LITTLE<br>STUBBORN.<br><em>FOR A REASON.</em>")}</h2><p>${w("Веруваме во добри состојки, отворени рецепти и време што не се скратува. Мала пиварница, со голема почит кон секое шише.", "We believe in good ingredients, open recipes, and giving things the time they need. A small brewery with a lot of respect for every bottle.")}</p>${link("brewery.html", w("Нашата приказна", "Our story"), "text-link")}</div></section>${cta()}`;
  const intro = (n, kicker, title, desc) =>
    `<section class="page-intro section">${label(n, kicker)}<div class="intro-row"><h1 class="display">${title}</h1><p>${desc}</p></div></section>`;
  if (page === "beers")
    content = `${intro("01", w("Пет оригинали од Скопје", "Five Skopje originals"), w("ТВОЈ ВКУС.<br><em>ТВОЕ ПИВО.</em>", "YOUR TASTE.<br><em>YOUR BEER.</em>"), w("Секое шише почнува со идеја. Од чист лагер до богат портер — пет различни начини да бидеш свој.", "Every bottle starts with an idea. From a clean lager to a rich porter — five different ways to be yourself."))}<section class="section catalog"><div class="catalog-label"><span>${w("ЦЕЛАТА КОЛЕКЦИЈА", "THE FULL COLLECTION")}</span><span>05 ${w("ОРИГИНАЛИ", "ORIGINALS")}</span></div><div class="catalog-grid">${D.beers.map(card).join("")}<div class="collection-note"><span>✳</span><h2>${w("Тешко е<br>да избереш?", "Can’t choose<br>just one?")}</h2><p>${w("Запознај ги сите на една дегустација.", "Get to know all five over a tasting.")}</p>${link("visit.html", w("Дегустирај ги сите", "Taste the whole lineup"), "text-link")}</div></div></section>${cta()}`;
  if (page === "brewery")
    content = `${intro("02", w("Луѓето зад шишето", "The people behind the bottle"), w("МАЛА ПИВАРНИЦА.<br><em>СВОЈ ПРАВЕЦ.</em>", "SMALL BREWERY.<br><em>OUR OWN WAY.</em>"), w("Нашата приказна почнува со едноставно прашање: што ако секоја состојка, секој час и секое шише навистина се важни?", "Our story starts with a simple question: what if every ingredient, every hour, and every bottle really mattered?"))}<section class="wide-photo">${image("brand/bottle-lineup-ai.jpg", w("Петте шишиња на Пивара Хмел", "The five bottles of Pivara Hmel"), "", false)}<span>${w("ПЕТ КАРАКТЕРИ. ЕДНА ПИВАРНИЦА.", "FIVE CHARACTERS. ONE BREWERY.")}</span></section><section class="section story-statement">${label("ХМЕЛ", w("Во што веруваме", "What we believe"))}<h2 class="display reveal">${w("НЕМА ТАЈНА.<br>САМО ДОБРИ СОСТОЈКИ.<br><em>И МАЛКУ ТРПЕНИЕ.</em>", "NO BIG SECRET.<br>JUST GOOD INGREDIENTS.<br><em>AND A LITTLE PATIENCE.</em>")}</h2><div class="story-columns"><p>${w("Хмел е независен пиварски концепт од Скопје. Нашата колекција почнува со Зрно, чист и свеж лагер, а завршува со Корен, длабок и печен портер. Помеѓу нив има цел свет на вкусови.", "Hmel is an independent brewing concept from Skopje. Our collection begins with Zrno, a clean and crisp lager, and ends with Koren, a deep, roasted porter. There is a whole world of flavor in between.")}</p><p>${w("Секој рецепт е отворен. Ги споделуваме сладот, хмелот и квасецот, заедно со бројките зад вкусот. Бидејќи добро пиво нема што да крие.", "Every recipe is open. We share the malt, hops, and yeast, along with the numbers behind the flavor. Because good beer has nothing to hide.")}</p></div></section><section class="values section">${[
      [
        w("Состојки", "Ingredients"),
        w(
          "Четири основи.<br>Бескраен карактер.",
          "Four essentials.<br>Endless character.",
        ),
        w(
          "Вода, слад, хмел и квасец. Секоја состојка има своја улога.",
          "Water, malt, hops and yeast. Every ingredient has a part to play.",
        ),
      ],
      [
        w("Време", "Time"),
        w("Не го брзаме<br>доброто.", "Good things.<br>Never rushed."),
        w(
          "Ладно лагерување или топла белгиска ферментација. Секој стил добива свое време.",
          "Cold lagering or warm Belgian fermentation. Every style gets its own time.",
        ),
      ],
      [
        w("Отвореност", "Openness"),
        w(
          "Цел рецепт.<br>Цела приказна.",
          "The full recipe.<br>The whole story.",
        ),
        w(
          "Од почетна густина до температура на сервирање. Сите бројки се тука.",
          "From original gravity to serving temperature. All the numbers are here.",
        ),
      ],
    ]
      .map(
        ([k, t, d], i) =>
          `<article class="reveal"><span>0${i + 1} / ${k}</span><h3>${t}</h3><p>${d}</p></article>`,
      )
      .join(
        "",
      )}</section><section class="section"><div class="section-heading"><div>${label("03", w("Тимот", "Our people"))}<h2 class="display reveal">${w("РАЦЕ ШТО ВАРАТ.<br>ЛУЃЕ ШТО САКААТ.", "HANDS THAT BREW.<br>PEOPLE WHO CARE.")}</h2></div></div><div class="team-grid">${[
      [
        w("Ана Стојановска", "Ana Stojanovska"),
        w("Главен пивар", "Head brewer"),
        w(
          "Рецептите, балансот и сите мали детали што го прават пивото наше.",
          "The recipes, the balance, and all the little details that make the beer ours.",
        ),
      ],
      [
        w("Мартин Илиев", "Martin Iliev"),
        w("Пиварница и процес", "Brewery & process"),
        w(
          "Температури, ферментација и трпение. Секој казан е во добри раце.",
          "Temperatures, fermentation, and patience. Every kettle is in good hands.",
        ),
      ],
      [
        w("Елена Петрова", "Elena Petrova"),
        w("Дегустации", "Tastings & hospitality"),
        w(
          "Твојот водич низ петте шишиња — и приказните што доаѓаат со нив.",
          "Your guide to the five bottles — and the stories that come with them.",
        ),
      ],
    ]
      .map(
        ([name, role, bio], i) =>
          `<article class="team-card reveal"><div class="team-number">0${i + 1}<span>↗</span></div><p class="eyebrow">${role}</p><h3>${name}</h3><p>${bio}</p></article>`,
      )
      .join("")}</div></section>${cta()}`;
  if (page === "process")
    content = `${intro("03", w("Од зрно до чаша", "From grain to glass"), w("ВРЕДИ<br><em>ДА СЕ ЧЕКА.</em>", "WORTH<br><em>THE WAIT.</em>"), w("Пет чекори. Без кратенки. Следи го патувањето на Зрно, нашиот пале лагер, од првото мелење до ладната чаша.", "Five stages. No shortcuts. Follow Zrno, our pale lager, from the first milling to the cold glass."))}<section class="section process-experience"><div class="brew-readout"><div class="readout-top"><span>${w("ЛИСТ ЗА ВАРЕЊЕ", "BREW SHEET")}</span><span>01 / ZRNO</span></div><div class="readout-visual"><div class="sight-glass"><div class="liquid"><div class="liquid-surface"></div></div><div class="glass-grid"></div></div><div class="readout-scale"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div class="readout-caption"><span class="readout-stage">01</span><h2 class="readout-name">${D.beers[0].brewing[0].title[lang]}</h2></div></div><div class="readout-metrics"><div><span>${w("ТЕМПЕРАТУРА", "TEMPERATURE")}</span><strong data-reading="temp">18°C</strong></div><div><span>${w("ГУСТИНА", "GRAVITY")}</span><strong data-reading="gravity">—</strong></div><div><span>${w("ВРЕМЕ", "TIME")}</span><strong data-reading="clock">−00:20</strong></div></div><p class="readout-detail">${D.beers[0].malt}</p><small>${w("Илустративен приказ според рецептот", "Illustrative visualization based on the recipe")}</small></div><div class="process-story">${D.beers[0].brewing.map((step, i) => `<article class="process-chapter" data-stage="${i}"><span class="chapter-number">0${i + 1}</span><h2>${step.title[lang]}</h2><p>${step.body[lang]}</p><div class="chapter-image reveal">${image(step.img.replace("public/assets/", ""), step.title[lang])}</div></article>`).join("")}</div></section><section class="recipe-callout section">${label("05", w("Љубопитен за повеќе?", "Curious for more?"))}<h2 class="display">${w("ПЕТ ПИВА.<br>ПЕТ ПАТУВАЊА.", "FIVE BEERS.<br>FIVE JOURNEYS.")}</h2><p>${w("Секое пиво има свој слад, свој квасец и свое време. Истражи ги рецептите.", "Every beer has its own malt, its own yeast, its own rhythm. Explore the recipes.")}</p>${link("beers.html", w("Откриј ги рецептите", "Explore the recipes"), "button button-accent")}</section>`;
  if (page === "beer" && b) {
    const idx = D.beers.indexOf(b),
      next = D.beers[(idx + 1) % D.beers.length];
    content = `<section class="beer-detail-hero section" style="--beer:${b.color}"><div class="detail-copy"><a class="back-link" href="${href("beers.html")}">← ${w("Сите пива", "All beers")}</a>${label("0" + (idx + 1), b.style[lang])}<h1 class="display">${b.name[lang]}</h1><p class="beer-meaning">${b.meaning[lang]}</p><p class="beer-note">${b.note[lang]}</p><div class="beer-metrics"><div><strong>${b.abv}</strong><span>ABV</span></div><div><strong>${b.ibu}</strong><span>IBU</span></div><div><strong>${b.srm}</strong><span>SRM</span></div></div>${link("visit.html?beer=" + b.slug + "#booking", w("Пробај го во пиварницата", "Taste it at the brewery"), "button button-accent")}</div><div class="detail-product">${image("bottles/" + b.slug + "-ai.jpg", b.name[lang], "scene-fallback", false)}<span class="detail-watermark" aria-hidden="true">0${idx + 1}</span><canvas class="bottle-canvas" data-bottle="${b.slug}" aria-label="${w("Интерактивно 3Д шише", "Interactive 3D bottle")} ${b.name[lang]}"></canvas><span class="drag-hint">↔ ${w("ПОВЛЕЧИ ЗА ДА ГО ЗАВРТИШ", "DRAG TO SPIN")}</span></div></section><section class="section detail-story"><div>${label("01", w("Карактерот", "The character"))}<h2 class="display reveal">${w("ПОВЕЌЕ ОД<br>ЕТИКЕТА.", "MORE THAN<br>A LABEL.")}</h2><p>${b.story[lang]}</p><div class="pairing-grid"><div><span>${w("ДОБРО ДРУШТВО", "GOOD COMPANY")}</span><p>${b.pairing[lang]}</p></div><div><span>${w("НАЈДОБРО СЕРВИРАНО", "BEST SERVED")}</span><p>${b.serve} · ${b.glass[lang]}</p></div></div></div><div class="spec-panel">${label("02", w("Отворен рецепт", "The open recipe"))}<dl>${[
      [w("Слад", "Malt"), b.malt],
      [w("Хмел", "Hops"), b.hops],
      [w("Квасец", "Yeast"), b.yeast],
      [w("Почетна густина", "Original gravity"), b.og],
      [w("Боја", "Color"), b.srm + " SRM"],
      [w("Алкохол", "Alcohol"), b.abv],
    ]
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
      .join(
        "",
      )}</dl></div></section><section class="section beer-brewing" data-recipe="${b.slug}"><div class="section-heading"><div>${label("03", w("Како се вари", "How it is brewed"))}<h2 class="display reveal">${w("ОД ПРВОТО<br>ЗРНО.", "FROM THE<br>FIRST GRAIN.")}</h2></div><p>${w("Истражи го секој чекор од рецептот.", "Explore each stage of the recipe.")}</p></div><div class="brew-tabs" role="tablist" aria-label="${w("Чекори на варење", "Brewing stages")}">${b.brewing.map((s, i) => `<button id="stage-tab-${i}" class="brew-tab" type="button" role="tab" aria-selected="${i === 0}" aria-controls="stage-panel" tabindex="${i === 0 ? 0 : -1}" data-step="${i}"><span>0${i + 1}</span>${s.title[lang]}</button>`).join("")}</div><div class="recipe-panel" role="tabpanel" id="stage-panel" aria-labelledby="stage-tab-0" tabindex="0"><div class="recipe-image">${image(b.brewing[0].img.replace("public/assets/", ""), b.brewing[0].title[lang])}</div><div class="recipe-text"><p class="eyebrow" data-recipe-count>01 / 05</p><h3 data-recipe-title>${b.brewing[0].title[lang]}</h3><p data-recipe-body>${b.brewing[0].body[lang]}</p><div class="recipe-metrics"><div><span>${w("Температура", "Temperature")}</span><strong data-recipe-temp>18°C</strong></div><div><span>${w("Густина", "Gravity")}</span><strong data-recipe-gravity>—</strong></div></div></div></div><noscript>${b.brewing
      .slice(1)
      .map((s) => `<h3>${s.title[lang]}</h3><p>${s.body[lang]}</p>`)
      .join(
        "",
      )}</noscript></section><a class="next-beer section" href="${next.slug}.html"><div>${label("0" + (((idx + 1) % 5) + 1), w("Следниот карактер", "The next character"))}<h2 class="display">${next.name[lang]}</h2><p>${next.style[lang]} · ${next.abv} ABV</p></div><span>${icons.arrow}</span></a>`;
  }
  if (page === "journal")
    content = `${intro("04", w("Белешки од пиварницата", "Notes from the brewery"), w("МАЛИ ПРИКАЗНИ.<br><em>ДОЛГ ЗАВРШЕТОК.</em>", "SMALL STORIES.<br><em>LONG FINISH.</em>"), w("За вкусот, процесот и сè што го прави едно пиво вредно за разговор.", "On flavor, process, and everything that makes a beer worth talking about."))}<section class="section journal-list">${D.posts.map((post, i) => `<article class="journal-article reveal" id="story-${i + 1}"><div class="journal-image">${image(["beer-stories/kaluger/pour.jpg", "beer-stories/magla/hero.jpg", "brand/bottle-lineup-ai.jpg"][i], post.title[lang])}</div><div class="journal-copy"><p class="eyebrow">0${i + 1} / ${new Intl.DateTimeFormat(lang === "mk" ? "mk-MK" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.date + "T12:00:00"))}</p><h2>${post.title[lang]}</h2><p>${post.text[lang]}</p><details><summary>${w("Прочитај ја приказната", "Read the story")} <span>+</span></summary><div><p>${[w("Калуѓер користи пилснер слад и белгиски канди шеќер. Шеќерот ја зголемува јачината без да го отежне телото. Белгискиот квасец носи овошје и зачин, додека Styrian Goldings и Saaz го балансираат завршетокот со 30 IBU.", "Kaluǵer uses pilsner malt and Belgian candi sugar. The sugar lifts the strength without weighing down the body. Belgian yeast brings fruit and spice, while Styrian Goldings and Saaz balance the finish with 30 IBU."), w("Магла почнува со висок удел пченичен слад. Топлата ферментација со вајцен квасец ги создава препознатливите ароми на банана и каранфилче. Само 12 IBU од Tettnang му оставаат простор на квасецот да ја раскаже приказната.", "Magla begins with a high proportion of wheat malt. Warm fermentation with weizen yeast creates its recognizable banana and clove aromas. Just 12 IBU of Tettnang gives the yeast room to tell the story."), w("Почни со свежото Зрно, па продолжи со меката Магла. Калуѓер носи златен, сув и зачински карактер, Опат додава темно овошје и карамел, а Корен завршува со печен слад. Ова не е скала на горчина: секое шише отвора различен дел од колекцијата.", "Start with crisp Zrno, then move to soft Magla. Kaluǵer brings a golden, dry, spicy character, Opat adds dark fruit and caramel, and Koren finishes with roasted malt. This is not a ladder of bitterness: each bottle opens up a different part of the collection.")][i]}</p>${link(i === 2 ? "visit.html" : "pivo/" + ["kaluger", "magla"][i] + ".html", i === 2 ? w("Запознај ја дегустацијата", "Explore the tasting") : w("Запознај го пивото", "Meet the beer"), "text-link")}</div></details></div></article>`).join("")}</section>${cta()}`;
  if (page === "visit")
    content = `${intro("05", w("Вратата е отворена", "The door is open"), w("ПИВОТО Е ПОДОБРО<br><em>ВО ДРУШТВО.</em>", "GOOD BEER.<br><em>BETTER COMPANY.</em>"), w("Зад секое шише има приказна. Дојди да ја слушнеш таму каде што почнува.", "There is a story behind every bottle. Come hear it where it begins."))}<section class="visit-banner">${image("process/tanks.jpg", w("Ферментори во пиварницата", "Brewery fermentation tanks"), "", false)}<div><span>${w("СКОПЈЕ, МАКЕДОНИЈА", "SKOPJE, MACEDONIA")}</span><p>${w("ДОЈДИ ЉУБОПИТЕН.<br>ЗАМИНИ СО ПРИКАЗНА.", "COME CURIOUS.<br>LEAVE WITH A STORY.")}</p></div></section><section class="section experiences"><div class="section-heading"><div>${label("01", w("Избери го искуството", "Choose your experience"))}<h2 class="display">${w("ТВОЈАТА ТУРА.", "MAKE IT YOUR ROUND.")}</h2></div><p>${w("Мали групи. Добри разговори.", "Small groups. Good conversations.")}</p></div><div class="experience-grid">${D.services
      .slice(0, 3)
      .map(
        (s, i) =>
          `<article class="experience-card reveal"><span class="eyebrow">0${i + 1} / ${s.duration[lang]}</span><h3>${s.title[lang]}</h3><p class="experience-price">${i === 2 ? w("од 6.000", "from 6,000") : s.price.split(" ")[0]} <small>MKD</small></p><ul>${s.items[lang].map((x) => `<li>${x}</li>`).join("")}</ul><a class="text-link" href="#booking" data-experience="${i}">${w("Избери искуство", "Choose experience")}${icons.arrow}</a></article>`,
      )
      .join(
        "",
      )}</div><p class="seasonal-note">✳ ${w("Сезонски настани: нови варења и гостински менија. Детали во дневникот.", "Seasonal gatherings: new releases and guest menus. Details in the journal.")} <a href="journal.html">${w("Кон дневникот", "Read the journal")} ↗</a></p></section><section id="booking" class="section booking-section"><div class="booking-info">${label("02", w("Планирај посета", "Plan a visit"))}<h2 class="display">${w("ДА СЕ<br><em>ЗАПОЗНАЕМЕ.</em>", "LET’S<br><em>MEET.</em>")}</h2><p>${w("Ова е студентски концепт за измислена пиварница. Формуларот подготвува пример за е-пошта; не потврдува вистинска резервација.", "This is a student concept for a fictional brewery. The form prepares an example email; it does not confirm a real reservation.")}</p><dl><div><dt>${w("Адреса", "Address")}</dt><dd>${w("ул. Индустриска 12, Скопје", "Industriska 12, Skopje")}</dd></div><div><dt>${w("Работно време", "Hours")}</dt><dd>${w("Сре–пет 16:00–22:00<br>Саб 12:00–22:00", "Wed–Fri 16:00–22:00<br>Sat 12:00–22:00")}</dd></div><div><dt>${w("Контакт", "Contact")}</dt><dd><a href="mailto:tastings@pivarahmel.mk">tastings@pivarahmel.mk</a><br><a href="tel:+38970555214">+389 70 555 214</a></dd></div></dl></div><form id="booking-form" class="booking-form" action="mailto:tastings@pivarahmel.mk" method="post" enctype="text/plain"><div class="form-row"><label>${w("Твоето име", "Your name")}<input required name="name" autocomplete="name" placeholder="${w("Име и презиме", "First and last name")}" maxlength="100"></label><label>${w("Е-пошта", "Email address")}<input type="email" required name="email" autocomplete="email" placeholder="you@example.com" maxlength="200"></label></div><label>${w("Искуство", "Experience")}<select name="experience">${D.services
      .slice(0, 3)
      .map((s, i) => `<option value="${i}">${s.title[lang]}</option>`)
      .join(
        "",
      )}</select></label><div class="form-row"><label>${w("Посакуван датум", "Preferred date")}<input required name="date" type="date"></label><label>${w("Број на гости", "Number of guests")}<input required name="guests" type="number" min="1" max="24" value="2"></label></div><label>${w("Уште нешто?", "Anything else?")}<textarea name="message" rows="3" maxlength="1500" placeholder="${w("Посебни барања, омилено пиво...", "Special requests, a favorite beer...")}"></textarea></label><label class="checkbox-label"><input type="checkbox" required name="age">${w("Имам 18 или повеќе години.", "I am 18 years of age or older.")}</label><button type="submit" class="button button-accent"><span>${w("Подготви барање", "Prepare your request")}</span>${icons.arrow}</button><p class="form-note">${w("Ќе ја видиш пораката пред да ја отвориш во е-пошта.", "You can review your message before opening it in your email app.")}</p><div id="form-status" role="status" hidden></div></form></section><section class="section faq-section"><div>${label("03", w("Добро е да знаеш", "Good to know"))}<h2 class="display">${w("ПРЕД ПРВАТА<br>ГОЛТКА.", "BEFORE THE<br>FIRST SIP.")}</h2></div><div>${D.faqs.map((f) => `<details><summary>${f.q[lang]}<span>+</span></summary><p>${f.a[lang]}</p></details>`).join("")}</div></section>`;

  if (page === "cookies")
    content = `${intro("ХМЕЛ", w("Приватност", "Privacy"), w("КОЛАЧИЊА.<br><em>БЕЗ СЛЕДЕЊЕ.</em>", "COOKIES.<br><em>NO TRACKING.</em>"), w("Што зачувуваме на твојот уред и зошто. Нема аналитика, реклами ни следење.", "What we store on your device, and why. No analytics, no ads, no tracking."))}<section class="section policy"><h2>${w("Што зачувуваме", "What we store")}</h2><ul class="policy-list">${[
      ["hmel-consent", w("колаче", "cookie"), w("Памети дека го затвори известувањето за колачиња.", "Remembers that you closed the cookie notice."), w("1 година", "1 year")],
      ["hmel-theme", w("локално складирање", "local storage"), w("Светла или темна тема.", "Light or dark theme.")],
      ["hmel-motion", w("локално складирање", "local storage"), w("Дали го паузираше движењето на страницата.", "Whether you paused motion on the site.")],
    ]
      .map(([name, where, why, how = w("додека не го избришеш", "until you clear it")]) => `<li><h3><code>${name}</code></h3><p>${why}</p><small>${where} · ${how}</small></li>`)
      .join("")}</ul><h2>${w("Надворешни услуги", "Outside services")}</h2><p>${w("Фонтовите се вчитуваат од Google Fonts, па Google ја гледа твојата IP адреса. Google Fonts не поставува колачиња.", "Fonts load from Google Fonts, so Google sees your IP address. Google Fonts sets no cookies.")}</p><h2>${w("Како да го повлечеш изборот", "How to change your mind")}</h2><p>${w("Избриши ги колачињата и податоците за оваа страница во прелистувачот. Известувањето ќе се појави повторно.", "Clear cookies and site data for this site in your browser. The notice will appear again.")}</p></section>`;

  const footer = `<footer class="site-footer section"><div class="footer-top"><p>${w("МАЛА ПИВАРНИЦА.<br>ГОЛЕМ КАРАКТЕР.", "SMALL BREWERY.<br>BIG CHARACTER.")}</p><div>${nav.map(([url, title]) => `<a href="${href(url)}">${title}</a>`).join("")}</div><div><a href="${href("visit.html")}">${w("Посети нè", "Come say hello")} ↗</a><a href="mailto:tastings@pivarahmel.mk">tastings@pivarahmel.mk</a><span>${w("Скопје, Македонија", "Skopje, Macedonia")}</span></div></div><a class="footer-wordmark" href="${href("index.html")}">${w("хмел", "hmel")}<sup>®</sup></a><div class="footer-bottom"><span>© 2026 ${w("Пивара Хмел", "Pivara Hmel")}</span><span>${w("Студентски концепт · измислена пиварница", "Student concept · fictional brewery")}</span><a href="${href("cookies.html")}">${w("Колачиња", "Cookies")}</a><button type="button" class="motion-toggle" aria-pressed="false">${w("Паузирај движење", "Pause motion")}</button><span>18+ · ${w("Уживај одговорно", "Enjoy responsibly")}</span></div></footer>`;
  // In the HTML for every visitor (crawlers included); the head script hides it once accepted.
  const cookieBanner = `<section class="cookie-banner" aria-label="${w("Известување за колачиња", "Cookie notice")}"><p>${w("Користиме едно колаче за да го запомниме овој избор и локално складирање за темата и движењето. Без следење и реклами.", "We use one cookie to remember this choice, and local storage for your theme and motion settings. No tracking, no ads.")}</p><div><button type="button" class="button button-accent cookie-accept">${w("Прифати", "Accept")}</button><a class="text-link" href="${href("cookies.html")}">${w("Дознај повеќе", "Learn more")}</a></div></section>`;
  return header + `<main id="main">${content}</main>` + footer + cookieBanner;
}
function pageFile(page, slug = "") {
  if (page === "home") return "index.html";
  return page === "beer" ? "pivo/" + slug + ".html" : page + ".html";
}
// Macedonian pages live at the site root, English ones under en/.
function siteRootFor(page, lang) {
  return (lang === "en" ? "../" : "") + (page === "beer" ? "../" : "");
}
module.exports = { renderPage, pageFile, siteRootFor };
