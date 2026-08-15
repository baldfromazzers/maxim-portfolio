import { useState } from "react";
import { copy } from "../data/copy";
import { work } from "../data/work";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./Work.module.css";

export function Work() {
  const [active, setActive] = useState(null);

  return (
    <section id="work" className={`section section--paper ${styles.work}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.work.index}
          label={copy.work.label}
          kicker={copy.work.kicker}
        />
        <p className={`mono ${styles.hint}`}>{copy.work.hint}</p>
        <ul>
          {work.map((item) => {
            const on = active === item.id;
            const dim = active && !on;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`${styles.row} ${on ? styles.on : ""} ${dim ? styles.dim : ""}`}
                  onMouseEnter={() => setActive(item.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(item.id)}
                  onBlur={() => setActive(null)}
                  data-cursor="читать"
                >
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.text}>{item.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
