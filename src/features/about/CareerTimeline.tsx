import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconBadge, TagList } from '@/components/ui/primitives';
import { about, career, careerFilters } from '@/content/profile';
import type { CareerCategory } from '@/content/types';
import { cx } from '@/lib/cx';
import styles from './CareerTimeline.module.css';

type Filter = 'todos' | CareerCategory;

/** Linha do tempo da carreira com filtro por tipo (experiência, formação, docência). */
export function CareerTimeline() {
  const [filter, setFilter] = useState<Filter>('todos');
  const items = career.filter((item) => filter === 'todos' || item.categories.includes(filter));

  return (
    <section className={styles.section} aria-labelledby="minha-trajetoria">
      <div className={styles.header}>
        <div>
          <h2 id="minha-trajetoria" className={styles.title}>
            Minha trajetória
          </h2>
          <p className={styles.summary}>{about.careerSummary}</p>
        </div>
        <div className={styles.filters} role="group" aria-label="Filtrar trajetória">
          {careerFilters.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              className={cx(styles.filter, filter === option.id && styles.filterActive)}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <ol className={styles.timeline}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
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
