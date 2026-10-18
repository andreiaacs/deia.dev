import { Icon } from '@/components/ui/Icon';
import { journeyNumbers, mainTechnologies } from '@/content/profile';
import { cx } from '@/lib/cx';
import styles from './AboutHighlights.module.css';

/** Cartão escuro com os números da carreira. */
export function JourneyNumbers() {
  return (
    <section className={styles.numbers} aria-labelledby="numeros-jornada">
      <h2 id="numeros-jornada" className={styles.numbersTitle}>
        <Icon name="chart" size={26} className={styles.titleIcon} />
        Números da minha jornada
      </h2>
      <ul className={styles.numbersList}>
        {journeyNumbers.map((item) => (
          <li key={item.label}>
            <Icon name={item.icon} size={30} className={cx(styles.numberIcon, styles[`accent-${item.accent}`])} />
            <strong className={cx(styles.value, styles[`accent-${item.accent}`])}>{item.value}</strong>
            <span className={styles.label}>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Grade com as tecnologias usadas no dia a dia. */
export function MainTechnologies() {
  return (
    <section className={styles.tech} aria-labelledby="tecnologias-uso">
      <h2 id="tecnologias-uso" className={styles.techTitle}>
        <Icon name="bolt" size={24} className={styles.boltIcon} />
        Tecnologias que mais uso
      </h2>
      <ul className={styles.techList}>
        {mainTechnologies.map((tech) => (
          <li key={tech.name}>
            <span className={styles.techMark} style={{ background: tech.color }} aria-hidden="true" />
            {tech.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
