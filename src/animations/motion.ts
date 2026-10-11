import type { Transition, Variants } from "framer-motion";

/** Shared cinematic easing — slow out, confident settle. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 1.1,
  ease: EASE,
};

/** Fade + lift, used for most block-level reveals. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Masked line reveal — the line slides up from behind an overflow clip. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
};

/** Parent that staggers its children. */
export const stagger = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const viewportOnce = { once: true, amount: 0.3 } as const;
