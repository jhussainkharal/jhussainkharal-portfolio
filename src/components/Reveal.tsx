import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, rise, stagger, viewportOnce } from "@/animations/motion";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Simple fade + lift on scroll-in. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={rise}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type MaskTextProps = {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Editorial masked-line reveal: the line is clipped by its own
 * overflow-hidden wrapper and slides up into place.
 */
export function MaskText({
  children,
  className,
  lineClassName,
  delay = 0,
}: MaskTextProps) {
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.09, delay)}
    >
      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className={cn("block will-change-transform", lineClassName)}
          variants={{
            hidden: { y: "115%" },
            visible: { y: "0%", transition: { duration: 1.05, ease: EASE } },
          }}
        >
          {children}
        </motion.span>
      </span>
    </motion.span>
  );
}
