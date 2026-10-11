import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/Reveal";
import { viewportOnce } from "@/animations/motion";
import { identity, intro } from "@/data/site";

/**
 * Editorial opening statement.
 * The big lines are masked-revealed; the supporting lines brighten
 * individually as the section scrolls through the viewport.
 */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      id="intro"
      ref={ref}
      className="relative px-5 py-28 sm:px-8 md:py-40"
      aria-label="Introduction statement"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2>
              <MaskText
                lines={intro.statement}
                className="font-display text-[clamp(2.6rem,8.2vw,8rem)] leading-[0.92] text-ivory"
              />
            </h2>
          </div>

          <motion.div
            className="flex flex-col justify-end gap-10 lg:col-span-4"
            style={{ y: lift }}
          >
            <ul className="space-y-2">
              {intro.lines.map((line, i) => (
                <motion.li
                  key={line}
                  className="font-display text-2xl text-ivory/90 sm:text-3xl"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.15 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mr-3 text-accent">/</span>
                  {line}
                </motion.li>
              ))}
            </ul>

            <motion.p
              className="max-w-sm text-base leading-relaxed text-ash"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, delay: 0.3 }}
            >
              {intro.body}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 border-t border-white/8 pt-8 md:mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1 }}
        >
          <p className="max-w-4xl text-xl leading-snug text-ivory sm:text-2xl md:text-3xl">
            {identity.statement}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
