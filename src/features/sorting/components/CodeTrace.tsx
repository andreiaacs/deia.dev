import { useMemo } from 'react';
import { tokenizePython, type Token } from '@/lib/highlight';
import { cx } from '@/lib/cx';
import styles from './CodeTrace.module.css';

interface CodeTraceProps {
  code: string;
  /** Linha em execução (começa em 1). */
  activeLine: number;
  title: string;
}

/** Quebra os tokens do realce em linhas. */
function splitLines(tokens: Token[]) {
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    token.value.split('\n').forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part) lines[lines.length - 1]?.push({ kind: token.kind, value: part });
    });
  }
  return lines;
}

/** Código Python com a linha em execução destacada. */
export function CodeTrace({ code, activeLine, title }: CodeTraceProps) {
  const lines = useMemo(() => splitLines(tokenizePython(code)), [code]);

  return (
    <figure className={styles.wrapper}>
      <figcaption className={styles.header}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {title}
      </figcaption>
      <pre className={styles.pre}>
        <code>
          {lines.map((line, index) => {
            const number = index + 1;
            const active = number === activeLine;
            return (
              <span
                key={number}
                className={cx(styles.line, active && styles.active)}
                aria-current={active ? 'step' : undefined}
              >
                <span className={styles.lineNo} aria-hidden="true">
                  {number}
                </span>
                <span>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} className={styles[token.kind]}>
                      {token.value}
                    </span>
                  ))}
                  {'\n'}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
