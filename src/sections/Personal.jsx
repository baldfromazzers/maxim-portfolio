import { copy } from "../data/copy";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./Personal.module.css";

export function Personal() {
  return (
    <section className={`section ${styles.personal}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.personal.index}
          label={copy.personal.label}
          kicker={copy.personal.kicker}
        />
        <div className={styles.notes}>
          {copy.personal.notes.map((note) => (
            <article key={note.id}>
              <p className="mono">{note.id}</p>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
