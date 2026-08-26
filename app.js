/* Пивара Хмел — shared data + page-aware rendering.
   One data source drives the home one-pager and the five real beer pages
   (pivo/<slug>.html). A beer page sets <body data-beer="slug">; everything
   beer-specific is injected here from `beers`, so copy lives in one place. */

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
      en: "Clean, crisp and softly bready, an everyday beer without cutting corners."
    },
    story: {
      mk: "Зрно е нашата мерка за дисциплина. Нема тежок хмељ што ќе сокрие грешка, само чист слад, ладна ферментација и доволно време за да се избистри.",
      en: "Zrno is our discipline test. No loud hops to hide behind, just clean malt, cool fermentation and enough time to settle bright."
    },
    pairing: { mk: "скара, лесно сирење", en: "grilled meats, light cheese" },
    serve: "5-7°C",
    brewing: [
      {
        title: { mk: "Слад и меленье", en: "Malt & milling" },
        img: "public/assets/beer-stories/zrno/hero.jpg",
        body: {
          mk: "Пилснер и виенски слад, ситно мелени за чист, лебно-сладок екстракт без печени тонови.",
          en: "Pilsner and Vienna malt, finely milled for a clean, bready-sweet extract with no roast."
        }
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/zrno/mash.jpg",
        body: {
          mk: "Едноставно замешување на средна температура за добро избистрено, питко тело.",
          en: "A single, mid-temperature mash for a well-attenuated, drinkable body."
        }
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/zrno/boil.jpg",
        body: {
          mk: "Благороден Saaz и Hallertau додадени умерено — само 18 IBU, тек колку да го засушат завршетокот.",
          en: "Noble Saaz and Hallertau added gently — just 18 IBU, enough to dry the finish."
        }
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/beer-stories/zrno/process.jpg",
        body: {
          mk: "Ладна лагер-ферментација и долго одлежување за чистина без естри.",
          en: "Cold lager fermentation and a long rest for clean, ester-free clarity."
        }
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/zrno/pour.jpg",
        body: {
          mk: "Лагерирано додека не се избистри светло злато; сервирано на 5–7°C во висока чаша.",
          en: "Lagered until bright pale gold; served at 5–7°C in a tall glass."
        }
      }
    ]
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
      en: "Cloudy and unfiltered, with banana and clove from the yeast."
    },
    story: {
      mk: "Магла ја оставаме намерно матна. Пченичниот слад и квасецот носат меко тело, густа пена и арома што не доаѓа од додатоци, туку од ферментација.",
      en: "Magla stays hazy on purpose. Wheat malt and yeast bring the soft body, dense foam and aroma from fermentation, not additives."
    },
    pairing: { mk: "салати, морска храна, бранч", en: "salads, seafood, brunch" },
    serve: "4-6°C",
    brewing: [
      {
        title: { mk: "Слад и меленье", en: "Malt & milling" },
        img: "public/assets/beer-stories/magla/hero.jpg",
        body: {
          mk: "Висок удел пченичен слад со пилснер — основата на меката текстура и густата пена.",
          en: "A high proportion of wheat malt with pilsner — the base of the soft body and thick head."
        }
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/magla/mash.jpg",
        body: {
          mk: "Замешување прилагодено за пченица, кое ја гради карактеристичната магловита непрозирност.",
          en: "A wheat-tuned mash that builds the signature hazy, unfiltered cloudiness."
        }
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/magla/boil.jpg",
        body: {
          mk: "Минимален Tettnang, само 12 IBU — хмелот намерно отстапува пред квасецот.",
          en: "Minimal Tettnang at just 12 IBU — hops deliberately step aside for the yeast."
        }
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Топла ферментација со вајцен квасец што раѓа банана и каранфилче, без додатоци.",
          en: "Warm fermentation with weizen yeast that creates banana and clove — no additives."
        }
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/magla/pour.jpg",
        body: {
          mk: "Останува нефилтрирано и матно; сервирано на 4–6°C во висока вајцен чаша.",
          en: "Left unfiltered and cloudy; served at 4–6°C in a tall weizen glass."
        }
      }
    ]
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
      en: "Golden, dry and deceptively strong, with spicy Belgian yeast character."
    },
    story: {
      mk: "Калуѓер е тивкото силно шише. Канди шеќерот ја крева ферментацијата, но завршетокот останува сув, па алкохолот е скриен зад овошје и зачин.",
      en: "Kaluǵer is the quiet strong bottle. Candi sugar lifts fermentation, but the finish stays dry, hiding strength behind fruit and spice."
    },
    pairing: { mk: "печено пиле, силно сирење", en: "roast chicken, washed-rind cheese" },
    serve: "8-10°C",
    brewing: [
      {
        title: { mk: "Слад и меленье", en: "Malt & milling" },
        img: "public/assets/beer-stories/kaluger/hero.jpg",
        body: {
          mk: "Светол пилснер слад со белгиски канди шеќер што ја крева јачината без да го отежне телото.",
          en: "Pale pilsner malt with Belgian candi sugar that lifts the strength without weighing the body."
        }
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/kaluger/mash.jpg",
        body: {
          mk: "Замешување за висока сврзливост, па шеќерите ферментираат речиси целосно во сув крај.",
          en: "A mash for high fermentability, so the sugars ferment almost fully to a dry finish."
        }
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/kaluger/boil.jpg",
        body: {
          mk: "Styrian Goldings и Saaz за зачинска горчина од 30 IBU што го балансира алкохолот.",
          en: "Styrian Goldings and Saaz for a spicy 30 IBU bitterness that balances the alcohol."
        }
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Топол белгиски квасец од опатија дава овошје и зачин, а ја крие силата од 8.5%.",
          en: "Warm Belgian abbey yeast brings fruit and spice while hiding the 8.5% strength."
        }
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/kaluger/pour.jpg",
        body: {
          mk: "Кондиционирано до елегантно сув, измамливо силен трипел; сервирано на 8–10°C во тулипан.",
          en: "Conditioned to an elegant, deceptively strong dry tripel; served at 8–10°C in a tulip."
        }
      }
    ]
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
      en: "Ruby-brown, with raisin, fig, caramel and dark fruit."
    },
    story: {
      mk: "Опат е второто белгиско пиво во линијата. Специјалните темни сладови даваат слоеви на овошје и карамела, но телото останува питко.",
      en: "Opat is the second Belgian beer in the range. Dark specialty malts give layers of fruit and caramel while the body stays drinkable."
    },
    pairing: { mk: "манџи, стар кашкавал, темно чоколадо", en: "stews, aged gouda, dark chocolate" },
    serve: "10-12°C",
    brewing: [
      {
        title: { mk: "Слад и меленье", en: "Malt & milling" },
        img: "public/assets/beer-stories/opat/hero.jpg",
        body: {
          mk: "Пилснер со CaraMunich и Special B плюс темен канди шеќер — извор на грозје, смоква и карамела.",
          en: "Pilsner with CaraMunich and Special B plus dark candi sugar — the source of raisin, fig and caramel."
        }
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/opat/mash.jpg",
        body: {
          mk: "Замешување што задржува тело и слоеви, за рубинесто-кафеава боја и полнота.",
          en: "A mash that keeps body and layers, for a ruby-brown color and depth."
        }
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/opat/boil.jpg",
        body: {
          mk: "Само Styrian Goldings, ниски 20 IBU — темните сладови и квасецот ја носат главната улога.",
          en: "Styrian Goldings alone at a low 20 IBU — dark malts and yeast lead instead."
        }
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Истиот опатиски квасец како Калуѓер, тука извира темно овошје и топла сложеност.",
          en: "The same abbey yeast as Kaluǵer, here drawing out dark fruit and warm complexity."
        }
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/opat/pour.jpg",
        body: {
          mk: "Одлежано за богато но питко тело; сервирано на 10–12°C во калеж.",
          en: "Aged for a rich but drinkable body; served at 10–12°C in a chalice."
        }
      }
    ]
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
      en: "Dark and roasty, with coffee, bitter chocolate and a long warm finish."
    },
    story: {
      mk: "Корен го носи печеното јадро на пиварницата. Темниот слад се додава внимателно за да има кафе и чоколадо без груба пепелност.",
      en: "Koren carries the brewery's roasted core. Dark malt is added carefully for coffee and chocolate without harsh ash."
    },
    pairing: { mk: "скара, чоколаден десерт", en: "grilled meat, chocolate dessert" },
    serve: "10-12°C",
    brewing: [
      {
        title: { mk: "Слад и меленье", en: "Malt & milling" },
        img: "public/assets/beer-stories/koren/hero.jpg",
        body: {
          mk: "Maris Otter со печен јачмен, чоколаден и црн слад — јадрото на кафето и горчливото чоколадо.",
          en: "Maris Otter with roasted barley, chocolate and black malt — the core of coffee and bitter chocolate."
        }
      },
      {
        title: { mk: "Замешување", en: "Mash" },
        img: "public/assets/beer-stories/koren/mash.jpg",
        body: {
          mk: "Замешување со внимателен дел печени сладови за длабока боја без груба пепелност.",
          en: "A mash with a measured share of roasted malts for deep color without harsh ash."
        }
      },
      {
        title: { mk: "Варење и хмел", en: "Boil & hops" },
        img: "public/assets/beer-stories/koren/boil.jpg",
        body: {
          mk: "Англиски Fuggle и East Kent Goldings до 38 IBU, за земјена горчина што го балансира печеното.",
          en: "English Fuggle and East Kent Goldings to 38 IBU, an earthy bitterness balancing the roast."
        }
      },
      {
        title: { mk: "Ферментација", en: "Fermentation" },
        img: "public/assets/process/tanks.jpg",
        body: {
          mk: "Чиста ale-ферментација која остава простор печените тонови да доминираат.",
          en: "A clean ale fermentation that leaves room for the roasted notes to lead."
        }
      },
      {
        title: { mk: "Зреење и точење", en: "Conditioning & serving" },
        img: "public/assets/beer-stories/koren/pour.jpg",
        body: {
          mk: "Кондиционирано за кремаста пена и долга топла завршница; сервирано на 10–12°C во пинта.",
          en: "Conditioned for a creamy head and a long warm finish; served at 10–12°C in a pint."
        }
      }
    ]
  }
];

