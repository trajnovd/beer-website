/* Booking form: paste the Web3Forms access key here (https://web3forms.com).
   The key is meant to be public. While it is empty the form says it is not connected. */
const WEB3FORMS_ACCESS_KEY = "";
/* Footer social links. Placeholder handles: the brewery is fictional and the PRD names none. */
const SOCIAL_LINKS = [
  ["Instagram", "https://www.instagram.com/pivarahmel/"],
  ["Facebook", "https://www.facebook.com/pivarahmel"],
];

const beers = [
  {
    slug: "zrno",
    color: "#E8B33A",
    image: "public/assets/bottles/zrno-ai.jpg",
    name: { mk: "Зрно", en: "Zrno" },
    meaning: { mk: "„Зрно“", en: "“Grain”" },
    style: { mk: "Пале лагер", en: "Pale Lager" },
    abv: "4.8%",
    ibu: 18,
    og: "1.046",
    srm: 4,
    malt: "Pilsner, Vienna",
    hops: "Saaz, Hallertau",
    yeast: "Lager",
    glass: { mk: "висока чаша", en: "tall glass" },
    note: {
      mk: "Чисто, свежо и лебно-сладок завршеток за секојдневно пиво без компромис.",
      en: "Clean, crisp and softly bready, an everyday beer without cutting corners.",
    },
    story: {
      mk: "Зрно е нашата мерка за дисциплина. Нема тежок хмељ што ќе сокрие грешка, само чист слад, ладна ферментација и доволно време за да се избистри.",
      en: "Zrno is our discipline test. No loud hops to hide behind, just clean malt, cool fermentation and enough time to settle bright.",
    },
    pairing: { mk: "скара, лесно сирење", en: "grilled meats, light cheese" },
    serve: "5-7°C",
    brewing: [
      {
        title: { mk: "Слад и мелење", en: "Malt & milling" },
        img: "public/assets/beer-stories/zrno/hero.jpg",
        body: {
          mk: "Пилснер и виенски слад, ситно мелени за чист, лебно-сладок екстракт без печени тонови.",
          en: "Pilsner and Vienna malt, finely milled for a clean, bready-sweet extract with no roast.",
        },
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/zrno/mash.jpg",
        body: {
          mk: "Едноставно замешување на средна температура за добро избистрено, питко тело.",
          en: "A single, mid-temperature mash for a well-attenuated, drinkable body.",
        },
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/zrno/boil.jpg",
        body: {
          mk: "Благороден Saaz и Hallertau додадени умерено — само 18 IBU, тек колку да го засушат завршетокот.",
          en: "Noble Saaz and Hallertau added gently — just 18 IBU, enough to dry the finish.",
        },
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/beer-stories/zrno/process.jpg",
        body: {
          mk: "Ладна лагер-ферментација и долго одлежување за чистина без естри.",
          en: "Cold lager fermentation and a long rest for clean, ester-free clarity.",
        },
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/zrno/pour.jpg",
        body: {
          mk: "Лагерирано додека не се избистри светло злато; сервирано на 5–7°C во висока чаша.",
          en: "Lagered until bright pale gold; served at 5–7°C in a tall glass.",
        },
      },
    ],
  },
  {
    slug: "magla",
    color: "#E9CE72",
    image: "public/assets/bottles/magla-ai.jpg",
    name: { mk: "Магла", en: "Magla" },
    meaning: { mk: "„Магла“", en: "“Mist”" },
    style: { mk: "Пченично пиво", en: "Hefeweizen" },
    abv: "5.2%",
    ibu: 12,
    og: "1.051",
    srm: 4,
    malt: "Wheat, Pilsner",
    hops: "Tettnang",
    yeast: "Weizen",
    glass: { mk: "вајцен чаша", en: "weizen glass" },
    note: {
      mk: "Магливо, нефилтрирано, со банана и каранфилче од квасецот.",
      en: "Cloudy and unfiltered, with banana and clove from the yeast.",
    },
    story: {
      mk: "Магла ја оставаме намерно матна. Пченичниот слад и квасецот носат меко тело, густа пена и арома што не доаѓа од додатоци, туку од ферментација.",
      en: "Magla stays hazy on purpose. Wheat malt and yeast bring the soft body, dense foam and aroma from fermentation, not additives.",
    },
    pairing: {
      mk: "салати, морска храна, бранч",
      en: "salads, seafood, brunch",
    },
    serve: "4-6°C",
    brewing: [
      {
        title: { mk: "Слад и мелење", en: "Malt & milling" },
        img: "public/assets/beer-stories/magla/hero.jpg",
        body: {
          mk: "Висок удел пченичен слад со пилснер — основата на меката текстура и густата пена.",
          en: "A high proportion of wheat malt with pilsner — the base of the soft body and thick head.",
        },
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/magla/mash.jpg",
        body: {
          mk: "Замешување прилагодено за пченица, кое ја гради карактеристичната магловита непрозирност.",
          en: "A wheat-tuned mash that builds the signature hazy, unfiltered cloudiness.",
        },
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/magla/boil.jpg",
        body: {
          mk: "Минимален Tettnang, само 12 IBU — хмелот намерно отстапува пред квасецот.",
          en: "Minimal Tettnang at just 12 IBU — hops deliberately step aside for the yeast.",
        },
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Топла ферментација со вајцен квасец што раѓа банана и каранфилче, без додатоци.",
          en: "Warm fermentation with weizen yeast that creates banana and clove — no additives.",
        },
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/magla/pour.jpg",
        body: {
          mk: "Останува нефилтрирано и матно; сервирано на 4–6°C во висока вајцен чаша.",
          en: "Left unfiltered and cloudy; served at 4–6°C in a tall weizen glass.",
        },
      },
    ],
  },
  {
    slug: "kaluger",
    color: "#D9A227",
    image: "public/assets/bottles/kaluger-ai.jpg",
    name: { mk: "Калуѓер", en: "Kaluǵer" },
    meaning: { mk: "„Калуѓер“", en: "“Monk”" },
    style: { mk: "Белгиски трипел", en: "Belgian Tripel" },
    abv: "8.5%",
    ibu: 30,
    og: "1.078",
    srm: 5,
    malt: "Pilsner, Belgian candi sugar",
    hops: "Styrian Goldings, Saaz",
    yeast: "Belgian abbey",
    glass: { mk: "тулипан чаша", en: "tulip glass" },
    note: {
      mk: "Златно, суво и измамливо силно, со зачински белгиски квасец.",
      en: "Golden, dry and deceptively strong, with spicy Belgian yeast character.",
    },
    story: {
      mk: "Калуѓер е тивкото силно шише. Канди шеќерот ја крева ферментацијата, но завршетокот останува сув, па алкохолот е скриен зад овошје и зачин.",
      en: "Kaluǵer is the quiet strong bottle. Candi sugar lifts fermentation, but the finish stays dry, hiding strength behind fruit and spice.",
    },
    pairing: {
      mk: "печено пиле, силно сирење",
      en: "roast chicken, washed-rind cheese",
    },
    serve: "8-10°C",
    brewing: [
      {
        title: { mk: "Слад и мелење", en: "Malt & milling" },
        img: "public/assets/beer-stories/kaluger/hero.jpg",
        body: {
          mk: "Светол пилснер слад со белгиски канди шеќер што ја крева јачината без да го отежне телото.",
          en: "Pale pilsner malt with Belgian candi sugar that lifts the strength without weighing the body.",
        },
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/kaluger/mash.jpg",
        body: {
          mk: "Замешување за висока сврзливост, па шеќерите ферментираат речиси целосно во сув крај.",
          en: "A mash for high fermentability, so the sugars ferment almost fully to a dry finish.",
        },
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/kaluger/boil.jpg",
        body: {
          mk: "Styrian Goldings и Saaz за зачинска горчина од 30 IBU што го балансира алкохолот.",
          en: "Styrian Goldings and Saaz for a spicy 30 IBU bitterness that balances the alcohol.",
        },
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Топол белгиски квасец од опатија дава овошје и зачин, а ја крие силата од 8.5%.",
          en: "Warm Belgian abbey yeast brings fruit and spice while hiding the 8.5% strength.",
        },
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/kaluger/pour.jpg",
        body: {
          mk: "Кондиционирано до елегантно сув, измамливо силен трипел; сервирано на 8–10°C во тулипан.",
          en: "Conditioned to an elegant, deceptively strong dry tripel; served at 8–10°C in a tulip.",
        },
      },
    ],
  },
  {
    slug: "opat",
    color: "#6E3A1E",
    image: "public/assets/bottles/opat-ai.jpg",
    name: { mk: "Опат", en: "Opat" },
    meaning: { mk: "„Опат“", en: "“Abbot”" },
    style: { mk: "Белгиски дабл", en: "Belgian Dubbel" },
    abv: "7.5%",
    ibu: 20,
    og: "1.068",
    srm: 18,
    malt: "Pilsner, CaraMunich, Special B",
    hops: "Styrian Goldings",
    yeast: "Belgian abbey",
    glass: { mk: "калеж", en: "chalice" },
    note: {
      mk: "Рубинесто-кафеаво, со суво грозје, смоква, карамела и темно овошје.",
      en: "Ruby-brown, with raisin, fig, caramel and dark fruit.",
    },
    story: {
      mk: "Опат е второто белгиско пиво во линијата. Специјалните темни сладови даваат слоеви на овошје и карамела, но телото останува питко.",
      en: "Opat is the second Belgian beer in the range. Dark specialty malts give layers of fruit and caramel while the body stays drinkable.",
    },
    pairing: {
      mk: "манџи, стар кашкавал, темно чоколадо",
      en: "stews, aged gouda, dark chocolate",
    },
    serve: "10-12°C",
    brewing: [
      {
        title: { mk: "Слад и мелење", en: "Malt & milling" },
        img: "public/assets/beer-stories/opat/hero.jpg",
        body: {
          mk: "Пилснер со CaraMunich и Special B плюс темен канди шеќер — извор на грозје, смоква и карамела.",
          en: "Pilsner with CaraMunich and Special B plus dark candi sugar — the source of raisin, fig and caramel.",
        },
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/opat/mash.jpg",
        body: {
          mk: "Замешување што задржува тело и слоеви, за рубинесто-кафеава боја и полнота.",
          en: "A mash that keeps body and layers, for a ruby-brown color and depth.",
        },
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/opat/boil.jpg",
        body: {
          mk: "Само Styrian Goldings, ниски 20 IBU — темните сладови и квасецот ја носат главната улога.",
          en: "Styrian Goldings alone at a low 20 IBU — dark malts and yeast lead instead.",
        },
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Истиот опатиски квасец како Калуѓер, тука извира темно овошје и топла сложеност.",
          en: "The same abbey yeast as Kaluǵer, here drawing out dark fruit and warm complexity.",
        },
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/opat/pour.jpg",
        body: {
          mk: "Одлежано за богато но питко тело; сервирано на 10–12°C во калеж.",
          en: "Aged for a rich but drinkable body; served at 10–12°C in a chalice.",
        },
      },
    ],
  },
  {
    slug: "koren",
    color: "#1E120B",
    image: "public/assets/bottles/koren-ai.jpg",
    name: { mk: "Корен", en: "Koren" },
    meaning: { mk: "„Корен“", en: "“Root”" },
    style: { mk: "Робуст портер", en: "Robust Porter" },
    abv: "6.2%",
    ibu: 38,
    og: "1.060",
    srm: 32,
    malt: "Maris Otter, Roasted barley, Chocolate",
    hops: "Fuggle, East Kent Goldings",
    yeast: "Ale",
    glass: { mk: "пинта", en: "pint" },
    note: {
      mk: "Темно, печено, со кафе, горчливо чоколадо и долга топла завршница.",
      en: "Dark and roasty, with coffee, bitter chocolate and a long warm finish.",
    },
    story: {
      mk: "Корен го носи печеното јадро на пиварницата. Темниот слад се додава внимателно за да има кафе и чоколадо без груба пепелност.",
      en: "Koren carries the brewery's roasted core. Dark malt is added carefully for coffee and chocolate without harsh ash.",
    },
    pairing: {
      mk: "скара, чоколаден десерт",
      en: "grilled meat, chocolate dessert",
    },
    serve: "10-12°C",
    brewing: [
      {
        title: { mk: "Слад и мелење", en: "Malt & milling" },
        img: "public/assets/beer-stories/koren/hero.jpg",
        body: {
          mk: "Maris Otter со печен јачмен, чоколаден и црн слад — јадрото на кафето и горчливото чоколадо.",
          en: "Maris Otter with roasted barley, chocolate and black malt — the core of coffee and bitter chocolate.",
        },
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/koren/mash.jpg",
        body: {
          mk: "Замешување со внимателен дел печени сладови за длабока боја без груба пепелност.",
          en: "A mash with a measured share of roasted malts for deep color without harsh ash.",
        },
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/koren/boil.jpg",
        body: {
          mk: "Англиски Fuggle и East Kent Goldings до 38 IBU, за земјена горчина што го балансира печеното.",
          en: "English Fuggle and East Kent Goldings to 38 IBU, an earthy bitterness balancing the roast.",
        },
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Чиста ale-ферментација која остава простор печените тонови да доминираат.",
          en: "A clean ale fermentation that leaves room for the roasted notes to lead.",
        },
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/koren/pour.jpg",
        body: {
          mk: "Кондиционирано за кремаста пена и долга топла завршница; сервирано на 10–12°C во пинта.",
          en: "Conditioned for a creamy head and a long warm finish; served at 10–12°C in a pint.",
        },
      },
    ],
  },
];

