import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { identity } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-6%", "6%"],
  );

  const facts = [
    { label: "Name", value: identity.fullName },
    { label: "Known as", value: "Jhussainkharal" },
    { label: "Discipline", value: identity.title },
    { label: "Based in", value: identity.location },
  ];

  return (
    <Section id="about" eyebrow="06 / About">
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2 }}
        >
          <div
            aria-hidden
            className="glow-blue pointer-events-none absolute -inset-10 opacity-60"
          />
          <motion.div
            className="relative overflow-hidden rounded-xl ring-1 ring-white/10"
            initial={{ clipPath: "inset(14% 0% 14% 0% round 12px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)" }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <motion.img
              src={identity.portrait}
              alt={identity.portraitAlt}
              loading="lazy"
              decoding="async"
              style={{ y: portraitY }}
              className="aspect-[4/5] h-[112%] w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Identity block */}
        <div className="lg:col-span-7">
          <h2>
            <MaskText
              lines={["RAI JAWAD", "HUSSAIN KHARAL"]}
              className="wordmark text-[clamp(1.9rem,5.6vw,4.6rem)] leading-[0.95] text-ivory"
            />
          </h2>
          <motion.p
            className="mt-4 font-display text-2xl text-accent-soft italic sm:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Jhussainkharal
          </motion.p>

          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-ash md:text-[17px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            {identity.statement} I work across design, development, AI and
            motion — usually on all of them inside the same project.
          </motion.p>

          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/8 sm:grid-cols-2">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                className="bg-graphite/90 px-6 py-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.07, duration: 0.7, ease: EASE }}
              >
                <dt className="label mb-1.5">{fact.label}</dt>
                <dd className="text-[15px] text-ivory">{fact.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
