// Samandağ guide — shown on /tr/samandag-rehberi/ and /samandag-guide/, and emitted as
// TouristAttraction structured data (src/seo.ts). Plain strings only: vite.config.ts imports this too.
// Targets "samandağda gezilecek yerler", "samandağda ne yenir", "samandağ çevlik" (Google autocomplete).
import type { Lang } from "../routes";

export type Place = { id: string; name: string; tag: string; text: string };
export type Guide = { updated: string; places: Place[]; foodTitle: string; food: string[]; note: string };

const GUIDE: Record<Lang, Guide> = {
  tr: {
    updated: "Eylül 2026",
    places: [
      {
        id: "sahil",
        name: "Samandağ Sahili",
        tag: "Kumsal · Kaplumbağalar",
        text: "Yaklaşık 14 kilometre uzanan kumsal, Akdeniz'de yeşil deniz kaplumbağalarının en önemli yuvalama alanlarından biri. Yuvalama mayısta başlar, yavrular yaz boyunca denize ulaşır; işaretli yuvalara dokunmadan, uzaktan izlemek gerekir.",
      },
      {
        id: "titus",
        name: "Titus Tüneli",
        tag: "Çevlik · Roma dönemi",
        text: "Antik Seleukeia Pieria kentini sel sularından korumak için kayaya oyulmuş dev bir su tüneli. İmparator Vespasianus ve oğlu Titus dönemlerinde yapıldığı için bu adla anılır; 2014'ten beri UNESCO Dünya Mirası Geçici Listesi'nde.",
      },
      {
        id: "besikli",
        name: "Beşikli Mağara",
        tag: "Çevlik · Nekropol",
        text: "Titus Tüneli'nin birkaç yüz metre ötesinde. Adı mağara olsa da aslında kayaya oyulmuş bir Roma dönemi nekropolü; zemine ve duvarlara oyulmuş, beşiği andıran mezarlar ona adını verir.",
      },
      {
        id: "cevlik",
        name: "Çevlik ve Seleukeia Pieria",
        tag: "Antik liman · Deniz kıyısı",
        text: "Antik Antakya'nın limanı Seleukeia Pieria'nın kalıntıları Çevlik'te. Titus Tüneli ve Beşikli Mağara ile birlikte, kıyıda balık ve deniz manzarasıyla yarım günlük bir rota oluşturur.",
      },
      {
        id: "hizir",
        name: "Hızır Makamı",
        tag: "Sahil · Ziyaret yeri",
        text: "Samandağ kıyısında, Hz. Hızır ile Hz. Musa'nın buluştuğu yer olarak kabul edilen ziyaret yeri. Farklı inançlardan insanların uğradığı, şehrin manevi merkezlerinden biri.",
      },
      {
        id: "musa-agaci",
        name: "Musa Ağacı",
        tag: "Hıdırbey Köyü · Anıt ağaç",
        text: "Yaklaşık 3.000 yaşında olduğu düşünülen dev bir çınar. Rivayete göre Hz. Musa'nın asasını yere vurduğu yerde yeşermiştir; gövdesi ve dallarının kapladığı alan görenleri şaşırtır.",
      },
      {
        id: "vakifli",
        name: "Vakıflı Köyü",
        tag: "Musa Dağı eteği",
        text: "Musa Dağı'nın eteklerinde, Türkiye'nin tek Ermeni köyü olarak bilinir. Organik tarımı, narenciyesi ve ev yapımı reçelleriyle tanınır; köy meydanı ve kilisesi sakin bir mola için idealdir.",
      },
    ],
    foodTitle: "Samandağ'da ne yenir?",
    food: [
      "Samandağ biberi: acı ve etli; turşusu, salçası ve pul biberi sofraların vazgeçilmezi.",
      "Hatay kahvaltısı: zahter, cevizli biber ezmesi, sürk ve zeytin çeşitleri.",
      "Çevlik'te taze balık ve deniz manzarası.",
      "Tatlı olarak künefe; günün sonunda ise bir fincan kahve.",
    ],
    note: "6 Şubat 2023 depremlerinden etkilenen bazı alanlarda restorasyon sürebilir; gitmeden önce güncel ziyaret durumunu kontrol et.",
  },
  en: {
    updated: "September 2026",
    places: [
      {
        id: "sahil",
        name: "Samandağ Beach",
        tag: "Beach · Sea turtles",
        text: "Around 14 kilometres of sand and one of the most important nesting beaches for green sea turtles in the Mediterranean. Nesting starts in May and hatchlings reach the sea through the summer; watch from a distance and leave marked nests alone.",
      },
      {
        id: "titus",
        name: "Titus Tunnel",
        tag: "Çevlik · Roman",
        text: "A huge water tunnel cut through the rock to protect the ancient city of Seleucia Pieria from floods. Named after Emperor Vespasian and his son Titus, under whom it was built; on UNESCO's World Heritage Tentative List since 2014.",
      },
      {
        id: "besikli",
        name: "Beşikli Cave",
        tag: "Çevlik · Necropolis",
        text: "A few hundred metres past the Titus Tunnel. Despite the name it is not a cave but a Roman-era necropolis carved into the rock; the cradle-shaped graves (beşik means cradle) give it its name.",
      },
      {
        id: "cevlik",
        name: "Çevlik & Seleucia Pieria",
        tag: "Ancient harbour · Seaside",
        text: "The remains of Seleucia Pieria, the harbour of ancient Antioch, lie in Çevlik. Together with the Titus Tunnel and Beşikli Cave it makes a half-day route, with fish and sea views on the shore.",
      },
      {
        id: "hizir",
        name: "Hızır Shrine",
        tag: "Seafront · Shrine",
        text: "A shrine on the Samandağ shore, held to be where Hızır (Khidr) and Moses met. Visited by people of different faiths, it is one of the town's spiritual centres.",
      },
      {
        id: "musa-agaci",
        name: "The Moses Tree",
        tag: "Hıdırbey village · Monumental tree",
        text: "A giant plane tree believed to be around 3,000 years old. Legend says it grew where Moses struck the ground with his staff; the spread of its trunk and branches is remarkable.",
      },
      {
        id: "vakifli",
        name: "Vakıflı Village",
        tag: "Foot of Musa Dağı",
        text: "On the slopes of Musa Dağı, known as Türkiye's only Armenian village. Famous for organic farming, citrus and homemade jams; the square and church make for a quiet stop.",
      },
    ],
    foodTitle: "What to eat in Samandağ",
    food: [
      "Samandağ pepper: hot and fleshy — pickled, as paste or as flakes on every table.",
      "A Hatay breakfast: za'atar (zahter), walnut pepper spread, sürk cheese and olives.",
      "Fresh fish by the sea in Çevlik.",
      "Künefe for dessert — and a cup of coffee to end the day.",
    ],
    note: "Some sites affected by the 6 February 2023 earthquakes may still be under restoration; check before you go.",
  },
};

export const guideFor = (lang: Lang) => GUIDE[lang];
