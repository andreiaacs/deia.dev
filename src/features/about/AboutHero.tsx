import { Icon } from '@/components/ui/Icon';
import { HandNote } from '@/components/ui/primitives';
import { about, aboutAreas } from '@/content/profile';
import { MottoNote } from '@/features/portfolio/Decorations';
import { cx } from '@/lib/cx';
import styles from './AboutHero.module.css';

/** Topo da página Sobre: cartoon, apresentação, áreas e post-it. */
export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="sobre-titulo">
      <figure className={styles.art}>
        <HandNote size="1.35rem" rotate={-14} className={styles.artNote} aria-hidden="true">
          {about.handNote.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </HandNote>
        <img
          src="/images/hero-deia.webp"
          alt="Ilustração da Déia de fones de ouvido trabalhando no notebook, com uma calopsita no ombro e livros de código, ideias e pessoas"
          width={806}
          height={810}
          fetchPriority="high"
        />
      </figure>

      <div className={styles.text}>
        <p className={styles.eyebrow}>Sobre mim</p>
        <h1 id="sobre-titulo" className={styles.title}>
          Tecnologia para <em>pessoas</em> reais
        </h1>
        <p className={styles.intro}>{about.intro}</p>
        <ul className={styles.areas} aria-label="Áreas de atuação">
          {aboutAreas.map((area) => (
            <li key={area.label} className={cx(styles.area, styles[`area-${area.tone}`])}>
              <Icon name={area.icon} size={18} />
              {area.label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.side} aria-hidden="true">
        <MottoNote lines={about.motto} variant="lilac" />
        <div className={styles.sideNote}>
          <svg viewBox="0 0 120 70" className={styles.arrow} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 10c4 30 22 46 40 40 16-6 12-28-2-24-14 4-8 34 20 36 18 1 34-8 46-22" />
            <path d="M100 26l10 4-3 11" />
          </svg>
          <HandNote size="1.3rem" rotate={-12}>
            {about.sideNote} ♡
          </HandNote>
        </div>
      </div>
    </section>
  );
}
