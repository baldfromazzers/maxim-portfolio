import { copy } from "../data/copy";
import { site } from "../data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.track}>
          <span>{copy.footer.ticker}</span>
          <span>{copy.footer.ticker}</span>
        </div>
      </div>
      <div className={styles.bar}>
        <p className="mono">{copy.footer.left}</p>
        <p className="mono">{copy.footer.mid}</p>
        <p className="mono">
          © {site.year} {site.nameLatin}
        </p>
      </div>
    </footer>
  );
}
