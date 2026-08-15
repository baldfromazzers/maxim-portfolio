import { copy } from "../data/copy";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={`section section--paper ${styles.about}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.about.index}
          label={copy.about.label}
          kicker={copy.about.kicker}
        />
        <div className={styles.grid}>
          <div className={styles.manifesto}>
            {copy.about.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <aside className={styles.aside}>
            <p className="mono">{copy.about.asideLabel}</p>
            <ul>
              {copy.about.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className={styles.caption}>{copy.about.caption}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
