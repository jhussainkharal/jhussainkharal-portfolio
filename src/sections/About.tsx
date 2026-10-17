import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import { identity, story } from "@/data/site";

/**
 * About — portrait + story, noir editorial.
 */
export function About() {
  return (
    <section id="about" className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          className="label mb-8 text-cobalt-bright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          03 — About Me
        </motion.p>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Portrait */}
          <motion.div
            className="relative md:col-span-5"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="glow-cobalt pointer-events-none absolute -inset-8 opacity-60" />
            <div className="relative aspect-[3/4] overflow-hidden bg-coal">
              <img
                src={identity.portrait}
                alt={identity.portraitAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset" />
            </div>
            <p className="label mt-4 text-dim">{identity.portraitAlt}</p>
          </motion.div>

          {/* Story */}
          <div className="md:col-span-7">
            <h2 className="font-display text-[11vw] leading-[0.95] text-white md:text-[4.5vw]">
              <MaskText>THE STORY</MaskText>
              <MaskText delay={0.08}>
                <span className="text-stroke">SO FAR.</span>
              </MaskText>
            </h2>
            <motion.blockquote
              className="mt-8 border-l-2 border-cobalt pl-6 text-xl leading-relaxed text-ash md:text-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE }}
            >
              “{story.pullQuote}”
            </motion.blockquote>
            <div className="mt-8 space-y-5">
              {story.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  className="leading-relaxed text-dim"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: EASE, delay: Math.min(i * 0.04, 0.3) }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
