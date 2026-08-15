import { copy } from "../data/copy";
import { stack } from "../data/stack";
import { Marquee } from "../components/Marquee";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./Stack.module.css";

const second = [...stack].reverse();

export function Stack() {
  return (
    <section id="index" className={`section ${styles.stack}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.stack.index}
          label={copy.stack.label}
          kicker={copy.stack.kicker}
        />
      </div>
      <div className={styles.lines}>
        <Marquee items={stack} />
        <Marquee items={second} reverse />
      </div>
      <p className={`mono ${styles.note}`}>{copy.stack.note}</p>
    </section>
  );
}