const services = [
  {
    title: { mk: "Дегустација", en: "Tasting Flight" },
    price: "450 MKD",
    duration: { mk: "45 минути", en: "45 minutes" },
    items: {
      mk: ["пет шишиња по ред", "кратка спецификација", "мала закуска"],
      en: ["five bottles in order", "short spec walkthrough", "small snack"]
    }
  },
  {
    title: { mk: "Тура низ пиварницата", en: "Brewery Tour" },
    price: "750 MKD",
    duration: { mk: "75 минути", en: "75 minutes" },
    items: {
      mk: ["казан, ферментори и пакување", "дегустација на три пива", "прашања со пивар"],
      en: ["kettle, fermenters and packaging", "three-beer tasting", "brewer Q&A"]
    }
  },
  {
    title: { mk: "Приватна група", en: "Private Group" },
    price: "од 6,000 MKD",
    duration: { mk: "до 2 часа", en: "up to 2 hours" },
    items: {
      mk: ["10-24 гости", "целата линија шишиња", "парење со храна"],
      en: ["10-24 guests", "full bottle lineup", "food pairing"]
    }
  },
  {
    title: { mk: "Сезонски настан", en: "Seasonal Event" },
    price: "најава",
    duration: { mk: "варира", en: "varies" },
    items: {
      mk: ["ново варење", "гостински мени", "блог најава"],
      en: ["new release", "guest menu", "blog announcement"]
    }
  }
];

