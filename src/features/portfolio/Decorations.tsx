import { Icon } from '@/components/ui/Icon';
import { profile } from '@/content/profile';
import { cx } from '@/lib/cx';
import styles from './Decorations.module.css';

interface MottoNoteProps {
  lines?: readonly string[];
  variant?: 'lime' | 'lilac';
  className?: string;
}

/** Post-it "Mesma lógica de sempre…" (verde no Portfólio, lilás no Sobre). */
export function MottoNote({ lines = profile.motto, variant = 'lime', className }: MottoNoteProps) {
  return (
    <div className={cx(styles.note, variant === 'lilac' && styles.noteLilac, className)}>
      <span className={styles.clip} />
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
      <Icon name="heart" size={22} className={styles.noteHeart} />
    </div>
  );
}

/** Cartão de código escuro com o laço `while (aprendizado)`. */
export function CodeCard() {
  return (
    <div className={styles.code}>
      <div className={styles.dots}>
        <span />
        <span />
        <span />
      </div>
      <pre>
        <code>
          <span className={styles.kw}>while</span> (<span className={styles.fn}>aprendizado</span>) {'{'}
          {'\n'}
          {'  '}
          <span className={styles.call}>crescer</span>();{'\n'}
          {'  '}
          <span className={styles.call}>compartilhar</span>();{'\n'}
          {'  '}
          <span className={styles.call}>impactarPessoas</span>();{'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  );
}
