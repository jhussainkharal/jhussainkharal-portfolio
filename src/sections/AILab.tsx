import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { Section } from "@/components/Section";
import { aiLab } from "@/data/site";

/**
 * AI LAB — presented as a working method (a chain), not a tool list.
 * A line of light fills down the chain as the section is scrolled.
 */
export function AILab() {
  const chainRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: chainRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="ai-lab" eyebrow="03 / AI Lab" className="relative">
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute top-1/4 -left-1/4 h-[60vmax] w-[60vmax] opacity-40"
      />

      <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[0.95] text-ivory">
            How I actually
            <br />
            work with AI.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ash">
            Not a list of tools — a sequence. Each stage feeds the next until an
            idea becomes something that runs.
          </p>

          {/* Tools */}
          <div className="mt-10">
            <p className="label mb-4">Tools in the workflow</p>
            <div className="flex flex-wrap gap-2">
              {aiLab.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  className="glass rounded-full px-4 py-2 text-sm text-ivory/85"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10.5px] tracking-[0.16em] text-dim">
              {aiLab.note.toUpperCase()}
            </p>
          </div>
        </div>

        {/* The chain */}
        <div className="lg:col-span-7">
          <ol ref={chainRef} className="relative pl-10 sm:pl-14">
            {/* Track + animated light */}
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-px bg-white/10 sm:left-[11px]"
            />
            <motion.div
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-accent/0 sm:left-[11px]"
              style={{ scaleY: fill }}
            />

            {aiLab.workflow.map((item, i) => (
              <motion.li
                key={item.step}
                className="relative pb-9 last:pb-0"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span
                  aria-hidden
                  className="absolute top-[0.6rem] -left-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/50 bg-obsidian sm:-left-14 sm:h-[23px] sm:w-[23px]"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <h3 className="wordmark text-[clamp(1.5rem,3.6vw,2.6rem)] text-ivory">
                    {item.step}
                  </h3>
                  <span className="font-mono text-[10px] text-dim">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-1 max-w-sm text-sm text-ash">{item.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* AI capabilities */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-xl bg-white/8 sm:grid-cols-3 md:mt-28">
        {aiLab.capabilities.map((group, i) => (
          <motion.div
            key={group.group}
            className="bg-graphite/90 p-7 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: i * 0.08, duration: 0.8, ease: EASE }}
          >
            <p className="label mb-5">{group.group}</p>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-ivory/90"
                >
                  <span className="h-px w-4 bg-accent/60" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
