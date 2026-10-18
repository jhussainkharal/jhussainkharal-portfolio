import { useEffect, useRef } from "react";
import chromeImg from "@/assets/portrait-binary-sticker.png";
import noirImg from "@/assets/portrait-clean-sticker.png";

type TrailPoint = { x: number; y: number; t: number };

/**
 * Secret Reveal — cursor paints a hidden chrome/cobalt version of the
 * portrait into view through the top layer, with a soft fading trail.
 * The trail is interpolated per-frame (no gaps on fast moves) and eased
 * for a buttery feel. Edges are feathered so the photo floats cleanly.
 */
export function SecretReveal({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const top = new Image();
    const trail: TrailPoint[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const smooth = { x: 0, y: 0, init: false };
    let interacted = false;
    let sweepTimer: number | null = null;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    const toLocal = (clientX: number, clientY: number) => {
      const r = wrap.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      interacted = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });

    // Intro sweep — teaches the interaction once, then never again.
    if (!reduced) {
      const begin = performance.now() + 700;
      const sweep = () => {
        if (interacted || !running) return;
        const p = (performance.now() - begin) / 2000;
        if (p >= 1) return;
        const r = wrap.getBoundingClientRect();
        pointer.x = r.width * p;
        pointer.y = r.height * 0.42;
        pointer.active = true;
        if (!smooth.init) {
          smooth.x = pointer.x;
          smooth.y = pointer.y;
          smooth.init = true;
        }
        sweepTimer = window.setTimeout(sweep, 16);
      };
      sweepTimer = window.setTimeout(sweep, 700);
    }

    const visible = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    visible.observe(wrap);

    let last = performance.now();
    const HOLE_R = 135; // css px — bigger, softer
    const FADE_MS = 2200; // longer lingering trail

    const drawHole = (x: number, y: number, alpha: number) => {
      const r = HOLE_R * dpr;
      const g = ctx.createRadialGradient(x * dpr, y * dpr, 0, x * dpr, y * dpr, r);
      g.addColorStop(0, `rgba(0,0,0,${0.9 * alpha})`);
      g.addColorStop(0.45, `rgba(0,0,0,${0.5 * alpha})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (now: number) => {
      if (!running) return;
      last = now;

      // Ease the render cursor toward the real one — buttery, gap-free.
      if (!smooth.init) {
        smooth.x = pointer.x;
        smooth.y = pointer.y;
        smooth.init = true;
      }
      smooth.x += (pointer.x - smooth.x) * 0.35;
      smooth.y += (pointer.y - smooth.y) * 0.35;
      if (pointer.active) {
        trail.push({ x: smooth.x, y: smooth.y, t: now });
        if (trail.length > 90) trail.shift();
      }

      // Cover-draw the top (normal) portrait.
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ir = top.width / top.height;
      const cr = canvas.width / canvas.height;
      let dw = canvas.width;
      let dh = canvas.height;
      if (ir > cr) dw = canvas.height * ir;
      else dh = canvas.width / ir;
      ctx.drawImage(top, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);

      // Punch soft holes along the trail (newest = strongest).
      ctx.globalCompositeOperation = "destination-out";
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const age = now - p.t;
        if (age > FADE_MS) {
          trail.splice(i, 1);
          continue;
        }
        // Ease alpha for a silky fade rather than linear.
        const k = 1 - age / FADE_MS;
        drawHole(p.x, p.y, k * k);
      }

      raf = requestAnimationFrame(tick);
    };

    top.onload = () => {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    top.src = noirImg;

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      visible.disconnect();
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (sweepTimer) window.clearTimeout(sweepTimer);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {/* Hidden layer — chrome/cobalt sticker, revealed through the holes */}
      <img
        src={chromeImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Top layer painted on canvas so the cursor can punch through it */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span className="sr-only">
        Interactive portrait of Rai Jawad Hussain Kharal — move your cursor over
        it to reveal the digital version
      </span>
    </div>
  );
}
