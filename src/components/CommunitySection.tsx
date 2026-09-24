import { motion } from "framer-motion";
import { useCopy, useLang } from "../lib/i18n";
import { reveal } from "../lib/motion";
import { CremaWave } from "./transitions/CremaWave";
import { RevealImage } from "./ui/RevealImage";
import { RevealText } from "./ui/RevealText";

const MOMENTS = [
  {
    time: { en: "Morning", tr: "Sabah" },
    caption: { en: "A laptop, a cup, an open table.", tr: "Bir laptop, bir fincan, boş bir masa." },
    img: "/media/morning.jpg",
    alt: { en: "Someone working on a laptop at an outdoor table, a cup of coffee beside them", tr: "Dış mekânda dizüstü bilgisayarla çalışan biri, yanında bir fincan kahve" },
    pos: "object-[70%_center]",
  },
  {
    time: { en: "Afternoon", tr: "Öğleden sonra" },
    caption: { en: "Friends at the counter.", tr: "Tezgahta arkadaşlar." },
    img: "/media/afternoon.jpg",
    alt: { en: "Two friends talking over coffee at a café counter", tr: "Kafe tezgahında kahve eşliğinde sohbet eden iki arkadaş" },
    pos: "object-[35%_center]",
  },
  {
    time: { en: "Evening", tr: "Akşam" },
    caption: { en: "Conversations that run long.", tr: "Uzayıp giden sohbetler." },
    img: "/media/evening.jpg",
    alt: { en: "A woman laughing mid-conversation at a wooden table", tr: "Ahşap masada sohbet ederken gülen bir kadın" },
    pos: "object-center",
  },
];

const COPY = {
  en: {
    aria: "More than coffee",
    eyebrow: "More than coffee",
    l1: "Your table.",
    l2: "Your people.",
    l3: "Your moment.",
    body: "Study, work, meet, stay. This is not just somewhere you buy coffee. This is somewhere you spend time.",
  },
  tr: {
    aria: "Kahveden fazlası",
    eyebrow: "Kahveden fazlası",
    l1: "Senin masan.",
    l2: "Senin insanların.",
    l3: "Senin anın.",
    body: "Ders çalış, çalış, buluş, kal. Burası sadece kahve aldığın bir yer değil. Burası vakit geçirdiğin bir yer.",
  },
};

export function CommunitySection() {
  const t = useCopy(COPY);
  const lang = useLang();
  return (
    <section data-theme="light" className="relative z-10 bg-foam text-ink" aria-label={t.aria}>
      <CremaWave fill="#e8d8c3" />
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-28 md:px-10 md:pt-28 md:pb-40 lg:px-[6%]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.p className="micro mb-6 text-coffee" {...reveal}>
              {t.eyebrow}
            </motion.p>
            <RevealText
              as="h2"
              className="display text-[clamp(3rem,6.6vw,7rem)] text-espresso"
              lines={[t.l1, t.l2, <em key="m" className="text-coffee italic">{t.l3}</em>]}
            />
          </div>
          <motion.p
            className="max-w-[340px] self-end text-[15px] leading-relaxed text-espresso/70 md:col-span-4 md:col-start-9"
            {...reveal}
          >
            {t.body}
          </motion.p>
        </div>

        <ul className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-5 lg:gap-8">
          {MOMENTS.map((m, i) => (
            <li key={m.time.en} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-12" : ""}>
              <figure className="group" data-cursor="discover">
                <RevealImage className="aspect-[3/4] bg-espresso" delay={i * 0.1}>
                  <img
                    src={m.img}
                    alt={m.alt[lang]}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${m.pos} transition-transform duration-[900ms] ease-soft group-hover:scale-[1.05]`}
                  />
                </RevealImage>
                <figcaption className="mt-4 flex items-baseline justify-between border-t border-espresso/15 pt-3">
                  <span className="micro text-espresso">
                    0{i + 1} / {m.time[lang]}
                  </span>
                  <span className="font-serif text-lg text-espresso/70 italic">{m.caption[lang]}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
