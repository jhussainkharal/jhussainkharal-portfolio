import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import type { Project } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * One project = one chapter.
 * Large visual with a masked reveal + inner parallax, followed by a
 * compact technical record (role, stack, status).
 */
export function ProjectChapter({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle counter-movement inside the frame — depth without seasickness.
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-8%", "8%"],
  );

  return (
    <article ref={ref} className="relative py-16 md:py-24">
      {/* Chapter head */}
      <div className="mb-7 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4 sm:gap-7">
          <motion.span
            className="mt-2 font-mono text-xs text-accent sm:mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            {project.index}
          </motion.span>
          <div>
            <h3>
              <MaskText
                lines={[project.name]}
                className="wordmark text-[clamp(1.9rem,6.4vw,5.4rem)] leading-[0.95] text-ivory"
              />
            </h3>
            {project.subtitle && (
              <motion.p
                className="mt-1 font-display text-lg text-ash italic sm:text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                {project.subtitle}
              </motion.p>
            )}
          </div>
        </div>

        <motion.p
          className="label max-w-xs md:text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {project.category}
        </motion.p>
      </div>

      {/* Visual */}
      <motion.div
        data-cursor="view"
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-graphite ring-1 ring-white/8 sm:aspect-[16/9]"
        initial={{ clipPath: "inset(12% 6% 12% 6% round 12px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <motion.img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          style={{ y: imageY }}
          className="absolute inset-0 h-[118%] w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
        />
        {/* Cinematic vignette + blue light wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,rgba(5,6,10,0.65)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(120deg, rgba(61,123,255,0.16), transparent 55%)",
          }}
        />
        {/* Floating metadata */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 sm:bottom-5 sm:left-5">
          <span className="glass rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-ivory/90">
            {project.status.toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* Technical record */}
      <div className="mt-8 grid gap-8 border-t border-white/8 pt-8 md:grid-cols-12">
        <motion.p
          className="text-[15px] leading-relaxed text-ash md:col-span-6 md:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {project.description}
        </motion.p>

        <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-2">
          <MetaList title="Role" items={project.role} />
          <MetaList title="Stack / Focus" items={project.tech} />
        </div>
      </div>
    </article>
  );
}

function MetaList({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
    >
      <p className="label mb-3">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-ivory/85">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
