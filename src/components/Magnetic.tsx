import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/usePointerDevice";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to drift toward the pointer (px). */
  strength?: number;
};

/**
 * Magnetic hover: the element leans toward the cursor with spring physics.
 * Automatically inert on touch devices and with reduced motion enabled.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength * 2);
    y.set((relY / rect.height) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: sx, y: sy } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
