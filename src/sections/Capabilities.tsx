import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { Section } from "@/components/Section";
import { capabilities, type SkillLevel } from "@/data/site";
import { cn } from "@/utils/cn";

const LEVEL_STEPS: Record<SkillLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

/** Honest level marker: three segments, no invented percentages. */
function LevelMarker({ level }: { level?: SkillLevel }) {
  if (!level) {
    return (
      <span className="font-mono text-[10px] tracking-[0.16em] text-dim">
        IN PRACTICE
      </span>
    );
  }
  const steps = LEVEL_STEPS[level];
  return (
    <span className="flex items-center gap-3">
      <span className="flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "h-[3px] w-5 rounded-full transition-colors duration-500",
              i < steps ? "bg-accent" : "bg-white/12",
            )}
          />
        ))}
      </span>
      <span className="font-mono text-[10px] tracking-[0.16em] text-ash">
        {level.toUpperCase()}
      </span>
    </span>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const group = capabilities[active];

  return (
    <Section id="capabilities" eyebrow="04 / Capabilities">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[0.95] text-ivory">
            What I can
            <br />
            take on.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ash">
            Levels stated plainly. Where something is still growing, it says so.
          </p>

          {/* Group selector */}
          <div
            role="tablist"
            aria-label="Capability groups"
            className="mt-10 flex flex-wrap gap-2"
          >
            {capabilities.map((g, i) => (
              <button
                key={g.group}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative overflow-hidden rounded-full px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300",
                  active === i
                    ? "text-ivory"
                    : "text-ash hover:text-ivory",
                )}
              >
                {active === i && (
                  <motion.span
                    layoutId="cap-pill"
                    className="glass absolute inset-0 rounded-full"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                <span className="relative">{g.group}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="mb-6 font-display text-xl text-ivory/80 italic sm:text-2xl">
                {group.caption}
              </p>
              <ul className="border-t border-white/8">
                {group.skills.map((skill, i) => (
                  <motion.li
                    key={skill.name}
                    className="group flex items-center justify-between gap-6 border-b border-white/8 py-4 transition-colors duration-300 hover:bg-white/[0.02] sm:py-5"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.6, ease: EASE }}
                  >
                    <span className="text-lg text-ivory transition-transform duration-500 group-hover:translate-x-1 sm:text-xl">
                      {skill.name}
                    </span>
                    <LevelMarker level={skill.level} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <motion.p
            className="mt-6 font-mono text-[10.5px] tracking-[0.16em] text-dim"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9 }}
          >
            SELF-ASSESSED — AND STILL MOVING.
          </motion.p>
        </div>
      </div>
    </Section>
  );
}
