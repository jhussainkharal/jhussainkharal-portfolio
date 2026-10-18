import { useEffect, useRef } from "react";
import chromeImg from "@/assets/portrait-chrome.jpg";
import noirImg from "@/assets/portrait-noir.jpg";

type TrailPoint = { x: number; y: number; t: number };

/**
 * Secret Reveal — cursor paints a hidden chrome/cobalt version of the
 * portrait into view through the top layer, with a soft fading trail.
 * Inspired by the Cindy Zhu "secret reveal" portfolio guide.
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
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const top = new Image();
    const trail: TrailPoint[] = [];
    let interacted = false;
    let sweepT: number | null = null;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    const pushPoint = (clientX: number, clientY: number) => {
      const r = wrap.getBoundingClientRect();
      trail.push({
        x: clientX - r.left,
        y: clientY - r.top,
        t: performance.now(),
      });
      if (trail.length > 60) trail.shift();
    };

    const onMove = (e: PointerEvent) => {
      interacted = true;
      pushPoint(e.clientX, e.clientY);
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });

    // Intro sweep — teaches the interaction once, then never again.
    if (!reduced) {
      const start = performance.now() + 600;
      sweepT = window.setTimeout(function sweep() {
        if (interacted || !running) return;
        const el = performance.now() - start;
        const p = el / 1800;
        if (p >= 1) return;
        const r = wrap.getBoundingClientRect();
        pushPoint(r.left + r.width * p, r.top + r.height * 0.42);
        sweepT = window.setTimeout(sweep, 16);
      }, 600);
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
    const HOLE_R = 110; // px, CSS pixels
    const FADE_MS = 1400;

    const drawHole = (x: number, y: number, alpha: number) => {
      const r = HOLE_R * dpr;
      const g = ctx.createRadialGradient(
        x * dpr, y * dpr, 0,
        x * dpr, y * dpr, r
      );
      g.addColorStop(0, `rgba(0,0,0,${0.95 * alpha})`);
      g.addColorStop(0.55, `rgba(0,0,0,${0.55 * alpha})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      void dt;

      // Cover-draw the top (normal) portrait.
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ir = top.width / top.height;
      const cr = canvas.width / canvas.height;
      let dw = canvas.width;
      let dh = canvas.height;
      if (ir > cr) {
        dw = canvas.height * ir;
      } else {
        dh = canvas.width / ir;
      }
      ctx.drawImage(top, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);

      // Punch soft holes along the trail (newest = strongest).
      const t = performance.now();
      ctx.globalCompositeOperation = "destination-out";
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const age = t - p.t;
        if (age > FADE_MS) {
          trail.splice(i, 1);
          continue;
        }
        drawHole(p.x, p.y, 1 - age / FADE_MS);
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
      if (sweepT) window.clearTimeout(sweepT);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {/* Hidden layer — chrome/cobalt version, revealed through the holes */}
      <img
        src={chromeImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Top layer painted on canvas so the cursor can punch through it */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Cinematic edge blend */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <span className="sr-only">
        Interactive portrait of Rai Jawad Hussain Kharal — move your cursor over
        it to reveal the chrome version
      </span>
    </div>
  );
}