const services = [
  {
    title: { mk: "Дегустација", en: "Tasting Flight" },
    price: "450 MKD",
    duration: { mk: "45 минути", en: "45 minutes" },
    items: {
      mk: ["пет шишиња по ред", "кратка спецификација", "мала закуска"],
      en: ["five bottles in order", "short spec walkthrough", "small snack"],
    },
  },
  {
    title: { mk: "Тура низ пиварницата", en: "Brewery Tour" },
    price: "750 MKD",
    duration: { mk: "75 минути", en: "75 minutes" },
    items: {
      mk: [
        "казан, ферментори и пакување",
        "дегустација на три пива",
        "прашања со пивар",
      ],
      en: [
        "kettle, fermenters and packaging",
        "three-beer tasting",
        "brewer Q&A",
      ],
    },
  },
  {
    title: { mk: "Приватна група", en: "Private Group" },
    price: "од 6,000 MKD",
    duration: { mk: "до 2 часа", en: "up to 2 hours" },
    items: {
      mk: ["10-24 гости", "целата линија шишиња", "парење со храна"],
      en: ["10-24 guests", "full bottle lineup", "food pairing"],
    },
  },
  {
    title: { mk: "Сезонски настан", en: "Seasonal Event" },
    price: "најава",
    duration: { mk: "варира", en: "varies" },
    items: {
      mk: ["ново варење", "гостински мени", "блог најава"],
      en: ["new release", "guest menu", "blog announcement"],
    },
  },
];

