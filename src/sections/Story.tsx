import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { Section } from "@/components/Section";
import { story } from "@/data/site";

/**
 * The story, told plainly.
 * A thin line tracks reading progress; the pull quote interrupts the
 * column halfway through, the way a film cuts to a wide shot.
 */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.7"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  const half = Math.ceil(story.paragraphs.length / 2);
  const first = story.paragraphs.slice(0, half);
  const second = story.paragraphs.slice(half);

  return (
    <Section id="story" eyebrow="05 / Story">
      <div ref={ref} className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Sticky rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[0.95] text-ivory">
              Where this
              <br />
              started.
            </h2>
            <div className="mt-8 hidden h-40 w-px bg-white/10 lg:block">
              <motion.div
                className="h-full w-px origin-top bg-accent"
                style={{ scaleY: progress }}
              />
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-8">
          <Paragraphs items={first} />

          <motion.blockquote
            className="my-12 border-l border-accent/50 py-2 pl-6 md:my-16 md:pl-10"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE }}
          >
            <p className="font-display text-[clamp(1.5rem,3.4vw,2.8rem)] leading-[1.15] text-ivory">
              {story.pullQuote}
            </p>
          </motion.blockquote>

          <Paragraphs items={second} offset={first.length} />
        </div>
      </div>
    </Section>
  );
}

function Paragraphs({ items, offset = 0 }: { items: string[]; offset?: number }) {
  return (
    <div className="space-y-6">
      {items.map((text, i) => (
        <motion.p
          key={offset + i}
          className="max-w-2xl text-base leading-[1.75] text-ash md:text-[17px]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