const posts = [
  {
    date: "2026-06-18",
    title: { mk: "Зошто Калуѓер завршува суво", en: "Why Kaluǵer Finishes Dry" },
    text: {
      mk: "Трипелот е силен, но не треба да биде тежок. Канди шеќерот помага да се добие сув, елегантен крај.",
      en: "A tripel is strong, but it should not feel heavy. Candi sugar helps create a dry, elegant finish."
    }
  },
  {
    date: "2026-06-10",
    title: { mk: "Магла: квасецот ја прави аромата", en: "Magla: Yeast Makes the Aroma" },
    text: {
      mk: "Банана и каранфилче не се сируп. Тие се ферментациски естри и феноли од пченичен квасец.",
      en: "Banana and clove are not syrup. They are fermentation esters and phenols from wheat yeast."
    }
  },
  {
    date: "2026-05-28",
    title: { mk: "Пет шишиња, една дегустациска линија", en: "Five Bottles, One Tasting Line" },
    text: {
      mk: "Редоследот од Зрно до Корен не е случаен: бојата, горчината и телото растат постепено.",
      en: "The order from Zrno to Koren is deliberate: color, bitterness and body rise step by step."
    }
  }
];

/* Practical questions a visitor actually asks before turning up. Answers are
   specific on purpose — an FAQ that hedges is not worth the scroll. */
const faqs = [
  {
    q: { mk: "Дали треба да резервирам однапред?", en: "Do I need to book ahead?" },
    a: {
      mk: "Да. Работиме со мали групи и еден пивар ја води турата, па термините се ограничени. Пишете ни барем три дена однапред.",
      en: "Yes. We run small groups and one brewer leads every tour, so slots are limited. Write to us at least three days ahead."
    }
  },
  {
    q: { mk: "Која е возрасната граница?", en: "What is the age limit?" },
    a: {
      mk: "Дегустацијата е од 18 години. Помладите се добредојдени на турата без дегустација, во придружба на возрасен.",
      en: "Tastings are 18 and over. Younger visitors are welcome on the tour without the tasting, with an adult."
    }
  },
  {
    q: { mk: "Како да стигнам и каде да паркирам?", en: "How do I get there and where do I park?" },
    a: {
      mk: "ул. Индустриска 12, Скопје. Има бесплатен паркинг пред влезот и автобуска постојка на 300 метри.",
      en: "Industriska 12, Skopje. There is free parking at the entrance and a bus stop 300 metres away."
    }
  },
  {
    q: { mk: "Дали просторот е пристапен?", en: "Is the space accessible?" },
    a: {
      mk: "Пиварницата и тоалетот се во приземје, без скали. Кажете ни однапред за да ја расчистиме патеката покрај казаните.",
      en: "The brewery and the toilet are on the ground floor, no stairs. Tell us in advance so we can clear the route past the kettles."
    }
  },
  {
    q: { mk: "Што содржат пивата?", en: "What is in the beers?" },
    a: {
      mk: "Сите пет содржат јачмен, а Магла содржи и пченица — значи глутен. Не бистриме со средства од животинско потекло.",
      en: "All five contain barley, and Magla also contains wheat — so gluten. We do not fine the beer with anything of animal origin."
    }
  },
  {
    q: { mk: "Може ли да купам шишиња за дома?", en: "Can I buy bottles to take home?" },
    a: {
      mk: "Може, на самото место по турата. Не продаваме преку интернет.",
      en: "Yes, on site after the tour. We do not sell online."
    }
  }
];

