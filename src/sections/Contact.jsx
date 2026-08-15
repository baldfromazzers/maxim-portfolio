import { ArrowUpRight } from "lucide-react";
import { copy } from "../data/copy";
import { site } from "../data/site";
import { SectionHeader } from "../components/SectionHeader";
import { MagneticButton } from "../components/MagneticButton";
import styles from "./Contact.module.css";

function getLinks() {
  const { telegram, phone, phoneLabel, email, github } = site.contacts;
  const links = [];

  if (telegram) {
    links.push({
      label: `Telegram ${telegram.startsWith("@") ? telegram : `@${telegram}`}`,
      href: telegram.startsWith("http")
        ? telegram
        : `https://t.me/${telegram.replace(/^@/, "")}`,
    });
  }

  if (phone) {
    links.push({
      label: phoneLabel || phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    });
  }

  if (email) {
    links.push({ label: "Email", href: `mailto:${email}` });
  }

  if (github) {
    links.push({ label: "GitHub", href: github });
  }

  return links;
}

export function Contact() {
  const links = getLinks();

  return (
    <section id="contact" className={`section section--paper ${styles.contact}`}>
      <div className="wrap">
        <SectionHeader
          index={copy.contact.index}
          label={copy.contact.label}
          kicker={copy.contact.kicker}
        />
        <h3 className={styles.headline}>{copy.contact.headline}</h3>
        <p className={styles.lead}>{copy.contact.lead}</p>
        {links.length ? (
          <div className={styles.actions}>
            {links.map((link) => (
              <MagneticButton
                key={link.label}
                href={link.href}
                external={link.href.startsWith("http")}
                variant="paper"
              >
                {link.label}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </MagneticButton>
            ))}
          </div>
        ) : (
          <p className={`mono ${styles.empty}`}>{copy.contact.empty}</p>
        )}
        <p className={`mono ${styles.hover}`}>{copy.contact.hover}</p>
      </div>
    </section>
  );
}
