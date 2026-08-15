import { useEffect, useState } from "react";

export function usePointer() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (event) => {
      setPoint({ x: event.clientX, y: event.clientY });
      const node = event.target.closest("[data-cursor]");
      setLabel(node ? node.dataset.cursor : "");
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return { point, label };
}