const copy = {
  mk: {
    brand: "Пивара Хмел",
    brandKicker: "крафт пиварница",
    navBeers: "Пива",
    navBrew: "Како вариме",
    navVisit: "Посета",
    navBlog: "Блог",
    navContact: "Контакт",
    heroEyebrow: "Скопје · мала серија · пет шишиња",
    heroTitle: "Пивара Хмел",
    heroCopy: "Пет крафт пива во стаклени шишиња, варени со отворена рецептура и доволно карактер за дегустација во пиварница.",
    heroPrimary: "Резервирај дегустација",
    heroSecondary: "Види ги шишињата",
    statBeers: "пива",
    rangeEyebrow: "Пале до темно",
    rangeTitle: "Петте шишиња на Хмел",
    rangeHint: "Кликни шише за целосна приказна и процес",
    beersEyebrow: "Каталог",
    beersTitle: "Секое шише со своја страница",
    beersIntro: "Секое пиво има точна боја, спецификација и сопствена страница што го објаснува целиот процес на варење.",
    readBeer: "Отвори страница",
    specTitle: "Пиварска спецификација",
    storyTitle: "Приказна",
    tastingTitle: "Дегустациски белешки",
    howMade: "Како се вари",
    readTemp: "Температура",
    readTime: "Време",
    readGravity: "Густина",
    brewSheet: "Лист за варење",
    pairingTitle: "Парење",
    serveTitle: "Сервирање",
    glassTitle: "Чаша",
    bookBeer: "Резервирај дегустација",
    backToBeers: "Сите пива",
    prevBeer: "Претходно",
    nextBeer: "Следно",
    brewEyebrow: "Отворена рецептура",
    brewTitle: "Како вариме",
    brewIntro: "Го покажуваме процесот, не само готовото пиво: мелено зрно, бакарен казан, хмељ, ферментација и спецификација за секое шише.",
    processOne: "Зрното се меша во топла вода додека скробот станува сладок екстракт.",
    processTwo: "Хмељот се додава по минутажа, па горчината и аромата се контролираат прецизно.",
    processThree: "Ферментацијата добива време: лагерирање за чистина, топла квасна работа за белгиските пива.",
    aboutEyebrow: "Луѓе и место",
    aboutTitle: "Мала пиварница со точна рака",
    aboutIntro: "Хмел е измислена студентска крафт-пиварница од Скопје: доволно мала за да се гледа секој казан, доволно сериозна за секое шише да има бројки.",
    teamOneName: "Ана Стојановска",
    teamOneRole: "Главен пивар",
    teamOneBio: "Го води рецептурниот лист и го чува балансот помеѓу чист лагер и богати белгиски квасци.",
    teamTwoName: "Мартин Илиев",
    teamTwoRole: "Пиварница и процес",
    teamTwoBio: "Ги следи температурите, ферментацијата и чистењето, затоа турите секогаш имаат реална приказна.",
    teamThreeName: "Елена Петрова",
    teamThreeRole: "Дегустации",
    teamThreeBio: "Ги води посетителите низ петте шишиња, од Зрно до Корен, со храна и точна температура.",
    faqEyebrow: "Пред да дојдете",
    faqTitle: "Чести прашања",
    visitEyebrow: "Посета",
    visitTitle: "Тури и дегустации",
    visitIntro: "Веб-страницата не продава онлајн. Таа ве носи до пиварницата, каде шишињата се отвораат по ред.",
    duration: "Траење",
    included: "Вклучено",
    blogEyebrow: "Новости и процес",
    blogTitle: "Белешки од казанот",
    contactEyebrow: "Резервација",
    contactTitle: "Побарај термин",
    contactIntro: "Испратете барање за дегустација или тура. Формата користи mailto fallback за статичен хостинг.",
    formName: "Име",
    formEmail: "Е-пошта",
    formDate: "Датум",
    formGroup: "Група",
    formMessage: "Порака",
    formPlaceholder: "Кажете ни кој пакет ве интересира.",
    formSubmit: "Испрати барање",
    formStatus: "Ќе се отвори вашата mail апликација со подготвена порака.",
    infoTitle: "Контакт информации",
    infoAddressLabel: "Адреса",
    infoHoursLabel: "Работно време",
    infoHours: "Сре-пет 16:00-22:00 · Саб 12:00-22:00",
    footerCopy: "Крафт пиварница за тури, дегустации и пет шишиња со вистински пиварски податоци.",
    footerRange: "Низата",
    cookieText: "Користиме основно cookie за да ја запомниме согласноста и јазикот.",
    cookieAccept: "Прифати"
  },
  en: {
    brand: "Pivara Hmel",
    brandKicker: "craft brewery",
    navBeers: "Beers",
    navBrew: "How we brew",
    navVisit: "Visit",
    navBlog: "Blog",
    navContact: "Contact",
    heroEyebrow: "Skopje · small batch · five bottles",
    heroTitle: "Pivara Hmel",
    heroCopy: "Five craft beers in glass bottles, brewed with open recipes and enough character to anchor a proper brewery tasting.",
    heroPrimary: "Book a tasting",
    heroSecondary: "See the bottles",
    statBeers: "beers",
    rangeEyebrow: "Pale to dark",
    rangeTitle: "The five Hmel bottles",
    rangeHint: "Tap a bottle for its full story and process",
    beersEyebrow: "Catalog",
    beersTitle: "Every bottle gets its own page",
    beersIntro: "Each beer carries its true color, a full spec and its own page explaining the entire brewing process.",
    readBeer: "Open page",
    specTitle: "Brewer's spec",
    storyTitle: "Story",
    tastingTitle: "Tasting notes",
    howMade: "How it's made",
    readTemp: "Temperature",
    readTime: "Time",
    readGravity: "Gravity",
    brewSheet: "Batch sheet",
    pairingTitle: "Pairing",
    serveTitle: "Serving",
    glassTitle: "Glass",
    bookBeer: "Book a tasting",
    backToBeers: "All beers",
    prevBeer: "Previous",
    nextBeer: "Next",
    brewEyebrow: "Open recipe",
    brewTitle: "How we brew",
    brewIntro: "We show the process, not only the finished beer: milled grain, copper kettle, hops, fermentation and a spec sheet for every bottle.",
    processOne: "Grain is mashed in warm water until starch becomes sweet extract.",
    processTwo: "Hops are added by timing, so bitterness and aroma stay controlled.",
    processThree: "Fermentation gets time: lagering for clarity, warm yeast work for the Belgian beers.",
    aboutEyebrow: "People and place",
    aboutTitle: "A small brewery with a precise hand",
    aboutIntro: "Hmel is a fictional student craft brewery from Skopje: small enough to see every kettle, serious enough for every bottle to carry numbers.",
    teamOneName: "Ana Stojanovska",
    teamOneRole: "Brewmaster",
    teamOneBio: "Owns the recipe sheet and balances clean lager discipline with expressive Belgian yeast.",
    teamTwoName: "Martin Iliev",
    teamTwoRole: "Brewery and process",
    teamTwoBio: "Tracks temperature, fermentation and cleaning, so tours always have a real production story.",
    teamThreeName: "Elena Petrova",
    teamThreeRole: "Tastings",
    teamThreeBio: "Guides visitors through the five bottles, from Zrno to Koren, with food and correct serving temperature.",
    faqEyebrow: "Before you visit",
    faqTitle: "Common questions",
    visitEyebrow: "Visit",
    visitTitle: "Tours and tastings",
    visitIntro: "The website does not sell online. It brings you to the brewery, where the bottles are opened in order.",
    duration: "Duration",
    included: "Included",
    blogEyebrow: "News and process",
    blogTitle: "Notes from the kettle",
    contactEyebrow: "Booking",
    contactTitle: "Request a date",
    contactIntro: "Send a request for a tasting or tour. The form uses a mailto fallback for static hosting.",
    formName: "Name",
    formEmail: "Email",
    formDate: "Date",
    formGroup: "Group",
    formMessage: "Message",
    formPlaceholder: "Tell us which package interests you.",
    formSubmit: "Send request",
    formStatus: "Your mail app should open with a prepared message.",
    infoTitle: "Contact info",
    infoAddressLabel: "Address",
    infoHoursLabel: "Hours",
    infoHours: "Wed-Fri 16:00-22:00 · Sat 12:00-22:00",
    footerCopy: "Craft brewery for tours, tastings and five bottles with real brewer data.",
    footerRange: "The range",
    cookieText: "We use a basic cookie to remember consent and language.",
    cookieAccept: "Accept"
  }
};

