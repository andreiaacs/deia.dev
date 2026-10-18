import { IconBadge } from '@/components/ui/primitives';
import { highlightStats } from '@/content/profile';
import { cx } from '@/lib/cx';
import styles from './HighlightStats.module.css';

export function HighlightStats({ className }: { className?: string }) {
  return (
    <ul className={cx(styles.list, className)} aria-label="Destaques">
      {highlightStats.map((stat) => (
        <li key={stat.title} className={styles.item}>
          <IconBadge icon={stat.icon} tone={stat.tone} size={52} />
          <p>
            <strong className={styles.title}>{stat.title}</strong>
            <span className={styles.detail}>{stat.detail}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
