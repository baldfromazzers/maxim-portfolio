import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFinePointer } from "../hooks/useMedia";
import styles from "./MagneticButton.module.css";

export function MagneticButton({
  href,
  children,
  className = "",
  variant = "dark",
  external = false,
  onClick,
  type = "button",
}) {
  const fine = useFinePointer();
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    if (!fine || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    setOffset({
      x: (event.clientX - (box.left + box.width / 2)) * 0.28,
      y: (event.clientY - (box.top + box.height / 2)) * 0.28,
    });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const motionProps = {
    ref,
    className: `${styles.button} ${variant === "paper" ? styles.paperBtn : ""} ${className}`.trim(),
    onMouseMove: onMove,
    onMouseLeave: reset,
    animate: { x: offset.x, y: offset.y },
    transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.35 },
    "data-cursor": "открыть",
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type={type} onClick={onClick}>
      {children}
    </motion.button>
  );
}