const state = {
  lang: getCookie("pivaraLang") || (navigator.language && navigator.language.startsWith("mk") ? "mk" : "en")
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/* Asset/link prefix: beer pages live in /pivo/, so they reach shared assets via ../ */
const ROOT = document.body.dataset.beer ? "../" : "";
const beerHref = (slug) => (document.body.dataset.beer ? `${slug}.html` : `pivo/${slug}.html`);

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  render();
  initCookieBanner();
  initBookingForm();
  initMotion();
  initThreeScene();
});

function t(key) {
  return copy[state.lang][key] || copy.mk[key] || key;
}

function render() {
  document.documentElement.lang = state.lang;
  setTitle();

  if (document.body.dataset.beer) {
    renderBeerPage(document.body.dataset.beer);
    initBrewhouse(beers.find((b) => b.slug === document.body.dataset.beer) || beers[0]);
  } else {
    renderRangeStrip();
    renderBeerGrid();
    renderServices();
    renderFaq();
    renderPosts();
  }

  applyI18n();
  syncLangButtons();
}

function applyI18n() {
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
}

function syncLangButtons() {
  $$("[data-lang-switch]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langSwitch === state.lang));
  });
}

function setTitle() {
  const beer = document.body.dataset.beer && beers.find((b) => b.slug === document.body.dataset.beer);
  if (beer) {
    document.title = `${beer.name[state.lang]} · ${beer.style[state.lang]} | ${t("brand")}`;
  } else {
    document.title = state.lang === "mk"
      ? "Пивара Хмел | Пива, тури и дегустации"
      : "Pivara Hmel | Craft beer, tours and tastings";
  }
}

/* ---------- Home ---------- */

function renderRangeStrip() {
  const range = $("#range-strip");
  if (!range) return;
  range.innerHTML = beers.map((beer) => `
    <a class="range-block" href="${beerHref(beer.slug)}" style="--beer-color:${beer.color}" data-beer-link>
      <span>
        <strong>${beer.name[state.lang]}</strong>
        <small>${beer.style[state.lang]}</small>
      </span>
    </a>
  `).join("");
}

function renderBeerGrid() {
  const grid = $("#beer-grid");
  if (!grid) return;
  grid.innerHTML = beers.map((beer) => `
    <a class="beer-card reveal" href="${beerHref(beer.slug)}" style="--beer-color:${beer.color}">
      <span class="beer-card-media">
        <img src="${ROOT + beer.image}" alt="${beer.name[state.lang]} ${beer.style[state.lang]} bottle with Пивара Хмел label" loading="lazy" />
      </span>
      <span class="beer-card-content">
        <span class="beer-card-top">
          <h3>${beer.name[state.lang]}</h3>
          <span class="beer-style">${beer.style[state.lang]}</span>
        </span>
        <span class="beer-meta">
          <span>${beer.abv} ABV</span>
          <span>${beer.ibu} IBU</span>
          <span>SRM ${beer.srm}</span>
        </span>
        <span class="beer-note">${beer.note[state.lang]}</span>
        <span class="beer-card-cta">${t("readBeer")} →</span>
      </span>
    </a>
  `).join("");
}

function renderServices() {
  const grid = $("#service-grid");
  if (!grid) return;
  grid.innerHTML = services.map((service) => `
    <article class="service-card reveal">
      <h3>${service.title[state.lang]}</h3>
      <strong>${service.price}</strong>
      <p>${t("duration")}: ${service.duration[state.lang]}</p>
      <p>${t("included")}:</p>
      <ul>${service.items[state.lang].map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderFaq() {
  const list = $("#faq-list");
  if (!list) return;
  list.innerHTML = faqs.map((item) => `
    <details class="faq-item">
      <summary>${item.q[state.lang]}</summary>
      <p>${item.a[state.lang]}</p>
    </details>
  `).join("");
}

function renderPosts() {
  const grid = $("#blog-grid");
  if (!grid) return;
  grid.innerHTML = posts.map((post) => `
    <article class="blog-card reveal">
      <time datetime="${post.date}">${formatDate(post.date)}</time>
      <h3>${post.title[state.lang]}</h3>
      <p>${post.text[state.lang]}</p>
    </article>
  `).join("");
}

/* ---------- Beer page ---------- */

function renderBeerPage(slug) {
  const mount = $("#beer-page");
  if (!mount) return;
  const index = beers.findIndex((b) => b.slug === slug);
  const beer = beers[index] || beers[0];
  const prev = beers[(index - 1 + beers.length) % beers.length];
  const next = beers[(index + 1) % beers.length];
  const lang = state.lang;

  document.body.style.setProperty("--beer-color", beer.color);

  mount.innerHTML = `
    <header class="beer-hero" style="--beer-color:${beer.color}">
      <div class="beer-hero-inner">
        <div class="beer-hero-copy reveal">
          <a class="back-link" href="${ROOT}index.html#beers">← ${t("backToBeers")}</a>
          <p class="eyebrow">${beer.style[lang]} · ${beer.meaning[lang]}</p>
          <h1>${beer.name[lang]}</h1>
          <p class="beer-hero-note">${beer.note[lang]}</p>
          <dl class="beer-hero-stats">
            ${heroStat("ABV", beer.abv)}
            ${heroStat("IBU", beer.ibu)}
            ${heroStat("SRM", beer.srm)}
            ${heroStat("OG", beer.og)}
          </dl>
          <a class="button button-primary" href="${ROOT}index.html#contact">${t("bookBeer")}</a>
        </div>
        <div class="beer-hero-media reveal">
          <img src="${ROOT + beer.image}" alt="${beer.name[lang]} branded bottle of ${beer.style[lang]}" />
        </div>
      </div>
    </header>

    <section class="beer-section beer-overview" aria-label="${t("tastingTitle")}">
      <div class="beer-spec reveal">
        <p class="eyebrow">${t("specTitle")}</p>
        <div class="spec-sheet">
          ${specItem("ABV", beer.abv)}
          ${specItem("IBU", beer.ibu)}
          ${specItem("OG", beer.og)}
          ${specItem("SRM", beer.srm)}
          ${specItem("MALT", beer.malt)}
          ${specItem("HOPS", beer.hops)}
          ${specItem("YEAST", beer.yeast)}
          ${specItem("SERVE", beer.serve)}
        </div>
      </div>
      <div class="beer-prose reveal">
        <div class="prose-block">
          <h2>${t("storyTitle")}</h2>
          <p>${beer.story[lang]}</p>
        </div>
        <div class="prose-block">
          <h2>${t("tastingTitle")}</h2>
          <p>${beer.note[lang]}</p>
        </div>
        <div class="prose-pairs">
          <div>
            <span class="prose-label">${t("pairingTitle")}</span>
            <p>${beer.pairing[lang]}</p>
          </div>
          <div>
            <span class="prose-label">${t("serveTitle")}</span>
            <p>${beer.serve} · ${beer.glass[lang]}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="beer-section beer-process" aria-labelledby="beer-process-title">
      <div class="section-heading">
        <p class="eyebrow">${t("brewEyebrow")}</p>
        <h2 id="beer-process-title">${t("howMade")} ${beer.name[lang]}</h2>
        <p>${beer.style[lang]} · ${beer.abv} · ${beer.ibu} IBU · SRM ${beer.srm}</p>
      </div>
      <div class="brew-layout">
        <ol class="process-timeline">
          ${beer.brewing.map((step, i) => `
            <li class="process-step${step.img ? " has-img" : ""}">
              <span class="step-index">${String(i + 1).padStart(2, "0")}</span>
              <div class="step-body">
                <h3>${step.title[lang]}</h3>
                <p>${step.body[lang]}</p>
              </div>
              ${step.img ? `<div class="step-media"><img src="${ROOT + step.img}" alt="" loading="lazy" /></div>` : ""}
            </li>
          `).join("")}
        </ol>
        ${renderBrewhouse(beer)}
      </div>
    </section>

    <nav class="beer-pager" aria-label="More beers">
      <a class="pager-link prev" href="${prev.slug}.html" style="--beer-color:${prev.color}">
        <span class="pager-dir">← ${t("prevBeer")}</span>
        <span class="pager-name">${prev.name[lang]}</span>
        <span class="pager-style">${prev.style[lang]}</span>
      </a>
      <a class="pager-link next" href="${next.slug}.html" style="--beer-color:${next.color}">
        <span class="pager-dir">${t("nextBeer")} →</span>
        <span class="pager-name">${next.name[lang]}</span>
        <span class="pager-style">${next.style[lang]}</span>
      </a>
    </nav>
  `;
}

function heroStat(label, value) {
  return `<div><dt>${value}</dt><dd>${label}</dd></div>`;
}

function specItem(label, value) {
  return `<div><span>${label}</span><strong>${value}</strong></div>`;
}

/* ---------- Shared interactions ---------- */

function selectLang(lang) {
  state.lang = lang;
  setCookie("pivaraLang", lang, 365);
  render();
  initMotion(true);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat(state.lang === "mk" ? "mk-MK" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${dateString}T12:00:00`));
}

