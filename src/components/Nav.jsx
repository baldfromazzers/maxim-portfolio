import { useEffect, useState } from "react";
import { copy } from "../data/copy";
import styles from "./Nav.module.css";

const links = [
  { href: "#index", label: copy.nav.index },
  { href: "#projects", label: copy.nav.projects },
  { href: "#lab", label: copy.nav.lab },
  { href: "#contact", label: copy.nav.contact },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#top" className={styles.brand} data-cursor="домой">
          {copy.nav.brand}
        </a>

        <nav className={styles.desktop} aria-label="Разделы">
          {links.map((link) => (
            <a key={link.href} href={link.href} data-cursor="туда">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-index"
          onClick={() => setOpen((value) => !value)}
          data-cursor="меню"
        >
          {open ? copy.nav.close : "Индекс"}
        </button>
      </header>

      {open ? (
        <div id="mobile-index" className={`${styles.overlay} ${styles.open}`}>
          <nav aria-label="Мобильное меню">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
