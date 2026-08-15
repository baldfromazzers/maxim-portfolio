import { useEffect } from "react";
import { motion } from "framer-motion";
import { useFinePointer } from "../hooks/useMedia";
import { usePointer } from "../hooks/usePointer";
import styles from "./Cursor.module.css";

export function Cursor() {
  const fine = useFinePointer();
  const { point, label } = usePointer();

  useEffect(() => {
    document.body.classList.toggle("has-cursor", fine);
    return () => document.body.classList.remove("has-cursor");
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      className={styles.root}
      style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }}
      aria-hidden="true"
    >
      <span className={styles.cross} />
      <motion.span
        className={styles.label}
        animate={{ opacity: label ? 1 : 0, x: label ? 14 : 8 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {label || "look"}
      </motion.span>
    </div>
  );
}
