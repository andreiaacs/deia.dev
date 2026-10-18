import styles from './Logo.module.css';

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={styles.logo} data-inverted={inverted || undefined}>
      deia<span className={styles.accent}>.dev</span>
    </span>
  );
}
