import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { copy } from "../data/copy";
import { projects } from "../data/projects";
import { SectionHeader } from "../components/SectionHeader";
import { useFinePointer } from "../hooks/useMedia";
import { usePointer } from "../hooks/usePointer";
import styles from "./Projects.module.css";

export function Projects() {
  const fine = useFinePointer();
  const { point } = usePointer();
  const [active, setActive] = useState(null);
  const current = projects.find((item) => item.id === active);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.projects.index}
          label={copy.projects.label}
          kicker={copy.projects.kicker}
        />
        <p className={`mono ${styles.hint}`}>{copy.projects.hint}</p>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="смотреть"
                onMouseEnter={() => setActive(project.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(project.id)}
                onBlur={() => setActive(null)}
              >
                <span className={styles.num}>{project.number}</span>
                <span className={styles.body}>
                  <span className={styles.title}>{project.title}</span>
                  <span className={styles.category}>{project.category}</span>
                  <span className={styles.summary}>{project.summary}</span>
                </span>
                <span className={styles.meta}>
                  <span>{project.year}</span>
                  <span className={styles.open}>
                    {copy.projects.open}
                    <ArrowUpRight size={16} strokeWidth={1.4} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {fine && current ? (
        <div
          className={styles.preview}
          style={{
            transform: `translate3d(${point.x + 28}px, ${point.y - 120}px, 0)`,
          }}
          aria-hidden="true"
        >
          <img src={current.preview} alt="" />
        </div>
      ) : null}
    </section>
  );
}
