import { motion } from "framer-motion";
import { useCopy } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import { CremaWave } from "./transitions/CremaWave";
import { LazyVideo } from "./ui/LazyVideo";
import { RevealText } from "./ui/RevealText";

const COPY = {
  en: {
    eyebrow: "The Experience",
    h1: "Not just coffee.",
    h2: "A place to pause.",
    body: "Some moments are better when they slow down. From the first espresso of the morning to conversations that last longer than expected, Koordinat is designed around the moments between things.",
    coffee: "Coffee",
    food: "Food",
    community: "Community",
    ritual: "The Daily Ritual",
    moment: "Coordinate your moment",
    drinks: "Espresso / Latte / Turkish coffee",
  },
  tr: {
    eyebrow: "Deneyim",
    h1: "Sadece kahve değil.",
    h2: "Soluklanacak bir yer.",
    body: "Bazı anlar yavaşladıkça güzelleşir. Sabahın ilk espressosundan beklenenden uzun süren sohbetlere kadar Koordinat, aradaki anlar için tasarlandı.",
    coffee: "Kahve",
    food: "Yemek",
    community: "Topluluk",
    ritual: "Günlük Ritüel",
    moment: "Anını koordine et",
    drinks: "Espresso / Latte / Türk kahvesi",
  },
};

export function CoffeeExperienceSection() {
  const t = useCopy(COPY);
  return (
    <section id="experience" data-theme="light" className="relative z-10 bg-cream text-ink">
      <CremaWave fill="#f4ebdd" />

      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pt-20 pb-28 md:px-10 md:pt-28 md:pb-40 lg:grid-cols-12 lg:gap-8 lg:px-[6%]">
        <div className="lg:col-span-5 lg:pt-16">
          <motion.div className="mb-10 flex items-center justify-between text-coffee" {...reveal}>
            <span className="micro">{t.eyebrow}</span>
            <span className="micro text-coffee/60">Samandağ / 01</span>
          </motion.div>

          <RevealText
            className="display text-[clamp(3rem,6.4vw,6.6rem)] text-espresso"
            lines={[t.h1, <em key="p" className="text-coffee italic">{t.h2}</em>]}
          />

          <motion.p
            className="mt-10 max-w-[440px] text-[15.5px] leading-[1.75] text-espresso/75"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.15 }}
          >
            {t.body}
          </motion.p>

          <motion.div
            className="mt-14 grid max-w-[440px] grid-cols-3 border-t border-espresso/15 pt-5 text-espresso/60"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.25 }}
          >
            <span className="micro">{t.coffee}</span>
            <span className="micro text-center">{t.food}</span>
            <span className="micro text-right">{t.community}</span>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          {/* measurement line along the media */}
          <motion.div
            aria-hidden="true"
            className="absolute top-0 -left-5 hidden h-full w-px origin-top bg-espresso/15 lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE_CINE }}
          />
          <span aria-hidden="true" className="micro absolute top-0 -left-5 hidden -translate-x-full pr-3 text-coffee/50 lg:block">
            y.01
          </span>

          <motion.figure
            className="group relative aspect-[4/5] overflow-hidden bg-espresso md:aspect-[5/6]"
            data-theme="dark"
            data-cursor="discover"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_CINE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08, filter: "saturate(0.7)" }}
              whileInView={{ scale: 1, filter: "saturate(1)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: EASE_CINE }}
            >
              <div className="h-full w-full transition-[transform,filter] duration-[900ms] ease-soft group-hover:scale-[1.04] group-hover:sepia-[0.18]">
                <LazyVideo
                  src="/media/ritual.mp4"
                  poster="/media/ritual.jpg"
                  className="h-full w-full object-cover object-[45%_center]"
                />
              </div>
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
            <figcaption className="absolute right-5 bottom-5 left-5 flex items-end justify-between text-cream">
              <span className="micro">{t.ritual}</span>
              <span className="micro opacity-60">{t.moment}</span>
            </figcaption>
          </motion.figure>

          <p className="micro mt-5 text-coffee">{t.drinks}</p>
        </div>
      </div>
    </section>
  );
}
