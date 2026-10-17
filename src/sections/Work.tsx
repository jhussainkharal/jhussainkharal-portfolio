import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import { projects } from "@/data/site";

/**
 * Selected Works — noir editorial project index.
 * Large alternating cards, index numerals, cobalt hover states.
 */
export function Work() {
  return (
    <section id="work" className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          className="label mb-8 text-cobalt-bright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          01 — Selected Works
        </motion.p>
        <h2 className="font-display mb-16 text-[12vw] leading-[0.95] text-white md:mb-24 md:text-[7vw]">
          <MaskText>SELECTED</MaskText>
          <MaskText delay={0.08}>
            <span className="text-stroke">WORKS.</span>
          </MaskText>
        </h2>

        <div className="space-y-20 md:space-y-32">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="group grid gap-8 md:grid-cols-12 md:gap-12"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden bg-coal md:col-span-7 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset" />
                <span className="font-display absolute top-4 left-5 text-5xl text-white/25 md:text-7xl">
                  {p.index}
                </span>
              </div>

              {/* Copy */}
              <div
                className={`flex flex-col justify-center md:col-span-5 ${
                  i % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <p className="label mb-4 text-cobalt-bright">{p.category}</p>
                <h3 className="font-display text-4xl text-white md:text-6xl">
                  {p.name}
                </h3>
                {p.subtitle && (
                  <p className="mt-2 text-lg text-ash">{p.subtitle}</p>
                )}
                <p className="mt-5 leading-relaxed text-dim">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="label border border-line px-3 py-1.5 text-ash"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="label mt-6 text-dim/70">{p.status}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
