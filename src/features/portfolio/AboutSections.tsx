import { Card, HandNote, SectionHeader } from '@/components/ui/primitives';
import { beyondTech, career, profile } from '@/content/profile';
import { cx } from '@/lib/cx';
import styles from './AboutSections.module.css';

export function Timeline() {
  return (
    <Card as="section" aria-labelledby="trajetoria">
      <SectionHeader id="trajetoria" title="Minha trajetória" />
      <ol className={styles.timeline}>
        {career
          .filter((item) => item.featured)
          .map((item) => (
            <li key={item.period + item.title} className={styles.step}>
              <span className={cx(styles.dot, styles[`dot-${item.tone}`])} aria-hidden="true" />
              <strong className={styles.period}>{item.period}</strong>
              <span className={styles.stepTitle}>{item.title}</span>
              {item.subtitle && <span className={styles.stepDetail}>{item.subtitle}</span>}
            </li>
          ))}
      </ol>
    </Card>
  );
}

export function QuoteCard() {
  return (
    <figure className={styles.quote}>
      <span className={styles.quoteMark} aria-hidden="true">
        “
      </span>
      <blockquote>
        <HandNote size="1.35rem" rotate={-3}>
          {profile.quote}
        </HandNote>
      </blockquote>
      <figcaption>
        <HandNote size="1.6rem" rotate={-4} className={styles.quoteAuthor}>
          — {profile.nickname}
        </HandNote>
      </figcaption>
      <img src="/images/quote-deia.webp" alt="" className={styles.quoteBird} width={340} height={345} />
    </figure>
  );
}

export function BeyondTech() {
  return (
    <Card as="section" aria-labelledby="alem-da-tecnologia">
      <SectionHeader id="alem-da-tecnologia" title="Além da tecnologia" />
      <ul className={styles.beyond}>
        {beyondTech.map((item) => (
          <li key={item.label}>
            <img src={item.image} alt="" width={64} height={60} loading="lazy" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
