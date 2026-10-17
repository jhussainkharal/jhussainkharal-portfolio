import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import { identity, intro } from "@/data/site";

/**
 * Welcome — the LEESHARK layout's "WELCOME TO MY PORTFOLIO" beat.
 * Oversized condensed statement with masked reveals.
 */
export function Welcome() {
  return (
    <section className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          className="label mb-8 text-cobalt-bright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          Welcome to my portfolio
        </motion.p>
        <h2 className="font-display text-[12vw] leading-[0.95] text-white md:text-[7vw]">
          {intro.statement.map((line, i) => (
            <MaskText key={line} delay={i * 0.08}>
              {line}
            </MaskText>
          ))}
        </h2>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <motion.div
            className="md:col-span-5 md:col-start-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            {intro.lines.map((l) => (
              <p key={l} className="text-lg text-ash md:text-xl">
                {l}
              </p>
            ))}
            <p className="mt-6 leading-relaxed text-dim">{intro.body}</p>
            <p className="label mt-8 text-dim">
              {identity.fullName} — {identity.location}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
