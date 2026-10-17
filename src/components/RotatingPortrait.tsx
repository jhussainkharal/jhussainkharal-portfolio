import { useEffect, useRef } from "react";

/**
 * Scroll/mouse-driven 3D portrait.
 * A pre-rendered 360° frame sequence is scrubbed by the visitor's
 * horizontal mouse position (with idle auto-rotation), giving the
 * "rotating 3D portrait" effect from the reference build.
 */
const modules = import.meta.glob<string>("/src/assets/rotation/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const FRAMES: string[] = Object.keys(modules)
  .sort()
  .map((k) => modules[k]);

export function RotatingPortrait({ className = "" }: { className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const target = useRef(0.5);
  const current = useRef(0.5);
  const auto = useRef(true);

  useEffect(() => {
    // Preload all frames up front for butter-smooth scrubbing.
    FRAMES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (auto.current) {
        target.current = (target.current + dt * 0.045) % 1;
      }
      // Ease toward target for a weighted, physical feel.
      current.current += (target.current - current.current) * 0.08;
      const idx =
        Math.floor(current.current * FRAMES.length) % FRAMES.length;
      const el = imgRef.current;
      if (el) {
        const next = FRAMES[idx];
        if (el.dataset.i !== String(idx)) {
          el.dataset.i = String(idx);
          el.src = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        auto.current = false;
        target.current = Math.min(
          Math.max((e.clientX - r.left) / r.width, 0),
          1
        );
      }}
      onMouseLeave={() => {
        auto.current = true;
      }}
    >
      {FRAMES.length > 0 && (
        <img
          ref={imgRef}
          src={FRAMES[0]}
          alt="Rotating 3D portrait of Rai Jawad Hussain Kharal"
          className="h-full w-full object-cover"
          draggable={false}
        />
      )}
      {/* Cinematic edge blend into the black stage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
}
