import { useEffect, useRef } from "react";
import styles from "./Cube.module.css";

const FACES = [
  { name: "front", label: "MAX" },
  { name: "back", label: "DEV" },
  { name: "right", label: "01" },
  { name: "left", label: "OK" },
  { name: "top", label: "RUN" },
  { name: "bottom", label: "ON" },
];

export function Cube() {
  const cubeRef = useRef(null);
  const rot = useRef({ x: -18, y: 26 });
  const vel = useRef({ x: 0.05, y: 0.28 });
  const drag = useRef(null);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (!drag.current) {
        rot.current.x += vel.current.x;
        rot.current.y += vel.current.y;
        vel.current.x *= 0.965;
        vel.current.y *= 0.965;
        if (Math.abs(vel.current.y) < 0.06) vel.current.y = 0.06;
      }
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY };
    vel.current = { x: 0, y: 0 };
  };

  const onMove = (event) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    rot.current.y += dx * 0.55;
    rot.current.x -= dy * 0.55;
    vel.current = { x: -dy * 0.14, y: dx * 0.14 };
    drag.current = { x: event.clientX, y: event.clientY };
  };

  const onUp = () => {
    drag.current = null;
  };

  return (
    <div
      className={styles.scene}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      data-cursor="крутить"
      role="img"
      aria-label="Крути куб"
    >
      <div className={styles.cube} ref={cubeRef}>
        {FACES.map((face) => (
          <span key={face.name} className={`${styles.face} ${styles[face.name]}`}>
            {face.label}
          </span>
        ))}
      </div>
    </div>
  );
}
