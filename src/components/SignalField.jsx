import { useEffect, useRef, useState } from "react";
import { copy } from "../data/copy";
import styles from "./SignalField.module.css";

const WORD = "РАБОТАЕТ";

function sampleGlyph(width, height, text, gap) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  const size = Math.min(width * 0.18, height * 0.52);
  ctx.fillStyle = "#fff";
  ctx.font = `300 ${size}px Fraunces, "Times New Roman", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2 + size * 0.04);

  const { data } = ctx.getImageData(0, 0, width, height);
  const points = [];
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      if (data[(y * width + x) * 4 + 3] > 80) {
        points.push({
          x,
          y,
          ox: x,
          oy: y,
          vx: 0,
          vy: 0,
        });
      }
    }
  }
  return points;
}

export function SignalField({ reduced = false }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const engine = useRef({
    particles: [],
    mouse: { x: -9999, y: -9999, down: false },
    mode: "repel",
    shocks: [],
    width: 0,
    height: 0,
    dpr: 1,
    last: 0,
    frames: 0,
    fps: 60,
  });
  const [hud, setHud] = useState({
    fps: 60,
    count: 0,
    mode: "repel",
    mx: 0,
    my: 0,
  });
  const [mode, setMode] = useState("repel");

  useEffect(() => {
    engine.current.mode = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const state = engine.current;
    let frame = 0;
    let running = true;
    let hudTimer = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = Math.max(320, Math.floor(rect.width));
      state.height = Math.max(280, Math.floor(rect.height));
      state.dpr = dpr;
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = state.width < 640 ? 7 : 5;
      state.particles = sampleGlyph(state.width, state.height, WORD, gap);
      setHud((prev) => ({ ...prev, count: state.particles.length }));
    };

    const localPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      const point = "touches" in event ? event.touches[0] : event;
      if (!point) return;
      state.mouse.x = point.clientX - rect.left;
      state.mouse.y = point.clientY - rect.top;
    };

    const onMove = (event) => localPoint(event);
    const onLeave = () => {
      state.mouse.x = -9999;
      state.mouse.y = -9999;
    };
    const onDown = (event) => {
      localPoint(event);
      state.mouse.down = true;
      const { x, y } = state.mouse;
      state.shocks.push({ x, y, r: 8, life: 1 });
      for (const p of state.particles) {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.min(28, 2200 / dist);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    };
    const onUp = () => {
      state.mouse.down = false;
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      const step = 40;
      ctx.beginPath();
      for (let x = 0; x <= state.width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, state.height);
      }
      for (let y = 0; y <= state.height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(state.width, y);
      }
      ctx.stroke();
    };

    const tick = (time) => {
      if (!running) return;
      const dt = Math.min(32, time - (state.last || time));
      state.last = time;
      state.frames += 1;
      if (time - hudTimer > 250 && running) {
        hudTimer = time;
        state.fps = Math.round(1000 / Math.max(dt, 1));
        setHud({
          fps: state.fps,
          count: state.particles.length,
          mode: state.mode,
          mx: Math.max(0, Math.round(state.mouse.x)),
          my: Math.max(0, Math.round(state.mouse.y)),
        });
      }

      ctx.clearRect(0, 0, state.width, state.height);
      drawGrid();

      const spring = reduced ? 1 : 0.055;
      const damp = reduced ? 0 : 0.86;
      const radius = 150;
      const strength = state.mode === "attract" ? 1.15 : 1.65;

      ctx.lineWidth = 1;
      for (const p of state.particles) {
        if (!reduced) {
          const hx = p.ox - p.x;
          const hy = p.oy - p.y;
          p.vx += hx * spring;
          p.vy += hy * spring;

          const cx = state.mouse.x - p.x;
          const cy = state.mouse.y - p.y;
          const d2 = cx * cx + cy * cy;
          if (d2 < radius * radius && d2 > 0.25) {
            const d = Math.sqrt(d2);
            const force = (1 - d / radius) * strength;
            const dir = state.mode === "attract" ? 1 : -1;
            p.vx += (cx / d) * force * dir;
            p.vy += (cy / d) * force * dir;
          }

          p.vx *= damp;
          p.vy *= damp;
          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x = p.ox;
          p.y = p.oy;
        }

        const displace = Math.hypot(p.x - p.ox, p.y - p.oy);
        if (displace > 6) {
          ctx.strokeStyle = `rgba(200,200,196,${Math.min(0.28, displace / 240)})`;
          ctx.beginPath();
          ctx.moveTo(p.ox, p.oy);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "#fff";
      for (const p of state.particles) {
        ctx.fillRect(p.x - 1.1, p.y - 1.1, 2.2, 2.2);
      }

      state.shocks = state.shocks.filter((shock) => shock.life > 0);
      for (const shock of state.shocks) {
        shock.r += 7;
        shock.life -= 0.03;
        ctx.strokeStyle = `rgba(200,200,196,${shock.life * 0.55})`;
        ctx.beginPath();
        ctx.arc(shock.x, shock.y, shock.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (state.mouse.x > 0) {
        ctx.strokeStyle = "rgba(200,200,196,0.7)";
        ctx.beginPath();
        ctx.moveTo(state.mouse.x - 10, state.mouse.y);
        ctx.lineTo(state.mouse.x + 10, state.mouse.y);
        ctx.moveTo(state.mouse.x, state.mouse.y - 10);
        ctx.lineTo(state.mouse.x, state.mouse.y + 10);
        ctx.stroke();
      }

      frame = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reduced]);

  const scatter = () => {
    const { particles, width, height } = engine.current;
    for (const p of particles) {
      p.vx += (Math.random() - 0.5) * 38;
      p.vy += (Math.random() - 0.5) * 38;
      p.x += (Math.random() - 0.5) * 40;
      p.y += (Math.random() - 0.5) * 24;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }
  };

  const assemble = () => {
    for (const p of engine.current.particles) {
      p.vx = (p.ox - p.x) * 0.08;
      p.vy = (p.oy - p.y) * 0.08;
    }
  };

  return (
    <div className={styles.field} ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        data-cursor="ломать"
      />
      <div className={styles.hud} aria-hidden="true">
        <p>
          <span>PTS</span> {hud.count}
        </p>
        <p>
          <span>FPS</span> {hud.fps}
        </p>
        <p>
          <span>MX</span> {hud.mx}
        </p>
        <p>
          <span>MY</span> {hud.my}
        </p>
        <p>
          <span>MODE</span> {hud.mode}
        </p>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={scatter} data-cursor="бум">
          {copy.lab.scatter}
        </button>
        <button type="button" onClick={assemble} data-cursor="назад">
          {copy.lab.assemble}
        </button>
        <button
          type="button"
          onClick={() => setMode((value) => (value === "repel" ? "attract" : "repel"))}
          data-cursor="режим"
        >
          {mode === "repel" ? copy.lab.attract : copy.lab.repel}
        </button>
      </div>
    </div>
  );
}