/* Initials avatars use the beer colour; a photo at public/assets/team/<id>.jpg replaces them. */
const team = [
  {
    id: "ana-stojanovska",
    beer: "zrno",
    name: { mk: "Ана Стојановска", en: "Ana Stojanovska" },
    role: { mk: "Главен пивар", en: "Head brewer" },
    bio: {
      mk: "Рецептите, балансот и сите мали детали што го прават пивото наше.",
      en: "The recipes, the balance, and all the little details that make the beer ours.",
    },
  },
  {
    id: "martin-iliev",
    beer: "opat",
    name: { mk: "Мартин Илиев", en: "Martin Iliev" },
    role: { mk: "Пиварница и процес", en: "Brewery & process" },
    bio: {
      mk: "Температури, ферментација и трпение. Секој казан е во добри раце.",
      en: "Temperatures, fermentation, and patience. Every kettle is in good hands.",
    },
  },
  {
    id: "elena-petrova",
    beer: "magla",
    name: { mk: "Елена Петрова", en: "Elena Petrova" },
    role: { mk: "Дегустации", en: "Tastings & hospitality" },
    bio: {
      mk: "Твојот водич низ петте шишиња — и приказните што доаѓаат со нив.",
      en: "Your guide to the five bottles — and the stories that come with them.",
    },
  },
];

