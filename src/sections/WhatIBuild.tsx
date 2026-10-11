import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { Section } from "@/components/Section";
import { buildCategories } from "@/data/site";
import { cn } from "@/utils/cn";

/**
 * Interactive discipline index.
 * Each row behaves like an object: it opens on hover (pointer) or
 * focus/click (keyboard + touch) and reveals its detail and tags.
 */
export function WhatIBuild() {
  const [open, setOpen] = useState<string | null>(buildCategories[0].id);

  return (
    <Section id="build" eyebrow="01 / What I Build" className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] text-ivory">
            Five ways
            <br />
            an idea becomes
            <br />
            <span className="text-accent-soft">something real.</span>
          </h2>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-white/8">
            {buildCategories.map((cat, i) => {
              const isOpen = open === cat.id;
              return (
                <motion.li
                  key={cat.id}
                  className="border-b border-white/8"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.06, duration: 0.8, ease: EASE }}
                  onMouseEnter={() => setOpen(cat.id)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : cat.id)}
                    onFocus={() => setOpen(cat.id)}
                    className="group flex w-full items-baseline gap-4 py-5 text-left sm:gap-8 sm:py-7"
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] transition-colors duration-300",
                        isOpen ? "text-accent" : "text-dim",
                      )}
                    >
                      {cat.index}
                    </span>
                    <span
                      className={cn(
                        "wordmark text-[clamp(1.6rem,4.4vw,3rem)] transition-colors duration-300",
                        isOpen ? "text-ivory" : "text-ash/60 group-hover:text-ivory",
                      )}
                    >
                      {cat.title}
                    </span>
                    <span className="ml-auto hidden max-w-[16rem] text-right text-sm text-dim md:block">
                      {cat.summary}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 sm:pl-[3.4rem]">
                          <p className="max-w-xl text-[15px] leading-relaxed text-ash md:hidden">
                            {cat.summary}
                          </p>
                          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ash">
                            {cat.detail}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {cat.tags.map((tag) => (
                              <span
                                key={tag}
                                className="glass rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ivory/80"
                              >
                                {tag.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