function initNavigation() {
  const toggle = $(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      document.body.classList.toggle("nav-open", !expanded);
    });

    $$(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  $$("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => selectLang(button.dataset.langSwitch));
  });
}

function initCookieBanner() {
  const banner = $("#cookie-banner");
  if (!banner) return;
  if (!getCookie("pivaraCookieConsent")) {
    banner.hidden = false;
  }
  const accept = $("[data-cookie-accept]");
  if (accept) {
    accept.addEventListener("click", () => {
      setCookie("pivaraCookieConsent", "yes", 365);
      banner.hidden = true;
    });
  }
}

function initBookingForm() {
  const form = $("#booking-form");
  if (!form) return;
  const status = $("#form-status");
  form.addEventListener("submit", (event) => {
    if (form.company && form.company.value) {
      event.preventDefault();
      return;
    }
    if (status) status.textContent = t("formStatus");
  });
}

function initMotion(refreshOnly = false) {
  const gsap = window.gsap;
  document.documentElement.dataset.gsap = gsap ? "ready" : "missing";
  /* Only opt into hidden-then-revealed once JS is running, so a failed script
     or a crawler without JS still sees every section. */
  document.documentElement.dataset.motion = "on";

  if (gsap && !refreshOnly && !document.body.dataset.beer) {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from("[data-gsap='header']", { y: -28, autoAlpha: 0, duration: 0.75 }, 0)
      .from(".hero .eyebrow", { y: 18, autoAlpha: 0, duration: 0.65 }, 0.1)
      .from(".hero h1", { y: 34, autoAlpha: 0, duration: 0.82 }, 0.2)
      .from(".hero-copy", { y: 22, autoAlpha: 0, duration: 0.7 }, 0.36)
      .from(".hero-actions .button", { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, 0.48)
      .from(".hero-stats div", { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.62);
    /* Safety net: if the ticker never runs the timeline to the end, drop the
       inline props rather than leaving the hero blank. */
    setTimeout(() => {
      if (intro.progress() < 1) {
        intro.progress(1);
        gsap.set(intro.getChildren().flatMap((tween) => tween.targets()), { clearProps: "all" });
      }
    }, 2500);
  }

  const pending = $$(".reveal").filter((node) => !node.classList.contains("is-visible"));
  if (!pending.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  pending.forEach((node) => observer.observe(node));
  /* Anything still unrevealed after the first paint window is shown outright. */
  setTimeout(() => pending.forEach((node) => node.classList.add("is-visible")), 2500);
}

function initThreeScene() {
  const canvas = $("#beer-canvas");
  if (!canvas) return;
  const THREE = window.THREE;
  window.__pivaraScene = {
    hasThree: Boolean(THREE),
    frameCount: 0,
    width: canvas.clientWidth,
    height: canvas.clientHeight
  };
  canvas.dataset.three = THREE ? "ready" : "missing";
  canvas.dataset.frameCount = "0";

  if (!THREE) {
    drawFallbackCanvas(canvas);
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1.6, 7.4);
  camera.lookAt(0, 0.35, 0);

  const group = new THREE.Group();
  scene.add(group);

  scene.add(new THREE.AmbientLight(0xf0d5aa, 1.15));
  const key = new THREE.DirectionalLight(0xffb86a, 2.1);
  key.position.set(3.4, 5.2, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fb799, 1.2);
  rim.position.set(-5, 3, -2);
  scene.add(rim);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 5),
    new THREE.MeshStandardMaterial({ color: 0x271910, roughness: 0.85, metalness: 0.08 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.18;
  group.add(ground);

  const positions = [-1.6, -0.8, 0, 0.8, 1.6];
  beers.forEach((beer, index) => {
    const bottle = createBottle(THREE, beer);
    bottle.position.x = positions[index];
    bottle.rotation.y = (index - 2) * -0.08;
    group.add(bottle);
  });

  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener("pointermove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 0.18;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 0.08;
  }, { passive: true });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    group.scale.setScalar(width < 760 ? 0.72 : 0.92);
    group.position.x = width < 760 ? 0.14 : 2.42;
    group.position.y = width < 760 ? -0.32 : -0.22;
    window.__pivaraScene.width = width;
    window.__pivaraScene.height = height;
  }

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  function frame() {
    const elapsed = clock.getElapsedTime();
    group.rotation.y = Math.sin(elapsed * 0.28) * 0.08 + pointerX;
    group.rotation.x = pointerY;
    group.children.forEach((child, index) => {
      if (child.userData && child.userData.isBottle) {
        child.position.y = Math.sin(elapsed * 0.8 + index) * 0.025;
      }
    });
    renderer.render(scene, camera);
    window.__pivaraScene.frameCount += 1;
    if (window.__pivaraScene.frameCount % 10 === 0) {
      canvas.dataset.frameCount = String(window.__pivaraScene.frameCount);
    }
    requestAnimationFrame(frame);
  }

  frame();
}

function createBottle(THREE, beer) {
  const root = new THREE.Group();
  root.userData.isBottle = true;

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: beer.slug === "koren" ? 0x2a1309 : 0x8a4b14,
    metalness: 0,
    roughness: 0.12,
    transmission: 0.18,
    transparent: true,
    opacity: 0.62,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1
  });
  const liquidMaterial = new THREE.MeshStandardMaterial({
    color: Number(`0x${beer.color.slice(1)}`),
    roughness: 0.34,
    transparent: true,
    opacity: beer.slug === "koren" ? 0.78 : 0.52
  });
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8b56d,
    metalness: 0.75,
    roughness: 0.26
  });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.37, 2.38, 48), glassMaterial);
  body.position.y = -0.12;
  root.add(body);

  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.34, 2.05, 48), liquidMaterial);
  liquid.position.y = -0.23;
  root.add(liquid);

  const shoulder = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.42, 48), glassMaterial);
  shoulder.position.y = 1.25;
  root.add(shoulder);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.17, 0.78, 36), glassMaterial);
  neck.position.y = 1.62;
  root.add(neck);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.14, 36), capMaterial);
  cap.position.y = 2.08;
  root.add(cap);

  return root;
}

function drawFallbackCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let frameCount = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function frame(time) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    beers.forEach((beer, index) => {
      const x = width * 0.52 + (index - 2) * Math.min(112, width * 0.15);
      const y = height * 0.5 + Math.sin(time * 0.001 + index) * 6;
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.beginPath();
      ctx.ellipse(x, y + 178, 44, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = beer.slug === "koren" ? "#1a0e09" : "#71400f";
      roundedRect(ctx, x - 32, y - 130, 64, 260, 22);
      ctx.fill();
      ctx.fillStyle = beer.color;
      roundedRect(ctx, x - 25, y - 110, 50, 212, 18);
      ctx.fill();
      ctx.fillStyle = "#f4e9d1";
      roundedRect(ctx, x - 35, y - 20, 70, 72, 8);
      ctx.fill();
      ctx.fillStyle = beer.color;
      ctx.fillRect(x - 24, y - 4, 48, 8);
      ctx.fillRect(x - 24, y + 32, 48, 8);
      ctx.fillStyle = "#d8b56d";
      ctx.fillRect(x - 18, y - 162, 36, 16);
    });
    frameCount += 1;
    window.__pivaraScene.frameCount = frameCount;
    canvas.dataset.frameCount = String(frameCount);
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  frame(0);
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/* ---------- Brewhouse: the sight glass ----------
   Every brew stage on a beer page is driven by numbers the brewery already
   records. Liquid colour walks the real SRM chart from pale wort to the
   beer's measured colour, so a pale lager barely shifts and a porter goes
   almost black — the animation differs per beer because the beer does. */

/* Standard SRM colour chart, index 1-40, as sRGB hex. */
const SRM_CHART = ("FFE699 FFD878 FFCA5A FFBF42 FBB123 F8A600 F39C00 EA8F00 E58500 DE7C00 "
  + "D77200 CF6900 CB6200 C35900 BB5100 B54C00 B04500 A63E00 A13700 9B3200 "
  + "952D00 8E2900 882300 821E00 7B1A00 771900 701400 6A0E00 660D00 5E0B00 "
  + "5A0A02 600903 520907 4C0505 470606 440607 3F0708 3B0607 3A070B 36080A").split(" ");

const WORT_RGB = [232, 200, 122]; /* --wort: pale pre-boil extract */

function srmRgb(srm) {
  const hex = SRM_CHART[Math.min(Math.max(Math.round(srm), 1), 40) - 1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function mixRgb(from, to, amount) {
  return from.map((channel, i) => Math.round(channel + (to[i] - channel) * amount));
}

const rgbCss = (rgb) => `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;

/* Fermentation and conditioning behave differently per yeast, so read the
   yeast the recipe actually names rather than hard-coding one schedule. */
function yeastProfile(yeast) {
  const name = String(yeast).toLowerCase();
  if (name.includes("lager")) return { fermC: 11, fermDays: 21, condDays: 30 };
  if (name.includes("weizen")) return { fermC: 20, fermDays: 7, condDays: 10 };
  if (name.includes("belgian")) return { fermC: 24, fermDays: 14, condDays: 21 };
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
      fill: 0.05, tint: 0, temp: 18, clock: "-00:20",
      gravity: "—", detail: beer.malt, mode: "dry"
    },
    {
      fill: 0.52, tint: 0.3, temp: 66, clock: "01:00",
      gravity: gravity(og), detail: `${beer.malt} · 66°C`, mode: "still"
    },
    {
      fill: 0.74, tint: 0.62, temp: 100, clock: "02:00",
      gravity: gravity(og), detail: `${beer.hops} · ${beer.ibu} IBU`, mode: "boil"
    },
    {
      fill: 0.84, tint: 1, temp: fermC, clock: days(fermDays),
      gravity: `${gravity(og)} → ${gravity(fg)}`, detail: beer.yeast, mode: "ferment"
    },
    {
      fill: 0.88, tint: 1, temp: serveC, clock: days(condDays),
      gravity: gravity(fg), detail: `${beer.serve} · ${beer.glass[state.lang]}`, mode: "serve"
    }
  ].map((stage) => ({
    ...stage,
    color: rgbCss(mixRgb(WORT_RGB, finalRgb, stage.tint))
  }));
}

function renderBrewhouse(beer) {
  const stages = brewStages(beer);
  return `
    <aside class="brewhouse" data-brewhouse>
      <div class="sight-glass" aria-hidden="true">
        <div class="sg-tube">
          <div class="sg-liquid" data-sg-liquid>
            <span class="sg-surface"></span>
            <span class="sg-foam"></span>
          </div>
          <div class="sg-bubbles" data-sg-bubbles>
            ${Array.from({ length: 9 }, (_, i) => `<span style="--b:${i}"></span>`).join("")}
          </div>
          <div class="sg-scale">
            ${[0, 1, 2, 3, 4].map(() => "<span></span>").join("")}
          </div>
        </div>
      </div>
      <div class="brew-readout">
        <p class="brew-stage" data-sg-stage>${beer.brewing[0].title[state.lang]}</p>
        <dl>
          <div><dt>${t("readTemp")}</dt><dd data-sg-temp>18°C</dd></div>
          <div><dt>${t("readTime")}</dt><dd data-sg-clock>${stages[0].clock}</dd></div>
          <div><dt>${t("readGravity")}</dt><dd data-sg-gravity>${stages[0].gravity}</dd></div>
        </dl>
        <p class="brew-detail" data-sg-detail>${stages[0].detail}</p>
      </div>
    </aside>
  `;
}

/* Scroll scrub. One rAF-throttled scroll listener drives the glass; the
   listener is torn down and rebuilt on every render so a language switch
   never leaves a stale one behind. */
let brewhouseCleanup = null;

function initBrewhouse(beer) {
  if (brewhouseCleanup) {
    brewhouseCleanup();
    brewhouseCleanup = null;
  }
  const panel = $("[data-brewhouse]");
  const track = $(".process-timeline");
  if (!panel || !track) return;

  const stages = brewStages(beer);
  const steps = $$(".process-step", track);
  if (steps.length !== stages.length) return;
  const liquid = $("[data-sg-liquid]", panel);
  const bubbles = $("[data-sg-bubbles]", panel);
  const out = {
    stage: $("[data-sg-stage]", panel),
    temp: $("[data-sg-temp]", panel),
    clock: $("[data-sg-clock]", panel),
    gravity: $("[data-sg-gravity]", panel),
    detail: $("[data-sg-detail]", panel)
  };
  const finalRgb = srmRgb(beer.srm);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = -1;
  let frame = 0;

  /* The stage is read off the steps themselves rather than off a scroll
     percentage of the section. Measuring the section compressed the walk into
     its first two-thirds, so the glass showed "serving" while the reader was
     still on fermentation. Anchoring to step centres keeps the panel on
     whichever step is actually under the reading line. */
  function stagePosition() {
    const line = innerHeight * 0.45;
    const centre = (step) => {
      const rect = step.getBoundingClientRect();
      return rect.top + rect.height / 2;
    };
    let i = 0;
    while (i < steps.length - 2 && centre(steps[i + 1]) < line) i += 1;
    const from = centre(steps[i]);
    const to = centre(steps[i + 1]);
    const span = to - from;
    const segment = span > 0 ? Math.min(Math.max((line - from) / span, 0), 1) : 0;
    return i + segment;
  }

  function apply() {
    frame = 0;
    const exact = stagePosition();
    const lower = Math.floor(exact);
    const from = stages[lower];
    const to = stages[Math.min(lower + 1, stages.length - 1)];
    const blend = reduced ? 0 : exact - lower;
    const index = Math.min(Math.round(exact), stages.length - 1);

    /* Level and colour interpolate continuously so the liquid genuinely rises
       with the scroll instead of snapping between stages. */
    const fill = from.fill + (to.fill - from.fill) * blend;
    const tint = from.tint + (to.tint - from.tint) * blend;
    liquid.style.height = `${(fill * 100).toFixed(2)}%`;
    liquid.style.setProperty("--liquid", rgbCss(mixRgb(WORT_RGB, finalRgb, tint)));

    if (index === active) return;
    active = index;
    const stage = stages[index];
    panel.dataset.mode = stage.mode;
    bubbles.hidden = reduced || (stage.mode !== "ferment" && stage.mode !== "boil");
    out.stage.textContent = beer.brewing[index].title[state.lang];
    out.temp.textContent = `${Math.round(stage.temp)}°C`;
    out.clock.textContent = stage.clock;
    out.gravity.textContent = stage.gravity;
    out.detail.textContent = stage.detail;
    steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
  }

  function onScroll() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(apply);
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  apply();
  brewhouseCleanup = () => {
    cancelAnimationFrame(frame);
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onScroll);
  };
}

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const row = document.cookie.split("; ").find((entry) => entry.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.split("=")[1]) : "";
}