/* Newest first: the home page teases posts[0]. */
const posts = [
  {
    date: "2026-06-18",
    image: "beer-stories/kaluger/pour.jpg",
    title: {
      mk: "Зошто Калуѓер завршува суво",
      en: "Why Kaluǵer Finishes Dry",
    },
    text: {
      mk: "Трипелот е силен, но не треба да биде тежок. Канди шеќерот помага да се добие сув, елегантен крај.",
      en: "A tripel is strong, but it should not feel heavy. Candi sugar helps create a dry, elegant finish.",
    },
  },
  {
    date: "2026-06-10",
    image: "beer-stories/magla/hero.jpg",
    title: {
      mk: "Магла: квасецот ја прави аромата",
      en: "Magla: Yeast Makes the Aroma",
    },
    text: {
      mk: "Банана и каранфилче не се сируп. Тие се ферментациски естри и феноли од пченичен квасец.",
      en: "Banana and clove are not syrup. They are fermentation esters and phenols from wheat yeast.",
    },
  },
  {
    date: "2026-05-28",
    image: "brand/bottle-lineup-ai.jpg",
    title: {
      mk: "Пет шишиња, една дегустациска линија",
      en: "Five Bottles, One Tasting Line",
    },
    text: {
      mk: "Редоследот од Зрно до Корен не е случаен: секое шише открива друг дел од колекцијата.",
      en: "The order from Zrno to Koren is deliberate: each bottle reveals another side of the collection.",
    },
  },
];

