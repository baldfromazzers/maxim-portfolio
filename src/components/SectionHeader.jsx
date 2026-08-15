import { motion } from "framer-motion";
import styles from "./SectionHeader.module.css";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
};

export function SectionHeader({ index, label, kicker }) {
  return (
    <motion.div className={styles.header} {...fade}>
      <p className="mono">
        {index} / {kicker}
      </p>
      <h2>{label}</h2>
    </motion.div>
  );
}
