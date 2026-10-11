import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { viewportOnce } from "@/animations/motion";
import { cn } from "@/utils/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Mono eyebrow, e.g. "02 / SELECTED WORK" */
  eyebrow?: string;
};

export function Section({ id, children, className, eyebrow }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative px-5 py-24 sm:px-8 md:py-32 lg:py-40", className)}
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {eyebrow && <SectionEyebrow text={eyebrow} />}
        {children}
      </div>
    </section>
  );
}

export function SectionEyebrow({ text }: { text: string }) {
  return (
    <motion.div
      className="mb-10 flex items-center gap-4 md:mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8 }}
    >
      <span className="h-1 w-1 rounded-full bg-accent" />
      <span className="label">{text}</span>
      <motion.span
        className="hairline flex-1"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
