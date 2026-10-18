import { useMemo } from 'react';
import type { CodeLanguage } from '@/content/types';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { tokenizePython } from '@/lib/highlight';
import { Icon } from '@/components/ui/Icon';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'python', title, showLineNumbers = true }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard();
  const source = code.replace(/\n$/, '');

  const lines = useMemo(() => {
    const tokens = language === 'python' ? tokenizePython(source) : [{ kind: 'plain' as const, value: source }];
    // Quebra os tokens em linhas para numerá-las.
    const result: Array<Array<{ kind: string; value: string }>> = [[]];
    for (const token of tokens) {
      token.value.split('\n').forEach((part, index) => {
        if (index > 0) result.push([]);
        if (part) result[result.length - 1]?.push({ kind: token.kind, value: part });
      });
    }
    return result;
  }, [source, language]);

  return (
    <figure className={styles.wrapper}>
      <figcaption className={styles.header}>
        <span className={styles.title}>{title ?? (language === 'python' ? 'Python' : 'Saída')}</span>
        <button type="button" className={styles.copy} onClick={() => void copy(source)}>
          <Icon name={copied ? 'check' : 'copy'} size={14} />
          {copied ? 'Copiado!' : 'Copiar código'}
        </button>
      </figcaption>
      <pre className={styles.pre} tabIndex={0}>
        <code>
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className={styles.line}>
              {showLineNumbers && (
                <span className={styles.lineNumber} aria-hidden="true">
                  {lineIndex + 1}
                </span>
              )}
              <span>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={styles[token.kind]}>
                    {token.value}
                  </span>
                ))}
                {'\n'}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