/* Practical questions a visitor actually asks before turning up. Answers are
   specific on purpose — an FAQ that hedges is not worth the scroll. */
const faqs = [
  {
    q: {
      mk: "Дали треба да резервирам однапред?",
      en: "Do I need to book ahead?",
    },
    a: {
      mk: "Да. Работиме со мали групи и еден пивар ја води турата, па термините се ограничени. Пишете ни барем три дена однапред.",
      en: "Yes. We run small groups and one brewer leads every tour, so slots are limited. Write to us at least three days ahead.",
    },
  },
  {
    q: { mk: "Која е возрасната граница?", en: "What is the age limit?" },
    a: {
      mk: "Дегустацијата е од 18 години. Помладите се добредојдени на турата без дегустација, во придружба на возрасен.",
      en: "Tastings are 18 and over. Younger visitors are welcome on the tour without the tasting, with an adult.",
    },
  },
  {
    q: {
      mk: "Како да стигнам и каде да паркирам?",
      en: "How do I get there and where do I park?",
    },
    a: {
      mk: "ул. Индустриска 12, Скопје. Има бесплатен паркинг пред влезот и автобуска постојка на 300 метри.",
      en: "Industriska 12, Skopje. There is free parking at the entrance and a bus stop 300 metres away.",
    },
  },
  {
    q: { mk: "Дали просторот е пристапен?", en: "Is the space accessible?" },
    a: {
      mk: "Пиварницата и тоалетот се во приземје, без скали. Кажете ни однапред за да ја расчистиме патеката покрај казаните.",
      en: "The brewery and the toilet are on the ground floor, no stairs. Tell us in advance so we can clear the route past the kettles.",
    },
  },
  {
    q: { mk: "Што содржат пивата?", en: "What is in the beers?" },
    a: {
      mk: "Сите пет содржат јачмен, а Магла содржи и пченица — значи глутен. Не бистриме со средства од животинско потекло.",
      en: "All five contain barley, and Magla also contains wheat — so gluten. We do not fine the beer with anything of animal origin.",
    },
  },
  {
    q: {
      mk: "Може ли да купам шишиња за дома?",
      en: "Can I buy bottles to take home?",
    },
    a: {
      mk: "Може, на самото место по турата. Не продаваме преку интернет.",
      en: "Yes, on site after the tour. We do not sell online.",
    },
  },
];

