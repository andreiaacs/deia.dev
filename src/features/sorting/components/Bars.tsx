import type { SortStep } from '../types';
import { MAX_VALUE } from '../datasets';
import { cx } from '@/lib/cx';
import styles from './Bars.module.css';

type BarState = 'swap' | 'write' | 'compare' | 'marker' | 'sorted' | 'idle';

/** Estado visual de cada posição, em ordem de prioridade. */
export function barState(step: SortStep, index: number): BarState {
  if (step.swap?.includes(index)) return 'swap';
  if (step.write === index) return 'write';
  if (step.compare?.includes(index)) return 'compare';
  if (step.marker === index) return 'marker';
  if (step.sorted.includes(index)) return 'sorted';
  return 'idle';
}

function isOutsideRange(step: SortStep, index: number) {
  return step.range !== undefined && (index < step.range[0] || index > step.range[1]);
}

/** Gráfico de barras da lista no passo atual. */
export function Bars({ step }: { step: SortStep }) {
  const max = Math.max(MAX_VALUE, ...step.array);
  return (
    <ol className={styles.bars} aria-label={`Lista: ${step.array.join(', ')}`}>
      {step.array.map((value, index) => (
        <li
          key={index}
          className={cx(
            styles.bar,
            styles[barState(step, index)],
            isOutsideRange(step, index) && styles.dimmed,
          )}
        >
          <span className={styles.value}>{value}</span>
          <span className={styles.fill} style={{ height: `${Math.max(6, (value / max) * 100)}%` }} />
          <span className={styles.index}>{index}</span>
        </li>
      ))}
    </ol>
  );
}

export const legend: Array<{ state: BarState; label: string }> = [
  { state: 'compare', label: 'Comparando' },
  { state: 'swap', label: 'Trocando' },
  { state: 'write', label: 'Escrevendo' },
  { state: 'marker', label: 'Pivô / menor / chave' },
  { state: 'sorted', label: 'Na posição final' },
];

export function Legend() {
  return (
    <ul className={styles.legend}>
      {legend.map((item) => (
        <li key={item.state}>
          <span className={cx(styles.swatch, styles[item.state])} aria-hidden="true" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
