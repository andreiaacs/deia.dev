import { Icon } from '@/components/ui/Icon';
import { IconBadge, TagList } from '@/components/ui/primitives';
import { about, career } from '@/content/profile';
import { cx } from '@/lib/cx';
import styles from './CareerTimeline.module.css';

/** Linha do tempo da carreira, em ordem cronológica. */
export function CareerTimeline() {
  return (
    <section className={styles.section} aria-labelledby="minha-trajetoria">
      <div className={styles.header}>
        <div>
          <h2 id="minha-trajetoria" className={styles.title}>
            Minha trajetória
          </h2>
          <p className={styles.summary}>{about.careerSummary}</p>
        </div>
      </div>

      <ol className={styles.timeline}>
        {career.map((item, index) => {
          const isLast = index === career.length - 1;
          return (
            <li key={item.period + item.title} className={styles.item}>
              <IconBadge icon={item.icon} tone={item.tone} size={52} className={styles.icon} />
              <div className={styles.periodRow}>
                <span className={cx(styles.dot, styles[`dot-${item.tone}`])} aria-hidden="true" />
                <strong className={styles.period}>{item.period}</strong>
                <span className={styles.line} aria-hidden="true">
                  {isLast && <Icon name="chevronRight" size={16} className={styles.lineArrow} />}
                </span>
              </div>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
                {item.description.map((paragraph) => (
                  <p key={paragraph} className={styles.description}>
                    {paragraph}
                  </p>
                ))}
                <div className={styles.tags}>
                  <TagList items={item.tags} />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
