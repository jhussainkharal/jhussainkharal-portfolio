import { motion } from "framer-motion";
import { viewportOnce } from "@/animations/motion";
import { ProjectChapter } from "@/components/ProjectChapter";
import { Section } from "@/components/Section";
import { projects } from "@/data/site";

export function Work() {
  return (
    <Section id="work" eyebrow="02 / Selected Work">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.92] text-ivory">
          Selected work,
          <br />
          told in chapters.
        </h2>
        <motion.p
          className="max-w-sm text-[15px] leading-relaxed text-ash"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1 }}
        >
          Four builds across software, institutional web, motion and commerce.
          Different problems, the same standard of execution.
        </motion.p>
      </div>

      <div className="mt-6 divide-y divide-white/5 md:mt-12">
        {projects.map((project) => (
          <ProjectChapter key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
