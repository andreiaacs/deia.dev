import { Fragment } from 'react';
import styles from './Diagrams.module.css';

type Values = Array<string | number>;

interface DiagramProps {
  values: Values;
  caption?: string;
}

/** Nós ligados por setas terminando em `None`. */
export function LinkedListDiagram({ values, caption }: DiagramProps) {
  const description = `Lista encadeada: ${values.join(' → ')} → None`;
  return (
    <figure className={styles.figure}>
      <div className={styles.linked} role="img" aria-label={description}>
        {values.map((value, index) => (
          <Fragment key={`${value}-${index}`}>
            <span className={styles.node}>
              <span className={styles.nodeValue}>{value}</span>
              <span className={styles.nodePointer} />
            </span>
            <span className={styles.arrow} />
          </Fragment>
        ))}
        <span className={styles.none}>None</span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Pilha vertical: o último valor da lista é o topo. */
export function StackDiagram({ values, caption }: DiagramProps) {
  const top = [...values].reverse();
  const description = `Pilha com topo em ${top[0] ?? 'vazio'}: ${top.join(', ')}`;
  return (
    <figure className={styles.figure}>
      <div className={styles.stack} role="img" aria-label={description}>
        {top.map((value, index) => (
          <span key={`${value}-${index}`} className={styles.stackItem}>
            {value}
            {index === 0 && <span className={styles.label}>topo</span>}
          </span>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Fila horizontal: o primeiro valor é o início (sai primeiro). */
export function QueueDiagram({ values, caption }: DiagramProps) {
  const description = `Fila do início ao fim: ${values.join(', ')}`;
  return (
    <figure className={styles.figure}>
      <div className={styles.queue} role="img" aria-label={description}>
        <span className={styles.label}>sai ←</span>
        {values.map((value, index) => (
          <span key={`${value}-${index}`} className={styles.queueItem}>
            {value}
          </span>
        ))}
        <span className={styles.label}>← entra</span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