const state = { lang: "mk" };
const SRM_CHART = (
  "FFE699 FFD878 FFCA5A FFBF42 FBB123 F8A600 F39C00 EA8F00 E58500 DE7C00 " +
  "D77200 CF6900 CB6200 C35900 BB5100 B54C00 B04500 A63E00 A13700 9B3200 " +
  "952D00 8E2900 882300 821E00 7B1A00 771900 701400 6A0E00 660D00 5E0B00 " +
  "5A0A02 600903 520907 4C0505 470606 440607 3F0708 3B0607 3A070B 36080A"
).split(" ");

const WORT_RGB = [232, 200, 122]; /* --wort: pale pre-boil extract */

function srmRgb(srm) {
  const hex = SRM_CHART[Math.min(Math.max(Math.round(srm), 1), 40) - 1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function mixRgb(from, to, amount) {
  return from.map((channel, i) =>
    Math.round(channel + (to[i] - channel) * amount),
  );
}

const rgbCss = (rgb) => `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;

/* Fermentation and conditioning behave differently per yeast, so read the
   yeast the recipe actually names rather than hard-coding one schedule. */
function yeastProfile(yeast) {
  const name = String(yeast).toLowerCase();
  if (name.includes("lager")) return { fermC: 11, fermDays: 21, condDays: 30 };
  if (name.includes("weizen")) return { fermC: 20, fermDays: 7, condDays: 10 };
  if (name.includes("belgian"))
    return { fermC: 24, fermDays: 14, condDays: 21 };
  return { fermC: 19, fermDays: 10, condDays: 14 };
}

/* The five stages of a brew day, derived from the beer's own spec sheet.
   FG comes from the standard ABV relation, so the gravity drop shown during
   fermentation is the one this recipe actually produces. */
function brewStages(beer) {
  const og = parseFloat(beer.og);
  const abv = parseFloat(beer.abv);
  const fg = og - abv / 131.25;
  const { fermC, fermDays, condDays } = yeastProfile(beer.yeast);
  const serveC = parseInt(beer.serve, 10);
  const finalRgb = srmRgb(beer.srm);
  const gravity = (value) => value.toFixed(3);
  const days = (n) => (state.lang === "mk" ? `${n} дена` : `${n} days`);

  return [
    {
      fill: 0.05,
      tint: 0,
      temp: 18,
      clock: "-00:20",
      gravity: "—",
      detail: beer.malt,
      mode: "dry",
    },
    {
      fill: 0.52,
      tint: 0.3,
      temp: 66,
      clock: "01:00",
      gravity: gravity(og),
      detail: `${beer.malt} · 66°C`,
      mode: "still",
    },
    {
      fill: 0.74,
      tint: 0.62,
      temp: 100,
      clock: "02:00",
      gravity: gravity(og),
      detail: `${beer.hops} · ${beer.ibu} IBU`,
      mode: "boil",
    },
    {
      fill: 0.84,
      tint: 1,
      temp: fermC,
      clock: days(fermDays),
      gravity: `${gravity(og)} → ${gravity(fg)}`,
      detail: beer.yeast,
      mode: "ferment",
    },
    {
      fill: 0.88,
      tint: 1,
      temp: serveC,
      clock: days(condDays),
      gravity: gravity(fg),
      detail: `${beer.serve} · ${beer.glass[state.lang]}`,
      mode: "serve",
    },
  ].map((stage) => ({
    ...stage,
    color: rgbCss(mixRgb(WORT_RGB, finalRgb, stage.tint)),
  }));
}

if (typeof module !== "undefined")
  module.exports = {
    WEB3FORMS_ACCESS_KEY,
    SOCIAL_LINKS,
    beers,
    services,
    team,
    posts,
    faqs,
    state,
    brewStages,
    srmRgb,
  };
