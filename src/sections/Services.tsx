import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import { aiLab, buildCategories } from "@/data/site";

/**
 * Services — the five build disciplines as noir index rows,
 * plus the AI workflow strip.
 */
export function Services() {
  return (
    <section id="services" className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          className="label mb-8 text-cobalt-bright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          02 — Services
        </motion.p>
        <h2 className="font-display mb-16 text-[12vw] leading-[0.95] text-white md:mb-24 md:text-[7vw]">
          <MaskText>WHAT I</MaskText>
          <MaskText delay={0.08}>
            <span className="text-stroke">BUILD.</span>
          </MaskText>
        </h2>

        <div className="border-t border-line">
          {buildCategories.map((c) => (
            <motion.div
              key={c.id}
              className="group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:py-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="font-display text-2xl text-dim transition-colors group-hover:text-cobalt-bright md:col-span-1">
                {c.index}
              </span>
              <h3 className="font-display text-4xl text-white md:col-span-4 md:text-5xl">
                {c.title}
              </h3>
              <div className="md:col-span-7">
                <p className="text-lg text-ash">{c.summary}</p>
                <p className="mt-2 leading-relaxed text-dim">{c.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="label text-dim">
                      {t}
                      <span className="ml-2 text-cobalt">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI workflow strip */}
        <div className="mt-20 md:mt-28">
          <p className="label mb-8 text-cobalt-bright">AI Workflow</p>
          <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-5">
            {aiLab.workflow.map((w, i) => (
              <motion.div
                key={w.step}
                className="bg-noir p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              >
                <span className="font-display text-lg text-cobalt-bright">
                  0{i + 1}
                </span>
                <h4 className="font-display mt-3 text-2xl text-white">
                  {w.step}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-dim">{w.note}</p>
              </motion.div>
            ))}
          </div>
          <p className="label mt-6 text-dim">
            Tools inside a workflow — not credentials ·{" "}
            {aiLab.tools.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
