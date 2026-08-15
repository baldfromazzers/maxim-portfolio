import { motion, useScroll, useTransform } from "framer-motion";
import { copy } from "../data/copy";
import portrait from "../assets/portrait.jpg";
import styles from "./Hero.module.css";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 56]);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.photoCol}>
        <figure className={styles.photo} data-cursor="look">
          <motion.img
            src={portrait}
            alt="Максим"
            width={1280}
            height={1280}
            style={{ y }}
          />
          <span className={`${styles.mark} ${styles.tl}`} />
          <span className={`${styles.mark} ${styles.tr}`} />
          <span className={`${styles.mark} ${styles.bl}`} />
          <span className={`${styles.mark} ${styles.br}`} />
          <figcaption className={styles.photoMeta}>
            {copy.hero.photoMeta.map(([key, value]) => (
              <p key={key}>
                <span>{key}</span>
                {value}
              </p>
            ))}
          </figcaption>
        </figure>
      </div>

      <div className={styles.typeCol}>
        <p className={`mono ${styles.kicker}`}>{copy.hero.kicker}</p>
        <h1 className={styles.title}>
          {copy.hero.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className={styles.lead}>{copy.hero.lead}</p>
        <dl className={styles.meta}>
          {copy.hero.meta.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <a className={styles.scroll} href="#about" data-cursor="дальше">
          {copy.hero.scroll}
          <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
