import styles from "./Marquee.module.css";

export function Marquee({ items, reverse = false }) {
  const row = [...items, ...items];

  return (
    <div className={`${styles.marquee} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.track}>
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i aria-hidden="true"> / </i>
          </span>
        ))}
      </div>
    </div>
  );
}
