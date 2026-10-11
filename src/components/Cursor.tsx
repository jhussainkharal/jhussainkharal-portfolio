import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/usePointerDevice";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CursorState = "default" | "hover" | "view" | "drag";

const LABELS: Record<CursorState, string> = {
  default: "",
  hover: "",
  view: "VIEW",
  drag: "DRAG",
};

/**
 * Refined two-part cursor (precise dot + trailing ring).
 * States are declared on elements via `data-cursor="view | hover | drag"`.
 * Never rendered on touch devices or with reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("cursor-hidden");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as HTMLElement | null;
      const flagged = target?.closest<HTMLElement>("[data-cursor]");
      if (flagged) {
        setState((flagged.dataset.cursor as CursorState) ?? "hover");
        return;
      }
      const interactive = target?.closest("a, button, [role='button'], input");
      setState(interactive ? "hover" : "default");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [active, visible, x, y]);

  if (!active) return null;

  const expanded = state === "view" || state === "drag";
  const label = LABELS[state];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      {/* Precise dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-ivory"
        style={{ x, y, width: 5, height: 5, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !expanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {/* Trailing ring / label capsule */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white/25 backdrop-blur-[2px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: expanded ? 86 : state === "hover" ? 44 : 30,
          height: expanded ? 86 : state === "hover" ? 44 : 30,
          opacity: visible ? 1 : 0,
          backgroundColor: expanded
            ? "rgba(61,123,255,0.9)"
            : "rgba(61,123,255,0.06)",
          borderColor: expanded ? "rgba(61,123,255,0)" : "rgba(255,255,255,0.22)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="font-mono text-[10px] tracking-[0.25em] text-white"
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
