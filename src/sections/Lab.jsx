import { useEffect, useState } from "react";
import { copy } from "../data/copy";
import { SectionHeader } from "../components/SectionHeader";
import { SignalField } from "../components/SignalField";
import { Cube } from "../components/Cube";
import styles from "./Lab.module.css";

export function Lab() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section id="lab" className={`section ${styles.lab}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.lab.index}
          label={copy.lab.label}
          kicker={copy.lab.kicker}
        />
        <p className={styles.lead}>{copy.lab.lead}</p>
        <p className={`mono ${styles.hint}`}>
          {reduced ? copy.lab.reduced : copy.lab.hint}
        </p>
        <div className={styles.frame}>
          <span className={`${styles.mark} ${styles.tl}`} />
          <span className={`${styles.mark} ${styles.tr}`} />
          <span className={`${styles.mark} ${styles.bl}`} />
          <span className={`${styles.mark} ${styles.br}`} />
          <div className={styles.cubeSlot}>
            <Cube />
          </div>
          <SignalField reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
